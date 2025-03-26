const axios = require("axios");
const fs = require("fs");
const chalk = require("chalk").default;
const banner = require('./config/banner')

const check_url = "https://merits.blockscout.com/api/v1/user/daily/check";
const claim_url = "https://merits.blockscout.com/api/v1/user/daily/claim";
const balance_url = "https://merits.blockscout.com/api/v1/user/balances";

function getBearerToken() {
  try {
    const token = fs.readFileSync("data.txt", "utf8").trim();
    if (!token) throw new Error("Bearer token is empty");
    return token;
  } catch (error) {
    console.error("Error reading Bearer Token:", error.message);
    process.exit(1);
  }
}

const headers = {
  Authorization: `Bearer ${getBearerToken()}`,
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
};

async function getBalance() {
  try {
    const response = await axios.get(balance_url, { headers });
    return response.data.total;
  } catch (error) {
    console.log("Error fetching balance:", error.message);
    return null;
  }
}

async function dailyCheck() {
  try {
    const response = await axios.get(check_url, { headers });
    return response.data.available;
  } catch (error) {
    console.log("Error in dailyCheck:", error.message);
    return false;
  }
}

async function dailyClaim() {
  try {
    const canClaim = await dailyCheck();
    if (canClaim) {
      await axios.post(claim_url, {}, { headers });
      return true;
    }
  } catch (error) {
    console.log("Error in dailyClaim:", error.message);
  }
  return false;
}

async function autoClaimMerits() {
  while (true) {
    console.log(chalk.green("Checking and claiming merits..."));
    const beforeBalance = await getBalance();
    console.log(`Balance before claim: ${beforeBalance}`);

    const claimed = await dailyClaim();
    if (claimed) {
      const afterBalance = await getBalance();
      console.log(`Balance after claim: ${afterBalance}`);
    } else {
      console.log("Daily claim is not available yet.");
    }
    
    console.log(chalk.yellow("Waiting for 18 hours before next claim..."));
    await new Promise((resolve) => setTimeout(resolve, 18 * 60 * 60 * 1000));
  }
}

autoClaimMerits();
