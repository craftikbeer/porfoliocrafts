function ProcessSection() {
  try {
    const { t } = useLanguage();

    const steps = [
      { num: '01', titleKey: 'process1Title', descKey: 'process1Desc', icon: 'search' },
      { num: '02', titleKey: 'process2Title', descKey: 'process2Desc', icon: 'pen-tool' },
      { num: '03', titleKey: 'process3Title', descKey: 'process3Desc', icon: 'code' },
      { num: '04', titleKey: 'process4Title', descKey: 'process4Desc', icon: 'rocket' }
    ];

    return (
      <section
        className="py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[var(--off-white)] text-black"
        data-name="process"
        data-file="components/ProcessSection.js"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 md:mb-16">
            {t('processTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="border-2 border-black p-6 hover:bg-black hover:text-white transition-all group">
                <div className="text-4xl font-black text-[var(--accent)] mb-4">
                  {step.num}
                </div>
                <div className={`icon-${step.icon} text-2xl mb-4 group-hover:text-white`} />
                <h3 className="text-xl font-bold mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed opacity-70">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('ProcessSection error:', error);
    return null;
  }
}