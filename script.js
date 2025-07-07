const formTitulo = document.getElementById("form-titulo");
const inputTitulo = document.getElementById("titulo");

document.addEventListener("DOMContentLoaded", () => {
  inputTitulo.maxLength = 30;
});

formTitulo.addEventListener("submit", function (event) {
  event.preventDefault();
  validarTitulo();
});

function validarTitulo() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    verificarOverlay();
    criarMensagem("erro", "❌ O título não pode estar vazio.");
  } else if (titulo.length < 3) {
    verificarOverlay();
    criarMensagem("atencao", "⚠️ O título deve ter pelo menos 3 caracteres.");
  } else {
    verificarOverlay();
    criarMensagem("sucesso", "✅ Criando sua lista...");
    setTimeout(() => {
      localStorage.setItem("lista", titulo.substring(0, 30));
      window.location.href = "pages/lista.html";
    }, 1500);
  }
}

function criarMensagem(tipo, mensagem) {
  const mensagemOverlay = document.createElement("div");

  // Classe para container principal de mensagem
  mensagemOverlay.className = "mensagem-overlay";

  switch (tipo) {
    case "erro":
      mensagemOverlay.innerHTML = `<div class="erro">${mensagem}</div>`;
      break;
    case "sucesso":
      mensagemOverlay.innerHTML = `<div class="sucesso">${mensagem}</div>`;
      break;
    case "atencao":
      mensagemOverlay.innerHTML = `<div class="atencao">${mensagem}</div>`;
      break;
    default:
      mensagemOverlay.innerHTML = `<div class="info">${mensagem}</div>`;
  }

  document.body.appendChild(mensagemOverlay);

  if (tipo === "sucesso") {
    setTimeout(() => {
      mensagemOverlay.remove();
    }, 1500);
  } else {
    setTimeout(() => {
      mensagemOverlay.remove();
    }, 3000);
  }
}

const verificarOverlay = () => {
  if (document.querySelector(".mensagem-overlay")) {
    document.querySelector(".mensagem-overlay").remove();
  }
};
