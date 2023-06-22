import Swal from 'sweetalert2';
import './ModuloConexao'

// Mostrar Senha logic
var mostrarSenhaCheckbox = document.getElementById("mostrarSenhaCheckbox");
var inputSenha = document.getElementById("inputSenha");
var inputConfSenha = document.getElementById("inputConfSenha");

mostrarSenhaCheckbox.addEventListener("change", function () {
  if (mostrarSenhaCheckbox.checked) {
    inputSenha.type = "text";
    inputConfSenha.type = "text";
  } else {
    inputSenha.type = "password";
    inputConfSenha.type = "password";
  }
});

// Cadastrar Conta
var inputNome = document.getElementById("inputNome");
var criarContaBtn = document.getElementById('criarContaBtn');

criarContaBtn.addEventListener('submit', function (Event) {
  Event.preventDefault();

  // Verificar se todos os campos estão preenchidos
  if (
    inputNome !== 0
  ) {
    Swal.fire({
      icon: 'success',
      title: 'Conta Criada!',
      text: 'Sua conta foi criada com sucesso',
      timer: '3000'
    }) 
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Campos em branco',
      text: 'Por favor, não deixe nenhum campo em branco!',
    })  
  }
});
