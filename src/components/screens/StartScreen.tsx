import React from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';
import { getCharacterAsset, CharacterRenderer } from '../../services/assetService';

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  // Sprite sheet de teste - nível 1 postura
  const spriteConfig = getCharacterAsset(1, 'POSTURE');
  
  return (
    <motion.div 
      key="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-end p-8 text-center h-full pb-10"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Área de teste dos 3 formatos */}
      <div className="mb-8 w-full max-w-md">
        <p className="text-sm text-gray-500 mb-4">Comparação de formatos (fundo deve ser transparente)</p>
        
        <div className="grid grid-cols-4 gap-4">
          {/* 1. Sprite Sheet PNG */}
          <div className="p-2 border-2 border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">Sprite Sheet</p>
            <div className="w-[100px] h-[100px] mx-auto bg-blue-100 rounded">
              <CharacterRenderer config={spriteConfig} className="w-full h-full" alt="Sprite teste" />
            </div>
          </div>
          
          {/* 2. WebP Animado */}
          <div className="p-2 border-2 border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">WebP Animado</p>
            <div className="w-[100px] h-[100px] mx-auto bg-blue-100 rounded overflow-hidden">
              <img 
                src="/sprites/nivel1/postura.webp"
                alt="WebP animado"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* 3. Video WebM */}
          <div className="p-2 border-2 border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">WebM</p>
            <div className="w-[100px] h-[100px] mx-auto bg-blue-100 rounded overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain"
                style={{ backgroundColor: 'transparent' }}
              >
                <source src="/videos/Comemorando_fase1.webm" type="video/webm" />
              </video>
            </div>
          </div>
          
          {/* 4. Video MOV */}
          <div className="p-2 border-2 border-gray-300 rounded-lg bg-gray-50">
            <p className="text-xs text-gray-500 mb-1">MOV</p>
            <div className="w-[100px] h-[100px] mx-auto bg-blue-100 rounded overflow-hidden">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-contain"
                style={{ backgroundColor: 'transparent' }}
              >
                <source src="/videos/Comemorando_fase1.mov" type="video/quicktime" />
              </video>
            </div>
          </div>
        </div>
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
