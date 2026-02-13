# Testing Guide - Encrypter.id

## File Sample untuk Testing

Saya telah membuatkan beberapa file untuk testing fitur upload dan enkripsi:

### 1. Sample Documents

- **sample_document.txt** - Dokumen rahasia dengan informasi teknis
- **sample_image_data.txt** - Data statistik dan analytics

### 2. RSA Key Pair

- **public_key_demo.pem** - Public key untuk enkripsi (aman untuk dibagikan)
- **private_key_demo.pem** - Private key untuk dekripsi (RAHASIA!)

---

## Cara Testing Upload & Enkripsi

### Sebagai Penerima (Buat Kunci):

1. Buka halaman **"Kelola Kunci RSA"**
2. Klik tombol **"Generate RSA Key Pair"**
3. Copy atau download **public key**
4. Simpan **private key** dengan aman (jangan share!)

**ATAU** gunakan file yang sudah saya buatkan:

- Public key: `public_key_demo.pem`
- Private key: `private_key_demo.pem`

### Sebagai Pengirim (Enkripsi File):

1. Buka halaman **"Upload & Enkripsi"**
2. Pilih tab **"Pengirim"**
3. Upload file sample (contoh: `sample_document.txt`)
4. Paste public key dari penerima (atau dari `public_key_demo.pem`)
5. Klik **"Enkripsi & Kirim"**
6. Download paket terenkripsi (.zip)

### Sebagai Penerima (Dekripsi File):

1. Buka halaman **"Upload & Enkripsi"**
2. Pilih tab **"Penerima"**
3. Upload paket terenkripsi (.zip)
4. Paste private key Anda (atau dari `private_key_demo.pem`)
5. Klik **"Dekripsi"**
6. Download file asli yang sudah didekripsi

---

## File Locations

```
frontend/
├── sample_document.txt          # Sample confidential document
├── sample_image_data.txt        # Sample analytics data
├── public_key_demo.pem          # Demo public key (safe to share)
├── private_key_demo.pem         # Demo private key (KEEP SECRET!)
└── README_TESTING.md            # This file
```

---

## Tips Testing

### ✅ DO:

- Test dengan file kecil dulu (< 1MB)
- Coba berbagai jenis file (txt, pdf, jpg, dll)
- Test enkripsi dan dekripsi end-to-end
- Verify bahwa file hasil dekripsi sama dengan original

### ❌ DON'T:

- Jangan share private key demo ke production
- Jangan test dengan file terlalu besar (> 100MB) untuk development
- Jangan lupa delete paket terenkripsi setelah testing

---

## Expected Behavior

### Enkripsi Success:

- File terenkripsi dengan AES-256-GCM
- Kunci AES terenkripsi dengan RSA public key
- Paket .zip berisi: encrypted file + encrypted key + metadata
- Toast notification: "Enkripsi berhasil!"

### Dekripsi Success:

- Private key mendekripsi kunci AES
- Kunci AES mendekripsi file
- File asli ter-restore dengan sempurna
- Toast notification: "Dekripsi berhasil!"

### Error Cases:

- Invalid public/private key → "Format kunci tidak valid"
- Wrong private key → "Dekripsi gagal, private key salah"
- Corrupted file → "File rusak atau tidak valid"

---

## Troubleshooting

**Q: Dekripsi gagal dengan "private key salah"**  
A: Pastikan Anda menggunakan private key yang sesuai dengan public key yang digunakan untuk enkripsi

**Q: File hasil dekripsi berbeda dari original**  
A: Kemungkinan file terenkripsi corrupt atau ada error di proses enkripsi

**Q: Enkripsi sangat lambat**  
A: Normal untuk file besar. AES-256-GCM memproses ~100MB dalam ~4-5 detik

---

Happy Testing! 🔐✨
