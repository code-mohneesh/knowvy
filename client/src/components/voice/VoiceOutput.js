let synth = null;
let currentUtterance = null;

// Initialize on browser
if (typeof window !== 'undefined') {
  synth = window.speechSynthesis;
}

/**
 * Speak using browser's built-in TTS (no API needed)
 */
export async function speak(text) {
  try {
    stopSpeaking();

    if (!synth) {
      console.error("Speech synthesis not available");
      return;
    }

    // Create new utterance
    currentUtterance = new SpeechSynthesisUtterance(text);

    // Settings for better voice
    currentUtterance.rate = 0.95;     // Slightly slower for clarity
    currentUtterance.pitch = 1.0;     // Normal pitch
    currentUtterance.volume = 1.0;    // Full volume
    currentUtterance.lang = 'en-US';  // English US

    // Try to get a good voice
    const voices = synth.getVoices();
    if (voices.length > 0) {
      // Prefer Google or Microsoft voices if available
      const goodVoice = voices.find(v =>
        v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Microsoft'))
      ) || voices.find(v => v.lang.includes('en')) || voices[0];

      currentUtterance.voice = goodVoice;
    }

    // Cleanup when done
    currentUtterance.onend = () => {
      currentUtterance = null;
    };

    currentUtterance.onerror = (err) => {
      console.error("Speech error:", err);
      currentUtterance = null;
    };

    // Start speaking
    synth.speak(currentUtterance);
  } catch (err) {
    console.error("Voice output error:", err);
  }
}

/**
 * Force stop AI speaking
 */
export function stopSpeaking() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
}

/**
 * Check if AI is speaking
 */
export function isSpeaking() {
  return synth && synth.speaking;
}
