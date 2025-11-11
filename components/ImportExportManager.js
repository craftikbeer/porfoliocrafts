function ImportExportManager() {
  const [importData, setImportData] = React.useState('');

  const handleExportAll = () => {
    const allData = {
      projects: window.projectsData || [],
      gallery: window.galleryData || [],
      transformations: window.transformationsData || [],
      magnifyCards: window.magnifyCardsData || [],
      blog: window.blogData || []
    };

    const content = JSON.stringify(allData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neurocrafts-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      
      if (data.projects) downloadJSFile('projects', data.projects);
      if (data.gallery) downloadJSFile('gallery', data.gallery);
      if (data.transformations) downloadJSFile('transformations', data.transformations);
      if (data.magnifyCards) downloadJSFile('magnify-cards', data.magnifyCards);
      if (data.blog) downloadJSFile('blog', data.blog);
      
      alert('Импорт успешно завершен! Файлы были скачаны. Замените соответствующие файлы в папке data/');
      setImportData('');
    } catch (error) {
      alert('Ошибка при импорте: ' + error.message);
    }
  };

  const downloadJSFile = (type, data) => {
    let content = '';
    let filename = '';
    
    switch(type) {
      case 'projects':
        content = `// Static projects data
const projectsData = ${JSON.stringify(data, null, 2)};
window.projectsData = projectsData;`;
        filename = 'projects.js';
        break;
      case 'gallery':
        content = `// Static gallery data
const galleryData = ${JSON.stringify(data, null, 2)};
window.galleryData = galleryData;`;
        filename = 'gallery.js';
        break;
      case 'transformations':
        content = `// Static transformations data
const transformationsData = ${JSON.stringify(data, null, 2)};
window.transformationsData = transformationsData;`;
        filename = 'transformations.js';
        break;
      case 'magnify-cards':
        content = `// Static magnify cards data
const magnifyCardsData = ${JSON.stringify(data, null, 2)};
window.magnifyCardsData = magnifyCardsData;`;
        filename = 'magnify-cards.js';
        break;
      case 'blog':
        content = `// Static blog posts data
const blogData = ${JSON.stringify(data, null, 2)};
window.blogData = blogData;`;
        filename = 'blog.js';
        break;
    }
    
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 className="text-3xl font-black mb-8">ИМПОРТ / ЭКСПОРТ ДАННЫХ</h2>

      <div className="space-y-8">
        <div className="border border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4">Экспорт всех данных</h3>
          <p className="text-sm text-gray-400 mb-4">
            Скачать все данные сайта в формате JSON для резервного копирования
          </p>
          <button
            onClick={handleExportAll}
            className="px-6 py-3 bg-[var(--accent)] text-white font-bold hover:bg-white hover:text-black transition-all"
          >
            ЭКСПОРТИРОВАТЬ ВСЁ
          </button>
        </div>

        <div className="border border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4">Импорт данных</h3>
          <p className="text-sm text-gray-400 mb-4">
            Вставьте JSON данные для импорта. После импорта будут скачаны обновленные JS файлы.
          </p>
          <textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 px-4 py-3 h-64 font-mono text-sm"
            placeholder='{"projects": [...], "gallery": [...], ...}'
          />
          <button
            onClick={handleImport}
            disabled={!importData}
            className="mt-4 px-6 py-3 bg-[var(--accent)] text-white font-bold hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ИМПОРТИРОВАТЬ
          </button>
        </div>

        <div className="border border-gray-800 p-6 bg-gray-900">
          <h3 className="text-xl font-bold mb-3">Инструкция</h3>
          <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
            <li>Экспортируйте текущие данные для резервной копии</li>
            <li>При импорте будут скачаны обновленные JS файлы</li>
            <li>Замените соответствующие файлы в папке data/ вашего проекта</li>
            <li>Обновите страницу для применения изменений</li>
          </ol>
        </div>
      </div>
    </div>
  );
}