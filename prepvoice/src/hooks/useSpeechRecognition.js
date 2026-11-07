import { useCallback, useEffect, useRef, useState } from "react";

const SR = typeof window !== "undefined" ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

/**
 * Browser speech-to-text (Chrome, Edge, Safari). Indian English by default.
 * continuous: true  -> keeps listening (practice answers)
 * continuous: false -> stops after one sentence (search)
 */
export function useSpeechRecognition({ lang = "en-IN", continuous = false, onFinal } = {}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recRef = useRef(null);
  const wantRef = useRef(false);
  const finalRef = useRef("");
  const onFinalRef = useRef(onFinal);
  useEffect(() => { onFinalRef.current = onFinal; }, [onFinal]);

  const stop = useCallback(() => {
    wantRef.current = false;
    try { recRef.current?.stop(); } catch { /* already stopped */ }
  }, []);

  const start = useCallback(() => {
    if (!SR) { setError("Voice input is not supported in this browser. Use Chrome or Edge."); return; }
    try { recRef.current?.abort(); } catch { /* ignore */ }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = continuous;
    rec.maxAlternatives = 1;
    finalRef.current = "";
    setTranscript("");
    setError("");
    wantRef.current = true;

    rec.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalRef.current += r[0].transcript + " ";
        else interim += r[0].transcript;
      }
      setTranscript((finalRef.current + interim).trim());
    };
    rec.onerror = e => {
      if (e.error === "no-speech" || e.error === "aborted") return;
      const msg = { "not-allowed": "Microphone permission blocked. Allow mic in the browser address bar.", network: "Voice needs internet (Chrome uses Google speech service)." }[e.error];
      setError(msg || "Voice error: " + e.error);
      wantRef.current = false;
    };
    rec.onend = () => {
      // Chrome continuous mode khud band ho jaata hai silence pe — dobara start karo
      if (continuous && wantRef.current) {
        try { rec.start(); return; } catch { /* fallthrough */ }
      }
      setListening(false);
      wantRef.current = false;
      const text = finalRef.current.trim();
      if (text) onFinalRef.current?.(text);
    };

    recRef.current = rec;
    try { rec.start(); setListening(true); } catch (err) { setError(String(err.message || err)); }
  }, [lang, continuous]);

  useEffect(() => () => { wantRef.current = false; try { recRef.current?.abort(); } catch { /* ignore */ } }, []);

  return { supported: !!SR, listening, transcript, error, start, stop, setTranscript };
}
