import { NextResponse } from "next/server";
import { Resend } from "resend";
import { INKSPILLED_CONTACT } from "@/lib/chatbot-knowledge";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s\-().+]{6,32}$/;
const MAX_SHORT = 120;
const MAX_MESSAGE = 5000;

type InquiryBody = {
  form?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  mobile?: unknown;
  message?: unknown;
  requirement?: unknown;
  project?: unknown;
  countryCode?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  _honey?: unknown;
};

function readString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 12px;border-bottom:1px solid #ececec;color:#666;font-size:13px;width:160px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 12px;border-bottom:1px solid #ececec;color:#1a1a1a;font-size:14px;white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

async function parseBody(request: Request): Promise<InquiryBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as InquiryBody;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as InquiryBody;
}

function wantsJson(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("application/json");
}

function successResponse(request: Request) {
  if (wantsJson(request)) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/thank-you", request.url), 303);
}

function errorResponse(
  request: Request,
  message: string,
  status: number,
) {
  if (wantsJson(request)) {
    return NextResponse.json({ ok: false, error: message }, { status });
  }

  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: InquiryBody;

  try {
    body = await parseBody(request);
  } catch {
    return errorResponse(request, "Invalid form submission.", 400);
  }

  if (readString(body._honey, MAX_SHORT)) {
    return successResponse(request);
  }

  const form = readString(body.form, MAX_SHORT) || "Website";
  const name = readString(body.name, MAX_SHORT);
  const email = readString(body.email, MAX_SHORT);
  const countryCode = readString(body.countryCode, 16);
  const rawPhone =
    readString(body.phone, MAX_SHORT) || readString(body.mobile, MAX_SHORT);
  const phone =
    countryCode && rawPhone && !rawPhone.startsWith(countryCode)
      ? `${countryCode} ${rawPhone}`
      : rawPhone;
  const message =
    readString(body.message, MAX_MESSAGE) ||
    readString(body.requirement, MAX_MESSAGE) ||
    readString(body.project, MAX_MESSAGE);
  const company = readString(body.company, MAX_SHORT);
  const service = readString(body.service, MAX_SHORT);
  const budget = readString(body.budget, MAX_SHORT);

  if (!name || !email || !phone || !message) {
    return errorResponse(
      request,
      "Please fill in all required fields before sending.",
      400,
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return errorResponse(request, "Please enter a valid email address.", 400);
  }

  if (!PHONE_PATTERN.test(phone)) {
    return errorResponse(request, "Please enter a valid phone number.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return errorResponse(
      request,
      "Something went wrong. Please try again in a moment.",
      500,
    );
  }

  const fromAddress =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Inkspilled <${INKSPILLED_CONTACT.email}>`;
  const subject = `New inquiry from ${name}, Inkspilled`;
  const html = `
    <div style="font-family:Arial,sans-serif;background:#f6f6f4;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ececec;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#1a1a1a;color:#ffffff;">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#bbbbbb;">Inkspilled</p>
          <h1 style="margin:8px 0 0;font-size:22px;">New website inquiry</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Form", form)}
          ${row("Name", name)}
          ${row("Email", email)}
          ${row("Phone", phone)}
          ${row("Company", company)}
          ${row("Service", service)}
          ${row("Budget", budget)}
          ${row("Message", message)}
        </table>
      </div>
    </div>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromAddress,
    to: [INKSPILLED_CONTACT.email],
    replyTo: email,
    subject,
    html,
    tags: [
      { name: "form", value: form.replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 50) },
    ],
  });

  if (error) {
    console.error("Resend error:", error);
    return errorResponse(
      request,
      "Something went wrong. Please try again in a moment.",
      500,
    );
  }

  return successResponse(request);
}
