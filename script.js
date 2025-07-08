let titleForm, titleInput;

document.addEventListener("DOMContentLoaded", () => {
  // Ensures the elements of the DOM
  titleForm = document.getElementById("title-form");
  titleInput = document.getElementById("title");

  // Security check before manipulating the DOM
  if (titleInput) {
    titleInput.maxLength = 30;
  }

  if (titleForm) {
    titleForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validateTitle();
    });
  }
});

function validateTitle() {
  const title = titleInput.value.trim();

  if (title === "") {
    createMessage("error", "❌ O título não pode estar vazio.");
  } else if (title.length < 3) {
    createMessage("warning", "⚠️ O título deve ter pelo menos 3 caracteres.");
  } else {
    createMessage("success", "✅ Criando sua lista...");
    setTimeout(() => {
      localStorage.setItem("listName", title.substring(0, 30));
      window.location.href = "pages/list.html";
    }, 1500);
  }
}

export function createMessage(type, message) {
  const messageOverlay = document.createElement("div");

  if (!document.querySelector(".message-overlay")) {
    // Class for main message container
    messageOverlay.className = "message-overlay";

    switch (type) {
      case "error":
        messageOverlay.innerHTML = `<div class="error">${message}</div>`;
        break;
      case "success":
        messageOverlay.innerHTML = `<div class="success">${message}</div>`;
        break;
      case "warning":
        messageOverlay.innerHTML = `<div class="warning">${message}</div>`;
        break;
      default:
        messageOverlay.innerHTML = `<div class="info">${message}</div>`;
    }

    document.body.appendChild(messageOverlay);
  }

  if (type === "success") {
    setTimeout(() => {
      messageOverlay.remove();
    }, 1500);
  } else {
    setTimeout(() => {
      messageOverlay.remove();
    }, 3000);
  }
}
