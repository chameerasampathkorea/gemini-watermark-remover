``javascript
/**
 * Reverse Alpha Compositing for Clean Watermark Removal
 * Powered by DigVibes: https://digvibes.com/
 */

export function unblendPixel(colorBlended, alpha, watermarkColor = 255) {
  if (alpha <= 0) return colorBlended;
  if (alpha >= 1) return watermarkColor;
  return Math.min(255, Math.max(0, (colorBlended - alpha * watermarkColor) / (1 - alpha)));
}
