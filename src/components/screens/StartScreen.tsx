import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    alert('Botão clicado!');
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log('Fullscreen not supported:', err);
      alert('Fullscreen não suportado: ' + err);
    }
  };

  return (
    <motion.div 
      key="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-end p-8 text-center h-full pb-10"
    >
      {/* Fullscreen button - text based */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-6 right-6 px-3 py-1 bg-black/30 rounded-full z-50 text-white text-sm"
      >
        {isFullscreen ? "✕" : "⛶"}
      </button>

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
