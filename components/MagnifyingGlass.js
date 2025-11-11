function MagnifyingGlass() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [isMagnifying, setIsMagnifying] = React.useState(false);
  const magnifyRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const currentTargetRef = React.useRef(null);
  const animationFrameRef = React.useRef(null);

  const [projectCards, setProjectCards] = React.useState([]);
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0);

  React.useEffect(() => {
    const cards = window.magnifyCardsData || [];
    setProjectCards(cards);
  }, []);

  const renderMagnifiedText = React.useCallback((mouseX, mouseY) => {
    if (!canvasRef.current || !currentTargetRef.current || projectCards.length === 0) return;
    
    const { MAGNIFY_SETTINGS } = window.APP_CONSTANTS;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const lensSize = MAGNIFY_SETTINGS.LENS_SIZE;
    
    if (canvas.width !== lensSize) {
      canvas.width = lensSize;
      canvas.height = lensSize;
    }
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, lensSize, lensSize);
    
    const card = projectCards[currentCardIndex];
    
    // If card has image, draw it
    if (card.image) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = card.image;
      
      if (img.complete) {
        ctx.drawImage(img, 20, 20, lensSize - 40, lensSize - 40);
      }
      
      // Draw border over image
      ctx.strokeStyle = card.color || '#ff0000';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, lensSize - 40, lensSize - 40);
    } else {
      // Draw card background with accent color
      ctx.fillStyle = card.color || '#ff0000';
      ctx.globalAlpha = 0.15;
      ctx.fillRect(20, 20, lensSize - 40, lensSize - 40);
      ctx.globalAlpha = 1;
      
      // Draw border
      ctx.strokeStyle = card.color || '#ff0000';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, lensSize - 40, lensSize - 40);
      
      // Draw category
      ctx.font = 'bold 10px Space Grotesk, sans-serif';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'center';
      ctx.fillText(card.cat, lensSize / 2, 40);
      
      // Draw title
      const titleLines = card.title.split('\n');
      ctx.font = 'bold 24px Space Grotesk, sans-serif';
      ctx.fillStyle = '#fafafa';
      ctx.textAlign = 'center';
      
      const lineHeight = 28;
      const startY = (lensSize - (titleLines.length * lineHeight)) / 2;
      
      titleLines.forEach((line, i) => {
        ctx.fillText(line, lensSize / 2, startY + (i * lineHeight) + 12);
      });
    }
    
    // Draw indicator dots at bottom
    const dotY = lensSize - 30;
    const dotSpacing = 12;
    const totalWidth = projectCards.length * dotSpacing;
    const startX = (lensSize - totalWidth) / 2 + 6;
    
    projectCards.forEach((_, i) => {
      ctx.beginPath();
      ctx.arc(startX + (i * dotSpacing), dotY, 3, 0, Math.PI * 2);
      ctx.fillStyle = i === currentCardIndex ? (card.color || '#ff0000') : '#333333';
      ctx.fill();
    });
    
    if (magnifyRef.current) {
      magnifyRef.current.style.left = `${mouseX - lensSize/2}px`;
      magnifyRef.current.style.top = `${mouseY - lensSize/2}px`;
    }
  }, [currentCardIndex, projectCards]);

  React.useEffect(() => {
    let rotationInterval;
    
    if (isMagnifying) {
      const { MAGNIFY_SETTINGS } = window.APP_CONSTANTS;
      rotationInterval = setInterval(() => {
        setCurrentCardIndex(prev => (prev + 1) % projectCards.length);
      }, MAGNIFY_SETTINGS.CARD_ROTATION_INTERVAL);
    }
    
    return () => {
      if (rotationInterval) {
        clearInterval(rotationInterval);
      }
    };
  }, [isMagnifying, projectCards.length]);

  React.useEffect(() => {
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps

    const updatePosition = (e) => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;
      lastUpdate = now;

      setPosition({ x: e.clientX, y: e.clientY });
      
      if (isMagnifying) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(() => {
          renderMagnifiedText(e.clientX, e.clientY);
        });
      }
    };

    const handleMouseEnter = (e) => {
      const magnifyTarget = e.target.closest('[data-magnify]');
      if (magnifyTarget) {
        setIsMagnifying(true);
        setIsHovering(false);
        currentTargetRef.current = magnifyTarget;
        magnifyTarget.classList.add('magnifying');
        if (magnifyRef.current) {
          magnifyRef.current.classList.add('active');
        }
      }
    };

    const handleMouseLeave = (e) => {
      const magnifyTarget = e.target.closest('[data-magnify]');
      if (magnifyTarget) {
        setIsMagnifying(false);
        magnifyTarget.classList.remove('magnifying');
        if (magnifyRef.current) {
          magnifyRef.current.classList.remove('active');
        }
        currentTargetRef.current = null;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    };

    const handleInteractive = (e) => {
      const isInteractive = e.target.closest('a, button');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updatePosition, { passive: true });
    
    document.querySelectorAll('[data-magnify]').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });
    
    document.addEventListener('mouseover', handleInteractive, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.querySelectorAll('[data-magnify]').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      document.removeEventListener('mouseover', handleInteractive);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMagnifying, renderMagnifiedText]);

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} hidden md:block pointer-events-none`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
        data-name="cursor"
        data-file="components/MagnifyingGlass.js"
      />
      <div ref={magnifyRef} className="magnifying-glass hidden md:block pointer-events-none">
        <div className="magnifying-glass-lens">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </>
  );
}
