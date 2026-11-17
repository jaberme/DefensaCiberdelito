---
titulo: Título del artículo, manual o recurso
entrada: Una o dos frases que expliquen qué aporta esta contribución a la comunidad.
descripcion: Resumen de una frase para buscadores y redes sociales.
date: 2026-01-31
tipo: Artículo
autor:
  nombre: Nombre y apellidos
  vinculacion: miembro
  perfil: Cargo o especialidad profesional y entidad, si procede.
imagen: /assets/img/observatorio/nombre-de-la-imagen.jpg
---

Primer párrafo: presenta el tema, su utilidad y a quién va dirigido.

## Un subtítulo cuando el texto lo pida

El resto del contenido se escribe en Markdown: **negrita**, *cursiva*,
[enlaces internos](/seminario/) y enlaces externos con su dirección completa.

Para añadir una imagen con pie y texto alternativo:

<figure>
  <img src="/assets/img/observatorio/nombre-de-la-imagen.jpg" alt="Descripción precisa de lo que muestra la imagen" width="1600" height="900" loading="lazy" decoding="async">
  <figcaption>Explicación, autoría o procedencia de la imagen.</figcaption>
</figure>

El campo `autor.vinculacion` solo admite `miembro` o `colaborador`. La compilación se detiene si
falta el nombre del autor o se utiliza otra vinculación.
