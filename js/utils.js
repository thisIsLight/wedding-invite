/**
 * Utility Functions for Performance Optimization
 */

/**
 * Debounce function - delays execution until after wait time has elapsed since last call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute on leading edge instead of trailing
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 250, immediate = false) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function - ensures function is called at most once per specified time period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit = 250) {
  let inThrottle;
  let lastFunc;
  let lastRan;
  
  return function executedFunction(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      lastRan = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, Math.max(limit - (Date.now() - lastRan), 0));
    }
  };
}

/**
 * Detect viewport width
 * @returns {number} Current viewport width
 */
function getViewportWidth() {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

/**
 * Detect viewport height
 * @returns {number} Current viewport height
 */
function getViewportHeight() {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Percentage of element that must be visible (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = getViewportHeight();
  const windowWidth = getViewportWidth();
  
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  if (threshold > 0) {
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;
    
    return vertInView && horInView && (visibleArea / totalArea) >= threshold;
  }
  
  return vertInView && horInView;
}

/**
 * Request animation frame with fallback
 * @param {Function} callback - Function to execute
 * @returns {number} Request ID
 */
const requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * Cancel animation frame with fallback
 * @param {number} id - Request ID to cancel
 */
const cancelAnimFrame = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function(id) {
      clearTimeout(id);
    };
})();

/**
 * Smooth scroll polyfill for older browsers
 * Provides smooth scrolling behavior when native support is unavailable
 * @param {HTMLElement|number} target - Element to scroll to or Y position
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} callback - Optional callback after scroll completes
 */
function smoothScrollTo(target, duration = 1000, callback) {
  // Check if native smooth scroll is supported
  const supportsNativeSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  
  // Get target position
  let targetPosition;
  if (typeof target === 'number') {
    targetPosition = target;
  } else if (target instanceof HTMLElement) {
    targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  } else {
    console.error('Invalid target for smooth scroll');
    return;
  }
  
  // Use native smooth scroll if available
  if (supportsNativeSmoothScroll) {
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    if (callback) {
      // Estimate when scroll will complete
      setTimeout(callback, duration);
    }
    return;
  }
  
  // Polyfill for browsers without smooth scroll support
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();
  
  // Easing function (ease-in-out)
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  function animation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    
    window.scrollTo(0, startPosition + distance * ease);
    
    if (progress < 1) {
      requestAnimFrame(animation);
    } else if (callback) {
      callback();
    }
  }
  
  requestAnimFrame(animation);
}

/**
 * Get element's distance from top of document
 * @param {HTMLElement} element - Element to measure
 * @returns {number} Distance in pixels
 */
function getElementOffsetTop(element) {
  if (!element) return 0;
  
  let offsetTop = 0;
  let currentElement = element;
  
  while (currentElement) {
    offsetTop += currentElement.offsetTop;
    currentElement = currentElement.offsetParent;
  }
  
  return offsetTop;
}

/**
 * Check if element is fully visible in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is fully visible
 */
function isFullyVisible(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = getViewportHeight();
  const windowWidth = getViewportWidth();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= windowHeight &&
    rect.right <= windowWidth
  );
}

/**
 * Get percentage of element visible in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {number} Percentage visible (0-1)
 */
function getVisibilityPercentage(element) {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = getViewportHeight();
  const windowWidth = getViewportWidth();
  
  // Calculate visible dimensions
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
  
  // Return 0 if not in viewport at all
  if (visibleHeight <= 0 || visibleWidth <= 0) return 0;
  
  // Calculate percentage
  const visibleArea = visibleHeight * visibleWidth;
  const totalArea = rect.height * rect.width;
  
  return totalArea > 0 ? visibleArea / totalArea : 0;
}

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    throttle,
    getViewportWidth,
    getViewportHeight,
    isInViewport,
    isFullyVisible,
    getVisibilityPercentage,
    getElementOffsetTop,
    smoothScrollTo,
    requestAnimFrame,
    cancelAnimFrame
  };
}
