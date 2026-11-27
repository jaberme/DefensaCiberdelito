---
titulo: "La correlación de eventos como instrumento de investigación pericial"
entrada: "Carlos Vila Martínez explica, a través de un caso práctico, cómo normalizar y relacionar evidencias digitales para reconstruir un incidente y alcanzar conclusiones periciales técnicamente defendibles."
descripcion: "La correlación de eventos en informática forense: normalización de registros, reconstrucción cronológica de incidentes y límites de las conclusiones periciales."
date: 2026-11-26
tipo: Artículo
autor:
  nombre: Carlos Vila Martínez
  vinculacion: colaborador
  perfil: Cofundador y CEO · 3inLAB Informática Forense
imagen: /assets/img/observatorio/correlacion-eventos/imagen-1.jpeg
---

Hoy abrimos las puertas a una pequeña historia, narrada para que tanto el técnico especialista como el lector profano en la materia encuentren en ella un relato comprensible, revelador y posiblemente real (ahí lo dejamos). Todo comienza con un servidor corporativo vulnerable, un tráfico saliente hacia un dominio comprometido y desviaciones sistemáticas en los protocolos de seguridad por parte de algún miembro del equipo de sistemas.

<figure>
  <a href="/assets/img/observatorio/correlacion-eventos/imagen-1.jpeg">
    <img src="/assets/img/observatorio/correlacion-eventos/imagen-1.jpeg" alt="Escenario inicial: servidor vulnerable, acceso a un dominio comprometido y desviaciones en los protocolos de seguridad; la correlación integra las evidencias y relaciona los hechos." width="1298" height="732" decoding="async">
  </a>
  <figcaption>Escenario inicial del caso práctico. Imagen incluida en el documento del autor y señalada en el original como generada con IA.</figcaption>
</figure>

Partimos de una sucesión de eventos, aparentemente inconexos, que nos aportan información relevante, pero no permiten establecer conclusiones. La <strong><em>correlación de eventos</em></strong> nos proporciona un contexto más amplio para poder abordar un análisis en profundidad que nos permita establecer, validar y documentar la relación entre acontecimientos. Dicho de otro modo, se trata de <em>identificar</em>, <em>registrar</em>, <em>ordenar</em> <em>cronológicamente</em> y <em>vincular</em> diferentes <em>eventos</em> para poder reconstruir una secuencia de acontecimientos y posteriormente trasladarlos a un informe pericial.

Ahora bien, hemos de tener en cuenta que la correlación de eventos nos puede ayudar a entender mejor el contexto de un incidente en el que estemos trabajando y nos permite relacionar elementos inconexos, pero no es evidencia suficiente para demostrar <em>«qué»</em> y <em>«quién»</em> lo causó.

Vamos a intentar trasladarlo a un pequeño ejemplo. Supongamos que una empresa sufre un incidente de seguridad y, tras la fase de contención y respuesta, es necesario elaborar un informe pericial para dirimir posibles responsabilidades. Inicialmente disponemos de la siguiente información y datos de partida:

Por un lado tenemos un <strong><em>contexto</em></strong> en el que el perito localiza evidencias de un servidor cuyo sistema operativo carecía de parches de seguridad vigentes (<em>unpatched</em>) desde hace 24 meses, derivando en un alto nivel de exposición a vulnerabilidades conocidas. Adicionalmente el responsable de sistemas que lo administraba visitaba con frecuencia páginas web de dudosa reputación.

Por otro lado, estas evidencias solo proporcionan información parcial para determinar una <em>«mala praxis»</em>, por parte del empleado, y una política de seguridad ineficiente, por parte de la empresa. Todo esto proporciona un entorno vulnerable, es decir, <em>«la tormenta perfecta»</em> para que se produzca una <em>brecha</em> <em>de</em> <em>seguridad</em>.

Llegados a este punto, cabe preguntarse: <strong><em>¿nos proporcionan estas evidencias información suficiente para determinar la causa del incidente?</em></strong> La respuesta es no, ya que la existencia de un servidor desactualizado o un empleado navegando por sitios web comprometidos no evidencia técnicamente que los ciberdelincuentes explotasen precisamente esas vulnerabilidades como <em>«vector de ataque»</em>.

Pero entonces, <strong><em>¿que se necesitaría para determinar la causa?</em></strong> El perito debería encontrar el registro específico (<em>log</em>) que evidencie la explotación de esa vulnerabilidad sin parchear o localizar el archivo descargado, desde esa web comprometida y que finalmente desencadenó la infección.

De todo ello podríamos concluir que la correlación de estos eventos nos ha proporcionado a partir de un escenario concreto que condiciones facilitaron el incidente, pero sin poder determinar con exactitud que evento lo provocó.

Si trasladamos todo esto al campo de la <strong><em>informática forense</em></strong>, la <em>correlación de eventos</em> es el proceso que se encarga de <strong><em>normalizar</em></strong> y <strong><em>vincular</em></strong> <strong><em>registros</em></strong> (<em>logs</em>) y <strong><em>artefactos</em></strong> digitales (<em>digital artifacts</em>) procedentes de distintas fuentes para reconstruir con precisión una línea temporal y demostrar <em>«qué»</em> ocurrió, <em>«cómo»</em> y <em>«en qué orden»</em>.

## ¿Qué significa exactamente normalizar y vincular registros y artefactos?

Básicamente significa estandarizar datos técnicos de fuentes diversas para darles un mismo formato y cruzarlos entre sí, permitiendo reconstruir una línea de tiempo (<em>forensic timeline</em>) coherente, durante el desarrollo de una práctica pericial. Debemos considerarlas cómo dos <em>fases separadas pero complementarias</em>:

Por un lado tendremos la fase de <strong><em>normalización</em></strong>, es decir, <em>«hacer que hablen el mismo idioma»</em> y que estén en sintonía. Cada sistema, aplicación o dispositivo utiliza una estructura propia para registrar los eventos que, generalmente, incluyen un formato horario propio y el idioma que corresponda. La tarea de normalización consistirá en traducir toda esa información a ese <em>«mismo idioma»</em> o esquema común.

<h3 id="como-normalizar-los-registros">¿Cómo lo haríamos?</h3>

En lo que respecta a las <strong><em>marcas de tiempo</em></strong> (fecha y hora), utilizaremos el <em>UTC (Tiempo Universal Coordinado)</em>, que es por decirlo de algún modo el principal estándar de tiempo por el que se regulan todos los relojes a nivel mundial.

En cuanto a la <strong><em>nomenclatura de los campos</em></strong>, utilizaremos nombres equivalentes con los que podamos identificar cada uno de los diferentes campos con contenido común. Ejemplo: <em>source_ip</em>, <em>src_ip</em>, <em>client_ip</em>, <em>sender_ip</em> por <em>ip_origen.</em>

En lo que respecta al contenido de los archivos, debemos <strong><em>limpiar formatos</em></strong>, para lo que eliminaremos estilos visuales, el texto enriquecido o atributos especiales, convirtiendo todo a un formato de texto plano, como por ejemplo <em>json, csv</em>, etc. Esto permitirá un procesamiento de los datos más rápido y limpio.

Por otro lado tendremos la fase de <strong><em>vinculación (correlación)</em></strong>, es decir, una vez que hemos conseguido que los datos <em>«hablen el mismo idioma»</em> vamos a hacer que se relacionen entre ellos, es decir, que los <em>«logs»</em> (registros de actividad) se crucen con los <em>«artefactos»</em> (huellas o rastros específicos que van dejando los usuarios o las aplicaciones, como por ejemplo los metadatos, claves de registro del sistema operativo, historial de navegación web, etc.).

<h3 id="como-vincular-los-registros">¿Cómo lo haríamos?</h3>

<strong><em>Identificando coincidencias</em></strong>, es decir, intentando localizar elementos comunes que aparezcan en diferentes ubicaciones o dispositivos. <em>Por ejemplo</em>: direcciones IP, huellas digitales de archivos (<em>hash</em>), nombres de usuario y coincidencias temporales (fecha/hora).

<strong><em>Reconstruyendo la línea de tiempo</em></strong> (<em>forensic timeline</em>), para que a partir de sucesos independientes podamos comprender la secuencia completa del incidente. <em>Por ejemplo</em>: vincular un determinado registro del <em>«log»</em> de un <em>«firewall»</em> con el <em>«artefacto de ejecución»</em> (rastro generado por el programa que se ejecutó en el mismo momento identificado por ese registro).

## Dándole forma a todo lo expuesto

Siguiendo con la historia inicial tenemos la siguiente cronología de acontecimientos:

<strong>Primero «El incidente»</strong>. Un miembro del equipo de sistemas accede, desde su equipo, a un dominio no confiable que ha sido comprometido. Realiza diferentes búsquedas y en un determinado momento pulsa sobre la imagen de una de las páginas consultadas. A partir de ahí se produce la descarga y posterior ejecución de un programa malicioso, explotando una vulnerabilidad presente en el equipo. A continuación, y sin que el administrador sea consciente de ello, el programa comienza a ejecutarse en segundo plano, establece una comunicación con un servidor externo que está controlado por el atacante, el cual accede a documentación corporativa y la transmite al exterior. Toda esta actividad deja un rastro digital en diferentes dispositivos y aplicaciones.

<strong>Segundo «La identificación y adquisición de evidencias»</strong>. De forma muy básica podemos decir que tenemos cuatro elementos que intervienen y nos proporcionan una visión parcial de lo acontecido: Un <strong><em>navegador</em></strong> que registra el acceso al dominio y la descarga de un archivo. El <strong><em>equipo</em></strong> del administrador de sistemas que registra la ejecución del «<em>malware»</em> y, como dispone de monitorización de eventos, también el acceso a determinados archivos ofimáticos. Un <strong><em>router</em></strong>, con registro de actividad activado, que identifica y cataloga las comunicaciones entre el equipo de la red corporativa e <em>Internet</em>. El <strong><em>servidor</em></strong> del atacante, al que en principio no tendremos acceso, pero que contiene registros de las conexiones entrantes y de los archivos recibidos. En esta fase se intenta identificar, adquirir y preservar el máximo número de evidencias, cumpliendo rigurosamente con tres dimensiones básicas en seguridad de la información (<em>integridad</em>, <em>autenticidad</em> y <em>trazabilidad</em>).

<strong>Tercero «La normalización de las evidencias adquiridas»</strong>. Los registros obtenidos proceden de los elementos mencionados anteriormente (<em>navegador</em>, <em>equipo</em> administrador, <em>router</em> y <em>servidor</em> atacante), utilizan distintos formatos y pueden presentar diferencias en sus referencias temporales. <em>Por ejemplo</em>: una misma conexión puede aparecer registrada a las <em>09:05:48 UTC</em> en el <em>router</em> y a las <em>08:05:45 UTC</em> en el equipo de la red local, debido a diferencias de zona horaria y sincronización de los relojes. La normalización consiste en transformar esta información en un formato común, corregir los desfases temporales debidamente acreditados y homogeneizar los datos para que puedan ser comparados, sin alterar las evidencias originales.

<strong>Cuarto «La correlación de los eventos»</strong>. Una vez normalizada la información, comenzamos a establecer relaciones entre los acontecimientos registrados. Relacionamos la visita al dominio sospechoso con la descarga del archivo, ésta con su ejecución, la ejecución con el tráfico saliente y esta comunicación con el acceso y exfiltración de documentos ofimáticos corporativos. Para ello utilizamos elementos comunes como las <em>direcciones IP</em>, las <em>marcas temporales</em>, los <em>identificadores de procesos</em> y las <em>huellas digitales</em> de los archivos. De esta forma, lo que inicialmente eran registros aislados comienza a adquirir sentido dentro de un mismo contexto.

<strong>Quinto «La reconstrucción del</strong> <strong><em>timeline</em></strong><strong>»</strong>. El paso anterior nos permite hacer una reconstrucción cronológica de los hechos y obtener una visión global del incidente, desde el acceso inicial al dominio comprometido hasta la posible exfiltración de archivos ofimáticos. Esta reconstrucción nos permite responder a preguntas fundamentales como <em>¿qué sucedió?</em>, <em>¿cuándo sucedió?</em>, <em>¿cómo sucedió?</em>, <em>¿qué sistemas intervinieron?</em> y <em>¿qué información pudo verse comprometida?</em>

<strong>Sexto «Del análisis a la conclusión»</strong>. En el ámbito del <em>peritaje tecnológico</em>, los resultados de este proceso se trasladan a un informe pericial, documentando las evidencias adquiridas, las relaciones establecidas y las conclusiones alcanzadas. No obstante, debemos diferenciar claramente los hechos técnicamente acreditados de las hipótesis (que deben evitarse si pretendemos ser rigurosos). <em>Por ejemplo</em>, demostrar que la presencia de un programa malicioso en el equipo corporativo permitió el acceso a determinados documentos y posterior transmisión de la información a un servidor externo no implica necesariamente que podamos acreditar el contenido exacto de la información transmitida. Esta distinción es fundamental para garantizar el <em>rigor</em> y la <em>imparcialidad</em> de la pericia.

<figure>
  <a href="/assets/img/observatorio/correlacion-eventos/imagen-2.jpeg">
    <img src="/assets/img/observatorio/correlacion-eventos/imagen-2.jpeg" alt="Secuencia del incidente: acceso web, descarga de un troyano, ejecución maliciosa y exfiltración; evidencias del navegador, equipo local, router y servidor externo que se normalizan y correlacionan para reconstruir los hechos." width="1291" height="726" loading="lazy" decoding="async">
  </a>
  <figcaption>De las fuentes de evidencia digital a las conclusiones del informe pericial. Imagen incluida en el documento del autor y señalada en el original como generada con IA.</figcaption>
</figure>

## Conclusión

El verdadero valor de un análisis forense y la posterior elaboración de un informe pericial no reside únicamente en la cantidad de información que somos capaces de obtener, sino en nuestra capacidad para <em>establecer</em>, <em>validar</em> y <em>documentar</em> las relaciones existentes entre los acontecimientos registrados. En definitiva, el trabajo del perito informático no consiste simplemente en determinar qué ha sucedido, porque el verdadero valor de la investigación forense no está en acumular información, sino en convertirla, mediante el rigor metodológico y la objetividad, en conocimiento verificable y conclusiones técnicamente defendibles en sede judicial.

**Sobre el autor.** Carlos Vila Martínez es Cofundador y CEO · 3inLAB Informática Forense y colaborador del Seminario Permanente. Su trayectoria profesional puede consultarse en la [página de colaboradores](/colaboradores/).
