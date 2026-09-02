"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { CHATBOT_WELCOME_MESSAGE } from "@/lib/chatbot-knowledge";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
  };
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", CHATBOT_WELCOME_MESSAGE),
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = createMessage("user", trimmed);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to get a response.");
      }

      if (!data.reply) {
        throw new Error("No response received.");
      }

      setMessages((prev) => [...prev, createMessage("assistant", data.reply!)]);
    } catch (sendError) {
      const message =
        sendError instanceof Error
          ? sendError.message
          : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <div className="pointer-events-auto absolute bottom-4 right-4 flex flex-col items-end sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {isOpen ? (
            <motion.section
              key="chat-panel"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Inkspilled chat assistant"
              className="mb-3 flex h-[min(72vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
            >
              <header className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-red/15 text-ink-red">
                    <Bot aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      Inkspilled Assistant
                    </p>
                    <p className="font-body text-xs text-white/55">
                      Ask us anything
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </header>

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 font-body text-sm leading-relaxed ${
                        message.role === "user"
                          ? "rounded-br-md bg-ink-red text-white"
                          : "rounded-bl-md bg-white/8 text-white/90"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}

                {isLoading ? (
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-white/8 px-3.5 py-2.5 text-sm text-white/70">
                      <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                ) : null}

                {error ? (
                  <p className="rounded-xl border border-ink-red/30 bg-ink-red/10 px-3 py-2 font-body text-xs leading-relaxed text-[#ffb4ae]">
                    {error}
                  </p>
                ) : null}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-white/10 bg-[#1a1a1a] p-3">
                <div className="flex items-end gap-2">
                  <label htmlFor="chatbot-input" className="sr-only">
                    Type your message
                  </label>
                  <textarea
                    id="chatbot-input"
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about services, pricing, process..."
                    disabled={isLoading}
                    className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-[#141414] px-3 py-2.5 font-body text-sm text-white outline-none placeholder:text-white/35 focus:border-ink-red/60 disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => void sendMessage()}
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-red text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send aria-hidden className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-red text-white shadow-[0_12px_32px_rgba(220,92,82,0.45)] transition-shadow hover:shadow-[0_16px_40px_rgba(220,92,82,0.55)]"
        >
          {isOpen ? (
            <X aria-hidden className="h-6 w-6" />
          ) : (
            <MessageCircle aria-hidden className="h-6 w-6" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
