import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

const url = new URL(window.location.href);
const default_path = '../Img/';

// Obtém os parâmetros da URL
const params = new URLSearchParams(url.search);

// Obtém o valor do parâmetro "id"
var idurl = params.get("id");

// Enquanto não tiver passando id pela URL, usar essa linha
idurl = 3;

// Aqui é pra simular qual usuário tá logado, comenta ou descomenta se necessário
LoginManager.login(2);



//Verificar se os usuários estão logados e tem permissão ou não para realizar funções:
$(document).ready(async () => {
    var usuario = null;

    if (IdUsuarioLogado) {
        usuario = await objConexao.buscaUsuarios(idurl);
        setValues(usuario);
        exibeTrabalhos();

        if (IdUsuarioLogado == idurl && (usuario.permissao == 2 || usuario.permissao == 3)) {
            exibirVisaoBarbeiro();
        } else {
            exibirVisaoComum();
        }
    } else {
        exibeTrabalhos();
        exibirVisaoComum();
    }
});


//Verifica se o usuário está logado ou tem permissão. Esse código faz aparecer o "Minha Conta" ou o "Gerência" de acordo com as permissões do usuário.
var IdUsuarioLogado = LoginManager.getIdUsuarioLogado();
if(IdUsuarioLogado == ""){
    $('.linkConta').remove()
    $('.linkGerencia').remove()
}
else{
    var usuario = await objConexao.buscaUsuarios(IdUsuarioLogado) 
    if(usuario.permissao !=3){
        $('.linkGerencia').remove() 
    }
}

//Verifica se o usuário está logado ou tem permissão para ver o botão delete.
if(IdUsuarioLogado == ""){
    $('#btnApaga').remove()
}   
if(usuario.permissao == 1){
    $('#btnApaga').remove()
}

//Define qual visão os usuários terão da página:
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

//Carrega a parte de cima do perfil com a imagem, nome, contato e email do usuário:
function setValues(usuario) {
    $('#nomeBarbeiro').text(usuario.nome);
    $('#contatoBarbeiro').text(usuario.telefone);
    $('#emailBarbeiro').text(usuario.email);

    var imgPerfil = usuario.imagem_perfil;
    if (imgPerfil == "")
        imgPerfil = "../Img/fotobarbeiro.jpg";

    $('#fotoBarbeiro').attr('src',imgPerfil);
}

//Mostra a visão de permissão comum de acordo com o HTML (e de acordo com a permissão do usuário):
function exibirVisaoComum() {
    $('.visao-barbeiro').each(function(){ $(this).remove(); });
}

//Mostra a visão de permissão barbeiro de acordo com o HTML (e de acordo com a permissão do usuário), além de conter a função para salvar as alterações dos cards:
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

//Monta os cards do portfólio e guarda no banco de dados:
function montaTrabalhos() {
    var z = [];
    $('.card').each(function(index){
        var imgName = $(this).children('input').val().replace('C:\\fakepath\\', '');
        
        if (imgName == "") { 
            var trabalhos = JSON.parse(localStorage.getItem('cortesBarbeiro'+idurl));

            if (trabalhos == null) { 
                imgName = "fotocorte.jpg"; 
            } else {
                if (trabalhos[index].caminho == "" || trabalhos[index].caminho == null)
                    imgName = "fotocorte.jpg"; 
                else
                    imgName = trabalhos[index].caminho;
            }
            var imagemTagSrc = $(this).children('img').attr('src');
            if (imagemTagSrc.includes('fotocorte.jpg')) {
                imgName = "fotocorte.jpg";
            }
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


//Torna funcional o botão delete:
$('.limpa-card').on('click',function(){
    // Coloquei essa propriedade idcard em cada botão no html, indo de 0 a 5 (6 cards)
    var cardId = $(this).attr('idcard');
    // Depois é só percorrer os cards, verificar se a posição é igual ao id, e se for, limpa o card
    $('.card').each(function(index){
        if (index == cardId) {
            $(this).children('img').attr('src',default_path +"fotocorte.jpg"); // Reseta imagem pra padrão
            $(this).children('div').find('input').val("Corte."); // Limpa título
            $(this).children('div').children('textarea').val("Descrição do corte."); // Limpa descrição
        }
    })
})  


//Mostra os trabalhos de acordo com o que foi salvo no banco de dados:
function exibeTrabalhos() {
    var trabalhos = JSON.parse(localStorage.getItem('cortesBarbeiro'+idurl));
    if (trabalhos == null) {return;}
    $('.card').each(function(index){
        // Visão comum
        if (trabalhos[index].caminho == "" || trabalhos[index].caminho == null)
            trabalhos[index].caminho = "fotocorte.jpg"; 

        $(this).children('img').attr('src',default_path + trabalhos[index].caminho);
        $(this).children('div').children('h5').text(trabalhos[index].titulo);
        $(this).children('div').children('p').text(trabalhos[index].descricao);

        // Visão barbeiro
        $(this).children('div').find('input').val(trabalhos[index].titulo);
        $(this).children('div').children('textarea').val(trabalhos[index].descricao);
    })
}