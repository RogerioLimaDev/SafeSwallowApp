import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenBtn, setShowFullscreenBtn] = useState(true);

  useEffect(() => {
    // Hide fullscreen button on Firefox (doesn't support fullscreen properly on iOS)
    const isFirefox = /Firefox/i.test(navigator.userAgent);
    setShowFullscreenBtn(!isFirefox);
  }, []);

  const toggleFullscreen = async () => {
    try {
      const elem = document.documentElement;
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log('Fullscreen error:', err);
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
      {/* Fullscreen button - only show on non-Firefox browsers */}
      {showFullscreenBtn && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 px-3 py-1 bg-black/30 rounded-full z-50 text-white text-sm"
        >
          {isFullscreen ? "✕" : "⛶"}
        </button>
      )}

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
