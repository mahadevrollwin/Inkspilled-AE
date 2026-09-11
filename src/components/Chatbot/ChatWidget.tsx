"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Loader2,
  MessageCircle,
  Mic,
  Send,
  Square,
  Volume2,
  X,
} from "lucide-react";
import { useDictionary, useLocale } from "@/i18n/locale-context";
import {
  cancelSpeech,
  isIOSOrIPad,
  isMobileOrTablet,
  primeSpeechSynthesis,
  speakText,
  useSpeechToText,
} from "./voice";

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
  const t = useDictionary();
  const locale = useLocale();
  const speechLang = locale === "ar" ? "ar-AE" : "en-IN";
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastInputSource, setLastInputSource] = useState<"speech" | "typing" | null>(
    null,
  );
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isMobileOrTabletDevice, setIsMobileOrTabletDevice] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("assistant", t.chat?.welcome ?? "Hi! I'm the Inkspilled assistant."),
  ]);

  const handleFinalTranscript = useCallback((text: string) => {
    if (!text) return;
    setInput(text);
    setLastInputSource("speech");
  }, []);

  const speech = useSpeechToText(speechLang, handleFinalTranscript);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastSpokenId = useRef<string | null>(messages[0]?.id ?? null);
  const stopListeningRef = useRef<() => void>(() => {});
  stopListeningRef.current = speech.stop;

  useEffect(() => {
    setIsIOSDevice(isIOSOrIPad());
    setIsMobileOrTabletDevice(isMobileOrTablet());
  }, []);

  useEffect(() => {
    setMessages([
      createMessage("assistant", t.chat?.welcome ?? "Hi! I'm the Inkspilled assistant."),
    ]);
    lastSpokenId.current = null;
    setInput("");
    setError(null);
  }, [locale, t.chat?.welcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, speech.transcript]);

  useEffect(() => {
    if (isOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(timer);
    }
    cancelSpeech();
    stopListeningRef.current();
  }, [isOpen]);

  const speakReply = useCallback(
    (text: string) => {
      speakText(text, speechLang);
    },
    [speechLang],
  );

  const sendMessage = useCallback(
    async (content?: string) => {
      const trimmed = (content ?? input).trim();
      if (!trimmed || isLoading) return;

      if (isMobileOrTablet()) primeSpeechSynthesis();
      stopListeningRef.current();

      const userMessage = createMessage("user", trimmed);
      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setInput("");
      setError(null);
      setIsLoading(true);
      setLastInputSource(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content: body }) => ({
              role,
              content: body,
            })),
          }),
        });

        const data = (await response.json()) as { reply?: string; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? t.chat.error);
        }

        if (!data.reply) {
          throw new Error(t.chat.error);
        }

        setMessages((prev) => [...prev, createMessage("assistant", data.reply!)]);
      } catch (sendError) {
        const message =
          sendError instanceof Error ? sendError.message : t.chat.error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages, t.chat.error],
  );

  useEffect(() => {
    if (!input.trim() || lastInputSource !== "speech" || isLoading) return;

    const timeout = window.setTimeout(() => {
      void sendMessage(input);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [input, lastInputSource, isLoading, sendMessage]);

  useEffect(() => {
    if (!isOpen || isLoading) return;

    const botMessages = messages.filter((message) => message.role === "assistant");
    const lastBot = botMessages[botMessages.length - 1];
    if (!lastBot || lastBot.id === lastSpokenId.current) return;
    if (botMessages.length <= 1) {
      lastSpokenId.current = lastBot.id;
      return;
    }

    lastSpokenId.current = lastBot.id;
    const runSpeak = () => speakReply(lastBot.content);
    if (isMobileOrTablet()) {
      window.setTimeout(runSpeak, 200);
    } else {
      runSpeak();
    }
  }, [isOpen, isLoading, messages, speakReply]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function toggleMic() {
    if (isMobileOrTablet()) primeSpeechSynthesis();
    cancelSpeech();
    if (speech.isListening) {
      speech.stop();
      return;
    }
    speech.start();
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
              aria-label={t.chat.title}
              className="mb-3 flex h-[min(72vh,560px)] w-[min(calc(100vw-2rem),380px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
            >
              <header className="flex items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-red/15 text-ink-red">
                    <Bot aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">
                      {t.chat.title}
                    </p>
                    <p className="font-body text-xs text-white/55">{t.chat.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`hidden items-center gap-1 rounded-full px-2 py-1 font-body text-[10px] sm:inline-flex ${
                      speech.isSupported
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-white/8 text-white/45"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        speech.isSupported ? "bg-emerald-400" : "bg-white/30"
                      }`}
                    />
                    {speech.isSupported ? t.chat.speechReady : t.chat.speechUnavailable}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={t.chat.close}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X aria-hidden className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {!speech.isSupported && isIOSDevice ? (
                <p className="border-b border-amber-500/20 bg-amber-500/10 px-3 py-2 text-center font-body text-[11px] leading-relaxed text-amber-100">
                  {t.chat.iosHint}
                </p>
              ) : null}

              {isMobileOrTabletDevice ? (
                <p className="border-b border-white/10 bg-white/4 px-3 py-1.5 text-center font-body text-[11px] text-white/45">
                  {t.chat.mobileTtsHint}
                </p>
              ) : null}

              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start rtl:flex-row-reverse"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <button
                        type="button"
                        onClick={() => speakReply(message.content)}
                        aria-label={t.chat.listen}
                        title={t.chat.listen}
                        className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors hover:bg-white/12 hover:text-white"
                      >
                        <Volume2 aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
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

                {speech.isListening ? (
                  <div className="flex items-center gap-2 font-body text-xs text-white/55">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-ink-red" />
                    {t.chat.listening}
                  </div>
                ) : null}

                {speech.transcript ? (
                  <p className="font-body text-xs italic text-white/45">
                    {t.chat.liveTranscript}: {speech.transcript}
                  </p>
                ) : null}

                {isLoading ? (
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md bg-white/8 px-3.5 py-2.5 text-sm text-white/70">
                      <Loader2 aria-hidden className="h-4 w-4 animate-spin" />
                      {t.chat.thinking}
                    </div>
                  </div>
                ) : null}

                {speech.error ? (
                  <p className="rounded-xl border border-ink-red/30 bg-ink-red/10 px-3 py-2 font-body text-xs leading-relaxed text-[#ffb4ae]">
                    {speech.error}
                  </p>
                ) : null}

                {error ? (
                  <p className="rounded-xl border border-ink-red/30 bg-ink-red/10 px-3 py-2 font-body text-xs leading-relaxed text-[#ffb4ae]">
                    {error}
                  </p>
                ) : null}

                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void sendMessage();
                }}
                className="border-t border-white/10 bg-[#1a1a1a] p-3"
              >
                <div className="flex items-end gap-2">
                  <button
                    type="button"
                    onClick={toggleMic}
                    disabled={!speech.isSupported}
                    aria-label={speech.isListening ? t.chat.stopMic : t.chat.mic}
                    aria-pressed={speech.isListening}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      speech.isListening
                        ? "border-ink-red bg-ink-red text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {speech.isListening ? (
                      <Square aria-hidden className="h-4 w-4" />
                    ) : (
                      <Mic aria-hidden className="h-4 w-4" />
                    )}
                  </button>
                  <label htmlFor="chatbot-input" className="sr-only">
                    {t.chat.placeholder}
                  </label>
                  <textarea
                    id="chatbot-input"
                    ref={inputRef}
                    rows={1}
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                      setLastInputSource("typing");
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      speech.isSupported
                        ? t.chat.placeholderSpeech
                        : isIOSDevice
                          ? t.chat.placeholderIos
                          : t.chat.placeholder
                    }
                    disabled={isLoading}
                    className="max-h-28 min-h-[44px] flex-1 resize-none rounded-xl border border-white/10 bg-[#141414] px-3 py-2.5 font-body text-sm text-white outline-none placeholder:text-white/35 focus:border-ink-red/60 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    aria-label={t.chat.send}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-red text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Send aria-hidden className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? t.chat.close : t.chat.open}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex h-14 w-14 items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] bg-ink-red text-white shadow-[0_12px_32px_rgba(220,92,82,0.45)] transition-shadow hover:shadow-[0_16px_40px_rgba(220,92,82,0.55)]"
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
