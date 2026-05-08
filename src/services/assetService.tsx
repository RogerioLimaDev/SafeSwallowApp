import React from 'react';

export type CharacterType = 
  | 'NORMAL' 
  | 'POSTURE' 
  | 'CELEBRATION'
  | 'CHECKING'
  | 'SWALLOWING'
  | 'TONGUE';

interface AssetConfig {
  type: 'image' | 'animation' | 'component' | 'sprite';
  path: string;
  component?: React.ReactNode;
  frameCount?: number;
  fps?: number;
}

/**
 * Centralized service to manage character assets across different levels.
 * Uses sprite sheets for better iOS compatibility (transparency support).
 */
export const getCharacterAsset = (level: number, type: CharacterType): AssetConfig => {
  // Mapeamento de tipos para nomes de arquivos de sprite
  const spriteFiles: Record<CharacterType, string> = {
    NORMAL: 'postura',
    POSTURE: 'postura',
    CELEBRATION: 'palmas',
    CHECKING: 'checando',
    SWALLOWING: 'bebendo',
    TONGUE: 'língua',
  };

  // Mapeamento para vídeos (fallback)
  const videoFiles: Record<CharacterType, string> = {
    NORMAL: 'postura.webm',
    POSTURE: 'postura.webm',
    CELEBRATION: 'palmas.webm',
    CHECKING: 'checando.webm',
    SWALLOWING: 'bebendo.webm',
    TONGUE: 'língua.webm',
  };

  // Por padrão, usar vídeos (funciona no desktop)
  // Os sprites são usados apenas para fallback em dispositivos sem suporte a vídeo com alpha
  if (level === 1) {
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoFiles[type]}`
    };
  }

  // Level 2
  if (level === 2) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'Laranja1_postura.webm',
      POSTURE: 'Laranja1_postura.webm',
      CELEBRATION: 'Laranja1_Comemora.webm',
      CHECKING: 'Laranja1_Checando.webm',
      SWALLOWING: 'Laranja1_bebendo.webm',
      TONGUE: 'Laranja1_lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Level 3
  if (level === 3) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'Roxo_postura.webm',
      POSTURE: 'Roxo_postura.webm',
      CELEBRATION: 'Roxo_comemorando.webm',
      CHECKING: 'Roxo_checando.webm',
      SWALLOWING: 'Roxo_agua.webm',
      TONGUE: 'Roxo_lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Level 4
  if (level === 4) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'Azul_Postura.webm',
      POSTURE: 'Azul_Postura.webm',
      CELEBRATION: 'Azul_Comemora.webm',
      CHECKING: 'Azul_Checando.webm',
      SWALLOWING: 'Azul_agua_.webm',
      TONGUE: 'Azul_lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Level 5
  if (level === 5) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'Laranja2_postura.webm',
      POSTURE: 'Laranja2_postura.webm',
      CELEBRATION: 'Laranja2_palmas.webm',
      CHECKING: 'Laranja2_checando.webm',
      SWALLOWING: 'Laranja2_agua.webm',
      TONGUE: 'Laranja2_Lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Level 6
  if (level === 6) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'Vermelho_postura.webm',
      POSTURE: 'Vermelho_postura.webm',
      CELEBRATION: 'Vermelho_Comemorando.webm',
      CHECKING: 'Vermelho_Checando.webm',
      SWALLOWING: 'Vermelho_agua.webm',
      TONGUE: 'Vermelho_Lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Level 7
  if (level === 7) {
    const videoMap: Record<CharacterType, string> = {
      NORMAL: 'AzulEBranco_postura.webm',
      POSTURE: 'AzulEBranco_postura.webm',
      CELEBRATION: 'AzulEBranco_comemorando.webm',
      CHECKING: 'AzulEBranco_checando.webm',
      SWALLOWING: 'AzulEBranco_agua.webm',
      TONGUE: 'AzulEBranco_Lingua.webm',
    };
    return {
      type: 'animation',
      path: `/images/nivel${level}/${videoMap[type]}`
    };
  }

  // Fallback
  return {
    type: 'animation',
    path: '/images/nivel1/postura.webm'
  };
};

/**
 * Returns the brand color associated with a specific level.
 */
export const getLevelColor = (level: number): string => {
  const colors: Record<number, string> = {
    1: '#fbc660',
    2: '#ff9241',
    3: '#b155b8',
    4: '#669fc2',
    5: '#ff9241',
    6: '#d7475d',
    7: '#669fc2',
  };
  return colors[level] || '#fbc660';
};

/**
 * Darkens a hex color by a given percentage.
 */
export const darkenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (0x1000000 + (R < 255 ? R < 0 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 0 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 0 ? 0 : B : 255)).toString(16).slice(1);
};

// Sprite animation constants
const SPRITE_COLS = 8; // 8 columns in sprite sheet
const SPRITE_SIZE = 150; // 150x150 pixels per frame

/**
 * Component to render character animations using sprite sheets.
 * Uses CSS animation for smooth playback on all devices including iOS.
 */
export const SpriteAnimator: React.FC<{
  src: string;
  frameCount: number;
  fps: number;
  className?: string;
  alt?: string;
}> = ({ src, frameCount, fps, className, alt = "Character" }) => {
  const duration = frameCount / fps;
  const rows = Math.ceil(frameCount / SPRITE_COLS);
  const totalWidth = SPRITE_SIZE * frameCount;
  
  return (
    <div 
      className={className}
      style={{
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        backgroundImage: `url(${src})`,
        backgroundSize: `${SPRITE_SIZE * SPRITE_COLS}px ${SPRITE_SIZE * rows}px`,
        backgroundPosition: '0 0',
        animation: `spriteAnimation ${duration}s steps(${frameCount}) infinite`,
      }}
      aria-label={alt}
    >
      <style>{`
        @keyframes spriteAnimation {
          from {
            background-position: 0 0;
          }
          to {
            background-position: -${totalWidth}px 0;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Component to render the character based on its asset configuration.
 * Supports video, sprite sheet, and component types.
 */
export const CharacterRenderer: React.FC<{ 
  config: AssetConfig; 
  className?: string;
  alt?: string;
}> = ({ config, className, alt = "Character" }) => {
  if (config.type === 'component' && config.component) {
    return <div className={className}>{config.component}</div>;
  }

  if (config.type === 'sprite') {
    return (
      <SpriteAnimator 
        src={config.path}
        frameCount={config.frameCount || 61}
        fps={config.fps || 12}
        className={className}
        alt={alt}
      />
    );
  }

  if (config.type === 'animation') {
    const basePath = config.path.replace(/\.(webm|mov)$/, '');
    
    return (
      <video 
        key={config.path}
        className={className} 
        autoPlay 
        loop 
        muted 
        playsInline
        aria-label={alt}
        style={{ objectFit: 'contain', backgroundColor: 'transparent' }}
        onError={(e) => console.error("Video error on path:", config.path, (e.currentTarget as any).error)}
        onCanPlay={(e) => {
          const video = e.currentTarget;
          video.play().catch(err => console.error("Video autoplay failed:", err));
        }}
      >
        <source src={`${basePath}.webm`} type="video/webm" />
        <source src={`${basePath}.mov`} type="video/quicktime" />
      </video>
    );
  }

  return (
    <img 
      src={config.path} 
      className={className} 
      alt={alt} 
      referrerPolicy="no-referrer" 
    />
  );
};
