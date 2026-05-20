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
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex items-center justify-center"
    >
      {/* Container com personagem e balão */}
      <div className="relative w-full max-w-[600px] h-[500px] sm:h-[600px]">
        {/* Balão de fala - atrás do personagem, mais arriba */}
        <div 
          className="absolute top-0 left-0 right-0 mx-auto rounded-[40px] px-6 py-10 flex flex-col items-center justify-center gap-8 z-0"
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
          
          {/* Container interno para texto e botão - mantém distância relativa */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center gap-8 px-4">
            {/* Container wrapper para texto e botão - distância relativa fixa */}
            <div className="w-full flex flex-col items-center justify-center gap-8">
              {/* Texto */}
              <div className="w-full flex justify-center">
                <div className="text-center sm:text-left">
                  <p className="font-nunito font-semibold text-[6vw] sm:text-[32px] md:text-[36px] lg:text-[40px] text-white leading-tight">
                    Pronto para começar?<br />
                    Ative a câmera do seu<br />
                    aparelho para iniciar.
                  </p>
                </div>
              </div>
              
              {/* Botão */}
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
          </div>
        </div>

        {/* Personagem - na frente, abaixo do balão */}
        <div className="absolute bottom-0 left-4 sm:left-8 z-10" style={{ marginTop: '-1.5rem' }}>
          <img 
            src="/images/responsivo/TelaCamera/PersonagemTelaCamera.png" 
            alt="Personagem"
            className="h-auto w-auto object-contain"
            style={{ width: 'auto', maxWidth: 'min(40vw, 200px)', maxHeight: '20vh' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
