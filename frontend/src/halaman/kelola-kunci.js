/**
 * Render Kelola Kunci Page
 */
function renderKelolaKunciPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-5xl font-bold gradient-text mb-3">Kelola Kunci RSA</h1>
          <p class="text-gray-400 text-lg">Generate dan kelola pasangan kunci RSA Anda</p>
        </div>
        
        <!-- Generate Section -->
        <div class="card mb-8">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-semibold text-green-neon mb-3">Generate Key Pair Baru</h3>
            <p class="text-gray-300 max-w-2xl mx-auto">
              Buat pasangan kunci RSA 2048-bit untuk enkripsi hybrid. Public key untuk dibagikan, private key untuk Anda simpan.
            </p>
          </div>
          
          <div class="text-center">
            <button id="generate-btn" class="btn-primary text-lg px-8 py-4">
              <span class="flex items-center justify-center space-x-2">
                <span class="text-2xl">🔑</span>
                <span>Generate RSA Key Pair</span>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Keys Display -->
        <div id="keys-display" class="hidden space-y-6">
          <!-- Public Key -->
          <div class="card">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-3 md:space-y-0">
              <h3 class="text-2xl font-semibold text-green-neon text-center md:text-left">Public Key</h3>
              <button id="copy-public-btn" class="btn-secondary text-sm px-6 py-2">
                <span class="flex items-center justify-center space-x-2">
                  <span>📋</span>
                  <span>Copy</span>
                </span>
              </button>
            </div>
            <textarea id="public-key-display" class="input-field font-mono text-xs" rows="10" readonly></textarea>
            <div class="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p class="text-sm text-green-300 text-center">✅ Aman untuk dibagikan kepada pengirim</p>
            </div>
          </div>
          
          <!-- Private Key -->
          <div class="card">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-3 md:space-y-0">
              <h3 class="text-2xl font-semibold text-green-neon text-center md:text-left">Private Key</h3>
              <div class="flex justify-center md:justify-end space-x-2">
                <button id="toggle-private-btn" class="btn-secondary text-sm px-6 py-2">
                  <span class="flex items-center space-x-2">
                    <span>👁️</span>
                    <span>Show</span>
                  </span>
                </button>
                <button id="copy-private-btn" class="btn-secondary text-sm px-6 py-2">
                  <span class="flex items-center space-x-2">
                    <span>📋</span>
                    <span>Copy</span>
                  </span>
                </button>
              </div>
            </div>
            <textarea id="private-key-display" class="input-field font-mono text-xs" rows="10" readonly></textarea>
            <div class="bg-red-900/20 border border-red-500/50 rounded-lg p-5 mt-4">
              <p class="text-red-400 font-semibold mb-3 text-center text-lg">⚠️ PERINGATAN KEAMANAN</p>
              <ul class="text-sm text-red-300 space-y-2 max-w-2xl mx-auto">
                <li class="flex items-start space-x-2">
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>Simpan private key dengan aman</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>Jangan bagikan private key kepada siapa pun</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>Jika private key bocor, generate key pair baru</span>
                </li>
                <li class="flex items-start space-x-2">
                  <span class="text-red-400 mt-0.5">•</span>
                  <span>Backup private key di tempat aman</span>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Tombol Unduh -->
          <div class="card">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-semibold text-green-neon">Unduh Kunci</h3>
            </div>
            <div class="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              <button id="download-public-btn" class="btn-primary py-4">
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-xl">💾</span>
                  <span>Unduh public.pem</span>
                </div>
              </button>
              <button id="download-private-btn" class="btn-primary py-4">
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-xl">💾</span>
                  <span>Unduh private.pem</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let currentPublicKey = '';
  let currentPrivateKey = '';
  let privateKeyVisible = false;

  // Generate button
  document.getElementById('generate-btn').addEventListener('click', async () => {
    try {
      showLoading('Generate RSA key pair...');
      const result = await api.generateKeys();
      hideLoading();

      currentPublicKey = result.data.publicKey;
      currentPrivateKey = result.data.privateKey;

      // Tampilkan kunci
      document.getElementById('public-key-display').value = currentPublicKey;
      document.getElementById('private-key-display').value = '••••••••••••••••••••••••••••••••';
      document.getElementById('keys-display').classList.remove('hidden');

      showToast('Key pair berhasil dibuat!', 'success');
    } catch (error) {
      hideLoading();
      showToast('Gagal membuat kunci: ' + error.message, 'error');
    }
  });

  // Toggle tampilan private key
  document.getElementById('toggle-private-btn').addEventListener('click', () => {
    privateKeyVisible = !privateKeyVisible;
    const display = document.getElementById('private-key-display');
    const btn = document.getElementById('toggle-private-btn');

    if (privateKeyVisible) {
      display.value = currentPrivateKey;
      btn.textContent = '🙈 Sembunyikan';
    } else {
      display.value = '••••••••••••••••••••••••••••••••';
      btn.textContent = '👁️ Tampilkan';
    }
  });

  // Tombol copy
  document.getElementById('copy-public-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(currentPublicKey);
    showToast('Public key berhasil dicopy!', 'success');
  });

  document.getElementById('copy-private-btn').addEventListener('click', () => {
    if (confirm('⚠️ Anda yakin ingin copy private key? Pastikan tidak ada yang melihat!')) {
      navigator.clipboard.writeText(currentPrivateKey);
      showToast('Private key berhasil dicopy!', 'warning');
    }
  });

  // Tombol unduh
  document.getElementById('download-public-btn').addEventListener('click', () => {
    downloadTextFile(currentPublicKey, 'public.pem');
    showToast('Public key berhasil diunduh!', 'success');
  });

  document.getElementById('download-private-btn').addEventListener('click', () => {
    if (confirm('⚠️ Simpan file ini di tempat yang aman!')) {
      downloadTextFile(currentPrivateKey, 'private.pem');
      showToast('Private key berhasil diunduh!', 'warning');
    }
  });

  function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Export
window.renderKelolaKunciPage = renderKelolaKunciPage;
