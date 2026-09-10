let audioCtx: AudioContext | null = null;
let soundscapeNodes: { source: AudioNode; gain: GainNode }[] = [];
let isSoundscapePlaying = false;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Text-to-speech with a gentle, soothing 0.85x cadence designed for older adults
 */
export function speakText(
  phrase: string,
  callbacks?: { onStart?: () => void; onEnd?: () => void; onError?: () => void }
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks?.onStart?.();
    setTimeout(() => callbacks?.onEnd?.(), 2000);
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.rate = 0.85; // Calibrated soothing pace for dementia care
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    if (callbacks?.onStart) utterance.onstart = () => callbacks.onStart?.();
    if (callbacks?.onEnd) utterance.onend = () => callbacks.onEnd?.();
    if (callbacks?.onError) utterance.onerror = () => callbacks.onError?.();

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    callbacks?.onError?.();
  }
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Friendly, gentle two-tone chime for task completions and safety check-ins
 */
export function playFriendlyChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5

    osc2.frequency.setValueAtTime(659.25, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.35); // G5

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.4);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.8);
  } catch {
    // Gracefully handle browser autoplay blocks
  }
}

/**
 * Calming sleep soundscape generator (Rain & Hearth fire simulation using filtered white noise)
 */
export function startSleepSoundscape(): boolean {
  if (isSoundscapePlaying) return true;
  try {
    const ctx = getAudioContext();
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Pink/brown noise generator for gentle rainfall sound
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to warm rain rumble
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.2);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();

    soundscapeNodes = [{ source: whiteNoise, gain }];
    isSoundscapePlaying = true;
    return true;
  } catch (err) {
    console.warn('Unable to play soundscape:', err);
    return false;
  }
}

export function stopSleepSoundscape(): void {
  try {
    if (soundscapeNodes.length > 0) {
      soundscapeNodes.forEach((node) => {
        try {
          (node.source as AudioBufferSourceNode).stop();
          node.source.disconnect();
        } catch {
          // Ignore
        }
      });
      soundscapeNodes = [];
    }
    isSoundscapePlaying = false;
  } catch {
    isSoundscapePlaying = false;
  }
}

export function isSoundscapeActive(): boolean {
  return isSoundscapePlaying;
}
