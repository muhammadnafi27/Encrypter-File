const crypto = require('crypto');
const archiver = require('archiver');
const unzipper = require('unzipper');
const fs = require('fs').promises;
const path = require('path');
const { Readable } = require('stream');

/**
 * Generate random AES-256 key (32 bytes)
 */
function generateAESKey() {
  return crypto.randomBytes(32);
}

/**
 * Enkripsi file menggunakan AES-256-GCM
 * @param {Buffer} fileBuffer - File buffer yang akan dienkripsi
 * @param {Buffer} aesKey - AES key 32 bytes
 * @returns {Object} { nonce, authTag, ciphertext }
 */
function encryptFileAES(fileBuffer, aesKey) {
  // Generate random nonce (12 bytes untuk GCM)
  const nonce = crypto.randomBytes(12);
  
  // Buat cipher AES-256-GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', aesKey, nonce);
  
  // Enkripsi data
  const ciphertext = Buffer.concat([
    cipher.update(fileBuffer),
    cipher.final()
  ]);
  
  // Dapatkan authentication tag
  const authTag = cipher.getAuthTag();
  
  return {
    nonce: nonce.toString('base64'),
    authTag: authTag.toString('base64'),
    ciphertext
  };
}

/**
 * Dekripsi file menggunakan AES-256-GCM
 * @param {Buffer} ciphertext - Encrypted data
 * @param {Buffer} aesKey - AES key 32 bytes
 * @param {string} nonceBase64 - Nonce dalam base64
 * @param {string} authTagBase64 - Auth tag dalam base64
 * @returns {Buffer} Decrypted file buffer
 */
function decryptFileAES(ciphertext, aesKey, nonceBase64, authTagBase64) {
  try {
    const nonce = Buffer.from(nonceBase64, 'base64');
    const authTag = Buffer.from(authTagBase64, 'base64');
    
    // Buat decipher AES-256-GCM
    const decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, nonce);
    
    // Set authentication tag
    decipher.setAuthTag(authTag);
    
    // Dekripsi data
    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final()
    ]);
    
    return decrypted;
  } catch (error) {
    if (error.message.includes('Unsupported state or unable to authenticate data')) {
      throw new Error('INTEGRITAS_TIDAK_VALID: File telah dimodifikasi atau rusak');
    }
    throw error;
  }
}

/**
 * Generate RSA key pair (2048-bit)
 * @returns {Object} { publicKey, privateKey } dalam format PEM
 */
function generateRSAKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  
  return { publicKey, privateKey };
}

/**
 * Enkripsi AES key menggunakan RSA public key (RSA-OAEP)
 * @param {Buffer} aesKey - AES key 32 bytes
 * @param {string} publicKeyPEM - RSA public key dalam format PEM
 * @returns {string} Encrypted AES key dalam base64
 */
function encryptAESKeyWithRSA(aesKey, publicKeyPEM) {
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKeyPEM,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    aesKey
  );
  
  return encrypted.toString('base64');
}

/**
 * Dekripsi AES key menggunakan RSA private key (RSA-OAEP)
 * @param {string} encryptedKeyBase64 - Encrypted AES key dalam base64
 * @param {string} privateKeyPEM - RSA private key dalam format PEM
 * @returns {Buffer} Decrypted AES key
 */
function decryptAESKeyWithRSA(encryptedKeyBase64, privateKeyPEM) {
  const encryptedKey = Buffer.from(encryptedKeyBase64, 'base64');
  
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKeyPEM,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256'
    },
    encryptedKey
  );
  
  return decrypted;
}

/**
 * Buat paket terenkripsi (.zip berisi metadata.json + ciphertext.bin)
 * @param {Object} metadata - Metadata paket
 * @param {Buffer} ciphertext - Encrypted file buffer
 * @param {string} outputPath - Path untuk menyimpan .zip
 * @returns {Promise<string>} Path file .zip yang dibuat
 */
async function createEncryptedPackage(metadata, ciphertext, outputPath) {
  return new Promise((resolve, reject) => {
    const output = require('fs').createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    output.on('close', () => resolve(outputPath));
    archive.on('error', reject);
    
    archive.pipe(output);
    
    // Tambahkan metadata.json
    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });
    
    // Tambahkan ciphertext.bin
    archive.append(ciphertext, { name: 'ciphertext.bin' });
    
    archive.finalize();
  });
}

/**
 * Extract paket terenkripsi (.zip)
 * @param {string} zipPath - Path file .zip
 * @returns {Promise<Object>} { metadata, ciphertext }
 */
async function extractEncryptedPackage(zipPath) {
  const directory = await unzipper.Open.file(zipPath);
  
  let metadata = null;
  let ciphertext = null;
  
  for (const file of directory.files) {
    if (file.path === 'metadata.json') {
      const content = await file.buffer();
      metadata = JSON.parse(content.toString());
    } else if (file.path === 'ciphertext.bin') {
      ciphertext = await file.buffer();
    }
  }
  
  if (!metadata || !ciphertext) {
    throw new Error('Paket tidak valid: metadata atau ciphertext tidak ditemukan');
  }
  
  return { metadata, ciphertext };
}

module.exports = {
  generateAESKey,
  encryptFileAES,
  decryptFileAES,
  generateRSAKeyPair,
  encryptAESKeyWithRSA,
  decryptAESKeyWithRSA,
  createEncryptedPackage,
  extractEncryptedPackage
};
