import objConexao from "./ModuloConexao.js";

var permissoes = ["","Cliente","Barbeiro","Administrador"];
var prevSearchedUser = null;
var todosAgendamentos = [];
var todosUsuarios = [];

// Ao carregar a página
$( document ).ready(function() {
    preencheAgendamentos();
    preencheUsuarios();
});

async function preencheAgendamentos() {
    var table = $('#t-agen');

    objConexao.buscaAgendamentos()
    .then(agendamentos=>{
        todosAgendamentos = agendamentos;
        agendamentos.forEach((agendamento)=>{

            var color = "";
            switch (parseInt(agendamento.status)) {
                case 1: color = "table-primary"; break;
                case 2: color = "table-success"; break;
                case 3: color = "table-danger";  break;
                case 4: color = "table-warning"; break;
            }
    
            var actions = ` <div class="container-fluid d-flex justify-content-center">
                                <button agenID="${agendamento.id}" class="btn bg-danger delete-ag" style="color: white;" >
                                    <span class="material-symbols-outlined">
                                    delete
                                    </span>
                                </button>
                                <button agenID="${agendamento.id}" class="btn bg-primary ms-1 edit-ag" style="color: white;" >
                                    <span class="material-symbols-outlined">
                                    edit_square
                                    </span>
                                </button>
                            </div>`;
    
            table.append(`<tr class="${color}">
                            <td>${agendamento.id}</td>
                            <td>${agendamento.data}</td>
                            <td>${agendamento.horario}</td>
                            <td>${agendamento.cliente}</td>
                            <td>${agendamento.barbeiro}</td>
                            <td class="d-flex">${actions}</td>
                        `);//<td>${agendamento.servico}</td>
            
        });
        $(`.delete-ag`).on('click',function() {
            apagaAgendamento(parseInt($(this).attr("agenID")));
        });
        $(`.edit-ag`).on('click',function() {
            editaAgendamento(parseInt($(this).attr("agenID")));
        });
    })
}

async function preencheUsuarios() {
    var table = $('#t-users');
    objConexao.buscaUsuarios()
    .then(usuarios=>{
        todosUsuarios = usuarios;
        usuarios.forEach(usuario=>{
            var color = "";
            switch (parseInt(usuario.permissao)) {
                case 1: color = "table-success"; break;
                case 2: color = "table-primary"; break;
                case 3: color = "table-warning";  break;
            }
            table.append(`<tr class="${color}">
                            <td>${usuario.id}</td>
                            <td>${usuario.nome}</td>
                            <td>${usuario.email}</td>
                            <td>${permissoes[usuario.permissao]}</td>
                        `);
        });
    });
}

$('.closeModal').click(()=>{
    $('#CategoryModal').modal('hide')
})
$('#save-ag-edit').on('click',()=>{
    var id = parseInt($('#CategoryModal').attr('agen_id'));
    var agendamento = getAgendamentoById(id);
    if (agendamento == null) {return}
    var novoStatus = parseInt($(`#CategoryModal input:checked`).val());
    agendamento.status = novoStatus;
    objConexao.editaAgendamento(id,agendamento);
})

$('#busca-usuario').on('click', pesquisaUsuario);
$("#salvar-alteracoes").on('click', salvaInfo);
$("#apagar-usuario").on('click', apagaUsuario);

async function pesquisaUsuario(event) {
    event.preventDefault();
    var nome = $('#nome-usuario').val();
    var usuario = buscaUsuarioPorNome(nome);
    if (usuario == null) { 
        clearAll();
        disableAll();
        return; 
    }
    exibeInfoUsuario(usuario);
    prevSearchedUser = usuario;
}

async function salvaInfo(event) {
    event.preventDefault();
    //var usuario = await objConexao.buscaUsuarios(idUsuário);
    var usuario = prevSearchedUser;
    usuario.email = $("#show-email").val();
    usuario.permissao = $("#select-permissions").val();
    usuario.telefone = $("#show-phone").val();
    objConexao.editaUsuario(usuario.id,usuario);
    prevSearchedUser = usuario;
    /* Swal.fire(
        'Editado!',
        'As informações foram atualizadas!',
        'success'
    ); */
}

async function apagaUsuario() {
    var idUsuário = $("#show-id").val();

    if (idUsuário == "" || idUsuário == null) { return; }

    var usuario = getUsuarioById(parseInt(idUsuário));

    if (usuario == null) { 
        clearAll();
        disableAll();
        return;
    }

    objConexao.apagaUsuario(idUsuário);
    disableAll();
    clearAll();
}

async function apagaAgendamento(idAgendamento) {
    objConexao.apagaAgendamento(idAgendamento);
}

function editaAgendamento(idAgendamento) {
    var agendamento = getAgendamentoById(idAgendamento);
    if (agendamento == null) {return}
    $('#CategoryModal').attr('agen_id',agendamento.id);
    $('#CategoryModal').modal('show');
    //$(`#CategoryModal input:checked`).prop('checked',false);
    $(`#CategoryModal input[value="${agendamento.status}"]`).prop('checked',true);
}

function getAgendamentoById(idAgendamento) {
    var agendamento = null;
    for (let i = 0; i < todosAgendamentos.length; i++) {
        if (todosAgendamentos[i].id == idAgendamento)
            agendamento = todosAgendamentos[i];
    }
    return agendamento;
}

function getUsuarioById(idUsuário) {
    var usuarioRetorno = null;
    for (let i = 0; i < todosUsuarios; i++) {
        if (todosUsuarios[i].id == idUsuário) { usuarioRetorno = todosUsuarios[i]; }
    }
    return usuarioRetorno;
}

function buscaUsuarioPorNome(nome) {
    for (let i = 0; i < todosUsuarios.length; i++) {
        if (todosUsuarios[i].nome == nome) { return todosUsuarios[i]; }
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
    $("#select-permissions").val(parseInt(usuario.permissao));
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