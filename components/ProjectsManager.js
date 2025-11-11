function ProjectsManager() {
  const [projects, setProjects] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [showJsonEditor, setShowJsonEditor] = React.useState(false);
  const [jsonData, setJsonData] = React.useState('');
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [formData, setFormData] = React.useState({
    title: '', cat: '', year: '2025', img: '', img_hover: '',
    desc: '', tags: '', challenge: '', solution: '', video: ''
  });

  React.useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenJsonEditor = () => {
    setJsonData(JSON.stringify(projects, null, 2));
    setShowJsonEditor(true);
  };

  const handleSaveJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!Array.isArray(parsed)) {
        alert('Данные должны быть массивом');
        return;
      }
      setProjects(parsed);
      downloadDataFile(parsed);
      setShowJsonEditor(false);
      alert('Изменения сохранены успешно!');
    } catch (error) {
      alert('Ошибка в JSON формате: ' + error.message);
    }
  };

  const loadProjects = () => {
    setProjects(window.projectsData || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      id: `project-${Date.now()}`
    };

    let updated;
    if (editingIndex !== null) {
      updated = [...projects];
      updated[editingIndex] = newProject;
    } else {
      updated = [...projects, newProject];
    }

    setProjects(updated);
    downloadDataFile(updated);
    resetForm();
  };

  const handleEdit = (index) => {
    const project = projects[index];
    setFormData({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : ''
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    if (confirm('Удалить проект?')) {
      const updated = projects.filter((_, i) => i !== index);
      setProjects(updated);
      downloadDataFile(updated);
    }
  };

  const downloadDataFile = (data) => {
    const content = `// Static projects data - edit this file to update your portfolio
// You can import data using the admin panel's import function
const projectsData = ${JSON.stringify(data, null, 2)};

// Make data globally available
window.projectsData = projectsData;`;
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      title: '', cat: '', year: '2025', img: '', img_hover: '',
      desc: '', tags: '', challenge: '', solution: '', video: ''
    });
    setEditingIndex(null);
    setShowForm(false);
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
          <h2 className="text-3xl font-black">
            {editingIndex !== null ? 'РЕДАКТИРОВАТЬ ПРОЕКТ' : 'НОВЫЙ ПРОЕКТ'}
          </h2>
          <button onClick={resetForm} className="px-4 py-2 border border-gray-700">
            Отмена
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <input
              required
              placeholder="Название проекта"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="bg-gray-900 border border-gray-700 px-4 py-2"
            />
            <input
              required
              placeholder="Категория"
              value={formData.cat}
              onChange={(e) => setFormData({...formData, cat: e.target.value})}
              className="bg-gray-900 border border-gray-700 px-4 py-2"
            />
            <select
              required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
              className="bg-gray-900 border border-gray-700 px-4 py-2"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <input
            required
            placeholder="URL изображения"
            value={formData.img}
            onChange={(e) => setFormData({...formData, img: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <input
            placeholder="URL hover изображения (опционально)"
            value={formData.img_hover}
            onChange={(e) => setFormData({...formData, img_hover: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <textarea
            required
            placeholder="Описание"
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2 h-24"
          />
          <input
            placeholder="Теги (через запятую)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-2"
          />
          <button type="submit" className="w-full bg-[var(--accent)] text-white py-3 font-bold">
            {editingIndex !== null ? 'СОХРАНИТЬ' : 'СОЗДАТЬ'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black">ПРОЕКТЫ ({projects.length})</h2>
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
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-800 p-6 flex gap-6">
            <img src={project.img} alt={project.title} className="w-32 h-32 object-cover" />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{project.cat} • {project.year}</p>
              <p className="text-sm text-gray-500">{project.desc}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-4 py-2 border border-gray-700 hover:border-white text-sm"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-4 py-2 border border-gray-700 hover:border-[var(--accent)] text-sm"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
