function Projects() {
  try {
    const projects = [
      {
        title: 'AI Trading Platform',
        category: 'FinTech',
        color: 'var(--secondary-color)',
        year: '2025'
      },
      {
        title: 'NFT Marketplace',
        category: 'Web3',
        color: 'var(--accent-blue)',
        year: '2024'
      },
      {
        title: 'Eco Dashboard',
        category: 'Sustainability',
        color: 'var(--accent-yellow)',
        year: '2025'
      }
    ];

    return (
      <section id="projects" className="py-24 bg-gray-50" data-name="projects" data-file="components/Projects.js">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-5xl font-bold uppercase mb-4">Featured Projects</h2>
            <div className="w-32 h-2 bg-[var(--secondary-color)]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-square bg-white border-4 border-black mb-4 relative overflow-hidden">
                  <div 
                    className="absolute inset-0 transition-transform group-hover:scale-110"
                    style={{ background: project.color }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 border-8 border-white"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold uppercase mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 uppercase tracking-wider">{project.category}</p>
                  </div>
                  <span className="text-sm font-bold">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Projects component error:', error);
    return null;
  }
}