import React from 'react';
import { motion } from 'motion/react';

import { getLevelColor, darkenColor } from '../../services/assetService';

interface CameraInviteScreenProps {
  onNext: () => void;
  currentLevel: number;
}

export const CameraInviteScreen: React.FC<CameraInviteScreenProps> = ({ onNext, currentLevel }) => {
  const PURPLE_COLOR = '#b155b8';
  
  // Button color - keeping a consistent blue that works with purple
  const buttonColor = '#4E8DFF';

  const handleStart = async () => {
    try {
      // Request permission immediately in the user gesture context
      // This helps in some iframe/browser environments to bridge the gesture
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // We don't need to keep the stream here, MediaPipe will manage its own
      stream.getTracks().forEach(track => track.stop());
      onNext();
    } catch (err: any) {
      console.error("Manual camera permission request failed:", err);
      // Even if this fails, we call onNext and let the main hook handle the error reporting
      // but if it's a PermissionDenied error, we might want to alert here or just proceed.
      onNext();
    }
  };

  return (
    <motion.div 
      key="camera-invite"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex flex-col items-center justify-center p-8"
    >
      {/* Speech Bubble */}
      <div 
        className="relative rounded-[40px] px-6 py-10 flex flex-col items-center justify-center gap-8 translate-y-[-40px]"
        style={{ 
          backgroundColor: PURPLE_COLOR,
          width: 'min(480px, 85vw)',
          height: 'min(432px, 76.5vw)'
        }}
      >
        {/* Bubble Tail - Sharp triangle pointing towards character */}
        <div 
          className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-20 h-20" 
          style={{ 
            backgroundColor: PURPLE_COLOR,
            clipPath: 'polygon(40% 0, 90% 0, 20% 100%)' 
          }}
        />
        
        <div className="relative z-10 w-full text-left pl-4 pr-0">
          <p className="font-nunito font-semibold text-[26px] sm:text-[32px] text-white leading-tight">
            Pronto para começar?<br />
            Ative a câmera do seu<br />
            aparelho para iniciar.
          </p>
        </div>
        
        <button 
          onClick={handleStart}
          className="relative text-white font-baruta font-bold text-xl leading-[0.8] flex flex-col items-center justify-center !rounded-[16px] px-14 pt-3 pb-4 transition-all duration-100 active:translate-y-[2px] active:translate-x-[1px] active:shadow-none"
          style={{ 
            backgroundColor: '#ff9241',
            boxShadow: '2px 3px 0px #b24e1f',
            width: '48%'
          }}
        >
          <div className="flex items-center gap-1">
            <span>LIGAR</span>
            <span className="text-2xl">📸</span>
          </div>
          <span>CÂMERA!</span>
        </button>
      </div>

      {/* Personagem - canto inferior esquerdo */}
      <div className="absolute left-0 px-4 sm:px-8" style={{ bottom: '2.5rem' }}>
        <img 
          src="/images/responsivo/TelaCamera/PersonagemTelaCamera.png" 
          alt="Personagem"
          className="h-auto w-auto object-contain"
          style={{ width: 'auto', maxWidth: 'min(40vw, 200px)', maxHeight: '20vh' }}
        />
      </div>
    </motion.div>
  );
};
