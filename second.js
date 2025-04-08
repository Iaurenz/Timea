function checkSecondPassword() {
    const password = document.getElementById("secondPassword").value;
    const message = document.getElementById("secondMessage");
  
    if (password === "Echo") {
      message.textContent = "✅ Richtig! Weitere Inhalte können hier folgen...";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "third.html";
      }, 2000);
      // z. B. weiteren versteckten Inhalt einblenden
    } else {
      message.textContent = "❌ Falsches Passwort!";
      message.style.color = "red";
    }
  }
  