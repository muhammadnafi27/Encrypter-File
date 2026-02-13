const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
    extractEncryptedPackage,
    decryptAESKeyWithRSA,
    decryptFileAES
} = require('../layanan/kripto');
const { monitorPerformance } = require('../utils/monitoring');

const INBOX_DIR = path.join(__dirname, '../penyimpanan/kotak_masuk_penerima');
const DECRYPT_DIR = path.join(__dirname, '../penyimpanan/hasil_dekripsi');

/**
 * GET /api/dekripsi/kotak-masuk
 * Daftar paket di kotak masuk penerima
 */
router.get('/kotak-masuk', async (req, res) => {
    try {
        const files = await fs.readdir(INBOX_DIR);
        const packages = [];

        for (const file of files) {
            if (file.endsWith('.encpack')) {
                const filePath = path.join(INBOX_DIR, file);
                const stats = await fs.stat(filePath);

                try {
                    const { metadata } = await extractEncryptedPackage(filePath);
                    packages.push({
                        packageId: metadata.id_paket,
                        fileName: file,
                        originalName: metadata.nama_file_asli,
                        deskripsi: metadata.deskripsi || '', // Tambahkan deskripsi
                        originalSize: metadata.ukuran_asli,
                        encryptedSize: metadata.ukuran_ciphertext,
                        timestamp: metadata.timestamp,
                        fileSize: stats.size
                    });
                } catch (error) {
                    // Skip paket yang corrupt
                    console.error(`Error reading package ${file}:`, error);
                }
            }
        }

        // Sort by timestamp descending
        packages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            data: packages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal membaca kotak masuk: ' + error.message
        });
    }
});

/**
 * DELETE /api/dekripsi/kotak-masuk/:packageId
 * Hapus paket dari kotak masuk penerima
 */
router.delete('/kotak-masuk/:packageId', async (req, res) => {
    try {
        const { packageId } = req.params;
        const packagePath = path.join(INBOX_DIR, `${packageId}.encpack`);

        // Check if file exists
        try {
            await fs.access(packagePath);
        } catch {
            return res.status(404).json({
                success: false,
                error: 'Paket tidak ditemukan'
            });
        }

        // Delete the file
        await fs.unlink(packagePath);

        res.json({
            success: true,
            data: { message: 'Paket berhasil dihapus' }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal menghapus paket: ' + error.message
        });
    }
});

/**
 * DELETE /api/dekripsi/kotak-masuk
 * Hapus SEMUA paket dari kotak masuk penerima
 */
router.delete('/kotak-masuk', async (req, res) => {
    try {
        const files = await fs.readdir(INBOX_DIR);
        let deletedCount = 0;

        for (const file of files) {
            if (file.endsWith('.encpack')) {
                await fs.unlink(path.join(INBOX_DIR, file));
                deletedCount++;
            }
        }

        res.json({
            success: true,
            data: {
                message: 'Semua paket berhasil dihapus',
                count: deletedCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal membersihkan kotak masuk: ' + error.message
        });
    }
});

/**
 * POST /api/dekripsi/proses
 * Dekripsi paket
 */
router.post('/proses', async (req, res) => {
    try {
        const { packageId, privateKey } = req.body;

        if (!packageId || !privateKey) {
            return res.status(400).json({
                success: false,
                error: 'packageId dan privateKey wajib diisi'
            });
        }

        const packagePath = path.join(INBOX_DIR, `${packageId}.encpack`);

        // Extract paket
        const { metadata, ciphertext } = await extractEncryptedPackage(packagePath);

        // Proses dekripsi dengan monitoring
        const { result, stats } = await monitorPerformance(async () => {
            try {
                // Dekripsi AES key dengan RSA private key
                const aesKey = decryptAESKeyWithRSA(metadata.encryptedAESKey, privateKey);

                // Dekripsi file dengan AES
                const decryptedBuffer = decryptFileAES(
                    ciphertext,
                    aesKey,
                    metadata.nonce,
                    metadata.authTag
                );

                // Simpan file hasil dekripsi
                const decryptedId = crypto.randomBytes(16).toString('hex');
                const decryptedPath = path.join(DECRYPT_DIR, `${decryptedId}-${metadata.nama_file_asli}`);
                await fs.writeFile(decryptedPath, decryptedBuffer);

                return {
                    decryptedId,
                    decryptedPath,
                    originalName: metadata.nama_file_asli,
                    size: decryptedBuffer.length
                };
            } catch (error) {
                if (error.message.includes('INTEGRITAS_TIDAK_VALID')) {
                    throw new Error('⚠️ INTEGRITAS TIDAK VALID: File telah dimodifikasi atau rusak. Dekripsi dibatalkan.');
                }
                throw error;
            }
        });

        res.json({
            success: true,
            data: {
                decryptedId: result.decryptedId,
                originalName: result.originalName,
                deskripsi: metadata.deskripsi || '', // Include description
                size: result.size,
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
            error: error.message
        });
    }
});

/**
 * GET /api/dekripsi/download/:decryptedId
 * Download file hasil dekripsi
 */
router.get('/download/:decryptedId', async (req, res) => {
    try {
        const { decryptedId } = req.params;

        // Cari file yang dimulai dengan decryptedId
        const files = await fs.readdir(DECRYPT_DIR);
        const targetFile = files.find(f => f.startsWith(decryptedId));

        if (!targetFile) {
            return res.status(404).json({
                success: false,
                error: 'File tidak ditemukan'
            });
        }

        const filePath = path.join(DECRYPT_DIR, targetFile);

        // Extract original name (remove decryptedId prefix)
        const originalName = targetFile.substring(decryptedId.length + 1);

        res.download(filePath, originalName);
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'File tidak ditemukan: ' + error.message
        });
    }
});

module.exports = router;
