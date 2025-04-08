function checkThirdPassword() {
    const password = document.getElementById("thirdPassword").value;
    const message = document.getElementById("thirdMessage");
  
    if (password === "finale") {
      message.textContent = "🎉 Glückwunsch! Du hast alles geschafft!";
      message.style.color = "green";
    } else {
      message.textContent = "❌ Falsches Passwort!";
      message.style.color = "red";
    }
  }
  