import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, Square, Trash2, Download, AudioLines } from "lucide-react";
import { useRecorder } from "../hooks/useRecorder.js";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.js";
import { loadRecordings, saveRecording, deleteRecording } from "../lib/store.js";
import Waveform from "./Waveform.jsx";

const mmss = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/** Apna answer bolo → clean audio record + live text. Recordings is question ke saath save. */
export default function VoiceRecorder({ qid, compact = false }) {
  const rec = useRecorder();
  const speech = useSpeechRecognition({ continuous: true });
  const [list, setList] = useState([]);
  const transcriptRef = useRef("");
  useEffect(() => { transcriptRef.current = speech.transcript; }, [speech.transcript]);

  useEffect(() => {
    let alive = true;
    loadRecordings(qid).then(l => alive && setList(l));
    return () => { alive = false; };
  }, [qid]);

  const start = async () => {
    const ok = await rec.start({
      onDone: async ({ blob, duration, mime }) => {
        const next = await saveRecording(qid, { blob, duration, mime, transcript: transcriptRef.current || "", createdAt: Date.now() });
        setList(next);
      },
    });
    if (ok && speech.supported) speech.start();
  };
  const stop = () => { speech.stop(); rec.stop(); };
  const remove = async id => setList(await deleteRecording(qid, id));

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-4">
        <button onClick={rec.recording ? stop : start}
          className={`relative isolate flex size-14 shrink-0 items-center justify-center rounded-full text-accent-ink shadow-card transition ${rec.recording ? "pulse-ring bg-accent" : "bg-accent hover:brightness-110"}`}
          aria-label={rec.recording ? "Stop recording" : "Record your answer"}>
          {rec.recording ? <Square size={20} fill="currentColor" /> : <Mic size={24} />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{rec.recording ? "Recording… bolte raho" : "Apna answer record karo"}</div>
          <div className="text-xs text-muted">{rec.recording ? mmss(rec.seconds) + " · noise cancel on" : "Noise cancel + echo cancel + clean voice filter"}</div>
        </div>
        {!compact && <div className="w-full sm:w-auto sm:flex-1"><Waveform levels={rec.levels} active={rec.recording} /></div>}
      </div>
      {compact && rec.recording && <div className="mt-3"><Waveform levels={rec.levels} active /></div>}

      {(rec.recording || speech.transcript) && (
        <p className="mt-3 rounded-xl bg-surface-2 px-3 py-2 text-sm text-ink/90">
          <span className="mr-1 text-xs font-semibold text-muted">You said:</span>{speech.transcript || "…"}
        </p>
      )}
      {(rec.error || speech.error) && <p className="mt-2 text-sm text-red-500">{rec.error || speech.error}</p>}

      {list.length > 0 && (
        <ul className="mt-4 space-y-2">
          {list.map((r, i) => <RecordingRow key={r.id} r={r} latest={i === 0} onDelete={() => remove(r.id)} />)}
        </ul>
      )}
    </div>
  );
}

function RecordingRow({ r, latest, onDelete }) {
  const url = useMemo(() => URL.createObjectURL(r.blob), [r.blob]);
  useEffect(() => () => URL.revokeObjectURL(url), [url]);
  const ext = (r.mime || "").includes("mp4") ? "m4a" : "webm";
  return (
    <li className="rounded-xl border border-line bg-surface-2/60 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-muted">
        <AudioLines size={14} className="text-accent" />
        <span className="font-medium text-ink">{latest ? "Latest take" : new Date(r.createdAt).toLocaleString()}</span>
        <span>· {mmss(r.duration || 0)}</span>
        <a href={url} download={`answer-${r.id}.${ext}`} className="ml-auto rounded-lg p-1.5 hover:bg-surface" title="Download"><Download size={15} /></a>
        <button onClick={onDelete} className="rounded-lg p-1.5 hover:bg-surface" title="Delete"><Trash2 size={15} /></button>
      </div>
      {url && <audio controls src={url} className="h-10 w-full" preload="metadata" />}
      {r.transcript && <p className="mt-2 text-xs text-muted">“{r.transcript}”</p>}
    </li>
  );
}
