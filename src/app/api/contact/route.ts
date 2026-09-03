import { NextResponse } from "next/server";
import { deliverInquiryEmail } from "@/lib/deliver-inquiry-email";

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

async function parseBody(request: Request): Promise<InquiryBody> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json()) as InquiryBody;
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries()) as InquiryBody;
}

function requestOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      // Ignore malformed referers and use the live site origin.
    }
  }

  return "https://inkspilled.ae";
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

function errorResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: InquiryBody;

  try {
    body = await parseBody(request);
  } catch {
    return errorResponse("Invalid form submission.", 400);
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
      "Please fill in all required fields before sending.",
      400,
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return errorResponse("Please enter a valid email address.", 400);
  }

  if (!PHONE_PATTERN.test(phone)) {
    return errorResponse("Please enter a valid phone number.", 400);
  }

  const delivered = await deliverInquiryEmail(
    {
      form,
      name,
      email,
      phone,
      message,
      company,
      service,
      budget,
    },
    requestOrigin(request),
  );

  if (!delivered) {
    return errorResponse(
      "Something went wrong. Please try again in a moment.",
      500,
    );
  }

  return successResponse(request);
}
