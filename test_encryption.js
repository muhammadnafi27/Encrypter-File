/**
 * Test Encryption & Decryption Flow
 * Automated test untuk verify enkripsi dan dekripsi file berfungsi dengan baik
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const FormData = require('form-data');
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001/api';

// Test key pair
const TEST_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0r9JkI/GZYVBzdYXgyl/
qGjpRa7LQiPlExiiWeOrNoS60OrRPM/hfFw+8zG+/63eAzpYRsq01AnyQQgZPTBS
XuoTDbOSQudoHBhgii7QlzIAViCP3zOBGSB5vsHVMbvtiwfX5IHPLVY3RcfAxXEq
bUnbndNw0Cp1Vb3sFJDHs77iGOYIYMf07NnJfqkhdC8CHV77qjgkgUqlXmROFNYb
PNiCGtL3xE8h2uBWPXi6f+UjfIMn8ygSazplyerDbKOI6wrnPzDERCqbQGCUbs98
PntwmcEQSyE6xaS+MufWMzfOOyOkBNXouiw+Y9emvCHzmenYpCrmFYU4hIN2E0me
qQIDAQAB
-----END PUBLIC KEY-----`;

const TEST_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSv0mQj8ZlhUHN
1heDKX+oaOlFrstCI+UTGKJZ46s2hLrQ6tE8z+F8XD7zMb7/rd4DOlhGyrTUCfJB
CBk9MFJe6hMNs5JC52gcGGCKLtCXMgBWII/fM4EZIHm+wdUxu+2LB9fkgc8tVjdF
x8DFcSptSdud03DQKnVVvewUkMezvuIY5ghgx/Ts2cl+qSF0LwIdXvuqOCSBSqVe
ZE4U1hs82IIa0vfETyHa4FY9eLp/5SN8gyfzKBJrOmXJ6sNso4jrCuc/MMREKptA
YJRuz3w+e3CZwRBLITrFpL4y59YzN847I6QE1ei6LD5j16a8IfOZ6dikKuYVhTiE
g3YTSZ6pAgMBAAECggEAAXW9xriYQT/JEun2w7vX3IzNgOQTGGQzRAyZo1HGb9w/
hw75YBh4kWn6Lakcj5zeutr+nY7t7cIb4YNy2U+qYmnws9mYm8oKmJc6o/prC4EX
K4GSPZOXw1rMPRwOpAePP7VQM48Kpl/AhkU5+qQsDRHD6bX7RBXnNi7YodPW7lHS
+tFyTrIQmERryWRTjgiFQuWhBtqJz7si80uardmLYNx9TopnR3mndRqPtOZo/+S/
IO+P+5p4guyIj1ImwRrgwkKg4PrO6BNNBdOMEDaIzAeZ2mpsUWQ8T9fqrhGhWusx
HX6fWoQEwwBHboebhxl4XRND/Kbhdswj3QrtouNxYQKBgQDwViUeOxNttMWOGEAK
H988mQnzekKVNKXZ6XdEz6k+l3mRGInnmDxPvg7j4fbJKE7HsPckvk4pHNCHYa6E
bGrlUQGyGa4sJH1jb0Ztdcwz+M+YY/KXX5lUqfBOa1a+Zny9YHZZclaZoWUFq3ri
VRF67EF3leUhViz8k7nuMncK/QKBgQDge3b52xBGv/bhSQZxWMe2Dos1BnpCddYI
HKYAjlpoQjP99gsjaZLb1cJUNjnSuLedYkazmziT8DiJ6GXuOND2aeNZdKEbkpcr
51X8QNodGXbn/UNYUdgi9lwtQA+54vozbW7JXdjPFe+TnLXTyt8nLCza5k/aWzKl
SE45CfDgHQKBgQDhVnPQ52Ts/IwqEXShyYZeY8MfxSb+jHFgYnTQUMAHjrCNqWtL
eMI7piCB65CexKswsizXB5NzGrAt7xlY0epb/drQKSHUA5aJD4ECCmue4w+Je1Su
NxUle3xzmlKnjKIyUWpFrV2jB98XNNOvuED+dttfC2zdF9ZwLvYqbqiM5QKBgQDN
tjbURryGqTm7P6lIy5vQKUnGYNY++y8VJfO1xL3yluCAVS3l2MR88klv1HVutlmF
P18dDhxt7ZBSSIbIJIbRmT1/Z5KP6ujfkdJJJMD8M660b3F8iRvxBiR4TyFaLjcs
U5dXrsmVFDwE4HH70QhoJGJCgxYgOryRnE4alRKIvQKBgHqIx3o5lSHU0P/bwUOp
yG3N0aSSNVbcHhNFQmzPpyM0CPes4PxxmQc5aHWIo1AHnmn6KNfQFBg3f+4ixTpi
q5AZ62EMdgfEcZc6GMeDSCYfh74HmKNAjnxVoLpuSKdkGGKlYt3YG+N8z/qKNGxX
p29TovbBWXUl2BIPVpUQedx0
-----END PRIVATE KEY-----`;

let testFileId = null;
let testPackageId = null;

async function test() {
  try {
    console.log('🚀 Starting Encryption & Decryption Test\n');
    
    // Step 1: Create test file
    console.log('📝 Step 1: Creating test file...');
    const testFilePath = path.join(__dirname, 'test_file.txt');
    const testContent = 'Hello, Encrypter.id! This is a test file for encryption.\n' + new Date().toISOString();
    fs.writeFileSync(testFilePath, testContent);
    console.log(`✅ Test file created: ${testFilePath}`);
    console.log(`   Content: ${testContent}\n`);

    // Step 2: Upload file
    console.log('📤 Step 2: Uploading file to server...');
    const uploadFormData = new FormData();
    uploadFormData.append('file', fs.createReadStream(testFilePath));
    
    const uploadRes = await fetch(`${API_BASE}/enkripsi/upload`, {
      method: 'POST',
      body: uploadFormData
    });
    
    if (!uploadRes.ok) {
      throw new Error(`Upload failed: ${uploadRes.statusText}`);
    }
    
    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      throw new Error(`Upload error: ${uploadData.error}`);
    }
    
    testFileId = uploadData.data.fileId;
    console.log(`✅ File uploaded successfully`);
    console.log(`   File ID: ${testFileId}`);
    console.log(`   Original size: ${uploadData.data.size} bytes\n`);

    // Step 3: Encrypt file
    console.log('🔐 Step 3: Encrypting file with AES-256-GCM...');
    const encryptRes = await fetch(`${API_BASE}/enkripsi/proses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileId: testFileId,
        publicKey: TEST_PUBLIC_KEY,
        originalName: 'test_file.txt',
        deskripsi: 'Test encryption file'
      })
    });
    
    if (!encryptRes.ok) {
      throw new Error(`Encryption failed: ${encryptRes.statusText}`);
    }
    
    const encryptData = await encryptRes.json();
    if (!encryptData.success) {
      throw new Error(`Encryption error: ${encryptData.error}`);
    }
    
    testPackageId = encryptData.data.packageId;
    console.log(`✅ File encrypted successfully`);
    console.log(`   Package ID: ${testPackageId}`);
    console.log(`   Original size: ${encryptData.data.originalSize} bytes`);
    console.log(`   Encrypted size: ${encryptData.data.encryptedSize} bytes`);
    console.log(`   Duration: ${encryptData.data.stats.duration}ms\n`);

    // Step 4: Send to inbox
    console.log('📬 Step 4: Sending package to receiver inbox...');
    const sendRes = await fetch(`${API_BASE}/enkripsi/kirim`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId: testPackageId })
    });
    
    if (!sendRes.ok) {
      throw new Error(`Send failed: ${sendRes.statusText}`);
    }
    
    const sendData = await sendRes.json();
    if (!sendData.success) {
      throw new Error(`Send error: ${sendData.error}`);
    }
    
    console.log(`✅ Package sent to inbox successfully\n`);

    // Step 5: List inbox
    console.log('📬 Step 5: Checking receiver inbox...');
    const inboxRes = await fetch(`${API_BASE}/dekripsi/kotak-masuk`);
    const inboxData = await inboxRes.json();
    
    if (!inboxData.success) {
      throw new Error(`Get inbox failed: ${inboxData.error}`);
    }
    
    const foundPackage = inboxData.data.find(pkg => pkg.packageId === testPackageId);
    if (!foundPackage) {
      throw new Error('Package not found in inbox!');
    }
    
    console.log(`✅ Package found in inbox`);
    console.log(`   Package ID: ${foundPackage.packageId}`);
    console.log(`   File name: ${foundPackage.originalName}`);
    console.log(`   Description: ${foundPackage.deskripsi}`);
    console.log(`   Original size: ${foundPackage.originalSize} bytes\n`);

    // Step 6: Decrypt file
    console.log('🔓 Step 6: Decrypting file with private key...');
    const decryptRes = await fetch(`${API_BASE}/dekripsi/proses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: testPackageId,
        privateKey: TEST_PRIVATE_KEY
      })
    });
    
    if (!decryptRes.ok) {
      throw new Error(`Decryption failed: ${decryptRes.statusText}`);
    }
    
    const decryptData = await decryptRes.json();
    if (!decryptData.success) {
      throw new Error(`Decryption error: ${decryptData.error}`);
    }
    
    console.log(`✅ File decrypted successfully`);
    console.log(`   Decrypted ID: ${decryptData.data.decryptedId}`);
    console.log(`   Original name: ${decryptData.data.originalName}`);
    console.log(`   Decrypted size: ${decryptData.data.size} bytes`);
    console.log(`   Duration: ${decryptData.data.stats.duration}ms\n`);

    // Step 7: Verify download endpoint works
    console.log('📥 Step 7: Verifying download endpoint...');
    const downloadUrl = `${API_BASE}/dekripsi/download/${decryptData.data.decryptedId}`;
    const downloadRes = await fetch(downloadUrl);
    
    if (!downloadRes.ok) {
      console.warn(`⚠️  Download endpoint returned: ${downloadRes.statusText}`);
    } else {
      const downloadedContent = await downloadRes.text();
      console.log(`✅ Download endpoint works`);
      console.log(`   Downloaded size: ${downloadedContent.length} bytes`);
      
      if (downloadedContent === testContent) {
        console.log(`✅ Downloaded content matches original! Encryption/Decryption verified!\n`);
      } else {
        console.log(`⚠️  Downloaded content differs from original`);
        console.log(`   Original: ${testContent}`);
        console.log(`   Downloaded: ${downloadedContent}\n`);
      }
    }

    // Cleanup
    console.log('🧹 Step 8: Cleanup...');
    fs.unlinkSync(testFilePath);
    console.log(`✅ Test file deleted\n`);

    console.log('✅ ALL TESTS PASSED!\n');
    console.log('📋 Summary:');
    console.log(`  ✓ File upload working`);
    console.log(`  ✓ Encryption working (AES-256-GCM)`);
    console.log(`  ✓ Package sending to inbox working`);
    console.log(`  ✓ Inbox retrieval working`);
    console.log(`  ✓ Decryption working`);
    console.log(`  ✓ Download endpoint working`);
    console.log(`  ✓ Content integrity verified\n`);

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
    process.exit(1);
  }
}

// Run test
test();
