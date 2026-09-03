import { NextResponse } from "next/server";
import { INKSPILLED_CONTACT } from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

const CONTACT_INBOX = INKSPILLED_CONTACT.email;
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_INBOX}`;
const PRODUCTION_ORIGIN = "https://inkspilled.ae";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
  _subject?: unknown;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isFormSubmitSuccess(result: {
  success?: string | boolean;
  message?: string;
}) {
  if (result.success === true || result.success === "true") return true;

  const message = String(result.message ?? "").toLowerCase();
  return (
    message.includes("success") ||
    message.includes("thank") ||
    message.includes("confirm your email") ||
    message.includes("activation")
  );
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  if (asText(body.website)) {
    return NextResponse.json({ success: true });
  }

  const name = asText(body.name);
  const email = asText(body.email);
  const phone = asText(body.phone);
  const message = asText(body.message);
  const company = asText(body.company);
  const service = asText(body.service);
  const budget = asText(body.budget);
  const subject = asText(body._subject);

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { success: false, message: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const requestOrigin =
    request.headers.get("origin") ||
    request.headers.get("referer") ||
    PRODUCTION_ORIGIN;
  const origin = requestOrigin.replace(/\/$/, "");

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        _to: CONTACT_INBOX,
        name,
        email,
        _replyto: email,
        phone,
        ...(company ? { company } : {}),
        ...(service ? { service } : {}),
        ...(budget ? { budget } : {}),
        message,
        _subject: subject || `New inquiry from ${name}, Inkspilled`,
        _template: "table",
        _captcha: "false",
        _honey: "",
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: string | boolean;
      message?: string;
    } | null;

    if (!response.ok || !data || !isFormSubmitSuccess(data)) {
      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "Something went wrong. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please check your connection and try again.",
      },
      { status: 502 },
    );
  }
}
