/**
 * Main Application Entry Point
 * Coordinates all components and handles global functionality
 */

// Performance optimization examples using debounce and throttle utilities
// These utilities are available from utils.js

/**
 * Example: Debounced window resize handler
 * Useful for expensive operations that should only run after resizing stops
 */
if (typeof debounce !== 'undefined') {
  const handleResize = debounce(() => {
    // Expensive resize operations here
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
  }, 250);
  
  // Uncomment to enable resize logging
  // window.addEventListener('resize', handleResize);
}

/**
 * Example: Throttled scroll handler
 * Useful for operations that should run periodically during scroll
 */
if (typeof throttle !== 'undefined') {
  const handleScroll = throttle(() => {
    // Scroll-based operations here
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    // console.log('Scroll progress:', scrollPercent.toFixed(2) + '%');
  }, 100);
  
  // Uncomment to enable scroll logging
  // window.addEventListener('scroll', handleScroll);
}

/**
 * Audio Management
 */
let backgroundAudio = null;
let audioInitialized = false;

/**
 * Initialize background audio
 */
function initBackgroundAudio() {
  if (audioInitialized) return;
  
  try {
    backgroundAudio = new Audio('assets/audio/home-page-audio.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.3; // Set to 30% volume for pleasant background music
    
    // Preload the audio
    backgroundAudio.preload = 'auto';
    
    audioInitialized = true;
    console.log('Background audio initialized');
  } catch (error) {
    console.warn('Failed to initialize background audio:', error);
  }
}

/**
 * Play background audio
 */
function playBackgroundAudio() {
  if (!backgroundAudio || !audioInitialized) {
    initBackgroundAudio();
  }
  
  if (backgroundAudio) {
    backgroundAudio.play().then(() => {
      console.log('Background audio started playing');
    }).catch(error => {
      console.warn('Could not play background audio:', error);
    });
  }
}

/**
 * Pause background audio
 */
function pauseBackgroundAudio() {
  if (backgroundAudio && !backgroundAudio.paused) {
    backgroundAudio.pause();
    console.log('Background audio paused');
  }
}

/**
 * Set up automatic audio playback when page loads
 */
function setupAutoplayAudio() {
  // Initialize and play audio immediately when page loads
  initBackgroundAudio();
  
  // Try to play audio after a short delay to ensure page is ready
  setTimeout(() => {
    playBackgroundAudio();
  }, 1000);
  
  // Handle page visibility changes (pause when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseBackgroundAudio();
    } else if (audioInitialized && backgroundAudio) {
      playBackgroundAudio();
    }
  });
  
  // Handle user interaction to ensure audio can play (fallback for browsers that block autoplay)
  const enableAudioOnInteraction = () => {
    if (backgroundAudio && backgroundAudio.paused) {
      playBackgroundAudio();
    }
    // Remove listeners after first interaction
    document.removeEventListener('click', enableAudioOnInteraction);
    document.removeEventListener('touchstart', enableAudioOnInteraction);
  };
  
  document.addEventListener('click', enableAudioOnInteraction);
  document.addEventListener('touchstart', enableAudioOnInteraction);
}

/**
 * Initialize application
 */
function initApp() {
  console.log('Wedding website initialized');
  
  // Check if all components are loaded
  const componentsLoaded = {
    navigation: typeof Navigation !== 'undefined',
    animations: typeof ScrollAnimations !== 'undefined',
    utils: typeof debounce !== 'undefined' && typeof throttle !== 'undefined'
  };
  
  console.log('Components loaded:', componentsLoaded);
  
  // Initialize automatic audio playback immediately
  setupAutoplayAudio();
  
  // Performance monitoring
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log('Performance Metrics:');
      console.log('- Page Load Time:', pageLoadTime + 'ms');
      console.log('- Server Response Time:', connectTime + 'ms');
      console.log('- DOM Render Time:', renderTime + 'ms');
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/**
 * Tab Functionality for Itinerary Section
 */
function initItineraryTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  if (tabButtons.length === 0 || tabPanels.length === 0) {
    console.warn('Tab elements not found');
    return;
  }
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Remove active class from all buttons and panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      button.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
    
    // Keyboard accessibility
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}

/**
 * Accordion Functionality
 */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        accordionItem.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
    
    // Keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

// Initialize accordion when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initItineraryTabs();
  });
} else {
  initAccordion();
  initItineraryTabs();
}

/**
 * Scroll Indicator Management (Mobile Only)
 */
function initScrollIndicator() {
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  if (!scrollIndicator) {
    return;
  }
  
  let hasScrolled = false;
  
  // Hide indicator when user scrolls
  const handleScroll = () => {
    if (!hasScrolled && window.pageYOffset > 50) {
      hasScrolled = true;
      scrollIndicator.classList.add('hidden');
      
      // Remove scroll listener after first scroll
      window.removeEventListener('scroll', handleScroll);
    }
  };
  
  // Only show on mobile devices
  const checkMobile = () => {
    const isMobile = window.innerWidth <= 767;
    if (isMobile && !hasScrolled) {
      scrollIndicator.style.display = 'block';
      window.addEventListener('scroll', handleScroll);
    } else {
      scrollIndicator.style.display = 'none';
      window.removeEventListener('scroll', handleScroll);
    }
  };
  
  // Check on load and resize
  checkMobile();
  window.addEventListener('resize', checkMobile);
  
  // Hide indicator on any touch interaction (mobile)
  document.addEventListener('touchstart', () => {
    if (!hasScrolled) {
      setTimeout(handleScroll, 100);
    }
  }, { once: true });
}

// Initialize scroll indicator when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollIndicator);
} else {
  initScrollIndicator();
}