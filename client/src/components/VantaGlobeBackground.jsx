/**
 * REMOVED: Vanta + THREE.js 3D Globe
 *
 * Reason: THREE.js adds ~500KB to the JS bundle and blocks the main thread
 * during GPU initialization → direct cause of the 4s+ LCP.
 *
 * Replacement: The CSS radial glow divs in App.jsx already provide the same
 * dark + neon-purple/green visual language at ZERO runtime cost.
 */
export default function VantaGlobeBackground() {
  return null;
}
