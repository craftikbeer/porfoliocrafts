const ManifestoSection = React.memo(function ManifestoSection() {
  try {
    const { t } = useLanguage();

    return (
      <SectionTransition delay={0}>
        <section
          className="py-12 md:py-16 lg:py-20 px-4 md:px-8"
          data-name="manifesto"
          data-file="components/ManifestoSection.js"
        >
        <div className="max-w-7xl mx-auto">
          <div className="section-divider mb-16 md:mb-24" />
          
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-12 md:mb-20 leading-none">
            {t('manifestoTitle')}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16">
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-700 group cursor-pointer h-[300px] md:h-[400px] lg:h-[500px]">
              <img
                src="https://app.trickle.so/storage/public/images/usr_1785111758000001/e1f7af5b-5766-4c23-a645-eeb5e3c888ec.png?w=1152&h=1536"
                alt="Creative AI artwork"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
            </div>
            
            <div className="flex flex-col justify-center space-y-4 md:space-y-6">
              <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed">
                {t('manifestoText1')}
              </p>
              <p className="text-sm md:text-base lg:text-lg text-gray-400 leading-relaxed">
                {t('manifestoText2')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
            <div className="border border-gray-800 p-5 md:p-6 lg:p-8 hover:border-[var(--accent)] transition-colors">
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
                01
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3">
                {t('approach1')}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {t('approach1Desc')}
              </p>
            </div>
            
            <div className="border border-gray-800 p-5 md:p-6 lg:p-8 hover:border-[var(--accent)] transition-colors">
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
                02
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3">
                {t('approach2')}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {t('approach2Desc')}
              </p>
            </div>
            
            <div className="border border-gray-800 p-5 md:p-6 lg:p-8 hover:border-[var(--accent)] transition-colors sm:col-span-2 lg:col-span-1">
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
                03
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3">
                {t('approach3')}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                {t('approach3Desc')}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.instagram.com/neurocrafts_brand/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 md:px-12 py-3 md:py-4 bg-[var(--accent)] text-white font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              More Creative
            </a>
          </div>
        </div>
        </section>
      </SectionTransition>
    );
  } catch (error) {
    console.error('ManifestoSection error:', error);
    return null;
  }
});
