const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

// Import routes
const kunciRoutes = require('./rute/kunci');
const enkripsiRoutes = require('./rute/enkripsi');
const dekripsiRoutes = require('./rute/dekripsi');
const benchmarkRoutes = require('./rute/benchmark');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files dari frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Serve background folder dengan MIME types yang benar
const staticOptions = {
    setHeaders: (res, path) => {
        if (path.endsWith('.webm')) {
            res.setHeader('Content-Type', 'video/webm');
            res.setHeader('Cache-Control', 'public, max-age=604800'); // 1 week
        }
    }
};
app.use('/background', express.static(path.join(__dirname, '../../frontend/background'), staticOptions));

// API Routes
app.use('/api/kunci', kunciRoutes);
app.use('/api/enkripsi', enkripsiRoutes);
app.use('/api/dekripsi', dekripsiRoutes);
app.use('/api/benchmark', benchmarkRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Encrypter.id Backend berjalan dengan baik',
        timestamp: new Date().toISOString()
    });
});

// Serve frontend untuk semua route lainnya (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Terjadi kesalahan pada server',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Buat folder penyimpanan jika belum ada
async function ensureDirectories() {
    const dirs = [
        path.join(__dirname, 'penyimpanan/unggahan'),
        path.join(__dirname, 'penyimpanan/paket_terenkripsi'),
        path.join(__dirname, 'penyimpanan/kotak_masuk_penerima'),
        path.join(__dirname, 'penyimpanan/hasil_dekripsi'),
        path.join(__dirname, 'penyimpanan/kunci'),
        path.join(__dirname, 'penyimpanan/hasil_benchmark')
    ];

    for (const dir of dirs) {
        try {
            await fs.mkdir(dir, { recursive: true });
        } catch (error) {
            console.error(`Error creating directory ${dir}:`, error);
        }
    }
}

// Start server
async function startServer() {
    await ensureDirectories();

    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🔐  ENCRYPTER.ID BACKEND SERVER                        ║
║                                                           ║
║   Status: RUNNING                                         ║
║   Port: ${PORT}                                              ║
║   URL: http://localhost:${PORT}                              ║
║                                                           ║
║   Hybrid Cryptography: AES-256-GCM + RSA-OAEP            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
    });
}

startServer().catch(console.error);

module.exports = app;
