import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

async function preencheBarbeiro(){
    var todosUsuarios = await objConexao.buscaUsuarios();


}

function filtraBarbeiros(todosUsuarios){
    var barbeiros = [];
    for(let i =0;i<todosUsuarios.length;i++){
        if(todosUsuarios[i].permissao == 2){
            barbeiros.push(todosUsuarios[i]);
        }
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var searchBar = document.querySelector(".search-bar input");
    var searchButton = document.querySelector(".search-bar button");
    var cards = document.querySelectorAll(".card");

    searchButton.addEventListener("click", function() {
      var searchTerm = searchBar.value.trim().toLowerCase();
      if (searchTerm !== "") {
        cards.forEach(function(card) {
          var cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
          if (cardTitle.includes(searchTerm)) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      } else {
        cards.forEach(function(card) {
          card.style.display = "block";
        });
      }
    });

    searchBar.addEventListener("input", function() {
      var searchTerm = searchBar.value.trim().toLowerCase();
      cards.forEach(function(card) {
        var cardTitle = card.querySelector(".card-title").textContent.toLowerCase();
        if (cardTitle.includes(searchTerm)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });