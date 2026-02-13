// Auto-detect API URL based on environment
const API_BASE_URL = (() => {
    if (typeof window !== 'undefined' && window.location) {
        // If we're on localhost, try port 3001 for local dev, otherwise use origin
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:3001/api';
        }
        // For production, use relative path or full origin
        return `${window.location.origin}/api`;
    }
    return 'http://localhost:3001/api';
})();

/**
 * Wrapper untuk fetch API dengan error handling
 */
async function apiCall(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Terjadi kesalahan pada server');
        }

        return data;
    } catch (error) {
        console.error('Kesalahan API:', error);
        throw error;
    }
}

/**
 * Upload file dengan FormData
 */
async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/enkripsi/upload`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Gagal upload file');
    }

    return data;
}

/**
 * Download file
 */
function downloadFile(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Export API functions
window.api = {
    call: apiCall,
    uploadFile,
    downloadFile,

    // Kunci
    generateKeys: () => apiCall('/kunci/generate', { method: 'POST' }),
    saveKeys: (data) => apiCall('/kunci/simpan', { method: 'POST', body: JSON.stringify(data) }),
    listKeys: () => apiCall('/kunci/daftar'),

    // Enkripsi
    encryptFile: (data) => apiCall('/enkripsi/proses', { method: 'POST', body: JSON.stringify(data) }),
    sendPackage: (packageId) => apiCall('/enkripsi/kirim', { method: 'POST', body: JSON.stringify({ packageId }) }),

    // Dekripsi
    getInbox: () => apiCall('/dekripsi/kotak-masuk'),
    decryptPackage: (data) => apiCall('/dekripsi/proses', { method: 'POST', body: JSON.stringify(data) }),
    decryptFile: (packageId, privateKey) => apiCall('/dekripsi/proses', { method: 'POST', body: JSON.stringify({ packageId, privateKey }) }),
    deleteInboxPackage: (packageId) => apiCall(`/dekripsi/kotak-masuk/${packageId}`, { method: 'DELETE' }),
    clearInbox: () => apiCall('/dekripsi/kotak-masuk', { method: 'DELETE' }),

    // Benchmark
    runBenchmark: (fileSizes) => apiCall('/benchmark/jalankan', { method: 'POST', body: JSON.stringify({ fileSizes }) }),
    getBenchmarkResults: () => apiCall('/benchmark/hasil')
};
