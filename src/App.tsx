import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BlowCandlesScreen } from './components/BlowCandlesScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { LoveMessage } from './components/LoveMessage';
import { MemoriesSection } from './components/MemoriesSection';
import { MemoriesCarousel } from './components/MemoriesCarousel';
import { FinalSection } from './components/FinalSection';
import { FloatingHearts } from './components/FloatingHearts';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'blowCandles' | 'celebration'>('welcome');

  const handleStart = () => {
    setStep('blowCandles');
  };

  const handleBlowComplete = () => {
    setStep('celebration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    setStep('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        
        {step === 'blowCandles' && (
          <BlowCandlesScreen key="blowCandles" onComplete={handleBlowComplete} />
        )}
      </AnimatePresence>

      {step === 'celebration' && (
        <div className="flex flex-col w-full">
          <CelebrationScreen />
          <LoveMessage />
          <MemoriesSection />
          <MemoriesCarousel />
          <FinalSection onReplay={handleReplay} />
        </div>
      )}
    </div>
  );
}
