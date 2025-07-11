import { createMessage } from "../script.js";

const listName = localStorage.getItem("listName");
const modalOverlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeBtn = document.querySelector(".floating-btn");
const addBtn = document.querySelector(".add-btn");
const addColumn = document.getElementById("addColumn");
const listColumn = document.querySelector(".list-column");
const mediaQueryMax768 = window.matchMedia("(max-width: 48em)");

document.addEventListener("DOMContentLoaded", () => {
  const listPage = document.querySelector(".list-page");
  const h1 = document.querySelector("h1");

  if (listPage) {
    listPage.focus();
  }

  // Updates title and header
  if (listName && h1) {
    document.title = `${listName} | Lista Criada`;
    h1.innerText = listName;
  }
});

// Main column "X" button
closeBtn.addEventListener("click", () => {
  if (listName) {
    localStorage.removeItem("listName");
    location.reload();
  }
});

// “Add” button only opens modal when in small screen and there is listName
addBtn.addEventListener("click", () => {
  if (mediaQueryMax768.matches && listName) {
    openModal();
  }
});

function openModal() {
  addColumn.classList.add("modal-column");
  document.body.classList.add("show-modal");
  document.body.style.overflow = "hidden"; // Blocks body scrolling
}

function closeModal() {
  addColumn.classList.remove("modal-column");
  document.body.classList.remove("show-modal");
  document.body.style.overflow = ""; // Restores scroll
}

// Closes modal in various situations
closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    document.body.classList.contains("show-modal")
  ) {
    closeModal();
  }
});

// Adjusts button/column visibility according to media query,
// but does NOT open the modal automatically.
function handleMediaQueryChange(event) {
  if (!event.matches) {
    if (document.body.classList.contains("show-modal")) {
      closeModal();
    }
  }

  checkLocalStorage();
}

function checkLocalStorage() {
  if (!listName) {
    addColumn.style.display = "none";
    listColumn.style.display = "none";

    createMessage("info", "ℹ️ Voltando para a página inicial...");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  }
}

// Monitors viewport/zoom changes
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);

// Initial setup on page load
handleMediaQueryChange(mediaQueryMax768);
