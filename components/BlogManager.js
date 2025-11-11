function BlogManager() {
  const [posts, setPosts] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showJsonEditor, setShowJsonEditor] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const [formData, setFormData] = React.useState({ title: '', prompt: '', image: '' });

  React.useEffect(() => {
    setPosts(window.blogData || []);
  }, []);

  const handleOpenJsonEditor = () => {
    setJsonData(JSON.stringify(posts, null, 2));
    setShowJsonEditor(true);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        alert('Данные должны быть массивом');
        return;
      }
      setPosts(parsed);
      downloadDataFile(parsed);
      setShowJsonEditor(false);
      alert('Изменения сохранены успешно!');
    } catch (error) {
      alert('Ошибка в JSON формате: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...posts, newPost];
    setPosts(updated);
    downloadDataFile(updated);
    setFormData({ title: '', prompt: '', image: '' });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    if (confirm('Удалить пост?')) {
      const updated = posts.filter((_, i) => i !== index);
      setPosts(updated);
      downloadDataFile(updated);
    }
  };

  const downloadDataFile = (data) => {
    const content = `// Static blog posts data
const blogData = ${JSON.stringify(data, null, 2)};

// Make data globally available
window.blogData = blogData;`;
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (showJsonEditor) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">РЕДАКТИРОВАТЬ JSON</h2>
          <button onClick={() => setShowJsonEditor(false)} className="px-4 py-2 border border-gray-700">
            Отмена
          </button>
        </div>
        <div className="space-y-4">
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-3 h-96 font-mono text-sm"
            placeholder='[{"title": "...", "prompt": "...", "image": "...", "date": "..."}]'
          />
          <div className="flex gap-4">
            <button
              onClick={handleSaveJson}
              className="flex-1 bg-[var(--accent)] text-white py-3 font-bold hover:bg-white hover:text-black transition-all"
            >
              СОХРАНИТЬ ИЗМЕНЕНИЯ
            </button>
            <button
              onClick={() => setShowJsonEditor(false)}
              className="px-8 py-3 border border-gray-700 hover:border-white"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black">НОВЫЙ ПОСТ</h2>
          <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-700">
            Отмена
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Название"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <textarea
            required
            placeholder="AI промт"
            value={formData.prompt}
            onChange={(e) => setFormData({...formData, prompt: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2 h-32"
          />
          <input
            required
            placeholder="URL изображения"
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <button type="submit" className="w-full bg-[var(--accent)] text-white py-3 font-bold">
            СОЗДАТЬ
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black">БЛОГ (AI ПРОМТЫ) ({posts.length})</h2>
        <div className="flex gap-3">
          <button
            onClick={handleOpenJsonEditor}
            className="px-6 py-3 border border-gray-700 hover:border-[var(--accent)] font-bold transition-all flex items-center gap-2"
          >
            <div className="icon-code text-lg"></div>
            JSON
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-[var(--accent)] text-white font-bold hover:bg-white hover:text-black transition-all"
          >
            + ДОБАВИТЬ
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">Нет постов</p>
        ) : (
          posts.map((post, index) => (
            <div key={index} className="border border-gray-800 p-6 flex gap-6">
              <img src={post.image} alt={post.title} className="w-32 h-32 object-cover" />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <div className="bg-gray-900 p-3 mb-2">
                  <code className="text-xs text-gray-400">{post.prompt}</code>
                </div>
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 border border-gray-700 hover:border-[var(--accent)] text-sm h-fit"
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
