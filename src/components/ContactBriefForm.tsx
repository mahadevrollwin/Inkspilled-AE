"use client";

import { useState, type FormEvent } from "react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
} from "@/data/country-codes";
import { SERVICES } from "@/data/services";

const CONTACT_ENDPOINT = "/api/contact";

const FIELD_CLASS =
  "w-full rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark/15 bg-white px-4 py-3 font-body text-sm text-ink-dark placeholder:text-ink-gray/70 outline-none transition-[border-color] focus:border-ink-dark/40";

const LABEL_CLASS =
  "mb-2 block font-body text-xs font-medium tracking-wide text-ink-dark/80 md:text-[13px]";

const SERVICE_OPTIONS = [
  ...SERVICES.map((service) => service.title),
  "Other",
] as const;

const BUDGET_OPTIONS = [
  "AED 10K to AED 50K",
  "AED 50K to AED 100K",
  "AED 100K to AED 250K",
  "AED 250K to AED 500K",
  "AED 500K & Above",
] as const;

type FormState = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  requirement: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  countryCode:
    COUNTRY_CODES.find((item) => item.code === DEFAULT_COUNTRY_CODE)?.dial ??
    "+971",
  phone: "",
  company: "",
  service: "",
  budget: "",
  requirement: "",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactBriefForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const website = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );
    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const company = form.company.trim();
    const requirement = form.requirement.trim();

    if (!name || !email || !phone || !company || !requirement) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields before sending.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[\d\s\-().]{6,32}$/.test(phone)) {
      setStatus("error");
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const serviceLine = form.service ? `Service: ${form.service}` : "";
    const budgetLine = form.budget ? `Budget: ${form.budget}` : "";
    const messageBody = [requirement, serviceLine, budgetLine]
      .filter(Boolean)
      .join("\n\n");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: `${form.countryCode} ${phone}`,
          company,
          service: form.service || "Not specified",
          budget: form.budget || "Not specified",
          message: messageBody,
          website,
          _subject: `New brief from ${name}, ${company}`,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !data?.success) {
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Something went wrong. Please try again in a moment.",
        );
        return;
      }

      setForm(INITIAL_STATE);
      window.location.assign("/thank-you");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
        <div className="sm:col-span-1">
          <label htmlFor="brief-name" className={LABEL_CLASS}>
            Your Name <span className="text-ink-red">*</span>
          </label>
          <input
            id="brief-name"
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

        <div className="sm:col-span-1">
          <label htmlFor="brief-email" className={LABEL_CLASS}>
            Email <span className="text-ink-red">*</span>
          </label>
          <input
            id="brief-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={FIELD_CLASS}
            placeholder="you@company.com"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-phone" className={LABEL_CLASS}>
            Phone <span className="text-ink-red">*</span>
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              id="brief-country-code"
              name="countryCode"
              aria-label="Country code"
              required
              value={form.countryCode}
              onChange={(event) =>
                updateField("countryCode", event.target.value)
              }
              className={`${FIELD_CLASS} sm:max-w-[9.5rem] sm:shrink-0`}
            >
              {COUNTRY_CODES.map((item) => (
                <option key={`${item.code}-${item.dial}`} value={item.dial}>
                  {item.code} {item.dial}
                </option>
              ))}
            </select>
            <input
              id="brief-phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              required
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className={FIELD_CLASS}
              placeholder="58 579 9959"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-company" className={LABEL_CLASS}>
            Company Name <span className="text-ink-red">*</span>
          </label>
          <input
            id="brief-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className={FIELD_CLASS}
            placeholder="Your company or brand"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-service" className={LABEL_CLASS}>
            Service
          </label>
          <select
            id="brief-service"
            name="service"
            value={form.service}
            onChange={(event) => updateField("service", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">Choose Service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-budget" className={LABEL_CLASS}>
            Estimated Budget
          </label>
          <select
            id="brief-budget"
            name="budget"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">Estimated Budget</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="brief-requirement" className={LABEL_CLASS}>
            Your Requirement <span className="text-ink-red">*</span>
          </label>
          <textarea
            id="brief-requirement"
            name="requirement"
            required
            rows={5}
            value={form.requirement}
            onChange={(event) =>
              updateField("requirement", event.target.value)
            }
            className={`${FIELD_CLASS} min-h-[130px] resize-y`}
            placeholder="Tell us about your brand, goals, timeline, and what success looks like."
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 font-body text-sm text-ink-red" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark bg-ink-dark px-7 py-3.5 font-body text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Message →"}
        </button>
        <p className="max-w-xs font-body text-xs leading-relaxed text-ink-gray">
          We respect your privacy. Your details are only used to respond to
          your enquiry.
        </p>
      </div>
    </form>
  );
}
