/**
 * Render FAQ Page - Modern Design
 */
function renderFaqPage() {
  const app = document.getElementById('app');

  const faqs = [
    {
      category: "Enkripsi",
      q: "Kenapa RSA tidak dipakai untuk enkripsi file langsung?",
      a: "RSA adalah algoritma enkripsi asimetris yang sangat lambat untuk data besar. Untuk file 1MB saja, enkripsi RSA bisa memakan waktu sangat lama dan tidak praktis. Selain itu, RSA memiliki batasan ukuran data yang bisa dienkripsi (tergantung ukuran kunci). Oleh karena itu, RSA hanya digunakan untuk mengenkripsi kunci AES yang kecil (32 bytes), bukan file itu sendiri."
    },
    {
      category: "Kunci",
      q: "Apa bedanya public key dan private key?",
      a: "Public key adalah kunci yang aman untuk dibagikan kepada siapa saja. Digunakan untuk mengenkripsi data. Private key adalah kunci rahasia yang hanya Anda yang boleh tahu. Digunakan untuk mendekripsi data yang dienkripsi dengan public key pasangannya. Konsep ini memungkinkan komunikasi aman tanpa harus berbagi kunci rahasia terlebih dahulu."
    },
    {
      category: "Konsep",
      q: "Apa itu hybrid cryptography?",
      a: "Hybrid cryptography adalah teknik yang menggabungkan enkripsi simetris (seperti AES) dan enkripsi asimetris (seperti RSA). File dienkripsi dengan AES (cepat), lalu kunci AES dienkripsi dengan RSA (aman untuk distribusi). Ini memberikan kecepatan AES dengan keamanan distribusi kunci RSA."
    },
    {
      category: "Teknis",
      q: "Apa itu nonce/iv?",
      a: "Nonce (Number used ONCE) atau IV (Initialization Vector) adalah nilai random yang digunakan sekali untuk setiap enkripsi. Untuk AES-GCM, nonce berukuran 12 bytes. Nonce memastikan bahwa enkripsi file yang sama dengan kunci yang sama akan menghasilkan ciphertext yang berbeda, meningkatkan keamanan."
    },
    {
      category: "Keamanan",
      q: "Kenapa harus AES-GCM?",
      a: "AES-GCM (Galois/Counter Mode) adalah mode enkripsi yang tidak hanya memberikan confidentiality (kerahasiaan) tetapi juga integrity (integritas). Authentication tag yang dihasilkan GCM memastikan bahwa data tidak dimodifikasi. Jika ada perubahan sekecil apapun pada ciphertext, dekripsi akan gagal. Ini melindungi dari serangan tampering dan man-in-the-middle."
    },
    {
      category: "Keamanan",
      q: "Apakah file aman kalau disadap?",
      a: "Ya, selama enkripsi dilakukan dengan benar. File yang terenkripsi dengan AES-256 praktis tidak mungkin dibaca tanpa kunci yang benar, bahkan jika disadap. Namun, keamanan bergantung pada: (1) Private key penerima tidak bocor, (2) Implementasi kriptografi benar, (3) Tidak ada malware di sistem yang mencuri kunci."
    },
    {
      category: "Kesalahan",
      q: "Apa yang terjadi kalau authTag tidak cocok?",
      a: "Jika authentication tag tidak cocok saat dekripsi, itu berarti data telah dimodifikasi atau rusak. Sistem akan menghentikan dekripsi dan menampilkan error 'Integritas tidak valid'. Ini adalah fitur keamanan penting yang melindungi dari data yang corrupt atau yang sengaja diubah oleh pihak ketiga."
    },
    {
      category: "Kekuatan",
      q: "Seberapa aman AES-256 terhadap brute force?",
      a: "AES-256 memiliki 2^256 kombinasi kunci yang mungkin. Bahkan dengan komputer super tercepat yang bisa mencoba 1 miliar kunci per detik, waktu yang dibutuhkan untuk mencoba semua kombinasi adalah sekitar 3.67 x 10^56 tahun (jutaan kali usia alam semesta). Dengan kata lain, AES-256 praktis tidak mungkin dipecahkan dengan brute force menggunakan teknologi saat ini."
    },
    {
      category: "Risiko",
      q: "Apa risiko jika private key bocor?",
      a: "Jika private key bocor, siapa pun yang memilikinya bisa mendekripsi semua paket yang dienkripsi dengan public key pasangannya. Ini sangat berbahaya. Jika Anda curiga private key bocor, segera: (1) Hentikan penggunaan key pair tersebut, (2) Generate key pair baru, (3) Informasikan kepada semua pengirim untuk menggunakan public key baru Anda."
    },
    {
      category: "Benchmark",
      q: "Bagaimana cara menguji performa dan membaca hasilnya?",
      a: "Gunakan halaman Benchmark untuk menguji performa dengan berbagai ukuran file. Hasil benchmark menampilkan: (1) Waktu enkripsi/dekripsi dalam milidetik, (2) CPU usage (average dan peak) dalam persen, (3) RAM usage (average dan peak) dalam MB. File yang lebih besar akan memakan waktu dan resource lebih banyak. Anda bisa export hasil ke CSV/JSON untuk analisis lebih lanjut."
    },
    {
      category: "Info",
      q: "Apakah aplikasi ini aman untuk data sensitif?",
      a: "Aplikasi ini dibuat untuk tujuan EDUKATIF dan DEMONSTRASI. Untuk penggunaan production dengan data sensitif, diperlukan implementasi tambahan seperti: autentikasi user, enkripsi at-rest untuk file di server, HTTPS/TLS untuk komunikasi, audit logging, key management yang lebih robust, dan security testing menyeluruh."
    },
    {
      category: "Konsep",
      q: "Apa perbedaan enkripsi simetris dan asimetris?",
      a: "Enkripsi simetris (seperti AES) menggunakan kunci yang sama untuk enkripsi dan dekripsi. Cepat, tetapi memerlukan cara aman untuk berbagi kunci. Enkripsi asimetris (seperti RSA) menggunakan sepasang kunci berbeda: public key untuk enkripsi, private key untuk dekripsi. Lebih lambat, tetapi memecahkan masalah distribusi kunci."
    },
    {
      category: "Kunci",
      q: "Bagaimana cara mendapatkan public key dari penerima?",
      a: "Ada beberapa cara untuk mendapatkan public key: (1) Penerima mengirimkan file .pem atau teks public key, (2) Scan QR code yang berisi public key, (3) Download dari server yang aman, (4) Menggunakan key server/directory publik. Pastikan public key yang Anda dapatkan benar-benar dari sumber yang tepat untuk menghindari serangan man-in-the-middle."
    },
    {
      category: "Teknis",
      q: "Apa itu authentication tag dalam AES-GCM?",
      a: "Authentication tag (atau auth tag) adalah hash nilai kriptografis yang dihasilkan oleh mode GCM. Tag ini berguna untuk memverifikasi integritas dan keaslian data yang sudah dienkripsi. Jika ada yang mengubah bahkan satu bit dari ciphertext atau associated data, tag akan berubah drastis dan dekripsi akan gagal. Tag biasanya berukuran 16 bytes (128 bits)."
    },
    {
      category: "Enkripsi",
      q: "Apa bedanya enkripsi file dan enkripsi komunikasi?",
      a: "Enkripsi file melindungi data yang disimpan di storage (at-rest). Enkripsi komunikasi melindungi data saat dikirim melalui jaringan (in-transit). Aplikasi ini fokus pada enkripsi file yang akan dikirim, menggabungkan kedua konsep tersebut. File dienkripsi sebelum dikirim, dan penerima harus memiliki private key untuk mendekripsinya."
    },
    {
      category: "Keamanan",
      q: "Bagaimana cara memastikan tidak ada yang mengubah file yang terenkripsi?",
      a: "Sistem ini menggunakan AES-GCM yang secara otomatis memverifikasi integritas data melalui authentication tag. Ketika file didekripsi, sistem akan memvalidasi tag. Jika ada perubahan kecil pun pada ciphertext, validasi akan gagal dan sistem menolak dekripsi. Selain itu, pastikan Anda mendownload file dari sumber yang aman dan terpercaya."
    },
    {
      category: "Konsep",
      q: "Apa itu key stretching dan apakah digunakan di sini?",
      a: "Key stretching adalah teknik untuk membuat kunci yang lemah menjadi lebih kuat dengan mengaplikasikan fungsi hash berkali-kali atau menggunakan parameter yang berat. Aplikasi ini menggunakan RSA 2048-bit yang sudah cukup kuat, dan AES-256 dengan kunci random yang tidak perlu stretching. Untuk password-based key, implementasi production sebaiknya menggunakan PBKDF2 atau Argon2."
    },
    {
      category: "Teknis",
      q: "Berapa ukuran maksimal file yang bisa dienkripsi?",
      a: "Secara teori, tidak ada batas maksimal untuk AES-GCM. Namun, dalam praktik, keterbatasan tergantung pada: (1) RAM yang tersedia, (2) Waktu yang bersedia Anda tunggu, (3) Batasan aplikasi/browser. File sangat besar (>1GB) mungkin perlu processing yang berbeda seperti streaming encryption. Benchmark tool dapat membantu Anda menguji dengan ukuran yang sesuai kebutuhan."
    },
    {
      category: "Risiko",
      q: "Apa yang harus saya lakukan jika seorang pengirim menggunakan public key lama saya?",
      a: "Jika Anda sudah mengganti key pair dan pengirim masih menggunakan public key lama (yang sudah tidak aman), paket tersebut tidak bisa didekripsi dengan private key baru Anda. Anda harus meminta pengirim menggunakan public key terbaru. Sebaiknya komunikasikan dengan semua pengirim potensial ketika Anda mengganti key pair untuk menghindari kebingungan."
    },
    {
      category: "Info",
      q: "Apakah saya perlu install software khusus untuk menggunakan aplikasi ini?",
      a: "Tidak! Aplikasi ini adalah web-based, sehingga Anda hanya membutuhkan browser modern (Chrome, Firefox, Safari, Edge) dengan JavaScript diaktifkan. Tidak perlu install aplikasi atau plugin tambahan. Cukup akses melalui browser dan Anda langsung bisa mulai mengenkripsi/mendekripsi file dan menjalankan benchmark."
    }
  ];

  app.innerHTML = `
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-4xl md:text-5xl font-bold gradient-text mb-3">FAQ</h1>
          <p class="text-gray-400 text-lg">Pertanyaan yang sering diajukan tentang Encrypter.id</p>
          <div class="flex justify-center gap-3 mt-4 flex-wrap">
            <span class="faq-stat">
              <span class="text-green-neon font-bold">${faqs.length}</span> Pertanyaan
            </span>
          </div>
        </div>
        
        <!-- FAQ List -->
        <div class="faq-list">
          ${faqs.map((faq, index) => `
            <div class="faq-item" data-index="${index}">
              <div class="faq-header" onclick="toggleFaq(${index})">
                <div class="faq-header-left">
                  <span class="faq-number">${String(index + 1).padStart(2, '0')}</span>
                  <div class="faq-header-text">
                    <span class="faq-category">${faq.category}</span>
                    <h3 class="faq-question">${faq.q}</h3>
                  </div>
                </div>
                <div class="faq-toggle" id="faq-toggle-${index}">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v12M6 12h12"></path>
                  </svg>
                </div>
              </div>
              <div class="faq-content" id="faq-content-${index}">
                <div class="faq-answer">
                  <p>${faq.a}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Bottom CTA -->
        <div class="faq-cta">
          <div class="faq-cta-text">
            <h3>Masih ada pertanyaan?</h3>
            <p>Pelajari lebih lanjut di halaman <a href="#/tentang" class="text-green-neon hover:underline">Tentang</a></p>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      /* FAQ Stats */
      .faq-stat {
        padding: 8px 18px;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, rgba(0, 255, 136, 0.03) 100%);
        border: 1px solid rgba(0, 255, 136, 0.3);
        border-radius: 24px;
        font-size: 13px;
        font-weight: 500;
        color: #e5e7eb;
        backdrop-filter: blur(10px);
      }
      
      /* FAQ List */
      .faq-list {
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      
      /* FAQ Item */
      .faq-item {
        background: linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(15, 15, 15, 0.6) 100%);
        border: 1px solid rgba(0, 255, 136, 0.12);
        border-radius: 14px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(8px);
      }
      
      .faq-item:hover {
        border-color: rgba(0, 255, 136, 0.35);
        box-shadow: 0 8px 32px rgba(0, 255, 136, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.05);
        transform: translateY(-2px);
      }
      
      .faq-item.active {
        border-color: rgba(0, 255, 136, 0.5);
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, rgba(0, 255, 136, 0.02) 100%);
        box-shadow: 0 8px 32px rgba(0, 255, 136, 0.12);
      }
      
      /* FAQ Header */
      .faq-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 24px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      
      .faq-header:hover {
        background: rgba(0, 255, 136, 0.02);
      }
      
      .faq-header-left {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        flex: 1;
        min-width: 0;
      }
      
      .faq-number {
        font-size: 13px;
        font-weight: 700;
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.08) 100%);
        border: 1.5px solid rgba(0, 255, 136, 0.3);
        border-radius: 10px;
        color: #00ff88;
        font-family: 'JetBrains Mono', monospace;
        transition: all 0.3s ease;
      }

      .faq-item:hover .faq-number {
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.25) 0%, rgba(0, 255, 136, 0.15) 100%);
        border-color: rgba(0, 255, 136, 0.5);
      }

      .faq-item.active .faq-number {
        background: linear-gradient(135deg, #00ff88 0%, #00dd77 100%);
        color: #0a0a0a;
        border-color: #00ff88;
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
      }
      
      .faq-header-text {
        flex: 1;
        min-width: 0;
      }
      
      .faq-category {
        font-size: 11px;
        color: #00ff88;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 700;
        opacity: 0.9;
        display: inline-block;
        padding: 2px 8px;
        background: rgba(0, 255, 136, 0.08);
        border-radius: 4px;
      }
      
      .faq-question {
        font-size: 15px;
        font-weight: 600;
        color: #f0f0f0;
        margin-top: 6px;
        line-height: 1.5;
        word-break: break-word;
      }
      
      @media (min-width: 768px) {
        .faq-question {
          font-size: 16px;
        }
        .faq-header {
          padding: 20px 28px;
        }
      }
      
      /* Toggle Button */
      .faq-toggle {
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.12) 0%, rgba(0, 255, 136, 0.06) 100%);
        border: 1.5px solid rgba(0, 255, 136, 0.25);
        border-radius: 10px;
        color: #00ff88;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        flex-shrink: 0;
        margin-left: 12px;
        cursor: pointer;
      }

      .faq-toggle:hover {
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.2) 0%, rgba(0, 255, 136, 0.1) 100%);
        border-color: rgba(0, 255, 136, 0.4);
      }
      
      .faq-toggle.active {
        background: linear-gradient(135deg, #00ff88 0%, #00dd77 100%);
        color: #0a0a0a;
        border-color: #00ff88;
        box-shadow: 0 4px 12px rgba(0, 255, 136, 0.3);
        transform: rotate(45deg);
      }
      
      /* FAQ Content */
      .faq-content {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
      }
      
      .faq-content.active {
        max-height: 600px;
      }
      
      .faq-answer {
        padding: 0 28px 24px 72px;
      }
      
      @media (max-width: 768px) {
        .faq-answer {
          padding: 0 20px 20px 20px;
        }
      }
      
      .faq-answer p {
        color: #d5d5d5;
        font-size: 14px;
        line-height: 1.8;
        letter-spacing: 0.3px;
      }
      
      /* CTA Box */
      .faq-cta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 40px;
        padding: 28px 32px;
        background: linear-gradient(135deg, rgba(0, 255, 136, 0.12) 0%, rgba(0, 255, 136, 0.04) 100%);
        border: 1.5px solid rgba(0, 255, 136, 0.3);
        border-radius: 16px;
        text-align: center;
        backdrop-filter: blur(10px);
      }
      
      .faq-cta-text h3 {
        font-size: 18px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 6px;
        letter-spacing: 0.5px;
      }
      
      .faq-cta-text p {
        font-size: 14px;
        color: #b0b0b0;
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .faq-list {
          gap: 12px;
        }
        .faq-item {
          border-radius: 12px;
        }
      }
    </style>
  `;

  // Toggle FAQ function
  window.toggleFaq = (index) => {
    const content = document.getElementById(`faq-content-${index}`);
    const toggle = document.getElementById(`faq-toggle-${index}`);
    const item = document.querySelector(`.faq-item[data-index="${index}"]`);

    // Close all other FAQs
    document.querySelectorAll('.faq-content').forEach((el, i) => {
      if (i !== index) {
        el.classList.remove('active');
        document.getElementById(`faq-toggle-${i}`)?.classList.remove('active');
        document.querySelector(`.faq-item[data-index="${i}"]`)?.classList.remove('active');
      }
    });

    // Toggle current FAQ
    content.classList.toggle('active');
    toggle.classList.toggle('active');
    item.classList.toggle('active');
  };
}

// Export
window.renderFaqPage = renderFaqPage;
