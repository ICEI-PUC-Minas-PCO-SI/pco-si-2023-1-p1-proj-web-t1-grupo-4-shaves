import Swal from "sweetalert2";
import './ModuloConexao';
import objConexao from "./ModuloConexao";

// Inputs
var inputNome = document.getElementById('inputNome');
var inputEmail = document.getElementById('inputEmail');
var inputContato = document.getElementById('inputNinputContato');
var inputSenha = document.getElementById('inputSenha');
var inputConfSenha = document.getElementById('inputConfSenha');

// Limpar Campos Logic
var limparCamposBtn = document.getElementById("limparCamposBtn");
limparCamposBtn.addEventListener('click', function () {
    inputNome = '';
    inputEmail = '';
    inputContato = '';
    inputSenha = '';
    inputConfSenha = '';
});

// Cadastrar Logic
var criarContaBtn = document.getElementById('criarContaBtn');
criarContaBtn.addEventListener('click', function () {
    
});
