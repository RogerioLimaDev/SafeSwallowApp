import React from 'react';
import { motion } from 'motion/react';
import { MissionStep, PillSize } from '../../types';

interface CandyBoxSelectProps {
  setPillSize: (size: PillSize) => void;
  onNext: (step: MissionStep) => void;
  unlockedLevels: number;
  onSelectLevel: (level: number) => void;
}

export const CandyBoxSelect: React.FC<CandyBoxSelectProps> = ({ setPillSize, onNext, unlockedLevels, onSelectLevel }) => {
  const BOX_PADDING = '4px';

  // Middle: Grid of Boxes - further reduced vertical size to bring rows closer
  const boxes = React.useMemo(() => [...Array(7)].map((_, i) => {
    const boxNumber = i + 1;
    const isUnlocked = boxNumber <= unlockedLevels;
    
    return (
      <button 
        key={`box-${i}`}
        disabled={!isUnlocked}
        onClick={() => {
          onSelectLevel(boxNumber);
          setPillSize('SMALL');
          onNext('CAMERA_INVITE');
        }}
        className={`w-full h-full flex items-center justify-center transition-all ${
          isUnlocked 
            ? "hover:scale-105 active:scale-95 cursor-pointer" 
            : "grayscale opacity-60 cursor-not-allowed"
        }`}
        style={{ padding: BOX_PADDING }}
      >
        <img 
          src={`/images/Caixas/Caixa${boxNumber}.png`} 
          alt={`Caixa ${boxNumber}`} 
          className="max-w-full max-h-full w-auto h-auto object-contain"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => console.error(`Failed to load Caixa${boxNumber}.png`)}
        />
      </button>
    );
  }), [unlockedLevels, onSelectLevel, setPillSize, onNext, BOX_PADDING]);

  return (
    <motion.div 
      key="candy-box-select"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex flex-col items-center justify-between px-4 py-8 pb-[max(4rem,env(safe-area-inset-bottom,4rem))]"
    >
      {/* Top spacer for logo in background */}
      <div className="h-[15%]" />

      {/* Middle: Grid of Boxes - further reduced vertical size to bring rows closer */}
      <div className="relative w-full max-w-5xl flex-grow flex items-center justify-center px-4">
        <div className="grid grid-cols-4 grid-rows-2 gap-0 w-full h-full max-h-[40vh]">
          {/* First Cell: Instruction Text */}
          <div 
            className="flex items-center justify-center h-full"
            style={{ padding: BOX_PADDING }}
          >
            <div className="font-baruta text-base sm:text-lg text-white leading-[0.85] text-left">
              CLIQUE<br />
              <span className="whitespace-nowrap">NA CAIXA</span><br />
              PARA JOGAR
            </div>
          </div>

          {/* Remaining 7 Cells: Pill Boxes */}
          {boxes}
        </div>
      </div>

      {/* Bottom spacer - increased to prevent collision with character */}
      <div className="h-[25%]" />
    </motion.div>
  );
};
