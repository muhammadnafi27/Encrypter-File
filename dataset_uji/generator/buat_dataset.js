const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const OUTPUT_DIR = path.join(__dirname, '../contoh');

const SIZES = {
    '1MB': 1024 * 1024,
    '5MB': 5 * 1024 * 1024,
    '10MB': 10 * 1024 * 1024,
    '100MB': 100 * 1024 * 1024
};

async function generateDataset() {
    console.log('🔧 Generator Dataset Encrypter.id\n');

    // Buat folder output jika belum ada
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    for (const [label, size] of Object.entries(SIZES)) {
        const fileName = `test_${label}.bin`;
        const filePath = path.join(OUTPUT_DIR, fileName);

        console.log(`📦 Membuat ${fileName} (${size.toLocaleString()} bytes)...`);

        const startTime = Date.now();

        // Generate random bytes
        const buffer = crypto.randomBytes(size);

        // Tulis ke file
        await fs.writeFile(filePath, buffer);

        const duration = Date.now() - startTime;
        console.log(`   ✅ Selesai dalam ${duration}ms\n`);
    }

    console.log('✨ Semua dataset berhasil dibuat!\n');
    console.log('📁 Lokasi:', OUTPUT_DIR);
}

generateDataset().catch(console.error);
