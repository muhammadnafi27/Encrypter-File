const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const {
    generateAESKey,
    encryptFileAES,
    decryptFileAES,
    generateRSAKeyPair,
    encryptAESKeyWithRSA,
    decryptAESKeyWithRSA
} = require('../layanan/kripto');
const { monitorPerformance } = require('../utils/monitoring');

const BENCHMARK_DIR = path.join(__dirname, '../penyimpanan/hasil_benchmark');
const DATASET_DIR = path.join(__dirname, '../../../dataset_uji/contoh');

/**
 * POST /api/benchmark/jalankan
 * Jalankan benchmark dengan dataset
 */
router.post('/jalankan', async (req, res) => {
    try {
        const { fileSizes } = req.body; // Array: ['1MB', '5MB', '10MB', '100MB']

        if (!fileSizes || !Array.isArray(fileSizes)) {
            return res.status(400).json({
                success: false,
                error: 'fileSizes harus berupa array'
            });
        }

        const results = [];
        const { publicKey, privateKey } = generateRSAKeyPair();

        for (const size of fileSizes) {
            const fileName = `test_${size}.bin`;
            const filePath = path.join(DATASET_DIR, fileName);

            try {
                // Baca file
                const fileBuffer = await fs.readFile(filePath);
                const fileSize = fileBuffer.length;

                // Benchmark enkripsi
                const encryptResult = await monitorPerformance(async () => {
                    const aesKey = generateAESKey();
                    const { nonce, authTag, ciphertext } = encryptFileAES(fileBuffer, aesKey);
                    const encryptedAESKey = encryptAESKeyWithRSA(aesKey, publicKey);

                    return { aesKey, nonce, authTag, ciphertext, encryptedAESKey };
                });

                // Benchmark dekripsi
                const decryptResult = await monitorPerformance(async () => {
                    const aesKey = decryptAESKeyWithRSA(encryptResult.result.encryptedAESKey, privateKey);
                    const decrypted = decryptFileAES(
                        encryptResult.result.ciphertext,
                        aesKey,
                        encryptResult.result.nonce,
                        encryptResult.result.authTag
                    );
                    return decrypted;
                });

                results.push({
                    size,
                    fileSize,
                    encryption: {
                        duration: encryptResult.stats.duration,
                        avgCPU: encryptResult.stats.avgCPU,
                        peakCPU: encryptResult.stats.peakCPU,
                        avgRAM: encryptResult.stats.avgRAM,
                        peakRAM: encryptResult.stats.peakRAM
                    },
                    decryption: {
                        duration: decryptResult.stats.duration,
                        avgCPU: decryptResult.stats.avgCPU,
                        peakCPU: decryptResult.stats.peakCPU,
                        avgRAM: decryptResult.stats.avgRAM,
                        peakRAM: decryptResult.stats.peakRAM
                    }
                });
            } catch (error) {
                console.error(`Error benchmarking ${size}:`, error);
                results.push({
                    size,
                    error: `File ${fileName} tidak ditemukan atau error: ${error.message}`
                });
            }
        }

        // Simpan hasil benchmark
        const benchmarkId = crypto.randomBytes(8).toString('hex');
        const timestamp = new Date().toISOString();
        const benchmarkData = {
            id: benchmarkId,
            timestamp,
            results
        };

        await fs.writeFile(
            path.join(BENCHMARK_DIR, `benchmark_${benchmarkId}.json`),
            JSON.stringify(benchmarkData, null, 2)
        );

        res.json({
            success: true,
            data: {
                benchmarkId,
                timestamp,
                results
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal menjalankan benchmark: ' + error.message
        });
    }
});

/**
 * GET /api/benchmark/hasil
 * Ambil daftar hasil benchmark
 */
router.get('/hasil', async (req, res) => {
    try {
        const files = await fs.readdir(BENCHMARK_DIR);
        const benchmarks = [];

        for (const file of files) {
            if (file.startsWith('benchmark_') && file.endsWith('.json')) {
                const content = await fs.readFile(path.join(BENCHMARK_DIR, file), 'utf-8');
                benchmarks.push(JSON.parse(content));
            }
        }

        // Sort by timestamp descending
        benchmarks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.json({
            success: true,
            data: benchmarks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal membaca hasil benchmark: ' + error.message
        });
    }
});

/**
 * GET /api/benchmark/export/:benchmarkId/:format
 * Export hasil benchmark ke CSV atau JSON
 */
router.get('/export/:benchmarkId/:format', async (req, res) => {
    try {
        const { benchmarkId, format } = req.params;

        const filePath = path.join(BENCHMARK_DIR, `benchmark_${benchmarkId}.json`);
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);

        if (format === 'json') {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', `attachment; filename=benchmark_${benchmarkId}.json`);
            res.send(JSON.stringify(data, null, 2));
        } else if (format === 'csv') {
            // Convert to CSV
            let csv = 'Ukuran,Ukuran Bytes,Enkripsi Durasi (ms),Enkripsi CPU Avg (%),Enkripsi CPU Peak (%),Enkripsi RAM Avg (bytes),Enkripsi RAM Peak (bytes),Dekripsi Durasi (ms),Dekripsi CPU Avg (%),Dekripsi CPU Peak (%),Dekripsi RAM Avg (bytes),Dekripsi RAM Peak (bytes)\n';

            for (const result of data.results) {
                if (!result.error) {
                    csv += `${result.size},${result.fileSize},${result.encryption.duration},${result.encryption.avgCPU},${result.encryption.peakCPU},${result.encryption.avgRAM},${result.encryption.peakRAM},${result.decryption.duration},${result.decryption.avgCPU},${result.decryption.peakCPU},${result.decryption.avgRAM},${result.decryption.peakRAM}\n`;
                }
            }

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=benchmark_${benchmarkId}.csv`);
            res.send(csv);
        } else {
            res.status(400).json({
                success: false,
                error: 'Format tidak valid. Gunakan json atau csv'
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Benchmark tidak ditemukan: ' + error.message
        });
    }
});

module.exports = router;
