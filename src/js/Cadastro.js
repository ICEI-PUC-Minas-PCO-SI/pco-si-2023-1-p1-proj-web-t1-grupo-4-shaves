import objConexao from "./ModuloConexao.js";

const nome = document.getElementById("inputNome");
const email = document.getElementById("inputEmail");
const contato = document.getElementById("inputContato");
const senha = document.getElementById("inputSenha");
const confSenha = document.getElementById("inputConfSenha");

const checkbox = document.getElementById("mostrarSenhaCheckbox");
const submitBtn = document.getElementById("criarContaBtn");

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
      return true;
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
  const contatoPattern = /^\d{2}\s\d{9}$/;
  if (contato.value && contatoPattern.test(contato.value)) {
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
function hasWhiteSpace() {
  return !/\s/g.test(senha.value);
}
function stripWhiteSpace() {
  return senha.value.replace(/\s+/g, "");
}
function validateSenha() {
  if (senha.value && senha.value.length > 5 && hasWhiteSpace) {
    senha.classList.remove("is-invalid");
    senha.classList.add("is-valid");
    document.getElementById("senha-validation").innerHTML = "";
    return true;
  } else {
    senha.classList.remove("is-valid");
    senha.classList.add("is-invalid");
    document.getElementById("senha-validation").innerHTML =
      "A senha deve ter de no mínimo <b>6 caracteres</b>, contendo letras e/ou números.";
    return false;
  }
}
function validateConfSenha() {
  if (confSenha.value) {
    if (senha.value == confSenha.value) {
      confSenha.classList.remove("is-invalid");
      confSenha.classList.add("is-valid");
      document.getElementById("confSenha-validation").innerHTML = "";
      return true;
    } else {
      confSenha.classList.remove("is-valid");
      confSenha.classList.add("is-invalid");
      document.getElementById("confSenha-validation").innerHTML =
        "As senhas precisam devem ser iguais";
      return false;
    }
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
    if (nome.value == "") {
      nome.classList.remove("is-valid");
      nome.classList.add("is-invalid");
      document.getElementById("nome-validation").innerText = "Campo Vazio";
    }
    if (email.value == "") {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.getElementById("email-validation").innerText = "Campo Vazio";
    }
    if (contato.value == "") {
      contato.classList.remove("is-valid");
      contato.classList.add("is-invalid");
      document.getElementById("contato-validation").innerText = "Campo Vazio";
    }
    if (senha.value == "") {
      senha.classList.remove("is-valid");
      senha.classList.add("is-invalid");
      document.getElementById("senha-validation").innerText = "Campo Vazio";
    }
    if (confSenha.value == "") {
      confSenha.classList.remove("is-valid");
      confSenha.classList.add("is-invalid");
      document.getElementById("confSenha-validation").innerText = "Campo Vazio";
    }
  } else {
    if (
      validateNome &&
      validateEmail &&
      validateContato &&
      validateSenha &&
      validateConfSenha
    ) {
      if (createAccount()) {
        Swal.fire({
          icon: "success",
          title: "Conta Criada!",
          text: "Faça o login na sua conta nova",
          showConfirmButton: false,
          timer: 2000,
        }).then(()=>{
          window.location.replace("../pages/login.html");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro",
          text: "Não foi possível cadastrar essa conta, tente novamente mais tarde",
          showConfirmButton: true,
          timer: 2000,
        });
      }
    }
  }
}
async function createAccount() {
  try {
    const result = await objConexao.novoUsuario(
      nome.value,
      senha.value,
      email.value,
      1,
      new Date().toLocaleDateString("pt-BR"),
      contato.value
    );
    return result;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ocorreu um erro",
      text: "Não foi possível cadastrar essa conta, tente novamente mais tarde",
      showConfirmButton: true,
      confirmButtonColor: "red"
    });
    console.error("Erro ao criar conta:", error);
    return false;
  }
}
async function searchAccount() {
  try {
    const usuarios = await objConexao.buscaUsuarios();
    if (usuarios.length > 0) {
      for (let user of usuarios) {
        if (user.email === email.value) {
          email.classList.add("is-invalid");
          email.classList.remove("is-valid");
          document.getElementById("email-validation").innerText =
            "Email já cadastrado";
          return false; // Conta já existe, retorna false
        }
      }
    }
    email.classList.add("is-valid");
    email.classList.remove("is-invalid");
    document.getElementById("email-validation").innerText = "";
    return true; // Conta não existe, retorna true
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ocorreu um erro",
      text: "Não foi possível cadastrar essa conta, tente novamente mais tarde",
      showConfirmButton: true,
      confirmButtonColor: "red"
    });
    console.error("Erro ao buscar usuários:", error);
    return false;
  }
}
