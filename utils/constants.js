/**
 * Application Constants
 * Centralized configuration for magic numbers and repeated values
 */

// Scroll thresholds
const SCROLL_THRESHOLDS = {
  HEADER_SCROLL: 100,
  BACK_TO_TOP: 500,
  TELEGRAM_CTA: 300
};

// Animation delays and durations
const ANIMATION = {
  THROTTLE_DELAY: 100,
  MOUSE_THROTTLE: 50,
  PAUSE_TIMEOUT: 3000,
  SMOOTH_DURATION: 500
};

// Interactive grid settings
const GRID_SETTINGS = {
  SIZE: 50,
  INFLUENCE_RADIUS: 150,
  THROTTLE_DELAY: 100
};

// Magnifying glass settings
const MAGNIFY_SETTINGS = {
  LENS_SIZE: 200,
  CARD_ROTATION_INTERVAL: 2000
};

// Error messages
const ERROR_MESSAGES = {
  COMPONENT_ERROR: 'Component error:',
  LOAD_ERROR: 'Failed to load data'
};

// Export all constants
window.APP_CONSTANTS = {
  SCROLL_THRESHOLDS,
  ANIMATION,
  GRID_SETTINGS,
  MAGNIFY_SETTINGS,
  ERROR_MESSAGES
};