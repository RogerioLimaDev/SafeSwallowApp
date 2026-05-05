import React from 'react';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getCharacterAsset } from '../../services/assetService';

interface SuccessScreenProps {
  onReset: () => void;
  currentLevel: number;
  isLastLevel?: boolean;
  completionCounts: Record<number, number>;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset, currentLevel, isLastLevel, completionCounts }) => {
  React.useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const BLUE_COLOR = '#4E8DFF';

  // Graduation check: All 7 levels must have been completed at least 3 times
  const allLevelsCompletedThreeTimes = [1, 2, 3, 4, 5, 6, 7].every(
    level => (completionCounts[level] || 0) >= 3
  );

  const isGraduation = currentLevel === 7 && allLevelsCompletedThreeTimes;

  let title = "Muito bem!";
  let message = "Você já conseguiu uma vez. Agora, complete o desafio de engolir esse tamanho mais 2 vezes seguidas e depois jogue a próxima fase!";

  if (isGraduation) {
    title = "Parabéns! Você completou o desafio!";
    message = "Agora você já sabe engolir comprimidos!";
  } else if (currentLevel === 7) {
    title = "Parabéns! Nível 7 completo!";
    message = "Você chegou ao último nível! Agora, para se tornar um mestre, complete cada fase do jogo pelo menos 3 vezes.";
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex flex-col items-center justify-center p-8"
    >
      {/* Speech Bubble */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative rounded-[40px] px-6 py-10 flex flex-col items-center justify-center gap-8 translate-y-[-40px]"
        style={{ 
          backgroundColor: BLUE_COLOR,
          width: 'min(480px, 85vw)',
          height: 'min(360px, 65vw)'
        }}
      >
        {/* Bubble Tail - Sharp triangle pointing towards character */}
        <div 
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-20 h-20" 
          style={{ 
            backgroundColor: BLUE_COLOR,
            clipPath: 'polygon(40% 0, 90% 0, 20% 100%)' 
          }}
        />
        
        <div className="relative z-10 w-full text-left pl-4 pr-0">
          <h3 className="font-outfit font-bold text-[24px] sm:text-[29px] text-white leading-tight mb-4">
            {title}
          </h3>
          <p className="font-outfit font-bold text-[18px] sm:text-[22px] text-white leading-tight">
            {message}
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-10 right-6 w-full max-w-[180px]">
        <button 
          onClick={onReset}
          className="relative w-full text-white font-baruta font-bold text-lg py-3 flex items-center justify-center gap-2 !rounded-[16px] transition-all duration-100 active:translate-y-[2px] active:translate-x-[1px] active:shadow-none"
          style={{ 
            backgroundColor: '#fbc660',
            boxShadow: '2px 3px 0px #dfa525'
          }}
        >
          <span>FINALIZAR</span>
        </button>
      </div>
    </motion.div>
  );
};
