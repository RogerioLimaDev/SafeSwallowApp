# Project Context: Safe Swallow

## Purpose
This application is designed to help children learn how to swallow pills (comprimidos) safely and confidently. 

## Key Features
- **Progressive Learning**: Uses levels (1-7) with increasing sizes/difficulties, using placebos (like candies or specific training items).
- **AI Monitoring**: Uses the camera to monitor posture and movements (via Gemini/AI integration).
- **Gamification**: Includes level selection, animations, and rewards.

## Tech Stack
- React with Vite
- Tailwind CSS
- Motion (for animations)
- Gemini API (for posture/swallowing analysis)

## Important Notes
- This is **NOT** a speech therapy (fonoaudiologia) app. It is specifically for pill swallowing training.
- Animations for all levels (1 to 7) are already implemented and functional in `src/services/assetService.tsx`.
- The user is the primary developer of the assets and keeps track of the level progress.
