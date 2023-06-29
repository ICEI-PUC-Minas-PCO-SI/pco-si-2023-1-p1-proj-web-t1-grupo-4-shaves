import JSONServer from "./ModuloConexao.js";

// Inputs
var nome = document.getElementById("inputNome");
var email = document.getElementById("inputEmail");
var contato = document.getElementById("inputContato");
var senha = document.getElementById("inputSenha");
var confSenha = document.getElementById("inputConfSenha");

// Logica do Botao de Cadastrar
var criarContaBtn = document.getElementById("criarContaBtn");
criarContaBtn?.addEventListener("click", () => {
  if (verificarCampos(nome, email, contato, senha, confSenha)) {
    // Criar objeto Data e recupera data atual de acordo com os parametros BRs - DD/MM/AAAA
    let date = new Date().toLocaleDateString("pt-br");



    // Revisar parte de codigo. Verificar se o valor eh nulo.



    if (JSONServer.verificarContaExistente(email.value)) {
      // Conta nao existe
      if (
        JSONServer.novoUsuario(
          nome.value,
          senha.value,
          email.value,
          1,
          date,
          contato.value
        )
      ) {
        // Criou a Conta
        Swal.fire({
          icon: "success",
          title: "Conta Criada",
          text: "Experimente realizar o login agora, redirecionando...",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(window.location.href("/pages/login.html"), 3000);
      } else {
        // Nao criou a conta
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro",
          text: "Tente novamente mais tarde, ou então entre em contato com o administrador do sistema",
          showConfirmButton: true,
          confirmButtonColor: "red",
        });
      }
    } else {
      // Conta existe
      Swal.fire({
        icon: "error",
        title: "Email já cadastrado",
        text: "Já existe uma conta com esse email, por favor realize o login",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    }
  }
});

function verificarCampos(nome, email, contato, senha, confSenha) {
  // Checar se existem campos vazios e destaca-los
  if (nome.value == "") {
    nome.style.border = "2px solid red";
    return false;
  } else {
    nome.style.border = "";
  }
  if (email.value == "") {
    email.style.border = "2px solid red";
    return false;
  } else {
    email.style.border = "";
  }

  if (contato.value == "") {
    contato.style.border = "2px solid red";
    return false;
  } else {
    contato.style.border = "";
  }

  if (senha.value == "") {
    senha.style.border = "2px solid red";
    return false;
  } else {
    senha.style.border = "";
  }

  if (confSenha.value == "") {
    confSenha.style.border = "2px solid red";
    return false;
  } else {
    confSenha.style.border = "";
  }

  if (
    nome.value == "" ||
    email.value == "" ||
    contato.value == "" ||
    senha.value == "" ||
    confSenha.value == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Campos vazios",
      html: "Por favor preencha todos os campos e tente novamente",
      confirmButtonColor: "red",
    });
    return false;
  }

  if (senha.value != confSenha.value) {
    Swal.fire({
      icon: "error",
      title: "Senhas diferentes",
      text: "Certifique-se que a senha e confirmação de senha estão iguais",
      showConfirmButton: true,
      confirmButtonColor: "red",
    });
    senha.style.border = "2px solid red";
    confSenha.style.border = "2px solid red";
    return false;
  } else {
    senha.style.border = "";
    confSenha.style.border = "";
    return true;
  }
}
