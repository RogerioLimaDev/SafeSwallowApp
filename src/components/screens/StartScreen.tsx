import React from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';

// Sprite Animator Component - CSS Animation
const SpriteAnimator: React.FC<{
  src: string;
  frameCount: number;
  fps: number;
  className?: string;
  alt?: string;
}> = ({ src, frameCount, fps, className = '', alt = 'Sprite' }) => {
  const frameWidth = 267; // Tamanho original do frame
  const frameHeight = 267;
  const spriteWidth = frameCount * frameWidth;
  const spriteHeight = frameHeight;
  const duration = frameCount / fps;

  return (
    <div 
      className={className}
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        overflow: 'hidden',
        backgroundImage: `url(${src})`,
        backgroundSize: `${spriteWidth}px ${spriteHeight}px`,
        backgroundRepeat: 'no-repeat',
        animation: `spriteAnim ${duration}s steps(${frameCount}) infinite`,
      }}
      role="img"
      aria-label={alt}
    >
      <style>{`
        @keyframes spriteAnim {
          from { background-position: 0 0; }
          to { background-position: -${spriteWidth}px 0; }
        }
      `}</style>
    </div>
  );
};

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div 
      key="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-end p-8 text-center h-full pb-10"
    >
      {/* Sprite Sheet PNG com Alpha Real - Teste em tamanho real */}
      <SpriteAnimator 
        src="/sprites/sprite_lingua_alpha.png"
        frameCount={41}
        fps={8}
        className="w-full h-auto"
        alt="Teste sprite alpha real"
      />

      <motion.button 
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 2 }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => onStart('HOW_IT_WORKS')}
        className="btn-3d-yellow text-xl !rounded-[14px] !px-6 !py-3"
      >
        JOGAR
      </motion.button>
    </motion.div>
  );
};
