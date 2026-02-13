const pidusage = require('pidusage');

class PerformanceMonitor {
    constructor() {
        this.pid = process.pid;
        this.startTime = null;
        this.samples = [];
        this.interval = null;
    }

    /**
     * Mulai monitoring CPU dan RAM
     */
    start() {
        this.startTime = Date.now();
        this.samples = [];

        // Sampling setiap 200ms
        this.interval = setInterval(async () => {
            try {
                const stats = await pidusage(this.pid);
                this.samples.push({
                    cpu: stats.cpu,
                    memory: stats.memory,
                    timestamp: Date.now()
                });
            } catch (error) {
                console.error('Error sampling stats:', error);
            }
        }, 200);
    }

    /**
     * Stop monitoring dan return statistik
     * @returns {Object} { duration, avgCPU, peakCPU, avgRAM, peakRAM }
     */
    async stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        // Ambil sample terakhir
        try {
            const finalStats = await pidusage(this.pid);
            this.samples.push({
                cpu: finalStats.cpu,
                memory: finalStats.memory,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error('Error getting final stats:', error);
        }

        const duration = Date.now() - this.startTime;

        if (this.samples.length === 0) {
            return {
                duration,
                avgCPU: 0,
                peakCPU: 0,
                avgRAM: 0,
                peakRAM: 0
            };
        }

        // Hitung statistik
        const cpuValues = this.samples.map(s => s.cpu);
        const memoryValues = this.samples.map(s => s.memory);

        const avgCPU = cpuValues.reduce((a, b) => a + b, 0) / cpuValues.length;
        const peakCPU = Math.max(...cpuValues);
        const avgRAM = memoryValues.reduce((a, b) => a + b, 0) / memoryValues.length;
        const peakRAM = Math.max(...memoryValues);

        return {
            duration,
            avgCPU: parseFloat(avgCPU.toFixed(2)),
            peakCPU: parseFloat(peakCPU.toFixed(2)),
            avgRAM: Math.round(avgRAM),
            peakRAM: Math.round(peakRAM)
        };
    }
}

/**
 * Helper function untuk menjalankan fungsi dengan monitoring
 * @param {Function} fn - Async function yang akan dimonitor
 * @returns {Promise<Object>} { result, stats }
 */
async function monitorPerformance(fn) {
    const monitor = new PerformanceMonitor();
    monitor.start();

    try {
        const result = await fn();
        const stats = await monitor.stop();
        return { result, stats };
    } catch (error) {
        await monitor.stop();
        throw error;
    }
}

module.exports = {
    PerformanceMonitor,
    monitorPerformance
};
