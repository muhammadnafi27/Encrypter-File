const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
    generateAESKey,
    encryptFileAES,
    encryptAESKeyWithRSA,
    createEncryptedPackage
} = require('../layanan/kripto');
const { monitorPerformance } = require('../utils/monitoring');

const UPLOAD_DIR = path.join(__dirname, '../penyimpanan/unggahan');
const PACKAGE_DIR = path.join(__dirname, '../penyimpanan/paket_terenkripsi');
const INBOX_DIR = path.join(__dirname, '../penyimpanan/kotak_masuk_penerima');

// Konfigurasi multer untuk upload
const storage = multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 524288000 } // 500MB
});

/**
 * POST /api/enkripsi/upload
 * Upload file untuk dienkripsi
 */
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'File tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: {
                fileId: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                path: req.file.path
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal upload file: ' + error.message
        });
    }
});

/**
 * POST /api/enkripsi/proses
 * Enkripsi file dan buat paket
 */
router.post('/proses', async (req, res) => {
    try {
        const { fileId, publicKey, originalName } = req.body;

        if (!fileId || !publicKey) {
            return res.status(400).json({
                success: false,
                error: 'fileId dan publicKey wajib diisi'
            });
        }

        const filePath = path.join(UPLOAD_DIR, fileId);

        // Baca file
        const fileBuffer = await fs.readFile(filePath);
        const originalSize = fileBuffer.length;

        // Proses enkripsi dengan monitoring
        const { result, stats } = await monitorPerformance(async () => {
            // Generate AES key
            const aesKey = generateAESKey();

            // Enkripsi file dengan AES
            const { nonce, authTag, ciphertext } = encryptFileAES(fileBuffer, aesKey);

            // Enkripsi AES key dengan RSA
            const encryptedAESKey = encryptAESKeyWithRSA(aesKey, publicKey);

            // Buat metadata
            const packageId = crypto.randomBytes(16).toString('hex');
            const metadata = {
                id_paket: packageId,
                nama_file_asli: originalName || fileId,
                deskripsi: req.body.deskripsi || '', // Tambahkan deskripsi
                ukuran_asli: originalSize,
                ukuran_ciphertext: ciphertext.length,
                algoritma: {
                    enkripsi_file: 'AES-256-GCM',
                    enkripsi_kunci: 'RSA-OAEP',
                    ukuran_kunci_rsa: 2048
                },
                nonce,
                authTag,
                encryptedAESKey,
                timestamp: new Date().toISOString()
            };

            // Buat paket .zip
            const packagePath = path.join(PACKAGE_DIR, `${packageId}.encpack`);
            await createEncryptedPackage(metadata, ciphertext, packagePath);

            return {
                packageId,
                packagePath,
                metadata,
                ciphertextSize: ciphertext.length
            };
        });

        res.json({
            success: true,
            data: {
                packageId: result.packageId,
                originalSize,
                encryptedSize: result.ciphertextSize,
                stats: {
                    duration: stats.duration,
                    avgCPU: stats.avgCPU,
                    peakCPU: stats.peakCPU,
                    avgRAM: stats.avgRAM,
                    peakRAM: stats.peakRAM
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal enkripsi file: ' + error.message
        });
    }
});

/**
 * POST /api/enkripsi/kirim
 * Simulasi kirim paket ke kotak masuk penerima
 */
router.post('/kirim', async (req, res) => {
    try {
        const { packageId } = req.body;

        if (!packageId) {
            return res.status(400).json({
                success: false,
                error: 'packageId wajib diisi'
            });
        }

        const sourcePath = path.join(PACKAGE_DIR, `${packageId}.encpack`);
        const destPath = path.join(INBOX_DIR, `${packageId}.encpack`);

        // Copy paket ke kotak masuk
        await fs.copyFile(sourcePath, destPath);

        res.json({
            success: true,
            message: 'Paket berhasil dikirim ke kotak masuk penerima'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal mengirim paket: ' + error.message
        });
    }
});

/**
 * GET /api/enkripsi/download/:packageId
 * Download paket terenkripsi
 */
router.get('/download/:packageId', async (req, res) => {
    try {
        const { packageId } = req.params;
        const packagePath = path.join(PACKAGE_DIR, `${packageId}.encpack`);

        res.download(packagePath, `${packageId}.encpack`);
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Paket tidak ditemukan'
        });
    }
});

module.exports = router;
