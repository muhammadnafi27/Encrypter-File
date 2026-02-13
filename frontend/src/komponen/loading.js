/**
 * Show loading overlay
 */
function showLoading(text = 'Memproses...') {
    const overlay = document.getElementById('loading-overlay');
    const loadingText = document.getElementById('loading-text');

    loadingText.textContent = text;
    overlay.classList.remove('hidden');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    overlay.classList.add('hidden');
}

// Export
window.showLoading = showLoading;
window.hideLoading = hideLoading;
