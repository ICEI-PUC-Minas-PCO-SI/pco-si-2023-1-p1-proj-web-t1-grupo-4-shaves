import JSONServer from "./ModuloConexao.js";

// Inputs
var email = document.getElementById("inputEmail");
var senha = document.getElementById("inputSenha");

// Verificar campos e conta
var loginBtn = document.getElementById("loginBtn");
loginBtn?.addEventListener("click", () => {
  // Checar se existem campos vazios e destaca-los
  if (email.value == "") {
    email.style.border = "2px solid red";
  } else {
    email.style.border = "";
  }

  if (senha.value == "") {
    senha.style.border = "2px solid red";
  } else {
    senha.style.border = "";
  }

  if (email.value == "" || senha.value == "") {
    // Campos vazios encontrados
    Swal.fire({
      icon: "error",
      title: "Campos vazios",
      html: "Por favor preencha todos os campos e tente novamente",
      confirmButtonColor: "red",
    });
  } else {
    try {
      if (verificarContaExistente(email.value, senha.value)) {
        // redireciona para a homepage
        window.location.href = "../pages/HomePage.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Não foi possível realizar login",
          html: "Por favor tente novamente mais tarde",
          showConfirmButton: true,
          confirmButtonColor: "red",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Ocorreu um erro",
        html: error,
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
    }
  }
});

async function verificarContaExistente(email, senha) {
  // Chama o metodo do JSONSERVER
  var usuarios = await JSONServer.buscaUsuarios();

  // Verifica por email igual
  var usuarioExistente = usuarios.find((usuario) => usuario.email === email);

  if (usuarioExistente) {
    // Usuario encontrado
    if (usuarioExistente.senha === senha) {
      //   Senha verificada
      
      // guarda conta no localstorage com chave de usuarioLogado
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioExistente));
      
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Senha Incorreta",
        html: "Por favor insira a senha correta",
        showConfirmButton: true,
        confirmButtonColor: "red",
      });
      return false;
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Conta Não Existe",
      html: "Não encontramos nenhuma conta com esse endereço de email, por favor verifique se o email está correto",
      showConfirmButton: true,
      confirmButtonColor: "red",
    });
    return false;
  }
}
