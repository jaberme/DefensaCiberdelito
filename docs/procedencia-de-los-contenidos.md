# Procedencia de los contenidos

## La función de seguridad y la estrategia de negocio (16 de noviembre de 2026)

La contribución del Observatorio
`src/contenido/observatorio/funcion-seguridad-estrategia-negocio.md` reproduce
el texto íntegro del artículo de Francisco Torrecillas Gilabert,
publicado originalmente en LinkedIn el 16 de febrero de 2025. Se conserva su redacción
y se añaden encabezados, negritas y listas. La atribución incluye su cargo de Networking
& Communications Manager en Cosentino Group - Grupo Cosentino y su pertenencia al
Seminario Permanente.

El esquema de los planes estratégicos, tácticos y operativos es la imagen `tclla.jpeg`,
copiada sin modificaciones. Las dos fotografías ilustrativas
son escenas ficticias generadas con IA y se identifican como tales en sus pies de imagen.

Este documento deja constancia de qué textos del sitio son documentos originales del Seminario,
cuáles se han redactado para la web y qué queda pendiente de verificar. Conviene revisarlo antes
de dar difusión pública al sitio.

## Manifiesto fundacional

La página `/manifiesto/` reproduce **de forma literal** el texto del manifiesto de las Jornadas
de Ciberseguridad, Ciberdefensa y Seguridad Nacional, con sus siete apartados, desde el párrafo
de entrada hasta «Perspectivas y continuidad».

> **Pendiente de verificación.** El texto se ha recuperado de una versión anterior de la web del
> Seminario. Antes de la difusión pública conviene cotejarlo con el documento oficial y
> confirmar que es la redacción vigente. El archivo es `src/manifiesto.md`.

## Entidades mencionadas

Las entidades que figuran en `src/_datos/entidades.json` son **exactamente** las que el
manifiesto cita: Universidad de Almería, Comisaría Provincial de Policía Nacional en Almería,
Guardia Civil, Diputación Provincial de Almería, Cosentino y Europol.

No se les atribuye ninguna condición formal —patrocinio, convenio, organización— que el
manifiesto no exprese. La web lo advierte expresamente en la página de miembros, en el pie y en
el aviso legal.

## Textos redactados para la web

Las páginas «El Seminario», «Miembros y colaboración institucional», «Jornadas»,
«Actividades y proyectos», «Contacto y participación», la portada y los textos de apoyo
interpretan los principios del manifiesto y los adaptan a cada sección. No introducen hechos
nuevos: no citan fechas, nombres, cargos, acuerdos ni compromisos que no estén en el texto
fundacional.

Se ha cuidado de forma deliberada la distinción entre **voluntad** y **resultado**. Por ejemplo,
sobre la proyección de Almería, la web dice que contribuir a esa consolidación es una aspiración
declarada del Seminario, no una posición ya alcanzada.

## Contenido de ejemplo que conviene revisar

| Archivo | Qué es | Qué hacer |
|---|---|---|
| `src/contenido/noticias/puesta-en-marcha-de-la-web.md` | Noticia sobre la apertura de la web, fechada el 20 de septiembre de 2026 | Ajustar la fecha a la de publicación real, o eliminarla si se prefiere estrenar sin noticias |
| `src/contenido/jornadas/2027.md` | Ficha de las III Jornadas, con el cuerpo del texto todavía sin redactar y las listas de programa, participantes y materiales vacías | Redactar la presentación y los apartados; rellenar programa y participantes cuando la organización los cierre |

La sección «Actividades y proyectos» se entrega **vacía a propósito**: no se ha inventado
ninguna actividad. Muestra un texto que explica qué contendrá y remite a las Jornadas.

## Emblema

`recursos-originales/logoSeminario.jpeg` es el archivo entregado. Las versiones de la web se
generan a partir de él con `herramientas/generar-imagenes.py`: se recorta el símbolo circular
—descartando el rótulo incrustado, que la web compone con tipografía real— y se sustituye el
fondo blanco por transparencia.

Conviene solicitar una **versión vectorial** del emblema para mejorar su calidad en impresión y
en pantallas de alta densidad.

## Recursos gráficos que faltan

| Recurso | Dónde iría | Condición |
|---|---|---|
| Emblema en `.svg` | `src/assets/img/emblema.svg` | Sustituiría a las versiones en mapa de bits |
| Logotipo de la Universidad de Almería | `src/assets/img/entidades/universidad-de-almeria.svg` | Solo con autorización expresa de uso |
| Logotipos de las demás entidades citadas | `src/assets/img/entidades/` | Solo con autorización expresa de cada titular |
| Fotografías de ediciones anteriores | `src/assets/img/` | Con los derechos de imagen resueltos |

Mientras no existan, la web funciona correctamente: las entidades se muestran con su
denominación en texto, que es el tratamiento adecuado cuando no hay autorización.

## Reportaje de Canal Sur sobre la agroindustria (2 de noviembre de 2026)

La noticia `src/contenido/noticias/canal-sur-ciberseguridad-agroindustria.md` recoge la
intervención de José Antonio Álvarez Bermejo a petición del participante. La fuente es la
[publicación de Canal Sur](https://www.canalsur.es/noticias/andalucia/almeria/ocho-diez-empresas-agroindustria-almeriense_1_1449129.html).
El vídeo de 79 segundos procede de la emisión HLS enlazada en los metadatos públicos de esa
página; se ha convertido a MP4 a 720p para reducir su peso, conservando el metraje y el audio
completos. El vídeo y su imagen de
portada conservan la atribución a Canal Sur y un enlace a la publicación original.

La ampliación de contexto enlaza las informaciones de Agra/AFP, Euronews, WDR/Tagesschau y
la alerta oficial CERTFR-2026-ALE-012, consultadas el 2 de noviembre de 2026. Se utiliza la
fecha contrastada del incidente francés (noche del 11 al 12 de octubre), y se distingue el
incidente belga (noche del 1 al 2 de noviembre) del riesgo señalado en Alemania, donde las
fuentes consultadas no confirman un ataque equivalente esa noche. Los datos del Seminario y
de las III Jornadas proceden de sus páginas en este sitio.

## Entrevista de La Voz de Almería (11 de noviembre de 2026)

La noticia `src/contenido/noticias/la-voz-riesgos-digitales-empresas.md` es una redacción propia
basada en la entrevista de Alberto Godoy a José Antonio Álvarez Bermejo publicada por La Voz de
Almería el 11 de noviembre de 2026 y actualizada el día 12. Resume sus principales asuntos sin
reproducir el texto del periódico: exposición de los dispositivos conectados, riesgos para la
agroindustria y la cadena de suministro, fraude mediante correo corporativo, daño reputacional y
medidas de prevención.

El PDF facilitado para la publicación se conserva en
`src/assets/documentos/la-voz-de-almeria-empresas-ciberataques.pdf` y se ofrece desde la noticia
con la autoría, el medio y las fechas indicados. La información sobre las III Jornadas se ha
contrastado con su ficha en este sitio.

## Información de La Voz de Almería sobre menores y redes (18 de noviembre de 2026)

La noticia `src/contenido/noticias/menores-redes-depredadores-la-voz.md` es una redacción propia
basada en la información de Víctor Navarro publicada en la página 10 de La Voz de Almería el 18
de noviembre de 2026. Resume el análisis de José Antonio Álvarez Bermejo sobre el desplazamiento
de menores desde redes sociales y videojuegos hacia canales con menor supervisión, así como los
riesgos de captación, manipulación y extorsión.

La pertenencia de Álvarez Bermejo al Seminario, su perfil profesional, su experiencia de trabajo
con policías de toda Europa y la propuesta de desarrollar en el Seminario un centro de asistencia
rápida e institucional han sido facilitados por el propio participante para esta publicación; no
se presentan como declaraciones de La Voz de Almería. El PDF aportado se conserva en
`src/assets/documentos/2026-11-18-la-voz-de-almeria-menores-redes-depredadores.pdf` y se enlaza
desde la noticia con la fecha, el medio, la página y la autoría indicados.
