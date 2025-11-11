const VideoHero = React.memo(function VideoHero() {
  try {
    const { t } = useLanguage();

    return (
      <section
        className="relative h-[60vh] md:h-[80vh] lg:h-[90vh] w-full overflow-hidden"
        data-name="video-hero"
        data-file="components/VideoHero.js"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
        
        <InteractiveGrid />
        
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1635002962298-ece22abce179?w=1920&q=80"
            alt="Neural networks"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 h-full flex items-center justify-center px-4 md:px-8">
          <div className="text-center">
            <h1 
              data-magnify
              className="text-[clamp(2.5rem,10vw,18rem)] font-black leading-[0.85] mb-3 md:mb-8 cursor-none"
            >
              {t('heroTitle1')}<br />{t('heroTitle2')}<br />{t('heroTitle3')}
            </h1>
            <p className="text-sm md:text-xl lg:text-2xl tracking-wide max-w-2xl mx-auto opacity-80 px-6">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
          <div className="icon-arrow-down text-2xl md:text-3xl animate-bounce opacity-50" />
        </div>
      </section>
    );
  } catch (error) {
    console.error('VideoHero error:', error);
    return null;
  }
});
