import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MissionStep } from '../../types';

interface StartScreenProps {
  onStart: (step: MissionStep) => void;
}

const CORRECT_PASSWORD = '1234'; // Você pode alterar a senha aqui

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [password, setPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState(false);

  const tryFullscreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      }
    } catch {
      // Silently fail - fullscreen not supported
    }
  };

  const handleConfirm = () => {
    if (password === CORRECT_PASSWORD) {
      setIsConfirmed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      key="start-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center p-8 text-center h-full"
      style={{ paddingBottom: 'max(6rem, env(safe-area-inset-bottom, 6rem))' }}
    >
      <div className="flex-1" />

      {/* Senha e Confirmar */}
      <AnimatePresence>
        {!isConfirmed && (
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="digite sua senha"
              placeholderTextColor="#cccccc"
              className={`
                !rounded-[14px] !px-6 !py-3 text-center text-lg
                bg-white/90 backdrop-blur-sm border-2
                ${error ? 'border-red-500 animate-shake' : 'border-white/30'}
                focus:border-brand-yellow outline-none
                transition-colors text-black
              `}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConfirm}
              className="text-xl !rounded-[14px] !px-6 !py-3 font-baruta font-bold transition-all duration-100 active:translate-y-[2px]"
              style={{ backgroundColor: '#e79295', color: 'white', boxShadow: '2px 3px 0px #c46c73' }}
            >
              Entrar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botão Jogar - aparece após confirmação */}
      <AnimatePresence>
        {isConfirmed && (
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 2 }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              tryFullscreen();
              onStart('HOW_IT_WORKS');
            }}
            className="btn-3d-yellow text-xl !rounded-[14px] !px-6 !py-3"
          >
            JOGAR
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
