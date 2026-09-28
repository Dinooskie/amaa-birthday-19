import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Sedikit saja biar ringan di HP (tanpa blur & tanpa parallax mouse)
    const newHearts = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random percentage for left
      size: Math.random() * 18 + 10, // size between 10 and 28
      duration: Math.random() * 10 + 14, // duration between 14s and 24s
      delay: Math.random() * 10, // delay up to 10s
      opacity: Math.random() * 0.25 + 0.1, // 0.1 to 0.35 opacity
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-romantic-50/50 via-romantic-100/50 to-romantic-200/50"></div>

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-romantic-400"
          style={{
            left: `${heart.x}%`,
            bottom: '-10%',
            opacity: heart.opacity,
          }}
          animate={{
            y: ['0vh', '-120vh'],
            rotate: [0, 30, -30, 0],
          }}
          transition={{
            y: {
              duration: heart.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: heart.delay,
            },
            rotate: {
              duration: heart.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: heart.delay,
            },
          }}
        >
          <Heart fill="currentColor" size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
}
