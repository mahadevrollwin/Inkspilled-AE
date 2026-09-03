export const THANK_YOU_PATH = "/thank-you";
export const CONTACT_API_PATH = "/api/contact";

export type InquiryPayload = {
  form: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  service?: string;
  budget?: string;
};

export function goToThankYouSameTab() {
  window.location.assign(THANK_YOU_PATH);
}

export async function sendInquiryAndOpenThankYou(
  fields: InquiryPayload,
): Promise<void> {
  const response = await fetch(CONTACT_API_PATH, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const data = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;

  if (!response.ok || !data?.ok) {
    throw new Error(
      data?.error || "Something went wrong. Please try again in a moment.",
    );
  }

  goToThankYouSameTab();
}
