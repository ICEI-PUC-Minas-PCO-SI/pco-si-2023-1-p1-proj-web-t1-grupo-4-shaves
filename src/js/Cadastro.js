import objConexao from "./ModuloConexao.js";

var nome = document.getElementById("inputNome");
var email = document.getElementById("inputEmail");
var contato = document.getElementById("inputContato");
var senha = document.getElementById("inputSenha");
var confSenha = document.getElementById("inputConfSenha");

var checkbox = document.getElementById("mostrarSenhaCheckbox");
var submitBtn = document.getElementById("criarContaBtn");

checkbox.addEventListener("change", showPassword);
submitBtn.addEventListener("click", validate);
nome.addEventListener("input", validateNome);
email.addEventListener("input", validateEmail);
contato.addEventListener("input", validateContato);
senha.addEventListener("input", validateSenha);
confSenha.addEventListener("input", validateConfSenha);

function showPassword() {
  if (checkbox.checked) {
    senha.type = "text";
    confSenha.type = "text";
  } else {
    senha.type = "password";
    confSenha.type = "password";
  }
}

function validateNome() {
  if (nome.value) {
    nome.classList.remove("is-invalid");
    nome.classList.add("is-valid");
    document.getElementById("nome-validation").innerText = "";
    return true;
  } else {
    nome.classList.remove("is-valid");
    nome.classList.add("is-invalid");
    document.getElementById("nome-validation").innerText =
      "Preencha com um nome válido";
    return false;
  }
}
function validateEmail() {
  if (email.value.length > 0) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    document.getElementById("email-validation").innerText = "";
    if (
      email.value.includes("@") &&
      email.value.includes(".com") &&
      searchAccount()
    ) {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
      document.getElementById("email-validation").innerText = "";
    } else {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.getElementById("email-validation").innerText =
        "Preencha com um email válido, exemplo: usuario@gmail.com";
      return false;
    }
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    document.getElementById("email-validation").innerText =
      "Preencha com um email válido, exemplo: usuario@gmail.com";
    return false;
  }
}
function validateContato() {
  if (contato.value) {
    contato.classList.remove("is-invalid");
    contato.classList.add("is-valid");
    document.getElementById("contato-validation").innerText = "";
    return true;
  } else {
    contato.classList.remove("is-valid");
    contato.classList.add("is-invalid");
    document.getElementById("contato-validation").innerText =
      "Preencha com um contato válido, exemplo: 31 987654321";
    return false;
  }
}
function validateSenha() {
  if (senha.value) {
    senha.classList.remove("is-invalid");
    senha.classList.add("is-valid");
    document.getElementById("senha-validation").innerHTML = "";
    return true;
  } else {
    senha.classList.remove("is-valid");
    senha.classList.add("is-invalid");
    document.getElementById("senha-validation").innerHTML =
      "A senha deve ter de no mínimo <b>6 caracteres</b>, contendo letras e/ou numeros.";
    return false;
  }
}
function validateConfSenha() {
  if (confSenha.value) {
    confSenha.classList.remove("is-invalid");
    confSenha.classList.add("is-valid");
    document.getElementById("confSenha-validation").innerHTML = "";
    return true;
  } else {
    confSenha.classList.remove("is-valid");
    confSenha.classList.add("is-invalid");
    document.getElementById("confSenha-validation").innerHTML =
      "A confirmação da senha precisa ser preenchida";
    return false;
  }
}

function validate() {
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
  } else {
    if (
      validateNome &&
      validateEmail &&
      validateContato &&
      validateSenha &&
      validateConfSenha
    ) {
      if (verifyPassword()) {
        // createAccount();
      }
    }
  }
}
/*
------------------------------------NOTAS------------------------------------ 
SE POSSIVEL MESCLAR OS VERIFYPASSWORD COM O VALIDATESENHA E VALIDATECONFSENHA
TAMBEM VERIFICAR POR ESPACOS EM BRANCO
-----------------------------------------------------------------------------
*/
function verifyPassword() {
  if (senha.value.length < 6) {
    senha.classList.add("is-invalid");
    confSenha.classList.add("is-invalid");
    senha.classList.remove("is-valid");
    confSenha.classList.remove("is-valid");
    document.getElementById("senha-validation").innerHTML =
      "A senha está muito pequena";
    Swal.fire({
      icon: "error",
      title: "Senha muito pequena",
      html: "Digite uma senha que tenha pelo menos 6 caracteres",
      confirmButtonColor: "red",
    });
    return false;
  } else {
    if (senha.value != confSenha.value) {
      senha.classList.add("is-invalid");
      confSenha.classList.add("is-invalid");
      senha.classList.remove("is-valid");
      confSenha.classList.remove("is-valid");
      document.getElementById("senha-validation").innerHTML =
        "As senhas estão diferentes";
      document.getElementById("confSenha-validation").innerHTML =
        "As senhas estão diferentes";
      return false;
    } else {
      senha.classList.add("is-valid");
      confSenha.classList.add("is-valid");
      senha.classList.remove("is-invalid");
      confSenha.classList.remove("is-invalid");
      document.getElementById("senha-validation").innerHTML = "";
      document.getElementById("confSenha-validation").innerHTML = "";
      return true;
    }
  }
}
function createAccount() {
  objConexao.novoUsuario(
    nome.value,
    senha.value,
    email.value,
    1,
    new Date().toLocaleDateString("pt-BR"),
    contato.value
  );
}
function searchAccount() {
  objConexao.buscaUsuarios().then((usuarios) => {
    usuarios.forEach((user) => {
      if (user.email == email.value) {
        // Conta existe
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
        document.getElementById("email-validation").innerText =
          "Email já cadastrado";
        return false;
      } else {
        // Conta nao existe
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
        document.getElementById("email-validation").innerText = "";
        return true;
      }
    });
  });
}
