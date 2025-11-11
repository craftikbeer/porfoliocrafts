function GalleryManager() {
  const [items, setItems] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showJsonEditor, setShowJsonEditor] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const [formData, setFormData] = React.useState({ title: '', category: '', image: '' });

  React.useEffect(() => {
    setItems(window.galleryData || []);
  }, []);

  const handleOpenJsonEditor = () => {
    setJsonData(JSON.stringify(items, null, 2));
    setShowJsonEditor(true);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        alert('Данные должны быть массивом');
        return;
      }
      setItems(parsed);
      downloadDataFile(parsed);
      setShowJsonEditor(false);
      alert('Изменения сохранены успешно!');
    } catch (error) {
      alert('Ошибка в JSON формате: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...items, formData];
    setItems(updated);
    downloadDataFile(updated);
    setFormData({ title: '', category: '', image: '' });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    if (confirm('Удалить изображение?')) {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
      downloadDataFile(updated);
    }
  };

  const downloadDataFile = (data) => {
    const content = `// Static gallery data
const galleryData = ${JSON.stringify(data, null, 2)};

// Make data globally available
window.galleryData = galleryData;`;
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gallery.js';
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
            placeholder='[{"title": "...", "category": "...", "image": "..."}]'
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
          <h2 className="text-3xl font-black">НОВОЕ ИЗОБРАЖЕНИЕ</h2>
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
          <input
            placeholder="Категория"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
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
        <h2 className="text-3xl font-black">ГАЛЕРЕЯ ({items.length})</h2>
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

      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="border border-gray-800 p-4">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover mb-3" />
            <h3 className="font-bold mb-2">{item.title}</h3>
            <button
              onClick={() => handleDelete(index)}
              className="w-full py-2 border border-gray-700 hover:border-[var(--accent)] text-sm"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
