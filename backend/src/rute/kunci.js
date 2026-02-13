const express = require('express');
const router = express.Router();
const { generateRSAKeyPair } = require('../layanan/kripto');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const KEY_DIR = path.join(__dirname, '../penyimpanan/kunci');

/**
 * POST /api/kunci/generate
 * Generate RSA key pair baru
 */
router.post('/generate', async (req, res) => {
    try {
        const { publicKey, privateKey } = generateRSAKeyPair();

        res.json({
            success: true,
            data: {
                publicKey,
                privateKey
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal generate key pair: ' + error.message
        });
    }
});

/**
 * POST /api/kunci/simpan
 * Simpan key pair ke server (untuk simulasi/demo)
 */
router.post('/simpan', async (req, res) => {
    try {
        const { nama, publicKey, privateKey } = req.body;

        if (!nama || !publicKey || !privateKey) {
            return res.status(400).json({
                success: false,
                error: 'Nama, publicKey, dan privateKey wajib diisi'
            });
        }

        const keyId = crypto.randomBytes(8).toString('hex');
        const keyPath = path.join(KEY_DIR, keyId);

        await fs.mkdir(keyPath, { recursive: true });
        await fs.writeFile(path.join(keyPath, 'public.pem'), publicKey);
        await fs.writeFile(path.join(keyPath, 'private.pem'), privateKey);
        await fs.writeFile(path.join(keyPath, 'info.json'), JSON.stringify({
            id: keyId,
            nama,
            createdAt: new Date().toISOString()
        }, null, 2));

        res.json({
            success: true,
            data: {
                keyId,
                nama,
                message: '⚠️ Key pair disimpan di server. Ini hanya untuk demo lokal!'
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal menyimpan key: ' + error.message
        });
    }
});

/**
 * GET /api/kunci/daftar
 * Daftar key pair yang tersimpan di server
 */
router.get('/daftar', async (req, res) => {
    try {
        const files = await fs.readdir(KEY_DIR);
        const keys = [];

        for (const file of files) {
            const infoPath = path.join(KEY_DIR, file, 'info.json');
            try {
                const info = JSON.parse(await fs.readFile(infoPath, 'utf-8'));
                keys.push(info);
            } catch (error) {
                // Skip jika bukan folder key yang valid
            }
        }

        res.json({
            success: true,
            data: keys
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Gagal membaca daftar key: ' + error.message
        });
    }
});

/**
 * GET /api/kunci/:keyId/public
 * Ambil public key berdasarkan ID
 */
router.get('/:keyId/public', async (req, res) => {
    try {
        const { keyId } = req.params;
        const publicKeyPath = path.join(KEY_DIR, keyId, 'public.pem');
        const publicKey = await fs.readFile(publicKeyPath, 'utf-8');

        res.json({
            success: true,
            data: { publicKey }
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: 'Public key tidak ditemukan'
        });
    }
});

module.exports = router;
