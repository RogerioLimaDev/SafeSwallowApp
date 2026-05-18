import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  showBackground?: boolean;
}

export function AppLayout({ children, showBackground = true }: LayoutProps) {
  // Margem do logo = 50% da distância do botão à margem inferior (~6rem = 96px, 50% = 48px = pt-12)
  // Logo ampliado em 30%
  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Fundo/base - ocupa toda a tela - apenas em telas estáticas */}
      {showBackground && (
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/responsivo/ElementosComuns/BG_Limpo.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Logotipo - parte superior - apenas em telas estáticas */}
      {showBackground && (
        <div className="relative z-10 w-full flex justify-center pt-10 sm:pt-12 px-4">
          <img 
            src="/images/responsivo/ElementosComuns/logotipo.png" 
            alt="SafeSwallow"
            className="h-24 sm:h-28 md:h-32 w-auto object-contain"
          />
        </div>
      )}

      {/* Conteúdo */}
      <div className={`relative z-10 flex-1 flex flex-col ${showBackground ? '' : 'w-full h-full'}`}>
        {children}
      </div>
    </div>
  );
}
