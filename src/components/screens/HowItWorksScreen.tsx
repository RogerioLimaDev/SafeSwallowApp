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
      style={{ paddingBottom: 'max(6rem, env(safe-area-inset-bottom, 6rem))' }}
    >
      {/* Container principal com texto e gráfico */}
      <div className="flex flex-col items-start pt-2 max-w-full">
        <h2 className="font-baruta text-2xl sm:text-3xl mb-4 text-white text-left w-full leading-tight">
          <span className="block whitespace-nowrap">Aprendendo a engolir</span>
          <span className="block">comprimidos</span>
        </h2>
        
        <div className="text-[#482323] text-sm sm:text-base font-nunito leading-snug text-left max-w-[95%]">
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

        {/* Gráfico de pills - mesma largura do texto */}
        <div className="mt-4 w-full max-w-[95%]">
          <img 
            src="/images/responsivo/TelaComoFunciona/GraficoPilulas.png" 
            alt="Gráfico de tamanhos de pílulas"
            className="w-full max-w-[400px] h-auto"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Container com personagem e botão */}
      <div className="flex items-start justify-between w-full gap-4 pt-4">
        {/* Personagem - centralizado com o botão, 30% maior */}
        <div className="flex-1 flex justify-start">
          <img 
            src="/images/responsivo/TelaComoFunciona/perosnagemComoFunciona.png" 
            alt="Personagem"
            className="w-full h-auto max-h-[220px] object-contain mt-auto"
          />
        </div>

        {/* Botão - lado direito */}
        <div className="flex-1 flex justify-end pr-2 sm:pr-4 items-end">
          <button 
            onClick={() => onNext('CANDY_BOX_SELECT')}
            className="btn-3d-yellow w-full max-w-[120px] sm:max-w-[160px] text-lg sm:text-xl !py-2 flex items-center justify-center !rounded-[12px]"
          >
            INICIAR
          </button>
        </div>
      </div>
    </motion.div>
  );
};
