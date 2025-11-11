const ScrollProgress = React.memo(function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-[60]"
      data-name="scroll-progress"
      data-file="components/ScrollProgress.js"
    >
      <div 
        className="h-full bg-[var(--accent)] transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});