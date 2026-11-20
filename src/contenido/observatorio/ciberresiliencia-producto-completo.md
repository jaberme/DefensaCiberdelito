---
titulo: "Ciberresiliencia: la seguridad de un producto depende de cada una de sus piezas digitales"
entrada: "Un sensor, una biblioteca de software o un servicio remoto pueden comprometer un equipo entero. Las nuevas orientaciones de la Comisión Europea explican por qué el fabricante debe conocer lo que integra y mantener su seguridad durante el tiempo de uso previsto."
descripcion: "Qué aclara la Comunicación C/2026/6013 sobre componentes de terceros, soporte, notificaciones y conformidad en el Reglamento europeo de Ciberresiliencia."
date: 2026-11-20
tipo: Artículo
autor:
  nombre: José Antonio Álvarez Bermejo
  vinculacion: miembro
  perfil: Profesor Titular de Universidad.
imagen: /assets/img/observatorio/ciberresiliencia/portada.jpg
---

<figure class="noticia-seguridad__figura">
  <img src="/assets/img/observatorio/ciberresiliencia/portada.jpg" alt="Un controlador industrial descompuesto en placas, sensores y capas de software, conectado con módulos externos y servicios en la nube; una envolvente común representa la protección de todo el conjunto y una alerta señala una vulnerabilidad." width="1600" height="900" decoding="async">
  <figcaption>La ciberresiliencia exige conocer y proteger el conjunto de componentes y dependencias del producto. Ilustración conceptual generada con inteligencia artificial.</figcaption>
</figure>

Un equipo industrial puede llevar años funcionando sin que nadie repare en la pequeña biblioteca de software que permite comunicarse con él. Hasta que aparece una vulnerabilidad. Entonces, la pregunta deja de ser quién escribió aquel código y pasa a ser mucho más concreta: ¿qué equipos lo incorporan, cómo les afecta el fallo y quién puede hacerles llegar una corrección? La ciberresiliencia comienza a construirse mucho antes de ese momento, cuando se decide qué componentes entran en el producto y cómo se mantendrán durante su vida de uso.

La Comisión Europea aborda estas cuestiones en la **Comunicación C/2026/6013**, publicada en el Diario Oficial de la Unión Europea el 17 de noviembre de 2026. Sus [orientaciones sobre la aplicación del Reglamento de Ciberresiliencia, en español (PDF)](/assets/documentos/OJ_C_202606013_ES_TXT.pdf), ayudan a interpretar el [Reglamento (UE) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj?locale=es). Son orientaciones interpretativas, sin carácter vinculante por sí mismas; la interpretación autorizada del Reglamento corresponde al Tribunal de Justicia de la Unión Europea. Su utilidad está en trasladar las obligaciones a situaciones reconocibles para quienes diseñan, integran y comercializan tecnología.

El mensaje que atraviesa el documento tiene consecuencias para toda la cadena de suministro: **el fabricante responde de la ciberseguridad del producto que introduce en el mercado, incluidos los componentes de terceros que integra, y debe gestionar sus vulnerabilidades durante el período de soporte**. Comprar un módulo o incorporar una biblioteca ajena forma parte de una decisión de ingeniería cuyas consecuencias deben evaluarse en el producto final.

## La seguridad también está en lo que no se ve

Pensemos en una empresa que combina un microcontrolador, sensores, firmware propio y conectividad para vender un equipo bajo su marca. La evaluación debe abarcar el conjunto, sus interfaces y las dependencias que permiten que funcione. Que cada proveedor haya documentado su pieza no demuestra, por sí solo, que la integración sea segura: al conectar componentes pueden aparecer riesgos que ninguno presentaba de forma aislada.

Las secciones 4.4 y 7 de las orientaciones explican esta responsabilidad. Si el fabricante descubre una vulnerabilidad en un componente de terceros integrado en su producto, debe comunicarla a quien lo fabrica o mantiene y atender sus efectos en el equipo que comercializa. La respuesta requiere saber qué versiones están instaladas y en qué productos, valorar si el fallo es aprovechable en ese contexto y organizar la corrección correspondiente.

Una consecuencia práctica es que el inventario de componentes debe servir para tomar decisiones. La lista de materiales de software, conocida como SBOM, ayuda a identificar dependencias, pero su valor aparece cuando permite localizar los equipos afectados por una vulnerabilidad y actuar sobre ellos. La documentación debe acompañarse de capacidad de seguimiento, contacto con proveedores y distribución de actualizaciones.

El alcance del Reglamento tampoco se limita a los aparatos que se conectan directamente a Internet. Las secciones 2 y 8 aclaran que una conexión de datos directa o indirecta con otro dispositivo o una red, prevista o razonablemente previsible, puede situar un producto dentro de su ámbito. Esto puede comprender periféricos, software y componentes comercializados por separado, atendiendo a las exclusiones y condiciones del Reglamento. Un puerto o una conexión a otro equipo pueden ser relevantes aunque el dispositivo nunca navegue por Internet.

También puede formar parte del producto una solución de tratamiento de datos a distancia cuando se desarrolla bajo la responsabilidad del fabricante y su ausencia impediría realizar alguna de las funciones del producto. Por eso, dibujar el límite de seguridad exige seguir las funciones y dependencias reales, incluso cuando una parte del procesamiento ocurre fuera de la carcasa.

## Dos fechas que afectan a decisiones de hoy

El calendario obliga a distinguir entre notificar un problema y acreditar la conformidad general del producto. Desde el **11 de septiembre de 2026** son aplicables las obligaciones de notificación de vulnerabilidades explotadas activamente e incidentes graves que repercutan en la seguridad del producto. Alcanzan también a productos introducidos en el mercado antes de la aplicación general del Reglamento y, según aclara la sección 9.1, siguen siendo exigibles después de terminar el soporte.

Desde que el fabricante tiene conocimiento, debe actuar sin demora indebida y presentar una alerta temprana en un máximo de **24 horas**, seguida de una notificación con información adicional en un máximo de **72 horas**, ambos plazos contados desde ese conocimiento. La investigación continúa después y debe completarse con los informes exigidos. La Comisión explica el procedimiento en su [página sobre las obligaciones de notificación](https://digital-strategy.ec.europa.eu/es/policies/cra-reporting). Para una empresa, esto supone disponer de un canal de recepción de avisos y de personas capaces de evaluar con prontitud si el producto está afectado.

La **aplicación general comienza el 11 de diciembre de 2027**. En hardware, importa cuándo se introduce cada unidad en el mercado de la Unión, y no únicamente cuándo se diseñó el modelo. Esto tiene especial interés para fabricantes que mantienen durante años el mismo catálogo industrial.

El ejemplo 12, en la sección 2.7, describe un microcontrolador diseñado antes de esa fecha. Las nuevas unidades pueden seguir introduciéndose en el mercado si el fabricante evalúa los riesgos actuales y demuestra que cumple los requisitos aplicables. Cuando las medidas existentes resultan adecuadas, la antigüedad del diseño no exige por sí sola rediseñarlo. Sí exige poder justificar su seguridad y disponer de los procesos de gestión de vulnerabilidades correspondientes.

## El soporte debe parecerse a la vida de uso del producto

Un controlador destinado a permanecer muchos años en una instalación plantea una responsabilidad que debe tenerse en cuenta desde su diseño. La sección 5 aclara que **cinco años de soporte no son un plazo universal que permita dar por terminada cualquier obligación de mantenimiento**. El período debe reflejar el tiempo durante el cual se prevé que se utilice el producto. Si ese uso previsto supera los cinco años, el soporte debe ser más largo; si es inferior, debe justificarse y el período corresponderá a esa duración prevista.

Para quien integra componentes, esto conecta la selección de proveedores con la capacidad de sostener el producto final. Merece la pena preguntarse desde el principio si seguirá habiendo acceso al firmware, si podrá corregirse una dependencia y si será posible distribuir actualizaciones cuando la instalación lleve años en servicio. Son decisiones que condicionan tanto la seguridad como los costes de mantenimiento.

La obligación de revisar la seguridad también evoluciona con las amenazas. La sección 9.2.3 explica que las pruebas periódicas deben adaptarse a la información nueva y al perfil de riesgo del producto. Repetir siempre la misma campaña puede dejar fuera una vulnerabilidad recién descubierta. Cuando aparecen datos relevantes, corresponde revisar y ajustar las pruebas; cuando no aparecen, la guía no exige inventar pruebas adicionales sin motivo.

## Integrar código abierto exige conocer la integración

El software libre y de código abierto ocupa una parte importante de este ecosistema. Las orientaciones distinguen entre la persona que contribuye a un proyecto, la entidad que lo sostiene de forma continuada y el fabricante que comercializa un producto que lo incorpora. Sus funciones y obligaciones no son intercambiables.

El ejemplo 34 presenta a un desarrollador independiente que publica y mantiene una biblioteca gratuita en un repositorio e incluye un enlace para recibir donaciones. Una empresa la descarga y la integra en su producto. En ese supuesto, el desarrollador y el repositorio no quedan sujetos a obligaciones por el Reglamento, mientras que el fabricante debe ejercer la diligencia debida sobre la integración. El uso comercial posterior de la biblioteca no convierte por sí solo a su autor en fabricante del equipo.

Para la empresa, aprovechar el código abierto supone comprender qué incorpora, seguir su evolución y valorar las vulnerabilidades que puedan afectarle. La disponibilidad del código facilita ese trabajo, pero no sustituye la evaluación de los riesgos del producto que llegará al usuario.

## Qué cambia cuando cambia el producto

Una actualización de seguridad forma normalmente parte del mantenimiento. Sin embargo, la sección 4 advierte de que una actualización puede constituir una modificación sustancial cuando altera la finalidad prevista o afecta al cumplimiento de los requisitos esenciales de ciberseguridad en los términos del Reglamento. En esos casos puede ser necesaria una nueva evaluación de conformidad. Si un tercero realiza la modificación sustancial y comercializa el producto resultante, puede asumir las obligaciones propias del fabricante.

También conviene examinar la clasificación del producto final. La sección 6 explica que incorporar un componente considerado importante o crítico no transmite automáticamente esa categoría al equipo completo. La funcionalidad principal del producto determina el análisis y, con ello, el procedimiento de evaluación de conformidad aplicable y la eventual intervención de un tercero.

Para los fabricantes de equipos industriales, sensores y periféricos, estas orientaciones enlazan dos decisiones que a menudo se tomaban por separado: la fecha de introducción de cada unidad determina cuándo debe acreditarse su conformidad, y el tiempo de uso previsto determina cuánto habrá que sostener su seguridad. Ambas influyen en el firmware, la elección de componentes y la capacidad de hacer llegar correcciones años después de la venta.

La ciberresiliencia se materializa cuando una organización puede responder con precisión a una vulnerabilidad: conoce qué productos están afectados, puede valorar el riesgo y tiene medios para intervenir. Ese control se prepara desde el diseño y se mantiene durante el soporte. Cada pieza digital cuenta, porque el usuario recibe y utiliza un producto completo.

El documento íntegro puede consultarse en el [PDF de la Comunicación C/2026/6013 en español, de 61 páginas](/assets/documentos/OJ_C_202606013_ES_TXT.pdf) y en su [ficha oficial en EUR-Lex](https://eur-lex.europa.eu/eli/C/2026/6013/oj?locale=es).
