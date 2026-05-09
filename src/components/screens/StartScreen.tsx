import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    console.log('Fullscreen toggle clicked');
    console.log('Current fullscreenElement:', document.fullscreenElement);
    console.log('Current webkitFullscreenElement:', document.webkitFullscreenElement);
    console.log('requestFullscreen exists:', !!document.documentElement.requestFullscreen);
    console.log('webkitRequestFullscreen exists:', !!document.documentElement.webkitRequestFullscreen);
    
    try {
      const elem = document.documentElement;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // Try standard API first, then WebKit for older browsers
        if (elem.requestFullscreen) {
          console.log('Trying standard requestFullscreen');
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          console.log('Trying webkitRequestFullscreen');
          await elem.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          console.log('Trying standard exitFullscreen');
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          console.log('Trying webkitExitFullscreen');
          await document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log('Fullscreen error:', err);
      alert('Fullscreen error: ' + err.message);
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
