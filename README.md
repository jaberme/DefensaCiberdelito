# Web del Seminario Permanente «Seguridad Nacional, Sociedad Digital y Ciberdelito»

Sitio institucional del Seminario Permanente, iniciativa altruista y multidisciplinar
impulsada desde la Universidad de Almería. Reúne la identidad del Seminario, su manifiesto
fundacional, el espacio de las Jornadas de Ciberseguridad, Ciberdefensa y Seguridad Nacional,
las actividades y proyectos, la actualidad y las vías de participación.

El sitio está pensado como una plataforma viva: añadir una noticia o abrir una nueva edición de
las Jornadas consiste en crear un archivo de texto, sin tocar plantillas ni programación.

---

## Índice

1. [Arquitectura tecnológica](#arquitectura-tecnológica)
2. [Estructura de archivos](#estructura-de-archivos)
3. [Trabajar en local](#trabajar-en-local)
4. [Modificar contenidos](#modificar-contenidos)
5. [Publicar una noticia](#publicar-una-noticia)
6. [Crear una actividad o proyecto](#crear-una-actividad-o-proyecto)
7. [Abrir una nueva edición de las Jornadas](#abrir-una-nueva-edición-de-las-jornadas)
8. [Crear una página nueva](#crear-una-página-nueva)
9. [Publicación en GitHub Pages](#publicación-en-github-pages)
10. [Dominio propio](#dominio-propio)
11. [Información pendiente de confirmar](#información-pendiente-de-confirmar)
12. [Accesibilidad, rendimiento y datos personales](#accesibilidad-rendimiento-y-datos-personales)
13. [Condiciones de uso](#condiciones-de-uso)

---

## Arquitectura tecnológica

**Eleventy (11ty) 3**, generador de sitios estáticos en Node.js. Una sola dependencia de
desarrollo y ninguna en producción: lo que se publica es HTML, CSS y una función de JavaScript
de veinte líneas para el menú de móvil.

Por qué esta elección:

| Requisito | Cómo se resuelve |
|---|---|
| Simplicidad técnica | Un generador, cero framework de CSS, cero librerías de JavaScript. |
| Separación de contenido y presentación | Los textos viven en Markdown y JSON; las plantillas, aparte. |
| Mantenimiento sin programar | Añadir contenido es crear un archivo de texto, también desde la web de GitHub. |
| Compatibilidad con GitHub Pages | Se publica mediante GitHub Actions, sin servidores ni bases de datos. |
| Rendimiento | Páginas estáticas, tipografías autoalojadas e imágenes optimizadas. |
| Seguridad | Sin backend, sin formularios, sin dependencias de terceros en tiempo de ejecución. |
| Escalabilidad | Nuevas noticias, actividades y ediciones sin rehacer el sitio. |

Se descartó Jekyll, pese a ser el generador nativo de GitHub Pages, porque obliga a un entorno
Ruby para trabajar en local; y se descartó el HTML escrito a mano porque añadir una noticia
exigiría editar varias páginas.

## Estructura de archivos

```
.
├── .github/workflows/publicar.yml   Despliegue automático en GitHub Pages
├── docs/                            Guías de mantenimiento
├── herramientas/                    Utilidades de comprobación y de imágenes
├── plantillas/                      Modelos para copiar al crear contenido
├── recursos-originales/             Emblema original tal y como se entregó
├── src/                             Todo el sitio
│   ├── _datos/                      Datos globales en JSON
│   │   ├── sitio.json               Nombre, descripción, dirección y contacto
│   │   ├── navegacion.json          Menú principal y enlaces del pie
│   │   ├── entidades.json           Entidades citadas en el manifiesto
│   │   ├── miembros.json            Ámbitos de procedencia y relación de miembros
│   │   ├── ejes.json                Ejes de trabajo de la portada
│   │   └── estados.json             Etiquetas de estado de actividades y ediciones
│   ├── _includes/                   Plantillas
│   ├── assets/                      Estilos, script, tipografías e imágenes
│   ├── contenido/
│   │   ├── noticias/                Una noticia = un archivo .md
│   │   ├── actividades/             Una actividad = un archivo .md
│   │   └── jornadas/                Una edición = un archivo .md
│   └── *.njk, *.md                  Páginas fijas
├── eleventy.config.js               Configuración del generador
└── package.json
```

El resultado de la compilación se genera en `_sitio/`, que no se versiona: lo construye
GitHub Actions en cada publicación.

## Trabajar en local

Requisitos: **Node.js 20 o superior**. No hace falta nada más.

```bash
npm install                # solo la primera vez
npm run inicio             # servidor local en http://localhost:8080
```

El servidor recarga la página al guardar cualquier archivo.

Otros comandos:

```bash
npm run construir          # compila en _sitio/
npm run construir:pages    # compila con el prefijo de la URL de proyecto
npm run comprobar          # revisa enlaces, recursos, encabezados y textos alternativos
npm run verificar          # compila y comprueba de una vez
```

`npm run comprobar` es la red de seguridad: detecta enlaces rotos, imágenes que faltan, anclas
inexistentes, páginas sin idioma declarado, imágenes sin texto alternativo y páginas con más de
un encabezado de primer nivel. El despliegue lo ejecuta también y se detiene si algo falla.

## Modificar contenidos

Los textos que no pertenecen a una noticia ni a una actividad están en dos sitios:

- **Datos sueltos** (nombre del sitio, menú, entidades, miembros, ejes): archivos JSON de
  `src/_datos/`. Se editan con cualquier editor de texto o desde la propia web de GitHub.
- **Páginas completas** (`El Seminario`, `Manifiesto`, `Aviso legal`…): archivos `.md` en
  `src/`, escritos en Markdown.

Dos campos merecen atención especial en `src/_datos/sitio.json`:

- `url`: la dirección donde se publica el sitio. Hay que actualizarla si cambia el nombre del
  repositorio o se pasa a un dominio propio.
- `contacto.correo`: mientras valga `null`, la web muestra el marcador
  `[CORREO DE CONTACTO INSTITUCIONAL]`. En cuanto se escriba una dirección, la página de
  contacto pasa sola a mostrar un enlace de correo operativo.

## Publicar una noticia

1. Copia `plantillas/noticia.md` a `src/contenido/noticias/`.
2. Renombra el archivo: el nombre será la dirección de la noticia. Usa minúsculas, sin acentos
   y con guiones, por ejemplo `jornada-de-divulgacion-en-institutos.md`.
3. Rellena `titulo`, `entrada`, `descripcion` y `date` (en formato `AAAA-MM-DD`).
4. Escribe el cuerpo en Markdown.

La noticia aparece sola en la portada, en `Actualidad`, en el mapa del sitio y en el canal Atom.

## Crear una actividad o proyecto

1. Copia `plantillas/actividad.md` a `src/contenido/actividades/`.
2. Elige el campo `estado`: `realizada`, `programada` o `propuesta`. Determina en qué grupo se
   muestra y con qué marcador. **Usa `propuesta` mientras la actividad no esté confirmada**: la
   web deja claro que es una iniciativa en estudio y no un compromiso adquirido.

## Abrir una nueva edición de las Jornadas

1. Copia `plantillas/edicion-jornadas.md` a `src/contenido/jornadas/`.
2. Nombra el archivo con el año, por ejemplo `2027.md`. La dirección será `/jornadas/2027/`.
3. Rellena el bloque `edicion`. El campo `orden` solo sirve para colocar la edición en la lista:
   la de valor más alto aparece primero.
4. Deja `programa`, `participantes` y `materiales` como listas vacías (`[]`) hasta que estén
   cerrados. La página muestra entonces un aviso en lugar de datos provisionales.

No hay que tocar nada más: el índice de ediciones, el archivo histórico, la portada y el mapa
del sitio se actualizan solos. Las ediciones anteriores se quedan donde están, accesibles por su
dirección.

## Crear una página nueva

1. Copia `plantillas/pagina.md` a `src/` con el nombre que quieras.
2. Fija su dirección en el campo `permalink`, por ejemplo `/publicaciones/`.
3. Si debe aparecer en el menú principal, añádela a `src/_datos/navegacion.json`.

## Publicación en GitHub Pages

El despliegue es automático: cada cambio incorporado a la rama `main` compila el sitio,
comprueba que no haya enlaces rotos y lo publica.

Para activarlo la primera vez, en el repositorio de GitHub:

1. **Settings → Pages**.
2. En **Source**, elige **GitHub Actions** (no «Deploy from a branch»).
3. Incorpora cualquier cambio a `main`, o lanza el flujo a mano desde **Actions → Publicar en
   GitHub Pages → Run workflow**.
4. En **Actions**, comprueba que el flujo termina en verde. La dirección publicada aparece en el
   propio resumen del despliegue.

El procedimiento detallado, incluida la verificación posterior, está en
[`docs/publicacion-github-pages.md`](docs/publicacion-github-pages.md).

El flujo de trabajo usa los permisos mínimos (`contents: read`, `pages: write`,
`id-token: write`) y el token efímero de GitHub Actions. **No hay ni debe haber credenciales,
tokens personales ni datos sensibles en el repositorio.**

## Dominio propio

Si la Universidad de Almería autoriza y configura un dominio institucional:

1. Crea el archivo `src/CNAME` con el dominio como única línea, sin protocolo ni barra final:
   `seminarioseguridad.ual.es`.
2. Añade `CNAME` a la copia directa de recursos en `eleventy.config.js`, junto a `.nojekyll`.
3. Actualiza `url` en `src/_datos/sitio.json` con la dirección completa, por ejemplo
   `https://seminarioseguridad.ual.es` (sin barra final).
4. Pide al servicio informático el registro DNS correspondiente hacia GitHub Pages.
5. En **Settings → Pages → Custom domain**, escribe el dominio y activa **Enforce HTTPS**.

El flujo de despliegue detecta el archivo `CNAME` y compila el sitio en la raíz en lugar de en
un subdirectorio, sin necesidad de tocar ningún enlace.

## Información pendiente de confirmar

Los datos que todavía no están cerrados se escriben entre corchetes y en mayúsculas, por
ejemplo `[FECHAS DE LAS JORNADAS]`. La web los resalta automáticamente como anotación
provisional, en cualquier página y sin marcado especial, para que nadie los dé por supuestos.

Para ver de un vistazo qué queda por confirmar y dónde:

```bash
npm run pendientes
```

La relación actual está en [`docs/datos-pendientes.md`](docs/datos-pendientes.md).

## Accesibilidad, rendimiento y datos personales

- El sitio se ha desarrollado tomando como referencia las **WCAG 2.2, nivel AA**. Los detalles
  están en la [declaración de accesibilidad](src/accesibilidad.md) y en
  [`docs/plan-mantenimiento.md`](docs/plan-mantenimiento.md).
- Las tipografías **Source Serif 4** y **Source Sans 3** se sirven desde el propio sitio. No hay
  ninguna petición a servidores de terceros, de modo que la navegación no transmite la dirección
  IP de las personas visitantes fuera del alojamiento.
- **No hay analítica ni herramientas de seguimiento.** Si en algún momento se considera
  incorporarlas, debe valorarse antes su repercusión en protección de datos.
- **No hay formularios.** GitHub Pages no puede procesarlos. Cuando haga falta recoger datos
  —por ejemplo, una inscripción—, debe usarse un servicio institucional de la Universidad de
  Almería, y la web se limitará a enlazarlo.
- Las dependencias se revisan al menos una vez al año, o antes si GitHub avisa de una
  vulnerabilidad: `npm outdated` y `npm audit`.

## Condiciones de uso

Este repositorio **no incluye licencia** de forma deliberada. La decisión sobre en qué
condiciones se distribuyen el código y los contenidos corresponde al Seminario y a la
Universidad de Almería, y debe tomarse expresamente antes de añadir un archivo de licencia.

Con independencia de esa decisión:

- El **emblema del Seminario** y los escudos, logotipos y marcas de las instituciones,
  organismos y empresas mencionados **pertenecen a sus titulares** y no se distribuyen bajo
  ninguna licencia abierta.
- Las **tipografías** incluidas en `src/assets/tipografias/` se distribuyen bajo la SIL Open
  Font License 1.1, cuyo aviso acompaña a los archivos.
