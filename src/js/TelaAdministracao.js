import objConexao from "./ModuloConexao.js";
import LoginManager from "./ModuloLogin.js";

var permissoes = ["","Cliente","Barbeiro","Administrador"];
var prevSearchedUser = null;
var todosAgendamentos = [];
var todosUsuarios = [];

// Ao carregar a página
$( document ).ready(async function() {

    var error = await validaUsuario();

    if (error != 0) {return;}

    preencheAgendamentos();
    preencheUsuarios();
});

async function validaUsuario() {
    var id = LoginManager.getIdUsuarioLogado();
    if (id == "") {
        $('main').empty();
        $('main').append('<h3>Sem permissão para acessar essa página.</h3>')
        return 1;
    }
    var usuario = await objConexao.buscaUsuarios(id);
    if (usuario.permissao != 3) {
        $('main').empty();
        $('main').append('<h3>Sem permissão para acessar essa página.</h3>');
        return 2;
    }
    return 0;
}

async function preencheAgendamentos() {
    var table = $('#t-agen');

    // Limpa tabela
    $('#t-agen tr').each((index, elem)=>{ if (index != 0) {elem.remove()} });

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

    // Limpa tabela
    $('#t-users tr').each((index, elem)=>{ if (index != 0) {elem.remove()} });

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
    Swal.fire({
        title: 'Editado!',
        text: 'As informações foram atualizadas!',
        icon: 'success',
    });
    preencheAgendamentos();
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
    Swal.fire({
        title: 'Editado!',
        text: 'As informações foram atualizadas!',
        icon: 'success',
    });
    preencheUsuarios();
}

async function apagaUsuario(event) {
    event.preventDefault();
    var idUsuário = $("#show-id").val();

    if (idUsuário == "" || idUsuário == null) { return; }
    Swal.fire({
        title: 'Tem certeza?',
        text: "As informações desse usuário serão apagadas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            var usuario = getUsuarioById(idUsuário);
            if (usuario == null) { 
                clearAll();
                disableAll();
                return;
            }
            objConexao.apagaUsuario(idUsuário);
            disableAll();
            clearAll();
            Swal.fire(
                'Deletado!',
                'O usuário foi apagado com sucesso.',
                'success'
            )
            preencheUsuarios()
        }
    })
}

async function apagaAgendamento(idAgendamento) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "As informações desse agendamento serão apagadas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            objConexao.apagaAgendamento(idAgendamento);
            Swal.fire(
                'Deletado!',
                'O agendamento foi apagado com sucesso.',
                'success'
            )
            preencheAgendamentos()
        }
    })
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
    for (let i = 0; i < todosUsuarios.length; i++) {
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