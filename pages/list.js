import { displayMessage } from "../script.js";

const listName = sessionStorage.getItem("listName");
const modalOverlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeBtn = document.querySelector(".floating-btn");
const addBtn = document.querySelector(".add-btn");
const addColumn = document.getElementById("addColumn");
const listColumn = document.querySelector(".list-column");
const mediaQueryMax768 = window.matchMedia("(max-width: 48em)");
const itemTitle = document.getElementById("itemTitle");
const titleError = document.getElementById("titleError");
const itemDesc = document.getElementById("itemDesc");
const descError = document.getElementById("descError");
const emptyList = document.getElementById("emptyList");
const itemBox = document.querySelector(".item-box");
const addForm = document.getElementById("addForm");

document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");

  if (itemTitle && itemDesc) {
    itemTitle.maxLength = 30;
    itemDesc.maxLength = 100;
    itemTitle.focus();
  }

  // Updates title and header
  if (listName && h1) {
    // Capitalizes the first letter of the list name
    const title = `${listName} | Lista Criada`;
    document.title = title.replace(/^./, (c) => c.toUpperCase());
    h1.innerText = listName.replace(/^./, (c) => c.toUpperCase());
  }

  if (addForm) {
    addForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validateItemCreation();
    });
  }

  loadList();
});

function validateItemCreation() {
  const title = itemTitle.value.trim();
  const desc = itemDesc.value.trim();
  let valid = true;

  if (title === "") {
    titleError.classList.add("error");
    titleError.innerText = "O título não pode estar vazio.";
    titleError.style.display = "block";
    valid = false;
  } else if (title.length < 3) {
    titleError.classList.add("warning");
    titleError.innerText = "Precisa ter mais de 2 caracteres.";
    titleError.style.display = "block";
    valid = false;
  } else {
    titleError.classList.remove("error", "warning");
    titleError.style.display = "none";
  }

  if (desc === "") {
    descError.classList.add("error");
    descError.innerText = "A descrição não pode estar vazia.";
    descError.style.display = "block";
    valid = false;
  } else if (desc.length < 20) {
    descError.classList.add("warning");
    descError.innerText = "Precisa ter mais de 20 caracteres.";
    descError.style.display = "block";
    valid = false;
  } else {
    descError.classList.remove("error", "warning");
    descError.style.display = "none";
  }

  if (valid) {
    createItem(title, desc);
    addForm.reset();

    if (addColumn.classList.contains("modal-column")) {
      closeModal();
    }
  }
}

function createItem(title, desc) {
  const listItem = document.createElement("article");

  const itemContent = document.createElement("div");
  itemContent.classList.add("item");
  itemContent.innerHTML = `
    <h2>${title.substring(0, 30).replace(/^./, (c) => c.toUpperCase())}</h2>
    <p>${desc.substring(0, 100).replace(/^./, (c) => c.toUpperCase())}</p>
  `;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.setAttribute("aria-label", "Remover item");
  removeButton.setAttribute("title", "Remover item");
  removeButton.addEventListener("click", function () {
    itemBox.removeChild(listItem);
    saveList();
  });

  const span = document.createElement("span");
  span.innerText = "delete";
  span.classList.add("material-symbols-outlined");
  span.setAttribute("aria-hidden", "true");
  removeButton.appendChild(span);

  listItem.appendChild(itemContent);
  listItem.appendChild(removeButton);
  itemBox.appendChild(listItem);

  listItem.scrollIntoView({ behavior: "smooth", block: "start" });

  saveList();
  updateEmptyListVisibility();
}

function saveList() {
  const currentItems = [];

  document.querySelectorAll(".item-box article").forEach((article) => {
    const title = article.querySelector("h2").textContent;
    const desc = article.querySelector("p").textContent;
    currentItems.push({ title: title, desc: desc });
  });

  sessionStorage.setItem("myItemList", JSON.stringify(currentItems));

  if (currentItems.length === 0 && sessionStorage.getItem("myItemList")) {
    sessionStorage.removeItem("myItemList");
  }

  updateEmptyListVisibility();
}

function loadList() {
  const savedItemsJSON = sessionStorage.getItem("myItemList");
  let hasItems = false;

  if (savedItemsJSON) {
    const savedItems = JSON.parse(savedItemsJSON);
    itemBox.innerHTML = "";

    if (savedItems.length > 0) {
      hasItems = true;
      savedItems.forEach((item) => {
        const listItem = document.createElement("article");

        const itemContent = document.createElement("div");
        itemContent.classList.add("item");
        itemContent.innerHTML = `
          <h2>${item.title}</h2>
          <p>${item.desc}</p>
        `;

        const removeButton = document.createElement("button");
        removeButton.setAttribute("aria-label", "Remover item");
        removeButton.setAttribute("title", "Remover item");
        removeButton.classList.add("remove-btn");
        removeButton.addEventListener("click", function () {
          itemBox.removeChild(listItem);
          saveList();
          updateEmptyListVisibility();
        });

        const span = document.createElement("span");
        span.innerText = "delete";
        span.classList.add("material-symbols-outlined");
        span.setAttribute("aria-hidden", "true");
        removeButton.appendChild(span);

        listItem.appendChild(itemContent);
        listItem.appendChild(removeButton);
        itemBox.appendChild(listItem);
      });
    }
  }

  updateEmptyListVisibility();
}

function updateEmptyListVisibility() {
  if (itemBox.children.length > 0) {
    emptyList.classList.remove("show-flex");
    itemBox.classList.add("show-flex");
  } else {
    emptyList.classList.add("show-flex");
    itemBox.classList.remove("show-flex");

    itemTitle.focus();
  }
}

// Main column "X" button
closeBtn.addEventListener("click", () => {
  if (listName) {
    sessionStorage.removeItem("listName");
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
  itemTitle.focus();
}

function closeModal() {
  addColumn.classList.remove("modal-column");
  document.body.classList.remove("show-modal");
  document.body.style.overflow = ""; // Restores scroll
  addBtn.focus();
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
    itemTitle.focus();
  }

  checkSessionStorage();
}

function checkSessionStorage() {
  if (!listName) {
    sessionStorage.clear();

    addColumn.style.display = "none";
    listColumn.style.display = "none";

    displayMessage("info", "ℹ️ Voltando para a página inicial...");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  }
}

// Monitors viewport/zoom changes
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);

// Initial setup on page load
handleMediaQueryChange(mediaQueryMax768);
