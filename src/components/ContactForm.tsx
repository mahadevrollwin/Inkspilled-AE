"use client";

import { useState, type FormEvent } from "react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
} from "@/data/country-codes";

const CONTACT_EMAIL = "hello@inkspilled.ae";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

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

function isFormSubmitSuccess(result: {
  success?: string | boolean;
  message?: string;
}): boolean {
  if (result.success === true || result.success === "true") return true;

  const message = String(result.message ?? "").toLowerCase();
  return (
    message.includes("success") ||
    message.includes("thank") ||
    message.includes("confirm your email") ||
    message.includes("activation")
  );
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
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: `${form.countryCode} ${mobile}`,
          message: project,
          _subject: `New inquiry from ${name}, Inkspilled`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      if (!response.ok || !data || !isFormSubmitSuccess(data)) {
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setForm(INITIAL_STATE);
      setStatus("idle");

      const thankYou = window.open("/thank-you", "_blank", "noopener,noreferrer");
      if (!thankYou) {
        window.location.href = "/thank-you";
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-[28px] rounded-tr-none border border-white/20 bg-[#121212]/80 p-5 backdrop-blur-sm sm:p-7 md:p-8"
      noValidate
    >
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
            name="project"
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
