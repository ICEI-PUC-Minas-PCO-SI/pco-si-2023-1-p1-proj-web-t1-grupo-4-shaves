import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

const url = new URL(window.location.href);
const default_path = '../Img/';

// Obtém os parâmetros da URL
const params = new URLSearchParams(url.search);

// Obtém o valor do parâmetro "id"
var idurl = params.get("id");

// Enquanto não tiver passando id pela URL, usar essa linha
idurl = 5;

// Aqui é pra simular qual usuário tá logado, comenta ou descomenta se necessário
//LoginManager.login(5)

var IdUsuarioLogado = LoginManager.getIdUsuarioLogado();

$(document).ready(async ()=>{

    var usuario = await objConexao.buscaUsuarios(idurl);

    setValues(usuario);

    exibeTrabalhos();

    if (IdUsuarioLogado != idurl) {
        exibirVisaoComum();
    } else {
        exibirVisaoBarbeiro();
    }

})

function setValues(usuario) {
    $('#nomeBarbeiro').text(usuario.nome);
    $('#contatoBarbeiro').text(usuario.telefone);
    $('#emailBarbeiro').text(usuario.email);

    var imgPerfil = usuario.imagem_perfil;
    if (imgPerfil == "")
        imgPerfil = "../Img/default_barber.jpg";

    $('#fotoBarbeiro').attr('src',imgPerfil);
}

function exibirVisaoComum() {
    $('.visao-barbeiro').each(function(){ $(this).remove(); });
}

function exibirVisaoBarbeiro() {
    $('.visao-comum').each(function(){ $(this).remove(); });
    $('#salvar-trabalhos').on('click',function(){
        var todosCortes = montaTrabalhos();
        localStorage.setItem('cortesBarbeiro'+idurl,JSON.stringify(todosCortes));
        Swal.fire(
            'Editado!',
            'As informações foram atualizadas!',
            'success'
        );
        setTimeout(()=>{
            window.location.reload();
        },2000)
    })
}

function montaTrabalhos() {
    var z = [];
    $('.card').each(function(index){
        var imgName = $(this).children('input').val().replace('C:\\fakepath\\', '');
        
        if (imgName == "") { 
            var trabalhos = JSON.parse(localStorage.getItem('cortesBarbeiro'+idurl));

            if (trabalhos[index].caminho == "" || trabalhos[index].caminho == null)
                imgName = "default_cut.jpg"; 
            else
                imgName = trabalhos[index].caminho;
        }

        var tituloCorte = $(this).children('div').find('input').val();
        var descCorte = $(this).children('div').children('textarea').val();
        z.push({
            "caminho": imgName,
            "descricao": descCorte,
            "titulo":tituloCorte
        })
    });
    return z;
}

function exibeTrabalhos() {
    var trabalhos = JSON.parse(localStorage.getItem('cortesBarbeiro'+idurl));
    if (trabalhos == null) {return;}
    $('.card').each(function(index){
        // Visão comum
        if (trabalhos[index].caminho == "" || trabalhos[index].caminho == null)
            trabalhos[index].caminho = "default_cut.jpg"; 

        $(this).children('img').attr('src',default_path + trabalhos[index].caminho);
        $(this).children('div').children('h5').text(trabalhos[index].titulo);
        $(this).children('div').children('p').text(trabalhos[index].descricao);

        // Visão barbeiro
        $(this).children('div').find('input').val(trabalhos[index].titulo);
        $(this).children('div').children('textarea').val(trabalhos[index].descricao);
    })
}