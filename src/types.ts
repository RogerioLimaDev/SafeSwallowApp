export interface PostureMetrics {
  shoulderAngle: number;
  spineAngle: number;
  isStraight: boolean;
  score: number;
  headAngle: number;
}

export type MissionStep = 'START' | 'HOW_IT_WORKS' | 'CANDY_BOX_SELECT' | 'CAMERA_INVITE' | 'POSTURE' | 'WATER' | 'TONGUE' | 'SWALLOW' | 'MID_MISSION_REWARD' | 'VIDEO_REWARD' | 'SUCCESS';

export type PillSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface NotificationType {
  message: string;
  type: 'error' | 'info' | 'success';
}
