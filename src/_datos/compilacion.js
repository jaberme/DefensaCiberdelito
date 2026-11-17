/* Datos del momento de compilacion. Se usa para fechar la ultima
   actualizacion del sitio y para versionar CSS y JavaScript. El instante se
   calcula una sola vez al cargar el modulo, de modo que todas las paginas de
   una misma compilacion apuntan exactamente a los mismos recursos. */
const momentoCompilacion = new Date();

export default function () {
  return {
    fecha: momentoCompilacion.toISOString(),
    version: momentoCompilacion.getTime(),
  };
}
