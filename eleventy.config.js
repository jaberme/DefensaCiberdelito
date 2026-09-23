import { HtmlBasePlugin } from "@11ty/eleventy";

/**
 * Configuracion de Eleventy.
 *
 * Idea general: las plantillas escriben siempre rutas absolutas desde la raiz
 * ("/jornadas/"). HtmlBasePlugin las reescribe en la compilacion anadiendo el
 * prefijo que corresponda, de modo que el mismo codigo funciona en
 * https://usuario.github.io/DefensaCiberdelito/ y en un dominio propio sin
 * tocar ni un enlace.
 */
export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addWatchTarget("src/assets/css/");

  // --- Fechas -------------------------------------------------------------
  const zona = "Europe/Madrid";

  const aFecha = (valor) => (valor instanceof Date ? valor : new Date(valor));

  eleventyConfig.addFilter("fechaLarga", (valor) =>
    new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: zona,
    }).format(aFecha(valor)),
  );

  eleventyConfig.addFilter("fechaCorta", (valor) =>
    new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: zona,
    }).format(aFecha(valor)),
  );

  // Formato AAAA-MM-DD en la zona horaria del sitio, no en UTC: de lo
  // contrario una publicacion de madrugada aparece con la fecha del dia
  // anterior.
  eleventyConfig.addFilter("fechaISO", (valor) =>
    new Intl.DateTimeFormat("sv-SE", { timeZone: zona }).format(aFecha(valor)),
  );

  eleventyConfig.addFilter("anio", (valor) => aFecha(valor).getUTCFullYear());

  // --- Utilidades de coleccion -------------------------------------------
  eleventyConfig.addFilter("limitar", (lista, n) => (lista || []).slice(0, n));

  eleventyConfig.addFilter("porEstado", (lista, estado) =>
    (lista || []).filter((item) => item.data.estado === estado),
  );

  // Filtra una lista de objetos por el valor de una de sus claves.
  eleventyConfig.addFilter("filtrarPor", (lista, clave, valor) =>
    (lista || []).filter((item) => item[clave] === valor),
  );

  eleventyConfig.addFilter("recientesPrimero", (lista) =>
    [...(lista || [])].sort((a, b) => b.date - a.date),
  );

  eleventyConfig.addFilter("absoluta", function (ruta, base) {
    return new URL(ruta, base).href;
  });

  // Convierte un texto en identificador apto para un ancla.
  const aIdentificador = (texto) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  eleventyConfig.addFilter("identificador", aIdentificador);

  // --- Marcado de la informacion pendiente de confirmacion ----------------
  /**
   * Cualquier texto escrito entre corchetes y en mayusculas —por ejemplo
   * [FECHA DE LAS JORNADAS]— se resalta en el HTML final como anotacion
   * provisional. Asi el dato sin confirmar se distingue a simple vista del
   * contenido ya acreditado, en cualquier pagina y sin marcado especial.
   */
  const MARCADOR = /\[([A-ZÁÉÍÓÚÑÜ][^\]<>\n]{2,70})\]/g;

  eleventyConfig.addTransform("marcadores", function (contenido) {
    if (!(this.page.outputPath || "").endsWith(".html")) return contenido;

    // Se aparta el contenido de script y style para no tocarlo.
    const apartados = [];
    const limpio = contenido.replace(
      /<(script|style)\b[\s\S]*?<\/\1>/gi,
      (trozo) => `\u0000${apartados.push(trozo) - 1}\u0000`,
    );

    const marcado = limpio.replace(/>([^<]+)</g, (todo, texto) => {
      if (!texto.includes("[")) return todo;
      return ">" + texto.replace(MARCADOR, '<span class="pendiente">[$1]</span>') + "<";
    });

    return marcado.replace(/\u0000(\d+)\u0000/g, (_, i) => apartados[Number(i)]);
  });

  // --- Colecciones --------------------------------------------------------
  eleventyConfig.addCollection("noticias", (api) =>
    api.getFilteredByGlob("src/contenido/noticias/*.md").reverse(),
  );

  eleventyConfig.addCollection("actividades", (api) =>
    api.getFilteredByGlob("src/contenido/actividades/*.md").reverse(),
  );

  // Las ediciones de las Jornadas se ordenan por el campo «orden» de su ficha,
  // que es numerico. El campo «anio» se reserva para mostrarlo en pantalla y
  // admite un marcador de texto mientras la fecha no este confirmada.
  eleventyConfig.addCollection("jornadas", (api) =>
    api
      .getFilteredByGlob("src/contenido/jornadas/*.md")
      .sort((a, b) => (b.data.edicion?.orden ?? 0) - (a.data.edicion?.orden ?? 0)),
  );

  // --- Markdown: identificadores automaticos en los encabezados -----------
  eleventyConfig.amendLibrary("md", (md) => {
    const porDefecto =
      md.renderer.rules.heading_open ||
      ((tokens, i, opciones, _env, self) => self.renderToken(tokens, i, opciones));

    md.renderer.rules.heading_open = (tokens, i, opciones, env, self) => {
      const contenido = tokens[i + 1];
      if (contenido && contenido.type === "inline") {
        const id = aIdentificador(contenido.content);
        if (id) tokens[i].attrSet("id", id);
      }
      return porDefecto(tokens, i, opciones, env, self);
    };
  });

  return {
    dir: {
      input: "src",
      output: "_sitio",
      includes: "_includes",
      data: "_datos",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
