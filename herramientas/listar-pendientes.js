#!/usr/bin/env node
/**
 * Relacion de la informacion pendiente de confirmar.
 *
 * Recorre los archivos de contenido y datos buscando marcadores escritos
 * entre corchetes y en mayusculas, que es la convencion del proyecto para
 * senalar un dato que todavia no esta cerrado. Imprime donde esta cada uno.
 *
 * Uso:  npm run pendientes
 *       npm run pendientes -- --markdown   (para volcarlo en docs/)
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIRECTORIOS = ["src"];
const EXTENSIONES = new Set([".md", ".njk", ".json", ".html"]);
const OMITIR = new Set(["assets", "node_modules", "_sitio"]);
const MARCADOR = /\[([A-ZÁÉÍÓÚÑÜ][A-ZÁÉÍÓÚÑÜ0-9 ,.'’/-]{2,70})\]/g;

async function recorrer(directorio) {
  const salida = [];
  for (const entrada of await readdir(directorio, { withFileTypes: true })) {
    if (OMITIR.has(entrada.name)) continue;
    const completo = path.join(directorio, entrada.name);
    if (entrada.isDirectory()) salida.push(...(await recorrer(completo)));
    else if (EXTENSIONES.has(path.extname(entrada.name))) salida.push(completo);
  }
  return salida;
}

const hallazgos = new Map();

for (const base of DIRECTORIOS) {
  for (const archivo of await recorrer(path.join(RAIZ, base))) {
    const relativo = path.relative(RAIZ, archivo);
    const lineas = (await readFile(archivo, "utf8")).split("\n");
    lineas.forEach((linea, indice) => {
      for (const coincidencia of linea.matchAll(MARCADOR)) {
        const clave = `[${coincidencia[1]}]`;
        if (!hallazgos.has(clave)) hallazgos.set(clave, []);
        hallazgos.get(clave).push(`${relativo}:${indice + 1}`);
      }
    });
  }
}

const ordenados = [...hallazgos.entries()].sort((a, b) => a[0].localeCompare(b[0], "es"));
const enMarkdown = process.argv.includes("--markdown");

if (enMarkdown) {
  const hoy = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid" }).format(new Date());
  console.log("# Información pendiente de confirmar\n");
  console.log(
    "Relación generada automáticamente con `npm run pendientes -- --markdown`.\n" +
      `Última generación: ${hoy}.\n`,
  );
  console.log(
    "Cada entrada es un dato que la web muestra resaltado como provisional. Para\n" +
      "cerrarlo, sustituye el marcador por el valor real en los archivos indicados.\n",
  );
  if (!ordenados.length) {
    console.log("No queda ningún dato pendiente.");
  } else {
    console.log("| Dato pendiente | Dónde se escribe |");
    console.log("|---|---|");
    for (const [clave, sitios] of ordenados) {
      console.log(`| \`${clave}\` | ${[...new Set(sitios)].map((s) => `\`${s}\``).join("<br>")} |`);
    }
  }
} else {
  if (!ordenados.length) {
    console.log("No queda ningún dato pendiente de confirmar.");
  } else {
    console.log(`${ordenados.length} dato(s) pendientes de confirmar:\n`);
    for (const [clave, sitios] of ordenados) {
      console.log(`  ${clave}`);
      for (const sitio of [...new Set(sitios)]) console.log(`      ${sitio}`);
    }
  }
}
