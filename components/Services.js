function Services() {
  try {
    const { t } = useLanguage();
    
    const services = [
      {
        icon: 'brain',
        titleKey: 'service1Title',
        descKey: 'service1Desc'
      },
      {
        icon: 'layers',
        titleKey: 'service2Title',
        descKey: 'service2Desc'
      },
      {
        icon: 'sparkles',
        titleKey: 'service3Title',
        descKey: 'service3Desc'
      },
      {
        icon: 'globe',
        titleKey: 'service4Title',
        descKey: 'service4Desc'
      }
    ];

    return (
      <section id="services" className="w-full h-screen flex items-center relative px-6" data-name="services" data-file="components/Services.js">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
              {t('whatWeCreate')}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('whatWeCreateDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="glass-card p-8 group cursor-pointer">
                <div className="w-14 h-14 bg-white bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className={`icon-${service.icon} text-2xl text-white`}></div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {t(service.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Services component error:', error);
    return null;
  }
}