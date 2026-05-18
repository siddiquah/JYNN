# Astra

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-FF6B35?style=flat&logoColor=white)
![LLaMA](https://img.shields.io/badge/LLaMA_3.3_70B-0467DF?style=flat&logoColor=white)

A terminal-based AI assistant built with TypeScript and Node.js. Streams responses from Meta's LLaMA 3.3 70B via the Groq API. Features a Muslim gen-z persona with 8 switchable moods, slash commands, and a themed CLI.

---

## Stack

| Layer | Tool |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| AI Model | LLaMA 3.3 70B Versatile via Groq |
| Packages | groq-sdk, chalk, dotenv |
| Built-ins | readline, fs, process |

---

## Features

- Real-time streaming responses via Groq streaming API
- Conversation memory within session
- 8 switchable moods via `/mood` command
- Themed terminal UI with sage color palette
- Timestamps on every message
- Thinking indicator during API calls
- Save conversations to timestamped JSON files
- Conversation recap via AI summarization

---

## Setup

```bash
git clone https://github.com/yourusername/astra
cd astra
npm install
```

Create a `.env` file:
```
GROQ_API_KEY=your_key_here
```

Run:
```bash
npm start
```

---

## Slash Commands

| Command | Description |
|---|---|
| `/help` | show available commands |
| `/clear` | reset conversation memory |
| `/recap` | AI summarizes the conversation so far |
| `/save` | export conversation to a timestamped JSON file |
| `/mood <name>` | switch Astra's personality |
| `/exit` | end the session |

---

## Moods

| Mood | Vibe |
|---|---|
| `default` | gen-z, funny, brutally honest |
| `roast` | zero filter, still helpful |
| `teacher` | patient, step by step, clear |
| `chaos` | unhinged but correct |
| `poet` | beautiful language, accurate |
| `nerd` | deep dives, excited about everything |
| `serious` | locked in, no jokes |
| `passive-aggressive` | fine. totally fine. |

---

## Model

LLaMA 3.3 70B Versatile via Groq — 128k token context window
