import React, { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationId: number;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      setTrail(prevTrail => {
        const newPoint: TrailPoint = {
          x: e.clientX,
          y: e.clientY,
          id: trailId++
        };
        
        // Keep only the last 15 points for a smooth trail
        const updatedTrail = [...prevTrail, newPoint].slice(-15);
        return updatedTrail;
      });
    };

    const animateTrail = () => {
      setTrail(prevTrail => {
        // Remove old points gradually
        return prevTrail.filter((_, index) => index >= prevTrail.length - 12);
      });
      animationId = requestAnimationFrame(animateTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor dot */}
      <div
        className="fixed w-3 h-3 bg-orange-500 rounded-full mix-blend-difference transition-transform duration-75 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          boxShadow: '0 0 10px rgba(249, 115, 22, 0.8), 0 0 20px rgba(249, 115, 22, 0.4)',
        }}
      />
      
      {/* Trail points */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const size = 2 + (opacity * 4);
        const delay = index * 50;
        
        return (
          <div
            key={point.id}
            className="fixed rounded-full bg-orange-400 transition-all duration-300 ease-out"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              opacity: opacity * 0.6,
              boxShadow: `0 0 ${size * 2}px rgba(249, 115, 22, ${opacity * 0.5})`,
              transform: `scale(${opacity})`,
              transitionDelay: `${delay}ms`,
            }}
          />
        );
      })}
      
      {/* Outer ring that follows cursor */}
      <div
        className="fixed w-8 h-8 border border-orange-500/30 rounded-full transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default CursorTrail;