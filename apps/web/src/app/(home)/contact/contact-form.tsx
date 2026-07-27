"use client";

import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { FaRegPaperPlane } from "react-icons/fa";

const STATUS_MESSAGE_ID = "contact-form-status";
const MIN_MESSAGE_LENGTH = 10;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

type ContactFormProps = {
  fallbackEmail: string;
};

type MailtoFields = {
  fallbackEmail: string;
  fullname: string;
  email: string;
  message: string;
};

type SubmitStatus = "idle" | "success" | "error";

function buildMailtoHref({
  fallbackEmail,
  fullname,
  email,
  message,
}: MailtoFields) {
  const subject = `Portfolio contact from ${fullname}`;
  const body = [`Name: ${fullname}`, `Reply-to: ${email}`, "", message].join(
    "\n"
  );

  return `mailto:${fallbackEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function ContactForm({ fallbackEmail }: ContactFormProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [fallbackHref, setFallbackHref] = useState<string | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/send-email.mp3");
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setFallbackHref(null);

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const fullname = String(formData.get("fullname") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const userMessage = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "").trim();

    if (!fullname || !email || !userMessage) {
      setStatus("error");
      setMessage("Please fill in your name, email, and message.");
      return;
    }

    if (userMessage.length < MIN_MESSAGE_LENGTH) {
      setStatus("error");
      setMessage(
        `Please write at least ${MIN_MESSAGE_LENGTH} characters in your message.`
      );
      return;
    }

    if (website) {
      setStatus("success");
      setMessage("Thanks, your message was received.");
      setFallbackHref(null);
      formRef.current?.reset();
      return;
    }

    const fallbackMailtoHref = buildMailtoHref({
      fallbackEmail,
      fullname,
      email,
      message: userMessage,
    });

    if (
      !emailjsConfig.serviceId ||
      !emailjsConfig.templateId ||
      !emailjsConfig.publicKey
    ) {
      setStatus("error");
      setMessage(
        "Contact form is not configured yet. Please email me directly."
      );
      setFallbackHref(fallbackMailtoHref);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");
    setFallbackHref(null);

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          fullname,
          email,
          reply_to: email,
          message: userMessage,
        },
        {
          publicKey: emailjsConfig.publicKey,
        }
      );

      setStatus("success");
      setMessage("Message sent successfully. Thank you for reaching out!");
      setFallbackHref(null);
      formRef.current?.reset();
      await audioRef.current?.play().catch(() => undefined);
    } catch {
      setStatus("error");
      setMessage("Message could not be sent. Please try again later.");
      setFallbackHref(fallbackMailtoHref);
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClassName =
    status === "error"
      ? "text-bittersweet-shimmer mb-4 text-sm"
      : status === "success"
        ? "text-orange-yellow-crayola mb-4 text-sm"
        : "text-light-gray mb-4 text-sm";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="form"
      data-form
      aria-describedby={STATUS_MESSAGE_ID}
    >
      <div className="input-wrapper">
        <div className="w-full">
          <label className="sr-only" htmlFor="contact-fullname">
            Full name
          </label>
          <input
            id="contact-fullname"
            type="text"
            name="fullname"
            className="form-input"
            placeholder="Full name"
            autoComplete="name"
            maxLength={MAX_NAME_LENGTH}
            required
            data-form-input
          />
        </div>
        <div className="w-full">
          <label className="sr-only" htmlFor="contact-email">
            Email address
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Email address"
            autoComplete="email"
            maxLength={MAX_EMAIL_LENGTH}
            required
            data-form-input
          />
        </div>
      </div>
      <label className="sr-only" htmlFor="contact-message">
        Your message
      </label>
      <textarea
        id="contact-message"
        name="message"
        className="form-input"
        placeholder="Your Message"
        minLength={MIN_MESSAGE_LENGTH}
        maxLength={MAX_MESSAGE_LENGTH}
        required
        data-form-input
      />
      <div className="pointer-events-none absolute size-px overflow-hidden opacity-0">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>
      <noscript>
        <p className="text-light-gray mb-4 text-sm">
          JavaScript is required to send this form. You can email me directly at{" "}
          <a
            className="text-orange-yellow-crayola"
            href={`mailto:${fallbackEmail}`}
          >
            {fallbackEmail}
          </a>
          .
        </p>
      </noscript>
      <p
        id={STATUS_MESSAGE_ID}
        className={statusClassName}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      {fallbackHref ? (
        <a
          className="text-orange-yellow-crayola mb-4 inline-block text-sm hover:underline"
          href={fallbackHref}
        >
          Send with your email app
        </a>
      ) : null}
      <button
        className="form-btn"
        data-form-btn
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
      >
        <FaRegPaperPlane aria-hidden="true" />
        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
      </button>
    </form>
  );
}

export default ContactForm;
