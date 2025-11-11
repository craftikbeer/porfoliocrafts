const BackToTop = React.memo(function BackToTop() {
  const { SCROLL_THRESHOLDS } = window.APP_CONSTANTS;
  const isVisible = useScrollVisibility(SCROLL_THRESHOLDS.BACK_TO_TOP);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white text-black border-2 border-black flex items-center justify-center hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 group"
      aria-label="Back to top"
      data-name="back-to-top"
      data-file="components/BackToTop.js"
    >
      <div className="icon-arrow-up text-xl group-hover:animate-bounce" />
    </button>
  );
});