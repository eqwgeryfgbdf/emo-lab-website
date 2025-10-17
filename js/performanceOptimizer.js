/**
 * Performance Optimizer for EMO Lab Website
 * Handles various performance optimizations
 */

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  /**
   * Initialize performance optimizations
   */
  init() {
    this.optimizeResourceLoading();
    this.setupServiceWorker();
    this.optimizeAnimations();
    this.setupPreloading();
    this.optimizeImages();
  }

  /**
   * Optimize resource loading
   */
  optimizeResourceLoading() {
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Defer non-critical CSS
    this.deferNonCriticalCSS();
    
    // Optimize JavaScript loading
    this.optimizeJavaScriptLoading();
  }

  /**
   * Preload critical resources
   */
  preloadCriticalResources() {
    const criticalResources = [
      { href: 'css/main.css', as: 'style' },
      { href: 'js/main.js', as: 'script' },
      { href: 'images/team/team-photo.jpg', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.as === 'style') {
        link.onload = () => {
          link.rel = 'stylesheet';
        };
      }
      
      document.head.appendChild(link);
    });
  }

  /**
   * Defer non-critical CSS
   */
  deferNonCriticalCSS() {
    const nonCriticalCSS = [
      'css/animations.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      
      // Load after page load
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          document.head.appendChild(link);
        });
      } else {
        document.head.appendChild(link);
      }
    });
  }

  /**
   * Optimize JavaScript loading
   */
  optimizeJavaScriptLoading() {
    // Load non-critical JavaScript after page load
    const nonCriticalJS = [
      'js/animations.js',
      'js/lazyLoading.js'
    ];

    nonCriticalJS.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          document.head.appendChild(script);
        });
      } else {
        document.head.appendChild(script);
      }
    });
  }

  /**
   * Setup service worker for caching
   */
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  /**
   * Optimize animations for better performance
   */
  optimizeAnimations() {
    // Use requestAnimationFrame for smooth animations
    this.optimizeScrollAnimations();
    this.optimizeHoverEffects();
  }

  /**
   * Optimize scroll animations
   */
  optimizeScrollAnimations() {
    let ticking = false;
    
    const updateScrollAnimations = () => {
      // Throttle scroll events
      if (!ticking) {
        requestAnimationFrame(() => {
          // Update scroll animations here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScrollAnimations, { passive: true });
  }

  /**
   * Optimize hover effects
   */
  optimizeHoverEffects() {
    // Use CSS transforms instead of changing layout properties
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale');
    
    hoverElements.forEach(element => {
      element.style.willChange = 'transform';
      
      element.addEventListener('mouseenter', () => {
        element.style.willChange = 'transform';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.willChange = 'auto';
      });
    });
  }

  /**
   * Setup preloading for next pages
   */
  setupPreloading() {
    // Preload next likely pages
    const nextPages = ['about.html', 'team.html'];
    
    nextPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize images
   */
  optimizeImages() {
    // Add responsive image attributes
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading attribute
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decoding attribute
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
      
      // Add fetchpriority for above-the-fold images
      if (img.closest('.hero')) {
        img.setAttribute('fetchpriority', 'high');
      }
    });
  }

  /**
   * Optimize fonts
   */
  optimizeFonts() {
    // Add font-display: swap to all font faces
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Noto Sans TC';
        font-display: swap;
      }
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup intersection observer for performance
   */
  setupIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger animations or load content
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe elements that need performance optimization
    const elementsToObserve = document.querySelectorAll('.lazy-section, .achievement-item, .news__item');
    elementsToObserve.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Optimize third-party resources
   */
  optimizeThirdPartyResources() {
    // Lazy load Google Fonts
    const fontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
    if (fontLink) {
      fontLink.media = 'print';
      fontLink.onload = () => {
        fontLink.media = 'all';
      };
    }
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  /**
   * Optimize for mobile
   */
  optimizeForMobile() {
    if (window.innerWidth < 768) {
      // Reduce animations on mobile
      document.body.classList.add('mobile-optimized');
      
      // Disable hover effects on touch devices
      if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
      }
    }
  }

  /**
   * Initialize all optimizations
   */
  initialize() {
    this.optimizeResourceLoading();
    this.optimizeAnimations();
    this.setupPreloading();
    this.optimizeImages();
    this.optimizeFonts();
    this.setupIntersectionObserver();
    this.optimizeThirdPartyResources();
    this.setupPerformanceMonitoring();
    this.optimizeForMobile();
  }
}

// Create global instance
window.performanceOptimizer = new PerformanceOptimizer();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.performanceOptimizer.initialize();
});
