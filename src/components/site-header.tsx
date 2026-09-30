"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CTA, NAV, SITE } from "@/data/content";
import { ArrowRight, Close, Linkedin, Menu } from "./icons";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("");
  const progress = useRef<HTMLDivElement>(null);

  // Progreso de lectura y fondo sólido al bajar
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${p})`;
      setStuck(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Sección activa (scroll-spy)
  useEffect(() => {
    const ids = [...NAV.map((n) => n.id), "contacto"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!("IntersectionObserver" in window) || els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll y cierra con Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        stuck || open ? "border-paper/15 bg-ink" : "border-transparent bg-transparent",
      )}
      style={{ height: "var(--header-h)" }}
    >
      <div className="container-page flex h-full items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Neural Factory, ir al inicio">
          <Image
            src="/images/logo-nf.png"
            alt=""
            width={131}
            height={128}
            priority
            className="h-9 w-auto"
          />
          <span className="hidden font-mono text-[13px] font-medium uppercase tracking-[0.18em] sm:block">
            Neural Factory
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative py-2 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:text-signal",
                active === item.id ? "text-signal" : "text-paper/80",
              )}
            >
              {item.label}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-signal transition-transform duration-300",
                  active === item.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Neural Factory en LinkedIn"
            className="hidden text-paper/80 transition-colors hover:text-signal sm:block"
          >
            <Linkedin />
          </a>
          <a href={CTA.href} className="btn hidden !px-5 !py-3 sm:inline-flex">
            {CTA.label}
          </a>
          <button
            type="button"
            className="-mr-2 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div
        id="menu-movil"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[var(--header-h)] overflow-y-auto bg-ink lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-page flex min-h-full flex-col py-8">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.id} className="border-t border-paper/15 last:border-b">
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="display flex items-baseline justify-between py-5 text-3xl"
                  style={{ ["--wdth" as string]: 112 }}
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <a href={CTA.href} onClick={() => setOpen(false)} className="btn mt-8 w-full">
            {CTA.label}
            <ArrowRight />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-line mt-8 self-start"
          >
            <Linkedin /> LinkedIn
          </a>
        </nav>
      </div>

      <div
        ref={progress}
        aria-hidden
        className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-signal"
      />
    </header>
  );
}
