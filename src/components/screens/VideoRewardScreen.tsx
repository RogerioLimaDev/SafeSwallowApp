import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Loader2 } from 'lucide-react';

interface VideoRewardScreenProps {
  currentLevel: number;
  onFinish: () => void;
  videoType?: 'MID' | 'FINAL';
  playSound?: () => void;
}

export const VideoRewardScreen: React.FC<VideoRewardScreenProps> = ({ currentLevel, onFinish, videoType = 'MID', playSound }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  const prefix = videoType === 'FINAL' ? 'Final_0' : 'Comemorando_fase';
  const videoBaseUrl = `/videos/${prefix}${currentLevel}`;
  const videoSrcWebm = `${videoBaseUrl}.webm`;

  useEffect(() => {
    // Reset error when sources change
    setError(false);
    setIsMetadataLoaded(false);
    setIsPlaying(false);
    soundPlayedRef.current = false;
  }, [currentLevel, videoType]);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
        setIsPlaying(true);
        playSound?.();
      } catch (err) {
        console.error("Play gesture failed", err);
      }
    }
  };

  useEffect(() => {
    // Try to auto-play muted on mount - more aggressive approach
    const tryAutoplay = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.play()
          .then(() => {
            console.log("Autoplay succeeded");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log("Autoplay failed:", err.message);
          });
      }
    };

    // Try immediately
    tryAutoplay();
    
    // Also try after a short delay
    const timer = setTimeout(tryAutoplay, 1000);
    return () => clearTimeout(timer);
  }, [currentLevel, videoType]);

  // Track playing state from video events
  const soundPlayedRef = useRef(false);
  
  const handlePlay = () => {
    console.log("Video play event fired");
    setIsPlaying(true);
    if (!soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playSound?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/20 to-brand-green/20 opacity-40" />

      {!isMetadataLoaded && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[210] bg-black">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <p className="font-baruta text-white text-lg tracking-widest uppercase animate-pulse">
            Carregando sua recompensa...
          </p>
        </div>
      )}

      {error ? (
        <div className="text-white text-center p-6 z-[220] flex flex-col items-center gap-4">
          <p className="font-baruta text-xl uppercase italic">Erro ao carregar recompensa</p>
          <p className="text-[10px] text-white/30 font-mono tracking-tighter">Integridade violada: {videoSrcWebm}</p>
          <button 
            onClick={onFinish}
            className="mt-4 px-8 py-2 border border-white/20 hover:bg-white/10 text-white/60 font-baruta text-sm !rounded-[16px] transition-all"
          >
            PULAR VÍDEO
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 z-[205]">
          <video
            key={`${videoType}-${currentLevel}`}
            ref={videoRef}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isMetadataLoaded ? 'opacity-100' : 'opacity-0'}`}
            playsInline
            autoPlay
            muted
            onLoadedMetadata={() => {
              console.log("Video metadata loaded");
              setIsMetadataLoaded(true);
              // Try to autoplay on metadata load - iOS sometimes blocks earlier attempts
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(() => {});
              }
            }}
            onCanPlay={() => {
              // Force play on canplay - more reliable than metadata for autoplay
              if (videoRef.current && !isPlaying) {
                videoRef.current.play().catch(() => {});
              }
            }}
            onPlay={handlePlay}
            onPause={() => setIsPlaying(false)}
            onEnded={onFinish}
            preload="auto"
            onError={() => {
              // The error event on the video element is fired if all sources fail
              if (!isMetadataLoaded) {
                setError(true);
              }
            }}
          >
            <source src={videoSrcWebm} type="video/webm" />
          </video>

          {/* Success Text Box */}
          <AnimatePresence>
            {isMetadataLoaded && isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-[8%] left-1/2 -translate-x-1/2 z-[210] pointer-events-none"
              >
                <div className="bg-[#fcc96a] px-8 py-2 rounded-[10px] shadow-lg flex items-center justify-center min-w-[220px]">
                  <span className="text-white font-baruta text-3xl sm:text-4xl tracking-widest leading-none mt-1 whitespace-nowrap">
                    MUITO BEM!
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Manual Action Overlay */}
      <AnimatePresence>
        {!isPlaying && isMetadataLoaded && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[230] flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
            onClick={togglePlay}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform">
                <Play className="w-12 h-12 text-brand-orange fill-current ml-1" />
              </div>
              <div className="bg-black/60 px-6 py-2 rounded-full border border-white/20">
                <p className="text-white font-baruta text-xl uppercase tracking-wider text-center">
                  Toque para Assistir!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onFinish}
        className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full z-[240] backdrop-blur-md border border-white/20 transition-all active:scale-90"
        title="Pular"
      >
        <X className="w-6 h-6" />
      </button>
    </motion.div>
  );
};
