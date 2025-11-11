function useHorizontalScroll() {
  const [currentSection, setCurrentSection] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const totalSections = 5;
  const isScrollingRef = React.useRef(false);

  React.useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;
      
      const delta = e.deltaY;
      
      if (Math.abs(delta) > 5) {
        isScrollingRef.current = true;
        
        if (delta > 0 && currentSection < totalSections - 1) {
          setCurrentSection(prev => prev + 1);
        } else if (delta < 0 && currentSection > 0) {
          setCurrentSection(prev => prev - 1);
        }
        
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 600);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, totalSections]);

  React.useEffect(() => {
    const progress = (currentSection / (totalSections - 1)) * 100;
    setScrollProgress(progress);
  }, [currentSection, totalSections]);

  return { currentSection, scrollProgress };
}
