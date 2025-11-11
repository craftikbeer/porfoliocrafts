const useImageLoader = (src) => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error };
};

const OptimizedImage = ({ src, alt, className, ...props }) => {
  const { loaded, error } = useImageLoader(src);

  return (
    <div className={`relative ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}
      {error && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="icon-image-off text-gray-600 text-2xl" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        loading="lazy"
        {...props}
      />
    </div>
  );
};