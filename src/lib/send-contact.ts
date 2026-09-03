import { INKSPILLED_CONTACT } from "@/lib/chatbot-knowledge";

export const THANK_YOU_PATH = "/thank-you";
export const FORMSUBMIT_ACTION = `https://formsubmit.co/${INKSPILLED_CONTACT.email}`;
export const FORMSUBMIT_AJAX = `https://formsubmit.co/ajax/${INKSPILLED_CONTACT.email}`;

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

function compactFields(fields: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value.trim() !== ""),
  );
}

function isAccepted(data: FormSubmitResponse | null): boolean {
  if (!data) return false;
  if (data.success === true || data.success === "true") return true;

  const message = String(data.message ?? "").toLowerCase();
  return message.includes("activation");
}

export async function sendContactEmail(
  fields: Record<string, string>,
): Promise<void> {
  const payload = {
    ...compactFields(fields),
    _captcha: "false",
    _template: "table",
  };

  const response = await fetch(FORMSUBMIT_AJAX, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as FormSubmitResponse | null;

  if (!isAccepted(data)) {
    throw new Error("Something went wrong. Please try again in a moment.");
  }
}

export function goToThankYouSameTab() {
  window.location.assign(THANK_YOU_PATH);
}

export async function sendInquiryAndOpenThankYou(
  fields: Record<string, string>,
): Promise<void> {
  await sendContactEmail(fields);
  goToThankYouSameTab();
}
