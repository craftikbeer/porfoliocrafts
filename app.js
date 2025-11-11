class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl">Something went wrong</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [selectedProject, setSelectedProject] = React.useState(null);

    return (
      <div data-name="app" data-file="app.js">
        <ScrollProgress />
        <MagnifyingGlass />
        <Navigation />
        <VideoHero />
        <ProjectsMarquee onProjectClick={setSelectedProject} />
        <ManifestoSection />
        <WorkGrid onProjectClick={setSelectedProject} />
        <BeforeAfterSection />
        <BlogSection />
        <ContactSection />
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          onNavigate={setSelectedProject}
        />
        <TelegramCTA />
        <ExitIntentPopup />
        <BackToTop />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ErrorBoundary>
);