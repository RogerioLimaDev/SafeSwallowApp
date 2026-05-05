import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile } from 'lucide-react';

interface HelpModalProps {
  show: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ show, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-[4vw] bg-blue-900/40 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white p-[6vw] sm:p-10 rounded-[10vw] sm:rounded-[40px] max-w-lg w-full border-4 sm:border-8 border-yellow-300 flex flex-col items-center"
          >
            <div className="flex justify-center mb-[4vw] sm:mb-6">
              <div className="w-[15vw] h-[15vw] sm:w-20 sm:h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Smile className="w-[10vw] h-[10vw] sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h2 className="font-display text-[clamp(1.5rem,6vw,2.5rem)] sm:text-4xl text-center mb-[4vw] sm:mb-6">Missão: Super Remédio!</h2>
            <div className="space-y-[2vw] sm:space-y-4 text-[clamp(0.8rem,3vw,1.2rem)] sm:text-lg text-center font-medium">
              <p>Hoje vamos aprender a tomar o remedinho como um campeão!</p>
              <p>1. 🦒 <span className="text-green-500">Fique retinho</span> para o remédio descer suave.</p>
              <p>2. 🥤 <span className="text-blue-500">Pegue seu copo</span> de água mágica.</p>
              <p>3. 👅 <span className="text-pink-500">Língua de fora</span> para o robô conferir!</p>
              <p>4. ☁️ <span className="text-yellow-500">Olhe para cima</span> para o remédio escorregar.</p>
              <p>5. 🚀 <span className="text-blue-500">Pronto para decolar!</span></p>
            </div>
            <button 
              onClick={onClose}
              className="btn-3d-yellow !rounded-[16px] w-full text-2xl mt-8"
            >
              Começar Missão! 🚀
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
