import objConexao from "./ModuloConexao.js";

/*objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",1);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",2);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",3);
objConexao.novo_agendamento("22/06/2023","18:00",1,2,"corte","teste",4);

objConexao.novo_usuario("user1","123");
objConexao.novo_usuario("user2","123");
objConexao.novo_usuario("user3","123");*/

objConexao.reset_localStorage();

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

function preenche_card_barbeiros() {

    if (vetor_barbeiros.length == 0)
        return;

        vetor_barbeiros.forEach((element,i) => {
        
        const card_barbeiro_html =  '<div class="row bg-secondary card-barbeiro my-3 py-auto w-50" Barbeiro="'+ i +'">' +
                                        '<div class="col-9 m-0">' + 
                                            '<p><strong>Nome:</strong> '+ element.username +'</p>' +
                                            '<hr><p><strong>Atendimentos Totais: </strong></p>' +
                                            '<hr><p><strong>Tempo de serviço: </strong></p>' +
                                        '</div>' +
                                        '<div class="col-3 d-flex">' +
                                            '<button type="button" class="btn btn-secondary d-inline btn_desativar" idBarbeiro="'+ i +'">Desativar</button>' +
                                        '</div>' +
                                    '</div>';

        $('#controle-barbeiros').append(card_barbeiro_html);

        $(".btn_desativar").on('click', function() {
            var idBarbeiro = $(this).attr("idBarbeiro");
            Swal.fire({
                title: 'Tem certeza que deseja desativar esse barbeiro?',
                showDenyButton: true,
                confirmButtonText: 'Desativar',
                denyButtonText: `Cancelar`,
              }).then((result) => {
                if (result.isConfirmed) {
                    apaga_barbeiro(idBarbeiro)
                    Swal.fire('Barbeiro desativado', '', 'success')
                } 
            })
        })

    });

}

function apaga_barbeiro(idBarbeiro) {
    conexao.remove_barbeiro(idBarbeiro);
    $('[Barbeiro='+ idBarbeiro +']').remove()
}

function filtraBarbeiros() {
    objConexao.array_usuarios.forEach(user=>{
        if (user.usertype == 2)
            vetor_barbeiros.push(user);
    });
}