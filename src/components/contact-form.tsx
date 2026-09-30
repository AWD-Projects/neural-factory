"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/data/content";
import { ArrowRight } from "./icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const label = "font-mono text-xs font-medium uppercase tracking-[0.14em]";
const input =
  "mt-2 w-full rounded-none border-0 border-b-2 border-ink bg-transparent px-0 py-3 text-xl text-ink outline-none transition-colors focus:bg-ink/[0.06]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [areas, setAreas] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Preselecciona el área cuando llegan desde un servicio
  useEffect(() => {
    const onArea = (e: Event) => {
      const area = (e as CustomEvent<string>).detail;
      setAreas((prev) => (prev.includes(area) ? prev : [...prev, area]));
    };
    window.addEventListener("nf:area", onArea);
    return () => window.removeEventListener("nf:area", onArea);
  }, []);

  const toggle = (area: string) =>
    setAreas((prev) => (prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Escribe tu nombre.";
    if (!EMAIL_RE.test(email)) next.email = "Escribe un correo válido.";
    if (message.length < 10) next.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, areas, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setAreas([]);
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-9" aria-describedby="cf-status">
      <div>
        <label htmlFor="cf-name" className={label}>
          {CONTACT.fields.name}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          className={input}
        />
        {errors.name && (
          <p id="cf-name-err" className="mt-2 text-sm font-medium">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className={label}>
          {CONTACT.fields.email}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          className={input}
        />
        {errors.email && (
          <p id="cf-email-err" className="mt-2 text-sm font-medium">
            {errors.email}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={label}>{CONTACT.fields.areas}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACT.areas.map((area) => {
            const id = `cf-area-${area.replace(/\W+/g, "-").toLowerCase()}`;
            return (
              <div key={area}>
                <input
                  id={id}
                  type="checkbox"
                  className="peer sr-only"
                  checked={areas.includes(area)}
                  onChange={() => toggle(area)}
                />
                <label
                  htmlFor={id}
                  className="block cursor-pointer select-none border-2 border-ink px-3 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-ink/10 peer-checked:bg-ink peer-checked:text-signal peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink"
                >
                  {area}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="cf-message" className={label}>
          {CONTACT.fields.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className={cn(input, "resize-y")}
        />
        {errors.message && (
          <p id="cf-message-err" className="mt-2 text-sm font-medium">
            {errors.message}
          </p>
        )}
      </div>

      {/* Señuelo para bots: las personas no lo ven ni llegan con el teclado */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">No llenar este campo</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-3 border-2 border-ink bg-ink px-7 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-signal transition-colors duration-200 hover:bg-transparent hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? CONTACT.sending : CONTACT.submit}
          <ArrowRight />
        </button>
        <p id="cf-status" role="status" aria-live="polite" className="max-w-[40ch] text-base font-medium">
          {status === "success" && CONTACT.success}
          {status === "error" && CONTACT.error}
          {status === "idle" && Object.keys(errors).length > 0 && CONTACT.invalid}
        </p>
      </div>
    </form>
  );
}
