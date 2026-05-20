import React from 'react';

export type CharacterType = 
  | 'NORMAL' 
  | 'POSTURE' 
  | 'CELEBRATION'
  | 'CHECKING'
  | 'SWALLOWING'
  | 'TONGUE';

export type AssetMediaType = 'image' | 'animation' | 'sprite' | 'component';

export interface SpriteConfig {
  type: 'sprite';
  path: string;
  frameCount: number;
  totalFrames?: number; // Total frames in the actual image (for background-size)
  fps: number;
  frameWidth: number;
  frameHeight: number;
}

interface AssetConfig {
  type: AssetMediaType;
  path: string;
  component?: React.ReactNode;
  spriteConfig?: SpriteConfig;
}

/**
 * Centralized service to manage character assets across different levels.
 * This structure allows easy swapping of static images for animations (GIF, Lottie, etc.)
 * without changing the layout logic.
 */
export const getCharacterAsset = (level: number, type: CharacterType): AssetConfig => {
  // Use sprite sheets for Level 1 (Amarelo) - iOS compatible with CSS animation
  if (level === 1) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_amarelo_postura.png',
      POSTURE: 'sprite_amarelo_postura.png',
      CELEBRATION: 'sprite_amarelo_comemora.png',
      CHECKING: 'sprite_amarelo_checando.png',
      SWALLOWING: 'sprite_amarelo_agua.png',
      TONGUE: 'sprite_amarelo_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 41,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 2 (Laranja1)
  if (level === 2) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_laranja1_postura.png',
      POSTURE: 'sprite_laranja1_postura.png',
      CELEBRATION: 'sprite_laranja1_comemora.png',
      CHECKING: 'sprite_laranja1_checando.png',
      SWALLOWING: 'sprite_laranja1_agua.png',
      TONGUE: 'sprite_laranja1_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 3 (Roxo)
  if (level === 3) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_roxo_postura.png',
      POSTURE: 'sprite_roxo_postura.png',
      CELEBRATION: 'sprite_roxo_comemora.png',
      CHECKING: 'sprite_roxo_checando.png',
      SWALLOWING: 'sprite_roxo_agua.png',
      TONGUE: 'sprite_roxo_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 4 (Azul)
  if (level === 4) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_azul_postura.png',
      POSTURE: 'sprite_azul_postura.png',
      CELEBRATION: 'sprite_azul_comemora.png',
      CHECKING: 'sprite_azul_checando.png',
      SWALLOWING: 'sprite_azul_agua.png',
      TONGUE: 'sprite_azul_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 5 (Laranja2)
  if (level === 5) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_laranja2_postura.png',
      POSTURE: 'sprite_laranja2_postura.png',
      CELEBRATION: 'sprite_laranja2_comemora.png',
      CHECKING: 'sprite_laranja2_checando.png',
      SWALLOWING: 'sprite_laranja2_agua.png',
      TONGUE: 'sprite_laranja2_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 6 (Vermelho)
  if (level === 6) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_vermelho_postura.png',
      POSTURE: 'sprite_vermelho_postura.png',
      CELEBRATION: 'sprite_vermelho_comemora.png',
      CHECKING: 'sprite_vermelho_checando.png',
      SWALLOWING: 'sprite_vermelho_agua.png',
      TONGUE: 'sprite_vermelho_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  // Use sprite sheets for Level 7 (AzulEBranco)
  if (level === 7) {
    const spriteFiles: Record<CharacterType, string> = {
      NORMAL: 'sprite_azulebranco_postura.png',
      POSTURE: 'sprite_azulebranco_postura.png',
      CELEBRATION: 'sprite_azulebranco_comemora.png',
      CHECKING: 'sprite_azulebranco_checando.png',
      SWALLOWING: 'sprite_azulebranco_agua.png',
      TONGUE: 'sprite_azulebranco_lingua.png',
    };

    return {
      type: 'sprite',
      path: `/sprites/${spriteFiles[type]}`,
      spriteConfig: {
        type: 'sprite',
        path: `/sprites/${spriteFiles[type]}`,
        frameCount: 39,
        totalFrames: 40,
        fps: 8,
        frameWidth: 134,
        frameHeight: 134,
      }
    };
  }

  return {
    type: 'animation',
    // Fallback if not level 1-7
    path: `/images/nivel${level}/normal.png` 
  };
};

/**
 * Returns the brand color associated with a specific level.
 */
export const getLevelColor = (level: number): string => {
  const colors: Record<number, string> = {
    1: '#ffa341',
    2: '#ff9241',
    3: '#b155b8',
    4: '#669fc2',
    5: '#ff9241',
    6: '#d7475d',
    7: '#669fc2',
  };
  return colors[level] || '#ffa341';
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

/**
 * Component to render the character based on its asset configuration.
 * If we switch to Lottie or Video, we just update this component.
 */
export const CharacterRenderer: React.FC<{ 
  config: AssetConfig; 
  className?: string;
  alt?: string;
}> = ({ config, className, alt = "Character" }) => {
  // Handle sprite sheet animations (CSS animation - iOS compatible)
  if (config.type === 'sprite' && config.spriteConfig) {
    const { frameCount, fps, frameWidth, frameHeight, totalFrames } = config.spriteConfig;
    const displayFrames = totalFrames || frameCount;
    const spriteWidth = frameCount * frameWidth; // Animation stops at last valid frame
    const imageWidth = displayFrames * frameWidth; // Background-size uses full image
    const duration = frameCount / fps;

    return (
      <div 
        className={className}
        style={{
          width: `${frameWidth}px`,
          height: `${frameHeight}px`,
          overflow: 'hidden',
        }}
        role="img"
        aria-label={alt}
      >
        <style>{`
          @keyframes spriteAnim-${frameCount} {
            from { background-position: 0 0; }
            to { background-position: -${spriteWidth}px 0; }
          }
          .sprite-anim-${frameCount} {
            width: 100%;
            height: 100%;
            background-image: url(${config.path});
            background-size: ${imageWidth}px ${frameHeight}px;
            background-repeat: no-repeat;
            animation: spriteAnim-${frameCount} ${duration}s steps(${frameCount}) infinite;
          }
        `}</style>
        <div className={`sprite-anim-${frameCount}`} />
      </div>
    );
  }

  if (config.type === 'component' && config.component) {
    return <div className={className}>{config.component}</div>;
  }

  if (config.type === 'animation') {
    // Remove a extensão do caminho base
    const basePath = config.path.replace(/\.(webm|mp4|mov)$/, '');
    
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
