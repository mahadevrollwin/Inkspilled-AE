import { Resend } from "resend";
import { INKSPILLED_CONTACT } from "@/lib/chatbot-knowledge";

export type InquiryEmail = {
  form: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
  service: string;
  budget: string;
};

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

export function inquiryHtml(fields: InquiryEmail): string {
  return `
    <div style="font-family:Arial,sans-serif;background:#f6f6f4;padding:24px;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #ececec;border-radius:12px;overflow:hidden;">
        <div style="padding:20px 24px;background:#1a1a1a;color:#ffffff;">
          <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#bbbbbb;">Inkspilled</p>
          <h1 style="margin:8px 0 0;font-size:22px;">New website inquiry</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;">
          ${row("Form", fields.form)}
          ${row("Name", fields.name)}
          ${row("Email", fields.email)}
          ${row("Phone", fields.phone)}
          ${row("Company", fields.company)}
          ${row("Service", fields.service)}
          ${row("Budget", fields.budget)}
          ${row("Message", fields.message)}
        </table>
      </div>
    </div>
  `;
}

async function sendWithResend(fields: InquiryEmail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const fromAddress =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    `Inkspilled <${INKSPILLED_CONTACT.email}>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: [INKSPILLED_CONTACT.email],
      replyTo: fields.email,
      subject: `New inquiry from ${fields.name}, Inkspilled`,
      html: inquiryHtml(fields),
    });

    if (!error) return true;
    console.error("Resend error:", error);
    return false;
  } catch (error) {
    console.error("Resend send failed:", error);
    return false;
  }
}

async function sendWithFormSubmit(
  fields: InquiryEmail,
  origin: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${INKSPILLED_CONTACT.email}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Origin: origin,
          Referer: `${origin}/`,
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company: fields.company,
          service: fields.service,
          budget: fields.budget,
          message: fields.message,
          form: fields.form,
          _subject: `New inquiry from ${fields.name}, Inkspilled`,
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const data = (await response.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;

    if (data?.success === true || data?.success === "true") return true;

    const message = String(data?.message ?? "").toLowerCase();
    return message.includes("activation");
  } catch (error) {
    console.error("FormSubmit fallback failed:", error);
    return false;
  }
}

export async function deliverInquiryEmail(
  fields: InquiryEmail,
  origin: string,
): Promise<boolean> {
  if (await sendWithResend(fields)) return true;
  return sendWithFormSubmit(fields, origin);
}
