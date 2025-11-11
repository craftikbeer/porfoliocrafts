const ADMIN_PASSWORD = 'neuro2025';

function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('projects');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black mb-2">ADMIN PANEL</h1>
            <p className="text-gray-400">NEUROCRAFTS</p>
          </div>
          <form onSubmit={handleLogin} className="border border-gray-800 p-8">
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2">ПАРОЛЬ</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 px-4 py-3 focus:border-[var(--accent)] focus:outline-none"
                placeholder="Введите пароль"
              />
              {error && <p className="text-[var(--accent)] text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--accent)] text-white py-3 font-bold hover:bg-white hover:text-black transition-all"
            >
              ВОЙТИ
            </button>
            <div className="mt-6 text-center">
              <a href="index.html" className="text-sm text-gray-500 hover:text-white">
                ← Вернуться на сайт
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="border-b border-gray-800 px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black">ADMIN PANEL</h1>
          <div className="flex gap-4 items-center">
            <a href="index.html" className="text-sm hover:text-[var(--accent)]">
              Просмотр сайта
            </a>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 border border-gray-700 hover:border-[var(--accent)] transition-all"
            >
              Выход
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 border-r border-gray-800 min-h-screen p-6">
          <nav className="space-y-2">
            {[
              { id: 'projects', label: 'Проекты', icon: 'briefcase' },
              { id: 'gallery', label: 'Галерея', icon: 'image' },
              { id: 'transformations', label: 'Трансформации', icon: 'refresh-cw' },
              { id: 'magnify', label: 'Карточки лупы', icon: 'search' },
              { id: 'blog', label: 'Блог', icon: 'file-text' },
              { id: 'import-export', label: 'Импорт/Экспорт', icon: 'download' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all ${
                  activeTab === tab.id 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'hover:bg-gray-900'
                }`}
              >
                <div className={`icon-${tab.icon} text-lg`} />
                <span className="font-bold">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'gallery' && <GalleryManager />}
          {activeTab === 'transformations' && <TransformationsManager />}
          {activeTab === 'magnify' && <MagnifyCardsManager />}
          {activeTab === 'blog' && <BlogManager />}
          {activeTab === 'import-export' && <ImportExportManager />}
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminPanel />);