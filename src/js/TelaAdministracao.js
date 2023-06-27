import objConexao from "./ModuloConexao.js";

var prevSearchedUser = null;

// Ao carregar a página
$( document ).ready(function() {
    preencheAgendamentos();
});

async function preencheAgendamentos() {
    var table = $('#t-agen');

    await objConexao.buscaAgendamentos()
    .then(agendamentos=>{
        agendamentos.forEach((agendamento)=>{

            var color = "";
            switch (parseInt(agendamento.status)) {
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
    })
}

$('#busca-usuario').on('click', pesquisaUsuario);
$("#salvar-alteracoes").on('click', salvaInfo);
$("#apagar-usuario").on('click', apagaUsuario);

async function pesquisaUsuario(event) {
    event.preventDefault();
    var nome = $('#nome-usuario').val();
    var usuario = await buscaUsuarioPorNome(nome);
    if (usuario == null) { return; }
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

    var usuario = await objConexao.buscaUsuarios(idUsuário);

    if (usuario == null) { 
        clearAll();
        disableAll();
        return;
    }

    objConexao.apagaUsuario(idUsuário);
    disableAll();
    clearAll();
}

async function buscaUsuarioPorNome(nome) {
    var usuarioRetorno = null;
    await objConexao.buscaUsuarios()
    .then(usuarios=>{
        usuarios.forEach(usuario=>{
            if (usuario.nome == nome) { usuarioRetorno = usuario; }
        })
    })
    return usuarioRetorno;
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