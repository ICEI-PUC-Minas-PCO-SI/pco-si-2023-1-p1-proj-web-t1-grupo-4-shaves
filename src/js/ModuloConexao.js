
// Itens para acessar o localStorage
const DataBase = {
    Usuarios  : 'usuarios',
    Barbeiros : "barbeiros",
    Ganhos    : "ganhos",
    Custos    : "custos"
};

// Mensagens de erro
const m_error = {
    senha_pequena : "Senha deve ter ao menos 6 caracteres",
    char_especial : "O nome de usuário não pode ter caracteres especiais",
    user_existente: "Nome de usuário já está sendo utilizado"
}

// Classe de conexão
class Conexao {

    array_usuarios;
    array_barbeiros;
    array_dados_custos;
    array_dados_ganhos;

    constructor() {
        this.#busca_dados();
    }

    #busca_dados() {
        this.array_usuarios = JSON.parse(localStorage.getItem(DataBase.Usuarios));
        this.array_usuarios = this.array_usuarios == null ? [] : this.array_usuarios;

        this.array_barbeiros = JSON.parse(localStorage.getItem(DataBase.Barbeiros));
        this.array_barbeiros = this.array_barbeiros == null ? [] : this.array_barbeiros;

        this.array_dados_custos = JSON.parse(localStorage.getItem(DataBase.Ganhos));
        this.array_dados_custos = this.array_dados_custos == null ? [] : this.array_dados_custos;

        this.array_dados_ganhos = JSON.parse(localStorage.getItem(DataBase.Ganhos));
        this.array_dados_ganhos = this.array_dados_ganhos == null ? [] : this.array_dados_ganhos;
    }

    novo_usuario(username, password) {

        let error_message = this.#valida_parametros_novo_usuario(username, password);

        if (error_message != null)
            return error_message;

        var novo_usuario = {
            "username": username,
            "password": password,
            "admin" : false
        }

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

    novo_barbeiro(username, total_atendimentos = 0, tempo_em_dias = 0) {
        var novo_barbeiro = {
            "username"     : username,
            "atendimentos" : total_atendimentos,
            "tempo_servico": tempo_em_dias
        }

        this.array_barbeiros.push(novo_barbeiro);

        this.salvar();
    }

    remove_barbeiro(index) {
        if (index < 0 || index > this.array_barbeiros.length)
            return;

        this.array_barbeiros.splice(index,1);
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
        localStorage.setItem(DataBase.Barbeiros, JSON.stringify(this.array_barbeiros));
        localStorage.setItem(DataBase.Ganhos, JSON.stringify(this.array_dados_ganhos));
        localStorage.setItem(DataBase.Custos, JSON.stringify(this.array_dados_custos));
    }

    reset_localStorage() {
        localStorage.clear();
    }
}