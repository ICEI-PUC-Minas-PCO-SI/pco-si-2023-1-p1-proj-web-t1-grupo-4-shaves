import objConexao from "./ModuloConexao.js";

var vetor_barbeiros = [];



// Ao carregar a página
$( document ).ready(function() {
    filtraBarbeiros();
    preenche_card_barbeiros();
});

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