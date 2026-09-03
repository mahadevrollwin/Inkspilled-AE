"use client";

import { useState, type FormEvent } from "react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
} from "@/data/country-codes";
import {
  FORMSUBMIT_ACTION,
  goToThankYouSameTab,
  sendContactEmail,
} from "@/lib/send-contact";

const THANK_YOU_FALLBACK = "https://inkspilled.ae/thank-you";

const FIELD_CLASS =
  "w-full rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white/35 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-white/45 outline-none transition-[border-color,opacity] focus:border-white";

const LABEL_CLASS =
  "mb-2 block font-body text-xs font-medium tracking-wide text-white/80 md:text-[13px]";

type FormState = {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  project: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  countryCode:
    COUNTRY_CODES.find((item) => item.code === DEFAULT_COUNTRY_CODE)?.dial ??
    "+971",
  mobile: "",
  project: "",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") return;

    const formElement = event.currentTarget;
    const honey = String(new FormData(formElement).get("_honey") ?? "");
    if (honey) {
      goToThankYouSameTab();
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();
    const project = form.project.trim();

    if (!name || !email || !mobile || !project) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before sending.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[\d\s\-().]{6,32}$/.test(mobile)) {
      setStatus("error");
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await sendContactEmail({
        name,
        email,
        phone: `${form.countryCode} ${mobile}`,
        message: project,
        _subject: `New inquiry from ${name}, Inkspilled`,
      });
      goToThankYouSameTab();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <form
      action={FORMSUBMIT_ACTION}
      method="POST"
      target="_self"
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-[28px] rounded-tr-none border border-white/20 bg-[#121212]/80 p-5 backdrop-blur-sm sm:p-7 md:p-8"
      noValidate
    >
      <input type="hidden" name="_next" defaultValue={THANK_YOU_FALLBACK} />
      <input type="hidden" name="_captcha" defaultValue="false" />
      <input type="hidden" name="_template" defaultValue="table" />
      <input type="hidden" name="_subject" defaultValue="New inquiry, Inkspilled" />
      <input type="hidden" name="phone" defaultValue="" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="space-y-4 md:space-y-5">
        <div>
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Your Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={FIELD_CLASS}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Your Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={FIELD_CLASS}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="contact-mobile" className={LABEL_CLASS}>
            Your Mobile Number
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <select
              id="contact-country-code"
              name="countryCode"
              aria-label="Country code"
              required
              value={form.countryCode}
              onChange={(event) => updateField("countryCode", event.target.value)}
              className={`${FIELD_CLASS} sm:max-w-[11.5rem] sm:shrink-0`}
            >
              {COUNTRY_CODES.map((item) => (
                <option
                  key={`${item.code}-${item.dial}`}
                  value={item.dial}
                  className="bg-[#1a1a1a] text-white"
                >
                  {item.code} {item.dial}
                </option>
              ))}
            </select>
            <input
              id="contact-mobile"
              name="mobile"
              type="tel"
              autoComplete="tel-national"
              required
              value={form.mobile}
              onChange={(event) => updateField("mobile", event.target.value)}
              className={FIELD_CLASS}
              placeholder="58 579 9959"
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-project" className={LABEL_CLASS}>
            Tell Us About Your Project
          </label>
          <textarea
            id="contact-project"
            name="message"
            required
            rows={5}
            value={form.project}
            onChange={(event) => updateField("project", event.target.value)}
            className={`${FIELD_CLASS} min-h-[120px] resize-y`}
            placeholder="Share your goals, timeline, and anything else we should know."
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 font-body text-sm text-[#ff8a80]" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-white bg-white px-6 py-3.5 font-body text-sm font-semibold text-[#1a1a1a] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Request"}
      </button>
    </form>
  );
}
