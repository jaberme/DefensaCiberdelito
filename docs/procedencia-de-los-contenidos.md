# Procedencia de los contenidos

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
| `src/contenido/jornadas/proxima-edicion.md` | Ficha de la próxima edición, con todos los datos concretos marcados como pendientes | Rellenar cuando se cierren; renombrar el archivo con el año, por ejemplo `2027.md` |

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
