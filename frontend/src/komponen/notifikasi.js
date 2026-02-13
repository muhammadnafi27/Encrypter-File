/**
 * Show toast notification - POSITIONED TOP LEFT
 */
function showToast(message, type = 'success', duration = 4000) {
  const container = document.getElementById('toast-container');

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icon = getToastIcon(type);

  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon">
        ${icon}
      </div>
      <div class="toast-message">
        <p>${message}</p>
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  // Auto remove with progress bar
  const progressBar = toast.querySelector('.toast-progress');
  progressBar.style.animationDuration = `${duration}ms`;

  setTimeout(() => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Get icon based on type
 */
function getToastIcon(type) {
  switch (type) {
    case 'success':
      return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`;
    case 'error':
      return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`;
    case 'warning':
      return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>`;
    case 'info':
      return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>`;
    default:
      return '';
  }
}

// Add toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  /* Toast Container - TOP LEFT */
  #toast-container {
    position: fixed;
    top: 80px;
    left: 16px;
    z-index: 9999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 380px;
    width: calc(100% - 32px);
  }
  
  @media (min-width: 640px) {
    #toast-container {
      top: 90px;
      left: 24px;
      width: auto;
      min-width: 320px;
    }
  }
  
  /* Toast Base */
  .toast {
    pointer-events: auto;
    background: rgba(18, 18, 18, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    transform: translateX(-120%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .toast.toast-show {
    transform: translateX(0);
    opacity: 1;
  }
  
  .toast.toast-hide {
    transform: translateX(-120%);
    opacity: 0;
  }
  
  .toast-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
  }
  
  .toast-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .toast-message {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
  }
  
  .toast-close {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
    background: transparent;
    border: none;
    color: #6b7280;
    transition: all 0.2s;
  }
  
  .toast-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  /* Progress bar */
  .toast-progress {
    height: 3px;
    background: currentColor;
    opacity: 0.3;
    animation: progress-shrink linear forwards;
  }
  
  @keyframes progress-shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  /* Toast Types */
  .toast-success {
    border-left: 4px solid #00ff88;
    color: #00ff88;
  }
  
  .toast-success .toast-message {
    color: #d1fae5;
  }
  
  .toast-error {
    border-left: 4px solid #ef4444;
    color: #ef4444;
  }
  
  .toast-error .toast-message {
    color: #fecaca;
  }
  
  .toast-warning {
    border-left: 4px solid #f59e0b;
    color: #f59e0b;
  }
  
  .toast-warning .toast-message {
    color: #fde68a;
  }
  
  .toast-info {
    border-left: 4px solid #3b82f6;
    color: #3b82f6;
  }
  
  .toast-info .toast-message {
    color: #bfdbfe;
  }
`;
document.head.appendChild(toastStyles);

// Export
window.showToast = showToast;
