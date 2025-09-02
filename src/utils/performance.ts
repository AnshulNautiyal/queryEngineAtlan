export class PerformanceTracker {
  private static instance: PerformanceTracker;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker();
    }
    return PerformanceTracker.instance;
  }

  startTimer(label: string): void {
    this.metrics.set(`${label}_start`, performance.now());
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(`${label}_start`);
    if (!startTime) {
      console.warn(`Timer ${label} was not started`);
      return 0;
    }
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    this.metrics.set(label, duration);
    this.metrics.delete(`${label}_start`);
    
    return duration;
  }

  getMetric(label: string): number | undefined {
    return this.metrics.get(label);
  }

  getAllMetrics(): Record<string, number> {
    const result: Record<string, number> = {};
    this.metrics.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  measurePageLoad(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.metrics.set('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
          this.metrics.set('loadComplete', navigation.loadEventEnd - navigation.loadEventStart);
          this.metrics.set('firstPaint', performance.getEntriesByType('paint')[0]?.startTime || 0);
        }
      });
    }
  }

  logMetrics(): void {
    console.log('Performance Metrics:', this.getAllMetrics());
  }
}

export const performanceTracker = PerformanceTracker.getInstance();
