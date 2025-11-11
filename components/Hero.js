function Hero() {
  try {
    const { t } = useLanguage();
    
    return (
      <section className="relative w-full h-screen flex items-center mesh-gradient overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pt-32">
          <div className="max-w-5xl">
            <div className="inline-block px-4 py-2 glass-card mb-8">
              <span className="text-xs font-bold tracking-widest uppercase text-white">{t('tagline')}</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none">
              <span className="gradient-text">{t('heroTitle1')}</span>
              <br />
              <span className="text-white">{t('heroTitle2')}</span>
              <br />
              <span className="gradient-text">{t('heroTitle3')}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
              {t('heroDescription')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="neuro-button">
                {t('exploreWork')}
              </button>
              <button className="glass-card px-8 py-4 text-sm font-bold tracking-wider uppercase text-white hover:text-white">
                {t('getInTouch')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="icon-chevron-down text-2xl text-white opacity-50 animate-bounce"></div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}