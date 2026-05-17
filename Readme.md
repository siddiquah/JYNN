# Sahir

A terminal-based conversational AI built with TypeScript and Node.js, 
streaming responses from Meta's LLaMA 3.3 70B via the Groq API.

## Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **AI**: LLaMA 3.3 70B via Groq API
- **Packages**: groq-sdk, chalk, dotenv
- **Built-ins**: readline, process

## Features

- Streaming responses via Groq's streaming API
- Persistent conversation memory within session
- Custom system prompt persona (Sahir — Islamic folklore Jinn)
- Themed terminal output with chalk
- Timestamps on every message
- Thinking indicator during API calls
- Clean exit with `exit` command

## Setup

1. Clone the repo
2. Install dependencies
   npm install
3. Create a .env file
   GROQ_API_KEY=your_key_here
4. Run
   npm start

## Commands

| Command  | Description              |
|----------|--------------------------|
| `exit`   | End the session          |

## Model

LLaMA 3.3 70B Versatile via Groq
Context window: 128k tokens