import { createMessage } from "../script.js";

const listName = localStorage.getItem("listName");
const modalOverlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const h1 = document.querySelector("h1");
const closeBtn = document.querySelector(".floating-btn");
const addBtn = document.querySelector(".add-btn");
const addColumn = document.querySelector(".add-column");
const listColumn = document.querySelector(".list-column");
const itemContainer = document.querySelector(".item-container");

const mediaQueryMax768 = window.matchMedia("(max-width: 768px)");

// Updates title and header
if (listName && h1) {
  document.title = `${listName} | Lista Criada`;
  h1.innerText = listName;
}

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
  if (event.matches) {
    // Mobile: Adds mobile buttons
    if (!itemContainer.contains(addBtn)) itemContainer.appendChild(addBtn);
    if (!addColumn.contains(closeModalBtn))
      addColumn.appendChild(closeModalBtn);
    addBtn.style.display = "flex";
    closeModalBtn.style.display = "block";

    document.body.classList.remove("show-modal");
    addColumn.classList.remove("modal-column");
    document.body.style.overflow = "";
  } else {
    // Desktop: Removes mobile buttons
    if (itemContainer.contains(addBtn)) addBtn.remove();
    if (addColumn.contains(closeModalBtn)) closeModalBtn.remove();

    document.body.classList.remove("show-modal");
    addColumn.classList.remove("modal-column");
    document.body.style.overflow = "";
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
