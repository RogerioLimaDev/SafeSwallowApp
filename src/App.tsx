import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-[#1a1a2e] p-8">
          <div className="text-center text-white">
            <h1 className="text-xl font-bold mb-4">Algo deu errado</h1>
            <p className="text-sm opacity-70 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-brand-yellow text-black rounded-lg"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Components ---
import { StartScreen } from './components/screens/StartScreen';
import { HowItWorksScreen } from './components/screens/HowItWorksScreen';
import { CandyBoxSelect } from './components/screens/CandyBoxSelect';
import { CameraInviteScreen } from './components/screens/CameraInviteScreen';
import { VideoRewardScreen } from './components/screens/VideoRewardScreen';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { MissionOverlay } from './components/mission/MissionOverlay';
import { Header } from './components/layout/Header';
import { HelpModal } from './components/layout/HelpModal';
import { Notification } from './components/layout/Notification';
import { CameraFeed } from './components/camera/CameraFeed';

// --- Hooks & Services ---
import { usePoseDetection } from './hooks/usePoseDetection';
import { 
  captureFrame, 
  verifyWaterWithGemini, 
  verifyTongueWithGemini 
} from './services/geminiService';

// --- Types ---
import { MissionStep, PillSize, NotificationType } from './types';

export default function App() {
  // --- State ---
  const [currentStep, setCurrentStep] = useState<MissionStep>('START');
  const [pillSize, setPillSize] = useState<PillSize | null>(null);
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  
  const [isVerifyingWater, setIsVerifyingWater] = useState(false);
  const [isVerifyingTongue, setIsVerifyingTongue] = useState(false);
  const [waterProgress, setWaterProgress] = useState(0);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState<number>(7);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [levelStats, setLevelStats] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('safe_swallow_stats');
    return saved ? JSON.parse(saved) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  });

  useEffect(() => {
    localStorage.setItem('safe_swallow_stats', JSON.stringify(levelStats));
  }, [levelStats]);

  // --- Preload Assets ---
  // Preload inteligente - carrega apenas a imagem da tela atual
  useEffect(() => {
    const getBackgroundImage = () => {
      switch (currentStep) {
        case 'START':
          return '/images/TelaAbertura_v2.webp';
        case 'HOW_IT_WORKS':
          return '/images/bgComoFunciona_v2.webp';
        case 'CANDY_BOX_SELECT':
          return '/images/bgCaixas.webp';
        case 'CAMERA_INVITE':
          return '/images/bgLigarACamera_v2.webp';
        case 'MID_MISSION_REWARD':
        case 'VIDEO_REWARD':
        case 'SUCCESS':
          return '/images/bgTelaFinal_v2.webp';
        default:
          return null;
      }
    };

    const getNextScreenImage = () => {
      switch (currentStep) {
        case 'START':
          return '/images/bgCaixas.webp';
        case 'HOW_IT_WORKS':
          return '/images/bgLigarACamera_v2.webp';
        default:
          return null;
      }
    };

    const bgImage = getBackgroundImage();
    const nextImage = getNextScreenImage();

    if (bgImage) {
      const img = new Image();
      img.src = bgImage;
    }
    if (nextImage) {
      const img = new Image();
      img.src = nextImage;
    }
  }, [currentStep]);

  useEffect(() => {
    console.log("Current Unlocked Levels:", unlockedLevels);
  }, [unlockedLevels]);

  // --- Callbacks for Hook ---
  const handleStepAdvance = useCallback((nextStep: MissionStep) => {
    if (isCelebrating) return;

    if (currentStep === 'POSTURE' && nextStep === 'WATER') {
      setIsCelebrating(true);
      
      // Trigger celebration confetti
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Gold, Orange, and White colors to match the brand and reference
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#FFD700', '#FF6321', '#FFFFFF'] });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#FFD700', '#FF6321', '#FFFFFF'] });
      }, 250);

      // Wait 6 seconds before actually advancing to WATER to ensure confetti is gone
      setTimeout(() => {
        setIsCelebrating(false);
        setCurrentStep('WATER');
      }, 6000);
      
      return; // Don't advance immediately
    }
    setCurrentStep(nextStep);
  }, [currentStep, isCelebrating]);

  const handleSuccess = useCallback(() => {
    console.log("Mission Success! Transitioning to video reward...");
    setCurrentStep('VIDEO_REWARD');
    setIsCameraActive(false);
  }, []);

  // --- Hook Integration ---
  const {
    videoRef,
    canvasRef,
    isCameraLoading,
    metrics,
    postureTimer,
    headTiltTimer,
    setPostureTimer,
    setHeadTiltTimer,
    setBaselineHeadAngle,
    setMetrics
  } = usePoseDetection({
    isCameraActive,
    currentStep,
    isCelebrating,
    onStepAdvance: handleStepAdvance,
    onSuccess: handleSuccess,
    onError: (error) => {
      showNotification(`Erro na câmera: ${error}`, "error");
      setIsCameraActive(false);
      setCurrentStep('CAMERA_INVITE');
    }
  });

  // --- Helpers ---
  const showNotification = (message: string, type: 'error' | 'info' | 'success' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleVerifyWater = async (skipAI = false) => {
    // Start countdown
    setCountdown(3);
    for (let i = 2; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(i);
    }
    setCountdown(null);

    setIsVerifyingWater(true);
    try {
      // Capture frame from video
      const videoElement = document.querySelector('video');
      const videoRef = { current: videoElement };
      const imageData = captureFrame(videoRef as any);
      
      let success = false;
      
      if (!skipAI && imageData) {
        success = await verifyWaterWithGemini(imageData);
      } else {
        // Skip AI verification
        success = true;
      }
      
      if (success) {
        setWaterProgress(prev => {
          const next = prev + 1;
          if (next >= 1) {
            showNotification("Bebeu direitinho!\nPrimeira etapa, completa!", "success");
            
            // Wait 1 second to show the full glass before celebrating
            setTimeout(() => {
              setIsCelebrating(true);
              // Trigger celebration burst
              confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
              
              // Wait for celebration to finish before advancing
              setTimeout(() => {
                setIsCelebrating(false);
                setCurrentStep('MID_MISSION_REWARD');
              }, 3000);
            }, 1000);
          } else {
            showNotification(`Copo ${next}/1! Continue!`, "success");
          }
          return next;
        });
      }
    } catch (error: any) {
      showNotification(`Erro: ${error.message || "Falha na verificação."}`, "error");
    } finally {
      setIsVerifyingWater(false);
    }
  };

  const handleVerifyTongue = async (skipAI = false) => {
    // Start countdown
    setCountdown(3);
    for (let i = 2; i >= 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(i);
    }
    setCountdown(null);

    setIsVerifyingTongue(true);
    try {
      // Capture frame from video
      const videoElement = document.querySelector('video');
      const videoRef = { current: videoElement };
      const imageData = captureFrame(videoRef as any);
      
      let success = false;
      
      if (!skipAI && imageData) {
        success = await verifyTongueWithGemini(imageData);
      } else {
        // Skip AI verification
        success = true;
      }

      if (success) {
        setIsCelebrating(true);
        showNotification("Comprimido na posição! Agora vamos engolir!", "success");
        
        // Trigger celebration burst
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        
        // Wait for celebration to finish before advancing
        setTimeout(() => {
          setIsCelebrating(false);
          setCurrentStep('SWALLOW');
        }, 3000);
      }
    } catch (error) {
      showNotification("Erro ao verificar língua.", "error");
    } finally {
      setIsVerifyingTongue(false);
    }
  };

  const resetMission = () => {
    if (currentStep === 'SUCCESS') {
      setUnlockedLevels(prev => {
        // Unlock the next level based on the level just completed
        const next = Math.max(prev, currentLevel + 1);
        const cappedNext = Math.min(next, 7); // Max 7 levels
        console.log(`Unlocking next level on reset: ${prev} -> ${cappedNext} (Completed Level ${currentLevel})`);
        return cappedNext;
      });
    }
    
    setCurrentStep('START');
    setIsCelebrating(false);
    setMetrics({
      shoulderAngle: 0,
      spineAngle: 0,
      isStraight: true,
      score: 100,
      headAngle: 0
    });
    setPostureTimer(0);
    setHeadTiltTimer(0);
    setBaselineHeadAngle(null);
    setPillSize(null);
    setSelectedBox(null);
    setWaterProgress(0);
    setIsCameraActive(false);
  };

  return (
    <ErrorBoundary>
    <div className={`fixed inset-0 overflow-hidden font-sans ${
      currentStep === 'START' ? 'bg-main-gradient' : 
      currentStep === 'HOW_IT_WORKS' ? 'bg-how-it-works' : 
      currentStep === 'CANDY_BOX_SELECT' ? 'bg-with-logo' :
      currentStep === 'CAMERA_INVITE' ? 'bg-camera-invite' :
      currentStep === 'MID_MISSION_REWARD' || currentStep === 'VIDEO_REWARD' ? 'bg-black' :
      currentStep === 'SUCCESS' ? 'bg-success' :
      isCameraActive ? 'bg-transparent' : 'bg-black'
    }`}>
      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 'START' && <StartScreen onStart={setCurrentStep} />}
          {currentStep === 'HOW_IT_WORKS' && <HowItWorksScreen onNext={setCurrentStep} />}
          {currentStep === 'CANDY_BOX_SELECT' && (
            <CandyBoxSelect 
              setPillSize={setPillSize} 
              onNext={setCurrentStep} 
              unlockedLevels={unlockedLevels}
              onSelectLevel={setCurrentLevel}
            />
          )}
          {currentStep === 'CAMERA_INVITE' && (
            <CameraInviteScreen 
              currentLevel={currentLevel}
              onNext={() => {
                setIsCameraActive(true);
                setCurrentStep('POSTURE');
              }} 
            />
          )}
          {currentStep === 'MID_MISSION_REWARD' && (
            <VideoRewardScreen 
              currentLevel={currentLevel} 
              videoType="MID"
              onFinish={() => {
                setCurrentStep('TONGUE');
              }} 
            />
          )}
          {currentStep === 'VIDEO_REWARD' && (
            <VideoRewardScreen 
              currentLevel={currentLevel} 
              videoType="FINAL"
              onFinish={() => {
                setLevelStats(prev => ({
                  ...prev,
                  [currentLevel]: (prev[currentLevel] || 0) + 1
                }));
                setCurrentStep('SUCCESS');
                confetti({
                  particleCount: 200,
                  spread: 120,
                  origin: { y: 0.5 },
                  colors: ['#FF6321', '#FF4E8D', '#4E8DFF', '#4EFFFF']
                });
              }} 
            />
          )}
          {currentStep === 'SUCCESS' && (
            <SuccessScreen 
              onReset={resetMission} 
              currentLevel={currentLevel} 
              isLastLevel={currentLevel === 7} 
              completionCounts={levelStats}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Background Camera Feed Layer */}
      <CameraFeed 
        isCameraActive={isCameraActive} 
        isCameraLoading={isCameraLoading} 
        videoRef={videoRef} 
        canvasRef={canvasRef} 
      />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {currentStep !== 'TRANSITION' && currentStep !== 'SUCCESS' && currentStep !== 'VIDEO_REWARD' && currentStep !== 'MID_MISSION_REWARD' && (
          <>
            <Header 
              currentStep={currentStep} 
              isCameraActive={isCameraActive} 
              onShowHelp={() => setShowHelp(true)} 
              onReset={resetMission} 
            />

            <MissionOverlay 
              currentStep={currentStep}
              currentLevel={currentLevel}
              metrics={metrics}
              postureTimer={postureTimer}
              waterProgress={waterProgress}
              headTiltTimer={headTiltTimer}
              isVerifyingWater={isVerifyingWater}
              isVerifyingTongue={isVerifyingTongue}
              isCelebrating={isCelebrating}
              countdown={countdown}
              onVerifyWater={handleVerifyWater}
              onVerifyTongue={handleVerifyTongue}
              onSuccess={handleSuccess}
              onStepAdvance={handleStepAdvance}
            />

            <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
            <Notification notification={notification} />
          </>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}
