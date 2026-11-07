import { useCallback, useEffect, useRef, useState } from "react";

const MIME_TYPES = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm", "audio/ogg;codecs=opus"];
const pickMime = () => (typeof MediaRecorder === "undefined" ? "" : MIME_TYPES.find(t => MediaRecorder.isTypeSupported(t)) || "");

/**
 * Clean voice recorder:
 * 1) Browser-level echo cancellation + noise suppression + auto gain
 * 2) Web Audio chain: high-pass (fan/AC hum hatao) → low-pass (hiss hatao) → compressor (awaaz even) → gain
 * 3) Opus 128 kbps mono recording
 */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [levels, setLevels] = useState(() => Array(40).fill(0));
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const refs = useRef({});

  const cleanup = useCallback(() => {
    const r = refs.current;
    cancelAnimationFrame(r.raf);
    clearInterval(r.timer);
    r.stream?.getTracks().forEach(t => t.stop());
    if (r.ctx && r.ctx.state !== "closed") r.ctx.close().catch(() => {});
    refs.current = {};
  }, []);

  const start = useCallback(async ({ onDone } = {}) => {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Recording is not supported in this browser.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1, sampleRate: 48000 },
      });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);

      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass"; highpass.frequency.value = 90; highpass.Q.value = 0.7;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass"; lowpass.frequency.value = 7800; lowpass.Q.value = 0.7;
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -26; compressor.knee.value = 20; compressor.ratio.value = 3.5;
      compressor.attack.value = 0.004; compressor.release.value = 0.22;
      const gain = ctx.createGain(); gain.gain.value = 1.35;
      const analyser = ctx.createAnalyser(); analyser.fftSize = 1024;
      const dest = ctx.createMediaStreamDestination();

      src.connect(highpass).connect(lowpass).connect(compressor).connect(gain);
      gain.connect(analyser);
      gain.connect(dest);

      const mimeType = pickMime();
      const rec = new MediaRecorder(dest.stream, { ...(mimeType && { mimeType }), audioBitsPerSecond: 128000 });
      const chunks = [];
      const startedAt = Date.now();
      rec.ondataavailable = e => e.data.size && chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || mimeType || "audio/webm" });
        const duration = Math.round((Date.now() - startedAt) / 1000);
        cleanup();
        setRecording(false);
        onDone?.({ blob, duration, mime: blob.type });
      };

      const data = new Uint8Array(analyser.fftSize);
      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) { const v = (data[i] - 128) / 128; sum += v * v; }
        const rms = Math.min(1, Math.sqrt(sum / data.length) * 3.2);
        setLevels(prev => [...prev.slice(1), rms]);
        refs.current.raf = requestAnimationFrame(tick);
      };

      refs.current = { stream, ctx, rec, raf: requestAnimationFrame(tick), timer: setInterval(() => setSeconds(s => s + 1), 1000) };
      setSeconds(0);
      setLevels(Array(40).fill(0));
      rec.start(250);
      setRecording(true);
      return true;
    } catch (e) {
      cleanup();
      setError(e.name === "NotAllowedError" ? "Microphone permission blocked. Allow mic in the browser address bar." : "Could not start mic: " + e.message);
      return false;
    }
  }, [cleanup]);

  const stop = useCallback(() => {
    const rec = refs.current.rec;
    if (rec && rec.state !== "inactive") rec.stop();
  }, []);

  useEffect(() => () => { const rec = refs.current.rec; if (rec && rec.state !== "inactive") rec.stop(); cleanup(); }, [cleanup]);

  return { recording, levels, seconds, error, start, stop };
}
