/**
 * Performance Monitor for EMO Lab Website
 * Tracks and reports performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    this.trackPageLoad();
    this.trackCoreWebVitals();
    this.trackResourceTiming();
    this.trackUserInteractions();
  }

  /**
   * Track page load performance
   */
  trackPageLoad() {
    window.addEventListener('load', () => {
      // Navigation Timing API
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.metrics.pageLoad = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart,
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        request: navigation.responseEnd - navigation.requestStart,
        response: navigation.responseEnd - navigation.responseStart,
        domProcessing: navigation.domComplete - navigation.domLoading
      };

      console.log('Page Load Metrics:', this.metrics.pageLoad);
    });
  }

  /**
   * Track Core Web Vitals
   */
  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = {
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown',
          url: lastEntry.url || 'unknown'
        };

        console.log('LCP:', this.metrics.lcp);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = {
            value: entry.processingStart - entry.startTime,
            eventType: entry.name,
            startTime: entry.startTime,
            processingStart: entry.processingStart
          };

          console.log('FID:', this.metrics.fid);
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.metrics.cls = {
          value: clsValue,
          entries: entries.length
        };

        console.log('CLS:', this.metrics.cls);
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  /**
   * Track resource timing
   */
  trackResourceTiming() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      
      this.metrics.resources = {
        total: resources.length,
        images: resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)).length,
        scripts: resources.filter(r => r.name.match(/\.js$/i)).length,
        stylesheets: resources.filter(r => r.name.match(/\.css$/i)).length,
        fonts: resources.filter(r => r.name.match(/\.(woff|woff2|ttf|eot)$/i)).length,
        xhr: resources.filter(r => r.name.includes('api') || r.name.includes('data')).length
      };

      // Calculate average load times
      this.metrics.resources.averageLoadTime = resources.reduce((sum, r) => sum + r.duration, 0) / resources.length;
      this.metrics.resources.slowestResource = resources.reduce((slowest, r) => r.duration > slowest.duration ? r : slowest, resources[0]);

      console.log('Resource Metrics:', this.metrics.resources);
    });
  }

  /**
   * Track user interactions
   */
  trackUserInteractions() {
    let interactionCount = 0;
    const startTime = Date.now();

    ['click', 'keydown', 'scroll', 'touchstart'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionCount++;
        
        this.metrics.userInteractions = {
          count: interactionCount,
          timeToFirstInteraction: Date.now() - startTime,
          lastEvent: eventType
        };
      }, { passive: true });
    });
  }

  /**
   * Get performance score
   */
  getPerformanceScore() {
    const scores = {
      lcp: this.getLCPScore(this.metrics.lcp?.value),
      fid: this.getFIDScore(this.metrics.fid?.value),
      cls: this.getCLSScore(this.metrics.cls?.value)
    };

    const overallScore = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;

    return {
      overall: Math.round(overallScore),
      breakdown: scores,
      grade: this.getGrade(overallScore)
    };
  }

  /**
   * Get LCP score
   */
  getLCPScore(lcp) {
    if (!lcp) return 0;
    if (lcp <= 2500) return 100;
    if (lcp <= 4000) return 75;
    return 50;
  }

  /**
   * Get FID score
   */
  getFIDScore(fid) {
    if (!fid) return 0;
    if (fid <= 100) return 100;
    if (fid <= 300) return 75;
    return 50;
  }

  /**
   * Get CLS score
   */
  getCLSScore(cls) {
    if (!cls) return 0;
    if (cls <= 0.1) return 100;
    if (cls <= 0.25) return 75;
    return 50;
  }

  /**
   * Get grade based on score
   */
  getGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  /**
   * Generate performance report
   */
  generateReport() {
    const score = this.getPerformanceScore();
    
    return {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: navigator.connection?.effectiveType || 'unknown',
      score: score,
      metrics: this.metrics,
      recommendations: this.getRecommendations()
    };
  }

  /**
   * Get performance recommendations
   */
  getRecommendations() {
    const recommendations = [];

    // LCP recommendations
    if (this.metrics.lcp?.value > 4000) {
      recommendations.push({
        metric: 'LCP',
        issue: 'Largest Contentful Paint is too slow',
        suggestion: 'Optimize images, use WebP format, implement lazy loading'
      });
    }

    // FID recommendations
    if (this.metrics.fid?.value > 300) {
      recommendations.push({
        metric: 'FID',
        issue: 'First Input Delay is too high',
        suggestion: 'Reduce JavaScript execution time, use code splitting'
      });
    }

    // CLS recommendations
    if (this.metrics.cls?.value > 0.25) {
      recommendations.push({
        metric: 'CLS',
        issue: 'Cumulative Layout Shift is too high',
        suggestion: 'Add size attributes to images, avoid dynamic content insertion'
      });
    }

    // Resource recommendations
    if (this.metrics.resources?.averageLoadTime > 1000) {
      recommendations.push({
        metric: 'Resources',
        issue: 'Average resource load time is too slow',
        suggestion: 'Enable compression, use CDN, optimize images'
      });
    }

    return recommendations;
  }

  /**
   * Send performance data to analytics
   */
  sendToAnalytics() {
    const report = this.generateReport();
    
    // Send to Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: report.url,
        value: report.score.overall,
        custom_map: {
          lcp: report.metrics.lcp?.value,
          fid: report.metrics.fid?.value,
          cls: report.metrics.cls?.value
        }
      });
    }

    // Send to custom analytics endpoint
    if (window.EMO_ANALYTICS_ENDPOINT) {
      fetch(window.EMO_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      }).catch(error => {
        console.warn('Failed to send performance data:', error);
      });
    }

    console.log('Performance Report:', report);
  }

  /**
   * Export metrics for debugging
   */
  exportMetrics() {
    const dataStr = JSON.stringify(this.metrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `performance-metrics-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
}

// Create global instance
window.performanceMonitor = new PerformanceMonitor();

// Send data after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    window.performanceMonitor.sendToAnalytics();
  }, 2000);
});

// Export for debugging
window.exportPerformanceMetrics = () => {
  window.performanceMonitor.exportMetrics();
};
