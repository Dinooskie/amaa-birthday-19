import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { config } from '../config';
import { useEffect, useState } from 'react';

export function CelebrationScreen() {
  const [explosionHearts, setExplosionHearts] = useState<{ id: number; x: number; y: number; scale: number; rotation: number }[]>([]);

  useEffect(() => {
    // Generate heart explosion (dikurangi biar ringan di HP)
    const hearts = Array.from({ length: 15 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 50;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
      };
    });
    setExplosionHearts(hearts);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative"
    >
      {/* Heart Explosion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
        {explosionHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ 
              x: heart.x, 
              y: heart.y, 
              scale: heart.scale,
              rotate: heart.rotation,
              opacity: 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-romantic-500"
          >
            <Heart fill="currentColor" size={24} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="z-10 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6 relative"
        >
          <Heart className="text-romantic-500 drop-shadow-xl" size={80} fill="currentColor" />
          <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             className="absolute -top-4 -right-4 text-yellow-400"
          >
             <Sparkles size={32} />
          </motion.div>
        </motion.div>

         <h1 className="text-4xl md:text-5xl font-bold text-romantic-600 mb-4 font-heading">
          {config.celebrationTitle}
        </h1>
         <p className="text-xl md:text-2xl text-romantic-600 mb-4 font-heading">
          {config.celebrationSubtitle}
        </p>
        
        <div className="w-64 h-64 mx-auto rounded-full bg-white/20 backdrop-blur-xl border-4 border-white/40 shadow-[0_0_50px_rgba(166,124,109,0.5)] flex items-center justify-center mb-8 relative">
           <motion.div
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
               <Heart className="text-romantic-500 drop-shadow-[0_0_30px_rgba(166,124,109,0.8)]" size={120} fill="currentColor" />
           </motion.div>
           <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 rounded-full border-2 border-dashed border-romantic-300 opacity-50"
           />
           <motion.div
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute -inset-4 rounded-full border border-romantic-200 opacity-30"
           />
        </div>

         <p className="text-lg md:text-xl text-romantic-500 font-body italic">
          "{config.celebrationMessage}"
        </p>
      </motion.div>
    </motion.div>
  );
}
