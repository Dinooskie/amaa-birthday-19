import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useRef } from 'react';
import { config } from '../config';

interface QuestionScreenProps {
  onYes: () => void;
}

export function QuestionScreen({ onYes }: QuestionScreenProps) {
  const [noClicks, setNoClicks] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noText = noClicks < config.noButtonTexts.length 
    ? config.noButtonTexts[noClicks] 
    : config.noButtonTexts[config.noButtonTexts.length - 1];

  const handleNoHoverOrClick = () => {
    setNoClicks(prev => prev + 1);
    
    if (noButtonRef.current) {
       const btnRect = noButtonRef.current.getBoundingClientRect();
      
      // Calculate max safe movement based on viewport to avoid scrolling
      const maxX = window.innerWidth - btnRect.width - 40; // 40px padding
      const maxY = window.innerHeight - btnRect.height - 40;
      
      // Random position within safe bounds
      const randomX = Math.max(20, Math.random() * maxX);
      const randomY = Math.max(20, Math.random() * maxY);
      
      // Convert to relative coordinates from the initial position
      // Actually, absolute fixed positioning is easier to keep it on screen
      setNoPosition({ x: randomX, y: randomY });
    }
  };

  // Base scale for YES button increases with each NO click
  const yesScale = 1 + (noClicks * 0.15);
  // NO button shrinks
  const noScale = Math.max(0.2, 1 - (noClicks * 0.1));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 overflow-hidden"
      ref={containerRef}
    >
      <motion.div
        className="glass-card p-8 md:p-12 max-w-lg w-full text-center flex flex-col items-center z-20 relative"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <div className="w-40 h-40 mx-auto rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center relative">
             <motion.div
               animate={{ scale: [1, 1.1, 1] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             >
                <Heart className="text-romantic-500 drop-shadow-md" size={80} fill="currentColor" />
             </motion.div>
          </div>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8 font-serif leading-relaxed">
          {config.girlfriendName}, {config.questionText}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full h-40 relative">
          <motion.button
            onClick={onYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className="bg-romantic-500 hover:bg-romantic-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-shadow z-30"
          >
            YES ❤️
          </motion.button>

          <motion.button
            ref={noButtonRef}
            onClick={handleNoHoverOrClick}
            onMouseEnter={() => {
              if (window.matchMedia("(hover: hover)").matches) {
                 handleNoHoverOrClick();
              }
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNoHoverOrClick();
            }}
            animate={
              noClicks > 0 
                ? { x: noPosition.x, y: noPosition.y, scale: noScale } 
                : { x: 0, y: 0, scale: 1 }
            }
            style={{
              position: noClicks > 0 ? 'fixed' : 'relative',
              left: noClicks > 0 ? 0 : 'auto',
              top: noClicks > 0 ? 0 : 'auto',
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-4 px-8 rounded-full shadow-md z-50 whitespace-nowrap"
          >
            {noText}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
