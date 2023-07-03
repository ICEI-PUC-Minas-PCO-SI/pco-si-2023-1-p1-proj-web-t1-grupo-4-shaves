import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";
// No início do arquivo, adicione o seguinte código para aguardar o carregamento do DOM:
$(document).ready(function() {
    // Evento de clique no botão de pesquisa
    $('#search-button').click(function() {
        // Obter o valor da barra de pesquisa
        var searchTerm = $('#search-input').val().toLowerCase();
        
        // Chamar uma função para pesquisar com o termo fornecido
        searchBarber(searchTerm);
    });
});


preencheBarbeiro();
async function preencheBarbeiro(){
    var todosUsuarios = await objConexao.buscaUsuarios();
    var barbeiros = filtraBarbeiros(todosUsuarios);
    for(let i = 0;i<barbeiros.length;i++){
        const card = ` <div class="card">
        <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${barbeiros[i].imagem_perfil}" class="p-2 card-img img-fluid profile-pic rounded-circle" alt="Foto de Perfil">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${barbeiros[i].nome}</h5>
            <a href="agendamento.html?idProfissional=${barbeiros[i].id}"    class="btn btn-primary">Agendar horário</a>
            <a href="primeiroPerfil.html?id=${barbeiros[i].id}"  class="btn btn-danger">Ver Perfil</a>
            </div>
        </div>
        </div>
    </div>`
    $('#sessaoBarbeiros').append(card)
    }
    
}

function filtraBarbeiros(todosUsuarios){
    var barbeiros = [];
    for(let i =0;i<todosUsuarios.length;i++){
        if(todosUsuarios[i].permissao == 2){
            barbeiros.push(todosUsuarios[i]);
        }
    }
    return barbeiros;
}

$(document).ready(function() {
    // Evento de digitação no campo de pesquisa
    $('#search-input').on('input', function() {
       
        var searchTerm = $(this).val().toLowerCase();
        
        if (searchTerm === '') {
            showAllBarbers(); 
        } else {
            searchBarber(searchTerm); 
        }
    });
});

function showAllBarbers() {
    $('.card').show(); 
}

function searchBarber(searchTerm) {
    $('.card').each(function() {
        var cardBarberName = $(this).find('.card-title').text().toLowerCase();
        if (cardBarberName.includes(searchTerm)) {
            $(this).show(); 
        } else {
            $(this).hide(); 
        }
    });
}


