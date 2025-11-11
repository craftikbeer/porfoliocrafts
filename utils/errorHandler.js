/**
 * Error Handler Utility
 * Centralized error handling and logging
 */

/**
 * Log component error
 * @param {string} componentName - Name of the component
 * @param {Error} error - Error object
 */
const logComponentError = (componentName, error) => {
  const { ERROR_MESSAGES } = window.APP_CONSTANTS;
  console.error(`${ERROR_MESSAGES.COMPONENT_ERROR} ${componentName}:`, error);
};

/**
 * Safe component wrapper
 * @param {Function} component - Component function
 * @param {string} componentName - Component name
 * @returns {Function} - Wrapped component
 */
const withErrorHandler = (component, componentName) => {
  return (...args) => {
    try {
      return component(...args);
    } catch (error) {
      logComponentError(componentName, error);
      return null;
    }
  };
};

// Export utilities
window.logComponentError = logComponentError;
window.withErrorHandler = withErrorHandler;