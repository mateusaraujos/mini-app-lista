const formTitulo = document.getElementById("form-titulo");
const inputTitulo = document.getElementById("titulo");

inputTitulo.addEventListener("blur", () => {
  setTimeout(() => {
    if (inputTitulo.value.trim() === "") {
      verificarOverlay();
      criarMensagem("info", "ℹ️ Digite um título para sua lista.");
    }
  }, 1000);
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
    inputTitulo.focus();
  } else if (titulo.length < 3) {
    verificarOverlay();
    criarMensagem("atencao", "⚠️ O título deve ter pelo menos 3 caracteres.");
  } else {
    verificarOverlay();
    criarMensagem("sucesso", "✅ Criando sua lista...");
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

  setTimeout(() => {
    mensagemOverlay.remove();
  }, 3000);
}

const verificarOverlay = () => {
  if (document.querySelector(".mensagem-overlay")) {
    document.querySelector(".mensagem-overlay").remove();
  }
};
