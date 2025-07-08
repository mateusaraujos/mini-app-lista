let formTitulo, inputTitulo;

document.addEventListener("DOMContentLoaded", () => {
  // AGORA sim, os elementos do DOM estão garantidos.
  formTitulo = document.getElementById("form-titulo");
  inputTitulo = document.getElementById("titulo");

  // Verificação de segurança antes de tentar manipulá-los, especialmente em códigos maiores.
  if (inputTitulo) {
    inputTitulo.maxLength = 30;
  }

  if (formTitulo) {
    formTitulo.addEventListener("submit", function (event) {
      event.preventDefault();
      validarTitulo();
    });
  }
});

function validarTitulo() {
  const titulo = inputTitulo.value.trim();

  if (titulo === "") {
    criarMensagem("erro", "❌ O título não pode estar vazio.");
  } else if (titulo.length < 3) {
    criarMensagem("atencao", "⚠️ O título deve ter pelo menos 3 caracteres.");
  } else {
    criarMensagem("sucesso", "✅ Criando sua lista...");
    setTimeout(() => {
      localStorage.setItem("lista", titulo.substring(0, 30));
      window.location.href = "pages/lista.html";
    }, 1500);
  }
}

export function criarMensagem(tipo, mensagem) {
  const mensagemOverlay = document.createElement("div");

  if (!document.querySelector(".mensagem-overlay")) {
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
  }

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
