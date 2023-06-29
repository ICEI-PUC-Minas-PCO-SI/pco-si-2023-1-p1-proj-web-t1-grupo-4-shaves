import JSONServer from "./ModuloConexao.js";
// import Swal from "sweetalert2";

// Inputs
var nome = document.getElementById("inputNome");
var email = document.getElementById("inputEmail");
var contato = document.getElementById("inputContato");
var senha = document.getElementById("inputSenha");
var confSenha = document.getElementById("inputConfSenha");

// Logica do Botao de Cadastrar
var criarContaBtn = document.getElementById("criarContaBtn");
criarContaBtn?.addEventListener("click", () => {


  // Checar se existem campos vazios e destaca-los
  if (nome.value == "") {
    nome.style.border = "2px solid red";
  } else {
    nome.style.border = "";
  }
  if (email.value == "") {
    email.style.border = "2px solid red";
  } else {
    email.style.border = "";
  }

  if (contato.value == "") {
    contato.style.border = "2px solid red";
  } else {
    contato.style.border = "";
  }

  if (senha.value == "") {
    senha.style.border = "2px solid red";
  } else {
    senha.style.border = "";
  }

  if (confSenha.value == "") {
    confSenha.style.border = "2px solid red";
  } else {
    confSenha.style.border = "";
  }

  if (nome.value == "" || email.value == "" || contato.value == "" || senha.value == "" || confSenha.value == "") {
    // Campos vazios encontrados
    Swal.fire({
      icon: "error",
      title: "Campos vazios",
      html: "Por favor preencha todos os campos e tente novamente",
      confirmButtonColor: "red",
    });
  } else {



    // Criar objeto Data e recupera data atual de acordo com os parametros BRs - DD/MM/AAAA
    let date = new Date().toLocaleDateString("pt-br");


    var teste = JSONServer.novoUsuario(nome.value,senha.value,email.value,1,date,contato.value) 

    // Verifica se ja existe conta com o email inserido
    if (teste) {
      // A conta nao existe ainda
      Swal.fire({
        icon: "success",
        title: "Conta Criada",
        showConfirmButton: false,
        timer:2000
      });
      // setTimeout(window.location.href = '../pages/login.html',3000)
      
    
    } else {

      // A conta ja existe
      Swal.fire({
        icon: "error",
        title: "Ocorreu um erro",
        text: "Tente novamente mais tarde, ou então entre em contato com o administrador do sistema",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    }
  }
});
