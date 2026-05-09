import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Loader2 } from 'lucide-react';

interface VideoRewardScreenProps {
  currentLevel: number;
  onFinish: () => void;
  videoType?: 'MID' | 'FINAL';
}

export const VideoRewardScreen: React.FC<VideoRewardScreenProps> = ({ currentLevel, onFinish, videoType = 'MID' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  
  const prefix = videoType === 'FINAL' ? 'Final_0' : 'Comemorando_fase';
  const videoBaseUrl = `/videos/${prefix}${currentLevel}`;
  
  const videoSrcWebm = `${videoBaseUrl}.webm`;
  const videoSrcMp4 = `${videoBaseUrl}.mp4`;
  
  // For MID videos: webm first, mp4 as fallback. For FINAL: webm only (no mp4 available)
  const sources = videoType === 'MID' ? (
    <>
      <source src={videoSrcWebm} type="video/webm" />
      <source src={videoSrcMp4} type="video/mp4" />
    </>
  ) : (
    <source src={videoSrcWebm} type="video/webm" />
  );

  useEffect(() => {
    setIsLoaded(false);
    setIsPlaying(false);
    setShowOverlay(true);
  }, [currentLevel, videoType]);

  // Try to autoplay using useLayoutEffect for earlier execution
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play immediately
    const attemptPlay = () => {
      video.muted = true;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowOverlay(false);
          })
          .catch(() => {
            // Autoplay blocked - will show overlay
            console.log("Autoplay blocked");
          });
      }
    };

    // If video is already ready, play now
    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      // Wait for canplay event
      const handleCanPlay = () => {
        attemptPlay();
        video.removeEventListener('canplay', handleCanPlay);
      };
      video.addEventListener('canplay', handleCanPlay);
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay as any);
    };
  }, [currentLevel, videoType]);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        videoRef.current.muted = false;
        await videoRef.current.play();
        setIsPlaying(true);
        setShowOverlay(false);
      } catch (err) {
        console.error("Play failed", err);
      }
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

      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-[210] bg-black">
          <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
          <p className="font-baruta text-white text-lg tracking-widest uppercase animate-pulse">
            Carregando sua recompensa...
          </p>
        </div>
      )}

      <div className="relative w-full h-full flex items-center justify-center z-[205]">
        <video
          key={`${videoType}-${currentLevel}`}
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          webkit-playsinline="true"
          autoPlay
          muted
          onLoadedData={() => {
            console.log("Video loaded");
            setIsLoaded(true);
          }}
          onPlay={() => {
            setIsPlaying(true);
            setShowOverlay(false);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={onFinish}
        >
          {sources}
        </video>

        {/* Success Text Box */}
        <AnimatePresence>
          {isPlaying && (
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

      {/* Manual Action Overlay */}
      <AnimatePresence>
        {showOverlay && !isPlaying && (
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
        className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full z-[240] backdrop-blur-md border border-white/20 transition-all active:scale-90"
        title="Pular"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.div>
  );
};
