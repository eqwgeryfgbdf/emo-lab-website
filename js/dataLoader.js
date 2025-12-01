/**
 * Data Loader for EMO Lab Website
 * Handles loading and processing of JSON data
 */

class DataLoader {
  constructor() {
    this.siteData = null;
    this.achievementsData = null;
    this.isLoading = false;
    this.basePath = '';
  }

  /**
   * Load site data from JSON file
   */
  async loadSiteData() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const response = await fetch(`${this.basePath}data/site-data.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.siteData = await response.json();
      return this.siteData;
    } catch (error) {
      console.error('Error loading site data:', error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Load achievements data from JSON file
   */
  async loadAchievementsData() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    try {
      const response = await fetch(`${this.basePath}data/achievements.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.achievementsData = await response.json();
      return this.achievementsData;
    } catch (error) {
      console.error('Error loading achievements data:', error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Get lab information
   */
  getLabInfo() {
    return this.siteData?.lab || null;
  }

  /**
   * Get team members
   */
  getTeamMembers() {
    return this.siteData?.lab?.team || [];
  }

  /**
   * Get latest news
   */
  getLatestNews(limit = 5) {
    const news = this.siteData?.lab?.news || [];
    return news.slice(0, limit);
  }

  /**
   * Get all news
   */
  getAllNews() {
    return this.siteData?.lab?.news || [];
  }

  /**
   * Get mission text
   */
  getMission() {
    return this.siteData?.lab?.mission || '';
  }

  /**
   * Get contact information
   */
  getContactInfo() {
    return this.siteData?.lab?.contact || {};
  }

  /**
   * Get partners by category
   */
  getPartners(category = 'all') {
    const partners = this.siteData?.lab?.partners || {};
    
    switch (category) {
      case 'universities':
        return partners.universities || [];
      case 'schools':
        return partners.schools || [];
      case 'companies':
        return partners.companies || [];
      case 'all':
      default:
        return {
          universities: partners.universities || [],
          schools: partners.schools || [],
          companies: partners.companies || []
        };
    }
  }

  /**
   * Get all achievements
   */
  getAllAchievements() {
    return this.achievementsData?.achievements || [];
  }

  /**
   * Get achievements by type
   */
  getAchievementsByType(type) {
    const achievements = this.getAllAchievements();
    
    if (type === 'all') {
      return achievements;
    }
    
    return achievements.filter(achievement => achievement.type === type);
  }

  /**
   * Get achievement statistics
   */
  getAchievementStatistics() {
    return this.achievementsData?.statistics || {};
  }

  /**
   * Get featured achievements (gold awards, best papers, etc.)
   */
  getFeaturedAchievements(limit = 6) {
    const achievements = this.getAllAchievements();
    
    // Filter for featured achievements (gold awards, best papers, top positions)
    const featured = achievements.filter(achievement => {
      const award = achievement.award.toLowerCase();
      return award.includes('金牌') || 
             award.includes('gold') || 
             award.includes('best') || 
             award.includes('第一名') || 
             award.includes('第二名') ||
             award.includes('亞軍') ||
             award.includes('鈦金');
    });
    
    return featured.slice(0, limit);
  }

  /**
   * Search achievements
   */
  searchAchievements(query) {
    const achievements = this.getAllAchievements();
    const searchTerm = query.toLowerCase();
    
    return achievements.filter(achievement => 
      achievement.title.toLowerCase().includes(searchTerm) ||
      achievement.name.toLowerCase().includes(searchTerm) ||
      achievement.award.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Get achievement type display name
   */
  getAchievementTypeDisplay(type) {
    const typeMap = {
      'competition': '競賽成果',
      'paper': '論文發表',
      'award': '獲獎記錄'
    };
    return typeMap[type] || type;
  }

  /**
   * Get achievement category color
   */
  getAchievementCategoryColor(type) {
    const colorMap = {
      'competition': '#667eea',
      'paper': '#28a745',
      'award': '#ffc107'
    };
    return colorMap[type] || '#6c757d';
  }

  /**
   * Check if data is loaded
   */
  isDataLoaded() {
    return this.siteData !== null;
  }

  /**
   * Check if all data is loaded
   */
  isAllDataLoaded() {
    return this.siteData !== null && this.achievementsData !== null;
  }

  /**
   * Initialize data loading with priority
   */
  async initialize() {
    try {
      // Load critical data first
      await this.loadSiteData();
      
      // Load achievements data in background
      this.loadAchievementsData().catch(error => {
        console.warn('Achievements data loading failed:', error);
      });
      
      return this.isDataLoaded();
    } catch (error) {
      console.error('Error initializing data loader:', error);
      return false;
    }
  }

  /**
   * Load data with retry mechanism
   */
  async loadWithRetry(loadFunction, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await loadFunction();
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
}

// Create global instance
window.dataLoader = new DataLoader();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.dataLoader.initialize();
});
