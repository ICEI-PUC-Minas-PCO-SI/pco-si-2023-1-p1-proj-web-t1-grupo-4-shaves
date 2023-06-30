import LoginManager from "./ModuloLogin.js";
import JSONServer from './ModuloConexao.js';
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

    // Evento de envio do formulário
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        var data = document.getElementById("data").value;
        var cliente = await buscaUsuario(idUsuarioLogado);
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

        console.log("Data: " + data);
        console.log("Cliente:" + cliente);
        console.log("Horário: " + horario);
        console.log("Profissional: " + profissional);
        console.log("Serviço: " + servico);
        console.log("Descrição: " + descricao);

        // Objeto com os dados do formulário
        var formData = {
            data: data,
            horario: horario,
            cliente: cliente,
            barbeiro: profissional,
            servico: servico,
            descricao: descricao
        };

        // Fazer a requisição para o servidor usando o fetch
        fetch("http://localhost:3000/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Dados enviados com sucesso!");
                } else {
                    console.log("Erro ao enviar os dados. Status: " + response.status);
                }
            })
            .catch(error => {
                console.log("Erro ao enviar os dados:", error);
            });

        form.reset();
    });
});
async function buscaAgendamentos() {
    var response = await fetch("http://localhost:3000/agendamentos");
    var agendamentos = await response.json();
    return agendamentos;
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
