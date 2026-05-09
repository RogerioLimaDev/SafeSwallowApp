import React from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';

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
