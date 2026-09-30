"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Enlace a #contacto que además avisa al formulario qué servicio se eligió,
 * para que llegue preseleccionado.
 */
export function AreaLink({
  area,
  children,
  className,
}: {
  area: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#contacto"
      onClick={() => window.dispatchEvent(new CustomEvent("nf:area", { detail: area }))}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
