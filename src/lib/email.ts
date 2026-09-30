import { SITE } from "@/data/content";
import { SITE_URL } from "./site";

type ContactInput = {
  name: string;
  email: string;
  message: string;
  areas: string[];
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Correo para el equipo de Neural Factory: HTML con tablas y estilos en línea + texto plano. */
export function buildContactEmail({ name, email, message, areas }: ContactInput) {
  const first = name.split(/\s+/)[0] || name;
  const subject = `Nuevo caso de ${name.replace(/[\r\n]+/g, " ").slice(0, 80)}`;
  const areaText = areas.length ? areas.join(", ") : "Sin especificar";
  const replySubject = encodeURIComponent("Re: tu mensaje a Neural Factory");
  const replyHref = `mailto:${email}?subject=${replySubject}`;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:18px 0 4px 0;font:500 11px/1.2 'Courier New',monospace;letter-spacing:1.6px;text-transform:uppercase;color:#8a8a8a;">${esc(label)}</td>
    </tr>
    <tr>
      <td style="padding:0 0 18px 0;border-bottom:1px solid #303030;font:400 16px/1.55 Arial,Helvetica,sans-serif;color:#F5F5F5;white-space:pre-wrap;">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <title>${esc(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#111111;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(name)} escribió desde ${esc(SITE.domain)}.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111111;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#1a1a1a;">
            <tr>
              <td style="padding:24px 32px;border-bottom:3px solid #FFC300;">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="padding-right:14px;"><img src="${SITE_URL}/images/logo-nf.png" width="40" height="39" alt="NF" style="display:block;border:0;" /></td>
                  <td style="font:500 13px/1 'Courier New',monospace;letter-spacing:2.4px;text-transform:uppercase;color:#F5F5F5;">Neural Factory</td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px 32px;">
                <p style="margin:0;font:500 11px/1.2 'Courier New',monospace;letter-spacing:1.6px;text-transform:uppercase;color:#FFC300;">Nuevo mensaje del sitio</p>
                <h1 style="margin:12px 0 0 0;font:800 28px/1.1 Arial,Helvetica,sans-serif;color:#F5F5F5;">${esc(name)} quiere hablar contigo.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${row("Nombre", esc(name))}
                  ${row("Correo", `<a href="mailto:${esc(email)}" style="color:#FFC300;text-decoration:underline;">${esc(email)}</a>`)}
                  ${row("Área de interés", esc(areaText))}
                  ${row("Mensaje", esc(message))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 40px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                  <td style="background:#FFC300;">
                    <a href="${replyHref}" style="display:inline-block;padding:16px 28px;font:700 13px/1 'Courier New',monospace;letter-spacing:1.4px;text-transform:uppercase;color:#1a1a1a;text-decoration:none;">Responder a ${esc(first)}</a>
                  </td>
                </tr></table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #303030;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#8a8a8a;">
                Enviado desde el formulario de ${esc(SITE.domain)}. Responde a este correo y llegará directo a ${esc(first)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `Nuevo mensaje del sitio (${SITE.domain})`,
    "",
    `Nombre: ${name}`,
    `Correo: ${email}`,
    `Área de interés: ${areaText}`,
    "",
    "Mensaje:",
    message,
    "",
    `Responder: ${replyHref}`,
  ].join("\n");

  return { subject, html, text };
}
