# Auto Claim Merits Blockscout

###  Fitur
✅ Mengambil saldo sebelum klaim.<br>
✅ Melakukan klaim merits otomatis jika tersedia.<br>
✅ Menampilkan saldo setelah klaim.<br>
✅ Menunggu sebelum klaim berikutnya.<br>
❌ Not support for multiple account.<br>

## Requirements
- Node.js v18+
- Npm (node package manager)

###  Instalasi
1. clone this repository
```bash
git clone https://github.com/your-repo/auto-claim-merits.git
cd auto-claim-merits
```
2. Install dependencies
```bash
npm install
```
3. Run the script
```bash
node main.js
```

###  Konfigurasi
 **Masukkan Bearer Token:**
   - Buka file `data.txt`. nano data.txt
   - Masukkan **Bearer Token** Anda di dalam file tersebut (tanpa tanda kutip).


##  Troubleshooting
❗ **Error 401 (Unauthorized)?**<br>
- Pastikan **Bearer Token** yang dimasukkan di `data.txt` valid.
- Jika token expired, ganti dengan yang baru.

❗ **Tidak ada klaim yang tersedia?**<br>
- Pastikan Anda menunggu hingga waktu reset harian sebelum mencoba lagi.

## 📜 Lisensi
Proyek ini bersifat open-source, gunakan dengan bijak! 🚀

