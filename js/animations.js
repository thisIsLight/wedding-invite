/**
 * Scroll Animation System
 * Handles viewport-triggered animations using Intersection Observer
 */

class ScrollAnimations {
  constructor(config = {}) {
    this.config = {
      threshold: config.threshold || 0.15,
      rootMargin: config.rootMargin || '0px',
      animationDelay: config.animationDelay || 100,
      animationDuration: config.animationDuration || 1000,
      ...config
    };
    
    this.observer = null;
    this.animatedElements = new Set();
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize the animation system
   */
  init() {
    // If user prefers reduced motion, skip animations
    if (this.prefersReducedMotion) {
      this.disableAnimations();
      return;
    }

    // Create Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin
      }
    );

    // Observe all elements with animation classes
    this.observeElements();
    
    // Listen for animation end events to clean up
    document.addEventListener('animationend', (e) => this.handleAnimationEnd(e));
  }

  /**
   * Find and observe all elements that should be animated
   */
  observeElements() {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in-up, .animate-fade-in, [data-animate]'
    );
    
    animatedElements.forEach(element => {
      // Skip hero section elements (they animate on load)
      if (element.closest('.hero-section')) {
        return;
      }
      
      this.observer.observe(element);
    });
  }

  /**
   * Handle intersection observer callback
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
        this.triggerAnimation(entry.target);
        this.animatedElements.add(entry.target);
        
        // Optionally unobserve after animation triggers
        // this.observer.unobserve(entry.target);
      }
    });
  }

  /**
   * Trigger animation on an element
   */
  triggerAnimation(element) {
    // Add visible class to trigger animation
    if (element.classList.contains('animate-fade-in-up')) {
      element.classList.add('visible');
    }
    
    // Handle custom data-animate attributes
    const animationType = element.getAttribute('data-animate');
    if (animationType) {
      element.classList.add(`animate-${animationType}`);
      element.classList.add('visible');
    }
  }

  /**
   * Handle animation end event for cleanup
   */
  handleAnimationEnd(event) {
    const element = event.target;
    
    // Remove animation classes after animation completes
    // Keep the 'visible' class to maintain final state
    if (element.classList.contains('animate-fade-in-up')) {
      // Animation is complete, element stays visible
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      // Remove the animation class to prevent re-triggering
      // but keep 'visible' class for state tracking
      element.classList.remove('animate-fade-in-up');
      element.classList.add('animation-complete');
    }
    
    if (element.classList.contains('animate-fade-in')) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      
      element.classList.remove('animate-fade-in');
      element.classList.add('animation-complete');
    }
    
    // Handle custom data-animate attributes
    const animationType = element.getAttribute('data-animate');
    if (animationType) {
      element.classList.remove(`animate-${animationType}`);
      element.classList.add('animation-complete');
    }
  }

  /**
   * Disable animations for users who prefer reduced motion
   */
  disableAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in-up, .animate-fade-in, [data-animate]'
    );
    
    animatedElements.forEach(element => {
      // Make elements immediately visible
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add('visible');
    });
  }

  /**
   * Apply staggered delays to a group of elements
   */
  applyStaggeredDelays(elements, baseDelay = 0) {
    elements.forEach((element, index) => {
      const delay = baseDelay + (index * this.config.animationDelay);
      element.style.animationDelay = `${delay}ms`;
    });
  }

  /**
   * Destroy the animation system
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    document.removeEventListener('animationend', this.handleAnimationEnd);
  }
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

function initAnimations() {
  const scrollAnimations = new ScrollAnimations({
    threshold: 0.15,
    animationDelay: 100
  });
  
  scrollAnimations.init();
  
  // Apply staggered delays to service cards
  const serviceCards = document.querySelectorAll('.services-section .service-card');
  if (serviceCards.length > 0) {
    scrollAnimations.applyStaggeredDelays(serviceCards);
  }
  
  // Apply staggered delays to portfolio items
  const portfolioItems = document.querySelectorAll('.portfolio-section .portfolio-item');
  if (portfolioItems.length > 0) {
    scrollAnimations.applyStaggeredDelays(portfolioItems);
  }
  
  // Make instance available globally for testing
  window.scrollAnimations = scrollAnimations;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ScrollAnimations };
}
