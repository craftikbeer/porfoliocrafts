function BlogPage() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [copiedId, setCopiedId] = React.useState(null);
  
  React.useEffect(() => {
    const blogPosts = window.blogData || [];
    setPosts(blogPosts);
    setLoading(false);
  }, []);

  const handleCopyPrompt = (prompt, postId) => {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = prompt;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(postId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-black bg-opacity-80 backdrop-blur-sm border-b border-gray-900">
        <div className="flex justify-between items-center">
          <a href="index.html" className="text-xl md:text-2xl font-bold tracking-tighter">
            NEUROCRAFTS
          </a>
          <a href="index.html" className="text-sm hover:text-[var(--accent)] transition-colors">
            ← BACK
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-4">
            AI ПРОМТЫ
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 md:mb-16">
            Коллекция промтов для генерации AI-арта и креативных экспериментов
          </p>

          {loading ? (
            <div className="text-center text-2xl font-bold">LOADING...</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-xl text-gray-500">No posts yet</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post) => (
                  <article key={post.id} className="border border-gray-800 group hover:border-[var(--accent)] transition-all">
                    <div className="aspect-video bg-gray-900 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors">
                      {post.title}
                    </h2>
                    <div className="bg-gray-900 p-4 mb-4 relative">
                      <code className="text-sm font-mono text-gray-400 break-all leading-relaxed block pr-10">
                        {post.prompt}
                      </code>
                      <button
                        onClick={() => handleCopyPrompt(post.prompt, post.id)}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-[var(--accent)] transition-all"
                        title="Копировать промт"
                      >
                        {copiedId === post.id ? (
                          <div className="icon-check text-sm text-green-400" />
                        ) : (
                          <div className="icon-copy text-sm text-gray-400" />
                        )}
                      </button>
                    </div>
                    {post.date && (
                      <p className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>


    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BlogPage />);