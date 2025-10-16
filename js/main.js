/**
 * Main JavaScript for EMO Lab Website
 * Handles navigation, data rendering, and user interactions
 */

class EMOWebsite {
  constructor() {
    this.dataLoader = window.dataLoader;
    this.animationController = window.animationController;
    this.currentPage = this.getCurrentPage();
    this.init();
  }

  /**
   * Initialize the website
   */
  async init() {
    // Wait for data to load
    await this.waitForData();
    
    // Initialize page-specific functionality
    this.initNavigation();
    this.initPageContent();
    this.initEventListeners();
    this.initAnimations();
  }

  /**
   * Wait for data to be loaded
   */
  async waitForData() {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max
    
    while (!this.dataLoader.isDataLoaded() && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!this.dataLoader.isDataLoaded()) {
      console.warn('Data loading timeout, continuing with limited functionality');
    }
  }

  /**
   * Get current page name
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
  }

  /**
   * Initialize navigation functionality
   */
  initNavigation() {
    const navToggle = document.getElementById('navigation-toggle');
    const navMenu = document.getElementById('navigation-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('navigation__menu--active');
        navToggle.classList.toggle('navigation__toggle--active');
      });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.navigation__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('navigation__menu--active')) {
          navMenu.classList.remove('navigation__menu--active');
          navToggle.classList.remove('navigation__toggle--active');
        }
      });
    });

    // Handle scroll effects on navigation
    this.handleNavigationScroll();
  }

  /**
   * Handle navigation scroll effects
   */
  handleNavigationScroll() {
    const navigation = document.getElementById('navigation');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navigation.classList.add('navigation--scrolled');
      } else {
        navigation.classList.remove('navigation--scrolled');
      }
      
      // Hide/show navigation on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navigation.style.transform = 'translateY(-100%)';
      } else {
        navigation.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  /**
   * Initialize page-specific content
   */
  initPageContent() {
    switch (this.currentPage) {
      case 'index':
        this.initHomePage();
        break;
      case 'about':
        this.initAboutPage();
        break;
      case 'team':
        this.initTeamPage();
        break;
      case 'achievements':
        this.initAchievementsPage();
        break;
      case 'partners':
        this.initPartnersPage();
        break;
      case 'contact':
        this.initContactPage();
        break;
    }
  }

  /**
   * Initialize home page content
   */
  initHomePage() {
    this.renderLatestNews();
    this.renderAboutPreview();
    this.renderAchievementHighlights();
  }

  /**
   * Render latest news section
   */
  renderLatestNews() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    const news = this.dataLoader.getLatestNews(3);
    
    newsGrid.innerHTML = news.map(item => `
      <div class="news__item scroll-animate">
        <div class="news__item-date">${this.dataLoader.formatDate(item.date)}</div>
        <h3 class="news__item-title">${item.title}</h3>
      </div>
    `).join('');
  }

  /**
   * Render about preview section
   */
  renderAboutPreview() {
    const aboutDescription = document.getElementById('about-description');
    if (!aboutDescription) return;

    const mission = this.dataLoader.getMission();
    const shortMission = mission.substring(0, 200) + '...';
    aboutDescription.textContent = shortMission;
  }

  /**
   * Render achievement highlights
   */
  renderAchievementHighlights() {
    const achievementsGrid = document.getElementById('achievements-grid');
    if (!achievementsGrid) return;

    const featuredAchievements = this.dataLoader.getFeaturedAchievements(4);
    
    achievementsGrid.innerHTML = featuredAchievements.map(achievement => `
      <div class="achievement-card scroll-animate">
        <div class="achievement-card__icon">🏆</div>
        <h3 class="achievement-card__title">${achievement.title}</h3>
        <p class="achievement-card__description">${achievement.award}</p>
      </div>
    `).join('');
  }

  /**
   * Initialize about page content
   */
  initAboutPage() {
    this.renderMission();
  }

  /**
   * Render mission section
   */
  renderMission() {
    const missionText = document.getElementById('mission-text');
    if (!missionText) return;

    const mission = this.dataLoader.getMission();
    missionText.innerHTML = `<p>${mission}</p>`;
  }

  /**
   * Initialize team page content
   */
  initTeamPage() {
    this.renderTeamMembers();
  }

  /**
   * Render team members
   */
  renderTeamMembers() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;

    const teamMembers = this.dataLoader.getTeamMembers();
    
    teamGrid.innerHTML = teamMembers.map(member => `
      <div class="team__member scroll-animate">
        <div class="team__member-image">
          <img src="${member.image || 'images/team/default-avatar.jpg'}" alt="${member.name}" class="team__member-img">
        </div>
        <div class="team__member-content">
          <h3 class="team__member-name">${member.name}</h3>
          <p class="team__member-role">${member.role}</p>
          <p class="team__member-description">${member.description}</p>
        </div>
      </div>
    `).join('');
  }

  /**
   * Initialize achievements page content
   */
  initAchievementsPage() {
    this.renderAchievements();
    this.initAchievementFilters();
    this.renderAchievementStatistics();
    this.initModal();
  }

  /**
   * Render achievements grid
   */
  renderAchievements(filter = 'all') {
    const achievementsGrid = document.getElementById('achievements-items');
    if (!achievementsGrid) return;

    const achievements = this.dataLoader.getAchievementsByType(filter);
    
    achievementsGrid.innerHTML = achievements.map(achievement => `
      <div class="achievement-item scroll-animate" data-type="${achievement.type}">
        <div class="achievement-item__image">
          <img src="${achievement.image}" alt="${achievement.title}" class="achievement-item__img">
        </div>
        <div class="achievement-item__content">
          <div class="achievement-item__category">${achievement.category}</div>
          <h3 class="achievement-item__title">${achievement.title}</h3>
          <p class="achievement-item__competition">${achievement.name}</p>
          <div class="achievement-item__award">${achievement.award}</div>
          <div class="achievement-item__date">${this.dataLoader.formatDate(achievement.date)}</div>
        </div>
      </div>
    `).join('');
  }

  /**
   * Initialize achievement filters
   */
  initAchievementFilters() {
    const filterButtons = document.querySelectorAll('.achievements-filter__button');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('achievements-filter__button--active'));
        button.classList.add('achievements-filter__button--active');
        
        // Filter achievements
        const filter = button.dataset.filter;
        this.renderAchievements(filter);
      });
    });
  }

  /**
   * Render achievement statistics
   */
  renderAchievementStatistics() {
    const stats = this.dataLoader.getAchievementStatistics();
    
    const totalCompetitions = document.getElementById('total-competitions');
    const totalPapers = document.getElementById('total-papers');
    const totalAwards = document.getElementById('total-awards');
    const goldAwards = document.getElementById('gold-awards');
    
    if (totalCompetitions) totalCompetitions.textContent = stats.totalCompetitions || 0;
    if (totalPapers) totalPapers.textContent = stats.totalPapers || 0;
    if (totalAwards) totalAwards.textContent = stats.totalAwards || 0;
    if (goldAwards) goldAwards.textContent = stats.goldAwards || 0;
  }

  /**
   * Initialize modal functionality
   */
  initModal() {
    this.animationController.setupModalAnimations();
  }

  /**
   * Initialize partners page content
   */
  initPartnersPage() {
    this.renderPartners();
  }

  /**
   * Render partners by category
   */
  renderPartners() {
    const partners = this.dataLoader.getPartners();
    
    // Render universities
    const universitiesGrid = document.getElementById('universities-grid');
    if (universitiesGrid) {
      universitiesGrid.innerHTML = partners.universities.map(uni => `
        <div class="partner-item scroll-animate">
          <h3 class="partner-item__name">${uni}</h3>
        </div>
      `).join('');
    }
    
    // Render schools
    const schoolsGrid = document.getElementById('schools-grid');
    if (schoolsGrid) {
      schoolsGrid.innerHTML = partners.schools.map(school => `
        <div class="partner-item scroll-animate">
          <h3 class="partner-item__name">${school}</h3>
        </div>
      `).join('');
    }
    
    // Render companies
    const companiesGrid = document.getElementById('companies-grid');
    if (companiesGrid) {
      companiesGrid.innerHTML = partners.companies.map(company => `
        <div class="partner-item scroll-animate">
          <h3 class="partner-item__name">${company}</h3>
        </div>
      `).join('');
    }
  }

  /**
   * Initialize contact page content
   */
  initContactPage() {
    this.initContactForm();
  }

  /**
   * Initialize contact form
   */
  initContactForm() {
    const form = document.getElementById('contact-form-element');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  /**
   * Handle form submission
   */
  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      this.showNotification('請填寫所有必填欄位', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.showNotification('請輸入有效的電子郵件地址', 'error');
      return;
    }
    
    // Simulate form submission
    this.showNotification('訊息已發送！我們會盡快回覆您。', 'success');
    form.reset();
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('notification--show');
    }, 100);
    
    setTimeout(() => {
      notification.classList.remove('notification--show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * Initialize animations
   */
  initAnimations() {
    // Setup scroll animations for new content
    this.animationController.observeScrollElements();
    
    // Setup smooth scrolling
    this.animationController.setupSmoothScrolling();
    
    // Setup parallax for hero section
    if (this.currentPage === 'index') {
      this.animationController.setupParallax();
    }
  }

  /**
   * Initialize event listeners
   */
  initEventListeners() {
    // Handle window resize
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
    
    // Handle scroll
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16));
  }

  /**
   * Handle window resize
   */
  handleResize() {
    // Recalculate animations if needed
    this.animationController.observeScrollElements();
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    // Additional scroll handling if needed
  }

  /**
   * Debounce function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   */
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.emoWebsite = new EMOWebsite();
});

// Add CSS for notifications
const notificationStyles = `
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 10000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.notification--show {
  transform: translateX(0);
}

.notification--success {
  background: #28a745;
}

.notification--error {
  background: #dc3545;
}

.notification--info {
  background: #17a2b8;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
