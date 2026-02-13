// Routes configuration
const routes = {
    '/': 'upload',
    '/upload': 'upload',
    '/kelola-kunci': 'kelola-kunci',
    '/benchmark': 'benchmark',
    '/simulasi-serangan': 'simulasi-serangan',
    '/tentang': 'tentang',
    '/faq': 'faq'
};

let currentRoute = '/';

/**
 * Navigate to a route
 */
function navigate(path) {
    window.location.hash = path;
}

/**
 * Get current route
 */
function getCurrentRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return routes[hash] || 'upload';
}

/**
 * Render page based on route
 */
function renderPage() {
    const page = getCurrentRoute();
    const appContainer = document.getElementById('app');

    // Clear current content
    appContainer.innerHTML = '';

    // Render page
    switch (page) {
        case 'upload':
            renderUploadPage();
            break;
        case 'kelola-kunci':
            renderKelolaKunciPage();
            break;
        case 'benchmark':
            renderBenchmarkPage();
            break;
        case 'simulasi-serangan':
            renderSimulasiSeranganPage();
            break;
        case 'tentang':
            renderTentangPage();
            break;
        case 'faq':
            renderFaqPage();
            break;
        default:
            renderUploadPage();
    }

    // Update active nav
    updateActiveNav(page);

    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Update active navigation item
 */
function updateActiveNav(page) {
    const navLinks = document.querySelectorAll('[data-route]');
    navLinks.forEach(link => {
        const route = link.getAttribute('data-route');
        if (route === page) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize router
 */
function initRouter() {
    // Handle hash change
    window.addEventListener('hashchange', renderPage);

    // Initial render
    renderPage();
}

// Export
window.navigate = navigate;
window.initRouter = initRouter;
