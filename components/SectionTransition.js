const SectionTransition = React.memo(function SectionTransition({ children, delay = 0 }) {
  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  React.useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [delay, isMobile]);

  return (
    <div
      ref={sectionRef}
      className={`${isMobile ? '' : 'section-transition'} ${isVisible ? 'visible' : ''}`}
      data-name="section-transition"
      data-file="components/SectionTransition.js"
    >
      {children}
    </div>
  );
});
