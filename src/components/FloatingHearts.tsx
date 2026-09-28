import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
  depth: number; // 0 to 1, where 1 is closest (foreground) and 0 is furthest (background)
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate static hearts on mount with 3D attributes
    const newHearts = Array.from({ length: 35 }).map((_, i) => {
      const depth = Math.random(); // 0 to 1
      return {
        id: i,
        x: Math.random() * 100, // random percentage for left
        size: depth * 30 + 10, // size between 10 and 40 based on depth
        duration: (1 - depth) * 15 + 10, // duration between 10s and 25s (closer = faster)
        delay: Math.random() * 10, // delay up to 10s
        blur: (1 - depth) * 4, // 0 to 4px blur
        opacity: depth * 0.4 + 0.1, // 0.1 to 0.5 opacity
        depth,
      };
    });
    setHearts(newHearts);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -1 and 1
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-romantic-50/50 via-romantic-100/50 to-romantic-200/50"></div>
      
       {hearts.map((heart) => {
         const parallaxX = mousePos.x * heart.depth * 30;

        return (
          <motion.div
            key={heart.id}
            className="absolute text-romantic-400"
            style={{ 
              left: `${heart.x}%`, 
              bottom: '-10%',
              filter: `blur(${heart.blur}px)`,
              opacity: heart.opacity,
              zIndex: Math.round(heart.depth * 10)
            }}
            animate={{
              y: ['0vh', '-120vh'],
              x: [parallaxX, parallaxX + 30, parallaxX - 30, parallaxX],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              y: {
                duration: heart.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: heart.delay,
              },
              x: {
                duration: heart.duration / 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: heart.delay,
              },
              rotate: {
                duration: heart.duration / 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: heart.delay,
              },
            }}
          >
            <Heart fill="currentColor" size={heart.size} />
          </motion.div>
        );
      })}
    </div>
  );
}
