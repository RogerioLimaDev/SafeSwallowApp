import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Droplets, CheckCircle2, Loader2 } from 'lucide-react';
import { MissionStep, PostureMetrics } from '../../types';
import { getCharacterAsset, CharacterRenderer, CharacterType, getLevelColor, darkenColor } from '../../services/assetService';

interface MissionOverlayProps {
  currentStep: MissionStep;
  currentLevel: number;
  metrics: PostureMetrics;
  postureTimer: number;
  waterProgress: number;
  headTiltTimer: number;
  isVerifyingWater: boolean;
  isVerifyingTongue: boolean;
  isCelebrating: boolean;
  countdown: number | null;
  onVerifyWater: (skipAI?: boolean) => void;
  onVerifyTongue: (skipAI?: boolean) => void;
  onSuccess: () => void;
  onStepAdvance: (step: MissionStep) => void;
}

const OVERLAY_BORDER_RADIUS = '8px';

export const MissionOverlay: React.FC<MissionOverlayProps> = ({
  currentStep,
  currentLevel,
  metrics,
  postureTimer,
  waterProgress,
  headTiltTimer,
  isVerifyingWater,
  isVerifyingTongue,
  isCelebrating,
  countdown,
  onVerifyWater,
  onVerifyTongue,
  onSuccess,
  onStepAdvance
}) => {
  // Use a ref to track the current step and avoid unnecessary effect triggers
  // and a synchronous state update to prevent flickering
  const [lastStep, setLastStep] = useState(currentStep);
  const [isIntroActive, setIsIntroActive] = useState(currentStep === 'WATER' || currentStep === 'TONGUE');

  if (lastStep !== currentStep) {
    setLastStep(currentStep);
    setIsIntroActive(currentStep === 'WATER' || currentStep === 'TONGUE');
  }

  useEffect(() => {
    if (currentStep === 'WATER' || currentStep === 'TONGUE') {
      // Ensure it's active when the step starts
      setIsIntroActive(true);
      const timer = setTimeout(() => {
        setIsIntroActive(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsIntroActive(false);
    }
  }, [currentStep]);

  const isMissionStep = ['POSTURE', 'WATER', 'TONGUE', 'SWALLOW'].includes(currentStep);

  if (!isMissionStep && !isCelebrating) return null;

  // Helper to get character asset based on current state and level
  const getCharacterConfig = () => {
    let type: CharacterType = 'NORMAL';
    
    if (isCelebrating) {
      type = 'CELEBRATION';
    } else if (isVerifyingWater || isVerifyingTongue || countdown !== null) {
      type = 'CHECKING';
    } else if (currentStep === 'POSTURE') {
      type = 'POSTURE';
    } else if (currentStep === 'TONGUE') {
      type = 'TONGUE';
    } else if (currentStep === 'SWALLOW') {
      type = 'SWALLOWING';
    }
    
    return getCharacterAsset(currentLevel, type);
  };

  const levelColor = getLevelColor(currentLevel);

  const stepConfig = {
    POSTURE: {
      title: 'Etapa 1: preparando o corpo.',
      instruction: 'Mantenha a coluna reta.',
      color: levelColor,
      icon: <Smile className="w-6 h-6" />,
      progress: (postureTimer / 60) * 100,
      status: metrics.isStraight ? 'MANTENDO...' : 'FIQUE RETO!'
    },
    WATER: {
      title: 'Etapa 2: água mágica',
      instruction: 'Dê um grande gole de água.',
      color: levelColor,
      icon: <Droplets className="w-6 h-6" />,
      progress: (waterProgress / 1) * 100,
      status: `BEBA!`
    },
    TONGUE: {
      title: 'Etapa 3: colocar na língua.',
      instruction: 'Coloque a língua para fora e ponha o comprimido sobre ela.',
      color: levelColor,
      icon: <Smile className="w-6 h-6" />,
      progress: 0,
      status: 'MOSTRE PARA O ROBÔ!'
    },
    SWALLOW: {
      title: 'Etapa 4: hora de engolir.',
      instruction: 'Coloque a água na boca, levante a cabeça e engula o comprimido.',
      color: levelColor,
      icon: <CheckCircle2 className="w-6 h-6" />,
      progress: (headTiltTimer / 45) * 100,
      status: metrics.headAngle > 18 ? 'ISSO! MANTENHA!' : 'MAIS ALTO! (>18°)'
    }
  }[currentStep as keyof typeof stepConfig] || {
    title: '',
    instruction: '',
    color: levelColor,
    icon: null,
    progress: 0,
    status: ''
  };

  // Determine if character should be hidden (only during WATER action phase)
  const shouldHideCharacter = currentStep === 'WATER' && !isIntroActive && !isCelebrating;

  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {/* Top Bar - Always visible during mission steps, except during celebration */}
      <AnimatePresence>
        {!isCelebrating && (
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-center">
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="w-full max-w-md px-8 py-4 flex items-center justify-center"
              style={{ backgroundColor: stepConfig.color, borderRadius: OVERLAY_BORDER_RADIUS }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-baruta text-white text-base sm:text-xl leading-none uppercase">
                    {currentStep === 'WATER' ? stepConfig.title : stepConfig.title}
                  </h3>
                </div>
              </div>

              {/* Progress Bar in Top Bar - Only for steps that need it and aren't WATER */}
              {stepConfig.progress > 0 && currentStep !== 'WATER' && (
                <div className="ml-4 w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-white"
                    animate={{ width: `${stepConfig.progress}%` }}
                  />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Tarja - For all mission steps */}
      {isMissionStep && (
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <img 
            src="/images/tarja_botton_1.png" 
            alt="Tarja Bottom" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Character Display */}
      <div className="absolute bottom-0 left-0 w-32 sm:w-52 h-44 sm:h-64 pointer-events-none z-20 flex items-end justify-center translate-y-[10px]">
        <AnimatePresence mode="wait">
          {!shouldHideCharacter && (
            <motion.div 
              key={
                currentStep === 'POSTURE' && !isCelebrating
                  ? `posture-${currentLevel}` 
                  : `stable-char-${currentLevel}` // Key depends on level to force re-render
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-end justify-center pb-2.5"
            >
              <CharacterRenderer 
                config={getCharacterConfig()} 
                className="w-full h-full object-contain"
                alt="Character"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Water Glasses Progress - Shown after intro in WATER step */}
      <AnimatePresence>
        {currentStep === 'WATER' && !isIntroActive && !isCelebrating && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 z-30 flex gap-2 items-end"
          >
            {[1].map((index) => {
              const isDrunk = index <= waterProgress;
              return (
                <div key={`glass-slot-${index}`} className="relative w-12 h-16 sm:w-16 sm:h-20">
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={isDrunk ? 'empty' : 'full'}
                      src={isDrunk ? "/images/CopoVazio.png" : "/images/copoCheio.png"}
                      alt={`Copo ${index}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        // Only delay the initial entrance of full glasses
                        delay: (!isDrunk && waterProgress === 0) ? index * 0.1 : 0
                      }}
                      className="absolute inset-0 w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speech Bubble for Instructions or Celebration */}
      <AnimatePresence>
        {(isCelebrating || 
          ((currentStep === 'WATER' || currentStep === 'TONGUE') && isIntroActive) ||
          (currentStep === 'POSTURE' && !isCelebrating) ||
          (currentStep === 'SWALLOW' && !isCelebrating)
        ) && (
          <motion.div 
            initial={{ scale: 0, x: -20, y: 20 }}
            animate={{ scale: 1, x: 30, y: -30 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="absolute bottom-[100px] left-20 sm:bottom-[155px] sm:left-36 z-20"
          >
            <div 
              className="relative rounded-[20px] px-5 py-3 sm:px-8 sm:py-4 border-2 border-white/30 min-w-[140px] sm:min-w-[200px] max-w-[180px] sm:max-w-[260px]"
              style={{ backgroundColor: stepConfig.color }}
            >
              {/* Tail of the bubble pointing to the character */}
              <div 
                className="absolute -bottom-5 left-2 w-8 h-10" 
                style={{ 
                  backgroundColor: stepConfig.color,
                  clipPath: 'polygon(20% 0, 100% 0, 0% 100%)' 
                }}
              />
              <div className="relative z-10 flex items-center justify-center">
                <span className="font-baruta text-white text-xs sm:text-base font-bold text-left leading-tight">
                  {isCelebrating ? "Muito bem!!!" : stepConfig.instruction}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    <AnimatePresence>
        {countdown !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-brand-orange/90 text-white font-baruta text-4xl sm:text-5xl rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center border-4 border-white animate-pulse">
              {countdown === 0 ? "📸" : countdown}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons / Status */}
      <div className="absolute bottom-8 right-8 pointer-events-auto flex flex-col gap-2 items-end">
        {currentStep === 'WATER' && !isIntroActive && !isCelebrating && (
          <button 
            onClick={() => onVerifyWater(false)}
            disabled={isVerifyingWater || countdown !== null}
            className="relative text-white font-baruta font-bold rounded-[40px] px-6 py-3 text-sm flex items-center gap-2 min-w-[160px] justify-center transition-all duration-100 active:translate-y-1"
            style={{ 
              backgroundColor: levelColor
            }}
          >
            {isVerifyingWater ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>CHECANDO...</span>
              </>
            ) : countdown !== null ? (
              `CHECANDO... ${countdown}`
            ) : (
              "BEBA!"
            )}
          </button>
        )}
        {currentStep === 'TONGUE' && !isIntroActive && !isCelebrating && (
          <button 
            onClick={() => onVerifyTongue(false)}
            disabled={isVerifyingTongue || countdown !== null}
            className="relative text-white font-baruta font-bold rounded-[40px] px-6 py-3 text-sm flex items-center gap-2 min-w-[160px] justify-center transition-all duration-100 active:translate-y-1"
            style={{ 
              backgroundColor: levelColor
            }}
          >
            {isVerifyingTongue ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                <span>CHECANDO...</span>
              </>
            ) : countdown !== null ? (
              `CHECANDO... ${countdown}`
            ) : (
              "ESTOU MOSTRANDO!"
            )}
          </button>
        )}
        {currentStep === 'SWALLOW' && (
          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <p className="text-white font-baruta text-[10px] tracking-widest uppercase">
              {stepConfig.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
