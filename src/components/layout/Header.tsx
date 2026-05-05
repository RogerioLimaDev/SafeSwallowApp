import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gamepad2, Info, RefreshCw } from 'lucide-react';
import { MissionStep } from '../../types';

interface HeaderProps {
  currentStep: MissionStep;
  isCameraActive: boolean;
  onShowHelp: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  isCameraActive,
  onShowHelp,
  onReset
}) => {
  return (
    <header className="p-4 flex justify-between items-start pointer-events-auto">
      <AnimatePresence>
        {currentStep === 'SUCCESS' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-4 bg-white/90 backdrop-blur-md p-4 rounded-[30px] border-2 border-white/50"
          >
            <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center shrink-0">
              <Gamepad2 className="text-white w-7 h-7" />
            </div>
            <div className="min-w-0">
              <h1 className="font-baruta text-2xl text-brand-orange leading-none truncate">SAFE SWALLOW</h1>
              <p className="text-[10px] font-bold text-orange-300 uppercase tracking-widest mt-1">Sua jornada de saúde!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {/* Help and Reset buttons removed as per user request to be redesigned later */}
      </div>
    </header>
  );
};
