/**
 * Format ukuran file dari bytes ke KB/MB/GB
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Format durasi dari ms ke detik/menit
 */
function formatDuration(ms) {
    if (ms < 1000) {
        return `${ms}ms`;
    } else if (ms < 60000) {
        return `${(ms / 1000).toFixed(2)}s`;
    } else {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return `${minutes}m ${seconds}s`;
    }
}

/**
 * Format CPU percentage
 */
function formatCPU(cpu) {
    return `${cpu.toFixed(2)}%`;
}

/**
 * Format RAM dari bytes ke MB
 */
function formatRAM(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Format timestamp ke tanggal lokal
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Format angka besar dengan separator
 */
function formatNumber(num) {
    return num.toLocaleString('id-ID');
}

// Export
window.formatter = {
    fileSize: formatFileSize,
    duration: formatDuration,
    cpu: formatCPU,
    ram: formatRAM,
    timestamp: formatTimestamp,
    number: formatNumber
};
