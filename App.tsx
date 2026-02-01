import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { SuccessCard } from './components/SuccessCard';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

const App: React.FC = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleYesClick = () => {
    setIsAccepted(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-rose-100 to-pink-200">
      {/* Floating Background Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute opacity-20 animate-pulse text-pink-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `scale(${0.5 + Math.random()})`,
              }}
            >
              <Heart fill="currentColor" size={24 + Math.random() * 40} />
            </div>
         ))}
      </div>

      <main className="z-10 w-full max-w-md">
        {isAccepted ? (
          <SuccessCard />
        ) : (
          <QuestionCard onYes={handleYesClick} />
        )}
      </main>
      
      <footer className="absolute bottom-4 text-pink-400 text-sm opacity-60">
        Made with 💖
      </footer>
    </div>
  );
};

export default App;