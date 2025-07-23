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
    displayMessage("error", "❌ O título não pode estar vazio.");
  } else if (title.length < 3) {
    displayMessage("warning", "⚠️ O título deve ter pelo menos 3 caracteres.");
  } else {
    displayMessage("success", "✅ Criando sua lista...");
    setTimeout(() => {
      sessionStorage.setItem("listName", title.substring(0, 30));
      window.location.href = "pages/list.html";
    }, 1500);
  }
}

export function displayMessage(type, message) {
  const existingOverlay = document.querySelector(".message-overlay");

  // If there is no message, create one
  if (existingOverlay) {
    existingOverlay.remove();
  }

  // Creates a new overlay element
  const messageOverlay = document.createElement("div");

  // Configures the overlay with the new message
  setupMessageOverlay(type, message, messageOverlay);

  let timeToRemove = type === "success" ? 1500 : 3000;

  setTimeout(() => messageOverlay.remove(), timeToRemove);
}

function setupMessageOverlay(type, message, messageOverlay) {
  // Class for main message container
  messageOverlay.className = "message-overlay";

  if (type !== "success" && type !== "info") {
    messageOverlay.style.pointerEvents = "none";
  }

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
