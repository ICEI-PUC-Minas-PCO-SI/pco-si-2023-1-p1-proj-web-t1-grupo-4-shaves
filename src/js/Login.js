import objConexao from "./ModuloConexao.js";
import loginManager from "./ModuloLogin.js";

const checkbox = document.getElementById("mostrarSenhaCheckbox");
const email = document.getElementById("inputEmail");
const senha = document.getElementById("inputSenha");
const email_validation = document.getElementById("email-validation");
const senha_validation = document.getElementById("senha-validation");
const login = document.getElementById("loginBtn");

email.addEventListener("input", validateEmail);
senha.addEventListener("input", validatePassword);
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    senha.type = "text";
  } else {
    senha.type = "password";
  }
});
login.addEventListener("click", searchAccount);

function validateEmail() {
  if(!email.value){
    return false;
  }
  if (email.value.length > 0) {
    if (email.value.includes("@") && email.value.includes(".com")) {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
      document.getElementById("email-validation").innerText = "";
      document
        .getElementById("email-validation")
        .classList.remove("text-danger");
    } else {
      email.classList.remove("is-valid");
      email.classList.add("is-invalid");
      document.getElementById("email-validation").innerText =
        "Preencha com um email válido, exemplo: usuario@gmail.com";
      document.getElementById("email-validation").classList.add("text-danger");
      return false;
    }
  } else {
    email.classList.remove("is-valid");
    email.classList.add("is-invalid");
    email_validation.innerText = "Preencha com um email válido, exemplo: usuario@gmail.com";
    email_validation.classList.add("text-danger");
    return false;
  }
}
function validatePassword() {
  if (senha.value && senha.value.length > 5) {
    senha.classList.remove("is-invalid");
    senha.classList.add("is-valid");
    senha_validation.innerHTML = "";
    senha_validation.classList.remove("text-danger");
    return true;
  } else {
    senha.classList.remove("is-valid");
    senha.classList.add("is-invalid");
    senha_validation.innerHTML = "Senha inválida";
    senha_validation.classList.add("text-danger");
    return false;
  }
}
function searchAccount() {
  objConexao.buscaUsuarios().then((usuarios) => {
    for (let user of usuarios) {
      if (user.email === email.value && user.senha === senha.value) {
        // Conta existe
        loginManager.login(user.id);
        Swal.fire({
          icon: "success",
          title: "Realizando Login...",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          window.location.replace("../pages/HomePage.html");
        });
        return; // Encerra o loop após encontrar uma conta válida
      }
    }
    // Conta não existe
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    senha.classList.add("is-invalid");
    senha.classList.remove("is-valid");
    email_validation.innerText = "Email ou Senha incorretos";
    email_validation.classList.add("text-danger");
    senha_validation.innerText = "Email ou Senha incorretos";
    senha_validation.classList.add("text-danger");
    Swal.fire({
      icon: "error",
      title: "Conta não existe",
      html:
        "Por favor verifique se o email e senha estão corretos",
      confirmButtonColor: "red",
    });
  });
}