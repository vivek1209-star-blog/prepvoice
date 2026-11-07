# PrepVoice: setup, GitHub (personal account) aur Vercel deploy

Ye guide Windows laptop ke liye hai, jahan **work** aur **personal** dono GitHub accounts hain.
Project folder: `C:\dev\personal\prepvoice`
Personal GitHub: `vivek1209-star-blog`

Saare commands **Git Bash** mein chalao (Start menu → "Git Bash").

---

## Step 1: Project ko sahi folder mein rakho

1. `prepvoice.zip` download karo.
2. Isse `C:\dev\personal\` mein extract karo. Final path aisa hona chahiye: `C:\dev\personal\prepvoice\package.json`
3. Git Bash kholo:

```bash
cd /c/dev/personal/prepvoice
npm install
npm run dev
```

Browser mein `http://localhost:5173` kholo. Mic button pe click karo aur "Allow" dabao.

> Voice search Chrome aur Edge mein sabse achha chalta hai. Firefox mein voice input nahi hai.

---

## Step 2: Personal account ke liye SSH key (sirf ek baar)

Agar personal account ki SSH key pehle se bani hai, toh **Step 3** pe jao.
Check karne ke liye ye command chalao: `ls ~/.ssh`. Agar `id_ed25519_personal` dikh raha hai, toh key pehle se hai.

```bash
ssh-keygen -t ed25519 -C "vivekmishra1209@gmail.com" -f ~/.ssh/id_ed25519_personal
```
Jab passphrase puche, toh Enter dabao (ya chaho toh passphrase daal do).

Public key copy karo:
```bash
cat ~/.ssh/id_ed25519_personal.pub | clip
```

GitHub pe **personal account** (`vivek1209-star-blog`) se login karo, phir:
**Settings → SSH and GPG keys → New SSH key** → Title: `Windows laptop` → key paste karo → **Add SSH key**.

---

## Step 3: SSH config, taaki work aur personal mix na ho

`~/.ssh/config` file kholo (agar file nahi hai toh ban jaayegi):
```bash
notepad ~/.ssh/config
```

Neeche wala block add karo. Agar work wala block pehle se hai, toh usko **mat hatana**:
```
# Personal GitHub
Host github-personal
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
```

Test karo:
```bash
ssh -T git@github-personal
```
Output mein `Hi vivek1209-star-blog!` aana chahiye. Agar work account ka naam aaye, toh `IdentityFile` ka path check karo.

---

## Step 4: `C:\dev\personal` ke andar har repo apne aap personal identity use kare

Ye setup ek baar karna hai. Iske baad personal folder ke har project mein commit personal naam/email se jaayega.

```bash
notepad ~/.gitconfig
```
File ke end mein add karo:
```
[includeIf "gitdir/i:C:/dev/personal/"]
  path = ~/.gitconfig-personal
```

Phir ye file banao:
```bash
notepad ~/.gitconfig-personal
```
```
[user]
  name = Vivek Mishra
  email = vivekmishra1209@gmail.com
```

> Work folder (`C:\dev\work`) pe iska koi asar nahi padega. Wahan tumhari purani global setting hi chalegi.

---

## Step 5: GitHub pe repo banao aur push karo

1. GitHub (personal account) → **New repository**
   - Name: `prepvoice`
   - Public ya Private, jo chaho
   - README, .gitignore ya license **add mat karna** (project mein pehle se hai)
2. Git Bash mein:

```bash
cd /c/dev/personal/prepvoice
git init
git add .
git commit -m "feat: voice interview prep app"
git branch -M main
git remote add origin git@github-personal:vivek1209-star-blog/prepvoice.git
git push -u origin main
```

Check karo ki commit sahi identity se gaya:
```bash
git log -1 --format="%an <%ae>"
```
Output `Vivek Mishra <vivekmishra1209@gmail.com>` aana chahiye.

> Remote mein `github.com` ki jagah `github-personal` likha hai. Isi ki wajah se personal SSH key use hoti hai.

---

## Step 6: Vercel pe deploy (free)

1. https://vercel.com kholo → **Sign up / Log in with GitHub** → **personal account** (`vivek1209-star-blog`) select karo.
   - Agar browser mein work GitHub logged in hai, toh pehle github.com pe usse logout karo, ya incognito window use karo.
2. **Add New → Project** → `prepvoice` repo ke saamne **Import** dabao.
   - Repo list mein nahi dikh raha? **Adjust GitHub App Permissions** pe click karke `prepvoice` repo ko access do.
3. Settings (Vercel khud detect kar leta hai, sirf check karo):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy** dabao. 1 minute mein link milega, jaise `https://prepvoice.vercel.app`

Iske baad jab bhi `git push` karoge, Vercel apne aap naya version deploy kar dega.

> Vercel HTTPS deta hai, aur mic sirf HTTPS pe chalta hai. Isliye phone pe bhi voice kaam karegi.

---

## Step 7: Phone pe app ki tarah use karo

- **Android (Chrome):** link kholo → ⋮ menu → **Add to Home screen**
- **iPhone (Safari):** link kholo → Share → **Add to Home Screen**

---

## Rozana ka kaam

```bash
cd /c/dev/personal/prepvoice
npm run dev          # local pe chalao
npm test             # saare programs ka output + search check
git add . && git commit -m "feat: add new questions" && git push   # push karte hi Vercel update
```

### Naya question kaise add karein
`src/data/` mein sahi file kholo (`js.js`, `react.js`, `node.js`, `programs.js`, `diffs.js`, `resume.js`, `manager.js`) aur same format mein ek entry add karo. Phir `npm test` chalao.

### Problem aaye toh
| Problem | Fix |
|---|---|
| `Permission denied (publickey)` | `ssh -T git@github-personal` chalao. Key GitHub pe personal account mein add hai ya nahi, ye check karo |
| Commit pe work email aa gaya | Step 4 check karo, phir `git commit --amend --reset-author --no-edit` aur `git push -f` |
| Mic kaam nahi kar raha | Address bar mein 🔒 icon → Microphone → Allow. Voice ke liye Chrome/Edge use karo |
| Voice "network" error | Chrome ka voice input internet se chalta hai, internet check karo |
