/**
 * Initialize navbar with improved click handling
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  navbar.innerHTML = `
    <div class="container mx-auto px-4 py-3 md:py-4">
      <div class="flex items-center justify-between">
        <!-- Logo - Clickable untuk kembali ke beranda -->
        <a href="#/upload" class="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity" style="pointer-events: auto;">
          <div class="w-10 h-10 bg-gradient-to-br from-green-glow to-green-neon rounded-lg flex items-center justify-center shadow-lg shadow-green-neon/20">
            <svg class="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <div>
            <h1 class="text-lg md:text-xl font-bold gradient-text nav-brand">Encrypter.id</h1>
            <p class="text-xs text-gray-400 hidden sm:block">Hybrid Cryptography</p>
          </div>
        </a>
        
        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center space-x-1">
          <a href="#/upload" data-route="upload" class="nav-link">Unggah File</a>
          <a href="#/kelola-kunci" data-route="kelola-kunci" class="nav-link">Kelola Kunci</a>
          <a href="#/benchmark" data-route="benchmark" class="nav-link">Benchmark</a>
          <a href="#/simulasi-serangan" data-route="simulasi-serangan" class="nav-link">Simulasi</a>
          <a href="#/tentang" data-route="tentang" class="nav-link">Tentang</a>
          <a href="#/faq" data-route="faq" class="nav-link">FAQ</a>
        </nav>
        
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="lg:hidden text-green-neon p-3 rounded-lg hover:bg-green-neon/10 transition-colors cursor-pointer" style="pointer-events: auto; min-width: 48px; min-height: 48px;">
          <svg id="menu-icon-open" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg id="menu-icon-close" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Drawer -->
      <div id="mobile-menu" class="hidden lg:hidden mt-4 pb-4 border-t border-green-neon/20 pt-4">
        <div class="flex flex-col space-y-1">
          <a href="#/upload" data-route="upload" class="nav-link-mobile">
            <span class="mr-3">📤</span>Unggah File
          </a>
          <a href="#/kelola-kunci" data-route="kelola-kunci" class="nav-link-mobile">
            <span class="mr-3">🔑</span>Kelola Kunci
          </a>
          <a href="#/benchmark" data-route="benchmark" class="nav-link-mobile">
            <span class="mr-3">📊</span>Benchmark
          </a>
          <a href="#/simulasi-serangan" data-route="simulasi-serangan" class="nav-link-mobile">
            <span class="mr-3">⚔️</span>Simulasi Serangan
          </a>
          <a href="#/tentang" data-route="tentang" class="nav-link-mobile">
            <span class="mr-3">ℹ️</span>Tentang
          </a>
          <a href="#/faq" data-route="faq" class="nav-link-mobile">
            <span class="mr-3">❓</span>FAQ
          </a>
        </div>
      </div>
    </div>
  `;

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    #navbar {
      position: relative;
      z-index: 100;
      pointer-events: auto;
      background: rgba(10, 10, 10, 0.95);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 255, 136, 0.1);
    }
    
    .nav-link {
      color: #9ca3af;
      transition: all 0.3s ease;
      font-weight: 500;
      font-size: 14px;
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      pointer-events: auto;
      display: inline-block;
      text-decoration: none;
    }
    
    .nav-link:hover {
      color: var(--color-green-neon);
      background: rgba(0, 255, 136, 0.1);
    }
    
    .nav-link.active {
      color: var(--color-green-neon);
      background: rgba(0, 255, 136, 0.15);
    }
    
    .nav-link-mobile {
      color: #9ca3af;
      padding: 14px 16px;
      border-radius: 10px;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      pointer-events: auto;
      text-decoration: none;
    }
    
    .nav-link-mobile:hover,
    .nav-link-mobile.active {
      color: var(--color-green-neon);
      background: rgba(0, 255, 136, 0.1);
    }
    
    .nav-link-mobile:active {
      background: rgba(0, 255, 136, 0.2);
      transform: scale(0.98);
    }
    
    #mobile-menu {
      animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Mobile menu toggle with animation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  });

  // Update active state based on current route
  updateNavActiveState();
}

/**
 * Update navbar active state
 */
function updateNavActiveState() {
  const currentHash = window.location.hash.slice(2) || 'upload';
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

  navLinks.forEach(link => {
    const route = link.getAttribute('data-route');
    if (route === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Listen for route changes
window.addEventListener('hashchange', updateNavActiveState);

// Export
window.initNavbar = initNavbar;
window.updateNavActiveState = updateNavActiveState;
