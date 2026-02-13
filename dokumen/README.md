# Encrypter.id

**Sistem File Sharing Aman Berbasis Hybrid Cryptography (AES-256-GCM + RSA-OAEP)**

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

## 📋 Deskripsi

Encrypter.id adalah aplikasi web edukatif yang mendemonstrasikan penggunaan **hybrid cryptography** untuk file sharing yang aman. Sistem ini menggabungkan kekuatan **AES-256-GCM** (enkripsi simetris) dan **RSA-OAEP** (enkripsi asimetris) untuk memberikan keamanan tingkat tinggi dengan performa optimal.

### Fitur Utama

- ✅ **Hybrid Cryptography**: AES-256-GCM untuk file + RSA-OAEP untuk kunci
- ✅ **Upload & Enkripsi**: Interface drag-and-drop untuk upload file
- ✅ **Manajemen Kunci**: Generate dan kelola RSA key pair
- ✅ **Simulasi Pengiriman**: Kotak masuk penerima untuk dekripsi paket
- ✅ **Benchmark Performa**: Ukur waktu enkripsi/dekripsi, CPU, dan RAM
- ✅ **Simulasi Brute Force**: Estimasi waktu untuk memecahkan enkripsi
- ✅ **UI Modern**: Tema hitam-hijau cyber/terminal yang elegan
- ✅ **Edukatif**: Penjelasan lengkap tentang kriptografi

### ⚠️ Catatan Penting

Aplikasi ini dibuat untuk **tujuan edukatif dan demonstrasi**. Untuk penggunaan production dengan data sensitif, diperlukan implementasi tambahan seperti autentikasi user, enkripsi at-rest, HTTPS/TLS, dan audit logging.

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express**: Server dan REST API
- **crypto (native)**: Implementasi AES-256-GCM dan RSA-OAEP
- **pidusage**: Monitoring CPU dan RAM
- **multer**: Upload file handling
- **archiver**: Pembuatan paket .zip

### Frontend
- **HTML + Tailwind CSS**: UI modern dan responsif
- **Vanilla JavaScript**: Logika aplikasi tanpa framework
- **Chart.js**: Visualisasi data benchmark

### Kenapa Stack Ini?

- Ekosistem JavaScript konsisten (frontend & backend)
- Crypto library native Node.js yang powerful dan aman
- Mudah untuk deployment dan testing lokal
- Performa baik untuk operasi I/O dan streaming file besar
- Tidak over-engineering, fokus pada demonstrasi konsep

---

## 🚀 Cara Install dan Menjalankan

### Prerequisites

- Node.js >= 18.0.0
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download repository**

```bash
cd encrypter.id
```

2. **Install dependencies backend**

```bash
cd backend
npm install
```

3. **Copy environment variables**

```bash
copy .env.example .env
```

4. **Generate dataset uji**

```bash
cd ../dataset_uji/generator
node buat_dataset.js
```

5. **Jalankan server**

```bash
cd ../../backend
npm start
```

Server akan berjalan di `http://localhost:3000`

6. **Buka aplikasi di browser**

```
http://localhost:3000
```

---

## 📖 Cara Menggunakan

### 1. Generate RSA Key Pair (Penerima)

1. Buka halaman **Kelola Kunci**
2. Klik **Generate RSA Key Pair**
3. Download `public.pem` dan `private.pem`
4. **Penting**: Simpan `private.pem` dengan aman!

### 2. Enkripsi File (Pengirim)

1. Buka halaman **Upload File** → Tab **Pengirim**
2. Upload file yang ingin dienkripsi
3. Paste **public key penerima** (isi file `public.pem`)
4. Klik **Enkripsi & Buat Paket**
5. Lihat statistik enkripsi (waktu, CPU, RAM)
6. Klik **Simulasi Kirim** untuk mengirim ke kotak masuk penerima

### 3. Dekripsi File (Penerima)

1. Buka halaman **Upload File** → Tab **Penerima**
2. Lihat daftar paket di kotak masuk
3. Pilih paket yang ingin didekripsi
4. Upload **private key** Anda (isi file `private.pem`)
5. Klik **Dekripsi Paket**
6. Download file asli yang sudah didekripsi

### 4. Benchmark Performa

1. Buka halaman **Benchmark**
2. Pilih ukuran file yang ingin ditest
3. Klik **Jalankan Benchmark**
4. Lihat hasil dalam tabel dan grafik
5. Export hasil ke CSV atau JSON

### 5. Simulasi Brute Force

1. Buka halaman **Simulasi Serangan**
2. Pilih panjang kunci AES (128/192/256)
3. Masukkan asumsi percobaan per detik
4. Klik **Hitung Estimasi**
5. Lihat estimasi waktu untuk brute force

---

## 📁 Struktur Folder

```
encrypter.id/
├── dokumen/
│   ├── README.md
│   ├── arsitektur.md
│   ├── keamanan.md
│   └── panduan_pengguna.md
├── frontend/
│   ├── src/
│   │   ├── aset/
│   │   ├── gaya/
│   │   │   └── style.css
│   │   ├── komponen/
│   │   │   ├── navbar.js
│   │   │   ├── notifikasi.js
│   │   │   └── loading.js
│   │   ├── halaman/
│   │   │   ├── upload.js
│   │   │   ├── kelola-kunci.js
│   │   │   ├── benchmark.js
│   │   │   ├── simulasi-serangan.js
│   │   │   ├── mengenai.js
│   │   │   └── faq.js
│   │   └── utils/
│   │       ├── api.js
│   │       ├── formatter.js
│   │       └── router.js
│   └── index.html
├── backend/
│   ├── src/
│   │   ├── rute/
│   │   │   ├── kunci.js
│   │   │   ├── enkripsi.js
│   │   │   ├── dekripsi.js
│   │   │   └── benchmark.js
│   │   ├── layanan/
│   │   │   └── kripto.js
│   │   ├── utils/
│   │   │   └── monitoring.js
│   │   ├── penyimpanan/
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── dataset_uji/
│   ├── contoh/
│   └── generator/
│       └── buat_dataset.js
└── .gitignore
```

---

## 🔐 Keamanan

### Implementasi Kriptografi

- **AES-256-GCM**: Authenticated encryption dengan 256-bit key
- **RSA-OAEP**: 2048-bit key dengan padding aman
- **Random Nonce**: Setiap enkripsi menggunakan nonce unik
- **Authentication Tag**: Verifikasi integritas data

### Best Practices

✅ **DO:**
- Simpan private key dengan aman
- Backup key pair di tempat aman
- Verifikasi authentication tag sebelum dekripsi
- Gunakan key size yang cukup (RSA 2048+, AES 256)

❌ **DON'T:**
- Jangan bagikan private key
- Jangan gunakan RSA untuk enkripsi file besar
- Jangan gunakan AES mode lemah (ECB)
- Jangan reuse nonce

### Keterbatasan (Demo)

⚠️ Aplikasi ini untuk demo lokal:
- Tidak ada autentikasi user
- File disimpan tanpa enkripsi at-rest
- Tidak ada HTTPS (gunakan localhost saja)
- Private key bisa disimpan di server (hanya untuk demo)

---

## 📊 API Endpoints

### Kunci
- `POST /api/kunci/generate` - Generate RSA key pair
- `POST /api/kunci/simpan` - Simpan key ke server
- `GET /api/kunci/daftar` - List saved keys

### Enkripsi
- `POST /api/enkripsi/upload` - Upload file
- `POST /api/enkripsi/proses` - Enkripsi file
- `POST /api/enkripsi/kirim` - Kirim paket ke inbox
- `GET /api/enkripsi/download/:id` - Download paket

### Dekripsi
- `GET /api/dekripsi/kotak-masuk` - List paket masuk
- `POST /api/dekripsi/proses` - Dekripsi paket
- `GET /api/dekripsi/download/:id` - Download file

### Benchmark
- `POST /api/benchmark/jalankan` - Run benchmark
- `GET /api/benchmark/hasil` - Get results
- `GET /api/benchmark/export/:id/:format` - Export CSV/JSON

---

## 🧪 Testing

### Manual Testing

Lihat `dokumen/panduan_pengguna.md` untuk workflow testing lengkap.

### Unit Testing (Opsional)

```bash
cd backend
npm test
```

---

## 📚 Dokumentasi Tambahan

- [Arsitektur Sistem](dokumen/arsitektur.md)
- [Keamanan & Best Practices](dokumen/keamanan.md)
- [Panduan Pengguna Lengkap](dokumen/panduan_pengguna.md)

---

## 🤝 Kontribusi

Ini adalah project edukatif untuk tugas mahasiswa. Kontribusi dan saran sangat diterima!

---

## 📄 License

MIT License - Bebas digunakan untuk tujuan edukatif

---

## 👥 Tim

Project ini dibuat oleh tim mahasiswa untuk demonstrasi hybrid cryptography.

---

## 🙏 Acknowledgments

- Node.js crypto module documentation
- NIST standards untuk AES-GCM dan RSA-OAEP
- Tailwind CSS dan Chart.js communities

---

**Encrypter.id** - Belajar Kriptografi dengan Praktik Langsung 🔐
