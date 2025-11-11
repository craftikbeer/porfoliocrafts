const WorkGrid = React.memo(function WorkGrid({ onProjectClick }) {
  try {
    const { t } = useLanguage();
    const allProjects = window.projectsData || [];

    const projectsWithNav = allProjects.map((project, index) => ({
      ...project,
      prevProject: index > 0 ? allProjects[index - 1] : null,
      nextProject: index < allProjects.length - 1 ? allProjects[index + 1] : null
    }));

    const timelineData = {
      '2026': projectsWithNav.filter(p => p.year === '2026'),
      '2025': projectsWithNav.filter(p => p.year === '2025')
    };

    return (
      <SectionTransition delay={100}>
        <section
          id="work"
          className="py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[var(--off-white)] text-black"
          data-name="work-timeline"
          data-file="components/WorkGrid.js"
        >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-black">{t('workTitle')}</h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {Object.entries(timelineData).map(([year, projects]) => (
              <div key={year} className="relative">
                <div className="flex items-center gap-8 mb-12">
                  <div className="text-6xl md:text-8xl font-black opacity-20">
                    {year}
                  </div>
                  <div className="flex-1 h-px bg-black opacity-20"></div>
                </div>

                <div className="space-y-12 md:space-y-16 pl-0 md:pl-12">
                  {projects.map((project, index) => (
                    <div 
                      key={index}
                      className="group cursor-pointer"
                      onClick={() => onProjectClick(project)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                        <div className="md:col-span-7 overflow-hidden bg-black relative aspect-video">
                          {project.img_hover ? (
                            <>
                              <img
                                src={project.img}
                                alt={project.title}
                                loading="lazy"
                                className="project-image absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                              />
                              <img
                                src={project.img_hover}
                                alt={`${project.title} hover`}
                                loading="lazy"
                                className="project-image absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                              />
                            </>
                          ) : (
                            <img
                              src={project.img}
                              alt={project.title}
                              loading="lazy"
                              className="project-image absolute inset-0 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
                            />
                          )}
                        </div>
                        
                        <div className="md:col-span-5 flex flex-col justify-center">
                          <div className="text-xs font-mono text-gray-500 mb-3">
                            {project.cat}
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black mb-4 group-hover:text-[var(--accent)] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-base md:text-lg text-gray-600 mb-6">
                            {project.desc}
                          </p>
                          <div className="flex items-center gap-3 text-sm font-bold">
                            <span>VIEW CASE</span>
                            <div className="icon-arrow-right group-hover:translate-x-2 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
      </SectionTransition>
    );
  } catch (error) {
    console.error('WorkGrid error:', error);
    return null;
  }
});
