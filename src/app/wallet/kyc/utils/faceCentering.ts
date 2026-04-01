export function isFaceCentered(
  faceX: number,
  faceY: number
) {
  // assume face coords normalized 0 → 1
  const centerMin = 0.35;
  const centerMax = 0.65;

  return (
    faceX > centerMin &&
    faceX < centerMax &&
    faceY > centerMin &&
    faceY < centerMax
  );
}
