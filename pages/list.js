import { displayMessage, updateThemeColor } from "../script.js";

// DOM element references
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

  // Sets document and heading title
  if (listName && h1) {
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

// Validates input before creating item
function validateItemCreation() {
  const title = itemTitle.value.trim();
  const desc = itemDesc.value.trim();
  let valid = true;

  // Title validation
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

  // Description validation
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

  // Creates item if all fields are valid
  if (valid) {
    createItem(title, desc);
    addForm.reset();

    if (addColumn.classList.contains("modal-column")) {
      closeModal();
    }
  }
}

// Builds the HTML element for a single item
function createListItemElement(title, desc, isNew = false) {
  const listItem = document.createElement("article");

  const itemContent = document.createElement("div");
  itemContent.classList.add("item");

  const formattedTitle = isNew
    ? title.substring(0, 30).replace(/^./, (c) => c.toUpperCase())
    : title;
  const formattedDesc = isNew
    ? desc.substring(0, 100).replace(/^./, (c) => c.toUpperCase())
    : desc;

  itemContent.innerHTML = `
    <h2>${formattedTitle}</h2>
    <p>${formattedDesc}</p>
  `;

  // Remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-btn");
  removeButton.setAttribute("aria-label", "Remover item");
  removeButton.setAttribute("title", "Remover item");

  const span = document.createElement("span");
  span.innerText = "delete";
  span.classList.add("material-symbols-outlined");
  span.setAttribute("aria-hidden", "true");
  removeButton.appendChild(span);

  // Removes item from DOM and storage after animation
  removeButton.addEventListener("click", function () {
    listItem.classList.add("remove-animation");
    setTimeout(() => {
      itemBox.removeChild(listItem);
      saveList();
      updateEmptyListVisibility();
    }, 400);
  });

  listItem.appendChild(itemContent);
  listItem.appendChild(removeButton);
  return listItem;
}

// Adds new item to DOM and saves it
function createItem(title, desc) {
  const listItem = createListItemElement(title, desc, true); // Pass true for isNew
  itemBox.appendChild(listItem);
  listItem.scrollIntoView({ behavior: "smooth", block: "start" });
  saveList();
  updateEmptyListVisibility();
}

// Saves all items to sessionStorage
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

// Loads previsously saved list from sessionStorage
function loadList() {
  const savedItemsJSON = sessionStorage.getItem("myItemList");

  itemBox.innerHTML = ""; // Clear previous content

  if (savedItemsJSON) {
    const savedItems = JSON.parse(savedItemsJSON);

    if (savedItems.length > 0) {
      savedItems.forEach((item) => {
        const listItem = createListItemElement(item.title, item.desc, false);
        itemBox.appendChild(listItem);
      });
    }
  }
  updateEmptyListVisibility();
}

// Shows or hides empty message based on list content
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

// Deletes list and reloads page
closeBtn.addEventListener("click", () => {
  if (listName) {
    sessionStorage.removeItem("listName");
    location.reload();
  }
});

// Opens modal only on small screens
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

// Closes modal on various events
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

// Syncs layout and visibility based on screen size
function handleMediaQueryChange(event) {
  if (!event.matches) {
    if (document.body.classList.contains("show-modal")) {
      closeModal();
    }
    itemTitle.focus();
  }

  checkSessionStorage();
}

// Redirects to index if session is invalid
function checkSessionStorage() {
  if (!listName) {
    sessionStorage.clear();

    addColumn.style.display = "none";
    listColumn.style.display = "none";

    displayMessage("info", "ℹ️ Lista excluída com sucesso!");
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 3000);
  }
}

// Responsive listener
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);
handleMediaQueryChange(mediaQueryMax768);

// Theme setup
updateThemeColor();
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", updateThemeColor);
