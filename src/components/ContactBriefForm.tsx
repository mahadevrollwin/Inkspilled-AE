"use client";

import { useState, type FormEvent } from "react";
import {
  COUNTRY_CODES,
  DEFAULT_COUNTRY_CODE,
} from "@/data/country-codes";
import { SERVICES } from "@/data/services";
import {
  CONTACT_API_PATH,
  goToThankYouSameTab,
  sendInquiryAndOpenThankYou,
} from "@/lib/send-contact";
import { useDictionary, useLocale } from "@/i18n/locale-context";

const FIELD_CLASS =
  "w-full rounded-tl-[10px] rounded-tr-none rounded-br-[10px] rounded-bl-[10px] border border-ink-dark/15 bg-white px-4 py-3 font-body text-sm text-ink-dark placeholder:text-ink-gray/70 outline-none transition-[border-color] focus:border-ink-dark/40";

const LABEL_CLASS =
  "mb-2 block font-body text-xs font-medium tracking-wide text-ink-dark/80 md:text-[13px]";

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

export default function ContactBriefForm({
  budgetOptions,
}: {
  budgetOptions?: string[];
}) {
  const t = useDictionary();
  const locale = useLocale();
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
      goToThankYouSameTab(locale);
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const company = form.company.trim();
    const requirement = form.requirement.trim();

    if (!name || !email || !phone || !company || !requirement) {
      setStatus("error");
      setErrorMessage(t.form.required);
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setErrorMessage(t.form.invalidEmail);
      return;
    }

    if (!/^[\d\s\-().]{6,32}$/.test(phone)) {
      setStatus("error");
      setErrorMessage(t.form.invalidPhone);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await sendInquiryAndOpenThankYou({
        form: "Contact page",
        name,
        email,
        phone: `${form.countryCode} ${phone}`,
        company,
        service: form.service,
        budget: form.budget,
        message: requirement,
      }, locale);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t.form.genericError,
      );
    }
  }

  return (
    <form
      action={CONTACT_API_PATH}
      method="POST"
      target="_self"
      onSubmit={handleSubmit}
      className="relative w-full"
      noValidate
    >
      <input type="hidden" name="form" defaultValue="Contact page" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
        <div className="sm:col-span-1">
          <label htmlFor="brief-name" className={LABEL_CLASS}>
            {t.form.name} <span className="text-ink-red">*</span>
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
            placeholder={t.form.namePlaceholder}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-email" className={LABEL_CLASS}>
            {t.form.email} <span className="text-ink-red">*</span>
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
            placeholder={t.form.emailPlaceholder}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-phone" className={LABEL_CLASS}>
            {t.form.phone} <span className="text-ink-red">*</span>
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              id="brief-country-code"
              name="countryCode"
              aria-label={t.form.countryCode}
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
            {t.form.company} <span className="text-ink-red">*</span>
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
            placeholder={t.form.companyPlaceholder}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-service" className={LABEL_CLASS}>
            {t.form.service}
          </label>
          <select
            id="brief-service"
            name="service"
            value={form.service}
            onChange={(event) => updateField("service", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">{t.form.chooseService}</option>
            {SERVICES.map((service, index) => (
              <option key={service.slug} value={service.title}>
                {t.services.menu[index] ?? service.title}
              </option>
            ))}
            <option value="Other">{t.form.otherService}</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="brief-budget" className={LABEL_CLASS}>
            {t.form.budget}
          </label>
          <select
            id="brief-budget"
            name="budget"
            value={form.budget}
            onChange={(event) => updateField("budget", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">{t.form.budget}</option>
            {(budgetOptions?.length ? budgetOptions : BUDGET_OPTIONS).map((option) => (
              <option key={option} value={option}>
                {t.contact.budgetLabels[option] || option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="brief-requirement" className={LABEL_CLASS}>
            {t.form.requirement} <span className="text-ink-red">*</span>
          </label>
          <textarea
            id="brief-requirement"
            name="message"
            required
            rows={5}
            value={form.requirement}
            onChange={(event) =>
              updateField("requirement", event.target.value)
            }
            className={`${FIELD_CLASS} min-h-[130px] resize-y`}
            placeholder={t.form.requirementPlaceholder}
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
          {status === "submitting" ? t.form.sending : t.form.send}
        </button>
        <p className="max-w-xs font-body text-xs leading-relaxed text-ink-gray">
          {t.contact.formPrivacy}
        </p>
      </div>
    </form>
  );
}
