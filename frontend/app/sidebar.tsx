"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type TabId = "chat" | "logs";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<TabId>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [logMessages, setLogMessages] = useState<Message[]>([]);
  const [logInput, setLogInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  useEffect(() => {
    scrollToBottom(logsEndRef);
  }, [logMessages]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder reply (replace with real chat API later)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Thanks for your message. Connect this to your chat API to get real responses.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 400);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInput.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: logInput.trim(),
      timestamp: new Date(),
    };
    setLogMessages((prev) => [...prev, userMessage]);
    setLogInput("");

    // Placeholder reply for logs (replace with your log API)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Log entry saved.",
        timestamp: new Date(),
      };
      setLogMessages((prev) => [...prev, assistantMessage]);
    }, 400);
  };

  return (
    <aside className="flex h-full w-[380px] shrink-0 flex-col border-l border-zinc-700 bg-zinc-900">
      {/* Header: round pill toggle — one side light (active), one dark */}
      <header className="border-b border-zinc-700 px-4 py-4">
        <div className="flex justify-center">
          <div
            className="flex w-full max-w-[200px] rounded-full bg-black p-1"
            role="tablist"
            aria-label="Chat or Logs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "chat"}
              onClick={() => setActiveTab("chat")}
              className={`flex-1 rounded-l-full py-2 text-center text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "chat"
                  ? "bg-zinc-200 text-zinc-900 shadow-sm"
                  : "bg-black text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "logs"}
              onClick={() => setActiveTab("logs")}
              className={`flex-1 rounded-r-full py-2 text-center text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === "logs"
                  ? "bg-zinc-200 text-zinc-900 shadow-sm"
                  : "bg-black text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Logs
            </button>
          </div>
        </div>
      </header>

      {/* Chat tab */}
      {activeTab === "chat" && (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-zinc-500">
                <p>No messages yet.</p>
                <p className="mt-1">Send a message to start the conversation.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-700 text-zinc-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <form onSubmit={handleChatSubmit} className="border-t border-zinc-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Chat message"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50"
                disabled={!input.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}

      {/* Logs tab - same interface, different prompt */}
      {activeTab === "logs" && (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {logMessages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-center text-sm text-zinc-500">
                <p>No logs yet.</p>
                <p className="mt-1">Add a log entry to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {logMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-700 text-zinc-100"
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            )}
          </div>
          <form onSubmit={handleLogSubmit} className="border-t border-zinc-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={logInput}
                onChange={(e) => setLogInput(e.target.value)}
                placeholder="Add a log entry..."
                className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label="Log entry"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50"
                disabled={!logInput.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </>
      )}
    </aside>
  );
}
