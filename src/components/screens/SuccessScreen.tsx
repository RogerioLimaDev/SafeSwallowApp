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
  let message = "Você já conseguiu uma vez.\nAgora, complete o desafio\nde engolir esse tamanho\nmais 2 vezes seguidas e\ndepois jogue a próxima\nfase!";

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
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex items-center justify-center"
    >
      {/* Container principal com balão e grid */}
      <div className="relative w-full max-w-[600px] h-[500px] sm:h-[600px] flex flex-col">
        {/* Grid com balão (linha 1) e personagem+botão (linha 2) */}
        <div className="grid grid-rows-[auto_1fr] h-full">
          {/* Balão de fala - linha 1 */}
          <div className="justify-self-center mt-4 sm:mt-8">
            {/* Container relativo para balão + flecha */}
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-[40px] px-6 py-8 sm:px-8 sm:py-10 flex items-center justify-center"
                style={{ 
                  backgroundColor: BLUE_COLOR,
                  width: 'min(480px, 85vw)',
                  maxWidth: '480px'
                }}
              >
                <div className="relative z-10 w-auto mx-auto text-left">
                  <h3 className="font-nunito font-semibold text-[24px] sm:text-[32px] text-white leading-tight mb-2 sm:mb-4">
                    {title}
                  </h3>
                  <p className="font-nunito font-semibold text-[18px] sm:text-[24px] text-white leading-tight whitespace-pre-line">
                    {message}
                  </p>
                </div>
              </motion.div>

              {/* Bubble Tail - dentro do container relativo */}
              <div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-12 sm:h-16" 
                style={{ 
                  backgroundColor: BLUE_COLOR,
                  clipPath: 'polygon(40% 0, 90% 0, 20% 100%)' 
                }}
              />
            </div>
          </div>

          {/* Container com personagem e botão lado a lado - linha 2 */}
          <div className="flex items-end justify-center pb-8 sm:pb-12">
            {/* Grid container para manter distância relativa */}
            <div className="grid grid-cols-[auto_auto] items-center gap-x-6 sm:gap-x-12">
              {/* Personagem */}
              <div className="z-10">
                <img 
                  src="/images/responsivo/Telafinal/peronagemTelaFinal.png" 
                  alt="Personagem"
                  className="h-auto w-auto object-contain"
                  style={{ width: 'auto', maxWidth: 'min(50vw, 240px)', maxHeight: '24vh' }}
                />
              </div>
              
              {/* Botão - verticalmente centralizado */}
              <div className="z-20">
                <button 
                  onClick={onReset}
                  className="text-white font-baruta font-bold text-lg py-3 px-8 flex items-center justify-center gap-2 !rounded-[16px] transition-all duration-100 active:translate-y-[2px] active:translate-x-[1px] active:shadow-none"
                  style={{ 
                    backgroundColor: '#ffa341',
                    boxShadow: '2px 3px 0px #dfa525'
                  }}
                >
                  <span>FINALIZAR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
