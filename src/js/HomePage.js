import JSONServer from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

/* localStorage.clear();

objConexao.novo_usuario("Michael Fernandes","1234","",2);
objConexao.novo_usuario("Samuel Nogueira","1234","",2);
objConexao.novo_usuario("Washigton Dias","1234","",2); 
objConexao.novo_usuario("Felipe Melo", "2525","flipe@gmail.com", 2);

objConexao.novo_agendamento("02/07/2023", "8:00", "Luiz Braga", "Washigton Dias", "Corte Basico", "Corte Basico", 0);
objConexao.novo_agendamento("05/07/2023", "8:00", "Luiz Braga", "Samuel Nogueira", "Corte Basico2", "Corte Basico2", 0);
objConexao.novo_agendamento("09/07/2023", "8:00", "Luiz Braga", "Michael Fernandes", "Corte Basico3", "Corte Basico3", 0);
objConexao.novo_agendamento("11/07/2023", "8:00", "Luiz Braga", "Felipe Melo", "Corte Basico4", "Corte Basico4", 0);
objConexao.novo_agendamento("13/07/2023", "13:00", "Luiz Braga", "Samuel Nogueira", "Corte Basico5", "Corte Basico5", 0);
objConexao.novo_agendamento("16/07/2023", "13:00", "Luiz Braga", "Felipe Melo", "Corte Basico6", "Corte Basico6", 0);
objConexao.novo_agendamento("20/07/2023", "13:00", "Luiz Braga", "Felipe Melo", "Corte Basico7", "Corte Basico7", 1);


console.log(objConexao.lista_usuarios_json) */

/* $("#enviar").click(function(){
    var arquivo= document.getElementById("arquivo").files[0]
     objConexao.upload_imagem_perfil(2,arquivo) 
}) */


$(document).ready(async function(){
    var usuarioId = LoginManager.getIdUsuarioLogado();
    var usuarioLogado = null;

    console.log(usuarioId)

    if (usuarioId)
        var usuarioLogado = await JSONServer.buscaUsuarios(usuarioId);

    console.log("usuarioLogado", usuarioLogado)

    if (!usuarioLogado || usuarioLogado.permissao == '3')
        document.getElementById("ultimoAgendamento").style.display = "none";
    
    if (!usuarioLogado) {
        const minhaConta = document.getElementById("minhaConta")
        minhaConta.innerText = "Login"
        minhaConta.href = "login.html"
    }

    var todosUsuarios = await JSONServer.buscaUsuarios();

    var barbeiros = todosUsuarios.filter(function(usuario) {
        return usuario.permissao === "2" || usuario.permissao === "3" ;
    });

    var agendamentos = await JSONServer.buscaAgendamentos();

    var listaQuantidadesBarbeiros = []; // Lista para armazenar as quantidades de agendamentos por barbeiro

    if (agendamentos && Array.isArray(agendamentos)) {
        // Contar a quantidade de agendamentos por barbeiro
        var contadorBarbeiros = {};

        for (var i = 0; i < agendamentos.length; i++) {
            var agendamento = agendamentos[i];
            var nomeBarbeiro = agendamento.barbeiro;

            if (contadorBarbeiros[nomeBarbeiro]) {
                contadorBarbeiros[nomeBarbeiro]++;
            } else {
                contadorBarbeiros[nomeBarbeiro] = 1;
            }
        }

        // Armazenar a quantidade de agendamentos por barbeiro na lista
        for (var barbeiro in contadorBarbeiros) {
            var quantidade = contadorBarbeiros[barbeiro];
                listaQuantidadesBarbeiros.push({
                barbeiro: barbeiro,
                quantidade: quantidade
            });
        }

        console.log("Lista de quantidades por barbeiro:", listaQuantidadesBarbeiros);

        listaQuantidadesBarbeiros.sort(function(a, b) {
            return b.quantidade - a.quantidade;
          });

        console.log("Lista ordenada de  quantidades por barbeiro:", listaQuantidadesBarbeiros);  
    } 

    for(let i=0; i < listaQuantidadesBarbeiros.length; i++){
        console.log('lista', listaQuantidadesBarbeiros[i].barbeiro);
        for(let j=0; j<barbeiros.length; j++) {
            
            console.log(listaQuantidadesBarbeiros[i].barbeiro, barbeiros[j].id )
            if(listaQuantidadesBarbeiros[i].barbeiro == barbeiros[j].id) {
                var barbeiro = await JSONServer.buscaUsuarios(barbeiros[j].id);
                CriarCard(barbeiro)
                j = 10;
            }
        }
    }
    
    if (usuarioLogado) {

        var ultimoAgendamento = [];
        
        ultimoAgendamento = null;    
        for (let i=0; i<agendamentos.length;i++) {
            console.log('status:',agendamentos[i].status, agendamentos[i].cliente, usuarioLogado.id)
            if (agendamentos[i].status == "1" && parseInt(agendamentos[i].cliente) == usuarioLogado.id)
                ultimoAgendamento = agendamentos[i];
        }
        
        console.log('aqui', ultimoAgendamento)
        if (ultimoAgendamento) {
            var barbeiroAgendado = await JSONServer.buscaUsuarios(parseInt(ultimoAgendamento.barbeiro));
            console.log("filtro", ultimoAgendamento,barbeiroAgendado)
        }
        CriarUltimo(ultimoAgendamento, barbeiroAgendado)
        
    }
})

function CriarCard(barbeiro){
    var card= ` <div class=" col-lg-4  col-sm-12  mb-3 ">
    <div class="card  mt-3 h-100 ">
    <div class="card-header bg-light mt-1 mx-1">
    <img class="img-fluid  rounded " id="barbeiro" src="${barbeiro.imagem_perfil}">
    </div>
    <div class="card-body bg-light mb-1 mx-1 ">
    <a class="h5 text-decoration-none text-dark text-center" >${barbeiro.nome}</a>
    <p></p>
    <p> <b>e-mail:</b> ${barbeiro.email}</p>
    <p> <b>Contato:</b> ${barbeiro.telefone}
    <p></p>
    
    </div>
    </div>
    </div>`
    $("#cardLabel").append(card)
}

//Botao Agendar Horario
/* <a href="segundoPerfil.html" class="btn btn-dark">Agendar horário</a> */

function CriarUltimo(ultimoAgendamento, barbeiroAgendado){
    console.log('ultimoAgendamento', ultimoAgendamento);
    if (ultimoAgendamento) {
        var card= `                                 <p class="h4">Barbeiro:</p>
        <p>${barbeiroAgendado.nome}</p>
        <hr>
        <p class="h4">Data e Hora:</p>
        <p>${ultimoAgendamento.data} às ${ultimoAgendamento.horario}</p>
        <hr>
        <p class="h4">Serviço:</p>
        <p>${ultimoAgendamento.servico} - ${ultimoAgendamento.descricao}</p> `
    } else {
        var card=`<p class="h5">Você não possui agendamento</p>`
    } 
    $("#cardUltimo").append(card)
}

  // Obtém o elemento do carrossel
  var carousel = document.getElementById('carouselExampleIndicators');

  // Inicia a rolagem automática
  var carouselInterval = setInterval(function() {
    // Verifica se o carrossel está sendo exibido
    if (document.visibilityState === 'visible') {
      // Rola para o próximo slide
      var nextButton = carousel.querySelector('.carousel-control-next');
      nextButton.click();
    }
  }, 3000); // Define o intervalo de tempo em milissegundos (3000 = 3 segundos)

 

  