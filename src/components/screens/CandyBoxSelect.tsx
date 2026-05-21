import React from 'react';
import { motion } from 'motion/react';
import { MissionStep, PillSize } from '../../types';

interface CandyBoxSelectProps {
  setPillSize: (size: PillSize) => void;
  onNext: (step: MissionStep) => void;
  unlockedLevels: number;
  onSelectLevel: (level: number) => void;
  cameraWasAllowed?: boolean;
  onActivateCamera?: () => void;
}

export const CandyBoxSelect: React.FC<CandyBoxSelectProps> = ({ setPillSize, onNext, unlockedLevels, onSelectLevel, cameraWasAllowed, onActivateCamera }) => {
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
          // Skip camera invite screen if already allowed in previous session
          if (cameraWasAllowed) {
            onActivateCamera?.();
            onNext('POSTURE');
          } else {
            onNext('CAMERA_INVITE');
          }
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
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex flex-col px-4"
    >
      {/* Grid centralizado entre logo (topo) e personagem (baixo) */}
      <div className="absolute inset-0" style={{ top: '4rem', bottom: '4rem' }}>
        <div className="flex flex-col justify-between h-full">

        {/* Middle: Grid of Boxes - centralizado horizontalmente */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center px-4">
          <div className="grid grid-cols-4 grid-rows-2 gap-0 w-full max-h-[40vh]">
            {/* First Cell: Instruction Text */}
            <div 
              className="flex items-center justify-center"
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
        </div>
      </div>

      {/* Personagem - centralizado abaixo do grid */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ bottom: '2.5rem' }}>
        <img 
          src="/images/responsivo/TelaCaixas/PersonagemTelaCaixas.png" 
          alt="Personagem"
          className="h-auto w-auto object-contain"
          style={{ width: 'auto', maxWidth: 'min(50vw, 250px)', maxHeight: '20vh', marginLeft: '10%' }}
        />
      </div>

    </motion.div>
  );
};
