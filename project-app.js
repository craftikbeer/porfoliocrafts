function ProjectPage() {
  const [project, setProject] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadProject();
  }, []);

  const loadProject = () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
      window.location.href = 'index.html';
      return;
    }

    const projects = window.projectsData || [];
    const foundProject = projects.find(p => p.id === projectId);

    if (foundProject) {
      setProject(foundProject);
      updateMetaTags(foundProject);
    } else {
      window.location.href = 'index.html';
    }
    
    setLoading(false);
  };

  const updateMetaTags = (project) => {
    const url = window.location.href;
    
    document.getElementById('page-title').textContent = `${project.title} — NEUROCRAFTS`;
    document.getElementById('page-description').content = project.desc;
    document.getElementById('og-title').content = project.title;
    document.getElementById('og-description').content = project.desc;
    document.getElementById('og-image').content = project.img;
    document.getElementById('og-url').content = url;
    document.getElementById('twitter-title').content = project.title;
    document.getElementById('twitter-description').content = project.desc;
    document.getElementById('twitter-image').content = project.img;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">LOADING...</div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <a href="index.html" className="text-2xl font-bold tracking-tighter">
            NEUROCRAFTS
          </a>
          <a href="index.html" className="text-sm hover:text-[var(--accent)]">
            ← BACK
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="relative bg-black">
              <img src={project.img} alt={project.title} className="w-full h-auto" />
            </div>

            <div>
              <div className="text-xs font-mono text-gray-500 mb-3">
                {project.cat} • {project.year}
              </div>
              <h1 className="text-5xl font-black mb-4">{project.title}</h1>
              <p className="text-lg text-gray-400 mb-6">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags && project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white text-black text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">Challenge</h3>
                  <p className="text-sm text-gray-400">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Solution</h3>
                  <p className="text-sm text-gray-400">{project.solution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProjectPage />);