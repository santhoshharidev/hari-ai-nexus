
import { useEffect, useRef, useState } from 'react';

const MagicalCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const smoothPosition = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Smooth cursor animation
    const animateCursor = () => {
      if (cursorRef.current && trailRef.current) {
        // Smooth interpolation for main cursor
        smoothPosition.current.x += (mousePosition.x - smoothPosition.current.x) * 0.15;
        smoothPosition.current.y += (mousePosition.y - smoothPosition.current.y) * 0.15;

        cursorRef.current.style.transform = `translate(${smoothPosition.current.x - 10}px, ${smoothPosition.current.y - 10}px)`;
        
        // Trail follows with more delay
        const trailX = smoothPosition.current.x + (mousePosition.x - smoothPosition.current.x) * 0.05;
        const trailY = smoothPosition.current.y + (mousePosition.y - smoothPosition.current.y) * 0.05;
        
        trailRef.current.style.transform = `translate(${trailX - 20}px, ${trailY - 20}px)`;
      }
      
      animationId.current = requestAnimationFrame(animateCursor);
    };

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);
    animationId.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Cursor trail */}
      <div
        ref={trailRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, rgba(255, 215, 0, 0.1) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)',
        }}
      />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10000] transition-all duration-200 ${
          isHovering ? 'scale-125' : 'scale-100'
        }`}
        style={{
          width: '20px',
          height: '20px',
          background: 'linear-gradient(45deg, #FFD700, #FFA500, #FF6347)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.3)',
          border: '2px solid rgba(255, 215, 0, 0.6)',
        }}
      >
        {/* Royal pattern overlay */}
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 2px, transparent 2px),
              radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
              radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '8px 8px, 6px 6px, 10px 10px',
          }}
        />
        
        {/* Sparkle effects */}
        <div className="absolute -inset-2">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-0 w-0.5 h-0.5 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </>
  );
};

export default MagicalCursor;
