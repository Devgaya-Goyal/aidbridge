# Chatbot Setup with Gemini AI

## Overview
The chatbot has been successfully added to your website's hero page. It features a modern, floating chat interface that integrates with Google's Gemini AI.

## Features
- ✅ Floating chat button in bottom-right corner
- ✅ Modern UI with smooth animations
- ✅ Real-time messaging with Gemini AI
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Auto-scroll to latest messages

## Setup Instructions

### 1. Get Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Add Environment Variable
Create a `.env` file in your project root and add:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server
```bash
npm run dev
```

## Usage
- Click the chat icon in the bottom-right corner to open the chatbot
- Type your message and press Enter or click Send
- The AI will respond with helpful information about AidBridge services

## Customization
The chatbot is configured to help with:
- Animal rescue questions
- Volunteering opportunities
- NGO partnerships
- General support inquiries

You can modify the AI's behavior by editing the prompt in `src/services/geminiService.ts`.

## Files Added/Modified
- `src/components/Chatbot.tsx` - Main chatbot component
- `src/services/geminiService.ts` - Gemini AI integration
- `src/pages/Home.tsx` - Added chatbot to hero page
- `package.json` - Added @google/generative-ai dependency

## Troubleshooting
- If you see "API key not configured" messages, make sure your `.env` file is set up correctly
- If the chatbot doesn't respond, check your internet connection and API key validity
- For development, the chatbot will work without an API key but will show a configuration message 