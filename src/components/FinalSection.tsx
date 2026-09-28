import { motion } from 'motion/react';
import { Heart, RotateCcw } from 'lucide-react';
import { config } from '../config';

interface FinalSectionProps {
  onReplay: () => void;
}

export function FinalSection({ onReplay }: FinalSectionProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-xl w-full"
      >
         <p className="text-xl text-romantic-500 font-body mb-8 uppercase tracking-widest">
           Satu lagi...
         </p>
        
         <h2 className="text-4xl md:text-6xl font-bold text-romantic-600 mb-8 font-heading">
          I LOVE YOU, {config.girlfriendName} 💖
        </h2>
        
         <p className="text-xl md:text-2xl text-slate-700 font-heading mb-12 italic leading-relaxed">
           {config.finalMessage}
         </p>

        <div className="flex flex-col items-center justify-center space-y-6">
           <p className="text-2xl font-heading text-slate-800 italic">
            Dari yang terus berusaha,<br/>
            <span className="font-bold not-italic text-romantic-500 mt-2 block">{config.myName}</span>
          </p>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="my-8"
          >
            <Heart className="text-romantic-500 drop-shadow-lg" size={48} fill="currentColor" />
          </motion.div>

          <button
            onClick={onReplay}
             className="group flex items-center gap-2 bg-white hover:bg-romantic-50 text-romantic-500 font-body py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-romantic-200"
          >
            <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform duration-500" />
            Ulangi Lagi
          </button>
        </div>
      </motion.div>
    </div>
  );
}
