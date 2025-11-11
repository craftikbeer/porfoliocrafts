function ProjectModal({ project, onClose, onNavigate }) {
  useBodyScrollLock(!!project);
  useEscapeKey(onClose);

  if (!project) return null;

  const handlePrevious = () => {
    if (project.prevProject) {
      onNavigate(project.prevProject);
    }
  };

  const handleNext = () => {
    if (project.nextProject) {
      onNavigate(project.nextProject);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-name="project-modal"
      data-file="components/ProjectModal.js"
    >
      <div 
        className="relative w-full max-w-7xl h-[90vh] bg-white text-black flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => {
              const projectURL = generateProjectURL(project.id);
              window.open(`https://t.me/share/url?url=${encodeURIComponent(projectURL)}&text=${encodeURIComponent(project.title + ' — ' + project.desc)}`, '_blank');
            }}
            className="w-10 h-10 flex items-center justify-center bg-[#0088cc] text-white hover:bg-[#006ba1] transition-colors"
            title="Поделиться в Telegram"
          >
            <div className="icon-send text-xl" />
          </button>
          <button
            onClick={() => shareProject(project)}
            className="w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-[var(--accent)] transition-colors"
            title="Поделиться проектом"
          >
            <div className="icon-share-2 text-xl" />
          </button>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-[var(--accent)] transition-colors"
          >
            <div className="icon-x text-xl" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          <div className="relative bg-black">
            {project.video ? (
              <div className="w-full h-full flex items-center justify-center">
                {project.video.includes('youtube.com') || project.video.includes('youtu.be') ? (
                  <iframe
                    src={project.video.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : project.video.includes('vimeo.com') ? (
                  <iframe
                    src={project.video.replace('vimeo.com/', 'player.vimeo.com/video/')}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={project.video}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  />
                )}
              </div>
            ) : (
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover opacity-80"
              />
            )}
          </div>

          <div className="flex flex-col p-8 lg:p-12 overflow-y-auto">
            <div className="flex-1">
              <div className="text-xs font-mono text-gray-500 mb-3">
                {project.cat} • {project.year}
              </div>
              <h2 id="modal-title" className="text-3xl lg:text-5xl font-black mb-4 leading-tight">
                {project.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags && project.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-black text-white text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-6">
                {project.challenge && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Challenge</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="text-xl font-bold mb-2">Solution</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={!project.prevProject}
                className="flex items-center gap-2 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--accent)] transition-colors"
              >
                <div className="icon-arrow-left" />
                <span>PREV</span>
              </button>
              <button
                onClick={handleNext}
                disabled={!project.nextProject}
                className="flex items-center gap-2 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--accent)] transition-colors"
              >
                <span>NEXT</span>
                <div className="icon-arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}