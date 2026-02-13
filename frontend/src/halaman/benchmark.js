/**
 * Render Benchmark Page - Technical Evaluation Interface
 * Pengujian performa komprehensif untuk Sistem Hybrid Cryptography
 */
function renderBenchmarkPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <!-- Page Video Background -->
    <div class="page-video-bg">
      <video autoplay loop muted playsinline>
        <source src="/background/background.webm" type="video/webm">
      </video>
    </div>
    
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- ===== HEADER ===== -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold gradient-text mb-4">Evaluasi Performa Hybrid Cryptography</h1>
          <p class="text-white text-lg max-w-3xl mx-auto">
            Sistem pengujian komprehensif untuk menganalisis performa encryption/decryption 
            menggunakan AES-256-GCM dan RSA-2048 pada berbagai ukuran file
          </p>
        </div>

        <!-- ===== TEST CONFIGURATION ===== -->
        <div class="card mb-8">
          <div class="mb-8">
            <h2 class="text-3xl font-semibold text-green-neon mb-6">⚙️ Konfigurasi Pengujian</h2>
            
            <!-- File Size Selection -->
            <div class="mb-8">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1">Pilih Ukuran File</h3>
                  <p class="text-sm text-white">Testing dilakukan dengan file random untuk setiap ukuran</p>
                </div>
                <div class="flex gap-2">
                  <button id="select-all-sizes" class="btn-secondary text-xs px-3 py-2">Pilih Semua</button>
                  <button id="deselect-all-sizes" class="btn-secondary text-xs px-3 py-2">Batal Pilih</button>
                </div>
              </div>
              <div id="sizes-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <label class="size-card cursor-pointer p-4 bg-dark-700/40 rounded-lg border border-green-neon/20 hover:border-green-neon/50 transition-all flex flex-col items-center">
                  <input type="checkbox" class="size-checkbox hidden" value="1MB" checked>
                  <div class="mb-1">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                    </svg>
                  </div>
                  <div class="font-semibold text-lg">1 MB</div>
                    <div class="text-xs text-white mt-1">File Kecil</div>
                </label>
                <label class="size-card cursor-pointer p-4 bg-dark-700/40 rounded-lg border border-green-neon/20 hover:border-green-neon/50 transition-all flex flex-col items-center">
                  <input type="checkbox" class="size-checkbox hidden" value="5MB" checked>
                  <div class="mb-1">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                    </svg>
                  </div>
                  <div class="font-semibold text-lg">5 MB</div>
                  <div class="text-xs text-white mt-1">File Menengah</div>
                </label>
                <label class="size-card cursor-pointer p-4 bg-dark-700/40 rounded-lg border border-green-neon/20 hover:border-green-neon/50 transition-all flex flex-col items-center">
                  <input type="checkbox" class="size-checkbox hidden" value="10MB" checked>
                  <div class="mb-1">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                    </svg>
                  </div>
                  <div class="font-semibold text-lg">10 MB</div>
                  <div class="text-xs text-white mt-1">File Besar</div>
                </label>
                <label class="size-card cursor-pointer p-4 bg-dark-700/40 rounded-lg border border-green-neon/20 hover:border-green-neon/50 transition-all flex flex-col items-center">
                  <input type="checkbox" class="size-checkbox hidden" value="100MB">
                  <div class="mb-1">
                    <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"/>
                    </svg>
                  </div>
                  <div class="font-semibold text-lg">100 MB</div>
                  <div class="text-xs text-white mt-1">Sangat Besar</div>
                </label>
              </div>
            </div>

            <!-- Algorithms Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pt-8 border-t border-gray-700">
              <div class="bg-dark-800/50 p-4 rounded-lg border border-green-neon/10">
                <div class="flex items-start gap-3">
                  <div class="text-2xl">🔐</div>
                  <div>
                    <h4 class="font-semibold text-green-neon mb-1">AES-256-GCM</h4>
                    <p class="text-sm text-white">Symmetric encryption untuk enkripsi file. Mode GCM menyediakan confidentiality dan authenticity.</p>
                  </div>
                </div>
              </div>
              <div class="bg-dark-800/50 p-4 rounded-lg border border-green-neon/10">
                <div class="flex items-start gap-3">
                  <div class="text-2xl">🔑</div>
                  <div>
                    <h4 class="font-semibold text-green-neon mb-1">RSA-2048-OAEP</h4>
                    <p class="text-sm text-white">Asymmetric encryption untuk mengamankan AES key. OAEP padding untuk keamanan maksimal.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Run Button -->
            <div class="flex justify-center">
              <button id="run-benchmark-btn" class="btn-primary text-lg px-8 py-4 flex items-center gap-2 relative group">
                <span id="run-btn-content" class="flex items-center gap-2">
                  <span class="text-2xl group-hover:animate-pulse">⚡</span>
                  <span>Jalankan Benchmark Lengkap</span>
                </span>
                <!-- Local loading overlay -->
                <div id="benchmark-loading-overlay" class="hidden absolute inset-0 bg-black/70 rounded-lg z-50 flex items-center justify-center">
                  <div class="text-center">
                    <div class="spinner mb-4"></div>
                    <p id="benchmark-loading-text" class="text-green-neon font-mono text-sm">Sedang menjalankan test...</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- ===== RESULTS SECTION ===== -->
        <div id="results-section" class="hidden space-y-8">
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="card bg-gradient-to-br from-dark-700 to-dark-800 border border-green-neon/20">
              <div class="text-sm text-white mb-1">Total Tests Run</div>
              <div class="text-3xl font-bold text-green-neon" id="stat-tests">0</div>
            </div>
            <div class="card bg-gradient-to-br from-dark-700 to-dark-800 border border-green-neon/20">
              <div class="text-sm text-white mb-1">Rata-rata Waktu Enkripsi</div>
              <div class="text-2xl font-bold text-cyan" id="stat-enc-time">0 ms</div>
            </div>
            <div class="card bg-gradient-to-br from-dark-700 to-dark-800 border border-green-neon/20">
              <div class="text-sm text-white mb-1">Rata-rata Waktu Dekripsi</div>
              <div class="text-2xl font-bold text-green-neon" id="stat-dec-time">0 ms</div>
            </div>
            <div class="card bg-gradient-to-br from-dark-700 to-dark-800 border border-green-neon/20">
              <div class="text-sm text-white mb-1">Penggunaan Memory Puncak</div>
              <div class="text-2xl font-bold text-purple-400" id="stat-memory">0 MB</div>
            </div>
          </div>

          <!-- Tabel Hasil -->
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-semibold text-green-neon">📊 Tabel Hasil Benchmark</h3>
              <div class="flex items-center gap-2">
                <button id="export-csv-btn" class="btn-secondary text-xs px-3 py-2">📥 CSV</button>
                <button id="export-json-btn" class="btn-secondary text-xs px-3 py-2">📥 JSON</button>
                <button id="clear-results-btn" class="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1 rounded transition-all">
                  ✕ Hapus
                </button>
              </div>
            </div>
            <div class="overflow-x-auto border-t border-gray-700">
              <table class="w-full text-sm results-table" title="Tabel Hasil Benchmark">
                <thead>
                  <tr class="text-gray-400 uppercase text-xs">
                    <th class="px-3 py-3 text-left">Ukuran File</th>
                    <th class="px-3 py-3 text-right">AES Enc (ms) <span class="text-white text-xs">ℹ️</span></th>
                      <th class="px-3 py-3 text-right">RSA Enc (ms) <span class="text-white text-xs">ℹ️</span></th>
                    <th class="px-3 py-3 text-right">Total Enc (ms)</th>
                    <th class="px-3 py-3 text-right">AES Dec (ms) <span class="text-white text-xs">ℹ️</span></th>
                    <th class="px-3 py-3 text-right">RSA Dec (ms) <span class="text-white text-xs">ℹ️</span></th>
                    <th class="px-3 py-3 text-right">Total Dec (ms)</th>
                    <th class="px-3 py-3 text-right">Puncak RAM (MB)</th>
                    <th class="px-3 py-3 text-center">Rata-rata CPU (%)</th>
                    <th class="px-3 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody id="results-table-body"></tbody>
              </table>
            </div>
          </div>

          <!-- Grafik Analisis Performa -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Grafik Waktu Enkripsi/Dekripsi -->
            <div class="card">
                  <h3 class="text-xl font-semibold text-green-neon mb-4">Waktu Encryption/Decryption</h3>
              <div style="position: relative; height: 300px;">
                <canvas id="benchmark-time-chart"></canvas>
              </div>
            </div>

            <!-- Grafik Penggunaan Resource -->
            <div class="card">
              <h3 class="text-xl font-semibold text-green-neon mb-4">Penggunaan Resource</h3>
              <div style="position: relative; height: 300px;">
                <canvas id="benchmark-resource-chart"></canvas>
              </div>
            </div>
          </div>

          <!-- Analisis Terperinci -->
          <div class="card">
            <h3 class="text-xl font-semibold text-green-neon mb-4">📈 Analisis & Insights</h3>
            <div id="analysis-section" class="space-y-4">
              <div class="bg-dark-800/50 p-4 rounded-lg border border-green-neon/10">
                <p class="text-sm text-white" id="analysis-text">
                  Hasil benchmark akan ditampilkan setelah test selesai...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  let currentBenchmarkId = null;
  let timeChartInstance = null;
  let resourceChartInstance = null;

  // Event listeners for size selection
  document.getElementById('select-all-sizes').addEventListener('click', () => {
    document.querySelectorAll('.size-checkbox').forEach(cb => cb.checked = true);
    updateSizeCardUI();
  });

  document.getElementById('deselect-all-sizes').addEventListener('click', () => {
    document.querySelectorAll('.size-checkbox').forEach(cb => cb.checked = false);
    updateSizeCardUI();
  });

  // Update size card visual state
  function updateSizeCardUI() {
    document.querySelectorAll('.size-card').forEach(card => {
      const checkbox = card.querySelector('.size-checkbox');
      if (checkbox.checked) {
        card.classList.add('border-green-neon/60', 'bg-green-neon/10');
        card.classList.remove('border-green-neon/20');
      } else {
        card.classList.remove('border-green-neon/60', 'bg-green-neon/10');
        card.classList.add('border-green-neon/20');
      }
    });
  }

  // Size card click handler
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('size-checkbox')) {
      updateSizeCardUI();
    }
  });

  // Run benchmark
  document.getElementById('run-benchmark-btn').addEventListener('click', async () => {
    const checkboxes = document.querySelectorAll('.size-checkbox:checked');
    const fileSizes = Array.from(checkboxes).map(cb => cb.value);

    if (fileSizes.length === 0) {
      showToast('Pilih minimal satu ukuran file!', 'warning');
      return;
    }

    try {
      showBenchmarkLoading('Sedang menjalankan test untuk ' + fileSizes.length + ' ukuran file...');
      const result = await api.runBenchmark(fileSizes);
      hideBenchmarkLoading();

      currentBenchmarkId = result.data.benchmarkId;
      displayResults(result.data.results);

      showToast('✅ Benchmark selesai!', 'success');
    } catch (error) {
      hideBenchmarkLoading();
      showToast('❌ Gagal: ' + error.message, 'error');
    }
  });

  function displayResults(results) {
    const validResults = results.filter(r => !r.error);
    const tbody = document.getElementById('results-table-body');

    tbody.innerHTML = results.map(r => {
      if (r.error) {
        return `<tr><td colspan="10" class="text-red-400 text-center py-4">${r.size}: ${r.error}</td></tr>`;
      }

      const statusBadge = r.error ? `<span class="px-2 py-1 rounded bg-red-600/20 text-red-400 text-xs font-semibold">GAGAL</span>` : `<span class="px-2 py-1 rounded bg-green-600/20 text-green-neon text-xs font-semibold">SELESAI</span>`;

      return `
        <tr class="border-b border-gray-800 hover:bg-dark-800/30 transition-colors even:bg-dark-800/10">
          <td class="px-3 py-3 font-mono font-bold text-green-neon">${r.size}</td>
          <td class="px-3 py-3 text-right font-mono text-sm">${r.encryption.aesTime || 'N/A'}</td>
          <td class="px-3 py-3 text-right font-mono text-sm text-cyan">${r.encryption.rsaTime || 'N/A'}</td>
          <td class="px-3 py-3 text-right font-mono font-semibold">${r.encryption.duration}</td>
          <td class="px-3 py-3 text-right font-mono text-sm">${r.decryption.aesTime || 'N/A'}</td>
          <td class="px-3 py-3 text-right font-mono text-sm text-cyan">${r.decryption.rsaTime || 'N/A'}</td>
          <td class="px-3 py-3 text-right font-mono font-semibold">${r.decryption.duration}</td>
          <td class="px-3 py-3 text-right font-mono">${(r.encryption.peakRAM / (1024 * 1024)).toFixed(2)}</td>
          <td class="px-3 py-3 text-center font-mono">${r.encryption.cpuUsage || 'N/A'}</td>
          <td class="px-3 py-3 text-center">
            ${statusBadge}
          </td>
        </tr>
      `;
    }).join('');

    // Update quick stats
    updateQuickStats(validResults);

    document.getElementById('results-section').classList.remove('hidden');

    // Create charts
    createTimeChart(validResults);
    createResourceChart(validResults);

    // Generate analysis
    generateAnalysis(validResults);

    // Add clear listener
    const clearBtn = document.getElementById('clear-results-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        document.getElementById('results-section').classList.add('hidden');
        document.getElementById('results-table-body').innerHTML = '';
        if (timeChartInstance) timeChartInstance.destroy();
        if (resourceChartInstance) resourceChartInstance.destroy();
        currentBenchmarkId = null;
        showToast('Hasil dihapus.', 'info');
      };
    }
  }

  function updateQuickStats(results) {
    const encTimes = results.map(r => r.encryption.duration);
    const decTimes = results.map(r => r.decryption.duration);
    const memories = results.map(r => r.encryption.peakRAM / (1024 * 1024));

    const avgEnc = encTimes.reduce((a, b) => a + b, 0) / encTimes.length;
    const avgDec = decTimes.reduce((a, b) => a + b, 0) / decTimes.length;
    const maxMem = Math.max(...memories);

    document.getElementById('stat-tests').textContent = results.length;
    document.getElementById('stat-enc-time').textContent = avgEnc.toFixed(2) + ' ms';
    document.getElementById('stat-dec-time').textContent = avgDec.toFixed(2) + ' ms';
    document.getElementById('stat-memory').textContent = maxMem.toFixed(2) + ' MB';
  }

  function createTimeChart(results) {
    const ctx = document.getElementById('benchmark-time-chart').getContext('2d');

    if (timeChartInstance) timeChartInstance.destroy();

    timeChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: results.map(r => r.size),
        datasets: [
          {
            label: 'AES Encryption (ms)',
            data: results.map(r => r.encryption.aesTime || r.encryption.duration * 0.95),
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            tension: 0.3,
            fill: true
          },
          {
            label: 'AES Decryption (ms)',
            data: results.map(r => r.decryption.aesTime || r.decryption.duration * 0.95),
            borderColor: '#00cc6a',
            backgroundColor: 'rgba(0, 204, 106, 0.1)',
            tension: 0.3,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#f0f0f0', font: { size: 12 } }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });
  }

  function createResourceChart(results) {
    const ctx = document.getElementById('benchmark-resource-chart').getContext('2d');

    if (resourceChartInstance) resourceChartInstance.destroy();

    resourceChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: results.map(r => r.size),
        datasets: [
          {
            label: 'Peak RAM (MB)',
            data: results.map(r => r.encryption.peakRAM / (1024 * 1024)),
            backgroundColor: 'rgba(168, 85, 247, 0.6)',
            borderColor: 'rgba(168, 85, 247, 1)',
            borderWidth: 1,
            yAxisID: 'y'
          },
          {
            label: 'CPU Usage (%)',
            data: results.map(r => r.encryption.cpuUsage || 25),
            backgroundColor: 'rgba(0, 255, 200, 0.6)',
            borderColor: 'rgba(0, 255, 200, 1)',
            borderWidth: 1,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#f0f0f0', font: { size: 12 } }
          }
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            title: { display: true, text: 'RAM (MB)', color: '#9ca3af' }
          },
          y1: {
            type: 'linear',
            position: 'right',
            ticks: { color: '#9ca3af' },
            grid: { drawOnChartArea: false },
            title: { display: true, text: 'CPU (%)', color: '#9ca3af' }
          },
          x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        }
      }
    });
  }

  function generateAnalysis(results) {
    const encTimes = results.map(r => r.encryption.duration);
    const scalability = results.length > 1 ? 
      ((encTimes[encTimes.length - 1] / encTimes[0]).toFixed(2)) : 'N/A';

    let analysisHTML = `
      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <span class="text-lg">📊</span>
          <div>
            <p class="font-semibold text-white">Scalability Analysis</p>
            <p class="text-sm text-white">
              Encryption time scaling factor: <strong class="text-green-neon">${scalability}x</strong>
              pada peningkatan ukuran file
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-lg">⚡</span>
          <div>
            <p class="font-semibold text-white">Performance Insights</p>
            <p class="text-sm text-white">
              Hybrid cryptography system menunjukkan performa optimal dengan 
              <strong class="text-cyan">AES-256-GCM</strong> untuk file encryption dan 
              <strong class="text-cyan">RSA-2048-OAEP</strong> untuk key security.
            </p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-lg">🔒</span>
          <div>
            <p class="font-semibold text-white">Security Assessment</p>
            <p class="text-sm text-white">
              Sistem ini menyediakan <strong class="text-green-neon">256-bit symmetric encryption</strong> 
              dan <strong class="text-green-neon">2048-bit asymmetric encryption</strong> untuk 
              authenticity dan confidentiality.
            </p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('analysis-text').innerHTML = analysisHTML;
  }

  // Local benchmark loading controls
  function showBenchmarkLoading(text = 'Sedang menjalankan benchmark...') {
    const overlay = document.getElementById('benchmark-loading-overlay');
    const txt = document.getElementById('benchmark-loading-text');
    if (!overlay) return;
    if (txt) txt.textContent = text;
    overlay.classList.remove('hidden');
  }

  function hideBenchmarkLoading() {
    const overlay = document.getElementById('benchmark-loading-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
  }

  // Export buttons
  document.getElementById('export-csv-btn').addEventListener('click', () => {
    if (!currentBenchmarkId) {
      showToast('Jalankan benchmark terlebih dahulu', 'warning');
      return;
    }
    const url = `http://localhost:3001/api/benchmark/export/${currentBenchmarkId}/csv`;
    window.open(url, '_blank');
    showToast('📥 Export CSV dimulai!', 'success');
  });

  document.getElementById('export-json-btn').addEventListener('click', () => {
    if (!currentBenchmarkId) {
      showToast('Jalankan benchmark terlebih dahulu', 'warning');
      return;
    }
    const url = `http://localhost:3001/api/benchmark/export/${currentBenchmarkId}/json`;
    window.open(url, '_blank');
    showToast('📥 Export JSON dimulai!', 'success');
  });
}

// Export
window.renderBenchmarkPage = renderBenchmarkPage;
