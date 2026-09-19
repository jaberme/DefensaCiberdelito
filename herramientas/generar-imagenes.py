#!/usr/bin/env python3
"""Genera los recursos graficos del sitio a partir del emblema original.

Entrada : recursos-originales/logoSeminario.jpeg
Salidas : src/assets/img/*.png  y  src/assets/img/og-seminario.jpg

El emblema original es un JPEG con el rotulo incrustado y fondo blanco opaco.
Este script recorta el simbolo circular, sustituye el fondo blanco por
transparencia (relleno por difusion desde los bordes, no por luminancia, para
no perder las formas claras del interior) y produce los tamanos que usa la web.

Requisitos: Python 3 con Pillow. Solo hay que volver a ejecutarlo si cambia el
emblema de partida; los resultados se versionan en el repositorio.

    python3 herramientas/generar-imagenes.py
"""
from pathlib import Path
import io
import urllib.request

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import numpy as np

RAIZ = Path(__file__).resolve().parent.parent
ORIGEN = RAIZ / "recursos-originales" / "logoSeminario.jpeg"
DESTINO = RAIZ / "src" / "assets" / "img"
CACHE = RAIZ / ".cache-tipografias"

AZUL_PROFUNDO = (11, 31, 58)
AZUL_MEDIO = (16, 42, 76)
AZUL_CLARO = (143, 180, 232)
AZUL_ACENTO = (46, 139, 255)

TIPOGRAFIAS = {
    "serif": "https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf",
    "sans": "https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf",
}


def tipografia(clave):
    CACHE.mkdir(exist_ok=True)
    ruta = CACHE / f"{clave}.ttf"
    if not ruta.exists():
        pet = urllib.request.Request(TIPOGRAFIAS[clave], headers={"User-Agent": "curl/8"})
        ruta.write_bytes(urllib.request.urlopen(pet, timeout=60).read())
    return ruta


def fuente(clave, tam, peso, opsz=None):
    f = ImageFont.truetype(str(tipografia(clave)), tam)
    f.set_variation_by_axes([peso, opsz] if opsz else [peso])
    return f


def extraer_emblema():
    """Recorta el simbolo y le da fondo transparente."""
    src = Image.open(ORIGEN).convert("RGB")
    # Filas 40..860 del original: el simbolo circular, sin el rotulo inferior.
    emb = src.crop((0, 40, src.width, 860))

    mascara = emb.convert("L")
    ancho, alto = mascara.size
    vertices = [(0, 0), (ancho - 1, 0), (0, alto - 1), (ancho - 1, alto - 1),
                (ancho // 2, 0), (ancho // 2, alto - 1)]
    for punto in vertices:
        ImageDraw.floodfill(mascara, punto, 0, thresh=26)

    alfa = np.where(np.array(mascara, dtype=np.uint8) == 0, 0, 255).astype(np.uint8)
    alfa = Image.fromarray(alfa, "L").filter(ImageFilter.GaussianBlur(0.6))

    rgba = emb.convert("RGBA")
    rgba.putalpha(alfa)
    rgba = rgba.crop(rgba.getbbox())

    lado = max(rgba.size)
    lienzo = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    lienzo.paste(rgba, ((lado - rgba.width) // 2, (lado - rgba.height) // 2), rgba)
    return lienzo


def comprimir_png(img, ruta, colores=256):
    """Reduce la paleta conservando el canal alfa. Recorta mucho el peso sin
    perdida visible en un emblema de gama azul muy acotada."""
    img.quantize(colors=colores, method=Image.FASTOCTREE).save(ruta, optimize=True)


def guardar_escalado(emblema, tam, nombre):
    comprimir_png(emblema.resize((tam, tam), Image.LANCZOS), DESTINO / nombre)


def icono_apple(emblema):
    """Icono de 180 px con fondo solido: iOS no respeta la transparencia."""
    fondo = Image.new("RGB", (180, 180), (255, 255, 255))
    marca = emblema.resize((152, 152), Image.LANCZOS)
    fondo.paste(marca, (14, 14), marca)
    fondo.save(DESTINO / "icono-180.png", optimize=True)


def imagen_social(emblema):
    """Tarjeta 1200x630 para Open Graph y Twitter Card."""
    ancho, alto = 1200, 630
    lienzo = Image.new("RGB", (ancho, alto), AZUL_PROFUNDO)

    # Degradado diagonal muy leve, de azul profundo a azul medio.
    grad = np.zeros((alto, ancho, 3), dtype=np.float32)
    ejeY = np.linspace(0, 1, alto)[:, None]
    ejeX = np.linspace(0, 1, ancho)[None, :]
    t = np.clip((ejeX * 0.65 + ejeY * 0.35), 0, 1)
    for i in range(3):
        grad[:, :, i] = AZUL_PROFUNDO[i] + (AZUL_MEDIO[i] - AZUL_PROFUNDO[i]) * t
    lienzo = Image.fromarray(grad.astype(np.uint8), "RGB")

    d = ImageDraw.Draw(lienzo)
    d.rectangle([0, 0, 8, alto], fill=AZUL_ACENTO)

    marca = emblema.resize((236, 236), Image.LANCZOS)
    lienzo.paste(marca, (84, 197), marca)

    x = 384
    f_eyebrow = fuente("sans", 25, 600)
    f_titulo = fuente("serif", 62, 600, 60)
    f_pie = fuente("sans", 27, 400)

    d.text((x, 186), "S E M I N A R I O   P E R M A N E N T E", font=f_eyebrow, fill=AZUL_CLARO)
    y = 232
    for linea in ["Seguridad Nacional,", "Sociedad Digital", "y Ciberdelito"]:
        d.text((x, y), linea, font=f_titulo, fill=(255, 255, 255))
        y += 76
    d.line([(x, y + 26), (x + 96, y + 26)], fill=AZUL_ACENTO, width=3)
    d.text((x, y + 48), "Conocimiento · Cooperación · Servicio público",
           font=f_pie, fill=(176, 197, 228))

    lienzo.save(DESTINO / "og-seminario.jpg", quality=86, optimize=True, progressive=True)


def main():
    if not ORIGEN.exists():
        raise SystemExit(f"No se encuentra el emblema original en {ORIGEN}")
    DESTINO.mkdir(parents=True, exist_ok=True)

    emblema = extraer_emblema()
    # 512 px es el tamano mayor que necesita la web (cabecera a 3x y usos futuros).
    comprimir_png(emblema.resize((512, 512), Image.LANCZOS), DESTINO / "emblema.png")
    for tam in (256, 128, 96, 64, 48, 32):
        guardar_escalado(emblema, tam, f"emblema-{tam}.png")
    (DESTINO / "emblema-32.png").rename(DESTINO / "favicon-32.png")
    (DESTINO / "emblema-48.png").rename(DESTINO / "favicon-48.png")
    icono_apple(emblema)
    imagen_social(emblema)

    for f in sorted(DESTINO.iterdir()):
        print(f"  {f.name:24s} {f.stat().st_size / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
