import { useEffect } from 'react';
import { isMobileDevice } from '../../hooks/useDeviceType';

export default function UnsupportedDeviceScreen() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (isMobileDevice()) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-red-600 to-red-800 flex flex-col items-center justify-center p-6 text-white z-[9999]">
      <div className="max-w-md text-center">
        {/* Ícone de celular */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto animate-bounce"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" 
            />
          </svg>
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold mb-4">
          Ops! Este app é apenas para celular
        </h1>

        {/* Descrição */}
        <p className="text-lg opacity-90 mb-8">
          O SafeSwallow foi desenvolvido especialmente para dispositivos móveis. 
          Por favor, abra este link no seu celular para usar o aplicativo.
        </p>

        {/* Instrução adicional */}
        <div className="bg-white/10 rounded-lg p-4">
          <p className="text-sm opacity-80">
            Se você está no celular, tente atualizar a página ou verificar sua conexão.
          </p>
        </div>
      </div>
    </div>
  );
}
