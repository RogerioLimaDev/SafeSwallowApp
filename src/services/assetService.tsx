import React from 'react';

export type CharacterType = 
  | 'NORMAL' 
  | 'POSTURE' 
  | 'CELEBRATION'
  | 'CHECKING'
  | 'SWALLOWING'
  | 'TONGUE';

interface AssetConfig {
  type: 'image' | 'animation' | 'component' | 'sprite' | 'webp-animated';
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
  // Por padrão, usar vídeos (funciona no desktop)
  // Para iOS, usar WebP animado com alpha
  const useWebP = true; // Toggle para testar

  // Mapeamento para vídeos
  const videoFiles: Record<CharacterType, string> = {
    NORMAL: 'postura.webm',
    POSTURE: 'postura.webm',
    CELEBRATION: 'palmas.webm',
    CHECKING: 'checando.webm',
    SWALLOWING: 'bebendo.webm',
    TONGUE: 'língua.webm',
  };

  if (useWebP) {
    // Level 1 - usar sprite sheet (teste)
    if (level === 1) {
      // Sprite sheet para nível 1 (8fps, 32 frames)
      return {
        type: 'sprite',
        path: '/sprites/nivel1_sprite/sprite_postura.webp',
        frameCount: 32,
        fps: 8
      };
    }
    // Level 2-7 similar...
    if (level === 2) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'Laranja1_postura',
        POSTURE: 'Laranja1_postura',
        CELEBRATION: 'Laranja1_Comemora',
        CHECKING: 'Laranja1_Checando',
        SWALLOWING: 'Laranja1_bebendo',
        TONGUE: 'Laranja1_lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
    if (level === 3) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'Roxo_postura', POSTURE: 'Roxo_postura', CELEBRATION: 'Roxo_comemorando',
        CHECKING: 'Roxo_checando', SWALLOWING: 'Roxo_agua', TONGUE: 'Roxo_lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
    if (level === 4) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'Azul_Postura', POSTURE: 'Azul_Postura', CELEBRATION: 'Azul_Comemora',
        CHECKING: 'Azul_Checando', SWALLOWING: 'Azul_agua_', TONGUE: 'Azul_lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
    if (level === 5) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'Laranja2_postura', POSTURE: 'Laranja2_postura', CELEBRATION: 'Laranja2_palmas',
        CHECKING: 'Laranja2_checando', SWALLOWING: 'Laranja2_agua', TONGUE: 'Laranja2_Lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
    if (level === 6) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'Vermelho_postura', POSTURE: 'Vermelho_postura', CELEBRATION: 'Vermelho_Comemorando',
        CHECKING: 'Vermelho_Checando', SWALLOWING: 'Vermelho_agua', TONGUE: 'Vermelho_Lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
    if (level === 7) {
      const map: Record<CharacterType, string> = {
        NORMAL: 'AzulEBranco_postura', POSTURE: 'AzulEBranco_postura', CELEBRATION: 'AzulEBranco_comemorando',
        CHECKING: 'AzulEBranco_checando', SWALLOWING: 'AzulEBranco_agua', TONGUE: 'AzulEBranco_Lingua',
      };
      return { type: 'webp-animated', path: `/sprites/nivel${level}/${map[type]}.webp` };
    }
  }

  // Fallback para vídeos originais
  if (level === 1) {
    return { type: 'animation', path: `/images/nivel${level}/${videoFiles[type]}` };
  }
  // ... (outros níveis)
  return { type: 'animation', path: '/images/nivel1/postura.webm' };
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
const SPRITE_SIZE = 100; // 100x100 pixels per frame (reduced from 150)

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

  // WebP animado - funciona como imagem mas tem animação com alpha
  if (config.type === 'webp-animated') {
    return (
      <img 
        src={config.path}
        className={className}
        alt={alt}
        style={{ 
          width: '150px', 
          height: '150px',
          imageRendering: 'auto' 
        }}
      />
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
