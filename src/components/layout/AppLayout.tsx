import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Fundo/base - ocupa toda a tela */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/responsivo/ElementosComuns/BG_Limpo.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Logotipo - parte superior */}
      <div className="relative z-10 w-full flex justify-center pt-4 sm:pt-6 px-4">
        <img 
          src="/images/responsivo/ElementosComuns/logotipo.png" 
          alt="SafeSwallow"
          className="h-16 sm:h-20 md:h-24 w-auto object-contain"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
