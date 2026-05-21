# ASTRA

<p align="center">
  <img src="./assets/banner.png" width="100%" />
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&size=20&duration=3000&pause=1000&color=A78BFA&center=true&vCenter=true&width=1000&lines=Your+Terminal+Companion.;Smart.+Direct.+Terminal-native.;Streaming+AI+responses.;8+Mood-driven+personalities.;Powered+by+LLaMA+3.3+70B.;Built+for+the+command+line." />
</p>

<p align="center">
  A terminal-native AI assistant with real personality, streaming responses, session memory, and 8 switchable moods.
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/siddiquah/JYNN?style=for-the-badge&color=7C3AED" />
  <img src="https://img.shields.io/github/last-commit/siddiquah/JYNN?style=for-the-badge&color=4F46E5" />
  <img src="https://img.shields.io/github/languages/top/siddiquah/JYNN?style=for-the-badge&color=818CF8" />
  <img src="https://img.shields.io/github/repo-size/siddiquah/JYNN?style=for-the-badge&color=6D28D9" />
</p>

---

## 🎥 Demo

<p align="center">
  <img src="./assets/astra-demo-gif.gif" width="100%" />
</p>

---

## ✨ What is Astra?

Astra is an AI assistant that lives in your terminal. Not a web app. Not a browser tab. Your terminal.

Built because most AI tools feel robotic, corporate, and emotionally dead. Astra doesn't. She has opinions, she'll roast you when you deserve it, and she's genuinely useful underneath all of it.

She's a Muslim gen-z AI with a light Islamic spirit — bismillah before a task, alhamdulillah when something works, inshallah when plans are uncertain. Subtle, never preachy.

Built in 4 days as an experiment in what terminal AI could actually feel like.

---

## ⚡ Features

### 🌊 Streaming Responses
Token-by-token streaming via Groq's API. Responses feel alive, not dumped.

### 🎭 8 Switchable Moods
Switch Astra's entire personality mid-conversation with `/mood`.

| Mood | Vibe |
|------|------|
| `default` | Gen-z, funny, brutally honest |
| `roast` | Zero filter. Still helpful |
| `teacher` | Patient, step-by-step, clear |
| `chaos` | Completely unhinged. Correct |
| `poet` | Beautiful language, accurate |
| `nerd` | Deep dives, excited about everything |
| `serious` | Locked in. No jokes |
| `passive-aggressive` | Fine. Totally fine |

### 🧠 Session Memory
Astra remembers the full conversation during runtime. Context is sent with every message.

### 📊 Token Counter
Track real token usage against the 128k context limit with `/tokens`. Color-coded by usage level.

### 💾 Save Conversations
Export chats to timestamped JSON files with `/save`.

### 🔄 Conversation Recap
Ask Astra to summarize the session so far in her own voice with `/recap`.

---

## 📸 Screenshots

### Welcome Screen
![](./assets/welcome.png)

### Mood Switching
![](./assets/mood.png)

### Memory System
![](./assets/memory.png)

### Help Menu
![](./assets/help.png)

### Tokens + Save + Exit
![](./assets/tokens-save-exit.png)

---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/siddiquah/JYNN.git
cd JYNN
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
GROQ_API_KEY=your_api_key_here
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

### 4. Run

```bash
npm start
```

---

## 🧪 Slash Commands

| Command | Description |
|---------|-------------|
| `/help` | show available commands |
| `/mood <name>` | switch personality |
| `/recap` | AI summarizes the conversation |
| `/save` | export chat to JSON |
| `/clear` | wipe session memory |
| `/tokens` | show token usage |
| `/exit` | end the session |

---

## 🏗️ Project Structure

```
src/
├── commands/
│   ├── clear.ts
│   ├── help.ts
│   ├── index.ts
│   ├── mood.ts
│   ├── recap.ts
│   ├── save.ts
│   └── tokens.ts
├── core/
│   └── stream.ts
├── moods/
│   └── prompts.ts
├── utils/
│   ├── terminal.ts
│   └── time.ts
├── config.ts
├── main.ts
├── types.ts
└── index.ts
```

---

## ⚙️ Tech Stack

| Layer | Tool |
|-------|------|
| Language | TypeScript |
| Runtime | Node.js |
| AI Model | LLaMA 3.3 70B Versatile |
| API | Groq |
| Terminal UI | Chalk |
| Input | Readline |

---

## 🛣️ Roadmap

- [ ] Persistent memory across sessions
- [ ] Voice input via Groq Whisper API
- [ ] Code syntax highlighting in terminal
- [ ] `npx astra` global install
- [ ] Local model support
- [ ] Multi-agent workflows

---

## 🌌 About

Built this because I wanted an AI I could actually talk to while coding — not a generic chatbot, but something with a real personality that doesn't sugarcoat things or waste your time. Most AI tools feel like filling out a form. Astra feels like texting a friend who happens to know everything.

Started with zero knowledge of AI APIs, TypeScript, or how any of this works. Figured it out from scratch — streaming responses, conversation memory, terminal UI, modular architecture. The whole thing.

It's a CLI because that's where I live when I'm building. No browser tab, no context switching. Just you, your terminal, and Astra.

---

## 🤝 Contributing

Contributions, ideas, and chaos are welcome. Open an issue or fork and build something weird.

---

<p align="center">
  built with caffeine, curiosity, and the command line. بسم الله 🌿
</p>