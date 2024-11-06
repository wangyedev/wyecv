// pages/index.tsx

"use client";
import { useState, useEffect, useRef } from "react";
import type { Message } from "./types/chat";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

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
    <main className="flex flex-col h-screen max-w-5xl mx-auto p-4 bg-gray-50 dark:bg-gray-900">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white dark:bg-gray-800 dark:text-gray-100 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {currentStreamingMessage && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100">
              {currentStreamingMessage}
            </div>
          </div>
        )}

        {loading && !currentStreamingMessage && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="flex-1 rounded-full border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 shadow-sm"
          />
          <Button
            type="submit"
            disabled={loading || !message.trim()}
            className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </form>
      </div>
    </main>
  );
}
