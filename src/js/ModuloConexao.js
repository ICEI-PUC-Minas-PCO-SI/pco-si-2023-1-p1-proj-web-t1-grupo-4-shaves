
// Itens para acessar o localStorage
const DataBase = {
    Usuarios  : "usuarios",
    Agendamentos : "agendamentos"
};

// Mensagens de erro
const m_error = {
    senha_pequena : "Senha deve ter ao menos 6 caracteres",
    char_especial : "O nome de usuário não pode ter caracteres especiais",
    user_existente: "Nome de usuário já está sendo utilizado"
}

const permissions = { comum: 1, barbeiro: 2, admin: 3 }

const servicos = ['Corte','Barba','Corte + Barba','Escova','Relaxamento'];

// Função para receber um objeto vazio de usuário
function criaUsuario() {

    const today = new Date();

    return {
        "id": 0, // Identificador de cada usuário
        "username": "", // Nome de usuário
        "password": "", // Senha
        "email": "",    // Email
        "usertype": permissions.comum,  // Permissão. Por padrão cria como 1(usuário comum)
        "creationDate": { // Data de criação do usuário
            "day": today.getDate(),
            "month": today.getMonth(),
            "year": today.getFullYear()
        },
        "images": {
            "profile-picture": "", // Destinado a foto de perfil
            "jobs": [] // Vetor para armazenar o caminho de imagens de Cortes (Destinado para barbeiros)
        }, // Imagens
    }
}

// Função para criar um objeto vazio de agendamento
function novoAgendamento() {
    return {
        "date": "",    // Data
        "time": "",    // Horas e minutos
        "client": 0,   // Id do usuário do cliente
        "barber": 0,   // Id do usuário do barbeiro
        "service": servicos[0], // Serviço, por padrão vem como corte
        "description": ""
    }
}

// Classe de conexão
class Conexao {

    array_usuarios;
    array_agendamentos;

    constructor() {

        if (Conexao.instance) {
            return Conexao.instance;
        }

        Conexao.instance = this;

        this.busca_dados();
    }

    busca_dados() {
        this.array_usuarios = JSON.parse(localStorage.getItem(DataBase.Usuarios));
        this.array_usuarios = this.array_usuarios == null ? [] : this.array_usuarios;

        this.array_agendamentos = JSON.parse(localStorage.getItem(DataBase.Agendamentos));
        this.array_agendamentos = this.array_agendamentos == null ? [] : this.array_agendamentos;
    }

    novo_usuario(username, password) {

        let error_message = this.#valida_parametros_novo_usuario(username, password);

        if (error_message != null)
            return error_message;

        var novo_usuario = criaUsuario();
        novo_usuario.id = this.#nextId();
        novo_usuario.username = username;
        novo_usuario.password = password;

        this.array_usuarios.push(novo_usuario);

        this.salvar();

    }

    remove_usuario(username) {

        var index = null;
        for (var i = 0; i < this.array_usuarios.length; i++) {
            if (this.array_usuarios[i].username === username)
                index = i;
        }

        if (index == null)
            return;

        this.array_usuarios.splice(index,1);
        this.salvar();

    }

    #valida_parametros_novo_usuario(username, password) {

        // Teste se usuário já existe
        for (var i = 0; i < this.array_usuarios.length; i++) {
            if (this.array_usuarios[i].username === username)
            return m_error.user_existente;
        }
        
        if (this.array_usuarios.includes(username))
        return m_error.user_existente;
        
        // Contem caracteres inválidos
        var char_especial = /^[!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (username.match(char_especial))
            return m_error.char_especial;

        // Senha deve ter ao menos 6 caracteres
        if (password.lenght < 6)
            return m_error.senha_pequena;
        
        return null;

    }

    salvar() {
        localStorage.setItem(DataBase.Usuarios, JSON.stringify(this.array_usuarios));
        localStorage.setItem(DataBase.Agendamentos, JSON.stringify(this.array_agendamentos));
    }

    reset_localStorage() {
        localStorage.clear();
    }

    #nextId() {
        let lastId = -1;
        this.array_usuarios.forEach((user)=>{
            if (user.id > lastId)
                lastId = user.id;
        });
        return lastId + 1;
    }
}

var objConexao = new Conexao();
Object.freeze(objConexao);

export default objConexao;