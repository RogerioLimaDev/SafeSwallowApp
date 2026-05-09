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
  const frameWidth = 100;
  const duration = frameCount / fps;
  const keyframes = Array.from({ length: frameCount }, (_, i) => {
    const percent = (i / frameCount) * 100;
    const position = -(i * frameWidth);
    return `${percent}% { background-position: ${position}px 0; }`;
  }).join('\n');

  return (
    <div 
      className={className}
      style={{
        width: `${frameWidth}px`,
        height: `${frameWidth}px`,
        backgroundImage: `url(${src})`,
        backgroundSize: `${frameCount * frameWidth}px ${frameWidth}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        animation: `spriteAnim ${duration}s steps(${frameCount}) infinite`,
      }}
      role="img"
      aria-label={alt}
    >
      <style>{`
        @keyframes spriteAnim {
          from { background-position: 0 0; }
          to { background-position: -${frameCount * frameWidth}px 0; }
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
      {/* Sprite Sheet Test - Sem animação para verificar transparência */}
      <div className="mb-8 p-4 border-2 border-blue-500 rounded-lg bg-blue-50">
        <p className="text-sm text-blue-700 mb-2">Sprite Sheet PNG - Frame 1 (sem animação)</p>
        <div 
          className="w-[100px] h-[100px]"
          style={{
            backgroundImage: 'url(/sprites/sprite_postura_teste.png)',
            backgroundSize: '3200px 400px',
            backgroundPosition: '0 0',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* Sprite Sheet Test - Animado */}
      <div className="mb-8 p-4 border-2 border-green-500 rounded-lg bg-green-50">
        <p className="text-sm text-green-700 mb-2">Sprite Sheet PNG - Animado</p>
        <SpriteAnimator 
          src="/sprites/sprite_postura_teste.png"
          frameCount={32}
          fps={8}
          className="w-[100px] h-[100px]"
          alt="Teste sprite"
        />
      </div>

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
