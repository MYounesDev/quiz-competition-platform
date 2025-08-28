'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create bubbles
    const bubbles: Bubble[] = [];
    const bubbleCount = Math.floor(window.innerWidth / 100); // Responsive bubble count

    for (let i = 0; i < bubbleCount; i++) {
      const size = Math.random() * 50 + 20;
      bubbles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: size,
        color: getRandomColor(),
        velocity: {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * 0.5 - 0.25
        },
        opacity: Math.random() * 0.2,
        shape: Math.random() > 0.7 ? 'square' : 'circle'
      });
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update bubbles
      bubbles.forEach(bubble => {
        // Draw bubble
        ctx.beginPath();
        
        if (bubble.shape === 'circle') {
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        } else {
          ctx.rect(
            bubble.x - bubble.radius/2, 
            bubble.y - bubble.radius/2, 
            bubble.radius, 
            bubble.radius
          );
        }
        
        ctx.fillStyle = `${bubble.color}${Math.round(bubble.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Update position
        bubble.x += bubble.velocity.x;
        bubble.y += bubble.velocity.y;
        
        // Boundary check
        if (bubble.x < -bubble.radius) bubble.x = canvas.width + bubble.radius;
        if (bubble.x > canvas.width + bubble.radius) bubble.x = -bubble.radius;
        if (bubble.y < -bubble.radius) bubble.y = canvas.height + bubble.radius;
        if (bubble.y > canvas.height + bubble.radius) bubble.y = -bubble.radius;
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

// Helper function to generate random colors
function getRandomColor() {
  const colors = [
    '#ff6bcb', // Pink
    '#7c3aed', // Purple
    '#3b82f6', // Blue
    '#ec4899', // Fuchsia
    '#8b5cf6'  // Violet
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Types for bubbles
interface Bubble {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
  opacity: number;
  shape: 'circle' | 'square';
}

export default AnimatedBackground;
