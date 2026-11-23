---
titulo: "Cuando la inteligencia artificial accede a los datos públicos: la biblioteca MCP de Reforma Digital"
entrada: "Reforma Digital pone a disposición de desarrolladores y usuarios una biblioteca de servidores MCP que conecta asistentes de inteligencia artificial con fuentes de información pública españolas."
descripcion: "La biblioteca MCP de Reforma Digital permite consultar mediante asistentes de IA información pública española del Congreso, el BOE, el INE, Eustat, RENFE, ALSA y precios de carburantes."
date: 2026-11-23
---

**Autor: Francisco Torrecillas**, miembro del Seminario Permanente y Networking & Communications Manager en Cosentino Group - Grupo Cosentino.

La iniciativa Reforma Digital pone a disposición de desarrolladores y usuarios una biblioteca de servidores MCP que permite conectar asistentes de inteligencia artificial con fuentes de información pública españolas. El proyecto abre nuevas posibilidades para la transparencia institucional, la investigación, el análisis de información y la automatización de consultas, aunque también plantea desafíos relacionados con la fiabilidad, la trazabilidad y la seguridad.

<figure class="noticia-seguridad__figura">
  <img src="/assets/img/noticias/biblioteca-mcp-reforma-digital.png" alt="Ilustración de un asistente de inteligencia artificial conectado de forma trazable con legislación, estadísticas, actividad parlamentaria, transporte y otros datos públicos españoles." width="1672" height="941" decoding="async">
  <figcaption>Los servidores MCP actúan como puente entre los asistentes de inteligencia artificial y distintas fuentes de información pública.</figcaption>
</figure>

**[Consultar la biblioteca MCP de Reforma Digital](https://reforma-digital.es/developers/mcp)**

## De preguntar a una IA a consultar información pública verificable

Uno de los problemas habituales de los sistemas de inteligencia artificial generativa es que pueden ofrecer respuestas aparentemente convincentes sin disponer de información actualizada o contrastada. Cuando se trata de legislación, estadísticas oficiales o decisiones parlamentarias, esta limitación adquiere especial importancia.

El protocolo **Model Context Protocol (MCP)** propone una forma de abordar este problema. Se trata de un estándar abierto que permite conectar aplicaciones de inteligencia artificial con fuentes externas de datos y herramientas especializadas.

En términos sencillos, MCP funciona como un puente entre un asistente de IA y los sistemas que contienen la información que necesitamos. En lugar de depender exclusivamente de lo aprendido durante su entrenamiento, el asistente puede solicitar datos mediante herramientas conectadas y utilizarlos para elaborar una respuesta.

La iniciativa española [Reforma Digital](https://reforma-digital.es/developers/mcp) ha desarrollado una aplicación práctica de este concepto mediante una biblioteca de servidores MCP orientados a la consulta de información pública.

## ¿Qué ofrece la biblioteca MCP de Reforma Digital?

La plataforma dispone actualmente de **siete servidores MCP**, cada uno especializado en un ámbito de información.

- **Congreso de los Diputados:** consulta de votaciones parlamentarias, votos individuales de diputados, preguntas parlamentarias y Diarios de Sesiones.
- **Boletín Oficial del Estado (BOE):** búsqueda de legislación, consulta de sumarios y acceso a artículos de normas y textos consolidados.
- **Instituto Nacional de Estadística (INE):** acceso a estadísticas sobre empleo, población, inflación, vivienda y economía.
- **Eustat:** consulta de estadísticas oficiales de Euskadi y sus territorios históricos.
- **RENFE:** información sobre estaciones, horarios, precios, estado de trenes y retrasos.
- **ALSA:** búsqueda de servicios de autobús, horarios, precios, disponibilidad y bonos.
- **Precios de carburantes:** comparación de precios en estaciones de servicio españolas.

Cada servidor expone herramientas específicas que pueden ser utilizadas por asistentes y entornos compatibles con MCP, como Claude, Codex, Cursor o Visual Studio Code, de acuerdo con las instrucciones de conexión publicadas por el proyecto.

La utilidad no reside únicamente en consultar cada fuente de forma independiente, sino en la posibilidad de combinar consultas dentro de un proceso de análisis.

Por ejemplo, un investigador podría solicitar a su asistente que localizara una determinada disposición publicada en el BOE, identificara preguntas parlamentarias relacionadas con la materia y recuperara estadísticas oficiales que permitieran contextualizar el problema.

Todo ello mediante instrucciones en lenguaje natural, sin necesidad de programar individualmente cada consulta.

## Una herramienta con potencial para OSINT y el análisis de información

Desde la perspectiva de la inteligencia de fuentes abiertas (*Open Source Intelligence*, OSINT), esta iniciativa presenta un interés particular.

Una parte importante del trabajo de un analista consiste en localizar información dispersa, contrastar documentos, identificar relaciones entre hechos y reconstruir cronologías.

La disponibilidad de conectores MCP especializados puede facilitar algunas de estas tareas.

Pensemos, por ejemplo, en una investigación sobre las políticas públicas de ciberseguridad en España. Un agente conectado a estos servidores podría ayudar a localizar referencias normativas en el BOE, buscar iniciativas o preguntas parlamentarias sobre seguridad digital y recuperar estadísticas relevantes para contextualizar el análisis.

El resultado podría servir como punto de partida para elaborar informes, preparar investigaciones académicas o identificar cuestiones que requieren una revisión documental más profunda.

También existen aplicaciones interesantes para el periodismo de datos, la supervisión de la actividad institucional y la formación de analistas de inteligencia.

**La diferencia fundamental es que la inteligencia artificial pasa de limitarse a generar respuestas a disponer de mecanismos para consultar información externa.**

Sin embargo, esta posibilidad no convierte automáticamente sus respuestas en inteligencia validada. La calidad de un análisis sigue dependiendo de la cobertura de las fuentes, la actualización de los datos, la correcta interpretación de los resultados y su verificación independiente.

## Transparencia, administración pública y acceso al conocimiento

Otro aspecto relevante es su contribución potencial a la transparencia.

La Administración pública española produce grandes cantidades de información que, aunque sean accesibles, no siempre resultan fáciles de localizar, interpretar o relacionar.

La fragmentación entre organismos, portales y formatos constituye una barrera práctica para ciudadanos y profesionales.

Una interfaz conversacional conectada a herramientas especializadas podría reducir parte de esa complejidad.

Así, una persona podría formular preguntas como «¿Qué novedades legislativas se han publicado sobre protección de datos?» o «¿Qué preguntas parlamentarias se han presentado recientemente sobre inteligencia artificial?», y utilizar las respuestas para localizar los documentos correspondientes.

Este enfoque puede resultar especialmente interesante para universidades, administraciones locales, investigadores y entidades que necesitan consultar información pública de manera recurrente.

Además, el proyecto publica su código en [GitHub](https://github.com/samuelcorsan/reforma-digital), bajo licencia MIT, facilitando su examen, reutilización y mejora por parte de la comunidad.

## El desafío de la ciberseguridad: conectar herramientas también implica riesgos

Desde el Seminario Permanente «Seguridad Nacional, Sociedad Digital y Ciberdelito» consideramos especialmente importante analizar el alcance de este tipo de integraciones desde la perspectiva de la seguridad.

El protocolo MCP facilita la interoperabilidad entre aplicaciones de IA y sistemas externos, pero esa interoperabilidad también introduce nuevas superficies de exposición.

Un servidor MCP puede entregar información al asistente y, dependiendo de sus funciones, ofrecer operaciones adicionales. Por ello, conectar un servidor externo exige evaluar su procedencia, su comportamiento y los permisos que se le conceden.

Entre los riesgos que deben contemplarse se encuentran la manipulación de las respuestas, la introducción de instrucciones maliciosas en el contenido recuperado (*prompt injection*), la exposición de información sensible y el uso inadecuado de herramientas conectadas.

En este caso, Reforma Digital identifica expresamente su iniciativa como un **proyecto independiente cuyas adaptaciones son experimentales**. No debe confundirse, por tanto, con un servicio oficial prestado directamente por los organismos cuyos datos facilita consultar.

Es recomendable comprobar la información relevante en las fuentes institucionales originales, conservar las referencias documentales, verificar su fecha de actualización y evitar incorporar información confidencial a consultas realizadas mediante servicios de terceros.

El acceso automatizado a fuentes públicas tampoco garantiza por sí solo que los datos recuperados sean completos, estén actualizados o hayan sido correctamente interpretados.

## Hacia una nueva generación de asistentes para la investigación y los servicios públicos

La relevancia de iniciativas como esta va más allá de los siete servidores actualmente disponibles.

Representan una evolución en la manera de interactuar con la información: desde la búsqueda manual en portales independientes hacia entornos en los que los asistentes inteligentes pueden consultar herramientas especializadas y apoyar procesos de investigación.

Para la universidad, esto abre posibilidades de aprendizaje y experimentación en análisis de datos públicos, inteligencia de fuentes abiertas y desarrollo seguro de agentes de IA.

Para las administraciones, permite explorar nuevas formas de acceso al conocimiento y de aprovechamiento de los datos abiertos.

Y para la ciudadanía, plantea un escenario en el que la información institucional podría resultar más accesible sin exigir conocimientos técnicos avanzados.

El verdadero progreso, sin embargo, no consistirá simplemente en que una inteligencia artificial responda más deprisa, sino en que **sus respuestas puedan contrastarse, sus fuentes puedan identificarse y sus resultados puedan someterse a una evaluación crítica**.

La tecnología puede facilitar el acceso a la información. La responsabilidad de interpretarla correctamente continúa siendo humana.

## Para saber más

- [Biblioteca MCP de Reforma Digital](https://reforma-digital.es/developers/mcp)
- [Código abierto del proyecto Reforma Digital](https://github.com/samuelcorsan/reforma-digital)
- [Documentación oficial de Model Context Protocol](https://modelcontextprotocol.io/introduction)

*Seminario Permanente «Seguridad Nacional, Sociedad Digital y Ciberdelito» — Universidad de Almería.*
