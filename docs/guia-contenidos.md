# Guía de contenidos

Cómo mantener la web sin tocar plantillas ni programación. Todo lo que hay aquí se puede hacer
desde la web de GitHub, sin instalar nada: entra en el archivo, pulsa el lápiz, edita y confirma
el cambio. El sitio se vuelve a publicar solo.

## Dónde está cada cosa

| Lo que quieres cambiar | Archivo |
|---|---|
| Nombre, descripción, dirección del sitio, correo de contacto | `src/_datos/sitio.json` |
| Menú principal y enlaces del pie | `src/_datos/navegacion.json` |
| Entidades citadas en el manifiesto | `src/_datos/entidades.json` |
| Ámbitos de procedencia y relación de miembros | `src/_datos/miembros.json` |
| Ejes de trabajo de la portada | `src/_datos/ejes.json` |
| Etiquetas de estado de actividades y ediciones | `src/_datos/estados.json` |
| Texto de la portada | `src/index.njk` |
| Página «El Seminario» | `src/seminario.md` |
| Manifiesto | `src/manifiesto.md` |
| Aviso legal | `src/aviso-legal.md` |
| Declaración de accesibilidad | `src/accesibilidad.md` |
| Noticias | `src/contenido/noticias/` |
| Actividades y proyectos | `src/contenido/actividades/` |
| Ediciones de las Jornadas | `src/contenido/jornadas/` |

## Escribir en Markdown

Los archivos de contenido tienen dos partes. Arriba, entre dos líneas de tres guiones, van los
datos de la página. Debajo, el texto:

```markdown
---
titulo: Título de la noticia
entrada: Resumen de una o dos frases.
date: 2026-10-15
---

Primer párrafo.

## Un apartado

Texto con **negrita**, *cursiva* y [un enlace](/jornadas/).
```

Reglas prácticas:

- Los enlaces internos empiezan por `/` y terminan por `/`: `/manifiesto/`, no
  `manifiesto.html`. Así funcionan igual en local, en GitHub Pages y con un dominio propio.
- Las fechas se escriben `AAAA-MM-DD`.
- Si un valor lleva dos puntos, comillas o corchetes, ponlo entre comillas: `titulo: "Fraude: el
  eslabón débil"`.
- Los encabezados del texto empiezan en `##`. El `#` corresponde al título de la página, que ya
  se genera a partir del campo `titulo`.

## Señalar un dato que todavía no está confirmado

Escríbelo entre corchetes y en mayúsculas:

```markdown
Las jornadas se celebrarán en [SEDE DE LAS JORNADAS] los días [FECHAS DE LAS JORNADAS].
```

La web lo resalta como anotación provisional. Es el mecanismo del proyecto para no presentar
como cerrado lo que no lo está, y funciona en cualquier página sin marcado especial.

Para ver todo lo que queda pendiente: `npm run pendientes`, o consulta
[`datos-pendientes.md`](datos-pendientes.md).

## Publicar la relación de miembros

En `src/_datos/miembros.json`, el array `listado` está vacío y la web muestra un aviso. Para
publicar la relación, añade una entrada por persona:

```json
"listado": [
  {
    "nombre": "Nombre y apellidos",
    "cargo": "Cargo o función",
    "entidad": "Entidad de procedencia",
    "ambito": "Universidad"
  }
]
```

El campo `ambito` debe coincidir exactamente con uno de los que figuran en `procedencias`. En
cuanto el array deje de estar vacío, el aviso desaparece y la web muestra la relación agrupada
por ámbito.

**Antes de publicar un nombre, asegúrate de contar con la conformidad de esa persona.**

## Incorporar el logotipo de una entidad

1. **Obtén la autorización expresa** de la entidad titular. Sin ella, no se publica el logotipo:
   la web muestra únicamente la denominación en texto, que es el tratamiento correcto.
2. Pide el archivo en formato vectorial (`.svg`), o en `.png` con fondo transparente y al menos
   600 píxeles de ancho.
3. Guárdalo en `src/assets/img/entidades/` con un nombre en minúsculas, sin acentos y con
   guiones: `universidad-de-almeria.svg`.
4. En `src/_datos/entidades.json`, escribe esa ruta en el campo `logotipo` de la entidad:
   `"logotipo": "entidades/universidad-de-almeria.svg"`.

Mientras el campo valga `null`, no se muestra ninguna imagen.

## Añadir documentos y fotografías

- **Documentos** (programas, actas, presentaciones): en `src/assets/documentos/`. Se enlazan con
  `/assets/documentos/nombre-del-archivo.pdf`.
- **Fotografías**: en `src/assets/img/`. Antes de subirlas, redúcelas a un máximo de 1.600
  píxeles de ancho y guárdalas con una compresión razonable. Una fotografía de 4 MB hace lenta
  la web sin mejorar nada.
- **Toda imagen informativa necesita texto alternativo.** En Markdown:
  `![Descripción de lo que se ve](/assets/img/foto.jpg)`. Si la imagen es puramente decorativa,
  deja el texto alternativo vacío: `![](/assets/img/adorno.jpg)`.

## Comprobar antes de publicar

Si trabajas en local:

```bash
npm run verificar
```

Compila el sitio y revisa enlaces, recursos, anclas, textos alternativos y encabezados. Si
trabajas desde la web de GitHub, esa misma comprobación se ejecuta en el despliegue: si falla,
no se publica nada y el error indica la página y el enlace concreto.

## El emblema

El emblema original está en `recursos-originales/logoSeminario.jpeg`. Las versiones que usa la
web —recortadas, con fondo transparente y en varios tamaños— se generan con:

```bash
python3 herramientas/generar-imagenes.py
```

Solo hay que volver a ejecutarlo si cambia el emblema de partida.

**Conviene pedir una versión vectorial del emblema** (`.svg`, o el archivo original de diseño).
La actual procede de una imagen en mapa de bits, lo que limita su calidad en impresión y en
pantallas de alta densidad.
