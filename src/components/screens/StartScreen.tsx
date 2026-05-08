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
      {/* Área de teste do sprite sheet */}
      <div className="mb-8 p-4 border-2 border-gray-300 rounded-lg bg-gray-50">
        <p className="text-sm text-gray-500 mb-2">Teste Sprite Sheet (fundo deve ser transparente)</p>
        <div className="w-[150px] h-[150px] mx-auto">
          <CharacterRenderer config={spriteConfig} className="w-full h-full" alt="Sprite teste" />
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
