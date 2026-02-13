# Keamanan & Best Practices

## Implementasi Kriptografi

### AES-256-GCM

**Spesifikasi:**
- Algorithm: AES (Advanced Encryption Standard)
- Key size: 256-bit (32 bytes)
- Mode: GCM (Galois/Counter Mode)
- Nonce size: 12 bytes (96-bit)
- Authentication tag: 16 bytes (128-bit)

**Keamanan:**
- ✅ AES-256 adalah standar enkripsi yang digunakan oleh pemerintah dan industri
- ✅ GCM mode memberikan confidentiality + integrity
- ✅ Authentication tag melindungi dari tampering
- ✅ Nonce unik per enkripsi mencegah pattern analysis

**Implementasi:**
```javascript
const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, nonce);
const ciphertext = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);
const authTag = cipher.getAuthTag();
```

**Best Practices:**
- ✅ Generate nonce secara random untuk setiap enkripsi
- ✅ Simpan nonce dan authTag bersama ciphertext
- ✅ Verifikasi authTag sebelum dekripsi
- ❌ Jangan reuse nonce dengan key yang sama
- ❌ Jangan gunakan mode ECB (tidak aman)

### RSA-OAEP

**Spesifikasi:**
- Algorithm: RSA (Rivest-Shamir-Adleman)
- Key size: 2048-bit
- Padding: OAEP (Optimal Asymmetric Encryption Padding)
- Hash: SHA-256

**Keamanan:**
- ✅ RSA-2048 aman untuk penggunaan jangka panjang
- ✅ OAEP padding melindungi dari berbagai serangan
- ✅ Public/private key system memecahkan masalah distribusi kunci

**Implementasi:**
```javascript
const encrypted = crypto.publicEncrypt({
  key: publicKeyPEM,
  padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  oaepHash: 'sha256'
}, aesKey);
```

**Best Practices:**
- ✅ Gunakan key size minimal 2048-bit
- ✅ Gunakan OAEP padding (bukan PKCS1 v1.5)
- ✅ Hanya enkripsi data kecil (kunci AES, bukan file)
- ❌ Jangan gunakan RSA untuk enkripsi file besar
- ❌ Jangan share private key

## Manajemen Kunci

### Private Key

**Penyimpanan:**
- ✅ Simpan di tempat aman (encrypted storage, hardware token)
- ✅ Backup di lokasi terpisah
- ✅ Gunakan password untuk melindungi private key file
- ❌ Jangan simpan di version control (git)
- ❌ Jangan kirim via email/chat
- ❌ Jangan simpan di server tanpa enkripsi

**Akses:**
- ✅ Hanya pemilik yang boleh akses
- ✅ Gunakan permission yang ketat (chmod 600)
- ✅ Log semua akses ke private key
- ❌ Jangan share dengan siapa pun
- ❌ Jangan tampilkan di screen yang bisa dilihat orang lain

### Public Key

**Distribusi:**
- ✅ Aman untuk dibagikan secara publik
- ✅ Bisa dikirim via email, website, dll
- ✅ Verifikasi authenticity (fingerprint, signature)

**Verifikasi:**
- ✅ Pastikan public key berasal dari pemilik yang benar
- ✅ Gunakan channel terpisah untuk verifikasi
- ✅ Check fingerprint/hash dari public key

### Key Rotation

**Kapan rotate:**
- Private key bocor atau dicurigai bocor
- Setelah periode tertentu (misal: 1 tahun)
- Setelah perubahan personel yang memiliki akses
- Setelah security incident

**Prosedur:**
1. Generate key pair baru
2. Distribute public key baru
3. Migrate data ke enkripsi dengan key baru
4. Revoke key lama
5. Destroy private key lama secara aman

## Ancaman & Mitigasi

### 1. Brute Force Attack

**Ancaman:**
Mencoba semua kombinasi kunci untuk mendekripsi data.

**Mitigasi:**
- ✅ Gunakan key size yang cukup (AES-256, RSA-2048+)
- ✅ AES-256 memiliki 2^256 kombinasi (praktis tidak mungkin di-brute force)
- ✅ Monitoring untuk detect brute force attempts

**Estimasi:**
Dengan 1 miliar percobaan/detik:
- AES-128: ~10^25 tahun
- AES-256: ~10^56 tahun (jutaan kali usia alam semesta)

### 2. Man-in-the-Middle (MITM)

**Ancaman:**
Penyerang intercept komunikasi dan modifikasi data.

**Mitigasi:**
- ✅ Authentication tag (GCM) detect tampering
- ✅ Verifikasi public key authenticity
- ✅ Gunakan HTTPS untuk komunikasi (production)
- ❌ Aplikasi demo ini tidak menggunakan HTTPS (localhost only)

### 3. Key Compromise

**Ancaman:**
Private key bocor atau dicuri.

**Mitigasi:**
- ✅ Simpan private key dengan enkripsi
- ✅ Gunakan hardware security module (HSM) untuk production
- ✅ Implement key rotation
- ✅ Monitor akses ke private key
- ✅ Revoke key yang bocor segera

### 4. Side-Channel Attacks

**Ancaman:**
Analisis timing, power consumption, dll untuk extract kunci.

**Mitigasi:**
- ✅ Gunakan library kriptografi yang sudah teruji (Node.js crypto)
- ✅ Constant-time operations
- ❌ Aplikasi demo tidak implement semua mitigasi (bukan production-ready)

### 5. Replay Attack

**Ancaman:**
Penyerang replay paket lama.

**Mitigasi:**
- ✅ Timestamp di metadata
- ✅ Unique nonce per enkripsi
- ❌ Aplikasi demo tidak implement nonce tracking (bukan production-ready)

## Keterbatasan Aplikasi Demo

### ⚠️ TIDAK UNTUK PRODUCTION

Aplikasi ini dibuat untuk **tujuan edukatif**. Untuk production:

**Missing Features:**
- ❌ Tidak ada autentikasi user
- ❌ Tidak ada authorization/access control
- ❌ Tidak ada HTTPS/TLS
- ❌ Tidak ada enkripsi at-rest untuk file di server
- ❌ Tidak ada audit logging
- ❌ Tidak ada rate limiting
- ❌ Tidak ada input sanitization lengkap
- ❌ Tidak ada secure key storage (HSM)
- ❌ Tidak ada key rotation otomatis
- ❌ Tidak ada backup & disaster recovery

**Security Assumptions:**
- ✅ Aplikasi berjalan di localhost (trusted environment)
- ✅ User adalah trusted (tidak ada malicious user)
- ✅ Network adalah trusted (tidak ada MITM)
- ✅ File system adalah trusted (tidak ada unauthorized access)

## Best Practices untuk Production

### 1. Authentication & Authorization
- Implement user authentication (JWT, OAuth)
- Role-based access control (RBAC)
- Multi-factor authentication (MFA)

### 2. Transport Security
- HTTPS/TLS untuk semua komunikasi
- Certificate pinning
- HSTS headers

### 3. Data Security
- Enkripsi at-rest untuk semua file
- Secure key storage (HSM, KMS)
- Data classification & handling

### 4. Monitoring & Logging
- Audit log untuk semua operasi kriptografi
- Anomaly detection
- Security event monitoring (SIEM)

### 5. Compliance
- GDPR untuk data privacy
- SOC 2 untuk security controls
- ISO 27001 untuk information security

### 6. Incident Response
- Incident response plan
- Key revocation procedure
- Data breach notification

## Checklist Keamanan

### Development
- [ ] Code review untuk security issues
- [ ] Static analysis (SAST)
- [ ] Dependency vulnerability scanning
- [ ] Secret scanning (no hardcoded keys)

### Deployment
- [ ] HTTPS/TLS enabled
- [ ] Firewall configured
- [ ] Security headers (CSP, HSTS, dll)
- [ ] Rate limiting
- [ ] Input validation & sanitization

### Operations
- [ ] Regular security updates
- [ ] Penetration testing
- [ ] Vulnerability assessment
- [ ] Backup & disaster recovery testing

### Compliance
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Data retention policy
- [ ] Incident response plan

---

## Kesimpulan

Encrypter.id mengimplementasikan kriptografi yang **benar dan aman** untuk demonstrasi edukatif. Namun, untuk penggunaan production dengan data sensitif, diperlukan **banyak layer keamanan tambahan** di luar kriptografi itu sendiri.

**Prinsip Utama:**
1. **Defense in Depth**: Multiple layers of security
2. **Least Privilege**: Minimal access yang diperlukan
3. **Fail Secure**: Default ke secure state saat error
4. **Keep it Simple**: Complexity adalah musuh security

**Remember:**
> "Kriptografi yang kuat tidak membuat sistem aman. Kriptografi hanya satu bagian dari security yang komprehensif."

---

**Untuk pertanyaan keamanan, silakan konsultasikan dengan security professional.**
