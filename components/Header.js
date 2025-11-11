function Header({ scrollProgress = 0 }) {
  try {
    const { language, t, toggleLanguage } = useLanguage();
    const scrolled = scrollProgress > 5;

    return (
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-card py-4' : 'bg-transparent py-6'
        }`}
        data-name="header" 
        data-file="components/Header.js"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center">
              <div className="icon-cpu text-xl text-black"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">NEUROCRAFTS</span>
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <a href="#services" className="text-sm font-medium tracking-wide hover:text-white transition-colors">{t('servicesNav')}</a>
            <a href="#portfolio" className="text-sm font-medium tracking-wide hover:text-white transition-colors">{t('portfolioNav')}</a>
            <a href="#about" className="text-sm font-medium tracking-wide hover:text-white transition-colors">{t('aboutNav')}</a>
            <button 
              onClick={toggleLanguage}
              className="glass-card px-4 py-2 text-xs font-bold tracking-wider uppercase text-white hover:bg-white hover:bg-opacity-10 transition-all"
            >
              {language === 'en' ? 'RU' : 'EN'}
            </button>
            <button className="neuro-button px-6 py-2 text-xs">
              {t('startProject')}
            </button>
          </nav>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}