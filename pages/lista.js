import { criarMensagem, verificarOverlay } from "../script.js";

const nomeLista = localStorage.getItem("lista");
const overlayModal = document.getElementById("overlay");
const btnFecharModal = document.getElementById("btnFecharModal");
const h1 = document.querySelector("h1");
const btnFechar = document.querySelector(".btn-flutuante");
const btnAdd = document.querySelector(".btn-adicionar");
const colunaAdd = document.querySelector(".coluna-adicionar");
const colunaLista = document.querySelector(".coluna-lista");
const item = document.querySelector(".item"); // article

const mediaQueryMax768 = window.matchMedia("(max-width: 768px)"); // Media Query para telas pequenas

if (nomeLista && h1) {
  document.title = `${nomeLista} | Lista Criada`;
  h1.innerText = nomeLista;
}

btnFechar.addEventListener("click", () => {
  if (nomeLista) {
    localStorage.removeItem("lista");
    location.reload();
  }
});

btnAdd.addEventListener("click", () => {
  if (mediaQueryMax768.matches) {
    if (nomeLista) {
      abrirModal();
    }
  }
});

function abrirModal() {
  colunaAdd.classList.add("coluna-modal");
  document.body.classList.add("show-modal");
  document.body.style.overflow = "hidden"; // Impede a rolagem do corpo da página
}

function fecharModal() {
  document.body.classList.remove("show-modal");
  document.body.style.overflow = ""; // Restaura a rolagem do corpo da página
}

// Fechar o modal ao clicar no botão de fechar
btnFecharModal.addEventListener("click", fecharModal);

// Fechar o modal ao clicar fora dela (no overlay)
overlayModal.addEventListener("click", fecharModal);

// Fechar o modal ao pressionar a tecla "esc"
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    document.body.classList.contains("show-modal")
  ) {
    fecharModal();
  }
});

function handleMediaQueryChange(event) {
  if (event.matches) {
    colunaAdd.classList.add("coluna-modal");

    // Adiciona os botãoes "Adicionar" e "Fechar"
    btnAdd.style.display = "flex";
    btnFecharModal.style.display = "block";

    if (!nomeLista) {
      colunaAdd.style.display = "none";
      colunaLista.style.display = "none";

      criarMensagem("info", "ℹ️ Voltando para a página incial");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    }
  } else {
    // Remove as classes de modal do body e da coluna
    document.body.classList.remove("show-modal");
    document.body.style.overflow = ""; // Garante que a rolagem do body volte

    // Remove a classe de estilo de modal da coluna.
    // Ela vai voltar a ter apenas os estilos de .coluna-adicionar.
    colunaAdd.classList.remove("coluna-modal");

    // Remove os botões "Adicionar e "Fechar"
    btnAdd.style.display = "none";
    btnFecharModal.style.display = "none";

    if (!nomeLista) {
      colunaAdd.style.display = "none";
      colunaLista.style.display = "none";

      verificarOverlay();
      criarMensagem("info", "ℹ️ Voltando para a página incial");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    }
  }
}

// Assina o listener para o evento 'change' da media query
mediaQueryMax768.addEventListener("change", handleMediaQueryChange);

// Executa a função uma vez ao carregar a página para definir o estado inicial
handleMediaQueryChange(mediaQueryMax768);
