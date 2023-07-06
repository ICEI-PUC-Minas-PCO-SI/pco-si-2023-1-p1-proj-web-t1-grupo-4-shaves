import JSONServer from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

var usuarioLogado = LoginManager.getIdUsuarioLogado();
var objUsuario = null;

$(document).ready(async function(){
  var usuarioId = LoginManager.getIdUsuarioLogado();
  var usuarioLogado = null;

  console.log(usuarioId)

  if (usuarioId)
      var usuarioLogado = await JSONServer.buscaUsuarios(usuarioId);

    // if (usuarioLogado == null || usuarioLogado == "") { return; } // Se ninguém está logado para por aqui

    // objUsuario = await JSONServer.buscaUsuarios(parseInt(usuarioLogado))

    // if (objUsuario == null) { return; } // Isso aqui não deve acontecer, mas se acontecer parar por aqui

    let inputNome = document.getElementById("nome");
    let inputEmail = document.getElementById("email");
    let inputTelefone = document.getElementById("telefone");
    let inputSenha = document.getElementById("senha");

    var img_perfil = objUsuario.imagem_perfil;
    if (img_perfil == "") {
      img_perfil = "../Img/imagemshavesigor.png";
    }

    let foto = document.getElementById("fotoPerfil").src = "../Img/"+img_perfil;
    /* let inputImagem = document.getElementById("imagem"); */

    inputNome.value = objUsuario.nome;
    inputEmail.value = objUsuario.email;
    inputTelefone.value = objUsuario.telefone;

    let telefone = inputTelefone.value
    telefone = telefone.replace(/\D/g, "");

    if (telefone.length === 11) {
        telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      } else if (telefone.length === 10) {
        telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      }

    inputTelefone.value = telefone;

    inputSenha.value = objUsuario.senha;
   /*  inputImagem.src = usuarioLogado.imagem_perfil; */

    /* console.log("usuarioLogado", usuarioLogado.imagem_perfil); */
    
});

const botaoEditarConta = document.getElementById("editarContaBtn");
botaoEditarConta.addEventListener("click", mudarconta);

document.getElementById("apagarConta").addEventListener('click',apagarConta);
document.getElementById("sairConta").addEventListener('click',sair);

async function mudarconta(){
  
  if (usuarioLogado == null || usuarioLogado == "") { return; } // Se ninguém está logado para por aqui
  
  var inputNome = document.getElementById("nome").value;
  var inputEmail = document.getElementById("email").value;
  var inputTelefone = document.getElementById("telefone").value;
  var inputSenha = document.getElementById("senha").value;

  var arquivo = document.getElementById("arquivoFoto").files[0];
  var nomeArquivo = "";
  if (arquivo) {
    nomeArquivo = arquivo.name;
  }
  
  var novoUsuario = objUsuario; //await JSONServer.buscaUsuarios(usuarioLogado);
  novoUsuario.nome = inputNome;
  novoUsuario.email = inputEmail;
  novoUsuario.telefone = inputTelefone;
  novoUsuario.senha = inputSenha;
  if (nomeArquivo != "") {
    novoUsuario.imagem_perfil = nomeArquivo;
  }

  JSONServer.editaUsuario(usuarioLogado,novoUsuario)
  
  // Exibir uma mensagem de sucesso ou redirecionar para outra pá
  console.log("As informações da conta foram atualizadas com sucesso!");
} 

async function apagarConta() {
  if (usuarioLogado == null || usuarioLogado == "") { return; } // Se ninguém está logado para por aqui
  await JSONServer.apagaUsuario(usuarioLogado);
  console.log("Usuário apagado");
  window.location.href = "../pages/login.html";
}

function sair() {
  LoginManager.logoff();
  window.location.href = "../pages/login.html";
}