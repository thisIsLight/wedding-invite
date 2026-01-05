/**
 * Main Application Entry Point
 * Coordinates all components and handles global functionality
 */

// Performance optimization examples using debounce and throttle utilities
// These utilities are available from utils.js

/**
 * Welcome Popup Management
 */
function initWelcomePopup() {
  const popupOverlay = document.getElementById('popup-overlay');
  const enterButton = document.getElementById('popup-enter');
  
  if (!popupOverlay || !enterButton) {
    console.warn('Popup elements not found');
    return;
  }
  
  // Show popup on page load
  popupOverlay.style.display = 'flex';
  
  // Handle enter button click
  enterButton.addEventListener('click', () => {
    // Add fade out animation
    popupOverlay.style.transition = 'opacity 0.5s ease-out';
    popupOverlay.style.opacity = '0';
    
    // Remove popup after animation
    setTimeout(() => {
      popupOverlay.style.display = 'none';
      // Start background audio after popup is closed
      playBackgroundAudio();
    }, 500);
  });
  
  // Handle escape key to close popup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
      enterButton.click();
    }
  });
  
  // Add hover effect to button
  enterButton.addEventListener('mouseenter', () => {
    enterButton.style.transform = 'translateY(-2px)';
    enterButton.style.boxShadow = '0 4px 12px rgba(60, 68, 53, 0.3)';
  });
  
  enterButton.addEventListener('mouseleave', () => {
    enterButton.style.transform = 'translateY(0)';
    enterButton.style.boxShadow = 'none';
  });
}

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
 * Set up automatic audio playback when hero image loads
 */
function setupAutoplayAudio() {
  // Initialize audio first
  initBackgroundAudio();
  
  // Don't auto-play until popup is closed - this will be called from popup close handler
  
  // Handle page visibility changes (pause when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseBackgroundAudio();
    } else if (audioInitialized && backgroundAudio) {
      // Only resume if popup is not visible
      const popup = document.getElementById('popup-overlay');
      if (!popup || popup.style.display === 'none') {
        playBackgroundAudio();
      }
    }
  });
}

/**
 * Initialize application
 */
function initApp() {
  console.log('Wedding website initialized');
  
  // Initialize welcome popup first
  initWelcomePopup();
  
  // Check if all components are loaded
  const componentsLoaded = {
    navigation: typeof Navigation !== 'undefined',
    animations: typeof ScrollAnimations !== 'undefined',
    utils: typeof debounce !== 'undefined' && typeof throttle !== 'undefined'
  };
  
  console.log('Components loaded:', componentsLoaded);
  
  // Initialize automatic audio playback (but don't start until popup is closed)
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
