import LoginManager from "./ModuloLogin.js";
import JSONServer from './ModuloConexao.js';
import objConexao from "./ModuloConexao.js";
LoginManager.login(3);

var idUsuarioLogado = LoginManager.getIdUsuarioLogado();
console.log(idUsuarioLogado == "")
if (idUsuarioLogado == "") {
    console.log("Ninguem logado");
    window.location.href = "../pages/login.html";
} else {
    console.log("usuario " + idUsuarioLogado + " logado");
}

document.addEventListener("DOMContentLoaded", async function () {

    if (idUsuarioLogado == "") { return; }

    var form = document.getElementById("form-agendamento");

    // Valida as permissões do usuário
    var error = await validaUsuario();

    if (error != 0) {
        form.style.display = "none"; // Oculta o formulário de agendamento
        return;
    }
    var urlParams = new URLSearchParams(window.location.search);
    var idProfissional = urlParams.get("idProfissional");

    if (idProfissional) {
        // Caso o idProfissional exista, definir o valor selecionado no campo "profissional"
        document.getElementById("profissional").value = idProfissional;
    }

    // Evento de envio do formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        var data = document.getElementById("data").value;
        var horario = document.getElementById("horario").value;
        var profissional = document.getElementById("profissional").value;
        var servico = document.getElementById("servico").value;
        var descricao = document.getElementById("descricao").value;


        // Verificar se os campos estão preenchidos
        if (data === "" || horario === "" || profissional === "") {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Verificar se já existe um agendamento com os mesmos dados

        var agendamentos = await buscaAgendamentos();
        var agendamentoExistente = agendamentos.find(function (agendamento) {
            return (
                agendamento.data === data &&
                agendamento.horario === horario &&
                agendamento.barbeiro === profissional
            );
        });

        if (agendamentoExistente) {
            alert("Já existe um agendamento para a data, horário e barbeiro selecionados.");
            return;
        }

        // Só exibe após validar
        exibirCardConfirmacao();

        console.log("Data: " + data);
        console.log("Cliente:" + idUsuarioLogado);
        console.log("Horário: " + horario);
        console.log("Profissional: " + profissional);
        console.log("Serviço: " + servico);
        console.log("Descrição: " + descricao);

     
    });
});

function confirmarAgendamento() {
    alert("Agendamento confirmado!");

    // Buscando valores
    var data = document.getElementById("data").value;
    var horario = document.getElementById("horario").value;
    var cliente = idUsuarioLogado;
    var profissional = document.getElementById("profissional").value;
    var servico = document.getElementById("servico").value;
    var descricao = document.getElementById("descricao").value;

    JSONServer.novoAgendamento(data,horario,cliente,profissional,servico,descricao);

};

function exibirCardConfirmacao() {
    // Verifica se todos os campos obrigatórios foram preenchidos
    if ($("#data").val() && $("#horario").val() && $("#profissional").val() && $("#servico").val()) {

        // Obtém os dados do agendamento
        var data = $("#data").val();
        var horario = $("#horario").val();
        var profissional = $("#profissional").val();
        var servico = $("#servico").val();
        var descricao = $("#descricao").val();
        var nomeProfissional = $("#profissional option:selected").text();


        // Monta a mensagem do popup com os dados do agendamento
        var mensagem = "Dados do agendamento:<br>" +
            "<strong>Data:</strong> " + data + "<br>" +
            "<strong>Hora:</strong> " + horario + "<br>" +
            "<strong>Profissional:</strong> " + nomeProfissional + "<br>" +
            "<strong>Serviço:</strong> " + servico + "<br>" +
            "<strong>Descrição:</strong> " + descricao;

        // Exibe o popup com os dados do agendamento
        Swal.fire({
            icon: 'info',
            title: 'Confirmação do Agendamento',
            html: mensagem,
            showCancelButton: true,
            confirmButtonText: 'Confirmar Agendamento',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                confirmarAgendamento();
            }
        });
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
}


async function buscaAgendamentos() {
    var response = await JSONServer.buscaAgendamentos();
    return response;
}
async function buscaUsuario(id) {
    if (id == "" || id == null) { return null }
    return await JSONServer.buscaUsuarios(id);
}

async function validaUsuario() {
    var id = LoginManager.getIdUsuarioLogado();
    if (id == "") {
        $('main').empty();
        $('main').append('<h3>Sem permissão para acessar essa página.</h3>')
        return 1;
    }
    var usuario = await buscaUsuario(id);


    // Buscar lista de usuários com permissão igual a 2
    var usuarios = await buscaUsuariosPorPermissao(2);

    // Preencher o dropdown com os usuários encontrados
    var dropdown = document.getElementById("profissional");
    usuarios.forEach(function (usuario) {
        var option = document.createElement("option");
        option.value = usuario.id;
        option.text = usuario.nome;
        dropdown.appendChild(option);
    });

    return 0;
}

async function buscaUsuariosPorPermissao(permissao) {
    var usuarios = await JSONServer.buscaUsuarios();
    var retorno = [];
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].permissao == permissao) { retorno.push(usuarios[i]); }
    }
    return retorno;
}
