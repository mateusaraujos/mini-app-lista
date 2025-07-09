import { createMessage } from "../script.js";

const listName = localStorage.getItem("listName");
const modalOverlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const h1 = document.querySelector("h1");
const closeBtn = document.querySelector(".floating-btn");
const addBtn = document.querySelector(".add-btn");
const addColumn = document.querySelector(".add-column");
const listColumn = document.querySelector(".list-column");
const item = document.querySelector(".item"); // article

const mediaQueryMax768 = window.matchMedia("(max-width: 768px)"); // Media Query for small screens

if (listName && h1) {
  document.title = `${listName} | Lista Criada`;
  h1.innerText = listName;
}

closeBtn.addEventListener("click", () => {
  if (listName) {
    localStorage.removeItem("listName");
    location.reload();
  }
});

addBtn.addEventListener("click", () => {
  if (mediaQueryMax768.matches) {
    if (listName) {
      openModal();
    }
  }
});

function openModal() {
  addColumn.classList.add("modal-column");
  document.body.classList.add("show-modal");
  document.body.style.overflow = "hidden"; // Prevents scrolling of the page body
}

function closeModal() {
  document.body.classList.remove("show-modal");
  document.body.style.overflow = ""; // Restores page body scrolling
}

// Closes modal when clicking close button
closeModalBtn.addEventListener("click", closeModal);

// Closes modal when clicking outside of it (in overlay)
modalOverlay.addEventListener("click", closeModal);

// Closes modal when pressing "esc" key
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    document.body.classList.contains("show-modal")
  ) {
    closeModal();
  }
});

function handleMediaQueryChange(event) {
  if (event.matches) {
    addColumn.classList.add("modal-column");

    // Adds "Adicionar" and "Fechar" buttons
    addBtn.style.display = "flex";
    closeModalBtn.style.display = "block";

    checkLocalStorage();
  } else {
    // Removes modal classes from body and column
    document.body.classList.remove("show-modal");
    document.body.style.overflow = ""; // Ensures that the body scroll returns

    // Removes modal style class from column
    // It will go back to having only the .add-column styles
    addColumn.classList.remove("modal-column");

    // Removes "Adicionar" and "Fechar" buttons
    addBtn.style.display = "none";
    closeModalBtn.style.display = "none";

    checkLocalStorage();
  }
}

function checkLocalStorage() {
  if (!listName) {
    addColumn.style.display = "none";
    listColumn.style.display = "none";

    createMessage("info", "ℹ️ Voltando para a página incial...");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  }
}

// Attaches a listener for the 'change' event on the media query
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);

// Runs the function once on page load to set the initial state
handleMediaQueryChange(mediaQueryMax768);
