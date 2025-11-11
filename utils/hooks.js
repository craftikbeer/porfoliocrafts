/**
 * Custom React Hooks
 * Reusable hooks for common functionality
 */

/**
 * Hook for scroll-based visibility
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - Whether scroll is past threshold
 */
const useScrollVisibility = (threshold) => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};

/**
 * Hook for escape key handler
 * @param {Function} callback - Function to call on escape
 */
const useEscapeKey = (callback) => {
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') callback();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback]);
};

/**
 * Hook for body scroll lock
 * @param {boolean} isLocked - Whether to lock scroll
 */
const useBodyScrollLock = (isLocked) => {
  React.useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]);
};

// Export hooks
window.useScrollVisibility = useScrollVisibility;
window.useEscapeKey = useEscapeKey;
window.useBodyScrollLock = useBodyScrollLock;