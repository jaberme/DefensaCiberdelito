---
titulo: "Más allá de ASCII: cracking forense de contraseñas con Hashcat, Unicode y máscaras por tokens"
entrada: "Guía técnica para laboratorios forenses y unidades de las FF.CC.S.E. sobre recuperación controlada de contraseñas Unicode con Hashcat, desde la reconstrucción de los bytes hasta las nuevas máscaras por tokens."
descripcion: "José Antonio Álvarez Bermejo explica cómo abordar contraseñas Unicode con Hashcat, máscaras por tokens y una metodología forense reproducible."
date: 2026-11-28
tipo: Guía técnica
autor:
  nombre: José Antonio Álvarez Bermejo
  vinculacion: miembro
  perfil: Doctor en Informática y profesor titular de la Universidad de Almería.
imagen: /assets/img/observatorio/hashcat-unicode/portada.png
---

<figure class="noticia-seguridad__figura">
  <img src="/assets/img/observatorio/hashcat-unicode/portada.png" alt="Letras latinas, árabes y cirílicas y emoji se relacionan con bloques digitales bajo una lupa y se agrupan en posiciones de una máscara junto a una tarjeta gráfica." width="1672" height="941" decoding="async">
  <figcaption>De los caracteres visibles a los bytes y las máscaras por tokens: representación conceptual del análisis de contraseñas Unicode con Hashcat. Ilustración generada con inteligencia artificial; los bloques no representan secuencias de bytes exactas.</figcaption>
</figure>

La recuperación de contraseñas debe realizarse únicamente sobre evidencias autorizadas, dentro del alcance judicial correspondiente y sobre copias forenses verificadas. El objetivo no es “romper cualquier contraseña”, sino reproducir de forma controlada el proceso que convirtió una cadena de caracteres concreta en el hash investigado.

Este artículo aborda, entre otros aspectos, el nuevo ataque *Token Mask*. Su implementación fue [integrada en la rama principal de Hashcat el 26 de noviembre de 2026](https://github.com/hashcat/hashcat/pull/5156).

## Tutorial mínimo de Hashcat

Hashcat no extrae hashes del dispositivo ni descubre por sí solo el algoritmo utilizado. Recibe hashes ya extraídos y prueba candidatos contra una construcción criptográfica seleccionada mediante `-m`.

Para un laboratorio de ejemplo:

```bash
# Inventario de la herramienta y los dispositivos
hashcat --version
hashcat -I

# Mostrar posibles formatos compatibles
hashcat --identify lab.hash

# Consultar los detalles del modo seleccionado
hashcat -m 0 -H
```

`--identify` ofrece posibilidades, no una identificación pericial concluyente. La longitud y apariencia de un hash pueden coincidir con varios formatos. Por ejemplo, bcrypt y determinadas construcciones anidadas con bcrypt pueden ser indistinguibles hasta recuperar un candidato válido. El origen del artefacto, la versión de la aplicación y su código o documentación son más fiables que un detector visual de hashes. [Ejemplo técnico en el foro de Hashcat](https://hashcat.net/forum/thread-11632.html).

Un ataque básico de diccionario:

```bash
hashcat -m 0 -a 0 lab.hash palabras.txt \
  --session caso_demo \
  --potfile-path caso_demo.pot \
  --status --status-timer 10
```

Un diccionario con reglas:

```bash
hashcat -m 0 -a 0 lab.hash palabras.txt -r reglas.rule
```

Una máscara ASCII —una mayúscula, cuatro minúsculas, dos dígitos y un símbolo—:

```bash
hashcat -m 0 -a 3 lab.hash '?u?l?l?l?l?d?d?s'
```

Antes de consumir GPU:

```bash
hashcat -m 0 -a 3 lab.hash '?u?l?l?l?l?d?d?s' --total-candidates
hashcat -m 0 -a 3 lab.hash '?u?l?l?l?l?d?d?s' --speed-only
```

Para preservar el resultado como bytes, sin confiar en cómo lo renderiza la terminal:

```bash
hashcat -m 0 lab.hash --show --outfile-format=1,3
```

El formato hexadecimal es especialmente importante con controles invisibles, emoji o texto bidireccional. MD5 (`-m 0`) se utiliza aquí únicamente para un laboratorio rápido, no como recomendación para almacenar contraseñas.

Los modos más relevantes son:

- `-a 0`: diccionario.
- `-a 3`: máscara tradicional, orientada a bytes.
- `-a 4`: PCFG, candidatos ordenados por probabilidad.
- `-a 5`: sustituciones mediante tablas multibyte.
- `-a 9`: asociación de información específica con cada cuenta.
- `-a 12`: palabras situadas dentro de una máscara.
- `-a 13`: nueva máscara por tokens, actualmente en la rama `master`.

Hashcat 8.0.0 incorporó PCFG, tablas, asociación ampliada y palabras dentro de máscaras, entre otras mejoras. [Notas oficiales de Hashcat 8.0.0](https://github.com/hashcat/hashcat/releases).

## El error conceptual: un hash no contiene caracteres

Un hash no recuerda si la contraseña era española, árabe o cirílica. Tampoco conserva su codificación, normalización o distribución de teclado. Sólo representa los bytes que finalmente recibió la función criptográfica.

Las siguientes cadenas pueden parecer iguales:

```text
café   → U+0063 U+0061 U+0066 U+00E9
café  → U+0063 U+0061 U+0066 U+0065 U+0301
```

Sin embargo, en UTF-8 son:

```text
636166c3a9
63616665cc81
```

Y producen MD5 diferentes:

```text
07117fe4a1ebd544965dc19573183da2
10a85865ce7a7d2f0dc3faf37c617a8d
```

Unicode define NFC, NFD, NFKC y NFKD para representar de manera consistente cadenas equivalentes, pero una aplicación puede normalizar, no normalizar o aplicar transformaciones propias. [Unicode UAX #15](https://www.unicode.org/reports/tr15/).

Por ello, Hashcat no puede “identificar caracteres extraños” examinando el digest. El laboratorio debe inferirlos a partir de:

- Sistema operativo, aplicación y versión.
- Idioma, región y teclados configurados.
- Nombres, alias y textos escritos por la persona investigada.
- Capturas de pantalla y artefactos de autocompletado.
- Contraseñas anteriores legalmente obtenidas.
- Código fuente o vectores de prueba del producto.
- Comportamiento de normalización y truncado de la aplicación.

## Las áreas más complejas

| Área | Problema forense | Tratamiento recomendado |
|---|---|---|
| Acentos y diacríticos | Un glifo puede ser un punto de código precompuesto o una base seguida de marcas combinantes. | Probar el original, NFC y NFD. Tratar NFKC/NFKD como ramas separadas, porque pueden cambiar el significado. |
| Emoji | Un símbolo visible puede contener varios puntos de código, modificadores de piel, `U+FE0F`, ZWJ o caracteres de etiqueta. | Preservar la secuencia completa como token y registrar sus bytes. |
| Árabe | Dirección RTL, diacríticos, tatweel, ZWJ/ZWNJ, formas de hamza y tres familias de dígitos visualmente similares. | Construir corpus según teclado y dialecto observados; probar dígitos ASCII, árabe-índicos y persas por separado. |
| Cirílico y griego | Letras visualmente confundibles con caracteres latinos y contraseñas escritas con el teclado equivocado. | Aplicar tablas de distribución de teclado y sustituciones de confusables limitadas por la evidencia. |
| Controles invisibles | ZWJ, ZWNJ, espacios no separables, controles bidireccionales y otros caracteres pueden desaparecer visualmente. | Inspeccionar siempre puntos de código y hexadecimal; no copiar desde una interfaz gráfica sin verificar. |
| CJK y Hangul | IME, kana de ancho completo/medio, kanji, jamo precompuesto o descompuesto. | Modelar el método de entrada real y aplicar normalización como hipótesis, no como supuesto. |
| Codificaciones heredadas | UTF-8, UTF-16LE, CP1256, CP1251 o ISO-8859 pueden producir bytes distintos. | Reconstruir la canalización de la aplicación y validarla con una contraseña conocida. |

Unicode distingue además entre puntos de código y “caracteres percibidos por el usuario” o clústeres de grafemas. [UAX #29](https://www.unicode.org/reports/tr29/) formaliza esta segmentación.

### Emoji: el glifo no es la contraseña

Estos dos corazones pueden verse casi iguales:

```text
❤   U+2764              e29da4
❤️  U+2764 U+FE0F       e29da4efb88f
```

`👩‍💻` ocupa un solo glifo en muchas interfaces, pero internamente es:

```text
U+1F469 U+200D U+1F4BB
f09f91a9e2808df09f92bb
```

Son once bytes UTF-8. Las secuencias ZWJ se comportan como un único emoji para el usuario, aunque internamente sean una secuencia. [Unicode UTS #51](https://www.unicode.org/reports/tr51/).

### Árabe

El moldeado contextual de las letras suele ser una propiedad del renderizador: la forma inicial, medial o final no implica necesariamente puntos de código diferentes. Pero también existen caracteres de presentación, marcas vocálicas y controles invisibles que sí cambian los bytes.

Deben distinguirse:

```text
1   U+0031  ASCII
١   U+0661  ARABIC-INDIC DIGIT ONE
۱   U+06F1  EXTENDED ARABIC-INDIC DIGIT ONE
```

Una estrategia de “todo el bloque Unicode árabe” desperdicia recursos y genera secuencias imposibles. Es preferible separar:

1. Palabras y nombres observados.
2. Variantes con y sin diacríticos.
3. Dígitos y fechas en cada sistema.
4. Transliteraciones latinas.
5. Errores de distribución de teclado.
6. ZWJ, ZWNJ o tatweel únicamente cuando existan indicios.

### Cirílico, griego y confusables

La `a` latina (`U+0061`) y la `а` cirílica (`U+0430`) son visualmente similares, pero sus bytes son `61` y `d0b0`.

Unicode mantiene datos específicos para detectar cadenas confundibles y mezclas de alfabetos. [UTS #39](https://www.unicode.org/reports/tr39/) puede servir para construir variantes, pero no debe convertirse en una sustitución combinatoria ilimitada. Se deben priorizar las mezclas observadas en alias, mensajes o nombres de usuario.

Hashcat 8 incluye tablas para reproducir contraseñas escritas con una distribución de teclado distinta. Por ejemplo, una palabra rusa introducida con el teclado estadounidense puede transformarse mediante una tabla de distribución. [Documentación oficial de los ataques por tablas](https://github.com/hashcat/hashcat/blob/master/docs/hashcat-table.md).

## Por qué fallan las máscaras y reglas tradicionales

La máscara `-a 3` ha trabajado históricamente por posiciones de un byte. Una letra cirílica UTF-8 suele necesitar dos bytes; numerosos emoji necesitan cuatro o más. Por tanto:

```text
longitud visual ≠ puntos de código ≠ clústeres de grafemas ≠ bytes
```

El motor de reglas también sigue siendo fundamentalmente byte-oriented. Las operaciones de añadir o insertar pueden emitir caracteres UTF-8, pero consumen una operación por byte. Las sustituciones, posiciones y recortes pueden actuar en mitad de una secuencia multibyte. [Documentación actual del motor de reglas](https://github.com/hashcat/hashcat/blob/master/docs/rules.txt).

Esta limitación explica por qué una regla equivalente a “cambiar una letra latina por una letra árabe” puede fallar o generar datos inválidos. La alternativa estable es el ataque por tablas:

```text
# unicode.table; las columnas están separadas por una tabulación real
heart	❤️
heart	❤
a	а
1	١
```

```bash
hashcat -m <modo> -a 5 hashes.txt palabras.txt unicode.table
```

En `-a 5`, tanto el origen como el reemplazo pueden contener varios bytes y tener longitudes diferentes. Esto permite cambiar palabras completas por emoji, hacer transliteraciones o reproducir distribuciones de teclado.

## Token Mask: la aportación más reciente

El nuevo modo `-a 13`, desarrollado por Chick3nman, cambia la unidad fundamental de una máscara. Un charset personalizado deja de ser únicamente una colección de bytes y puede ser un fichero de cadenas o tokens.

Si `arabic.tokens` contiene un token UTF-8 por línea:

```text
ا
ب
ت
ث
```

entonces:

```bash
hashcat -m <modo> -a 13 -1 arabic.tokens hashes.txt '?1?1?1?1'
```

describe cuatro posiciones lingüísticas, no cuatro bytes. Cada posición puede contener:

- Una letra multibyte.
- Un clúster con diacríticos.
- Una sílaba.
- Una palabra completa.
- Un emoji simple.
- Una secuencia emoji con ZWJ.

Para inspeccionar primero los candidatos:

```bash
hashcat -a 13 --stdout -1 emoji.tokens -l 20 '?1?1' | xxd -p
```

La implementación utiliza el motor de dispositivo de PCFG para amplificar en GPU los hashes rápidos. Los hashes lentos, `--stdout` y `--slow-candidates` utilizan el motor del host. Incluye conjuntos predefinidos para emoji, cirílico, griego, hebreo, árabe, kana japonés y diacríticos latinos. También admite reglas, incremento, `--skip`, `--limit` y restauración. [PR oficial #5156](https://github.com/hashcat/hashcat/pull/5156).

A la fecha de este artículo:

- `-a 13` está integrado en `master` desde el commit de fusión `a25cea2`.
- Todavía es posterior a la versión estable 8.0.0.
- No admite múltiples máscaras en la misma ejecución ni ficheros `.hcmask`.
- Para uso pericial debe fijarse el commit exacto, compilarse de forma reproducible y validarse antes con vectores conocidos.

No debe confundirse esta mejora con una capacidad para detectar el idioma del hash: mejora la generación de candidatos, no revela el plaintext.

## Metodología propuesta para FF.CC.S.E.

### 1. Reconstruir la canalización criptográfica

Antes de lanzar Hashcat hay que documentar:

```text
entrada del usuario
→ normalización o case folding
→ codificación
→ truncado o límites
→ sal y parámetros
→ KDF o función hash
→ serialización almacenada
```

Cuando exista incertidumbre, debe crearse un vector conocido en una copia de la misma aplicación o versión. Una contraseña de prueba con acentos, árabe y emoji permite observar qué bytes llegan realmente al KDF.

### 2. Crear un inventario Unicode de evidencias

Cada cadena relevante debería registrarse con:

- Texto original.
- Puntos de código.
- Clústeres de grafemas.
- Hexadecimal UTF-8 y, cuando proceda, UTF-16LE.
- Forma de normalización.
- Fuente del término.
- Teclado o método de entrada probable.
- Transformaciones aplicadas.

Para bytes difíciles de representar, una wordlist puede utilizar entradas `$HEX[...]`:

```text
$HEX[636166c3a9]
$HEX[63616665cc81]
$HEX[e29da4efb88f]
```

Esto evita que un editor normalice o elimine silenciosamente caracteres invisibles.

### 3. Usar una escalera de ataques

Orden recomendado:

1. Candidatos exactos obtenidos de la evidencia.
2. Diccionario contextual con NFC/NFD y variantes justificadas.
3. Tablas de teclado, transliteración y sustituciones multibyte.
4. PCFG con términos contextuales.
5. Asociación por cuenta.
6. Token Mask limitado por idioma, longitud y estructura.
7. Fuerza bruta amplia sólo como último recurso.

Hashcat 8 permite que PCFG (`-a 4`) combine patrones aprendidos con pistas específicas. Es adecuado para nombres, fechas, localidades y hábitos previamente observados. No obstante, sus filtros de máscara siguen contando posiciones en bytes cuando se entrenan corpus no ASCII. [Documentación PCFG](https://github.com/hashcat/hashcat/blob/master/docs/hashcat-pcfg.md).

### 4. Construir un “retículo de variantes”, no un diccionario gigante

Una técnica prometedora consiste en representar cada término como un grafo de transformaciones:

```text
término original
├── NFC / NFD
├── mayúsculas y minúsculas válidas
├── transliteración
├── teclado alternativo
├── dígitos ASCII / árabes / persas
├── confusables observados
└── emoji semánticamente asociados
```

Cada arista debe tener:

- Justificación.
- Probabilidad o prioridad.
- Identificador reproducible.
- Límites de expansión.

Las transformaciones pueden ejecutarse mediante tablas, PCFG o Token Mask. Esto preserva la semántica y evita un producto cartesiano incontrolable.

### 5. Crear perfiles por idioma y método de entrada

Un modelo “Unicode global” es poco útil. Resulta más eficaz mantener perfiles separados:

- Español y catalán con diacríticos.
- Árabe magrebí y teclados AZERTY/árabe.
- Cirílico con equivalencias RU/US.
- Persa con dígitos extendidos.
- Emoji procedentes de teclados iOS, Android o aplicaciones concretas.
- Japonés por kana, romaji e IME.

Los perfiles no deben mezclarse entre investigaciones sin una base legal y técnica. También debe evitarse contaminar modelos con contraseñas procedentes de otro caso.

### 6. Validar la cobertura antes del ataque

El hecho de que una regla “parezca correcta” no garantiza que produzca los bytes esperados. Debe comprobarse con:

- `--stdout` sobre una muestra pequeña.
- `xxd` o una herramienta equivalente.
- `--lookup` en Hashcat 8 para determinar si el ataque alcanza un candidato conocido.
- Un hash sintético calculado con la misma canalización.
- Una segunda implementación independiente.

Un resultado negativo debe formularse como:

> No se recuperó la contraseña dentro del espacio de candidatos, transformaciones y tiempo documentados.

Nunca como:

> La contraseña no contiene árabe o emoji.

### 7. Tratar las optimizaciones como una variable pericial

`-O` activa kernels optimizados, pero puede reducir la longitud máxima admitida. Una secuencia emoji visualmente corta puede exceder rápidamente un límite en bytes. Ante un resultado negativo, debe verificarse el límite del modo y repetirse una muestra con el kernel puro.

Tampoco debería utilizarse `--force` para ignorar advertencias en un proceso destinado a producir resultados periciales.

## Líneas de avance

Las mejoras con mayor impacto para unidades policiales no consisten necesariamente en añadir más GPU, sino en reducir el espacio de búsqueda con mejores modelos:

- **Tokenización por grafemas:** generar tokens mediante UAX #29 y conservar secuencias emoji completas.
- **Fingerprinting de aplicaciones:** mantener una biblioteca validada de cómo cada versión normaliza, codifica y trunca contraseñas.
- **Modelos PCFG por jurisdicción e idioma:** entrenados con datos legalmente obtenidos, anonimizados y con procedencia documentada.
- **Aprendizaje dentro del caso:** reponderar patrones recuperados sin trasladarlos a otras investigaciones.
- **Harness de conformidad Unicode:** probar automáticamente NFC/NFD, RTL, controles invisibles, emoji y kernels puros/optimizados.
- **Generación asistida por IA con manifestación determinista:** una IA puede proponer términos, pero la lista final debe congelarse, cifrarse, hashearse y ser reproducible. No deben enviarse datos del caso a servicios externos no autorizados.
- **Métricas de cobertura:** informar qué alfabetos, grafemas, longitudes y transformaciones se probaron, no sólo las horas de GPU.

## Cadena de custodia y documentación

El análisis debe realizarse sobre una copia de trabajo. Deben conservarse:

- Hash SHA-256 de la evidencia y de los ficheros derivados.
- Versión o commit exacto de Hashcat.
- Hash del binario empleado.
- Drivers y dispositivos.
- Línea de comandos completa.
- Wordlists, tablas y tokensets con su SHA-256.
- Hora de inicio y finalización.
- Keyspace declarado y realmente recorrido.
- Potfile, logs y resultados en hexadecimal.
- Método independiente de confirmación.

SWGDE recomienda evitar el examen directo de la evidencia original, documentar las herramientas y archivar los logs del software forense. [Best Practices for Computer Forensic Examinations](https://www.swgde.org/documents/published-complete-listing/18-f-001-2/). NIST recomienda preservar la cadena de custodia y almacenar por separado hashes de integridad calculados con algoritmos aprobados. [NIST IR 8387](https://nvlpubs.nist.gov/nistpubs/ir/2022/NIST.IR.8387.pdf).

## Conclusión

La principal dificultad de las contraseñas Unicode no es la potencia de cálculo, sino determinar qué secuencia exacta de bytes introdujo la persona y cómo la transformó la aplicación. Las máscaras byte a byte, las reglas clásicas y la representación visual del terminal ocultan esta diferencia.

Hashcat 8 aporta tablas multibyte, PCFG, asociación y mejores herramientas de validación. El nuevo Token Mask de Chick3nman completa una pieza importante: permite que una posición represente una letra árabe, un grafema cirílico, una sílaba o un emoji completo y mantiene la aceleración en GPU para hashes rápidos.

Para las FF.CC.S.E., el avance real está en combinar esta capacidad con lingüística, análisis del método de entrada, reconstrucción de la aplicación y una metodología reproducible. El objetivo no debe ser probar más candidatos, sino probar antes los candidatos correctos.
