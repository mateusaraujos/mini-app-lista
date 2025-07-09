import { createMessage } from "../script.js";

const listName = localStorage.getItem("listName");
const modalOverlay = document.getElementById("overlay");
const closeModalBtn = document.getElementById("closeModalBtn");
const h1 = document.querySelector("h1");
const closeBtn = document.querySelector(".floating-btn");
const addBtn = document.querySelector(".add-btn");
const addColumn = document.querySelector(".add-column");
const listColumn = document.querySelector(".list-column");

const mediaQueryMax768 = window.matchMedia("(max-width: 768px)");

// Atualiza título e cabeçalho
if (listName && h1) {
  document.title = `${listName} | Lista Criada`;
  h1.innerText = listName;
}

// Botão “X” da coluna principal
closeBtn.addEventListener("click", () => {
  if (listName) {
    localStorage.removeItem("listName");
    location.reload();
  }
});

// Botão “Adicionar” só abre modal quando em small screen e há listName
addBtn.addEventListener("click", () => {
  if (mediaQueryMax768.matches && listName) {
    openModal();
  }
});

function openModal() {
  addColumn.classList.add("modal-column");
  document.body.classList.add("show-modal");
  document.body.style.overflow = "hidden"; // Bloqueia scroll do body
}

function closeModal() {
  document.body.classList.remove("show-modal");
  document.body.style.overflow = ""; // Restaura scroll
}

// Fechar modal em várias interações
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

// Ajusta visibilidade de botões/coluna conforme media query,
// mas NÃO abre o modal automaticamente
function handleMediaQueryChange(event) {
  if (event.matches) {
    // Small screens ou zoom alto: mostramos o botão e botão de fechar,
    // mas garantimos que o modal esteja fechado
    addBtn.style.display = "flex";
    closeModalBtn.style.display = "block";

    document.body.classList.remove("show-modal");
    addColumn.classList.remove("modal-column");
    document.body.style.overflow = "";
  } else {
    // Desktop: escondemos botões de mobile
    addBtn.style.display = "none";
    closeModalBtn.style.display = "none";

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

// Monitora mudança de viewport/zoom
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);

// Configuração inicial ao carregar a página
handleMediaQueryChange(mediaQueryMax768);
