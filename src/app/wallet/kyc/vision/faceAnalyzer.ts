/**
 * 🧠 Face Analyzer – MIRROR SAFE
 * - Matches mirrored camera preview
 * - User-friendly
 * - Enterprise-grade
 */

export interface FaceAnalysisResult {
  faceCentered: boolean;
  lookingLeft: boolean;
  lookingRight: boolean;
  blinkDetected: boolean;

  // debug
  noseOffset: number;
}

/* RELAXED */
const TURN_RATIO = 0.12;
const BLINK_THRESHOLD = 0.035;

export function analyzeFaceLandmarks(
  landmarks: any[]
): FaceAnalysisResult {
  if (!landmarks || landmarks.length < 468) {
    return {
      faceCentered: false,
      lookingLeft: false,
      lookingRight: false,
      blinkDetected: false,
      noseOffset: 0,
    };
  }

  const nose = landmarks[1];
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];

  const leftEyeTop = landmarks[159];
  const leftEyeBottom = landmarks[145];
  const rightEyeTop = landmarks[386];
  const rightEyeBottom = landmarks[374];

  const faceCenterX = (leftCheek.x + rightCheek.x) / 2;
  const faceWidth = Math.abs(leftCheek.x - rightCheek.x) || 0.0001;

  /**
   * 🔑 CRITICAL FIX
   * Because video is mirrored (scaleX(-1)),
   * we MUST mirror nose offset too
   */
  const rawOffset = (nose.x - faceCenterX) / faceWidth;
  const noseOffset = -rawOffset; // 👈 MIRROR FIX

  const lookingRight = noseOffset > TURN_RATIO;
  const lookingLeft = noseOffset < -TURN_RATIO;

  /**
   * ✅ Centered = NOT turning
   */
  const faceCentered = !lookingLeft && !lookingRight;

  const avgEyeOpen =
    (Math.abs(leftEyeTop.y - leftEyeBottom.y) +
      Math.abs(rightEyeTop.y - rightEyeBottom.y)) / 2;

  const blinkDetected = avgEyeOpen < BLINK_THRESHOLD;

  return {
    faceCentered,
    lookingLeft,
    lookingRight,
    blinkDetected,
    noseOffset,
  };
}
