import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { config } from '../config';

export function LoveMessage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  const fullText = config.loveMessage;

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
        if (i >= fullText.length) {
          clearInterval(intervalId);
        }
      }, 50); // Speed of typewriter

      return () => clearInterval(intervalId);
    }
  }, [isInView, fullText]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 relative z-10" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 md:p-14 max-w-2xl w-full text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-romantic-200 via-romantic-400 to-romantic-200"></div>
        
        <div className="min-h-37.5 flex items-center justify-center">
           <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-heading whitespace-pre-wrap text-left inline-block">
            {displayedText}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 bg-romantic-500 h-6 ml-1 align-middle"
            />
          </p>
        </div>
      </motion.div>
    </div>
  );
}
