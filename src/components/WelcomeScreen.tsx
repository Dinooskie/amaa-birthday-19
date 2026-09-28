import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { config } from '../config';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-card p-10 max-w-sm w-full text-center flex flex-col items-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="bg-romantic-100 p-4 rounded-full mb-6"
        >
          <Heart className="text-romantic-500" size={48} fill="currentColor" />
        </motion.div>

           <h1 className="text-3xl font-bold text-slate-800 mb-2 font-heading">
           Hey, {config.girlfriendName} <span className="text-romantic-500">💕</span>
         </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 font-heading italic">
            Hai sayang, aku siapin surprise spesial buat hari ulang tahun kamu♡
          </p>

        <button
          onClick={onStart}
             className="relative overflow-hidden group bg-romantic-500 hover:bg-romantic-600 text-white font-body py-4 px-8 rounded-full shadow-[0_4px_14px_0_rgba(166,124,109,0.39)] hover:shadow-[0_6px_20px_rgba(166,124,109,0.23)] transition-all duration-300 w-full"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Buka Surprise!
          </span>
          <div className="absolute inset-0 h-full w-full bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-out"></div>
        </button>
      </motion.div>
    </motion.div>
  );
}
