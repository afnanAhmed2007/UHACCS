"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

async function chatSendMessage(message: string): Promise<{ response: string }> {
    const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
}

async function logSendMessage(message: string): Promise<{ response: string }> {
    const res = await fetch("http://localhost:8000/api/logs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
}

type TabId = "chat" | "logs";

type SidebarProps = {
  onLogsUpdated?: () => void;
  onHide?: () => void;
};

export default function Sidebar({ onLogsUpdated, onHide }: SidebarProps = {}) {
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

  const [sending, setSending] = useState(false);
  const [sendingLog, setSendingLog] = useState(false);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const text = input.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const data = await chatSendMessage(text);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response ?? "No response.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Could not reach the server. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setSending(false);
    }
  };

  const handleLogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logInput.trim() || sendingLog) return;

    const text = logInput.trim();
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setLogMessages((prev) => [...prev, userMessage]);
    setLogInput("");
    setSendingLog(true);

    try {
      const data = await logSendMessage(text);
      const responseText = data.response ?? "Log received.";
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      setLogMessages((prev) => [...prev, assistantMessage]);
      const normalized = responseText.toLowerCase().trim();
      if (normalized === "logs updated" || normalized === "logs updated.") {
        onLogsUpdated?.();
      }
    } catch {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Could not reach the server. Please try again.",
        timestamp: new Date(),
      };
      setLogMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setSendingLog(false);
    }
  };

  return (
    <aside className="flex h-full w-[380px] shrink-0 flex-col border-l border-zinc-700 bg-zinc-900">
      {/* Header: hide button + round pill toggle */}
      <header className="border-b border-zinc-700 px-4 py-4">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={onHide}
            className="rounded-md px-2 py-1.5 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            aria-label="Hide chat"
          >
            ← Hide
          </button>
        </div>
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
                <div className="flex flex-col items-center gap-2">
                  <p>No messages yet.</p>
                  <p>Send a message to start the conversation.</p>
                </div>
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
                disabled={!input.trim() || sending}
              >
                {sending ? "Sending..." : "Send"}
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
                <div className="flex flex-col items-center gap-2">
                  <p>No logs yet.</p>
                  <p>Add a log entry to get started.</p>
                </div>
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
                disabled={!logInput.trim() || sendingLog}
              >
                {sendingLog ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </>
      )}
    </aside>
  );
}
