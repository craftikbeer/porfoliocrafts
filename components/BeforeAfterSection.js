const BeforeAfterSection = React.memo(function BeforeAfterSection() {
  try {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [progress, setProgress] = React.useState(50);
    const [isDragging, setIsDragging] = React.useState(false);

    const transformations = window.transformationsData || [];

    const handleTimelineChange = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setProgress(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    React.useEffect(() => {
      const handleGlobalMouseUp = () => setIsDragging(false);
      const handleGlobalMouseMove = (e) => {
        if (isDragging) {
          const timeline = document.querySelector('[data-timeline]');
          if (timeline) {
            const rect = timeline.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setProgress(percentage);
          }
        }
      };

      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('mousemove', handleGlobalMouseMove);
      
      return () => {
        window.removeEventListener('mouseup', handleGlobalMouseUp);
        window.removeEventListener('mousemove', handleGlobalMouseMove);
      };
    }, [isDragging]);

    return (
      <SectionTransition delay={200}>
        <section
          className="py-12 md:py-16 lg:py-20 px-4 md:px-8"
          data-name="before-after"
          data-file="components/BeforeAfterSection.js"
        >
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3">
              {t('beforeAfterTitle')}
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl">
              {t('transformDesc')}
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {transformations.map((item, index) => (
              <div key={index} className="relative">
                <div className="relative bg-black overflow-hidden mb-4" style={{ height: 'min(60vh, 600px)' }}>
                  <img
                    src={item.before}
                    alt="Before"
                    loading="lazy"
                    className="project-image absolute inset-0 grayscale"
                    style={{ opacity: 1 - progress / 100 }}
                  />
                  <img
                    src={item.after}
                    alt="After"
                    loading="lazy"
                    className="project-image absolute inset-0"
                    style={{ opacity: progress / 100 }}
                  />
                  
                  <div 
                    className="absolute top-6 left-6 px-4 py-2 bg-black border border-white transition-opacity"
                    style={{ opacity: 1 - progress / 100 }}
                  >
                    <span className="text-xs font-bold tracking-widest">
                      {t('beforeLabel')}
                    </span>
                  </div>
                  
                  <div 
                    className="absolute top-6 right-6 px-4 py-2 bg-[var(--accent)] transition-opacity"
                    style={{ opacity: progress / 100 }}
                  >
                    <span className="text-xs font-bold tracking-widest">
                      {t('afterLabel')}
                    </span>
                  </div>

                  <div className="absolute top-6 left-1/2 -translate-x-1/2">
                    <div className="text-6xl md:text-8xl font-black text-white opacity-20">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>

                <div 
                  data-timeline
                  className="relative h-2 bg-white bg-opacity-10 cursor-pointer group mb-4"
                  onClick={handleTimelineChange}
                  onMouseDown={handleMouseDown}
                >
                  <div 
                    className="absolute left-0 top-0 h-full bg-[var(--accent)] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[var(--accent)] cursor-grab active:cursor-grabbing group-hover:scale-125 transition-transform"
                    style={{ left: `calc(${progress}% - 12px)` }}
                  />
                  
                  <div className="absolute -top-6 left-0 text-xs font-mono text-gray-500">
                    0%
                  </div>
                  <div className="absolute -top-6 right-0 text-xs font-mono text-gray-500">
                    100%
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {index < transformations.length - 1 && (
                  <div className="section-divider mt-8 md:mt-12" />
                )}
              </div>
            ))}
          </div>
        </div>
        </section>
      </SectionTransition>
    );
  } catch (error) {
    console.error('BeforeAfterSection error:', error);
    return null;
  }
});