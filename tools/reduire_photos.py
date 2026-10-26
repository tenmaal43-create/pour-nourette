#!/usr/bin/env python3
"""
Réduit le poids des photos de assets/photos/ pour que le site charge vite.

Utilisation (depuis le dossier du projet) :
    pip install pillow
    python tools/reduire_photos.py

- Chaque photo est réduite à 900 px max de côté et enregistrée en .jpg (qualité 82).
- Le NOM reste identique (NourBac.png devient NourBac.jpg) : config.js n'a pas à changer.
- Les originaux sont d'abord copiés dans le dossier assets/photos_originales/ (à ne PAS mettre en ligne).
- Les fichiers .heic (iPhone) ne sont pas lus : exporte-les d'abord en .jpg.
"""
import shutil
from pathlib import Path
from PIL import Image, ImageOps

DOSSIER = Path(__file__).resolve().parent.parent / "assets" / "photos"
SAUVEGARDE = DOSSIER.parent / "photos_originales"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_PX = 900

SAUVEGARDE.mkdir(exist_ok=True)
total_avant = total_apres = 0

for f in sorted(DOSSIER.iterdir()):
    if f.suffix.lower() not in EXTS:
        continue
    avant = f.stat().st_size
    shutil.copy2(f, SAUVEGARDE / f.name)
    img = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    img.thumbnail((MAX_PX, MAX_PX))
    sortie = f.with_suffix(".jpg")
    img.save(sortie, "JPEG", quality=82, optimize=True)
    if sortie != f:
        f.unlink()
    apres = sortie.stat().st_size
    total_avant += avant
    total_apres += apres
    print(f"{f.name:28s} {avant/1024:7.0f} Ko -> {apres/1024:5.0f} Ko  ({sortie.name})")

print(f"\nTotal : {total_avant/1024/1024:.1f} Mo -> {total_apres/1024/1024:.1f} Mo")
