import React, { useEffect, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

/**
 * Custom cursor with a short comet tail.
 *
 * Only mounts for a real pointer that has not asked for reduced motion. On
 * touch, or with reduced motion on, the system cursor is left alone — the CSS
 * that hides it is keyed on the `cursor-trail-active` class this sets.
 */
const CursorTrail = () => {
  const [enabled, setEnabled] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');

    const read = () => setEnabled(fine.matches && !calm.matches);
    read();

    fine.addEventListener('change', read);
    calm.addEventListener('change', read);
    return () => {
      fine.removeEventListener('change', read);
      calm.removeEventListener('change', read);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('cursor-trail-active', enabled);
    return () => {
      document.documentElement.classList.remove('cursor-trail-active');
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let animationId: number;
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      setTrail((prevTrail) => {
        const newPoint: TrailPoint = {
          x: e.clientX,
          y: e.clientY,
          id: trailId++,
        };
        // Keep only the last 15 points for a smooth trail
        return [...prevTrail, newPoint].slice(-15);
      });
    };

    const animateTrail = () => {
      setTrail((prevTrail) =>
        prevTrail.filter((_, index) => index >= prevTrail.length - 12),
      );
      animationId = requestAnimationFrame(animateTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [enabled]);

  if (!enabled) return null;

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
        const size = 2 + opacity * 4;

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
              transitionDelay: `${index * 50}ms`,
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
