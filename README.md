# Ementora Chatbot – Frontend

A React + Vite single-page app that provides the chat UI for Ementora AI. It connects to a backend API to send/receive messages and supports a clean, centered chat experience with avatars, a welcome card, and quick replies.

## 🚀 Live App

Frontend (production):

- https://chatbot-frontend-6bjo.vercel.app/

Note: The frontend requires a reachable backend API to respond to chats. See “Configuration” below.

## 🖥️ Tech Stack

- React + Vite
- CSS (custom styles)
- Fetch API for network calls
- Vercel for hosting

## ✨ Features

- Centered chat UI with avatars (bot/user)
- Persistent welcome card with quick-reply buttons
- Typing indicator, timestamps, and auto-scroll
- Connects to a backend `/chat` endpoint

## ⚙️ Configuration

This app reads the backend API URL from an environment variable:

- `VITE_API_URL` — the base URL of your backend (do not include `/chat`).

Examples:

```bash
# .env (local development)
VITE_API_URL=http://localhost:5050
```

On Vercel, set `VITE_API_URL` in the Project → Settings → Environment Variables.

Important: Do not commit secrets or private backend URLs to this repository.

## 🛠️ Run Locally

```bash
# 1) Clone
git clone <your-frontend-repo-url>
cd chatbot-frontend

# 2) Install deps
npm install

# 3) Configure backend URL
echo "VITE_API_URL=http://localhost:5050" > .env

# 4) Start dev server
npm run dev
# App runs at http://localhost:5173
```

## 🌐 Deploy

Deploy on Vercel:

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Set `VITE_API_URL` in Vercel Environment Variables.
4. Deploy.

## 📄 License & Notes

This project is for learning and demonstration purposes. The frontend does not contain any backend secrets and avoids embedding backend URLs in source code. Configure `VITE_API_URL` per environment.

