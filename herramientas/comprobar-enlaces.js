#!/usr/bin/env node
/**
 * Comprobacion del sitio ya compilado.
 *
 * Recorre _sitio y verifica que no se publique nada roto:
 *   - todos los enlaces internos apuntan a un archivo que existe
 *   - todas las imagenes, hojas de estilo y scripts existen
 *   - los enlaces con ancla (#) apuntan a un identificador presente en la pagina
 *   - no hay enlaces vacios ni «href="#"» de adorno
 *   - cada pagina declara idioma y tiene un unico encabezado de primer nivel
 *   - todas las imagenes llevan atributo alt
 *
 * Uso:  node herramientas/comprobar-enlaces.js [prefijo]
 *       El prefijo es el que se haya pasado a --pathprefix al compilar.
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITIO = path.join(RAIZ, "_sitio");
const PREFIJO = (process.argv[2] || "/").replace(/\/+$/, "") + "/";

const problemas = [];
const avisos = [];

async function archivosHtml(directorio) {
  const encontrados = [];
  for (const entrada of await readdir(directorio, { withFileTypes: true })) {
    const completo = path.join(directorio, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...(await archivosHtml(completo)));
    else if (entrada.name.endsWith(".html")) encontrados.push(completo);
  }
  return encontrados;
}

/** Traduce una ruta publica a la ruta del archivo que deberia existir. */
function rutaDeDestino(url) {
  let limpia = url.split("#")[0].split("?")[0];
  if (!limpia.startsWith(PREFIJO)) return null;
  limpia = "/" + limpia.slice(PREFIJO.length);
  const destino = path.join(SITIO, limpia);
  if (limpia.endsWith("/")) return path.join(destino, "index.html");
  return destino;
}

const atributos = (html, atributo) =>
  [...html.matchAll(new RegExp(`${atributo}\\s*=\\s*"([^"]*)"`, "g"))].map((m) => m[1]);

for (const archivo of await archivosHtml(SITIO)) {
  const relativo = path.relative(SITIO, archivo);
  const html = await readFile(archivo, "utf8");
  const enPagina = (mensaje) => problemas.push(`${relativo}: ${mensaje}`);

  // Idioma y encabezado unico de primer nivel.
  if (!/<html[^>]+lang="[a-z-]+"/i.test(html)) enPagina("falta el atributo lang en <html>");
  const numeroH1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (numeroH1 !== 1) enPagina(`tiene ${numeroH1} encabezados <h1> (debe haber exactamente uno)`);

  // Imagenes sin texto alternativo.
  for (const etiqueta of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\salt\s*=/.test(etiqueta)) enPagina(`imagen sin atributo alt: ${etiqueta.slice(0, 90)}`);
  }

  // La direccion canonica debe coincidir con el lugar real de publicacion.
  // Solo se comprueba cuando se compila con prefijo, que es como publica
  // GitHub Actions: en una compilacion local sin prefijo la discrepancia es
  // normal y no tiene interes.
  if (PREFIJO !== "/") {
    const canonica = (html.match(/rel="canonical"\s+href="([^"]+)"/) || [])[1];
    if (canonica) {
      const esperada = PREFIJO + relativo.replace(/index\.html$/, "").replace(/\\/g, "/");
      if (new URL(canonica).pathname !== esperada) {
        avisos.push(
          `${relativo}: la direccion canonica apunta a «${new URL(canonica).pathname}» ` +
            `cuando el sitio se publica en «${esperada}». ` +
            "Revisa el campo «url» de src/_datos/sitio.json.",
        );
      }
    }
  }

  // Identificadores disponibles para las anclas.
  const identificadores = new Set(atributos(html, "id"));

  for (const destino of [...atributos(html, "href"), ...atributos(html, "src")]) {
    if (!destino.trim()) {
      enPagina("hay un enlace o recurso con destino vacio");
      continue;
    }
    if (destino === "#") {
      enPagina("hay un enlace decorativo con href=\"#\"");
      continue;
    }
    if (/^(https?:|mailto:|tel:|data:)/i.test(destino)) continue;

    if (destino.startsWith("#")) {
      if (!identificadores.has(destino.slice(1))) {
        enPagina(`el ancla ${destino} no existe en la pagina`);
      }
      continue;
    }

    if (!destino.startsWith("/")) {
      avisos.push(`${relativo}: ruta relativa sin resolver «${destino}»`);
      continue;
    }

    const esperado = rutaDeDestino(destino);
    if (!esperado) {
      enPagina(`el enlace «${destino}» no lleva el prefijo «${PREFIJO}»`);
      continue;
    }
    if (!existsSync(esperado)) {
      enPagina(`el enlace «${destino}» no corresponde a ningun archivo publicado`);
      continue;
    }

    // Anclas hacia otra pagina.
    const ancla = destino.split("#")[1];
    if (ancla) {
      const otra = await readFile(esperado, "utf8");
      if (!new Set(atributos(otra, "id")).has(ancla)) {
        enPagina(`el ancla «#${ancla}» no existe en ${destino}`);
      }
    }
  }
}

const paginas = (await archivosHtml(SITIO)).length;
console.log(`Comprobadas ${paginas} paginas con prefijo «${PREFIJO}».`);

for (const aviso of avisos) console.log(`  aviso   ${aviso}`);

if (problemas.length) {
  console.error(`\n${problemas.length} problema(s):`);
  for (const problema of problemas) console.error(`  error   ${problema}`);
  process.exit(1);
}

console.log("Sin enlaces rotos ni recursos ausentes.");
