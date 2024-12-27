export function getScreenScale(window: Window, targetWidth: number, targetHeight: number) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const scaleX = width / targetWidth;
  const scaleY = height / targetHeight;
  const scale = Math.min(scaleX, scaleY);

  return scale;
}
