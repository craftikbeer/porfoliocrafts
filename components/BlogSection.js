const BlogSection = React.memo(function BlogSection() {
  try {
    const { t } = useLanguage();
    const posts = window.blogData || [];
    const [copiedId, setCopiedId] = React.useState(null);

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

    if (posts.length === 0) return null;

    return (
      <section
        className="py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[var(--off-white)] text-black"
        data-name="blog"
        data-file="components/BlogSection.js"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 md:mb-16">
            AI ПРОМТЫ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <article key={post.id} className="border-2 border-black group hover:bg-black transition-all">
                <div className="aspect-video bg-gray-200 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
                    {post.title}
                  </h3>
                  <div className="bg-gray-100 group-hover:bg-gray-900 p-4 mb-4 transition-colors relative">
                    <code className="text-sm font-mono text-gray-800 group-hover:text-gray-300 break-all block pr-10">
                      {post.prompt}
                    </code>
                    <button
                      onClick={() => handleCopyPrompt(post.prompt, post.id)}
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white group-hover:bg-gray-800 hover:bg-[var(--accent)] transition-all"
                      title="Копировать промт"
                    >
                      {copiedId === post.id ? (
                        <div className="icon-check text-sm text-green-600 group-hover:text-green-400" />
                      ) : (
                        <div className="icon-copy text-sm text-gray-600 group-hover:text-gray-400" />
                      )}
                    </button>
                  </div>
                  {post.date && (
                    <p className="text-xs text-gray-500 group-hover:text-gray-400">
                      {post.date}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('BlogSection error:', error);
    return null;
  }
});