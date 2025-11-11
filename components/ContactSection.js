const ContactSection = React.memo(function ContactSection() {
  try {
    const { t } = useLanguage();

    return (
      <SectionTransition delay={300}>
        <section
          id="contact"
          className="py-16 md:py-20 lg:py-24 px-4 md:px-8 flex items-center"
          data-name="contact"
          data-file="components/ContactSection.js"
        >
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16 md:mb-24 lg:mb-32">
            <h2 className="text-4xl md:text-7xl lg:text-9xl font-black leading-none mb-8 md:mb-12">
              {t('contactTitle')}
            </h2>
            <div className="space-y-4 md:space-y-6">
              <a
                href="mailto:craftsneuro@gmail.com"
                className="text-xl md:text-3xl lg:text-5xl hover:text-[var(--accent)] transition-colors inline-block break-all"
              >
                craftsneuro@gmail.com
              </a>
              <div className="flex flex-wrap gap-4 md:gap-6 text-base md:text-xl">
                <a href="https://t.me/neurocraftsru" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2 cursor-pointer">
                  <div className="icon-send text-xl" />
                  <span>Telegram</span>
                </a>
                <div className="flex items-center gap-2">
                  <div className="icon-phone text-xl" />
                  <span>WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-calendar text-xl" />
                  <span>Schedule Call</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 pt-8 md:pt-12 lg:pt-16 border-t border-gray-800">
            <div>
              <div className="text-xs md:text-sm text-gray-500 font-mono uppercase mb-3 md:mb-4">
                LEGAL
              </div>
              <div className="space-y-2 md:space-y-3 text-base md:text-lg">
                <a href="privacy.html" className="block hover:text-[var(--accent)] transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div>
              <div className="text-xs md:text-sm text-gray-500 font-mono uppercase mb-3 md:mb-4">
                {t('socialTitle')}
              </div>
              <div className="space-y-2 md:space-y-3 text-base md:text-lg">
                <div className="block">
                  GitHub
                </div>
                <div className="block">
                  Twitter
                </div>
                <div className="block">
                  LinkedIn
                </div>
                <div className="block">
                  Dribbble
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs md:text-sm text-gray-500 font-mono uppercase mb-3 md:mb-4">
                {t('locationTitle')}
              </div>
              <p className="text-base md:text-lg">
                {t('location')}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs md:text-sm text-gray-500 font-mono uppercase mb-3 md:mb-4">
                  {t('copyright')}
                </div>
                <p className="text-base md:text-lg text-gray-500">
                  NEUROCRAFTS — Creative AI Studio
                </p>
              </div>
              <a 
                href="admin.html"
                className="w-6 h-6 flex items-center justify-center opacity-20 hover:opacity-100 transition-all group"
                title="Admin Panel"
              >
                <div className="icon-settings text-sm text-gray-700 group-hover:text-gray-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>
        </section>
      </SectionTransition>
    );
  } catch (error) {
    console.error('ContactSection error:', error);
    return null;
  }
});
