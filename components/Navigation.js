const Navigation = React.memo(function Navigation() {
  try {
    const { SCROLL_THRESHOLDS } = window.APP_CONSTANTS;
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { language, t, toggleLanguage } = useLanguage();
    const activeSection = useScrollSpy(['work', 'contact']);
    const scrolled = useScrollVisibility(SCROLL_THRESHOLDS.HEADER_SCROLL);

    const handleNavClick = (e, sectionId) => {
      e.preventDefault();
      smoothScrollTo(sectionId);
      setMobileMenuOpen(false);
    };

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 transition-all duration-500 ${
          scrolled ? 'bg-black bg-opacity-80 backdrop-blur-sm' : ''
        }`}
        data-name="navigation"
        data-file="components/Navigation.js"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-xl md:text-2xl font-bold tracking-tighter">
              NEUROCRAFTS
            </div>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <div className={`icon-${mobileMenuOpen ? 'x' : 'menu'} text-2xl`} />
          </button>

          <div className="hidden md:flex gap-8 lg:gap-12 items-center text-sm font-medium">
            <a 
              href="#work" 
              onClick={(e) => handleNavClick(e, 'work')}
              className={`hover:text-[var(--accent)] transition-colors ${activeSection === 'work' ? 'text-[var(--accent)]' : ''}`}
            >
              {t('work')}
            </a>
            <a 
              href="blog.html"
              className="hover:text-[var(--accent)] transition-colors"
            >
              AI ПРОМТЫ
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact')}
              className={`hover:text-[var(--accent)] transition-colors ${activeSection === 'contact' ? 'text-[var(--accent)]' : ''}`}
            >
              {t('contact')}
            </a>
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-all font-bold"
            >
              {language === 'en' ? 'RU' : 'EN'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm">
            <div className="flex flex-col gap-6 p-6">
              <a 
                href="#work" 
                onClick={(e) => handleNavClick(e, 'work')}
                className={`text-2xl font-bold hover:text-[var(--accent)] transition-colors ${activeSection === 'work' ? 'text-[var(--accent)]' : ''}`}
              >
                {t('work')}
              </a>
              <a 
                href="blog.html"
                className="text-2xl font-bold hover:text-[var(--accent)] transition-colors"
              >
                BLOG
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className={`text-2xl font-bold hover:text-[var(--accent)] transition-colors ${activeSection === 'contact' ? 'text-[var(--accent)]' : ''}`}
              >
                {t('contact')}
              </a>
              <button
                onClick={toggleLanguage}
                className="w-full px-4 py-3 border border-white hover:bg-white hover:text-black transition-all font-bold text-left"
              >
                {language === 'en' ? 'РУССКИЙ' : 'ENGLISH'}
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  } catch (error) {
    console.error('Navigation error:', error);
    return null;
  }
});
