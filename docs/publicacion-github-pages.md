# Publicación en GitHub Pages

Procedimiento completo para publicar el sitio y comprobar que la publicación ha funcionado.

## 1. Activar GitHub Pages (solo la primera vez)

1. Entra en el repositorio en GitHub.
2. **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
   No elijas «Deploy from a branch»: este proyecto se compila antes de publicarse.
4. No hace falta tocar nada más. No hay que crear ramas `gh-pages` ni configurar secretos.

## 2. Lanzar la publicación

Cualquiera de estas dos vías:

- **Automática.** Incorpora un cambio a la rama `main`. El flujo de trabajo se ejecuta solo.
- **Manual.** **Actions → Publicar en GitHub Pages → Run workflow**.

## 3. Seguir el despliegue

En la pestaña **Actions** verás la ejecución en curso. Tiene dos fases:

1. **Construir y comprobar.** Instala dependencias, compila el sitio y ejecuta la comprobación
   de enlaces. **Si hay un enlace roto o una imagen que falta, el flujo se detiene aquí y no se
   publica nada.** Es deliberado: es preferible que el sitio se quede como estaba a que se
   publique roto.
2. **Publicar.** Sube el resultado a GitHub Pages.

## 4. Comprobar que la publicación es correcta

Cuando el flujo termine en verde:

1. La dirección publicada aparece en el resumen de la ejecución, en el recuadro del entorno
   `github-pages`. También en **Settings → Pages**.
2. Abre esa dirección y revisa:
   - La portada carga con sus tipografías e imágenes.
   - El menú funciona y lleva a cada sección.
   - En una pantalla estrecha, el botón **Menú** despliega la navegación.
   - Una página interior, por ejemplo `/manifiesto/`, se ve correctamente.
   - `/sitemap.xml`, `/robots.txt` y `/actualidad/feed.xml` responden.
   - Una dirección inventada, por ejemplo `/no-existe/`, muestra la página de error propia.

## 5. Si algo falla

| Síntoma | Causa habitual | Solución |
|---|---|---|
| La web se ve sin estilos | Se publicó sin el prefijo de ruta correcto | Revisa en **Settings → Pages** que el origen sea **GitHub Actions** y vuelve a lanzar el flujo |
| Error 404 en toda la web | Pages no está activado | Repite el paso 1 |
| El flujo se detiene en «Comprobar enlaces» | Hay un enlace o un recurso roto | Lee el mensaje de error: indica la página y el enlace concreto |
| Los cambios no aparecen | El navegador guarda la versión anterior | Recarga forzando la actualización (`Ctrl+Mayús+R`) |
| Aviso sobre la dirección canónica | El campo `url` de `src/_datos/sitio.json` no coincide con la dirección real | Corrige ese campo |

## 6. Cambiar de dirección

Si cambia el nombre del repositorio o se adopta un dominio propio, hay que actualizar el campo
`url` de `src/_datos/sitio.json`. El flujo de trabajo avisa si detecta que no coincide con el
lugar real de publicación. El procedimiento del dominio propio está en el README.

## Qué no puede hacer GitHub Pages

Conviene tenerlo presente al planificar nuevas funciones:

| Se puede | No se puede |
|---|---|
| Publicar páginas, documentos e imágenes | Procesar formularios |
| Generar páginas a partir de archivos de contenido | Guardar datos enviados por quien visita la web |
| Enlazar servicios externos de inscripción | Autenticar personas usuarias |
| Ofrecer un canal de novedades | Enviar correos |
| Publicar buscadores que funcionen en el navegador | Consultar una base de datos |

Todo lo de la columna derecha necesita un servicio externo o infraestructura institucional. La
recomendación del proyecto es recurrir a servicios de la Universidad de Almería siempre que haya
que recoger datos personales.
