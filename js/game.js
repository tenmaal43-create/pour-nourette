(function () {
"use strict";

var $ = function (i) { return document.getElementById(i); };
var RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
var cols = ["#ff5d8f", "#ff8fb1", "#b79ced", "#ffd96b", "#8fe3c8"];
var C = window.CONFIG;

/* ---------- sprites pixel-art ---------- */
function spr(rows, pal, s) {
  var c = document.createElement("canvas"), w = rows[0].length;
  c.width = w * s; c.height = rows.length * s;
  var x = c.getContext("2d");
  rows.forEach(function (r, j) {
    for (var i = 0; i < w; i++) {
      var k = r[i];
      if (pal[k]) { x.fillStyle = pal[k]; x.fillRect(i * s, j * s, s, s); }
    }
  });
  return c;
}
var CAT = ["XX.......XX","XXX.....XXX","XXXXXXXXXXX","XXEXXXXXEXX","XXXXXNXXXXX","XPPXXXXXPPX",".XXXXXXXXX.","..XXXXXXX.."];
var CP = { X: "#fff6f8", E: "#3B2A22", N: "#e0607e", P: "#f7a8b8" };
var HT = [".XX.XX.","XXXXXXX","XXXXXXX",".XXXXX.","..XXX..","...X..."];
var ST = ["...X...","..XXX..","XXXXXXX",".XXXXX.","..XXX..",".XX.XX.","X.....X"];
var FL = ["..XXX..",".XXXXX.","XXXYXXX","XXXXXXX",".XXXXX.","..XXX..","...G..."];
var cat = spr(CAT, CP, 4), heart = spr(HT, { X: "#ff5d8f" }, 3);

/* ---------- sons 8-bit ---------- */
var snd = true, AC;
$("snd").onclick = function () {
  snd = !snd;
  $("snd").textContent = "SON : " + (snd ? "OUI" : "NON");
  $("snd").setAttribute("aria-pressed", snd);
};
function chime(freqs) {
  if (!snd) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach(function (h, i) {
      var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i * 0.09;
      o.type = "square"; o.frequency.value = h;
      o.connect(g); g.connect(AC.destination);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.start(t); o.stop(t + 0.3);
    });
  } catch (e) {}
}

/* ---------- pluie de cœurs ---------- */
function rain(k) {
  if (RM) return;
  for (var i = 0; i < k; i++) {
    var e = document.createElement("div");
    e.className = "pt";
    e.textContent = "♥";
    e.style.left = Math.random() * 100 + "vw";
    e.style.color = cols[i % 5];
    e.style.fontSize = (10 + Math.random() * 12) + "px";
    e.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    e.style.animationDuration = (3 + Math.random() * 4) + "s";
    e.style.animationDelay = (Math.random() * 1.5) + "s";
    document.body.appendChild(e);
    setTimeout(function (x) { x.remove(); }, 9000, e);
  }
}

/* ---------- chargement d'une photo (essaie plusieurs extensions) ---------- */
var EXTS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];
function photo(src, alt, onfail) {
  var im = new Image(), i = 0, hasExt = /\.[a-z0-9]{3,4}$/i.test(src);
  im.alt = alt || "";
  im.onerror = function () {
    if (!hasExt && i < EXTS.length) { im.src = src + EXTS[i++]; }
    else { im.onerror = null; if (onfail) onfail(); }
  };
  im.src = hasExt ? src : src + EXTS[i++];
  return im;
}

/* ---------- navigation entre niveaux ---------- */
function go(n) {
  document.querySelectorAll(".st").forEach(function (s) { s.classList.toggle("on", s.id === "s" + n); });
  $("sg").textContent = "STAGE " + n + "/4";
  window.scrollTo(0, 0);
  if (n === 3) memo();
  if (n === 4) letter();
}

/* ---------- écran titre ---------- */
$("ti").innerHTML = C.titre;
var big = spr(CAT, CP, 8);
$("ct").replaceWith(big);
$("start").onclick = function () { chime([523, 659, 784]); go(1); startHearts(); };

/* ---------- niveau 1 : attrape les cœurs ---------- */
var cv = $("g1"), cx = cv.getContext("2d");
var W = 300, H = 220, playing = false, px = 150, hs = [], score = 0, frame = 0, GOAL = 8;

function drawHearts() {
  cx.clearRect(0, 0, W, H);
  hs.forEach(function (h) { cx.drawImage(heart, h.x - 10, h.y); });
  cx.drawImage(cat, px - 22, H - 36);
}
function startHearts() {
  score = 0; hs = []; frame = 0; playing = true;
  $("sc").textContent = "♥ 0/" + GOAL;
  loopHearts();
}
function loopHearts() {
  if (!playing) return;
  frame++;
  if (frame % 36 === 0) hs.push({ x: 20 + Math.random() * (W - 40), y: -16 });
  hs.forEach(function (h) { h.y += 1.8; });
  hs = hs.filter(function (h) {
    if (h.y > H - 34 && Math.abs(h.x - px) < 28) {
      score++; chime([880, 1175]);
      $("sc").textContent = "♥ " + score + "/" + GOAL;
      return false;
    }
    return h.y < H;
  });
  drawHearts();
  if (score >= GOAL) {
    playing = false; rain(18); chime([523, 659, 784, 1047]);
    $("sc").textContent = "NIVEAU RÉUSSI !";
    setTimeout(function () { go(2); }, 1300);
    return;
  }
  requestAnimationFrame(loopHearts);
}
function moveCat(e) {
  var r = cv.getBoundingClientRect();
  px = Math.max(22, Math.min(W - 22, (e.clientX - r.left) * W / r.width));
}
cv.addEventListener("pointermove", moveCat);
cv.addEventListener("pointerdown", moveCat);
addEventListener("keydown", function (e) {
  if (!playing) return;
  if (e.key === "ArrowLeft") px = Math.max(22, px - 18);
  if (e.key === "ArrowRight") px = Math.min(W - 22, px + 18);
});

/* ---------- niveau 2 : gachapon ---------- */
var GM = C.gacha, gi = 0, rot = 0;
function showCapsule(it) {
  var box = $("gcard");
  box.innerHTML = "";
  if (it.photo) {
    var f = document.createElement("figure"); f.className = "gimg";
    var im = photo(it.photo.src, it.photo.legende, function () { im.replaceWith(icon(gi)); });
    f.appendChild(im); box.appendChild(f);
  } else {
    var t = document.createElement("div"); t.className = "ticket";
    var s = document.createElement("span"); s.textContent = "★ BON À VALOIR ★";
    var b = document.createElement("b"); b.textContent = it.titre;
    t.appendChild(s); t.appendChild(b); box.appendChild(t);
  }
  $("gm").textContent = it.texte;
}
$("g2t").innerHTML = "NIVEAU 2 · GACHAPON<br>TOURNE " + GM.length + " FOIS";
$("gb").onclick = function () {
  if (gi >= GM.length) return;
  chime([660, 784, 988]);
  rot += 360;
  $("hd").style.transform = "rotate(" + rot + "deg)";
  var c = $("cap");
  c.classList.remove("pop"); void c.getBoundingClientRect(); c.classList.add("pop");
  c.firstElementChild.setAttribute("fill", cols[(gi + 3) % 5]);
  showCapsule(GM[gi]);
  gi++;
  if (gi >= GM.length) { $("gb").hidden = true; $("g2n").hidden = false; }
};
$("g2n").onclick = function () { go(3); };

/* ---------- niveau 3 : memory avec les photos ---------- */
var IC = [
  spr(HT, { X: "#ff5d8f" }, 5), spr(ST, { X: "#f2b632" }, 5),
  spr(FL, { X: "#ff8fb1", Y: "#f2b632", G: "#4cbf73" }, 5), spr(CAT, CP, 5),
  spr(HT, { X: "#b79ced" }, 5), spr(ST, { X: "#8fe3c8" }, 5)
];
var first = null, lock = false, found = 0, pool = [];

function icon(k) {
  var s = IC[k % IC.length], c = document.createElement("canvas");
  c.width = s.width; c.height = s.height;
  c.getContext("2d").drawImage(s, 0, 0);
  return c;
}
function face(k) {
  var P = pool[k], d = document.createElement("div");
  d.className = "f";
  if (P.src) {
    var im = photo(P.src, P.legende || "Photo", function () { im.replaceWith(icon(k)); });
    d.appendChild(im);
  } else {
    d.appendChild(icon(k));
  }
  var sp = document.createElement("span");
  sp.textContent = P.legende || "";
  d.appendChild(sp);
  return d;
}
function memo() {
  pool = C.memoire.slice().sort(function () { return Math.random() - 0.5; }).slice(0, 6);
  var m = $("mem"), n = pool.length, d = [];
  m.innerHTML = ""; found = 0; first = null; lock = false;
  $("mm").innerHTML = "&nbsp;";
  for (var i = 0; i < n; i++) d.push(i, i);
  d.sort(function () { return Math.random() - 0.5; });
  d.forEach(function (k) {
    var b = document.createElement("button");
    b.className = "mc"; b.textContent = "?";
    b.setAttribute("aria-label", "Carte cachée");
    b.onclick = function () {
      if (lock || b.classList.contains("up")) return;
      chime([700]);
      b.classList.add("up"); b.textContent = ""; b.appendChild(face(k));
      if (first === null) { first = [b, k]; return; }
      var f = first; first = null;
      if (f[1] === k) {
        f[0].classList.add("ok"); b.classList.add("ok"); found++;
        chime([784, 1047]);
        $("mm").textContent = pool[k].legende || "Bien joué !";
        if (found === n) { rain(22); setTimeout(function () { go(4); }, 1400); }
      } else {
        lock = true;
        setTimeout(function () {
          [f[0], b].forEach(function (x) { x.classList.remove("up"); x.textContent = "?"; });
          lock = false;
        }, 850);
      }
    };
    m.appendChild(b);
  });
}

/* ---------- niveau 4 : la lettre (écriture progressive) ---------- */
var tm, userScrolled = false;
["wheel", "touchstart", "pointerdown"].forEach(function (ev) {
  addEventListener(ev, function () { userScrolled = true; }, { passive: true });
});
function buildAlbum() {
  var g = $("ag");
  if (!g.children.length) {
    (C.album || []).forEach(function (p, i) {
      var f = document.createElement("figure"); f.className = "pol";
      f.style.setProperty("--r", (i % 2 ? 2.5 : -2.5) + "deg");
      var im = photo(p.src, p.legende, function () { f.remove(); });
      var c = document.createElement("figcaption"); c.textContent = p.legende || "";
      f.appendChild(im); f.appendChild(c); g.appendChild(f);
    });
  }
  $("album").hidden = false;
}
function finish() {
  clearInterval(tm);
  $("sgn").textContent = C.signature;
  $("sgn").classList.add("on");
  $("skip").hidden = true; $("again").hidden = false;
  $("lh").textContent = "★ JEU TERMINÉ ★";
  rain(36); chime([523, 659, 784, 1047, 1319]);
  buildAlbum();
}
function skipAll() {
  clearInterval(tm);
  $("lt").innerHTML = "";
  C.lettre.forEach(function (t) {
    var p = document.createElement("p"); p.textContent = t; $("lt").appendChild(p);
  });
  finish();
}
function letter() {
  clearInterval(tm);
  userScrolled = false;
  $("sal").textContent = C.salutation;
  $("lt").innerHTML = "";
  $("sgn").textContent = ""; $("sgn").classList.remove("on");
  $("again").hidden = true; $("skip").hidden = false; $("album").hidden = true;
  $("lh").textContent = "NIVEAU 4 · LA LETTRE";
  rain(26);
  if (RM) { skipAll(); return; }

  /* on écrit caractère par caractère (les emojis comptent pour 1) */
  var L = C.lettre.map(function (t) { return Array.from(t); });
  var total = L.reduce(function (a, t) { return a + t.length; }, 0);
  var perTick = Math.max(1, Math.ceil(total / 2200));
  var i = 0, j = 0, ticks = 0, p = document.createElement("p");
  $("lt").appendChild(p);
  tm = setInterval(function () {
    var t = L[i];
    j = Math.min(t.length, j + perTick);
    p.textContent = t.slice(0, j).join("");
    if (++ticks % 8 === 0 && !userScrolled) p.scrollIntoView({ block: "end" });
    if (j >= t.length) {
      i++; j = 0;
      if (i >= L.length) { finish(); return; }
      p = document.createElement("p");
      $("lt").appendChild(p);
    }
  }, 22);
}
$("skip").onclick = skipAll;
$("again").onclick = function () {
  gi = 0; rot = 0;
  $("gb").hidden = false; $("g2n").hidden = true;
  $("gcard").innerHTML = "";
  $("gm").textContent = "Tourne la manivelle !";
  $("cap").classList.remove("pop");
  go(0);
};
})();
