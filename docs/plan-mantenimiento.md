# Plan de mantenimiento

Pensado para un equipo universitario pequeño, sin dedicación exclusiva y sin conocimientos
avanzados de programación.

## Reparto de responsabilidades

Con dos personas basta. Conviene que sean dos y no una, para que la web no dependa de una sola
agenda.

| Función | Qué hace | Dedicación estimada |
|---|---|---|
| **Redacción** | Escribe y publica noticias y actividades; mantiene al día los datos de las Jornadas | 1–2 horas al mes en periodo normal |
| **Coordinación técnica** | Revisa las dependencias, atiende los avisos de GitHub y resuelve incidencias | 1 hora al trimestre |

Ninguna de las dos funciones exige saber programar. La primera consiste en escribir texto; la
segunda, en ejecutar dos órdenes y leer lo que dicen.

## Ritmo de trabajo

### Cuando hay algo que contar

Publicar una noticia. Es la operación más frecuente y la más sencilla: copiar
`plantillas/noticia.md`, renombrarlo, rellenarlo y confirmarlo. La web se actualiza sola en uno
o dos minutos.

No hace falta esperar a tener una noticia larga. Un aviso de tres párrafos sobre una
colaboración o un resultado mantiene la web viva y deja constancia de la actividad.

### Cada trimestre

- Revisar que la información de contacto y los datos de las Jornadas siguen siendo correctos.
- Ejecutar `npm run pendientes` y cerrar lo que ya esté confirmado.
- Comprobar si ha cambiado el estado de alguna actividad: lo que era `propuesta` puede haber
  pasado a `programada`, y lo `programada` a `realizada` una vez celebrada.

### Cada año

- **Antes de las Jornadas.** Crear la nueva edición a partir de `plantillas/edicion-jornadas.md`
  y actualizarla conforme se cierren el programa y los ponentes.
- **Después de las Jornadas.** Cambiar el estado de la edición a `celebrada`, añadir los
  materiales y publicar una noticia con las conclusiones. La edición pasa sola al archivo
  histórico y queda accesible en su dirección para siempre.
- **Mantenimiento técnico.** Ejecutar `npm outdated` y `npm audit`, actualizar Eleventy si hay
  versión nueva y comprobar que el sitio sigue compilando.
- **Revisar la declaración de accesibilidad**, especialmente si se ha realizado una evaluación
  externa.

### Cuando GitHub avise

GitHub envía avisos de seguridad sobre las dependencias. Como el sitio publicado no ejecuta
ninguna dependencia —es HTML estático—, el riesgo real es bajo, pero conviene atenderlos:
normalmente basta con `npm update` y confirmar el cambio en `package-lock.json`.

## Conservar el histórico

El histórico se conserva solo, y es una de las razones para haber elegido esta arquitectura:

- **Nada se borra.** Las ediciones anteriores de las Jornadas y las noticias antiguas siguen
  publicadas en su dirección original. Los enlaces que alguien haya guardado o citado siguen
  funcionando.
- **Git guarda todas las versiones.** Cualquier cambio se puede consultar y revertir desde el
  historial del repositorio.
- **El contenido es texto plano.** Si dentro de diez años el proyecto cambia de tecnología, los
  archivos Markdown seguirán siendo legibles y reutilizables.

Dos precauciones:

1. **No cambiar la dirección de una página ya publicada.** Si es imprescindible, deja en la
   dirección antigua una página breve que enlace la nueva.
2. **Guardar los archivos originales** de los documentos y fotografías que se publiquen, en el
   repositorio o en el almacenamiento institucional.

## Si el equipo cambia

Todo lo necesario para continuar está en el repositorio: el README explica la arquitectura,
`guia-contenidos.md` explica cómo escribir y `publicacion-github-pages.md` cómo publicar. No hay
conocimiento tácito en la cabeza de nadie ni servicios externos con contraseñas propias.

Lo único que hay que transferir son los permisos del repositorio de GitHub.

## Qué no intentar sin ayuda técnica

- Añadir formularios que recojan datos personales. Requiere un servicio institucional.
- Incorporar analítica o herramientas de seguimiento. Requiere valorar antes la protección de
  datos y, previsiblemente, informar de ello.
- Cambiar el dominio. Requiere coordinación con el servicio informático de la Universidad.

En los tres casos, el punto de partida está documentado en el README.
