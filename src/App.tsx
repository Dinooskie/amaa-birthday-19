import { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { CelebrationScreen } from './components/CelebrationScreen';
import { LoveMessage } from './components/LoveMessage';
import { MemoriesSection } from './components/MemoriesSection';
import { FinalSection } from './components/FinalSection';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicControl } from './components/MusicControl';
import { config } from './config';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [step, setStep] = useState<'welcome' | 'question' | 'celebration'>('welcome');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Auto-play music if allowed, or start it when user interacts
  const handleStart = () => {
    setStep('question');
    setIsMusicPlaying(true);
  };

  const handleYes = () => {
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
      
      {config.musicUrl && (
        <MusicControl 
          url={config.musicUrl} 
          isPlaying={isMusicPlaying} 
          onTogglePlay={() => setIsMusicPlaying(!isMusicPlaying)} 
          startTime={config.musicStartTime}
        />
      )}

      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        
        {step === 'question' && (
          <QuestionScreen key="question" onYes={handleYes} />
        )}
      </AnimatePresence>

      {step === 'celebration' && (
        <div className="flex flex-col w-full">
          <CelebrationScreen />
          <LoveMessage />
          <MemoriesSection />
          <FinalSection onReplay={handleReplay} />
        </div>
      )}
    </div>
  );
}
