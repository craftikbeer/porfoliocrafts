function Portfolio() {
  try {
    const { t } = useLanguage();
    
    const projects = [
      { titleKey: 'project1', categoryKey: 'project1Cat', size: 'large' },
      { titleKey: 'project2', categoryKey: 'project2Cat', size: 'medium' },
      { titleKey: 'project3', categoryKey: 'project3Cat', size: 'medium' },
      { titleKey: 'project4', categoryKey: 'project4Cat', size: 'large' },
      { titleKey: 'project5', categoryKey: 'project5Cat', size: 'medium' },
      { titleKey: 'project6', categoryKey: 'project6Cat', size: 'medium' }
    ];

    return (
      <section id="portfolio" className="w-full h-screen flex items-center bg-[var(--dark-grey)] px-6" data-name="portfolio" data-file="components/Portfolio.js">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
              {t('featuredWork')}
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('featuredWorkDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`glass-card overflow-hidden group cursor-pointer ${
                  project.size === 'large' ? 'md:col-span-2' : ''
                }`}
              >
                <div className={`bg-gradient-to-br from-gray-800 to-gray-900 ${
                  project.size === 'large' ? 'h-96' : 'h-80'
                } relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="icon-eye text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{t(project.titleKey)}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">{t(project.categoryKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Portfolio component error:', error);
    return null;
  }
}