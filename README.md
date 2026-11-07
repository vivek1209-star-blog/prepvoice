# PrepVoice 🎙️

Voice-powered MERN interview prep. Question **bolo ya type karo**, aur sirf wahi answer milega jo pucha hai:

- `callback` → sirf callback ka answer
- `callback hell` → sirf callback hell
- `callback vs promise` / `difference between callback and promise` → sirf difference
- `reverse string program` → program + output + explanation

## Features
- **Voice search** (Indian English, `en-IN`) with live text
- **Smart intent search**: concept vs difference vs program, typo-tolerant ("clouser" → closure)
- **428 questions**: JavaScript, React, Node/Express/MongoDB, Managerial, resume-based, 69 differences, 102 programs
- Har program: loop + without loop + recursion/reduce/Set tabs, cross-questions with answers, time & space complexity
- Bolo "reverse string without loop" → seedha without-loop tab khulta hai
- Har answer mein: bolne layak short English, Hinglish meaning, code, expected output, code explanation
- **▶ Run** button: code browser mein chalao, output dekho
- **🔊 Listen**: answer ka pronunciation suno
- **Practice mode**: question dekho → khud bolo → clean recording (noise + echo cancel, voice filter) → playback → model answer se match
- **Search hamesha upar fixed** — phone pe answer padhte waqt bhi; desktop pe list aur answer ka alag scroll
- **5 themes**: Auto · Light · Paper (warm, aankhon pe aaram) · Dim (medium dark) · Dark
- **4 reading fonts**: Lexend (easy reading) · Atkinson Hyperlegible Next (super clear) · Literata (book style) · Inter; text size S/M/L/XL; Hinglish on/off
- **Next / Previous** question buttons + keyboard: `/` search, `M` mic, `←` `→` next/previous
- Done / Saved progress, phone · tablet · laptop · monitor responsive

## Tech
React 19 · Vite · Tailwind CSS v4 · Fuse.js · prism-react-renderer · lucide-react · idb-keyval · Inter & JetBrains Mono (self-hosted)

## Run
```bash
npm install
npm run dev
npm test      # verifies every program's output + search accuracy
npm run build
```

Deploy steps (personal GitHub + Vercel): see [DEPLOY.md](./DEPLOY.md)
