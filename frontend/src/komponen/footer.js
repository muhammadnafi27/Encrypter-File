/**
 * Initialize footer - Minimalist & Aesthetic
 */
function initFooter() {
  // Create footer element if it doesn't exist
  let footer = document.getElementById('footer');

  if (!footer) {
    footer = document.createElement('footer');
    footer.id = 'footer';
    document.body.appendChild(footer);
  }

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-glow"></div>
      <div class="footer-content">
        <div class="footer-main">
          <p class="footer-copyright">
            © <span class="text-green-neon">Encrypter</span> 2025 — Keamanan Komputer
          </p>
          <p class="footer-subtitle">
            Hybrid Cryptography: <span class="text-green-neon/80">AES</span> + <span class="text-green-neon/80">RSA</span>
          </p>
        </div>
      </div>
    </div>
  `;

  // Add footer styles
  const footerStyles = document.createElement('style');
  footerStyles.id = 'footer-styles';

  // Remove existing if present
  const existing = document.getElementById('footer-styles');
  if (existing) existing.remove();

  footerStyles.textContent = `
    /* Sticky Footer Layout */
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    #app {
      flex: 1;
    }
    
    /* Footer Styling - Minimalist & Aesthetic */
    #footer {
      position: relative;
      z-index: 10;
      margin-top: auto;
      pointer-events: auto;
    }
    
    .footer-container {
      position: relative;
      overflow: hidden;
      background: linear-gradient(180deg, 
        rgba(10, 10, 10, 0.95) 0%, 
        rgba(10, 15, 12, 0.98) 50%,
        rgba(8, 12, 10, 1) 100%
      );
    }
    
    /* Subtle top glow line */
    .footer-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(0, 255, 136, 0.3) 20%,
        rgba(0, 255, 136, 0.5) 50%,
        rgba(0, 255, 136, 0.3) 80%,
        transparent 100%
      );
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.15);
    }
    
    .footer-content {
      padding: 24px 16px;
    }
    
    @media (min-width: 768px) {
      .footer-content {
        padding: 28px 32px;
      }
    }
    
    .footer-main {
      text-align: center;
    }
    
    .footer-copyright {
      font-size: 14px;
      color: rgba(156, 163, 175, 0.9);
      font-weight: 500;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    
    .footer-subtitle {
      font-size: 12px;
      color: rgba(107, 114, 128, 0.7);
      font-weight: 400;
      letter-spacing: 0.3px;
    }
    
    .footer-copyright .text-green-neon {
      color: #00ff88;
      font-weight: 600;
    }
    
    .footer-subtitle .text-green-neon\\/80 {
      color: rgba(0, 255, 136, 0.7);
    }
  `;
  document.head.appendChild(footerStyles);
}

// Export
window.initFooter = initFooter;
