function InteractiveGrid() {
  const canvasRef = React.useRef(null);
  const mousePos = React.useRef({ x: 0, y: 0 });
  const animationFrameRef = React.useRef(null);
  const lastDrawTime = React.useRef(0);
  const { GRID_SETTINGS, ANIMATION } = window.APP_CONSTANTS;
  const throttleDelay = GRID_SETTINGS.THROTTLE_DELAY;
  const isVisible = React.useRef(false);
  const isPaused = React.useRef(false);
  const lastMouseMove = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const { GRID_SETTINGS } = window.APP_CONSTANTS;
    const { SIZE: gridSize, INFLUENCE_RADIUS: influenceRadius } = GRID_SETTINGS;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMove.current < ANIMATION.MOUSE_THROTTLE) return;
      lastMouseMove.current = now;
      
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Resume animation on mouse move
      isPaused.current = false;
    };

    const draw = (timestamp) => {
      if (!isVisible.current || isPaused.current) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      if (timestamp - lastDrawTime.current < throttleDelay) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDrawTime.current = timestamp;

      ctx.clearRect(0, 0, width, height);

      const mouse = mousePos.current;

      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < influenceRadius) {
            const intensity = 1 - (distance / influenceRadius);
            const offset = intensity * 20;
            
            const newX = x + (dx / distance) * offset;
            const newY = y + (dy / distance) * offset;
            
            // Draw red glow point
            ctx.beginPath();
            ctx.arc(newX, newY, 2 + intensity * 4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 0, 0, ${0.5 + intensity * 0.5})`;
            ctx.fill();
            
            // Red connections
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.4 + intensity * 0.6})`;
            ctx.lineWidth = 1.5 + intensity * 2;
            
            if (x + gridSize <= width) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(x + gridSize, y);
              ctx.stroke();
            }
            
            if (y + gridSize <= height) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(x, y + gridSize);
              ctx.stroke();
            }
          } else {
            ctx.strokeStyle = 'rgba(250, 250, 250, 0.15)';
            ctx.lineWidth = 1;
            
            if (x + gridSize <= width) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + gridSize, y);
              ctx.stroke();
            }
            
            if (y + gridSize <= height) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + gridSize);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          isPaused.current = true;
        }
      });
    }, { threshold: 0.1 });

    if (canvas) {
      observer.observe(canvas);
    }
    
    const pauseTimer = setInterval(() => {
      if (Date.now() - lastMouseMove.current > ANIMATION.PAUSE_TIMEOUT) {
        isPaused.current = true;
      }
    }, 1000);
    
    draw();

    return () => {
      observer.disconnect();
      clearInterval(pauseTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none hidden md:block"
      style={{ display: window.innerWidth < 768 ? 'none' : 'block' }}
      data-name="interactive-grid"
      data-file="components/InteractiveGrid.js"
    />
  );
}
