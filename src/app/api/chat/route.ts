import { NextResponse } from "next/server";
import {
  CHATBOT_SYSTEM_PROMPT,
  generateFallbackReply,
  type ChatMessage,
} from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

type GeminiPart = { text: string };

type GeminiContent = {
  role?: string;
  parts: GeminiPart[];
};

const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
] as const;

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20;

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter(
      (message): message is ChatMessage =>
        typeof message === "object" &&
        message !== null &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function toGeminiContents(messages: ChatMessage[]): GeminiContent[] {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

async function callGemini(apiKey: string, messages: ChatMessage[]) {
  let lastError = "Gemini request failed";

  for (const model of GEMINI_MODELS) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: CHATBOT_SYSTEM_PROMPT }],
          },
          contents: toGeminiContents(messages),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      },
    );

    if (!response.ok) {
      lastError = await response.text();
      continue;
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const reply =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim() ?? "";

    if (reply) {
      return { reply, model };
    }
  }

  throw new Error(lastError);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown };
    const messages = sanitizeMessages(body.messages);

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Please send at least one message." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (apiKey) {
      try {
        const { reply } = await callGemini(apiKey, messages);
        return NextResponse.json({ reply, source: "gemini" });
      } catch (geminiError) {
        console.error("Gemini API error:", geminiError);
        const fallbackReply = generateFallbackReply(messages);
        return NextResponse.json({ reply: fallbackReply, source: "fallback" });
      }
    }

    const fallbackReply = generateFallbackReply(messages);
    return NextResponse.json({ reply: fallbackReply, source: "fallback" });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
