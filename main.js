const axios = require("axios");
const fs = require("fs");
const chalk = require("chalk").default;
const banner = require('./config/banner')

const check_url = "https://merits.blockscout.com/api/v1/user/daily/check";
const claim_url = "https://merits.blockscout.com/api/v1/user/daily/claim";
const balance_url = "https://merits.blockscout.com/api/v1/user/balances";

function getBearerTokens() {
  try {
    const tokens = fs.readFileSync("data.txt", "utf8")
      .split("\n")
      .map(token => token.trim())
      .filter(token => token.length > 0);
    
    if (tokens.length === 0) throw new Error("No valid bearer tokens found");
    return tokens;
  } catch (error) {
    console.error("Error reading Bearer Tokens:", error.message);
    process.exit(1);
  }
}

function getHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  };
}

async function getBalance(token) {
  try {
    const response = await axios.get(balance_url, { headers: getHeaders(token) });
    return response.data.total;
  } catch (error) {
    console.log(`Error fetching balance for token ${token.slice(0, 10)}...:`, error.message);
    return null;
  }
}

async function dailyCheck(token) {
  try {
    const response = await axios.get(check_url, { headers: getHeaders(token) });
    return response.data.available;
  } catch (error) {
    console.log(`Error in dailyCheck for token ${token.slice(0, 10)}...:`, error.message);
    return false;
  }
}

async function dailyClaim(token) {
  try {
    const canClaim = await dailyCheck(token);
    if (canClaim) {
      await axios.post(claim_url, {}, { headers: getHeaders(token) });
      return true;
    }
  } catch (error) {
    console.log(`Error in dailyClaim for token ${token.slice(0, 10)}...:`, error.message);
  }
  return false;
}

async function processAccount(token, accountNumber) {
  console.log(chalk.blue(`\nProcessing Account #${accountNumber} (Token: ${token.slice(0, 10)}...)`));
  
  const beforeBalance = await getBalance(token);
  console.log(`Balance before claim: ${beforeBalance}`);

  const claimed = await dailyClaim(token);
  if (claimed) {
    const afterBalance = await getBalance(token);
    console.log(`Balance after claim: ${afterBalance}`);
    console.log(chalk.green("Successfully claimed merits!"));
  } else {
    console.log("Daily claim is not available yet.");
  }
}

async function autoClaimMerits() {
  const tokens = getBearerTokens();
  
  while (true) {
    console.log(chalk.green("\nStarting new claim cycle for all accounts..."));
    console.log(chalk.green(`Total accounts: ${tokens.length}`));
    
    // Process all accounts concurrently
    const accountPromises = tokens.map((token, index) => 
      processAccount(token, index + 1)
    );
    
    await Promise.all(accountPromises);
    
    console.log(chalk.yellow("\nWaiting for 18 hours before next claim cycle..."));
    await new Promise((resolve) => setTimeout(resolve, 18 * 60 * 60 * 1000));
  }
}

autoClaimMerits();
