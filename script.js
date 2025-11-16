function start(){
  document.getElementById('start').style.display = 'none';
  document.getElementById('page1').style.display = 'block';
}

// Funktion zum Überprüfen des Passworts auf Seite 1
function checkPassword1() {
  const password = document.getElementById('password1').value;
  if (password === "passwort1") {
    alert("Zugang gewährt zu Seite 1!");
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';
  } else {
    alert("Falsches Passwort!");
  }
}

// Funktion zum Überprüfen des Passworts auf Seite 2
function checkPassword2() {
  const password = document.getElementById('password2').value;
  if (password === "passwort2") {
    alert("Zugang gewährt zu Seite 2!");
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'block';
  } else {
    alert("Falsches Passwort!");
  }
}

// Funktion zum Überprüfen des Passworts auf Seite 3
function checkPassword3() {
  const password = document.getElementById('password3').value;
  if (password === "passwort3") {
    alert("Zugang gewährt zu Seite 3!");
    document.getElementById('page3').style.display = 'none';
    document.getElementById('page4').style.display = 'block';
  } else {
    alert("Falsches Passwort!");
  }
}

function checkPasswort4() {
  const password = document.getElementById('passwort4').value;
  if(password === "passwort4") {
    alert("Zugang gewährt zu Seite 4!");
  } else {
    alert("Falsches Passwort!")
  }
}


const COLS = 7;
const ROWS = 10;
const IMAGE = 'puzzlebild.jpg';        // <- Dateiname deines Puzzlebilds
const CONTAINER = document.getElementById('puzzleContainer');
const QUESTION_BOX = document.getElementById('questionBox');
const ERROR = document.getElementById('error');
/* ---------------------------------- */

let tiles = []; // { el, origR, origC, correctIndex, currentIndex, movable }
let tileW, tileH, contW, contH;
let selected = null;

// Bild laden
const img = new Image();
img.src = IMAGE;
img.onload = () => {
  // Berechne Skalierung so, dass Puzzle in View passt (max Höhe/Breite)
  const maxW = Math.min(760, Math.round(window.innerWidth * 0.88));
  const maxH = Math.round(window.innerHeight * 0.62);
  const scale = Math.min(1, maxW / img.naturalWidth, maxH / img.naturalHeight);
  contW = Math.max(200, Math.round(img.naturalWidth * scale));
  contH = Math.max(200, Math.round(img.naturalHeight * scale));
  // Container größe setzen
  CONTAINER.style.width = contW + 'px';
  CONTAINER.style.height = contH + 'px';

  tileW = contW / COLS;
  tileH = contH / ROWS;

  buildTiles();
  shuffleInner();
  placeAll();
};

// Baue alle Kacheln (nur DOM + Hintergrundpos)
function buildTiles(){
  tiles = [];
  CONTAINER.innerHTML = '';
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const correctIndex = r * COLS + c;
      const el = document.createElement('div');
      el.className = 'tile';
      // Größe
      el.style.width = tileW + 'px';
      el.style.height = tileH + 'px';
      // Bildausschnitt: immer nach original-Position setzen
      el.style.backgroundImage = `url("${IMAGE}")`;
      el.style.backgroundSize = `${contW}px ${contH}px`;
      el.style.backgroundPosition = `-${c * tileW}px -${r * tileH}px`;
      el.dataset.r = r;
      el.dataset.c = c;

      // Randstücke sind fixed
      const isBorder = (r === 0 || r === ROWS-1 || c === 0 || c === COLS-1);
      const tile = {
        el,
        origR: r,
        origC: c,
        correctIndex,
        currentIndex: null, // wird gesetzt
        movable: !isBorder
      };
      if(isBorder){
        el.classList.add('fixed');
      } else {
        // interaktive Stücke hören auf Klick / Touch
        el.addEventListener('click', () => tileClick(tile));
        el.addEventListener('touchstart', (ev) => { ev.preventDefault(); tileClick(tile); });
      }
      CONTAINER.appendChild(el);
      tiles.push(tile);
    }
  }
}

// Shuffle nur die inneren Positionen
function shuffleInner(){
  // sammle alle inneren positions (indices)
  const innerPositions = [];
  for(let r=1;r<ROWS-1;r++){
    for(let c=1;c<COLS-1;c++){
      innerPositions.push(r*COLS + c);
    }
  }
  // mische (Fisher-Yates)
  for(let i = innerPositions.length -1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [innerPositions[i], innerPositions[j]] = [innerPositions[j], innerPositions[i]];
  }
  // weise pos an tiles: randstücke bekommen ihre korrekte Position, innere Stücke die gemischten
  let innerIdx = 0;
  tiles.forEach(t => {
    if(!t.movable){
      t.currentIndex = t.correctIndex; // Rand korrekt
    } else {
      t.currentIndex = innerPositions[innerIdx++];
    }
  });
}

// positioniere alle Kacheln gemäss currentIndex
function placeAll(){
  tiles.forEach(t => {
    const idx = t.currentIndex;
    const pr = Math.floor(idx / COLS);
    const pc = idx % COLS;
    t.el.style.left = (pc * tileW) + 'px';
    t.el.style.top = (pr * tileH) + 'px';
    // ensure background size/position (in case of window resize)
    t.el.style.backgroundSize = `${contW}px ${contH}px`;
    t.el.style.backgroundPosition = `-${t.origC * tileW}px -${t.origR * tileH}px`;
  });
}

// Klickverhalten: auswählen, dann zweiter Klick -> tauschen
function tileClick(tile){
  if(!tile.movable) return;
  if(!selected){
    selected = tile;
    tile.el.classList.add('selected');
    return;
  }
  if(selected === tile){
    selected.el.classList.remove('selected');
    selected = null;
    return;
  }
  // tausche currentIndex
  const a = selected;
  const b = tile;
  const tmp = a.currentIndex;
  a.currentIndex = b.currentIndex;
  b.currentIndex = tmp;
  // animiere platzierung
  placeAll();
  a.el.classList.remove('selected');
  selected = null;
  // prüfen
  checkSolved();
}

// prüfe ob alle an korrekter Position
function checkSolved(){
  const allOk = tiles.every(t => t.currentIndex === t.correctIndex);
  if(allOk){
    // Puzzle gelöst -> Frage anzeigen
    setTimeout(() => {
      QUESTION_BOX.style.display = 'block';
      QUESTION_BOX.scrollIntoView({behavior:'smooth', block:'center'});
    }, 200);
    // Deaktiviere weitere Interaktion
    tiles.forEach(t => { t.el.classList.remove('selected'); t.movable = false; });
  }
}

  // Event Listener für Enter-Taste bei allen Passwortfeldern
document.getElementById("password1").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkPassword1();
  }
})
document.getElementById("password2").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkPassword2();
  }
})
document.getElementById("password3").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkPassword3();
  }
})

