function MagnifyCardsManager() {
  const [cards, setCards] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showJsonEditor, setShowJsonEditor] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const [formData, setFormData] = React.useState({ title: '', cat: '', color: '#ff0000', image: '' });

  React.useEffect(() => {
    setCards(window.magnifyCardsData || []);
  }, []);

  const handleOpenJsonEditor = () => {
    setJsonData(JSON.stringify(cards, null, 2));
    setShowJsonEditor(true);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        alert('Данные должны быть массивом');
        return;
      }
      setCards(parsed);
      downloadDataFile(parsed);
      setShowJsonEditor(false);
      alert('Изменения сохранены успешно!');
    } catch (error) {
      alert('Ошибка в JSON формате: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...cards, formData];
    setCards(updated);
    downloadDataFile(updated);
    setFormData({ title: '', cat: '', color: '#ff0000', image: '' });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    if (confirm('Удалить карточку?')) {
      const updated = cards.filter((_, i) => i !== index);
      setCards(updated);
      downloadDataFile(updated);
    }
  };

  const downloadDataFile = (data) => {
    const content = `// Static magnify cards data
const magnifyCardsData = ${JSON.stringify(data, null, 2)};

// Make data globally available
window.magnifyCardsData = magnifyCardsData;`;
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'magnify-cards.js';
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
            placeholder='[{"title": "...", "cat": "...", ...}]'
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
          <h2 className="text-3xl font-black">НОВАЯ КАРТОЧКА</h2>
          <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-700">
            Отмена
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Заголовок (используйте \n для переноса)"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <input
            required
            placeholder="Категория"
            value={formData.cat}
            onChange={(e) => setFormData({...formData, cat: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <div>
            <label className="block text-sm mb-2">Цвет акцента</label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({...formData, color: e.target.value})}
              className="w-full h-12 bg-gray-900 border border-gray-700"
            />
          </div>
          <input
            placeholder="URL изображения (опционально)"
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
        <h2 className="text-3xl font-black">КАРТОЧКИ ЛУПЫ ({cards.length})</h2>
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
        {cards.map((card, index) => (
          <div key={index} className="border border-gray-800 p-4">
            <div 
              className="w-full h-32 mb-3 flex items-center justify-center"
              style={{ backgroundColor: card.color }}
            >
              {card.image ? (
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-white font-bold">
                  {card.title.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-2">{card.cat}</p>
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