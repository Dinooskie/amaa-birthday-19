import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { config } from '../config';

interface BlowCandlesScreenProps {
  onComplete: () => void;
}

export function BlowCandlesScreen({ onComplete }: BlowCandlesScreenProps) {
  const candleCount = config.blowCandles?.candleCount ?? 5;
  const [blown, setBlown] = useState<boolean[]>(() =>
    Array.from({ length: candleCount }, () => false)
  );

  const blownCount = blown.filter(Boolean).length;
  const allBlown = blownCount === candleCount;

  useEffect(() => {
    if (!allBlown) return;
    const t = setTimeout(onComplete, 3200);
    return () => clearTimeout(t);
  }, [allBlown, onComplete]);

  const blowOne = (index: number) => {
    setBlown((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const blowAll = () => {
    setBlown(Array.from({ length: candleCount }, () => true));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10"
    >
      <motion.div className="glass-card p-8 md:p-12 max-w-lg w-full text-center flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 font-heading">
          {config.blowCandles?.title ?? 'Saatnya Tiup Lilin!'}
        </h2>
        <p className="text-base md:text-lg text-slate-600 mb-2 font-heading italic leading-relaxed">
          {config.blowCandles?.wishPrompt ??
            'Tutup matamu sebentar, ucapkan keinginan dalam hati, lalu tiup semua lilinnya...'}
        </p>

        {/* Kue ulang tahun */}
        <div className="relative mt-8 mb-2 flex flex-col items-center" aria-label="Kue ulang tahun">
          {/* Lilin */}
          <div className="flex justify-center items-end gap-3 md:gap-4 -mb-2 z-10">
            {blown.map((isBlown, i) => (
              <button
                key={i}
                type="button"
                onClick={() => blowOne(i)}
                aria-label={`Tiup lilin ${i + 1}`}
                className="flex flex-col items-center cursor-pointer focus:outline-none group"
              >
                <span className="h-9 flex items-start justify-center">
                  {!isBlown ? (
                    <motion.span
                      animate={{ scale: [1, 1.15, 0.92, 1.08, 1], y: [0, -1, 0] }}
                      transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                      className="block w-4 h-7 rounded-full bg-linear-to-t from-orange-500 via-amber-400 to-yellow-200 shadow-[0_0_12px_4px_rgba(251,191,36,0.55)]"
                    />
                  ) : (
                    <motion.span
                      key={`smoke-${i}`}
                      initial={{ opacity: 0.9, y: 6, scale: 0.6 }}
                      animate={{ opacity: 0, y: -24, scale: 1.3 }}
                      transition={{ duration: 1.6, ease: 'easeOut' }}
                      className="block w-3 h-3 rounded-full bg-slate-400/70 blur-[2px]"
                    />
                  )}
                </span>
                <span className="block w-0.75 h-1.5 bg-slate-700" />
                <span
                  className={`block w-3.5 h-16 rounded-full border border-white/50 shadow-md transition-colors ${
                    isBlown ? 'bg-slate-300' : i % 2 === 0 ? 'bg-romantic-400' : 'bg-romantic-500'
                  } group-hover:brightness-110`}
                  style={
                    !isBlown
                      ? {
                          backgroundImage:
                            'repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 8px)',
                        }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>

          {/* Lapisan atas kue */}
          <div className="w-56 md:w-64 h-6 bg-white rounded-t-2xl border border-white/60 shadow-sm z-0" />
          <div className="w-56 md:w-64 h-20 bg-romantic-200 border-x border-white/40 flex items-center justify-center gap-3">
            {[0, 1, 2, 3, 4].map((d) => (
              <span
                key={d}
                className="w-2 h-2 rounded-full bg-white/80"
                style={{ marginTop: `${(d % 3) * 8}px` }}
              />
            ))}
          </div>
          {/* Krim tengah */}
          <div className="w-64 md:w-72 h-5 bg-white/90 border border-white/60" />
          {/* Lapisan bawah kue */}
          <div className="w-64 md:w-72 h-24 bg-romantic-300 border border-white/40 rounded-b-2xl shadow-inner" />
          {/* Piring */}
          <div className="w-72 md:w-80 h-4 mt-1 bg-white/70 rounded-full shadow-lg" />
        </div>

        {/* Progres */}
        <p className="text-sm text-slate-600 font-body mt-4">
          {blownCount} / {candleCount} {config.blowCandles?.progressText ?? 'lilin sudah padam'}
        </p>
        <div className="w-full h-2 mt-2 bg-romantic-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(blownCount / candleCount) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="h-full bg-romantic-500 rounded-full"
          />
        </div>

        {!allBlown ? (
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-slate-500 font-body">
              {config.blowCandles?.hint ?? 'Ketuk setiap lilin untuk meniupnya 🕯️'}
            </p>
            {blownCount > 0 && (
              <button
                type="button"
                onClick={blowAll}
                className="text-sm text-romantic-600 underline underline-offset-4 hover:text-romantic-500 font-body"
              >
                {config.blowCandles?.blowAllText ?? 'Tiup semuanya sekaligus'}
              </button>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <p className="text-lg text-slate-700 font-heading italic">
              {config.blowCandles?.completeText ?? 'Permintaanmu sudah terkirim ke bintang-bintang ✨'}
            </p>
            <button
              type="button"
              onClick={onComplete}
              className="bg-romantic-500 hover:bg-romantic-600 text-white font-body py-3 px-8 rounded-full shadow-[0_0_20px_rgba(166,124,109,0.5)] transition-shadow"
            >
              {config.blowCandles?.continueText ?? 'Lanjut Rayakan 🎉'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
