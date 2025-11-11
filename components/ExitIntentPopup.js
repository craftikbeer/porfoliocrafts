const ExitIntentPopup = React.memo(function ExitIntentPopup() {
  const { t } = useLanguage();
  const [showPopup, setShowPopup] = React.useState(false);
  const [hasShownPopup, setHasShownPopup] = React.useState(false);

  React.useEffect(() => {
    const handleMouseOut = (e) => {
      if (!hasShownPopup && e.clientY <= 0) {
        setShowPopup(true);
        setHasShownPopup(true);
      }
    };

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [hasShownPopup]);

  if (!showPopup) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={() => setShowPopup(false)}
      data-name="exit-intent-popup"
      data-file="components/ExitIntentPopup.js"
    >
      <div 
        className="relative bg-white text-black p-8 md:p-12 max-w-2xl w-full border-4 border-[var(--accent)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-all"
        >
          <div className="icon-x text-xl" />
        </button>

        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
          {t('exitPopupTitle') || 'ПОДОЖДИ!'}
        </h2>
        
        <p className="text-lg md:text-xl mb-8 text-gray-700">
          Посмотри мою коллекцию AI-промтов и креативных экспериментов!
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.location.href = 'blog.html'}
            className="flex-1 bg-[var(--accent)] text-white py-4 font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <div className="icon-sparkles text-xl" />
            <span>СМОТРЕТЬ ПРОМТЫ</span>
          </button>
          <button
            onClick={() => window.location.href = 'https://t.me/neurocraftsru'}
            className="flex-1 border-2 border-black py-4 font-bold hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <div className="icon-send text-xl" />
            <span>НАПИСАТЬ В TELEGRAM</span>
          </button>
        </div>
      </div>
    </div>
  );
});