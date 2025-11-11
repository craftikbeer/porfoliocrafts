function Footer() {
  try {
    const { t } = useLanguage();
    
    return (
      <footer className="w-full h-screen flex items-center bg-[var(--charcoal)] border-l border-gray-800 px-6" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white flex items-center justify-center">
                  <div className="icon-cpu text-xl text-black"></div>
                </div>
                <span className="text-2xl font-bold text-white">NEUROCRAFTS</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                {t('footerDesc')}
              </p>
              <div className="flex gap-4">
                {['linkedin', 'twitter', 'instagram', 'github'].map((social, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-12 h-12 glass-card flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all"
                  >
                    <div className={`icon-${social} text-lg text-white`}></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">{t('footerServices')}</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerAIDesign')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerWeb3')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerGenerative')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footer3D')}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">{t('footerCompany')}</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerAbout')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerCareers')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerBlog')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerContact')}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">{t('footerLegal')}</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerPrivacy')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerTerms')}</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">{t('footerCookies')}</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              {t('footerCopyright')}
            </p>
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              {t('footerTagline')}
            </p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}