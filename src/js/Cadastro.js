import objConexao from "./ModuloConexao.js";

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
      html: "Por favor preencha todos os campos",
      confirmButtonColor: "red",
    });
  } else {
    // Criar objeto Data e recupera data atual de acordo com os parametros BRs - DD/MM/AAAA
    let date = new Date().toLocaleDateString("pt-br");

    var retorno = objConexao.busca_usuario_por_email(email.value);
    console.log(retorno);

    // Verifica se ja existe conta com o email inserido
    if (retorno != undefined) {
      // Nao Existe
      var contaCriada = objConexao.novo_usuario(
        nome.value,
        senha.value,
        email.value,
        date,
        contato.value
      );
      if (contaCriada == false) {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro",
          text: "Não foi possível cadastrar a conta. Por favor tente novamente mais tarde!",
          showConfirmButton: true,
          confirmButtonColor: "red",
        });
      }else{
        Swal.fire({
          icon: "success",
          title: "Conta Criada!",
          text: "Agora é só fazer login na conta",
          showConfirmButton: false,
          timer:2000
        });
        window.location.href = '../pages/login.html'
      }
    } else {
      // Existe
      console.log("Deu ruim!");
      Swal.fire({
        icon: "error",
        title: "Email já cadastrado!",
        text: "Esse email já está cadastrado no nosso sistema. Por favor tente realizar o login",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    }
  }
});
