/**
 * Lazy Loading Controller for EMO Lab Website
 * Handles image lazy loading and performance optimization
 */

class LazyLoadingController {
  constructor() {
    this.imageObserver = null;
    this.init();
  }

  /**
   * Initialize lazy loading
   */
  init() {
    this.setupImageLazyLoading();
    this.setupContentLazyLoading();
    this.optimizeImages();
  }

  /**
   * Setup image lazy loading with Intersection Observer
   */
  setupImageLazyLoading() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      this.loadAllImages();
      return;
    }

    const imageObserverOptions = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      });
    }, imageObserverOptions);

    // Observe all lazy images
    this.observeLazyImages();
  }

  /**
   * Observe all lazy images
   */
  observeLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.imageObserver.observe(img);
    });
  }

  /**
   * Load a single image
   */
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      img.classList.remove('lazy');
      
      // Add fade-in animation
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease-in-out';
      
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    };

    imageLoader.onerror = () => {
      img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=';
      img.classList.add('error');
    };

    imageLoader.src = src;
  }

  /**
   * Load all images immediately (fallback for older browsers)
   */
  loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.loadImage(img);
    });
  }

  /**
   * Setup content lazy loading
   */
  setupContentLazyLoading() {
    const contentObserverOptions = {
      root: null,
      rootMargin: '100px 0px',
      threshold: 0.1
    };

    const contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('lazy-loaded');
          contentObserver.unobserve(entry.target);
        }
      });
    }, contentObserverOptions);

    // Observe lazy content sections
    const lazySections = document.querySelectorAll('.lazy-section');
    lazySections.forEach(section => {
      contentObserver.observe(section);
    });
  }

  /**
   * Optimize images by adding loading attributes and placeholders
   */
  optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading attribute for native lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }

      // Add decoding attribute for better performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      // Add placeholder for images without src
      if (!img.src && !img.dataset.src) {
        this.addImagePlaceholder(img);
      }
    });
  }

  /**
   * Add placeholder for images
   */
  addImagePlaceholder(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
      <div class="placeholder-content">
        <div class="placeholder-spinner"></div>
        <span class="placeholder-text">載入中...</span>
      </div>
    `;
    
    img.parentNode.insertBefore(placeholder, img);
    img.style.display = 'none';
    
    // Show image when loaded
    img.onload = () => {
      placeholder.style.display = 'none';
      img.style.display = 'block';
    };
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages() {
    const criticalImages = [
      'images/team/team-photo.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  /**
   * Optimize image sizes based on viewport
   */
  optimizeImageSizes() {
    const images = document.querySelectorAll('img[data-src]');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const viewportWidth = window.innerWidth;

    images.forEach(img => {
      const src = img.dataset.src;
      if (!src) return;

      // Determine appropriate image size
      let optimizedSrc = src;
      
      if (viewportWidth < 768) {
        // Mobile: use smaller images
        optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/, '_mobile.$1');
      } else if (viewportWidth < 1200) {
        // Tablet: use medium images
        optimizedSrc = src.replace(/\.(jpg|jpeg|png)$/, '_tablet.$1');
      }
      // Desktop: use original images

      img.dataset.src = optimizedSrc;
    });
  }

  /**
   * Add blur-to-sharp effect for images
   */
  addBlurToSharpEffect() {
    const images = document.querySelectorAll('img[data-src]');
    
    images.forEach(img => {
      // Add blur filter initially
      img.style.filter = 'blur(5px)';
      img.style.transition = 'filter 0.3s ease-in-out';
      
      img.onload = () => {
        // Remove blur when loaded
        img.style.filter = 'blur(0px)';
      };
    });
  }

  /**
   * Destroy observers
   */
  destroy() {
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
  }
}

// Create global instance
window.lazyLoadingController = new LazyLoadingController();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.lazyLoadingController.preloadCriticalImages();
  window.lazyLoadingController.optimizeImageSizes();
  window.lazyLoadingController.addBlurToSharpEffect();
});
