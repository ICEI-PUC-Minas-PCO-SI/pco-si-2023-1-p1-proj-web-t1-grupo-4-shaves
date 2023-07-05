import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

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