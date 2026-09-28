# ⚡ Client-Side Gemini AI Watermark Remover

A lightweight, purely browser-based utility to remove visible semi-transparent watermarks from Gemini AI generated images without server uploads or heavy neural model dependencies.

🔗 **Live Tool & Web App:** [https://digvibes.com/](https://digvibes.com/)

---

## 🚀 Live Demos & Web Access

* **Image Remover (Instant Canvas):** [DigVibes Image Studio](https://digvibes.com/)
* **Video Watermark Tool:** [DigVibes Video Suite](https://digvibes.com/veo-watermark-remover/)
* **Complete Documentation & Guide:** [How to Remove Gemini Watermark](https://digvibes.com/how-to-remove-gemini-watermark/)

---

## 🛠️ How It Works (Reverse Blending)

Standard inpainting tools blur or distort surrounding pixels using generative diffusion models. This project utilizes an inverse alpha compositing approach:

1. **Overlay Identification:** Isolates the predictable 4-point sparkle logo coordinates and opacity map in the corner.
2. **Mathematical Alpha Unblending:** Reconstructs original RGB pixel values prior to standard alpha blending:
   $$C_{original} = \frac{C_{blended} - \alpha \times C_{watermark}}{1 - \alpha}$$
3. **Zero Data Transmission:** Runs 100% locally in the browser via HTML5 2D Canvas context. Your media never leaves your device.

---

## 💻 Standalone Quick Demo (Vanilla JavaScript)

```javascript
// Basic Reverse Blending Canvas Routine
function restorePixel(blended, alpha, watermarkVal) {
  return Math.min(255, Math.max(0, Math.round((blended - alpha * watermarkVal) / (1 - alpha))));
}

function processCanvas(ctx, x, y, width, height, alphaEstimate = 0.5) {
  const imgData = ctx.getImageData(x, y, width, height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i]     = restorePixel(data[i], alphaEstimate, 255);     // Red
    data[i + 1] = restorePixel(data[i + 1], alphaEstimate, 255); // Green
    data[i + 2] = restorePixel(data[i + 2], alphaEstimate, 255); // Blue
  }
  ctx.putImageData(imgData, x, y);
}
