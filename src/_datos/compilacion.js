/* Datos del momento de compilacion. Se usa para fechar la ultima
   actualizacion del sitio en el pie y en el sitemap. */
export default function () {
  return { fecha: new Date().toISOString() };
}
