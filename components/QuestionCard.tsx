import React, { useState, useRef, useEffect } from 'react';
import { ButtonStyle } from '../types';

interface QuestionCardProps {
  onYes: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ onYes }) => {
  const [noBtnStyle, setNoBtnStyle] = useState<ButtonStyle>({ position: 'static' });
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [positionIndex, setPositionIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Measure container height initially to prevent layout shift when button goes absolute
  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const moveNoButton = () => {
    const btn = noBtnRef.current;
    if (!btn) return;

    // Viewport dimensions
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Button dimensions
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    
    // Padding from edges
    const pad = 40;
    
    // Define 4 fixed positions (Corners)
    // The button cycles through these positions:
    // 1. Top Right
    // 2. Bottom Right
    // 3. Bottom Left
    // 4. Top Left
    const positions = [
      { left: w - btnWidth - pad, top: pad },               // Top Right
      { left: w - btnWidth - pad, top: h - btnHeight - pad }, // Bottom Right
      { left: pad, top: h - btnHeight - pad },                // Bottom Left
      { left: pad, top: pad }                                 // Top Left
    ];

    // Get the next position based on the index
    const currentPos = positions[positionIndex % positions.length];

    setNoBtnStyle({
      position: 'fixed',
      left: currentPos.left,
      top: currentPos.top,
    });
    
    // Increment index for next time
    setPositionIndex(prev => prev + 1);
  };

  return (
    <div 
      ref={containerRef}
      // REMOVED: transform transition-all hover:scale-[1.01] 
      // Removing transform is CRITICAL so that position:fixed children are relative to the viewport, not this div.
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border-4 border-white"
      style={{ minHeight: containerHeight ? `${containerHeight}px` : 'auto' }}
    >
      <div className="mb-6 rounded-xl overflow-hidden shadow-lg mx-auto w-full max-w-[300px]">
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVlMmI0MTY5ZDBlYjY3ZGU3OTE2NzcyNTc5OTJiNDg1ODk1ODc4OCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/MDJ9IbxxvDUQM/giphy.gif" 
          alt="Cute Cat Asking"
          className="w-full h-auto object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold text-pink-600 mb-8 leading-tight">
        Will you be my Valentine? 🌹
      </h1>

      <div className="flex justify-center items-center gap-6 relative">
        <button
          onClick={onYes}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition-transform hover:scale-110 active:scale-95 focus:outline-none ring-4 ring-rose-200"
        >
          Yes! 💖
        </button>

        <button
          ref={noBtnRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          style={
            noBtnStyle.position === 'fixed'
              ? {
                  position: 'fixed',
                  left: noBtnStyle.left,
                  top: noBtnStyle.top,
                  zIndex: 9999, // Ensure it sits on top of everything
                }
              : {}
          }
          className={`
            bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-8 rounded-full text-xl shadow-md transition-all duration-300 ease-out
            ${noBtnStyle.position === 'fixed' ? '' : ''}
          `}
        >
          No 😢
        </button>
      </div>
    </div>
  );
};