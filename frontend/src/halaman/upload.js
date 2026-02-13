/**
 * Demo Key Pair - stored globally so Pengirim and Penerima can use matching keys
 */
window._demoKeyPair = window._demoKeyPair || null;

/**
 * Helper function to get API base URL
 */
function getApiBaseUrl() {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001/api';
  }
  return `${window.location.origin}/api`;
}

/**
 * Render Upload File Page
 */
function renderUploadPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <!-- Page Video Background -->
    <div class="page-video-bg">
      <video autoplay loop muted playsinline>
        <source src="/background/background.webm" type="video/webm">
      </video>
    </div>
    
    <div class="container mx-auto px-3 md:px-4 py-4 md:py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-6 md:mb-10">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold gradient-text mb-2 md:mb-3">Upload & Enkripsi File</h1>
          <p class="text-gray-400 text-sm md:text-lg">Kirim file dengan aman menggunakan hybrid cryptography</p>
        </div>
        
        <!-- Tabs -->
        <div class="flex justify-center space-x-2 mb-6 md:mb-8">
          <button id="tab-pengirim" class="tab-btn active px-4 md:px-8 py-3 md:py-4 font-semibold transition-all rounded-t-lg text-sm md:text-base">
            <div class="flex items-center space-x-2">
              <span class="text-xl md:text-2xl">📤</span>
              <span>Pengirim</span>
            </div>
          </button>
          <button id="tab-penerima" class="tab-btn px-4 md:px-8 py-3 md:py-4 font-semibold transition-all rounded-t-lg text-sm md:text-base">
            <div class="flex items-center space-x-2">
              <span class="text-xl md:text-2xl">📥</span>
              <span>Penerima</span>
            </div>
          </button>
        </div>
        
        <!-- Tab Content -->
        <div id="tab-content">
          <!-- Pengirim content will be loaded here -->
        </div>
      </div>
    </div>

    <!-- Modal Container (Hidden by default) -->
    <div id="modal-container" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm hidden opacity-0 transition-opacity duration-300">
        <!-- Modal content will be injected here -->
    </div>
  `;

  // Add tab styles
  const style = document.createElement('style');
  style.textContent = `
    .tab-btn {
      color: #9ca3af;
      background: rgba(26, 26, 26, 0.5);
      border: 2px solid transparent;
    }
    
    .tab-btn.active {
      color: #00ff88;
      background: rgba(0, 255, 136, 0.1);
      border-color: #00ff88;
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
    }
    
    .tab-btn:hover {
      color: #00ff88;
      background: rgba(0, 255, 136, 0.05);
    }

    .modal-content {
        transform: scale(0.95);
        transition: transform 0.3s ease-out;
    }
    
    #modal-container:not(.hidden) .modal-content {
        transform: scale(1);
    }
  `;
  document.head.appendChild(style);

  // Initialize tabs
  document.getElementById('tab-pengirim').addEventListener('click', () => {
    setActiveTab('pengirim');
    renderPengirimTab();
  });

  document.getElementById('tab-penerima').addEventListener('click', () => {
    setActiveTab('penerima');
    renderPenerimaTab();
  });

  // Load pengirim tab by default
  renderPengirimTab();
}

/**
 * Set active tab
 */
function setActiveTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
}

/**
 * Render Pengirim Tab
 */
function renderPengirimTab() {
  const content = document.getElementById('tab-content');

  content.innerHTML = `
    <div class="space-y-6 md:space-y-8">
      <!-- Project Header -->
      <div class="card bg-gradient-to-br from-green-neon/10 to-green-neon/5 border-green-neon/50">
        <div class="text-center mb-4 md:mb-6">
          <div class="text-3xl md:text-5xl mb-2 md:mb-3">🔐</div>
          <h2 class="text-xl md:text-3xl font-bold text-green-neon mb-2">Sistem File Sharing Aman</h2>
          <p class="text-gray-300 text-sm md:text-lg">Hybrid Cryptography: AES-256 + RSA-2048</p>
          <div class="mt-3 md:mt-4 flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
            <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded-full">📤 Pengirim</span>
            <span class="px-2 md:px-3 py-1 bg-gray-600 text-gray-300 rounded-full">🔄 Transfer Aman</span>
            <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded-full">📥 Penerima</span>
          </div>
        </div>

        <!-- Hybrid Cryptography Overview -->
        <div class="bg-dark-900/70 rounded-xl p-4 md:p-6 border border-green-neon/30">
          <h3 class="text-lg md:text-xl font-bold text-green-neon mb-3 md:mb-4 text-center">🏗️ Arsitektur Hybrid Cryptography</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-base md:text-lg">🔐</div>
                <div>
                  <h4 class="font-bold text-blue-400 text-sm md:text-base">AES-256-GCM</h4>
                  <p class="text-xs md:text-sm text-gray-300">Enkripsi file cepat & efisien untuk data besar</p>
                </div>
              </div>
              <ul class="text-xs text-gray-400 space-y-1 ml-12 md:ml-15">
                <li>• Symmetric encryption (kunci sama)</li>
                <li>• Cepat untuk file besar</li>
                <li>• GCM mode untuk authenticity</li>
                <li>• 256-bit security level</li>
              </ul>
            </div>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-lg flex items-center justify-center text-green-neon font-bold text-base md:text-lg">🔑</div>
                <div>
                  <h4 class="font-bold text-green-neon text-sm md:text-base">RSA-2048-OAEP</h4>
                  <p class="text-xs md:text-sm text-gray-300">Enkripsi kunci AES dengan public key cryptography</p>
                </div>
              </div>
              <ul class="text-xs text-gray-400 space-y-1 ml-12 md:ml-15">
                <li>• Asymmetric encryption (kunci berbeda)</li>
                <li>• Aman untuk key exchange</li>
                <li>• OAEP padding untuk keamanan</li>
                <li>• 2048-bit key size</li>
              </ul>
            </div>
          </div>

          <!-- Process Flow -->
          <div class="mt-4 md:mt-6 p-3 md:p-4 bg-dark-800/50 rounded-lg border border-gray-600">
            <h4 class="font-bold text-green-neon mb-2 md:mb-3 text-center text-sm md:text-base">🔄 Alur Enkripsi Hybrid</h4>
            <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">📄 File</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-400 rounded font-bold text-xs">AES-256</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">File Terenkripsi</span>
              </div>
              <div class="text-green-neon text-sm md:text-base">+</div>
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">🔑 AES Key</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded font-bold text-xs">RSA-2048</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">Key Terenkripsi</span>
              </div>
              <div class="text-green-neon text-sm md:text-base">=</div>
              <div class="px-2 md:px-3 py-1 bg-gradient-to-r from-green-neon/20 to-blue-500/20 text-green-neon rounded font-bold text-xs md:text-sm">📦 Paket Aman</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step-by-Step Workflow -->
      <div class="grid grid-cols-1 gap-4 md:gap-6">
        <!-- Step 1: Upload File -->
        <div class="card border-l-4 border-green-neon">
          <div class="flex items-center space-x-3 mb-4 md:mb-6">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-full flex items-center justify-center text-green-neon font-bold text-lg md:text-xl">
              1
            </div>
            <div>
              <h3 class="text-lg md:text-xl font-semibold text-green-neon">Upload File</h3>
              <p class="text-xs text-gray-400">Pilih file yang akan dienkripsi</p>
            </div>
          </div>

          <div id="dropzone" class="dropzone p-4 md:p-6">
            <svg class="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-green-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <p class="text-base md:text-lg mb-2 font-semibold">Klik atau Drag & Drop</p>
            <p class="text-xs md:text-sm text-gray-400">Maksimal 500MB • Semua jenis file</p>
            <input type="file" id="file-input" class="hidden">
          </div>

          <div id="file-info" class="hidden mt-4 p-3 md:p-4 bg-green-neon/5 rounded-lg border border-green-neon/30">
            <div class="flex items-center space-x-3">
              <div class="text-2xl md:text-3xl">📄</div>
              <div class="flex-1 min-w-0">
                <p class="font-mono text-xs md:text-sm"><span class="text-gray-400">Nama:</span> <span id="file-name" class="text-green-neon font-semibold"></span></p>
                <p class="font-mono text-xs md:text-sm"><span class="text-gray-400">Ukuran:</span> <span id="file-size" class="text-white"></span></p>
              </div>
              <button id="remove-file-btn" class="text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg p-1 md:p-2 transition-all" title="Hapus file">
                <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Description Field -->
          <div class="mt-4">
            <label class="block text-xs md:text-sm font-medium text-gray-300 mb-2">📝 Deskripsi (Opsional)</label>
            <textarea id="file-description" class="input-field text-xs md:text-sm" rows="2" placeholder="Pesan untuk penerima..."></textarea>
          </div>
        </div>

        <!-- Step 2: Public Key -->
        <div class="card border-l-4 border-green-neon xl:col-span-1">
          <div class="flex items-center space-x-3 mb-4 md:mb-6">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-full flex items-center justify-center text-green-neon font-bold text-lg md:text-xl">
              2
            </div>
            <div>
              <h3 class="text-lg md:text-xl font-semibold text-green-neon">Public Key Penerima</h3>
              <p class="text-xs text-gray-400">RSA-2048 untuk enkripsi kunci AES</p>
            </div>
          </div>

          <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-3 md:p-4 mb-4">
            <div class="flex items-start space-x-2 md:space-x-3">
              <div class="text-xl md:text-2xl flex-shrink-0">🔑</div>
              <div class="flex-1">
                <p class="text-xs md:text-sm font-bold text-green-neon mb-2">Public Key Aman Dibagikan</p>
                <p class="text-xs text-gray-300 mb-2 md:mb-3">
                  Kunci RSA 2048-bit yang digunakan untuk mengenkripsi kunci AES. Hanya penerima dengan private key yang bisa mendekripsi.
                </p>
                <button id="use-demo-key-btn" class="px-3 md:px-4 py-2 bg-gradient-to-r from-green-neon to-green-neon/60 hover:from-green-neon/90 hover:to-green-neon/50 text-dark-900 font-bold rounded-lg text-xs md:text-sm transition-all">
                  🔑 Demo Key (Testing)
                </button>
              </div>
            </div>
          </div>

          <label class="block text-xs md:text-sm font-bold text-gray-300 mb-3">Paste Public Key RSA-2048</label>
          <textarea id="public-key-input" class="input-field font-mono text-xs" rows="6 md:rows-8" placeholder="-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
-----END PUBLIC KEY-----"></textarea>

          <div class="mt-4 p-3 bg-green-neon/10 border border-green-neon/30 rounded-lg">
            <div class="flex items-start space-x-2">
              <span class="text-base md:text-lg flex-shrink-0 mt-0.5">⚠️</span>
              <div class="text-xs text-green-neon">
                <p class="font-semibold mb-1">Penting:</p>
                <ul class="list-disc ml-3 space-y-1">
                  <li>Minta penerima generate kunci di tab "Penerima"</li>
                  <li>Copy seluruh public key termasuk header/footer</li>
                  <li>Pastikan tidak ada spasi tambahan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Encrypt & Send -->
        <div class="card border-l-4 border-green-neon xl:col-span-1">
          <div class="flex items-center space-x-3 mb-4 md:mb-6">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-full flex items-center justify-center text-green-neon font-bold text-lg md:text-xl">
              3
            </div>
            <div>
              <h3 class="text-lg md:text-xl font-semibold text-green-neon">Enkripsi & Kirim</h3>
              <p class="text-xs text-gray-400">Proses hybrid cryptography</p>
            </div>
          </div>

          <!-- Encryption Process -->
          <div class="bg-green-neon/10 border border-green-neon/20 rounded-lg p-3 md:p-4 mb-4">
            <p class="text-xs md:text-sm font-bold text-green-neon mb-3">🔒 Proses Enkripsi:</p>
            <ol class="text-xs text-gray-300 space-y-2 ml-3">
              <li class="flex items-start">
                <span class="text-green-neon font-bold mr-2">1.</span>
                <span><strong>AES-256 Key:</strong> Generate kunci random 256-bit</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-neon font-bold mr-2">2.</span>
                <span><strong>Enkripsi File:</strong> AES-256-GCM untuk file</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-neon font-bold mr-2">3.</span>
                <span><strong>Enkripsi Key:</strong> RSA-2048-OAEP untuk kunci AES</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-neon font-bold mr-2">4.</span>
                <span><strong>Paket:</strong> Gabung menjadi file .encpack</span>
              </li>
            </ol>
          </div>

          <button id="encrypt-btn" class="btn-primary w-full text-base md:text-lg py-3 md:py-4 flex items-center justify-center space-x-2" disabled>
            <span>🔒</span>
            <span id="encrypt-btn-text">Enkripsi & Buat Paket</span>
          </button>

          <p id="encrypt-status" class="text-xs md:text-sm text-gray-400 mt-4 text-center hidden">
            ⚠️ Lengkapi Step 1 & 2 untuk melanjutkan
          </p>
        </div>
      </div>
      <!-- Results Section -->
      <div id="encrypt-results" class="hidden">
        <div class="card bg-gradient-to-br from-green-neon/10 to-cyan/10 border-green-neon/50">
          <div class="flex items-center space-x-3 mb-4 md:mb-6">
            <div class="text-3xl md:text-4xl animate-bounce">✅</div>
            <div>
              <h3 class="text-xl md:text-2xl font-bold text-green-neon">Enkripsi Berhasil!</h3>
              <p class="text-xs md:text-sm text-gray-400">Paket terenkripsi siap dikirim</p>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div class="bg-dark-900/50 rounded-lg p-3 md:p-4 mb-4 border border-green-neon/20">
            <h4 class="text-base md:text-lg font-bold text-green-neon mb-3">📊 Metrik Performa</h4>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div class="text-center p-2 md:p-3 bg-dark-800/50 rounded-lg border border-gray-700">
                <p class="text-xs text-gray-400 mb-1">📄 Ukuran Asli</p>
                <p class="text-sm md:text-lg font-bold font-mono text-white" id="result-original-size">--</p>
              </div>
              <div class="text-center p-2 md:p-3 bg-dark-800/50 rounded-lg border border-green-neon/20">
                <p class="text-xs text-gray-400 mb-1">🔐 Terenkripsi</p>
                <p class="text-sm md:text-lg font-bold font-mono text-green-neon" id="result-encrypted-size">--</p>
              </div>
              <div class="text-center p-2 md:p-3 bg-dark-800/50 rounded-lg border border-green-neon/20">
                <p class="text-xs text-gray-400 mb-1">⏱️ Waktu Proses</p>
                <p class="text-sm md:text-lg font-bold font-mono text-green-neon" id="result-duration">--</p>
              </div>
              <div class="text-center p-2 md:p-3 bg-dark-800/50 rounded-lg border border-green-neon/20">
                <p class="text-xs text-gray-400 mb-1">⚡ CPU Peak</p>
                <p class="text-sm md:text-lg font-bold font-mono text-green-neon" id="result-cpu">--</p>
              </div>
            </div>
          </div>

          <!-- Package Details -->
          <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-3 md:p-4 mb-4">
            <h4 class="text-base md:text-lg font-bold text-green-neon mb-3">📦 Isi Paket Terenkripsi</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              <div>
                <h5 class="font-semibold text-green-neon mb-2 text-sm md:text-base">🔐 Keamanan Hybrid:</h5>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li>• <strong>AES-256-GCM:</strong> Enkripsi file dengan kunci random</li>
                  <li>• <strong>RSA-2048-OAEP:</strong> Enkripsi kunci AES</li>
                  <li>• <strong>GCM Auth Tag:</strong> Verifikasi integritas data</li>
                </ul>
              </div>
              <div>
                <h5 class="font-semibold text-green-neon mb-2 text-sm md:text-base">📋 Metadata:</h5>
                <ul class="text-xs text-gray-300 space-y-1">
                  <li>• Nama file asli & deskripsi</li>
                  <li>• Timestamp enkripsi</li>
                  <li>• Algoritma yang digunakan</li>
                  <li>• Hash untuk verifikasi</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Send Options -->
          <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-3 md:p-4 mb-4">
            <div class="flex items-start space-x-2 md:space-x-3">
              <div class="text-xl md:text-2xl flex-shrink-0">📤</div>
              <div>
                <p class="text-sm md:text-base font-bold text-green-neon mb-1">Kirim Paket ke Penerima:</p>
                <p class="text-xs text-white">Pilih cara pengiriman. Hanya penerima dengan private key yang bisa mendekripsi.</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button id="send-btn" class="btn-primary py-4 flex items-center justify-center space-x-2 font-bold">
              <span class="text-2xl">📤</span>
              <div class="text-center">
                <div class="font-semibold">Kirim ke Inbox</div>
                <div class="text-xs opacity-80">Simulasi pengiriman aman</div>
              </div>
            </button>
            <button id="download-package-btn" class="btn-secondary py-4 flex items-center justify-center space-x-2 font-bold">
              <span class="text-2xl">💾</span>
              <div class="text-center">
                <div class="font-semibold">Download Paket</div>
                <div class="text-xs opacity-80">Transfer manual (.encpack)</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize dropzone
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  let selectedFile = null;
  let uploadedFileId = null;
  let currentPackageId = null;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  });

  async function handleFileSelect(file) {
    selectedFile = file;

    // Show file info, hide dropzone
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = formatter.fileSize(file.size);
    document.getElementById('file-info').classList.remove('hidden');
    dropzone.classList.add('hidden');

    // Upload file
    try {
      showLoading('Mengupload file...');
      const result = await api.uploadFile(file);
      uploadedFileId = result.data.fileId;
      hideLoading();
      showToast('File berhasil diupload!', 'success');
      updateEncryptButton();
    } catch (error) {
      hideLoading();
      showToast('Gagal upload file: ' + error.message, 'error');
    }
  }

  // Remove file button
  document.getElementById('remove-file-btn').addEventListener('click', () => {
    selectedFile = null;
    uploadedFileId = null;
    fileInput.value = '';
    document.getElementById('file-info').classList.add('hidden');
    dropzone.classList.remove('hidden');
    updateEncryptButton();
    showToast('File dihapus.', 'success');
  });

  // Update encrypt button state
  const publicKeyInput = document.getElementById('public-key-input');
  const encryptStatusEl = document.getElementById('encrypt-status');

  // Tombol demo public key - generates a fresh keypair and stores it globally
  document.getElementById('use-demo-key-btn').addEventListener('click', async () => {
    try {
      showLoading('Menggenerate demo key pair...');
      const result = await api.generateKeys();
      hideLoading();

      // Store demo keypair globally so Penerima can use the matching private key
      window._demoKeyPair = {
        publicKey: result.data.publicKey,
        privateKey: result.data.privateKey
      };

      publicKeyInput.value = result.data.publicKey;
      showToast('Demo key pair berhasil dibuat! 🔑 Private key tersedia di tab Penerima.', 'success');
      updateEncryptButton();
    } catch (error) {
      hideLoading();
      showToast('Gagal generate demo key: ' + error.message, 'error');
    }
  });

  publicKeyInput.addEventListener('input', updateEncryptButton);

  function updateEncryptButton() {
    const encryptBtn = document.getElementById('encrypt-btn');
    const hasFile = uploadedFileId !== null;
    const hasKey = publicKeyInput.value.trim().length > 0;

    if (hasFile && hasKey) {
      encryptBtn.disabled = false;
      encryptBtn.classList.remove('opacity-50');
      encryptStatusEl.classList.add('hidden');
    } else {
      encryptBtn.disabled = true;
      encryptBtn.classList.add('opacity-50');
      encryptStatusEl.classList.remove('hidden');

      if (!hasFile && !hasKey) {
        encryptStatusEl.textContent = '⚠️ Upload file dan masukkan public key untuk melanjutkan';
      } else if (!hasFile) {
        encryptStatusEl.textContent = '⚠️ Upload file terlebih dahulu';
      } else if (!hasKey) {
        encryptStatusEl.textContent = '⚠️ Masukkan public key penerima';
      }
    }
  }

  // Encrypt button
  document.getElementById('encrypt-btn').addEventListener('click', async () => {
    try {
      showLoading('Mengenkripsi file...');

      const description = document.getElementById('file-description').value.trim();

      const result = await api.encryptFile({
        fileId: uploadedFileId,
        publicKey: publicKeyInput.value.trim(),
        originalName: selectedFile.name,
        deskripsi: description // Send description to backend
      });

      hideLoading();

      currentPackageId = result.data.packageId;

      // Show results
      document.getElementById('result-original-size').textContent = formatter.fileSize(result.data.originalSize);
      document.getElementById('result-encrypted-size').textContent = formatter.fileSize(result.data.encryptedSize);
      document.getElementById('result-duration').textContent = formatter.duration(result.data.stats.duration);
      document.getElementById('result-cpu').textContent = formatter.cpu(result.data.stats.peakCPU);
      document.getElementById('encrypt-results').classList.remove('hidden');

      showToast('File berhasil dienkripsi!', 'success');
    } catch (error) {
      hideLoading();
      showToast('Gagal enkripsi: ' + error.message, 'error');
    }
  });

  // Send button
  document.getElementById('send-btn').addEventListener('click', async () => {
    try {
      showLoading('Mengirim paket...');
      await api.sendPackage(currentPackageId);
      hideLoading();
      showToast('Paket berhasil dikirim ke kotak masuk penerima!', 'success');
    } catch (error) {
      hideLoading();
      showToast('Gagal mengirim: ' + error.message, 'error');
    }
  });

  // Download package button
  document.getElementById('download-package-btn').addEventListener('click', () => {
    const url = `${getApiBaseUrl()}/enkripsi/download/${currentPackageId}`;
    api.downloadFile(url, `${currentPackageId}.encpack`);
    showToast('Download dimulai!', 'success');
  });
}

/**
 * Render Penerima Tab
 */
function renderPenerimaTab() {
  const content = document.getElementById('tab-content');

  content.innerHTML = `
    <div class="space-y-6 md:space-y-8">
      <!-- Project Header -->
      <div class="card bg-gradient-to-br from-green-neon/10 to-green-neon/5 border-green-neon/50">
        <div class="text-center mb-4 md:mb-6">
          <div class="text-3xl md:text-5xl mb-2 md:mb-3">🔓</div>
          <h2 class="text-xl md:text-3xl font-bold text-green-neon mb-2">Penerima File Aman</h2>
          <p class="text-gray-300 text-sm md:text-lg">Dekripsi file dengan Hybrid Cryptography</p>
          <div class="mt-3 md:mt-4 flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
            <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded-full">🔑 Buat Kunci</span>
            <span class="px-2 md:px-3 py-1 bg-gray-600 text-gray-300 rounded-full">📦 Terima Paket</span>
            <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded-full">🔓 Dekripsi Berkas</span>
          </div>
        </div>

        <!-- Hybrid Cryptography Overview -->
        <div class="bg-dark-900/70 rounded-xl p-4 md:p-6 border border-green-neon/30">
          <h3 class="text-base md:text-xl font-bold text-green-neon mb-3 md:mb-4 text-center">Arsitektur Dekripsi Hybrid</h3>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-lg flex items-center justify-center text-green-neon font-bold text-base md:text-lg">🔑</div>
                <div>
                  <h4 class="font-bold text-green-neon">RSA-2048-OAEP</h4>
                  <p class="text-sm text-gray-300">Dekripsi kunci AES dengan private key</p>
                </div>
              </div>
              <ul class="text-xs text-gray-400 space-y-1 ml-15">
                <li>• Private key untuk dekripsi</li>
                <li>• Mendapatkan kunci AES asli</li>
                <li>• OAEP padding untuk keamanan</li>
                <li>• 2048-bit key size</li>
              </ul>
            </div>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-base md:text-lg">🔐</div>
                <div>
                  <h4 class="font-bold text-blue-400">AES-256-GCM</h4>
                  <p class="text-sm text-gray-300">Dekripsi file dengan kunci AES</p>
                </div>
              </div>
              <ul class="text-xs text-gray-400 space-y-1 ml-15">
                <li>• Symmetric decryption (kunci sama)</li>
                <li>• Cepat untuk file besar</li>
                <li>• GCM mode untuk authenticity</li>
                <li>• 256-bit security level</li>
              </ul>
            </div>
          </div>

          <!-- Process Flow -->
          <div class="mt-4 md:mt-6 p-3 md:p-4 bg-dark-800/50 rounded-lg border border-gray-600">
            <h4 class="font-bold text-green-neon mb-2 md:mb-3 text-center text-sm md:text-base">Alur Dekripsi Hybrid</h4>
            <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-center gap-2 md:gap-4 text-xs md:text-sm">
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">📦 Package</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-green-neon/20 text-green-neon rounded font-bold text-xs">RSA-2048</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">🔑 AES Key</span>
              </div>
              <div class="text-green-neon text-sm md:text-base">+</div>
              <div class="flex items-center space-x-1 md:space-x-2">
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">🔐 Encrypted</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-400 rounded font-bold text-xs">AES-256</span>
                <span class="text-green-neon text-sm md:text-base">→</span>
                <span class="px-2 md:px-3 py-1 bg-gray-700 text-gray-300 rounded text-xs">📄 Original</span>
              </div>
              <div class="text-green-neon text-sm md:text-base">=</div>
              <div class="px-2 md:px-3 py-1 bg-gradient-to-r from-green-neon/20 to-blue-500/20 text-green-neon rounded font-bold text-xs md:text-sm">✅ Secure File</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Step 1: Identity & Keys -->
      <div class="card border-l-4 border-green-neon">
        <div class="flex items-center space-x-3 mb-4 md:mb-6">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-full flex items-center justify-center text-green-neon font-bold text-lg md:text-xl">
            1
          </div>
          <div>
            <h3 class="text-lg md:text-xl font-semibold text-green-neon">Identitas & Kunci Anda</h3>
            <p class="text-xs md:text-sm text-white">RSA Key Pair untuk dekripsi file</p>
          </div>
        </div>

        <!-- Key Generation Section -->
        <div class="mb-4 p-3 md:p-4 bg-green-neon/5 border border-green-neon/20 rounded-lg">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div class="flex-1">
              <p class="text-sm md:text-base font-semibold text-green-neon mb-1">Generate Demo Key Pair</p>
              <p class="text-xs md:text-sm text-white">Buat RSA 2048-bit key pair baru untuk testing</p>
            </div>
            <button id="generate-keys-btn" class="px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-green-neon to-green-neon/60 hover:from-green-neon/90 hover:to-green-neon/50 text-dark-900 font-bold rounded-lg text-sm md:text-base transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-green-neon/30 whitespace-nowrap">
              <span class="text-base md:text-lg">🔑</span>
              <span>Generate</span>
            </button>
          </div>
        </div>

        <!-- Keys Display Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          <!-- Private Key -->
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 md:w-8 md:h-8 bg-red-500/20 rounded flex items-center justify-center text-red-400 text-xs md:text-sm font-bold">🔐</div>
              <label class="text-sm md:text-base font-bold text-white">Private Key</label>
              <div class="ml-auto px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-mono rounded border border-red-500/30">PRIVATE</div>
            </div>
            <div class="relative">
              <textarea id="private-key-input" class="input-field font-mono text-xs md:text-sm h-32 md:h-40 bg-dark-800 border-red-500/20 focus:border-red-500/50 resize-none" placeholder="Private Key akan muncul setelah generate..."></textarea>
            </div>
            <p class="text-[10px] md:text-xs text-red-400">⚠️ Jaga kerahasiaan! Private key HARUS dirahasiakan.</p>
          </div>

          <!-- Public Key -->
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 md:w-8 md:h-8 bg-green-neon/20 rounded flex items-center justify-center text-green-neon text-xs md:text-sm font-bold">🔑</div>
              <label class="text-sm md:text-base font-bold text-white">Public Key</label>
              <div class="ml-auto px-2 py-1 bg-green-neon/20 text-green-neon text-[10px] font-mono rounded border border-green-neon/30">PUBLIC</div>
            </div>
            <div class="relative">
              <textarea id="public-key-display" readonly class="input-field font-mono text-xs md:text-sm h-32 md:h-40 bg-dark-900 border-green-neon/20 focus:outline-none text-green-neon resize-none cursor-pointer" placeholder="Public Key akan muncul setelah generate..."></textarea>
              <button id="copy-public-key-btn" class="absolute top-2 right-2 p-1 md:p-2 bg-dark-700 hover:bg-dark-600 rounded text-green-neon transition-colors shadow-lg hover:shadow-green-neon/30" title="Salin Public Key">
                <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              </button>
            </div>
            <p class="text-[10px] md:text-xs text-green-300">✅ Aman untuk dibagikan ke pengirim.</p>
          </div>
        </div>

        <!-- Status Indicator -->
        <div id="key-status" class="mt-4 md:mt-6 p-3 bg-green-neon/10 border border-green-neon/30 rounded-lg flex items-start space-x-3">
          <span class="text-lg md:text-xl mt-0.5">⚠️</span>
          <div class="text-xs md:text-sm text-white">
            <p class="font-semibold mb-1">Status: Belum Ada Kunci</p>
            <p>Klik tombol "Generate" untuk membuat RSA key pair.</p>
          </div>
        </div>
      </div>
      <!-- Step 2: Inbox -->
      <div class="card border-l-4 border-green-neon">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 md:w-12 md:h-12 bg-green-neon/20 rounded-full flex items-center justify-center text-green-neon font-bold text-lg md:text-xl">
              2
            </div>
            <div>
              <h3 class="text-lg md:text-xl font-semibold text-green-neon">Inbox Paket Masuk</h3>
              <p class="text-xs md:text-sm text-gray-400">File terenkripsi dari pengirim</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button id="refresh-inbox-btn" class="btn-secondary text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 flex items-center space-x-1 hover:bg-green-neon/10 hover:border-green-neon/50 transition-all" title="Refresh inbox">
              <span class="text-sm md:text-base">🔄</span>
              <span class="hidden sm:inline">Refresh</span>
            </button>
            <button id="clear-inbox-btn" class="btn-secondary text-xs md:text-sm px-2 md:px-3 py-1 md:py-2 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 flex items-center space-x-1 transition-all" title="Hapus semua paket">
              <span class="text-sm md:text-base">🗑️</span>
              <span class="hidden sm:inline">Clear All</span>
            </button>
          </div>
        </div>

        <!-- Inbox Container -->
        <div id="inbox-container" class="space-y-3 md:space-y-4">
            <div class="text-center py-8 md:py-12 text-gray-400">
              <div class="flex flex-col items-center">
                <span class="text-3xl md:text-4xl mb-3">📭</span>
                <p class="font-semibold mb-1 text-sm md:text-base">Inbox Kosong</p>
                <p class="text-xs md:text-sm">Belum ada paket masuk. Tunggu pengirim mengirim file.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // --- Logic for Penerima ---

  // Generate Demo Keys logic (Same as before)
  document.getElementById('generate-keys-btn').addEventListener('click', async () => {
    try {
      showLoading('Generating demo key pair...');
      const result = await api.generateKeys();
      hideLoading();

      // Store global
      window._demoKeyPair = {
        publicKey: result.data.publicKey,
        privateKey: result.data.privateKey
      };

      document.getElementById('private-key-input').value = result.data.privateKey;
      document.getElementById('public-key-display').value = result.data.publicKey;

      // Update key status indicator
      const keyStatus = document.getElementById('key-status');
      keyStatus.innerHTML = `
        <span class="text-xl mt-0.5">✅</span>
        <div class="text-xs text-green-300">
          <p class="font-semibold mb-1">Status: Kunci Siap Digunakan</p>
          <p>RSA 2048-bit key pair berhasil dibuat. Public Key siap dibagikan ke pengirim.</p>
        </div>
      `;
      keyStatus.className = 'mt-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start space-x-3';

      showToast('Kunci Demo berhasil dibuat! 🔑', 'success');
    } catch (error) {
      hideLoading();
      showToast('Gagal membuat kunci: ' + error.message, 'error');
    }
  });

  // Copy Public Key
  document.getElementById('copy-public-key-btn').addEventListener('click', () => {
    const publicKeyDisplay = document.getElementById('public-key-display');
    if (!publicKeyDisplay.value) {
      showToast('Generate kunci terlebih dahulu!', 'warning');
      return;
    }
    publicKeyDisplay.select();
    document.execCommand('copy');
    showToast('Public Key disalin!', 'success');
  });

  // Load inbox
  async function loadInbox() {
    try {
      const result = await api.getInbox();
      const container = document.getElementById('inbox-container');

      if (result.data.length === 0) {
        container.innerHTML = `
          <div class="text-center py-8 md:py-12 text-gray-400">
            <div class="flex flex-col items-center">
              <span class="text-3xl md:text-4xl mb-3">📭</span>
              <p class="font-semibold mb-1 text-sm md:text-base">Inbox Kosong</p>
              <p class="text-xs md:text-sm">Belum ada paket masuk. Tunggu pengirim mengirim file.</p>
            </div>
          </div>
        `;
        return;
      }

      // We attach the full package object to the button click handler
      window._inboxData = result.data;

      container.innerHTML = result.data.map((pkg, index) => `
        <div class="package-card border-l-4 border-green-neon p-3 md:p-4 bg-gradient-to-r from-green-neon/5 to-transparent hover:from-green-neon/10 transition-all group">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-start space-x-3 flex-1 min-w-0">
              <div class="text-2xl md:text-3xl flex-shrink-0 mt-1">📦</div>
              <div class="flex-1 min-w-0">
                <h4 class="font-bold text-white truncate group-hover:text-green-neon transition-colors text-sm md:text-base">${pkg.originalName}</h4>
                ${pkg.deskripsi ? `<p class="text-xs text-gray-400 italic truncate">"${pkg.deskripsi}"</p>` : ''}
                <div class="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                  <span class="flex items-center space-x-1">
                    <span class="text-sm">💾</span>
                    <span>${formatter.fileSize(pkg.originalSize)}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <span class="text-sm">📅</span>
                    <span>${formatter.timestamp(pkg.timestamp)}</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="text-xs px-2 py-1 bg-green-neon/20 text-green-neon rounded font-mono flex-shrink-0">
              RSA+AES
            </div>
          </div>

          <div class="flex items-center space-x-2 ml-8 md:ml-11">
            <button class="flex-1 btn-primary text-xs md:text-sm px-2 md:px-3 py-2 bg-gradient-to-r from-green-neon to-green-neon/60 hover:from-green-neon/90 hover:to-green-neon/50 flex items-center justify-center space-x-2 rounded-lg transition-all" onclick="openPackageDetail(${index})">
              <span class="text-sm md:text-base">🔓</span>
              <span>Dekripsi & Buka</span>
            </button>
            <button class="btn-secondary text-xs md:text-sm px-2 md:px-3 py-2 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 flex items-center justify-center space-x-1 rounded-lg transition-all" onclick="deleteInboxPackage('${pkg.packageId}')" title="Hapus paket">
              <span class="text-sm md:text-base">🗑️</span>
            </button>
          </div>
        </div>
      `).join('');
    } catch (error) {
      showToast('Gagal memuat inbox: ' + error.message, 'error');
    }
  }

  // Open Package Detail Modal
  window.openPackageDetail = (index) => {
    const pkg = window._inboxData[index];
    const modalContainer = document.getElementById('modal-container');

    modalContainer.innerHTML = `
        <div class="modal-content bg-dark-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl p-8 relative max-h-[90vh] overflow-y-auto">
            <button onclick="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-dark-700 p-2 rounded transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-purple to-purple/50 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 text-white shadow-lg">
                    📦
                </div>
                <h3 class="text-3xl font-bold text-white mb-1">Dekripsi Paket File</h3>
                <p class="text-gray-400 text-sm font-mono">${pkg.packageId}</p>
            </div>

            <!-- Package Info Section -->
            <div class="bg-dark-900/50 rounded-lg p-6 mb-8 space-y-4 border border-gray-700">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="p-4 bg-dark-800/70 rounded-lg border border-green-neon/20">
                        <p class="text-xs text-gray-400 mb-1">📄 Nama File Asli</p>
                        <p class="font-mono text-green-neon font-bold text-sm">${pkg.originalName}</p>
                    </div>
                    <div class="p-4 bg-dark-800/70 rounded-lg border border-green-neon/20">
                        <p class="text-xs text-gray-400 mb-1">💾 Ukuran File</p>
                        <p class="text-white font-bold text-sm">${formatter.fileSize(pkg.originalSize)}</p>
                    </div>
                    <div class="p-4 bg-dark-800/70 rounded-lg border border-green-neon/20">
                        <p class="text-xs text-gray-400 mb-1">🔐 Encryption Type</p>
                        <p class="text-green-neon font-bold text-sm">Hybrid (RSA 2048 + AES-256-GCM)</p>
                    </div>
                    <div class="p-4 bg-dark-800/70 rounded-lg border border-green-neon/20">
                        <p class="text-xs text-gray-400 mb-1">📅 Waktu Terima</p>
                        <p class="text-gray-300 text-sm">${formatter.timestamp(pkg.timestamp)}</p>
                    </div>
                </div>
                ${pkg.deskripsi ? `
                <div class="p-4 bg-green-neon/10 rounded-lg border border-green-neon/30">
                    <p class="text-xs text-green-neon mb-2">💬 Message from Sender:</p>
                    <p class="text-sm italic text-gray-300">\"${pkg.deskripsi}\"</p>
                </div>
                ` : ''}
            </div>

            <!-- Hybrid Cryptography Flow Visualization -->
            <div class="bg-dark-900/30 rounded-lg p-6 mb-8 border border-green-neon/20">
                <p class="text-sm font-bold text-green-neon mb-4">Decryption Flow (Hybrid Cryptography):</p>
                <div class="space-y-3">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-green-neon/20 rounded-full flex items-center justify-center flex-shrink-0 text-green-neon font-bold">1</div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-300 text-sm">RSA-OAEP Dekripsi</p>
                            <p class="text-xs text-gray-400">Gunakan Private Key untuk dekripsi kunci AES yang tersandi</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="text-green-neon text-lg ml-3">↓</div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-green-neon/20 rounded-full flex items-center justify-center flex-shrink-0 text-green-neon font-bold">2</div>
                        <div class="flex-1 min-w-0">
                            <p class="font-semibold text-gray-300 text-sm">AES-256-GCM Dekripsi</p>
                            <p class="text-xs text-gray-400">Gunakan kunci AES untuk dekripsi file asli</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Decrypt Action -->
            <div id="modal-decrypt-section">
                <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-4 mb-6">
                    <p class="text-sm text-green-neon">⚠️ Pastikan Private Key Anda sudah diisi di Langkah 1 sebelum melakukan dekripsi.</p>
                </div>
                <button id="modal-decrypt-btn" class="btn-primary w-full py-4 text-lg font-bold bg-gradient-to-r from-green-neon to-green-neon/60 hover:from-green-neon/90 hover:to-green-neon/50 flex items-center justify-center space-x-2 rounded-lg transition-all transform hover:scale-102" onclick="decryptPackage('${pkg.packageId}')">
                    <span class="text-2xl">🔓</span>
                    <span>Dekripsi File Sekarang</span>
                </button>
                <p id="modal-error-msg" class="text-red-400 text-center text-sm mt-3 hidden"></p>
            </div>

            <!-- Success Result (Hidden initially) -->
            <div id="modal-success-section" class="hidden text-center animate-fade-in">
                <div class="mb-6">
                    <div class="text-6xl mb-3 inline-block">✨</div>
                    <h4 class="text-2xl font-bold text-white mb-3">Dekripsi Berhasil!</h4>
                    <p class="text-gray-400 mb-2">File Anda telah berhasil didekripsi.</p>
                </div>
                
                <!-- Performance Metrics -->
                <div id="decrypt-metrics" class="bg-dark-900/50 rounded-lg p-6 mb-6 space-y-3 border border-green-neon/20">
                    <h5 class="text-sm font-bold text-green-neon mb-4">📊 Decryption Statistics:</h5>
                    <div class="grid grid-cols-2 gap-3">
                        <div class="p-3 bg-dark-800/70 rounded-lg">
                            <p class="text-xs text-gray-400 mb-1">⏱️ Decryption Time</p>
                            <p id="metric-duration" class="font-bold text-green-neon">--</p>
                        </div>
                        <div class="p-3 bg-dark-800/70 rounded-lg">
                            <p class="text-xs text-gray-400 mb-1">💾 File Size</p>
                            <p id="metric-size" class="font-bold text-green-neon">--</p>
                        </div>
                        <div class="p-3 bg-dark-800/70 rounded-lg">
                            <p class="text-xs text-gray-400 mb-1">⚡ Peak CPU Usage</p>
                            <p id="metric-cpu" class="font-bold text-green-neon">--</p>
                        </div>
                        <div class="p-3 bg-dark-800/70 rounded-lg">
                            <p class="text-xs text-gray-400 mb-1">🔒 Algorithm</p>
                            <p class="font-bold text-green-neon text-xs">RSA-2048 + AES-256</p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button id="modal-download-btn" class="flex-1 btn-primary py-3 font-bold bg-gradient-to-r from-green-neon to-green-neon/60 hover:from-green-neon/90 hover:to-green-neon/50 text-dark-900 flex items-center justify-center space-x-2 rounded-lg transition-all transform hover:scale-102">
                        <span class="text-xl">⬇️</span>
                        <span>Download Original File</span>
                    </button>
                    <button onclick="closeModal()" class="flex-1 text-gray-400 hover:text-white hover:bg-dark-700 px-4 py-3 rounded-lg transition-colors font-semibold">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;

    // Show modal
    modalContainer.classList.remove('hidden');
    setTimeout(() => {
      modalContainer.classList.remove('opacity-0');
    }, 10);
  };

  window.closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.add('opacity-0');
    setTimeout(() => {
      modalContainer.classList.add('hidden');
    }, 300);
  };

  // Decrypt Logic
  window.decryptPackage = async (packageId) => {
    const privateKey = document.getElementById('private-key-input').value.trim();
    if (!privateKey) {
      const errEl = document.getElementById('modal-error-msg');
      errEl.textContent = '❌ Private Key tidak boleh kosong! Silakan generate atau masukkan Private Key Anda di bagian "Identitas & Kunci".';
      errEl.classList.remove('hidden');
      return;
    }

    const btn = document.getElementById('modal-decrypt-btn');
    const errEl = document.getElementById('modal-error-msg');

    try {
      btn.disabled = true;
      btn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Processing Decryption...';
      errEl.classList.add('hidden');

      try {
        const result = await api.decryptFile(packageId, privateKey);

        // Success! Switch views in modal
        const successSection = document.getElementById('modal-success-section');
        const decryptSection = document.getElementById('modal-decrypt-section');

        decryptSection.classList.add('hidden');
        successSection.classList.remove('hidden');

        // Update performance metrics
        if (result.data.stats) {
          document.getElementById('metric-duration').textContent = formatter.duration(result.data.stats.duration);
          document.getElementById('metric-size').textContent = formatter.fileSize(result.data.originalSize);
          document.getElementById('metric-cpu').textContent = formatter.cpu(result.data.stats.peakCPU);
        }

        const downloadBtn = document.getElementById('modal-download-btn');
        downloadBtn.onclick = () => {
          const url = `${getApiBaseUrl()}/dekripsi/download/${result.data.decryptedId}`;
          api.downloadFile(url, result.data.originalName);
        };

      } catch (error) {
        throw error;
      }

    } catch (error) {
      btn.disabled = false;
      btn.innerHTML = '🔓 Dekripsi Berkas Sekarang';
      errEl.textContent = '❌ Decryption failed: ' + error.message;
      errEl.classList.remove('hidden');
    }
  };

  // Delete inbox package
  window.deleteInboxPackage = async (packageId) => {
    if (!confirm('Yakin ingin menghapus paket ini?')) return;
    try {
      await api.deleteInboxPackage(packageId);
      showToast('Paket berhasil dihapus! 🗑️', 'success');
      loadInbox(); // Refresh the inbox
    } catch (error) {
      showToast('Gagal menghapus paket: ' + error.message, 'error');
    }
  };

  // Refresh button
  document.getElementById('refresh-inbox-btn').addEventListener('click', loadInbox);

  // Clear Inbox button
  document.getElementById('clear-inbox-btn').addEventListener('click', async () => {
    if (!confirm('Are you sure you want to delete ALL packages in inbox?')) return;
    try {
      await api.clearInbox();
      showToast('Inbox cleared successfully! 🧹', 'success');
      loadInbox();
    } catch (error) {
      showToast('Gagal membersihkan inbox: ' + error.message, 'error');
    }
  });


  // Initial load
  loadInbox();

  // Check initially for keys
  if (window._demoKeyPair) {
    document.getElementById('private-key-input').value = window._demoKeyPair.privateKey;
    document.getElementById('public-key-display').value = window._demoKeyPair.publicKey;
  }
}
