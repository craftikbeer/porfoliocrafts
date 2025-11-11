function Stats() {
  try {
    const { t } = useLanguage();
    
    const stats = [
      { number: '500+', labelKey: 'stat1', icon: 'cpu' },
      { number: '150+', labelKey: 'stat2', icon: 'layers' },
      { number: '30+', labelKey: 'stat3', icon: 'globe' },
      { number: '99%', labelKey: 'stat4', icon: 'star' }
    ];

    return (
      <section className="w-full h-screen flex items-center relative overflow-hidden px-6" data-name="stats" data-file="components/Stats.js">
        <div className="absolute inset-0 mesh-gradient opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 text-center group hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-white bg-opacity-10 flex items-center justify-center mx-auto mb-6">
                  <div className={`icon-${stat.icon} text-xl text-white`}></div>
                </div>
                <div className="text-5xl font-black text-white mb-3">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Stats component error:', error);
    return null;
  }
}