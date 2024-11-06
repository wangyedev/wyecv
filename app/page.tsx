// pages/index.tsx

"use client";
import { useState, useEffect, useRef } from "react";
import type { Message } from "./types/chat";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState("");

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    const savedSessionId = localStorage.getItem("chatSessionId");
    if (savedSessionId) {
      setSessionId(savedSessionId);
      loadChatHistory(savedSessionId);
    } else {
      setSessionId(null);
    }
  }, []);

  const loadChatHistory = async (sid: string) => {
    try {
      if (sid && sid.match(/^[0-9a-fA-F]{24}$/)) {
        const res = await fetch(`/api/history?sessionId=${sid}`);
        const data = await res.json();
        if (data.messages) {
          setChatHistory(data.messages);
        }
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };

    const currentSessionId = sessionId;

    setChatHistory((prev) => [...prev, userMessage]);
    setCurrentStreamingMessage("");
    let fullResponse = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          sessionId: currentSessionId,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));

            if (data.content) {
              fullResponse += data.content;
              setCurrentStreamingMessage(fullResponse);
            }

            if (data.sessionId) {
              setSessionId(data.sessionId);
              localStorage.setItem("chatSessionId", data.sessionId);

              const assistantMessage: Message = {
                role: "assistant",
                content: fullResponse,
                timestamp: new Date(),
              };
              setChatHistory((prev) => [...prev, assistantMessage]);
              setCurrentStreamingMessage("");
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">RAG Chatbot</h1>

      <div
        ref={chatContainerRef}
        className="flex-1 mb-4 overflow-y-auto border rounded p-4 bg-gray-50"
        style={{ minHeight: "500px" }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 max-w-[80%] ${
              msg.role === "user" ? "ml-auto" : "mr-auto"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white border border-gray-200"
              }`}
            >
              <p>{msg.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {msg.role === "user" ? "You" : "Assistant"} •
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}

        {currentStreamingMessage && (
          <div className="mb-4 max-w-[80%] mr-auto">
            <div className="p-3 rounded-lg bg-white border border-gray-200">
              <p>{currentStreamingMessage}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Assistant • {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}

        {loading && !currentStreamingMessage && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce delay-100">●</div>
            <div className="animate-bounce delay-200">●</div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className={`px-4 py-2 rounded font-medium ${
            loading || !message.trim()
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
