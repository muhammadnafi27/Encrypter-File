# Panduan Pengguna Encrypter.id

## Pendahuluan

Panduan ini akan membantu Anda menggunakan Encrypter.id untuk mengirim file dengan aman menggunakan hybrid cryptography.

## Skenario Penggunaan

**Alice** ingin mengirim file rahasia kepada **Bob** dengan aman.

---

## Langkah 1: Bob Generate RSA Key Pair

**Bob** (penerima) harus membuat pasangan kunci terlebih dahulu.

1. Buka aplikasi di `http://localhost:3000`
2. Klik menu **Kelola Kunci**
3. Klik tombol **🔑 Generate RSA Key Pair**
4. Tunggu beberapa detik hingga key pair dibuat
5. Klik **💾 Download public.pem** untuk download public key
6. Klik **💾 Download private.pem** untuk download private key

**⚠️ PENTING:**
- Simpan `private.pem` di tempat yang AMAN
- Jangan bagikan `private.pem` kepada siapa pun
- Backup `private.pem` di lokasi terpisah

**✅ Aman:**
- `public.pem` boleh dibagikan kepada siapa saja

---

## Langkah 2: Bob Kirim Public Key ke Alice

Bob mengirim file `public.pem` kepada Alice melalui:
- Email
- Chat
- USB drive
- Atau cara lain (aman untuk dibagikan)

---

## Langkah 3: Alice Enkripsi File

**Alice** (pengirim) akan mengenkripsi file menggunakan public key Bob.

1. Buka aplikasi di `http://localhost:3000`
2. Klik menu **Upload File**
3. Pastikan tab **Pengirim** aktif
4. **Upload file:**
   - Klik area dropzone atau drag & drop file
   - Maksimal ukuran: 500MB
   - File akan otomatis diupload ke server
5. **Input public key Bob:**
   - Buka file `public.pem` yang diterima dari Bob
   - Copy seluruh isinya (termasuk `-----BEGIN PUBLIC KEY-----` dan `-----END PUBLIC KEY-----`)
   - Paste ke textarea "Public Key Penerima"
6. Klik tombol **🔒 Enkripsi & Buat Paket**
7. Tunggu proses enkripsi selesai

**Hasil yang ditampilkan:**
- Ukuran file asli
- Ukuran file terenkripsi
- Waktu enkripsi (ms)
- CPU peak usage (%)

---

## Langkah 4: Alice Kirim Paket ke Bob

Setelah enkripsi selesai, Alice punya 2 opsi:

### Opsi A: Simulasi Kirim (Demo Lokal)

1. Klik tombol **📤 Simulasi Kirim ke Penerima**
2. Paket akan otomatis masuk ke kotak masuk Bob di aplikasi yang sama

### Opsi B: Download dan Kirim Manual

1. Klik tombol **💾 Download Paket**
2. File `.encpack` akan terdownload
3. Kirim file ini ke Bob melalui:
   - Email
   - Cloud storage (Google Drive, Dropbox)
   - USB drive
   - Atau cara lain

**✅ Aman:**
- File `.encpack` sudah terenkripsi
- Aman untuk dikirim melalui channel tidak aman
- Hanya Bob yang bisa membukanya (dengan private key)

---

## Langkah 5: Bob Dekripsi File

**Bob** (penerima) akan mendekripsi paket menggunakan private key-nya.

1. Buka aplikasi di `http://localhost:3000`
2. Klik menu **Upload File**
3. Klik tab **Penerima**
4. **Lihat kotak masuk:**
   - Daftar paket akan muncul otomatis
   - Jika tidak muncul, klik **🔄 Refresh**
5. **Pilih paket:**
   - Klik tombol **Pilih** pada paket yang ingin didekripsi
6. **Input private key:**
   - Buka file `private.pem` yang Bob simpan
   - Copy seluruh isinya
   - Paste ke textarea "Private Key Anda"
7. Klik tombol **🔓 Dekripsi Paket**
8. Tunggu proses dekripsi selesai

**Hasil yang ditampilkan:**
- Nama file asli
- Ukuran file
- Waktu dekripsi (ms)
- CPU peak usage (%)

9. Klik tombol **💾 Download File Asli**
10. File asli akan terdownload

**✅ Verifikasi:**
- Bandingkan file hasil dekripsi dengan file asli Alice
- Ukuran dan isi harus identik

---

## Fitur Tambahan

### Benchmark Performa

Ingin tahu seberapa cepat enkripsi/dekripsi untuk berbagai ukuran file?

1. Klik menu **Benchmark**
2. Pilih ukuran file yang ingin ditest:
   - ☑ 1 MB
   - ☑ 5 MB
   - ☑ 10 MB
   - ☐ 100 MB (opsional, butuh waktu lama)
3. Klik **⚡ Jalankan Benchmark**
4. Tunggu proses selesai (bisa beberapa menit untuk file besar)
5. Lihat hasil dalam:
   - **Tabel**: Waktu enkripsi/dekripsi, CPU, RAM
   - **Grafik**: Visualisasi perbandingan
6. Export hasil:
   - **📊 Export CSV**: Untuk analisis di Excel/Google Sheets
   - **📄 Export JSON**: Untuk analisis programmatic

**Tips:**
- File lebih besar = waktu lebih lama
- CPU dan RAM usage akan meningkat untuk file besar
- Jalankan benchmark saat sistem tidak sibuk untuk hasil akurat

### Simulasi Brute Force

Ingin tahu seberapa aman AES-256?

1. Klik menu **Simulasi Serangan**
2. Pilih panjang kunci:
   - AES-128
   - AES-192
   - **AES-256** (recommended)
3. Input percobaan per detik:
   - Default: 1,000,000,000 (1 miliar)
   - Ini adalah asumsi komputer super modern
4. Klik **🧮 Hitung Estimasi**
5. Lihat hasil:
   - Total kombinasi kunci
   - Estimasi waktu untuk brute force
   - Dalam tahun (biasanya jutaan tahun!)

**Kesimpulan:**
- AES-256 praktis tidak mungkin di-brute force
- Bahkan dengan komputer super tercepat
- Keamanan bergantung pada menjaga private key tetap rahasia

---

## Troubleshooting

### Error: "Gagal upload file"

**Penyebab:**
- File terlalu besar (> 500MB)
- Koneksi ke server terputus
- Server tidak berjalan

**Solusi:**
- Pastikan file < 500MB
- Pastikan server backend berjalan (`npm start` di folder backend)
- Refresh halaman dan coba lagi

### Error: "Gagal enkripsi"

**Penyebab:**
- Public key tidak valid
- Format public key salah

**Solusi:**
- Pastikan copy seluruh isi file `public.pem`
- Termasuk `-----BEGIN PUBLIC KEY-----` dan `-----END PUBLIC KEY-----`
- Jangan ada spasi atau karakter tambahan

### Error: "Integritas tidak valid"

**Penyebab:**
- File paket telah dimodifikasi atau rusak
- Authentication tag tidak cocok

**Solusi:**
- Minta Alice kirim ulang paket
- Jangan edit file `.encpack` secara manual
- Pastikan download paket lengkap (tidak corrupt)

### Error: "Gagal dekripsi" atau "Private key tidak valid"

**Penyebab:**
- Private key salah (bukan pasangan dari public key yang digunakan)
- Format private key salah

**Solusi:**
- Pastikan menggunakan private key yang benar
- Private key harus pasangan dari public key yang digunakan Alice
- Copy seluruh isi file `private.pem`

### Paket tidak muncul di kotak masuk

**Penyebab:**
- Paket belum dikirim
- Perlu refresh

**Solusi:**
- Pastikan Alice sudah klik "Simulasi Kirim"
- Klik tombol **🔄 Refresh** di kotak masuk
- Refresh halaman browser

---

## Tips & Best Practices

### Keamanan

✅ **DO:**
- Simpan private key dengan aman
- Backup private key di tempat terpisah
- Verifikasi public key berasal dari orang yang benar
- Generate key pair baru jika private key bocor
- Gunakan password untuk protect private key file (di luar aplikasi)

❌ **DON'T:**
- Jangan bagikan private key
- Jangan simpan private key di cloud tanpa enkripsi
- Jangan screenshot private key
- Jangan kirim private key via email/chat

### Performa

- File < 10MB: Enkripsi/dekripsi sangat cepat (< 1 detik)
- File 10-100MB: Butuh beberapa detik
- File > 100MB: Bisa butuh menit, tergantung hardware

### Workflow

1. **Sekali setup**: Bob generate key pair
2. **Setiap kirim**: Alice enkripsi dengan public key Bob
3. **Setiap terima**: Bob dekripsi dengan private key-nya

---

## FAQ Cepat

**Q: Apakah file aman saat dikirim?**  
A: Ya, file sudah terenkripsi dengan AES-256. Hanya pemilik private key yang bisa membukanya.

**Q: Berapa lama key pair bisa dipakai?**  
A: Bisa dipakai berulang kali. Bob cukup generate sekali, lalu bisa terima banyak file dari banyak pengirim.

**Q: Apakah Alice perlu private key Bob?**  
A: Tidak! Alice hanya butuh public key Bob. Private key hanya Bob yang punya.

**Q: Bisakah Alice membaca file setelah dienkripsi?**  
A: Tidak, setelah dienkripsi, hanya Bob (pemilik private key) yang bisa membaca.

**Q: Apa yang terjadi jika private key hilang?**  
A: Semua file yang dienkripsi dengan public key pasangannya tidak bisa didekripsi lagi. Backup sangat penting!

---

## Kontak & Support

Untuk pertanyaan lebih lanjut, silakan:
- Baca halaman **Mengenai Encrypter** di aplikasi
- Baca halaman **FAQ** untuk pertanyaan umum
- Baca dokumentasi di folder `dokumen/`

---

**Selamat menggunakan Encrypter.id! 🔐**
