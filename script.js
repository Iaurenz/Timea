function checkPassword() {
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    if (password === "Maria Stuart") {
      window.location.href = "second.html"; // Weiterleitung auf zweite Seite
    } else {
      message.textContent = "❌ Falsches Passwort!";
      message.style.color = "red";
    }
  }
  