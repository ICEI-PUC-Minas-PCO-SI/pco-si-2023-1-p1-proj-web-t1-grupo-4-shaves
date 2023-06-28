import LoginManager from "./ModuloLogin.js";

document.addEventListener("DOMContentLoaded", async function () {
    var form = document.getElementById("form-agendamento");

    // Valida as permissões do usuário
    var error = await validaUsuario();

    if (error != 0) {
        form.style.display = "none"; // Oculta o formulário de agendamento
        return;
    }

    // Evento de envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var data = document.getElementById("data").value;
        var horario = document.getElementById("horario").value;
        var profissional = document.getElementById("profissional").value;
        var servico = document.getElementById("servico").value;
        var descricao = document.getElementById("descricao").value;

        console.log("Data: " + data);
        console.log("Horário: " + horario);
        console.log("Profissional: " + profissional);
        console.log("Serviço: " + servico);
        console.log("Descrição: " + descricao);

        // Objeto com os dados do formulário
        var formData = {
            data: data,
            horario: horario,
            profissional: profissional,
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
                    // Aqui você pode adicionar lógica adicional após o envio dos dados para o servidor
                } else {
                    console.log("Erro ao enviar os dados. Status: " + response.status);
                    // Aqui você pode adicionar lógica para lidar com erros
                }
            })
            .catch(error => {
                console.log("Erro ao enviar os dados:", error);
            });

        // Limpa o formulário após a submissão
        form.reset();
    });
});

async function buscaUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`);
        if (response.ok) {
            const usuario = await response.json();
            return usuario;
        } else {
            console.log("Erro ao buscar usuário. Status: " + response.status);
            return null;
        }
    } catch (error) {
        console.log("Erro ao buscar usuário:", error);
        return null;
    }
}




async function validaUsuario() {
    var id = LoginManager.getIdUsuarioLogado();
    if (id == "") {
        $('main').empty();
        $('main').append('<h3>Sem permissão para acessar essa página.</h3>')
        return 1;
    }
    var usuario = await buscaUsuario(id.value);
    if (usuario.permissao != 2) { // Verifica se o usuário tem permissão de barbeiro
        $('main').empty();
        $('main').append('<h3>Sem permissão para acessar essa página.</h3>');
        return 2;
    }

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
