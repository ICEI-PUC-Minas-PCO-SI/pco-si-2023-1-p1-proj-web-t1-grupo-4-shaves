import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";


const url = new URL(window.location.href);

// Obtém os parâmetros da URL
const params = new URLSearchParams(url.search);

// Obtém o valor do parâmetro "id"
var idurl = params.get("id");
idurl = 1;

console.log(idurl); // Imprime "12345"

async function buscaInfoBarbeiros(){
    var usuario = await objConexao.buscaUsuarios(idurl)
    console.log(usuario);
}