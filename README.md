# 💌 Site cadeau pour Nourette

Un petit jeu d'arcade pixel rose en 4 niveaux, qui se termine par la lettre et un album photo :
1. **Attrape 8 cœurs** avec le chat
2. **Gachapon** : 7 capsules (photos avec légende + bons cadeaux)
3. **Memory** : 6 paires de photos tirées au hasard à chaque partie
4. **La lettre**, écrite à la plume, signée, puis **l'album** de toutes les photos

Aucune dépendance, aucun build : HTML/CSS/JS pur.

## Structure

```
nourette/
├── index.html            page unique
├── css/style.css         look rose pixel
├── js/config.js          ✏️ TOUS LES TEXTES ET LES PHOTOS
├── js/game.js            logique du jeu
├── assets/photos/        tes photos
└── tools/reduire_photos.py   réduit le poids des photos (voir plus bas)
```

## Modifier le contenu : `js/config.js`

- `PHOTOS` : la liste de toutes tes photos, avec leur légende. Les noms de fichiers se mettent **sans extension** (le site trouve tout seul `.jpg`, `.png`, `.webp`…), mais les **majuscules doivent être exactes** (`NourBac` n'est pas `nourbac`).
- `gacha` : les capsules, dans l'ordre d'ouverture. Deux modèles :
  - photo : `{ photo: PHOTOS.bac, texte: "…" }`
  - bon cadeau : `{ titre: "UN APPEL VIDÉO", texte: "…" }`
- `memoire` : les photos du memory. Mets-en autant que tu veux : 6 sont tirées au hasard à chaque partie.
- `album` : les photos de l'album final, dans l'ordre voulu.
- `lettre` : un paragraphe par ligne, sans limite de longueur (le papier s'agrandit).
- `salutation`, `signature` (`\n` = retour à la ligne), `titre` de l'accueil.

### Ajouter une nouvelle photo
1. Copie-la dans `assets/photos/`.
2. Ajoute une ligne dans `PHOTOS` : `maphoto: { src: "assets/photos/NomDuFichier", legende: "Ma légende" },`
3. Ajoute `PHOTOS.maphoto` dans `memoire` et/ou `album` (ou dans une capsule).

Si une photo est introuvable, une petite icône pixel la remplace (dans l'album, elle est simplement masquée) : rien ne casse.

## Alléger les photos (important)

Les photos de téléphone pèsent souvent 3 à 5 Mo. Pour que le site charge vite (au Qatar comme en France) :

```bash
pip install pillow
python tools/reduire_photos.py
```

Le script réduit chaque photo à 900 px et la convertit en `.jpg`, avec le même nom. Tes originaux sont copiés dans `assets/photos_originales/` : **supprime ou ne mets pas ce dossier en ligne**. Les `.heic` (iPhone) ne sont pas lus : exporte-les d'abord en `.jpg`.

## Tester en local

```bash
cd nourette
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Mettre en ligne (gratuit)

### GitHub Pages
1. Crée un dépôt (ex. `pour-nourette`) et envoie-y le **contenu** du dossier (`index.html` à la racine).
2. **Settings → Pages → Deploy from a branch → `main` / `(root)`**.
3. Le site est sur `https://TON-PSEUDO.github.io/pour-nourette/` (compte 5 à 10 minutes).

⚠️ Avec un compte gratuit, le dépôt doit être **public** : la lettre et les photos sont alors visibles par quiconque trouve ton dépôt.

### Netlify Drop (sans dépôt public)
Va sur https://app.netlify.com/drop et glisse le dossier `nourette` entier : tu obtiens un lien en une minute.

## Bon à savoir

- La page contient `noindex` : elle n'apparaîtra pas dans Google.
- Les polices viennent de Google Fonts (internet requis ; sinon des polices de secours prennent le relais).
- Les sons sont de petits bips générés par le navigateur, avec un bouton pour les couper.
- Teste sur ton téléphone avant d'envoyer le lien, et dis-lui d'activer le son 🔊.
