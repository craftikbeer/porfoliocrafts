const generateProjectURL = (projectId) => {
  const baseURL = window.location.origin;
  return `${baseURL}/project.html?id=${projectId}`;
};

const shareProject = async (project) => {
  const projectURL = generateProjectURL(project.id);
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: project.title,
        text: project.desc,
        url: projectURL
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share error:', error);
        copyToClipboard(projectURL);
      }
    }
  } else {
    copyToClipboard(projectURL);
  }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Ссылка скопирована!');
  }).catch(() => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('Ссылка скопирована!');
  });
};

const showToast = (message) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: white;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: bold;
    z-index: 10000;
    animation: fadeInOut 2s ease-in-out;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0%, 100% { opacity: 0; }
      10%, 90% { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}