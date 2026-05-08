import React from 'react';

export type CharacterType = 
  | 'NORMAL' 
  | 'POSTURE' 
  | 'CELEBRATION'
  | 'CHECKING'
  | 'SWALLOWING'
  | 'TONGUE';

interface AssetConfig {
  type: 'image' | 'animation' | 'component';
  path: string;
  component?: React.ReactNode;
}

/**
 * Centralized service to manage character assets across different levels.
 * This structure allows easy swapping of static images for animations (GIF, Lottie, etc.)
 * without changing the layout logic.
 */
export const getCharacterAsset = (level: number, type: CharacterType): AssetConfig => {
  // Use animations for Level 1
  if (level === 1) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'postura.webm',
      POSTURE: 'postura.webm',
      CELEBRATION: 'palmas.webm',
      CHECKING: 'checando.webm',
      SWALLOWING: 'bebendo.webm',
      TONGUE: 'lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 2
  if (level === 2) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'Laranja1_postura.webm',
      POSTURE: 'Laranja1_postura.webm',
      CELEBRATION: 'Laranja1_Comemora.webm',
      CHECKING: 'Laranja1_Checando.webm',
      SWALLOWING: 'Laranja1_bebendo.webm',
      TONGUE: 'Laranja1_lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 3
  if (level === 3) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'Roxo_postura.webm',
      POSTURE: 'Roxo_postura.webm',
      CELEBRATION: 'Roxo_comemorando.webm',
      CHECKING: 'Roxo_checando.webm',
      SWALLOWING: 'Roxo_agua.webm',
      TONGUE: 'Roxo_lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 4
  if (level === 4) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'Azul_Postura.webm',
      POSTURE: 'Azul_Postura.webm',
      CELEBRATION: 'Azul_Comemora.webm',
      CHECKING: 'Azul_Checando.webm',
      SWALLOWING: 'Azul_agua.webm',
      TONGUE: 'Azul_lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 5
  if (level === 5) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'Laranja2_postura.webm',
      POSTURE: 'Laranja2_postura.webm',
      CELEBRATION: 'Laranja2_palmas.webm',
      CHECKING: 'Laranja2_checando.webm',
      SWALLOWING: 'Laranja2_agua.webm',
      TONGUE: 'Laranja2_Lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 6
  if (level === 6) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'Vermelho_postura.webm',
      POSTURE: 'Vermelho_postura.webm',
      CELEBRATION: 'Vermelho_Comemorando.webm',
      CHECKING: 'Vermelho_Checando.webm',
      SWALLOWING: 'Vermelho_agua.webm',
      TONGUE: 'Vermelho_Lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
    };
  }

  // Use animations for Level 7
  if (level === 7) {
    const webFiles: Record<CharacterType, string> = {
      NORMAL: 'AzulEBranco_postura.webm',
      POSTURE: 'AzulEBranco_postura.webm',
      CELEBRATION: 'AzulEBranco_comemorando.webm',
      CHECKING: 'AzulEBranco_checando.webm',
      SWALLOWING: 'AzulEBranco_agua.webm',
      TONGUE: 'AzulEBranco_Lingua.webm',
    };

    return {
      type: 'animation',
      path: `/images/nivel${level}/${webFiles[type]}`
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

/**
 * Component to render the character based on its asset configuration.
 * If we switch to Lottie or Video, we just update this component.
 */
export const CharacterRenderer: React.FC<{ 
  config: AssetConfig; 
  className?: string;
  alt?: string;
}> = ({ config, className, alt = "Character" }) => {
  if (config.type === 'component' && config.component) {
    return <div className={className}>{config.component}</div>;
  }

  if (config.type === 'animation') {
    // If it's a mov or webm, use video tag
    if (config.path.endsWith('.webm')) {
      return (
        <video 
          key={config.path}
          src={config.path.replace('.webm', '.mov')}
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
        />
      );
    }
    
    // For WebP or GIF animations, use img tag
    return (
      <img 
        src={config.path.replace('.webm', '.mov')} 
        className={className} 
        alt={alt} 
        referrerPolicy="no-referrer" 
      />
    );
  }

  return (
    <img 
      src={config.path.replace('.webm', '.mov')} 
      className={className} 
      alt={alt} 
      referrerPolicy="no-referrer" 
    />
  );
};
