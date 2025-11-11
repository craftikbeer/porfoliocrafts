function TransformationsManager() {
  const [items, setItems] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showJsonEditor, setShowJsonEditor] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const [formData, setFormData] = React.useState({ title: '', desc: '', before: '', after: '' });

  React.useEffect(() => {
    setItems(window.transformationsData || []);
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
    setFormData({ title: '', desc: '', before: '', after: '' });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    if (confirm('Удалить трансформацию?')) {
      const updated = items.filter((_, i) => i !== index);
      setItems(updated);
      downloadDataFile(updated);
    }
  };

  const downloadDataFile = (data) => {
    const content = `// Static transformations data
const transformationsData = ${JSON.stringify(data, null, 2)};

// Make data globally available
window.transformationsData = transformationsData;`;
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transformations.js';
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
            placeholder='[{"title": "...", "desc": "...", "before": "...", "after": "..."}]'
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
          <h2 className="text-3xl font-black">НОВАЯ ТРАНСФОРМАЦИЯ</h2>
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
            placeholder="Описание"
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2 h-20"
          />
          <input
            required
            placeholder="URL изображения ДО"
            value={formData.before}
            onChange={(e) => setFormData({...formData, before: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <input
            required
            placeholder="URL изображения ПОСЛЕ"
            value={formData.after}
            onChange={(e) => setFormData({...formData, after: e.target.value})}
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
        <h2 className="text-3xl font-black">ТРАНСФОРМАЦИИ ({items.length})</h2>
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
        {items.length === 0 ? (
          <p className="text-gray-500">Нет трансформаций</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="border border-gray-800 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 border border-gray-700 hover:border-[var(--accent)] text-sm"
                >
                  Удалить
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={item.before} alt="Before" className="w-full h-48 object-cover" />
                <img src={item.after} alt="After" className="w-full h-48 object-cover" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
