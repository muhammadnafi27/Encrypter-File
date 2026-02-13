# 🔑 Public Key untuk Simulasi

Gunakan public key di bawah ini untuk testing enkripsi file:

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk65dCmU7zKKzULF+1lcW
Xv66IseAkxBSFocEXbnuYq/ddDYkxWvVI+9anRkL/7URVB68d52rRZNV5Xg/sT8A
qSPxMxtSCQsQmgC9nw9JZqDFTSwoh/xBIUsGVsrxyqpXwO4/iD/tAJO5Hku+7iZN
PNevG69zRjE7E/+mb1XbQU0qoOI5MBG4saQ0VrQsGqp9uGjvWIOvFoejwjtqxcXH
ZaueoKqZxGmhfKt5pSO2rX38Zd3bWy+0yJ2cKLUR34ZYlyZ5R815BGGzgCp9nMHl
q3BmKsfOnBSKikWo2sMujtGMG3DwpAdN3twsI8kMQ5wqSpH59WzNaC38fBRzMUb0
7wIDAQAB
-----END PUBLIC KEY-----
```

## 📋 Cara Menggunakan:

### Untuk Pengirim (Enkripsi File):
1. Copy seluruh text public key di atas (termasuk `-----BEGIN PUBLIC KEY-----` dan `-----END PUBLIC KEY-----`)
2. Buka halaman "Upload File" 
3. Pilih tab **"Pengirim"**
4. Upload file yang ingin dienkripsi (contoh: `sample_document.txt`)
5. Paste public key di kotak yang tersedia
6. Klik "Enkripsi & Kirim"
7. Download paket terenkripsi

### Untuk Penerima (Dekripsi File):
1. Gunakan private key yang ada di file `private_key_demo.pem`
2. Pilih tab **"Penerima"**
3. Upload paket terenkripsi (.zip)
4. Paste private key
5. Klik "Dekripsi"
6. Download file asli

---

## ⚠️ Catatan Penting:

- **Public key ini AMAN untuk dibagikan** - Anda bisa share ke siapa saja
- Private key yang sesuai ada di file `private_key_demo.pem` - **JANGAN DIBAGIKAN!**
- Untuk production, selalu generate key pair baru di halaman "Kelola Kunci RSA"

---

Happy Testing! 🚀
