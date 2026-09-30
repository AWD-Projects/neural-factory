import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Ancho máximo del h2 en caracteres. */
  titleWidth?: string;
};

/**
 * Contenedor común de todas las secciones: regla, índice técnico y h2.
 * Es lo que mantiene todo alineado a la misma retícula.
 */
export function Section({
  id,
  title,
  children,
  className,
  titleWidth = "max-w-[22ch]",
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("section-y relative", className)}>
      <div className="container-page">
        <header className="mb-12 md:mb-20">
          <div className="rule h-px bg-paper/25" aria-hidden />
          <h2
            id={`${id}-title`}
            className={cn(
              "display reveal mt-8 text-[clamp(2.1rem,5.2vw,4.6rem)] leading-[0.98]",
              titleWidth,
            )}
            style={{ ["--wdth" as string]: 116 }}
          >
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
