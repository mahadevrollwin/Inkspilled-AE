"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onresult: ((event: {
    resultIndex: number;
    results: ArrayLike<{
      isFinal: boolean;
      0: { transcript: string };
    }>;
  }) => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const TRANSCRIPT_CORRECTIONS: [RegExp, string][] = [
  [/\bink\s*spill(?:ed)?\b/gi, "Inkspilled"],
  [/\binkspill\b/gi, "Inkspilled"],
];

const TTS_PRONUNCIATION: [RegExp, string][] = [
  [/\bInkspilled\b/g, "Ink spilled"],
  [/\binkspilled\b/g, "Ink spilled"],
];

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
}

export function isIOSOrIPad(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function isMobileOrTablet(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) || navigator.maxTouchPoints > 1;
}

/** Unlock TTS on mobile so reply speech can play without a later gesture. */
export function primeSpeechSynthesis(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance("\u200B");
  utterance.volume = 0;
  synth.speak(utterance);
  synth.cancel();
}

export function cancelSpeech(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

function correctTranscript(text: string): string {
  return TRANSCRIPT_CORRECTIONS.reduce(
    (out, [pattern, replacement]) => out.replace(pattern, replacement),
    text,
  );
}

function textForSpeech(text: string): string {
  return TTS_PRONUNCIATION.reduce(
    (out, [pattern, replacement]) => out.replace(pattern, replacement),
    text,
  );
}

function isMaleVoice(voice: SpeechSynthesisVoice) {
  return /male|man|daniel|david|james|mark|paul|ralph|bruce|fred|george|alex|nick|en-us-male|en-gb-male|english male|uk english male|us english male|en_in.*male|en-in.*male/i.test(
    voice.name,
  );
}

function isFemaleVoice(voice: SpeechSynthesisVoice) {
  return /female|woman|samantha|zira|karen|victoria|lucy|emily|susan|anna|moira|sara|google uk english female|google us english female|english female|uk english female|us english female/i.test(
    voice.name,
  );
}

export function speakText(text: string, lang: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textForSpeech(text));
  const voices = synth.getVoices();
  const langPrefix = lang.slice(0, 2).toLowerCase();
  const matching = voices.filter((voice) =>
    voice.lang?.toLowerCase().startsWith(langPrefix),
  );
  const englishVoices = voices.filter((voice) => voice.lang?.toLowerCase().startsWith("en"));
  const pool = matching.length ? matching : englishVoices;
  const isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);

  let voiceToUse: SpeechSynthesisVoice | null = null;
  if (langPrefix === "en") {
    voiceToUse =
      pool.find(isMaleVoice) ??
      pool.find((voice) => !isFemaleVoice(voice)) ??
      pool.find((voice) => voice.lang?.toLowerCase().startsWith("en-gb")) ??
      pool.find((voice) => voice.lang?.toLowerCase().startsWith("en-us")) ??
      pool[0] ??
      null;
    if (voiceToUse && isFemaleVoice(voiceToUse)) {
      voiceToUse = pool.find((voice) => !isFemaleVoice(voice)) ?? null;
    }
  } else {
    voiceToUse =
      pool.find((voice) => voice.lang?.toLowerCase().startsWith(lang.toLowerCase())) ??
      pool[0] ??
      null;
  }

  if (voiceToUse) {
    utterance.voice = voiceToUse;
    utterance.lang = voiceToUse.lang;
  } else {
    utterance.lang = lang;
  }

  utterance.rate = 1;
  utterance.pitch = voiceToUse && isMaleVoice(voiceToUse) ? 1 : isAndroid ? 0.8 : 0.9;
  synth.cancel();
  if (typeof synth.resume === "function") synth.resume();
  synth.speak(utterance);
}

export function useSpeechToText(
  lang: string,
  onFinalTranscript?: (text: string) => void,
) {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const onFinalRef = useRef(onFinalTranscript);

  onFinalRef.current = onFinalTranscript;

  useEffect(() => {
    const SpeechRecognitionConstructor = getSpeechRecognitionConstructor();
    if (!SpeechRecognitionConstructor) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = isIOSOrIPad();

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
      setTranscript("");
    };

    recognition.onerror = (event) => {
      const code = event.error || "unknown";
      let message = "Speech recognition error";
      if (code === "not-allowed" || code === "service-not-allowed") {
        message =
          "Microphone or speech access denied. Allow the microphone for this site, then try again.";
      } else if (code === "no-speech") {
        message = "No speech heard. Try again.";
      } else if (code === "network") {
        message = "Speech recognition needs internet. Check your connection.";
      }
      setIsListening(false);
      setError(message);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      text = correctTranscript(text);
      setTranscript(text);

      const last = event.results[event.results.length - 1];
      if (last?.isFinal) {
        onFinalRef.current?.(text.trim());
      }
    };

    recognitionRef.current = recognition;
    setIsSupported(true);

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [lang]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setError(null);
    setTranscript("");
    try {
      recognitionRef.current.start();
    } catch {
      // Already started
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    start,
    stop,
  };
}
