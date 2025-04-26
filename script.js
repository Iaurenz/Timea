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
  } else {
    alert("Falsches Passwort!");
  }
}
