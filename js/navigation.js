/**
 * Navigation Component
 * Handles smooth scrolling, mobile menu toggle, and active link highlighting
 */

class Navigation {
  constructor(element) {
    this.nav = element;
    this.toggle = this.nav.querySelector('.nav-toggle');
    this.menu = this.nav.querySelector('.nav-menu');
    this.links = this.nav.querySelectorAll('.nav-link');
    this.isMenuOpen = false;
    this.scrollThreshold = 50;
    
    this.init();
  }

  init() {
    // Set up event listeners
    this.setupSmoothScroll();
    this.setupMobileMenu();
    this.setupScrollEffects();
    
    // Set initial active link
    this.updateActiveLink();
  }

  /**
   * Set up smooth scrolling for navigation links
   */
  setupSmoothScroll() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.smoothScrollTo(targetSection);
          
          // Close mobile menu if open
          if (this.isMenuOpen) {
            this.toggleMobileMenu();
          }
        }
      });
    });
  }

  /**
   * Smooth scroll to target element
   * @param {HTMLElement} target - Target element to scroll to
   */
  smoothScrollTo(target) {
    const navHeight = this.nav.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Set up mobile menu toggle functionality
   */
  setupMobileMenu() {
    if (!this.toggle) return;

    this.toggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.nav.contains(e.target)) {
        this.toggleMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.toggleMobileMenu();
      }
    });
  }

  /**
   * Toggle mobile menu open/closed
   */
  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Update ARIA attribute
    this.toggle.setAttribute('aria-expanded', this.isMenuOpen);
    
    // Toggle menu visibility
    this.menu.classList.toggle('open');
    
    // Lock/unlock body scroll
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  /**
   * Set up scroll effects (shadow on scroll, active section highlighting)
   */
  setupScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrollPosition = window.pageYOffset;
    
    // Add shadow to nav when scrolled
    if (scrollPosition > this.scrollThreshold) {
      this.nav.classList.add('scrolled');
    } else {
      this.nav.classList.remove('scrolled');
    }
    
    // Update active link
    this.updateActiveLink();
  }

  /**
   * Update active navigation link based on scroll position
   */
  updateActiveLink() {
    const scrollPosition = window.pageYOffset;
    const navHeight = this.nav.offsetHeight;
    
    // Find which section is currently in view
    let currentSection = null;
    
    this.links.forEach(link => {
      const targetId = link.getAttribute('href');
      const section = document.querySelector(targetId);
      
      if (section) {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = targetId;
        }
      }
    });
    
    // Update active class
    this.links.forEach(link => {
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}

function initNavigation() {
  const navElement = document.querySelector('.navigation');
  if (navElement) {
    window.navigationInstance = new Navigation(navElement);
  }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}
