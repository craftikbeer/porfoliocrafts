const ProjectsMarquee = React.memo(function ProjectsMarquee({ onProjectClick }) {
  try {
    const marqueeRef = React.useRef(null);
    const [galleryItems, setGalleryItems] = React.useState([]);

    React.useEffect(() => {
      const items = (window.galleryData || []).map(g => ({ ...g, type: 'gallery' }));
      setGalleryItems(items);
    }, []);

    const displayItems = galleryItems.length > 0 ? galleryItems : [];
    const duplicatedItems = displayItems.length > 0 ? [...displayItems, ...displayItems, ...displayItems] : [];

    if (duplicatedItems.length === 0) {
      return null;
    }

    return (
      <section
        className="py-8 md:py-12 bg-black overflow-hidden border-y border-gray-900"
        data-name="projects-marquee"
        data-file="components/ProjectsMarquee.js"
      >
        <div 
          ref={marqueeRef}
          className="flex gap-4 md:gap-6"
          style={{
            animation: 'marquee 40s linear infinite'
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex-shrink-0 w-[280px] md:w-[400px] group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-gray-900 aspect-[4/3]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="marquee-image absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10" />
              </div>
              <div className="mt-3 md:mt-4">
                <div className="text-xs font-mono text-gray-500 mb-1">
                  {item.category || 'GALLERY'}
                </div>
                <h3 className="text-base md:text-lg font-bold group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}</style>
      </section>
    );
  } catch (error) {
    console.error('ProjectsMarquee error:', error);
    return null;
  }
});
