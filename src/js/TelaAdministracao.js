import objConexao from "./ModuloConexao.js";

/* objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",1);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",2);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",3);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",4);

objConexao.novo_usuario("user1","123");
objConexao.novo_usuario("user2","123");*/


//objConexao.reset_localStorage();

var vetor_barbeiros = [];

// Ao carregar a página
$( document ).ready(function() {
    preencheAgendamentos();
});

function preencheAgendamentos() {
    var table = $('#t-agen');
    var agendamentos = objConexao.lista_agendamentos_json;
    agendamentos.forEach((agendamento)=>{

        var color = "";
        switch (agendamento.status) {
            case 1: color = "table-primary"; break;
            case 2: color = "table-success"; break;
            case 3: color = "table-danger";  break;
            case 4: color = "table-warning"; break;
        }

        var actions = `<button class="btn bg-danger" style="color: white;" >
                            <span class="material-symbols-outlined">
                            delete
                            </span>
                       </button>`;

        table.append(`<tr class="${color}">
                        <td>${agendamento.id}</td>
                        <td>${agendamento.data}</td>
                        <td>${agendamento.horario}</td>
                        <td>${agendamento.cliente}</td>
                        <td>${agendamento.barbeiro}</td>
                        <td>${agendamento.servico}</td>
                        <td class="d-flex">${actions}</td>
                    `);
    });
}

$('#busca-usuario').on('click', pesquisaUsuario);

$("#salvar-alteracoes").on('click', salvaInfo);
$("#apagar-usuario").on('click', apagaUsuario);

function pesquisaUsuario() {
    var nome = $('#nome-usuario').val();
    var usuario = buscaUsuarioPorNome(nome);
    exibeInfoUsuario(usuario);
}

function salvaInfo() {
    var nome = $('#nome-usuario').val();
    var usuario = buscaUsuarioPorNome(nome);
    usuario.email = $("#show-email").val();
    usuario.usertype = $("#select-permissions").val();
    usuario.telefone = $("#show-phone").val();
    editaUsuario(usuario.id, usuario);
    Swal.fire(
        'Editado!',
        'As informações foram atualizadas!',
        'success'
    );
}

function apagaUsuario() {
    var idUsuário = $("#show-id").val();
    for (let i = 0; i < objConexao.lista_usuarios_json.length; i++) {
        if (objConexao.lista_usuarios_json[i].id == idUsuário)
            objConexao.lista_usuarios_json.splice(i,1);
    }
    objConexao.salvar();
    Swal.fire(
        'Removido!',
        'O usuário foi deletado!',
        'success'
    );
    disableAll();
    clearAll();
}

function editaUsuario(idUsuário, novoUsuario) {
    var usuarios = objConexao.lista_usuarios_json;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i] == idUsuário) 
            objConexao.lista_usuarios_json[i] = novoUsuario; 
    }
    objConexao.salvar();
}

function buscaUsuarioPorNome(nome) {
    var usuarios = objConexao.lista_usuarios_json;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].nome == nome) { return usuarios[i]; }
    }
    return null;
}

function exibeInfoUsuario(usuario) {
    if (usuario == null) { 
        disableAll();
        clearAll();
        return; 
    }
    disableAll(false);
    $("#show-id").val(usuario.id);
    $("#show-email").val(usuario.email);
    $("#select-permissions").val(usuario.usertype);
    $("#show-phone").val(usuario.telefone);
    $("#show-creation").val(usuario.creationDate);
}

function disableAll(value = true) {
    //$("#show-id").prop('disabled',value);
    $("#show-email").prop('disabled',value);
    $("#show-phone").prop('disabled',value);
    //$("#show-creation").prop('disabled',value);
    $("#select-permissions").prop('disabled',value);
    $("#salvar-alteracoes").prop('disabled',value);
    $("#apagar-usuario").prop('disabled',value);
}

function clearAll() {
    $("#show-id").val('');
    $("#show-email").val('');
    $("#show-phone").val('');
    $("#show-creation").val('');
    $("#select-permissions").val('');
}