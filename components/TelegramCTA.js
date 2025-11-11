const TelegramCTA = React.memo(function TelegramCTA() {
  const { t } = useLanguage();
  const { SCROLL_THRESHOLDS } = window.APP_CONSTANTS;
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const isVisible = useScrollVisibility(SCROLL_THRESHOLDS.TELEGRAM_CTA);
  
  useBodyScrollLock(isPopupOpen);

  const handleOpenTelegram = () => {
    window.location.href = 'https://t.me/neurocraftsru';
  };

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className={`fixed bottom-8 right-8 z-50 bg-[var(--accent)] text-white w-16 h-16 font-bold transition-all duration-500 hover:bg-white hover:text-black group flex items-center justify-center ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        aria-label="Order via Telegram"
        data-name="telegram-cta"
        data-file="components/TelegramCTA.js"
      >
        <div className="icon-send text-2xl" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
      </button>

      {isPopupOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsPopupOpen(false)}
        >
          <div 
            className="relative w-full max-w-md bg-white text-black p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              <div className="icon-x text-xl" />
            </button>

            <div className="mb-6">
              <h3 className="text-3xl font-black mb-2">
                {t('telegramCTA')}
              </h3>
              <p className="text-sm text-gray-600">
                Напишите мне в Telegram для обсуждения проекта
              </p>
            </div>

            <button
              onClick={handleOpenTelegram}
              className="w-full bg-[var(--accent)] text-white py-4 font-bold hover:bg-black transition-all flex items-center justify-center gap-3 mb-4"
            >
              <div className="icon-send text-xl" />
              <span>ОТКРЫТЬ TELEGRAM</span>
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">или скопируйте:</p>
              <div className="bg-gray-100 p-3 font-mono text-sm select-all cursor-pointer" onClick={() => navigator.clipboard.writeText('@neurocraftsru')}>
                @neurocraftsru
              </div>
              <p className="text-xs text-gray-400 mt-1">Нажмите, чтобы скопировать</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
