# Arsitektur Sistem Encrypter.id

## Overview

Encrypter.id menggunakan arsitektur **client-server** dengan komunikasi REST API. Backend menangani kriptografi dan penyimpanan, sementara frontend menyediakan interface user yang interaktif.

## Diagram Arsitektur

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  HTML + Tailwind CSS + Vanilla JavaScript            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Halaman   │  │ Komponen   │  │   Utils    │     │  │
│  │  │  - Upload  │  │ - Navbar   │  │ - API      │     │  │
│  │  │  - Kunci   │  │ - Toast    │  │ - Router   │     │  │
│  │  │  - Bench   │  │ - Loading  │  │ - Format   │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST API
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Node.js + Express Server                            │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │   Routes   │  │  Layanan   │  │   Utils    │     │  │
│  │  │ - Kunci    │  │ - Kripto   │  │ - Monitor  │     │  │
│  │  │ - Enkripsi │  │   AES-GCM  │  │   CPU/RAM  │     │  │
│  │  │ - Dekripsi │  │   RSA-OAEP │  │            │     │  │
│  │  │ - Bench    │  │   Paket    │  │            │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Penyimpanan                         │  │
│  │  - unggahan/          - kotak_masuk_penerima/        │  │
│  │  - paket_terenkripsi/ - hasil_dekripsi/              │  │
│  │  - kunci/             - hasil_benchmark/             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Komponen Backend

### 1. Server (server.js)
- Express application
- Middleware: CORS, JSON parser, static file serving
- Route mounting
- Error handling global
- Directory initialization

### 2. Routes

#### `/api/kunci`
- Generate RSA key pair
- Simpan key pair (demo)
- List saved keys
- Get public key by ID

#### `/api/enkripsi`
- Upload file (multer)
- Proses enkripsi (AES + RSA)
- Kirim paket ke inbox
- Download paket terenkripsi

#### `/api/dekripsi`
- List paket di inbox
- Proses dekripsi (RSA + AES)
- Download file hasil dekripsi

#### `/api/benchmark`
- Jalankan benchmark
- Get hasil benchmark
- Export CSV/JSON

### 3. Layanan Kriptografi (kripto.js)

**AES Functions:**
```javascript
generateAESKey()              // Generate random 32 bytes
encryptFileAES(buffer, key)   // AES-256-GCM encryption
decryptFileAES(...)           // AES-256-GCM decryption
```

**RSA Functions:**
```javascript
generateRSAKeyPair()          // Generate 2048-bit RSA
encryptAESKeyWithRSA(...)     // RSA-OAEP encryption
decryptAESKeyWithRSA(...)     // RSA-OAEP decryption
```

**Package Functions:**
```javascript
createEncryptedPackage(...)   // Create .zip package
extractEncryptedPackage(...)  // Extract from .zip
```

### 4. Monitoring (monitoring.js)

```javascript
class PerformanceMonitor {
  start()   // Mulai sampling CPU/RAM
  stop()    // Stop dan return stats
}

monitorPerformance(fn)  // Wrapper untuk monitor async function
```

## Komponen Frontend

### 1. Routing (router.js)
- Hash-based routing (#/upload, #/kelola-kunci, dll)
- Page rendering
- Active nav state

### 2. API Client (api.js)
- Fetch wrapper dengan error handling
- Upload file dengan FormData
- Download file helper

### 3. Formatter (formatter.js)
- File size (bytes → KB/MB/GB)
- Duration (ms → s/m)
- CPU/RAM formatting
- Timestamp formatting

### 4. Komponen UI
- **Navbar**: Sticky navigation dengan mobile menu
- **Notifikasi**: Toast notifications (success/error/warning)
- **Loading**: Overlay dengan spinner

### 5. Halaman

**Upload File:**
- Tab Pengirim: Upload → Enkripsi → Kirim
- Tab Penerima: Inbox → Dekripsi → Download

**Kelola Kunci:**
- Generate RSA key pair
- Show/hide private key
- Download .pem files

**Benchmark:**
- Select dataset sizes
- Run benchmark
- Display table + chart
- Export CSV/JSON

**Simulasi Serangan:**
- Input parameters
- Calculate brute force time
- Educational content

**Mengenai:**
- System overview
- Flow diagram
- AES/RSA explanation
- Tech stack

**FAQ:**
- Accordion dengan 12+ FAQ
- Expand/collapse

## Alur Data

### Enkripsi Flow

```
1. User upload file
   ↓
2. Backend save file → return fileId
   ↓
3. User input public key penerima
   ↓
4. Frontend call /api/enkripsi/proses
   ↓
5. Backend:
   a. Generate AES key (random 32 bytes)
   b. Encrypt file dengan AES-256-GCM
      → ciphertext + nonce + authTag
   c. Encrypt AES key dengan RSA public key
      → encryptedAESKey
   d. Create metadata JSON
   e. Package ke .zip (metadata.json + ciphertext.bin)
   f. Monitor CPU/RAM selama proses
   ↓
6. Return packageId + stats ke frontend
   ↓
7. User bisa download paket atau kirim ke inbox
```

### Dekripsi Flow

```
1. User pilih paket dari inbox
   ↓
2. User input private key
   ↓
3. Frontend call /api/dekripsi/proses
   ↓
4. Backend:
   a. Extract paket .zip
      → metadata + ciphertext
   b. Decrypt AES key dengan RSA private key
      → aesKey
   c. Decrypt file dengan AES-256-GCM
      → Verify authTag (integrity check)
      → plaintext
   d. Save decrypted file
   e. Monitor CPU/RAM selama proses
   ↓
5. Return decryptedId + stats ke frontend
   ↓
6. User download file asli
```

## Format Paket

**File: `{packageId}.encpack` (ZIP archive)**

```
package.encpack/
├── metadata.json
│   {
│     "id_paket": "...",
│     "nama_file_asli": "...",
│     "ukuran_asli": 1234567,
│     "ukuran_ciphertext": 1234600,
│     "algoritma": {
│       "enkripsi_file": "AES-256-GCM",
│       "enkripsi_kunci": "RSA-OAEP",
│       "ukuran_kunci_rsa": 2048
│     },
│     "nonce": "base64...",
│     "authTag": "base64...",
│     "encryptedAESKey": "base64...",
│     "timestamp": "2026-02-08T..."
│   }
└── ciphertext.bin (encrypted file data)
```

## Keamanan Implementasi

### Kriptografi
- ✅ AES-256-GCM (authenticated encryption)
- ✅ RSA-OAEP (secure padding)
- ✅ Random nonce per encryption
- ✅ Authentication tag verification
- ✅ Proper key sizes (AES 256-bit, RSA 2048-bit)

### Error Handling
- ✅ Validasi input (file size, key format)
- ✅ Integrity check (authTag)
- ✅ Graceful error messages
- ✅ Try-catch di semua async operations

### Monitoring
- ✅ CPU usage tracking
- ✅ RAM usage tracking
- ✅ Duration measurement
- ✅ Sampling interval 200ms

## Skalabilitas

### Current Limitations
- File disimpan di filesystem (bukan database)
- Tidak ada cleanup otomatis untuk old files
- Single server (tidak distributed)
- Tidak ada queue untuk long-running tasks

### Potential Improvements
- Streaming encryption untuk file sangat besar
- Worker threads untuk CPU-intensive tasks
- Database untuk metadata
- Object storage (S3) untuk files
- Redis untuk caching
- Message queue (RabbitMQ) untuk async tasks

## Performance Considerations

### Optimizations
- Streaming untuk file > 100MB
- Chunked upload/download
- Gzip compression untuk API responses
- Static asset caching

### Bottlenecks
- Enkripsi/dekripsi adalah CPU-bound
- File I/O untuk file besar
- Memory usage untuk file > 500MB

---

**Arsitektur ini dirancang untuk demonstrasi edukatif dengan fokus pada kejelasan dan kemudahan pemahaman.**
