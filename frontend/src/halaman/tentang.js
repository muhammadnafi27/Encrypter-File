/**
 * Render Tentang Page - Static Layout with Full Tech Stack
 */
function renderTentangPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-5xl font-bold gradient-text mb-3">Tentang Encrypter.id</h1>
          <p class="text-gray-400 text-lg">Sistem file sharing aman berbasis hybrid cryptography</p>
        </div>
        
        <!-- Introduction -->
        <div class="card mb-8">
          <div class="text-center mb-4">
            <h2 class="text-2xl font-semibold text-green-neon">Apa itu Encrypter.id?</h2>
          </div>
          <div class="space-y-3 text-gray-300 max-w-4xl mx-auto">
            <p class="text-center">
              <strong>Encrypter.id</strong> adalah aplikasi web edukatif yang mendemonstrasikan penggunaan <strong>hybrid cryptography</strong> untuk file sharing yang aman.
            </p>
            <p class="text-center">
              Aplikasi ini menggabungkan kekuatan <strong>AES-256-GCM</strong> (enkripsi simetris) dan <strong>RSA-OAEP</strong> (enkripsi asimetris) untuk memberikan keamanan tingkat tinggi dengan performa optimal.
            </p>
            <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-4 mt-4">
              <p class="text-green-neon text-sm text-center">
                ⚠️ <strong>Catatan:</strong> Aplikasi ini dibuat untuk tujuan edukatif dan demonstrasi. Untuk penggunaan production dengan data sensitif, diperlukan implementasi tambahan seperti autentikasi user, enkripsi at-rest, dan audit logging.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Flow Diagram -->
        <div class="card mb-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-green-neon">Alur Sistem</h2>
          </div>
          <div class="bg-dark-700 p-6 rounded-lg border border-green-neon/30 max-w-4xl mx-auto">
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Penerima Generate RSA Key Pair</p>
                  <p class="text-sm text-gray-400">Penerima membuat pasangan public key dan private key</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Penerima Bagikan Public Key</p>
                  <p class="text-sm text-gray-400">Public key diberikan kepada pengirim (aman untuk dibagikan)</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Pengirim Enkripsi File dengan AES</p>
                  <p class="text-sm text-gray-400">File dienkripsi menggunakan AES-256-GCM dengan kunci random</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Kunci AES Dienkripsi dengan RSA</p>
                  <p class="text-sm text-gray-400">Kunci AES dienkripsi menggunakan public key penerima (RSA-OAEP)</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Paket Dikirim</p>
                  <p class="text-sm text-gray-400">Paket berisi file terenkripsi + kunci AES terenkripsi + metadata</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Penerima Dekripsi Kunci AES</p>
                  <p class="text-sm text-gray-400">Menggunakan private key untuk mendekripsi kunci AES</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-green-neon text-dark-900 rounded-full flex items-center justify-center font-bold flex-shrink-0">7</div>
                <div class="flex-1">
                  <p class="font-semibold text-green-neon">Penerima Dekripsi File</p>
                  <p class="text-sm text-gray-400">Menggunakan kunci AES untuk mendekripsi file asli</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- AES & RSA Side by Side -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- AES Section -->
          <div class="card h-full">
            <div class="text-center mb-4">
              <h2 class="text-2xl font-semibold text-green-neon">🔐 AES-256-GCM</h2>
            </div>
            <div class="space-y-4 text-gray-300">
              <p class="text-sm text-center">
                <strong>Advanced Encryption Standard (AES)</strong> adalah algoritma enkripsi simetris yang sangat cepat dan aman.
              </p>
              <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20">
                <p class="font-semibold text-green-neon mb-2 text-sm">Keunggulan AES:</p>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Sangat cepat untuk enkripsi file besar</li>
                  <li>AES-256 menggunakan kunci 256-bit</li>
                  <li>Standar enkripsi pemerintah & industri</li>
                </ul>
              </div>
              <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20">
                <p class="font-semibold text-green-neon mb-2 text-sm">Mode GCM:</p>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Confidentiality:</strong> Data terenkripsi</li>
                  <li><strong>Integrity:</strong> Authentication tag</li>
                  <li><strong>Nonce:</strong> Keamanan tambahan</li>
                </ul>
              </div>
              <div class="bg-green-neon/10 border border-green-neon/30 rounded-lg p-3">
                <p class="text-green-neon text-xs text-center">
                  ⚠️ <strong>Tantangan:</strong> Kunci AES harus dibagikan secara aman. Di sinilah RSA berperan.
                </p>
              </div>
            </div>
          </div>
          
          <!-- RSA Section -->
          <div class="card h-full">
            <div class="text-center mb-4">
              <h2 class="text-2xl font-semibold text-green-neon">🔑 RSA-OAEP</h2>
            </div>
            <div class="space-y-4 text-gray-300">
              <p class="text-sm text-center">
                <strong>RSA (Rivest-Shamir-Adleman)</strong> adalah algoritma enkripsi asimetris dengan sepasang kunci.
              </p>
              <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20">
                <p class="font-semibold text-green-neon mb-2 text-sm">Public/Private Key:</p>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Public Key:</strong> Untuk enkripsi, aman dibagikan</li>
                  <li><strong>Private Key:</strong> Untuk dekripsi, rahasia</li>
                  <li>Panjang kunci: 2048-bit atau 4096-bit</li>
                </ul>
              </div>
              <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20">
                <p class="font-semibold text-green-neon mb-2 text-sm">OAEP Padding:</p>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Optimal Asymmetric Encryption Padding</li>
                  <li>Lebih aman dari PKCS#1 v1.5</li>
                  <li>Mencegah berbagai jenis serangan</li>
                </ul>
              </div>
              <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p class="text-green-300 text-xs text-center">
                  ✅ <strong>Keuntungan:</strong> Tidak perlu berbagi kunci rahasia terlebih dahulu.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Hybrid Cryptography -->
        <div class="card mb-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-green-neon">🔗 Mengapa Hybrid?</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20 text-center">
              <p class="text-3xl mb-2">⚡</p>
              <p class="font-semibold text-green-neon text-sm">AES = Kecepatan</p>
              <p class="text-xs text-gray-400 mt-1">Enkripsi file besar dengan cepat</p>
            </div>
            <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20 text-center">
              <p class="text-3xl mb-2">🔒</p>
              <p class="font-semibold text-green-neon text-sm">RSA = Keamanan</p>
              <p class="text-xs text-gray-400 mt-1">Pertukaran kunci yang aman</p>
            </div>
            <div class="bg-dark-700 p-4 rounded-lg border border-green-neon/20 text-center">
              <p class="text-3xl mb-2">💪</p>
              <p class="font-semibold text-green-neon text-sm">Hybrid = Best of Both</p>
              <p class="text-xs text-gray-400 mt-1">Kombinasi kecepatan & keamanan</p>
            </div>
          </div>
        </div>
        
        <!-- Tech Stack - FULL DISPLAY (NO SLIDER) -->
        <div class="card mb-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-green-neon">🛠️ Tech Stack</h2>
            <p class="text-gray-400 text-sm mt-2">Teknologi yang digunakan dalam membangun Encrypter.id</p>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            <!-- HTML5 -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#E34F26">
                  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                </svg>
              </div>
              <span class="tech-stack-label">HTML5</span>
            </div>
            
            <!-- Tailwind -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#06B6D4">
                  <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
                </svg>
              </div>
              <span class="tech-stack-label">Tailwind</span>
            </div>
            
            <!-- JavaScript -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#F7DF1E">
                  <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                </svg>
              </div>
              <span class="tech-stack-label">JavaScript</span>
            </div>
            
            <!-- Node.js -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#339933">
                  <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
                </svg>
              </div>
              <span class="tech-stack-label">Node.js</span>
            </div>
            
            <!-- Express -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#000000">
                  <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" fill="#fff"/>
                </svg>
              </div>
              <span class="tech-stack-label">Express</span>
            </div>
            
            <!-- Chart.js -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="#FF6384">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a7.2 7.2 0 110 14.4 7.2 7.2 0 010-14.4z"/>
                </svg>
              </div>
              <span class="tech-stack-label">Chart.js</span>
            </div>
            
            <!-- Crypto -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <span class="text-2xl">🔐</span>
              </div>
              <span class="tech-stack-label">Crypto</span>
            </div>
            
            <!-- Multer -->
            <div class="tech-stack-item">
              <div class="tech-stack-icon">
                <span class="text-2xl">📁</span>
              </div>
              <span class="tech-stack-label">Multer</span>
            </div>
          </div>
          
          <p class="text-sm text-gray-400 text-center mt-6">
            💡 Dipilih karena: Ekosistem JavaScript konsisten, crypto library native yang powerful, mudah untuk deployment dan testing lokal, serta performa baik untuk operasi I/O.
          </p>
        </div>
        
        <!-- Team Section -->
        <div class="card">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-semibold text-green-neon">👥 Tim di balik Encrypter</h2>
            <p class="text-gray-400 mt-2">Orang-orang yang membangun Encrypter.id</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            <!-- Muhammad Nafi Azka Soleiman -->
            <div class="team-card">
              <div class="team-photo-wrapper">
                <img src="/background/Nafi.JPG" alt="Muhammad Nafi Azka Soleiman" class="team-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="team-photo-fallback" style="display:none;">N</div>
              </div>
              <h3 class="team-name">Muhammad Nafi Azka Soleiman</h3>
              <div class="team-divider"></div>
              <p class="team-role">Full Stack Developer (Pengembang Full Stack)</p>
              <div class="team-tags">
                <span class="team-tag">Full Stack</span>
                <span class="team-tag">Backend</span>
                <span class="team-tag">API</span>
              </div>
            </div>

            <!-- Moqtada Aziz Pratama -->
            <div class="team-card">
              <div class="team-photo-wrapper">
                <img src="/background/Aziz.jpg" alt="Moqtada Aziz Pratama" class="team-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="team-photo-fallback" style="display:none;">A</div>
              </div>
              <h3 class="team-name">Moqtada Aziz Pratama</h3>
              <div class="team-divider"></div>
              <p class="team-role">Desainer UI/UX & Front-end Developer</p>
              <div class="team-tags">
                <span class="team-tag">UI/UX</span>
                <span class="team-tag">Frontend</span>
              </div>
            </div>

            <!-- Ramzi Alfian -->
            <div class="team-card">
              <div class="team-photo-wrapper">
                <img src="/background/Ramzi.JPG" alt="Ramzi Alfian" class="team-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="team-photo-fallback" style="display:none;">R</div>
              </div>
              <h3 class="team-name">Ramzi Alfian</h3>
              <div class="team-divider"></div>
              <p class="team-role">Front-end Developer (Pengembang Front-end)</p>
              <div class="team-tags">
                <span class="team-tag">Frontend</span>
                <span class="team-tag">UI</span>
              </div>
            </div>

            <!-- Caesar Aurel -->
            <div class="team-card">
              <div class="team-photo-wrapper">
                <img src="/background/Caesar.png" alt="Caesar Aurel" class="team-photo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="team-photo-fallback" style="display:none;">C</div>
              </div>
              <h3 class="team-name">Caesar Aurel</h3>
              <div class="team-divider"></div>
              <p class="team-role">Research & Development</p>
              <div class="team-tags">
                <span class="team-tag">R&D</span>
                <span class="team-tag">Benchmark</span>
                <span class="team-tag">Research</span>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  `;
}

// Export
window.renderTentangPage = renderTentangPage;
