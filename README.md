# Auto Claim Merits Bot

## 📌 Deskripsi
Auto claim merits 

## 🚀 Cara Penggunaan

### 1️⃣ Instalasi
Pastikan Anda memiliki **Node.js** terinstal di sistem Anda.

```sh
# Clone repository 
git clone https://github.com/your-repo/auto-claim-merits.git
cd auto-claim-merits

# Install dependencies
npm install
```

### 2️⃣ Konfigurasi
1. **Masukkan Bearer Token:**
   - Buka file `data.txt`.
   - Masukkan **Bearer Token** Anda di dalam file tersebut (tanpa tanda kutip).

2. **Jalankan bot:**
```sh
node index.js
```

### 3️⃣ Fitur
✅ Mengambil saldo sebelum klaim.<br>
✅ Melakukan klaim merits otomatis jika tersedia.<br>
✅ Menampilkan saldo setelah klaim.<br>
✅ Menunggu sebelum klaim berikutnya.<br>
❌ Not support for multiple acc.<br>

## 🔧 Troubleshooting
❗ **Error 401 (Unauthorized)?**<br>
- Pastikan **Bearer Token** yang dimasukkan di `data.txt` valid.
- Jika token expired, ganti dengan yang baru.

❗ **Tidak ada klaim yang tersedia?**<br>
- Pastikan Anda menunggu hingga waktu reset harian sebelum mencoba lagi.

## 📜 Lisensi
Proyek ini bersifat open-source, gunakan dengan bijak! 🚀

