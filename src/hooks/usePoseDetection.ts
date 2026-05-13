import { useCallback, useEffect, useRef, useState } from 'react';
import { Pose, Results, POSE_CONNECTIONS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { PostureMetrics, MissionStep } from '../types';

interface UsePoseDetectionProps {
  isCameraActive: boolean;
  currentStep: MissionStep;
  isCelebrating: boolean;
  onStepAdvance: (nextStep: MissionStep) => void;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export const usePoseDetection = ({
  isCameraActive,
  currentStep,
  isCelebrating,
  onStepAdvance,
  onSuccess,
  onError
}: UsePoseDetectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const isCameraLoadingRef = useRef(false);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  const [metrics, setMetrics] = useState<PostureMetrics>({
    shoulderAngle: 0,
    spineAngle: 0,
    isStraight: true,
    score: 100,
    headAngle: 0
  });
  const [postureTimer, setPostureTimer] = useState(0);
  const [headTiltTimer, setHeadTiltTimer] = useState(0);
  const [baselineHeadAngle, setBaselineHeadAngle] = useState<number | null>(null);

  const currentStepRef = useRef<MissionStep>(currentStep);
  const headTiltTimerRef = useRef(0);
  const baselineHeadAngleRef = useRef<number | null>(null);
  const onStepAdvanceRef = useRef(onStepAdvance);
  const onSuccessRef = useRef(onSuccess);
  const isCelebratingRef = useRef(isCelebrating);

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  useEffect(() => {
    isCelebratingRef.current = isCelebrating;
  }, [isCelebrating]);

  useEffect(() => {
    onStepAdvanceRef.current = onStepAdvance;
  }, [onStepAdvance]);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    headTiltTimerRef.current = headTiltTimer;
  }, [headTiltTimer]);

  useEffect(() => {
    baselineHeadAngleRef.current = baselineHeadAngle;
  }, [baselineHeadAngle]);

  const calculateAngle = (p1: any, p2: any, p3: any) => {
    const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
  };

  const onResults = useCallback((results: Results) => {
    if (isCameraLoadingRef.current) {
      isCameraLoadingRef.current = false;
      setIsCameraLoading(false);
    }
    if (!canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    // Set canvas dimensions to match the input image to prevent pixelation
    if (canvasRef.current.width !== results.image.width || canvasRef.current.height !== results.image.height) {
      canvasRef.current.width = results.image.width;
      canvasRef.current.height = results.image.height;
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    if (results.poseLandmarks) {
      const nose = results.poseLandmarks[0];
      const leftShoulder = results.poseLandmarks[11];
      const rightShoulder = results.poseLandmarks[12];
      const leftHip = results.poseLandmarks[23];
      const rightHip = results.poseLandmarks[24];

      if (nose && leftShoulder && rightShoulder) {
        const midShoulderY = (leftShoulder.y + rightShoulder.y) / 2;
        const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);
        const headDiff = midShoulderY - nose.y;
        const normalizedTilt = headDiff / shoulderWidth;
        
        // Adjust sensitivity: 0.45 was too high for some cameras/distances.
        // We'll use a more generous baseline and scale.
        const rawHeadAngle = Math.max(0, Math.min(90, (normalizedTilt - 0.3) * 180));
        
        const currentHeadAngle = baselineHeadAngleRef.current !== null 
          ? Math.max(0, Math.round(rawHeadAngle - (baselineHeadAngleRef.current * 0.5)))
          : Math.round(rawHeadAngle);

        setMetrics(prev => ({ 
          ...prev, 
          headAngle: currentHeadAngle
        }));

        if (currentStepRef.current === 'SWALLOW') {
          if (currentHeadAngle > 18) {
            setHeadTiltTimer(prev => {
              const next = prev + 1;
              if (next >= 45) {
                onSuccessRef.current();
              }
              return next;
            });
          } else {
            setHeadTiltTimer(0);
          }
        }

        const shouldersVisible = (leftShoulder.visibility ?? 0) > 0.5 && (rightShoulder.visibility ?? 0) > 0.5;
        const hipsVisible = leftHip && rightHip && (leftHip.visibility ?? 0) > 0.5 && (rightHip.visibility ?? 0) > 0.5;
        const noseVisible = (nose.visibility ?? 0) > 0.5;

        let isStraight = true;
        let spineAngle = 0;

        if (shouldersVisible) {
          const midShoulder = { x: (leftShoulder.x + rightShoulder.x) / 2, y: (leftShoulder.y + rightShoulder.y) / 2 };
          const basePoint = hipsVisible 
            ? { x: (leftHip.x + rightHip.x) / 2, y: (leftHip.y + rightHip.y) / 2 }
            : { x: midShoulder.x, y: midShoulder.y + 0.2 };
          
          if (noseVisible) {
            const verticalPoint = { x: midShoulder.x, y: midShoulder.y - 0.5 };
            spineAngle = calculateAngle(nose, midShoulder, verticalPoint);
          } else if (hipsVisible) {
            const verticalPoint = { x: basePoint.x, y: basePoint.y - 0.5 };
            spineAngle = calculateAngle(midShoulder, basePoint, verticalPoint);
          }

          const threshold = noseVisible ? 25 : 15;
          isStraight = spineAngle < threshold;

          setMetrics(prev => ({
            ...prev,
            spineAngle,
            isStraight,
            score: currentStepRef.current === 'POSTURE' 
              ? (isStraight ? Math.min(100, prev.score + 0.2) : Math.max(0, prev.score - 0.8))
              : prev.score
          }));

          if (isStraight && currentStepRef.current === 'POSTURE' && !isCelebratingRef.current) {
            setPostureTimer(t => {
              const next = t + 1;
              if (next >= 60) {
                setBaselineHeadAngle(rawHeadAngle);
                onStepAdvanceRef.current('WATER');
                return 0;
              }
              return next;
            });
          } else if (!isStraight) {
            setPostureTimer(0);
          }

          if (currentStepRef.current === 'POSTURE' || currentStepRef.current === 'SWALLOW') {
            drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
              color: currentStepRef.current === 'SWALLOW' 
                ? (currentHeadAngle > 18 ? '#4CAF50' : '#FFB84D')
                : (isStraight ? '#4CAF50' : '#FFB84D'),
              lineWidth: 8
            });
            drawLandmarks(canvasCtx, results.poseLandmarks, {
              color: '#ffffff',
              lineWidth: 2,
              radius: 5
            });
          }
        }
      }
    }
    canvasCtx.restore();
  }, []);

  useEffect(() => {
    if (!isCameraActive) {
      setIsCameraLoading(false);
      isCameraLoadingRef.current = false;
      return;
    }

    setIsCameraLoading(true);
    isCameraLoadingRef.current = true;
    let isClosed = false;
    
    // Initialize Pose only once
    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 0, // Use lighter model (0 instead of 1) for faster initialization
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults((results) => {
      if (!isClosed) onResults(results);
    });

    let camera: Camera | null = null;
    if (videoRef.current) {
      try {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && !isClosed) {
              try { await pose.send({ image: videoRef.current }); } catch (e) {}
            }
          },
          // Lower resolution for faster startup and better performance
          width: 640,
          height: 480,
        });
        camera.start().catch(err => {
          console.error("Camera start error:", err);
          setIsCameraLoading(false);
          isCameraLoadingRef.current = false;
          if (onErrorRef.current) {
            onErrorRef.current(err.message || String(err));
          }
        });
      } catch (err: any) {
        console.error("Camera init error:", err);
        setIsCameraLoading(false);
        isCameraLoadingRef.current = false;
        if (onErrorRef.current) {
          onErrorRef.current(err.message || String(err));
        }
      }
    }

    return () => {
      isClosed = true;
      if (camera) camera.stop();
      pose.close();
    };
  }, [isCameraActive, onResults]);

  return {
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
  };
};
