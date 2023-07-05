import JSONServer from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

$(document).ready(async function(){
    var usuarioLogado = LoginManager.getIdUsuarioLogado();
    var objetousuario = await JSONServer.buscaUsuarios(parseInt(usuarioLogado))
    console.log(objetousuario)
  

    let inputNome = document.getElementById("nome");
    let inputEmail = document.getElementById("email");
    let inputTelefone = document.getElementById("telefone");
    let inputSenha = document.getElementById("senha");
    /* let inputImagem = document.getElementById("imagem"); */

    inputNome.value = objetousuario.nome;
    inputEmail.value = objetousuario.email;
    inputTelefone.value = objetousuario.telefone;

    let telefone = inputTelefone.value
    telefone = telefone.replace(/\D/g, "");

    if (telefone.length === 11) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (telefone.length === 10) {
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      }

    inputTelefone.value = telefone;

    inputSenha.value = objetousuario.senha;
   /*  inputImagem.src = usuarioLogado.imagem_perfil; */

    /* console.log("usuarioLogado", usuarioLogado.imagem_perfil); */
});