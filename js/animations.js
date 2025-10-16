/**
 * Animation Controller for EMO Lab Website
 * Handles scroll animations, page transitions, and interactive effects
 */

class AnimationController {
  constructor() {
    this.scrollElements = [];
    this.observers = new Map();
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  /**
   * Initialize animation controller
   */
  init() {
    if (this.isReducedMotion) return;
    
    this.setupScrollAnimations();
    this.setupParticleEffect();
    this.setupHoverEffects();
    this.setupLoadingAnimations();
  }

  /**
   * Setup scroll-triggered animations
   */
  setupScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-animate--active');
        }
      });
    }, observerOptions);

    // Observe all scroll animation elements
    this.observeScrollElements();
  }

  /**
   * Observe elements for scroll animations
   */
  observeScrollElements() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
      this.scrollObserver.observe(element);
    });
  }

  /**
   * Add scroll animation to element
   */
  addScrollAnimation(element, animationType = 'fadeInUp') {
    element.classList.add('scroll-animate', `scroll-animate--${animationType}`);
    this.scrollObserver.observe(element);
  }

  /**
   * Setup particle effect for hero section
   */
  setupParticleEffect() {
    const heroParticles = document.getElementById('hero-particles');
    if (!heroParticles) return;

    // Create particles
    this.createParticles(heroParticles, 50);
  }

  /**
   * Create floating particles
   */
  createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 3;
      const animationDelay = Math.random() * 2;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${animationDuration}s;
        animation-delay: ${animationDelay}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      
      container.appendChild(particle);
    }
  }

  /**
   * Setup hover effects
   */
  setupHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.achievement-card, .news__item, .team__member');
    cards.forEach(card => {
      card.classList.add('hover-lift');
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.classList.add('hover-scale');
    });

    // Add hover effects to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.classList.add('hover-scale');
    });
  }

  /**
   * Setup loading animations
   */
  setupLoadingAnimations() {
    // Page load animation
    window.addEventListener('load', () => {
      document.body.classList.add('page-loaded');
    });

    // Stagger animation for grid items
    this.setupStaggerAnimation();
  }

  /**
   * Setup stagger animation for grid items
   */
  setupStaggerAnimation() {
    const staggerContainers = document.querySelectorAll('.news__grid, .achievements-highlights__grid, .team__grid');
    
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.news__item, .achievement-card, .team__member');
      items.forEach((item, index) => {
        item.classList.add('stagger-item');
        item.style.animationDelay = `${index * 0.1}s`;
      });
    });
  }

  /**
   * Animate counter numbers
   */
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current);
      
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      }
    }, 16);
  }

  /**
   * Animate statistics counters
   */
  animateStatistics() {
    const counters = document.querySelectorAll('.achievements-stats__number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent) || 0;
      if (target > 0) {
        counter.textContent = '0';
        this.animateCounter(counter, target);
      }
    });
  }

  /**
   * Setup text reveal animation
   */
  setupTextReveal() {
    const textElements = document.querySelectorAll('.hero__title, .hero__slogan');
    
    textElements.forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.05}s`;
        element.appendChild(span);
      }
      
      element.classList.add('text-reveal');
    });
  }

  /**
   * Setup typing animation
   */
  setupTypingAnimation(element, text, speed = 100) {
    element.textContent = '';
    element.classList.add('typing-animation');
    
    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text[i];
      i++;
      
      if (i >= text.length) {
        clearInterval(timer);
        element.classList.remove('typing-animation');
      }
    }, speed);
  }

  /**
   * Setup modal animations
   */
  setupModalAnimations() {
    const modal = document.getElementById('achievement-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    
    if (!modal) return;

    // Open modal
    const openModal = (content) => {
      const modalBody = document.getElementById('modal-body');
      if (modalBody) {
        modalBody.innerHTML = content;
      }
      modal.classList.add('modal-enter');
      modal.style.display = 'flex';
      
      setTimeout(() => {
        modal.classList.remove('modal-enter');
        modal.classList.add('modal-enter-active');
      }, 10);
    };

    // Close modal
    const closeModal = () => {
      modal.classList.remove('modal-enter-active');
      modal.classList.add('modal-exit-active');
      
      setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('modal-exit-active');
      }, 300);
    };

    // Event listeners
    if (modalOverlay) {
      modalOverlay.addEventListener('click', closeModal);
    }
    
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    // Expose functions globally
    window.openModal = openModal;
    window.closeModal = closeModal;
  }

  /**
   * Setup progress bar animation
   */
  setupProgressBar() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bar.classList.add('progress-bar--animate');
          }
        });
      });
      
      observer.observe(bar);
    });
  }

  /**
   * Setup parallax scrolling
   */
  setupParallax() {
    const parallaxElements = document.querySelectorAll('.hero__background, .hero__particles');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /**
   * Setup loading states
   */
  setupLoadingStates() {
    // Show loading spinner while data loads
    const loadingElements = document.querySelectorAll('[data-loading]');
    
    loadingElements.forEach(element => {
      element.innerHTML = '<div class="loading-spinner"></div>';
    });
  }

  /**
   * Remove loading states
   */
  removeLoadingStates() {
    const loadingElements = document.querySelectorAll('[data-loading]');
    
    loadingElements.forEach(element => {
      const spinner = element.querySelector('.loading-spinner');
      if (spinner) {
        spinner.remove();
      }
    });
  }

  /**
   * Setup intersection observer for specific elements
   */
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
  }

  /**
   * Destroy all observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }
}

// Create global instance
window.animationController = new AnimationController();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationController.init();
});
