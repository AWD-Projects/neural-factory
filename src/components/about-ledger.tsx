"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  title: string;
  text?: string;
  values?: readonly string[];
  image: string;
  alt: string;
};

/**
 * Filas de "Nosotros" con una figura fija que cambia según la fila que
 * cruza el centro de la pantalla. En móvil, cada fila lleva su propia imagen.
 */
export function AboutLedger({ items }: { items: readonly Item[] }) {
  const [active, setActive] = useState(0);
  const rows = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-x-6">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <figure className="crop relative aspect-square overflow-hidden bg-ink-deep">
            {items.map((item, i) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 0px"
                loading={i === 0 ? "eager" : "lazy"}
                className={cn(
                  "object-cover transition-opacity duration-500",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
          </figure>
        </div>
      </div>

      <ol className="lg:col-span-7 lg:col-start-7">
        {items.map((item, i) => (
          <li
            key={item.id}
            ref={(el) => {
              rows.current[i] = el;
            }}
            data-i={i}
            onMouseEnter={() => setActive(i)}
            className="reveal border-t border-paper/25 py-10 last:border-b md:py-14 lg:min-h-[36vh]"
          >
            <h3
              className="display text-3xl md:text-4xl"
              style={{ ["--wdth" as string]: 114 }}
            >
              {item.title}
            </h3>

            {item.values ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {item.values.map((v) => (
                  <li
                    key={v}
                    className="border border-paper/40 px-4 py-2 font-mono text-sm uppercase tracking-[0.1em]"
                  >
                    {v}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-paper/80">{item.text}</p>
            )}

            <figure className="crop relative mt-8 aspect-[4/3] overflow-hidden bg-ink-deep lg:hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 640px) 60vw, 90vw"
                loading="lazy"
                className="object-cover"
              />
            </figure>
          </li>
        ))}
      </ol>
    </div>
  );
}
