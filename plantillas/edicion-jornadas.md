---
titulo: II Jornadas de Ciberseguridad, Ciberdefensa y Seguridad Nacional
entrada: Frase de presentación de la edición. Aparece en el listado de ediciones y al compartir el enlace.
descripcion: Resumen de una sola frase para buscadores y redes sociales.

edicion:
  numero: "II"
  anio: "2027"

  # Número que solo sirve para ordenar: la edición con el valor más alto
  # aparece la primera. Usa el año cuando lo sepas.
  orden: 2027

  # celebrada -> ya tuvo lugar
  # abierta   -> convocada, con fechas confirmadas
  # pendiente -> anunciada pero sin datos cerrados
  estado: abierta

  fechas: "[FECHAS DE LAS JORNADAS]"
  lugar: "[SEDE DE LAS JORNADAS]"
  direccion: null

  inscripcion:
    estado: no-abierta          # abierta | cerrada | no-abierta
    enlace: null                # dirección del servicio institucional de inscripción
    nota: "El plazo de inscripción no está abierto."

# Programa. Deja la lista vacía ([]) mientras no esté cerrado: la página
# mostrará un aviso en lugar de horarios provisionales.
programa:
  - hora: "09:30"
    titulo: "Acreditación y entrega de documentación"
    detalle: ""
  - hora: "10:00"
    titulo: "Inauguración"
    detalle: "Intervención de apertura."
  - hora: "10:30"
    titulo: "Título de la ponencia"
    detalle: "Nombre de quien interviene y una línea sobre el contenido."

# Ponentes y participantes. Solo quienes hayan confirmado su participación
# y hayan dado su conformidad para figurar aquí.
participantes:
  - nombre: "Nombre y apellidos"
    referencia: "Cargo. Entidad."
    intervencion: "Título de su intervención."

# Materiales publicados después de la edición: programa en PDF, ponencias,
# conclusiones, fotografías. Los archivos se guardan en src/assets/documentos/.
materiales:
  - tipo: "Programa"
    titulo: "Programa completo en PDF"
    enlace: "/assets/documentos/programa-2027.pdf"
    descripcion: ""
---

Texto de presentación de la edición.

## Asuntos que se abordan

Los ejes temáticos de esta convocatoria.

## Información práctica

Cómo llegar, horarios de acreditación y cualquier indicación útil para asistir.
