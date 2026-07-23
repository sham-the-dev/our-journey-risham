// Web Audio API Synthesizers for a tactile scrapbook feel
// This avoids downloading audio assets and works instantly with zero latency!

let audioCtx = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Plays a realistic, soft paper rustle / page-turning sound
export const playPageTurnSound = () => {
  try {
    const ctx = getAudioContext();
    const duration = 0.35; // 350ms
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate soft white noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Bandpass filter to shape the noise to sound like paper rustle
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + duration);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
    
    // Lowpass filter to smooth out high harsh frequencies
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(3000, ctx.currentTime);
    lowpass.frequency.linearRampToValueAtTime(1500, ctx.currentTime + duration);
    
    // Volume envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.08); // Quick fade-in
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // Smooth decay
    
    noiseSource.connect(filter);
    filter.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);
    
    noiseSource.start();
  } catch (error) {
    console.warn("Failed to play page turn sound:", error);
  }
};

// Plays a gentle, organic book-like tap/click sound
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    // Frequency sweeps down quickly to sound like a soft tap
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (error) {
    console.warn("Failed to play click sound:", error);
  }
};
