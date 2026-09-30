"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PERFORMANCE, type BenchmarkRow } from "@/data/content";
import { cn } from "@/lib/utils";

const DURATION_MS = 6500;
const nf = new Intl.NumberFormat("es-MX");

const secs = (s: number) => `${nf.format(Math.round(s))} s`;
const ratio = (r: number) => (r < 10 ? r.toFixed(1) : String(Math.round(r)));

/** Terminados de menor a mayor tiempo; los que no terminaron al final. */
function sortRows(rows: readonly BenchmarkRow[]): BenchmarkRow[] {
  const done = rows.filter((r) => r.seconds !== null).sort((a, b) => a.seconds! - b.seconds!);
  const open = rows.filter((r) => r.seconds === null);
  return [...done, ...open];
}

/**
 * "Prueba de carga": carrera de procesamiento con los datos reales de las
 * tres pruebas. Todas las herramientas arrancan a la vez; cada barra se
 * detiene al terminar. El reloj acelera para que la de mayor tiempo quepa
 * en unos segundos. Sin JavaScript (o con movimiento reducido) se ve el
 * resultado final.
 */
export function LoadTest() {
  const data = PERFORMANCE.benchmarks;
  const [active, setActive] = useState(0);
  const [clock, setClock] = useState<number | null>(null); // null = resultado final
  const raf = useRef(0);
  const board = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const reduce = useRef(false);

  const bench = data[active];
  const rows = useMemo(() => sortRows(bench.rows), [bench]);
  const tMax = useMemo(() => Math.max(...bench.rows.map((r) => r.seconds ?? 0)), [bench]);
  const base = rows[0].seconds as number;

  const play = useCallback(
    (idx: number) => {
      cancelAnimationFrame(raf.current);
      const max = Math.max(...data[idx].rows.map((r) => r.seconds ?? 0));
      if (reduce.current) {
        setClock(null);
        return;
      }
      const t0 = performance.now();
      setClock(0);
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / DURATION_MS);
        setClock(max * p ** 3); // arranque lento, aceleración al final
        if (p < 1) raf.current = requestAnimationFrame(tick);
        else setClock(null);
      };
      raf.current = requestAnimationFrame(tick);
    },
    [data],
  );

  // Arranca al entrar en pantalla (una sola vez)
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = board.current;
    if (!el || reduce.current || !("IntersectionObserver" in window)) return;
    setClock(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          play(0);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [play]);

  const select = (i: number) => {
    started.current = true;
    setActive(i);
    play(i);
  };

  const valueOf = (s: number | null) => {
    const end = s ?? tMax;
    return clock === null ? end : Math.min(clock, end);
  };
  const finished = (s: number | null) => clock === null || clock >= (s ?? tMax);

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-x-6">
      {/* Columna izquierda: contexto y selector */}
      <div className="lg:col-span-4">
        <p className="reveal max-w-[44ch] text-lg leading-relaxed text-paper/80 md:text-xl">
          {PERFORMANCE.text}
        </p>

        <div className="reveal mt-8">
          <Image
            src="/images/megaladata-blanco.png"
            alt="Megaladata"
            width={801}
            height={146}
            className="h-auto w-44"
          />
        </div>

        <div
          role="tablist"
          aria-label="Volumen de datos de la prueba"
          className="reveal mt-10 grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-0"
        >
          {data.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              id={`tab-${b.id}`}
              aria-selected={i === active}
              aria-controls="tablero-carga"
              onClick={() => select(i)}
              className={cn(
                "flex flex-col items-start gap-1 border border-paper/25 px-4 py-4 text-left transition-colors duration-200 lg:flex-row lg:items-baseline lg:justify-between lg:border-x-0 lg:border-b-0 lg:px-2 lg:py-6 lg:last:border-b",
                i === active ? "border-signal bg-signal text-ink" : "hover:bg-paper/10",
              )}
            >
              <span className="display text-2xl sm:text-4xl" style={{ ["--wdth" as string]: 114 }}>
                {b.label}
              </span>
              <span className={cn("eyebrow", i === active && "!text-ink/80")}>Prueba 0{i + 1}</span>
            </button>
          ))}
        </div>

        <button type="button" onClick={() => play(active)} className="btn-line reveal mt-8">
          Repetir la prueba
        </button>
      </div>

      {/* Tablero */}
      <div
        ref={board}
        id="tablero-carga"
        role="tabpanel"
        aria-labelledby={`tab-${bench.id}`}
        className="reveal lg:col-span-8"
      >
        <div className="flex items-end justify-between gap-6 border-t border-paper/25 pb-6 pt-5">
          <div>
            <h3 className="display text-xl md:text-2xl" style={{ ["--wdth" as string]: 114 }}>
              Prueba con {bench.label} de datos
            </h3>
            <p className="eyebrow mt-2">{PERFORMANCE.caption}</p>
          </div>
          <div aria-hidden className="text-right">
            <p className="eyebrow">Tiempo transcurrido</p>
            <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-signal md:text-3xl">
              {secs(clock === null ? tMax : clock)}
            </p>
          </div>
        </div>

        {/* Tablero visual (el contenido accesible está en las tablas de abajo) */}
        <div aria-hidden>
          <div className="hidden grid-cols-[132px_1fr_168px] gap-x-4 pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60 sm:grid">
            <span />
            <span className="flex justify-between">
              <span>0 s</span>
              <span>{secs(tMax)}</span>
            </span>
            <span />
          </div>

          <ol>
            {rows.map((row, i) => {
              const isBase = i === 0;
              const cur = valueOf(row.seconds);
              const done = finished(row.seconds);
              const w = (cur / tMax) * 100;
              const open = row.seconds === null;
              return (
                <li
                  key={`${bench.id}-${row.tool}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 border-t border-paper/20 py-5 sm:grid-cols-[132px_1fr_168px]"
                >
                  <span
                    className={cn(
                      "font-mono text-[13px] font-medium uppercase tracking-[0.12em]",
                      isBase ? "text-signal" : "text-paper",
                    )}
                  >
                    {row.tool}
                  </span>

                  <div className="relative order-3 col-span-2 h-7 bg-paper/[0.07] sm:order-none sm:col-span-1">
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0",
                        isBase ? "bg-signal" : open ? "hatch border-r-2 border-paper/70" : "bg-paper/55",
                      )}
                      style={{ width: `${w}%`, minWidth: cur > 0 ? 4 : 0 }}
                    />
                  </div>

                  <div className="text-right font-mono tabular-nums">
                    {open && done ? (
                      <span className="block text-[11px] uppercase leading-tight tracking-[0.1em] text-paper/80">
                        {PERFORMANCE.unfinished}
                      </span>
                    ) : (
                      <>
                        <span className={cn("block text-lg font-medium", isBase && "text-signal")}>
                          {secs(cur)}
                        </span>
                        <span className="block h-4 text-[11px] uppercase tracking-[0.1em] text-paper/70">
                          {done ? (isBase ? "Más rápido" : `${ratio((row.seconds as number) / base)}× más lento`) : ""}
                        </span>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Equivalente accesible: los tres resultados en tablas */}
        <div className="sr-only">
          {data.map((b) => (
            <table key={b.id}>
              <caption>Prueba con {b.label} de datos. {PERFORMANCE.caption}</caption>
              <thead>
                <tr>
                  <th scope="col">Herramienta</th>
                  <th scope="col">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                {sortRows(b.rows).map((r) => (
                  <tr key={r.tool}>
                    <th scope="row">{r.tool}</th>
                    <td>{r.seconds === null ? PERFORMANCE.unfinished : secs(r.seconds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
}
