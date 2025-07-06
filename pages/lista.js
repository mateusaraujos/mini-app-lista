const nomeLista = localStorage.getItem("lista");
const h1 = document.querySelector("h1");
const btnFechar = document.querySelector(".btn-flutuante");

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
