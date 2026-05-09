import React from 'react';
import { motion } from 'motion/react';
import { MissionStep } from '../../types';
import { getCharacterAsset, CharacterRenderer } from '../../services/assetService';

interface HowItWorksScreenProps {
  onNext: (step: MissionStep) => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({ onNext }) => {
  return (
    <motion.div 
      key="how-it-works"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full pointer-events-auto bg-transparent flex flex-col p-6 sm:p-8"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-xl w-full flex flex-col items-start pt-2">
        <h2 className="font-baruta text-2xl sm:text-3xl mb-4 text-white text-left w-full leading-tight">
          <span className="block whitespace-nowrap">Aprendendo a engolir</span>
          <span className="block">comprimidos</span>
        </h2>
        
        <div className="text-[#482323] text-sm sm:text-base font-body leading-snug text-left max-w-[95%]">
          <p>
            Este jogo ajuda crianças a aprender, com segurança, a engolir comprimidos. 
            O treino utiliza placebos de tamanhos progressivos, acompanhando o aumento da confiança a cada etapa.
          </p>
          
          <p>
            Ao longo do processo, a criança pratica a ingestão adequada de líquidos, 
            o posicionamento correto e desenvolve autonomia, sempre com reforço positivo e no seu próprio ritmo.
          </p>
          
          <p>
            Com o apoio de um adulto, a maioria consegue adquirir essa habilidade com sucesso.
          </p>
        </div>
      </div>

      <div className="flex-1" />

      <div className="max-w-xl w-full flex justify-end pr-2 sm:pr-4">
        <button 
          onClick={() => onNext('CANDY_BOX_SELECT')}
          className="btn-3d-yellow w-full max-w-[120px] sm:max-w-[160px] text-lg sm:text-xl !py-2 flex items-center justify-center !rounded-[12px]"
        >
          INICIAR
        </button>
      </div>
    </motion.div>
  );
};
