# RAG Chatbot with Next.js

A Retrieval-Augmented Generation (RAG) chatbot built with Next.js, featuring real-time streaming responses and persistent chat history.

🔗 **[Try it live on wyecv.uk](https://wyecv.uk)**

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [OpenAI](https://openai.com) - For chat completions and embeddings
- [Pinecone](https://www.pinecone.io) - Vector database for RAG implementation
- [MongoDB](https://www.mongodb.com) - Chat session storage
- Server-Sent Events (SSE) - Real-time response streaming

## Features

- Real-time streaming chat responses
- Persistent chat history across sessions
- RAG implementation for context-aware responses
- Responsive UI with message bubbles
- Loading states and animations
- Session management

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables in `.env.local`:

```env
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the chatbot.

## Project Structure

- `app/page.tsx` - Main chat interface
- `app/api/chat/route.ts` - Chat API endpoint with streaming responses
- `app/api/history/route.ts` - Chat history API endpoint
- `app/lib/mongodb.ts` - MongoDB connection configuration
- `app/types/chat.ts` - TypeScript interfaces for chat functionality

## Environment Variables

The following environment variables are required:

- `MONGODB_URI` - Your MongoDB connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `PINECONE_API_KEY` - Your Pinecone API key

## Deployment

This application can be deployed on [Vercel](https://vercel.com) or any other platform that supports Next.js applications.

Make sure to configure the environment variables in your deployment platform's settings.

## License

[MIT License](LICENSE)
