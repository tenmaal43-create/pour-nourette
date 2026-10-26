/* ============================================================
   ✏️  TOUT LE CONTENU DU SITE EST ICI
   Tu peux modifier les textes sans toucher au reste du code.
   ============================================================ */
/* Toutes tes photos au même endroit (noms de fichiers sans extension : le site trouve .jpg, .png, etc.).
   Les majuscules doivent correspondre exactement aux noms dans assets/photos/. */
var PHOTOS = {
  enfant: { src: "assets/photos/enfantNour",  legende: "Nourette, version miniature" },
  bac:    { src: "assets/photos/NourBac",     legende: "Madame la diplômée" },
  bogos:  { src: "assets/photos/NourBogoss",   legende: "Magnifique, tout simplement" },
  roses:  { src: "assets/photos/Roses",       legende: "Des fleurs pour toi" },
  cinoch: { src: "assets/photos/Cinoch",      legende: "Séance ciné" },
  coeur:  { src: "assets/photos/coeurNour",   legende: "Notre cœur" },
  cacher: { src: "assets/photos/NourCacher",  legende: "Nourette se cache" },
  duo:    { src: "assets/photos/nourKhaoula", legende: "Nourette & Khaoula" },
  pyjama: { src: "assets/photos/NourPyjama",  legende: "Soirée pyjama" },
  nous:   { src: "assets/photos/nousDeux",    legende: "Nous deux" },
  voile:  { src: "assets/photos/Voile1",      legende: "Un beau souvenir" }
};

window.CONFIG = {

  /* Écran d'accueil (<br> = retour à la ligne) */
  titre: "JOYEUX<br>ANNIVERSAIRE<br>NOURETTE",

  /* Niveau 2 : gachapon. Une capsule = soit une photo + un mot, soit un bon cadeau.
       { photo: PHOTOS.xxx, texte: "..." }      -> capsule photo
       { titre: "UN APPEL", texte: "..." }       -> capsule bon cadeau
     L'ordre ci-dessous est l'ordre d'ouverture. */
  gacha: [
    { photo: PHOTOS.enfant, texte: "Nourette, version miniature. (Spoiler : tu as à peine grandi.)" },
    { titre: "UN APPEL VIDÉO", texte: "Bon pour un appel de 3 heures, (ou plus vu les potins...). Ça fait trop longtemps, on doit tout rattraper !" },
    { photo: PHOTOS.bac, texte: "Madame est diplômée. Applaudissements dans la salle ! ( PS : tu me dragues comme ca ! ) " },
    { photo: PHOTOS.roses, texte: "Mes premières roses et c'est toi qui me les as offertes j'oublierais jamais !" },
    { titre: "UN MARI SÉLECTIONNÉ PAR MOI", texte: "Bon pour le mari que JE choisis pour toi.  CV à déposer. (la vie c'est plus facile de trouver une alternance) " },
    { photo: PHOTOS.bogos, texte: "Rappel officiel : tu es magnifique. Ne l’oublie jamais." },
    { titre: "UNE DATE À TON RETOUR", texte: "Bon pour une sortie rien que toutes les deux dès que tu rentres ! (sans tes autres copines...)" }
  ],

  /* Niveau 3 : memory. On met autant de photos que tu veux ici :
     à chaque partie, 6 photos sont tirées au hasard (donc 12 cartes). */
  memoire: [PHOTOS.coeur, PHOTOS.cacher, PHOTOS.duo, PHOTOS.pyjama, PHOTOS.nous, PHOTOS.voile, PHOTOS.cinoch],

  /* Album final, affiché sous la lettre : toutes les photos, dans l'ordre voulu. */
  album: [PHOTOS.enfant, PHOTOS.bac, PHOTOS.coeur, PHOTOS.nous, PHOTOS.duo, PHOTOS.pyjama, PHOTOS.cacher, PHOTOS.cinoch, PHOTOS.bogos, PHOTOS.roses, PHOTOS.voile],

  /* Niveau 4 : la lettre. Un paragraphe = une entrée, sans limite de longueur. */
  salutation: "Chère Nourette 💖",

  lettre: [
    "La prunelle de mes oeils, oui oui, de mes oeils.",

    "Tu le sais déjà, tu es ma petite fille que j’aime d’amour. Tes 20 ans, c’est beaucoup pour mon cœur de maman...",

    "(Dans tous les cas, même à 20 ans, tu fais toujours 1m20, donc on va dire que ça compense, BEHHH 😜)",

    "Enfin bref, je tenais à te remercier pour tout ce que tu as fait pour moi. Peut-être que tu ne le sais pas, mais ta présence (même à des milliers de kilomètres , parce que madame a voulu fuir le pays sans m’emmener avec elle... azy, tranquille 😒) m’a été très bénéfique. Tu as même été bien plus présente que des personnes physiquement présentes, ON TAIRA LE NOM .",

    "Sans parler du fait que tu as beaucoup changé la perception que j’ai de moi-même. Grâce à toi, j’ai surmonté une des épreuves les plus compliquées de ma vie, et tu le sais déjà.",

    "En fait, tu as été présente dans presque tous mes bas et, bien évidemment, dans tous mes hauts. J’espère que tu continueras à être dans ma vie, que ce soit dans mes hauts ou dans mes bas. Tu sais déjà comment je suis : une grosse dépressive de la vie.",

    "Bref, ne change pas, s’il te plaît. T’es la seule chose dans ma vie qui n’a pas changé, alors reste comme tu es : douce, naturelle, passionnée, magnifique, pure, attentionnée, et surtout continue de m’aimer (de toute façon, t’as intérêt 😤).",

    "Bref, sans plus tarder : tu connais ces trucs de lettres, c’est pas pour moi de base, alors je t’ai fait ce petit cadeau qui vient tout droit de notre monde (geek jusqu’au bout), à défaut d’un vrai cadeau physique. Mais dans tous les cas, ton cadeau t’attend dès que tu rentres !!!",

    "Joyeux anniversaire encore, mon p’tit cœur 🥳, profite bien de ta vie. Qu’Allah te donne tant de raisons de sourire que tu auras plein de rides de sourire, tu vas voir !",

    "Qu’Allah te préserve et t’accorde ce que tu souhaites le plus au monde. Qu’Allah t’accorde un bon époux (que je ne détesterai pas cette fois-ci, s’il te plaît ), une bonne descendance (JE RIGOLE PAS AVEC MES NEVEUX, HEIN ), une bonne réussite scolaire ainsi que dans tes projets futurs (pitié, viens, on ouvre un commerce d’abayas).",

    "Et surtout, qu’Allah te préserve et te garde auprès de moi, mon petit bébé d’amour... 🤍"
  ],

  /* \n = retour à la ligne */
  signature: "Mucho love,\nTa Kakahouette 🦉"
};
