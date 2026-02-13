/**
 * Render Simulasi Serangan Page
 */
function renderSimulasiSeranganPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-5xl font-bold gradient-text mb-3">Simulasi Brute Force</h1>
          <p class="text-gray-400 text-lg">Estimasi waktu untuk memecahkan enkripsi AES dengan brute force</p>
        </div>
        
        <!-- Input Section -->
        <div class="card mb-8">
          <div class="text-center mb-6">
            <h3 class="text-2xl font-semibold text-green-neon mb-2">Parameter Simulasi</h3>
          </div>
          
          <div class="max-w-2xl mx-auto space-y-6">
            <div>
              <label class="block text-sm font-medium mb-3 text-center text-gray-300">Panjang Kunci AES</label>
              <select id="key-length" class="input-field text-center text-lg font-semibold">
                <option value="128">AES-128 (128-bit)</option>
                <option value="192">AES-192 (192-bit)</option>
                <option value="256" selected>AES-256 (256-bit)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-3 text-center text-gray-300">Percobaan per Detik</label>
              <input type="number" id="attempts-per-sec" class="input-field text-center text-lg font-mono" value="1000000000" placeholder="1000000000">
              <p class="text-xs text-gray-400 mt-2 text-center">💡 Asumsi: 1 miliar percobaan/detik (komputer super modern)</p>
            </div>
          </div>
          
          <div class="text-center mt-6">
            <button id="calculate-btn" class="btn-primary text-lg px-8 py-4">
              <span class="flex items-center justify-center space-x-2">
                <span class="text-2xl">🧮</span>
                <span>Hitung Estimasi</span>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Results -->
        <div id="results" class="hidden space-y-8">
          <div class="card bg-gradient-to-br from-green-neon/10 to-cyan/10 border-green-neon/50">
            <div class="text-center mb-6">
              <h3 class="text-2xl font-semibold text-green-neon">Hasil Simulasi</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div class="p-6 bg-dark-900/50 rounded-lg border border-green-neon/30 text-center">
                <p class="text-sm text-gray-400 mb-2">Total Kombinasi Kunci</p>
                <p class="text-xl font-bold text-mono text-white break-all" id="total-combinations"></p>
              </div>
              
              <div class="p-6 bg-dark-900/50 rounded-lg border border-green-neon/30 text-center">
                <p class="text-sm text-gray-400 mb-2">Estimasi Waktu</p>
                <p class="text-xl font-bold text-mono text-green-neon" id="estimated-time"></p>
              </div>
              
              <div class="p-6 bg-dark-900/50 rounded-lg border border-green-neon/30 text-center">
                <p class="text-sm text-gray-400 mb-2">Dalam Tahun</p>
                <p class="text-xl font-bold text-mono text-green-neon" id="years"></p>
              </div>
            </div>
          </div>
          
          <!-- Konten Edukatif -->
          <div class="card">
            <div class="text-center mb-4">
              <h3 class="text-2xl font-semibold text-green-neon">💡 Penjelasan</h3>
            </div>
            <div class="space-y-3 text-gray-300 max-w-3xl mx-auto">
              <p class="text-center">
                <strong class="text-green-neon">Brute Force Attack</strong> adalah metode memecahkan enkripsi dengan mencoba semua kemungkinan kunci.
              </p>
              <p class="text-center">
                Untuk AES-256, terdapat <strong>2^256</strong> kombinasi kunci yang mungkin. Bahkan dengan komputer super tercepat di dunia, waktu yang dibutuhkan untuk mencoba semua kombinasi adalah <strong>jutaan kali usia alam semesta</strong>.
              </p>
              <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-4 mt-4">
                <p class="text-green-neon text-center">
                  ⚠️ Ini membuktikan bahwa AES-256 praktis tidak mungkin dipecahkan dengan brute force menggunakan teknologi saat ini.
                </p>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="text-center mb-4">
              <h3 class="text-2xl font-semibold text-green-neon">🔒 Keamanan Hybrid Cryptography</h3>
            </div>
            <div class="space-y-3 text-gray-300 max-w-3xl mx-auto">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-dark-700/50 rounded-lg border border-green-neon/20 text-center">
                  <p class="font-semibold text-green-neon mb-2">AES (Symmetric)</p>
                  <p class="text-sm">Sangat cepat untuk enkripsi file besar</p>
                </div>
                <div class="p-4 bg-dark-700/50 rounded-lg border border-green-neon/20 text-center">
                  <p class="font-semibold text-green-neon mb-2">RSA (Asymmetric)</p>
                  <p class="text-sm">Memecahkan masalah distribusi kunci</p>
                </div>
                <div class="p-4 bg-dark-700/50 rounded-lg border border-green-neon/20 text-center">
                  <p class="font-semibold text-green-neon mb-2">Hybrid</p>
                  <p class="text-sm">Menggabungkan kecepatan AES + keamanan RSA</p>
                </div>
              </div>
              <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                <p class="text-green-300 text-center">
                  ✅ Hasil: Enkripsi cepat + distribusi kunci aman + keamanan tinggi
                </p>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="text-center mb-4">
              <h3 class="text-2xl font-semibold text-green-neon">🛡️ Pentingnya Integritas (GCM)</h3>
            </div>
            <div class="space-y-3 text-gray-300 max-w-3xl mx-auto">
              <p class="text-center">
                <strong class="text-green-neon">AES-GCM (Galois/Counter Mode)</strong> tidak hanya mengenkripsi data, tetapi juga memastikan integritas.
              </p>
              <p class="text-center">
                Setiap paket terenkripsi memiliki <strong>authentication tag</strong>. Jika data dimodifikasi, dekripsi akan gagal.
              </p>
              <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mt-4">
                <p class="text-green-300 text-center">
                  ✅ Ini melindungi dari serangan man-in-the-middle dan tampering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('calculate-btn').addEventListener('click', () => {
    const keyLength = parseInt(document.getElementById('key-length').value);
    const attemptsPerSec = parseFloat(document.getElementById('attempts-per-sec').value);

    if (!attemptsPerSec || attemptsPerSec <= 0) {
      showToast('Masukkan jumlah percobaan per detik yang valid!', 'warning');
      return;
    }

    // Calculate
    const totalCombinations = Math.pow(2, keyLength);
    const secondsNeeded = totalCombinations / attemptsPerSec;
    const yearsNeeded = secondsNeeded / (365.25 * 24 * 60 * 60);

    // Display results
    document.getElementById('total-combinations').textContent = `2^${keyLength} = ${totalCombinations.toExponential(2)}`;
    document.getElementById('estimated-time').textContent = formatLargeTime(secondsNeeded);
    document.getElementById('years').textContent = `${yearsNeeded.toExponential(2)} tahun`;

    document.getElementById('results').classList.remove('hidden');

    showToast('Kalkulasi selesai!', 'success');
  });

  function formatLargeTime(seconds) {
    if (seconds < 60) {
      return `${seconds.toFixed(2)} detik`;
    } else if (seconds < 3600) {
      return `${(seconds / 60).toFixed(2)} menit`;
    } else if (seconds < 86400) {
      return `${(seconds / 3600).toFixed(2)} jam`;
    } else if (seconds < 31557600) {
      return `${(seconds / 86400).toFixed(2)} hari`;
    } else {
      return `${(seconds / 31557600).toExponential(2)} tahun`;
    }
  }
}

// Export
window.renderSimulasiSeranganPage = renderSimulasiSeranganPage;
