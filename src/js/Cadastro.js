import Swal from 'sweetalert2';

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