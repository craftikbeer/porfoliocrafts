function AboutSection() {
  try {
    const { t } = useLanguage();

    return (
      <section
        id="about"
        className="py-12 md:py-16 lg:py-20 px-4 md:px-8"
        data-name="about"
        data-file="components/AboutSection.js"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 md:mb-16">
            {t('aboutTitle')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            <div className="space-y-6">
              <p className="text-lg md:text-xl leading-relaxed">
                {t('aboutText1')}
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                {t('aboutText2')}
              </p>
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                {t('aboutText3')}
              </p>

              <div className="pt-6 border-t border-gray-800">
                <h3 className="text-xl font-bold mb-4">{t('servicesTitle')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-800 p-4">
                    <div className="icon-code text-xl mb-2" />
                    <div className="text-sm font-bold">{t('service1')}</div>
                  </div>
                  <div className="border border-gray-800 p-4">
                    <div className="icon-palette text-xl mb-2" />
                    <div className="text-sm font-bold">{t('service2')}</div>
                  </div>
                  <div className="border border-gray-800 p-4">
                    <div className="icon-box text-xl mb-2" />
                    <div className="text-sm font-bold">{t('service3')}</div>
                  </div>
                  <div className="border border-gray-800 p-4">
                    <div className="icon-message-circle text-xl mb-2" />
                    <div className="text-sm font-bold">{t('service4')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-black mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Alex Neural"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              <div className="space-y-4 border border-gray-800 p-6">
                <div>
                  <div className="text-xs text-gray-500 font-mono mb-1">
                    {t('ratesTitle')}
                  </div>
                  <div className="text-sm">{t('ratesText')}</div>
                </div>
                <div className="border-t border-gray-800 pt-4">
                  <div className="text-xs text-gray-500 font-mono mb-1">
                    {t('availabilityTitle')}
                  </div>
                  <div className="text-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {t('availabilityText')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('AboutSection error:', error);
    return null;
  }
}