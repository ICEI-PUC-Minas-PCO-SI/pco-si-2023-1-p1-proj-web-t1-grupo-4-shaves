// Classe de conexão
class Conexao {

    lista_usuarios_json; lista_agendamentos_json;

    constructor() {
        if (Conexao.instance) {
            return Conexao.instance;
        }
        Conexao.instance = this;
        this.#busca_dados();
    }

    #busca_dados() {
        this.lista_usuarios_json = JSON.parse(localStorage.getItem(DataBase.Usuarios));
        this.lista_usuarios_json = this.lista_usuarios_json == null ? [] : this.lista_usuarios_json;

        this.lista_agendamentos_json = JSON.parse(localStorage.getItem(DataBase.Agendamentos));
        this.lista_agendamentos_json = this.lista_agendamentos_json == null ? [] : this.lista_agendamentos_json;
    }

    // Métodos para usuários
    novo_usuario(username, password, email = "", permissao = permissions.comum, dataCriacao = "", telefone = "") {

        let error_message = this.#valida_parametros_novo_usuario(username, password);

        if (error_message != null)
            return error_message;

        var usuario = {
            "id": this.#nextId(this.lista_usuarios_json),
            "nome": username, 
            "senha": password, 
            "email": email,
            "usertype": permissao,
            "creationDate": dataCriacao, 
            "telefone": telefone,
            "images": { 
                "profile_picture": "",
                "jobs": [] // Vetor para armazenar imagens de Cortes (Destinado para barbeiros)
            }, 
        }
        
        this.lista_usuarios_json.push(usuario);
        this.salvar();
        return true;
    }

    busca_usuario_por_email(email) {
        let index = -1;
        this.lista_usuarios_json.forEach((user,i)=>{
            if (user.email == email)
                index = i;
        })
        return this.lista_usuarios_json[index];
    }

    busca_imagem_perfil(id) {
        return this.busca_usuario_por_id(id).images.profile_picture;
    }

    upload_imagem_perfil(idUsuário, conteudoArquivo) {
        if (conteudoArquivo) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var resultadoArquivo = e.target.result;
                let con = new Conexao();
                // Armazenar o conteúdo do arquivo no localStorage
                con.lista_usuarios_json.forEach(user=>{
                    if (user.id != idUsuário) { return; }
                    user.images.profile_picture = resultadoArquivo;
                })
                con.salvar();
                console.log('Arquivo enviado e salvo no localStorage.');
            };
            reader.readAsDataURL(conteudoArquivo);
        }
    }

    upload_imagem_trabalho(idUsuário, conteudoArquivo, descricaoImagem, tituloCorte) {
        if (conteudoArquivo) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var resultadoArquivo = e.target.result;
                let con = new Conexao();
                // Armazenar o conteúdo do arquivo no localStorage
                con.lista_usuarios_json.forEach(user=>{
                    if (user.id != idUsuário) { return; }
                    user.images.jobs.push({
                        "caminho": resultadoArquivo,
                        "descricao": descricaoImagem,
                        "titulo":tituloCorte
                    })
                })
                con.salvar();
                console.log('Arquivo enviado e salvo no localStorage.');
            };
            reader.readAsDataURL(conteudoArquivo);
        }
    }
    // ---------------------

    // Métodos para agendamentos
    novo_agendamento(data = "", horario = "", cliente = "", barbeiro = "", servico = servicos[0], descricao = "", status = CSTATUS.ativo) {
        let novo_agendamento = {
            "id": this.#nextId(this.lista_agendamentos_json),
            "data": data,    
            "horario": horario,    
            "cliente": cliente,   
            "barbeiro": barbeiro,   
            "servico": servico, 
            "descricao": descricao,
            "status": status
        }
        this.lista_agendamentos_json.push(novo_agendamento);
        this.salvar();
    }

    busca_agendamento() {

    }
    // -------------------------
    #valida_parametros_novo_usuario(username, password) {


        // Teste se usuário já existe
        for (var i = 0; i < this.lista_usuarios_json.length; i++) {
            if (this.lista_usuarios_json[i].nome == username)
            return m_error.user_existente;
        }
        
        if (this.lista_usuarios_json.includes(username))
            return m_error.user_existente;
        
        // Contem caracteres inválidos
        var char_especial = /^[!@$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (username.match(char_especial))
            return m_error.char_especial;

        // Senha deve ter ao menos 6 caracteres
        if (password.length < 6)
            return m_error.senha_pequena;
        
        return null;

    }

    salvar() {
        localStorage.setItem(DataBase.Usuarios, JSON.stringify(this.lista_usuarios_json));
        localStorage.setItem(DataBase.Agendamentos, JSON.stringify(this.lista_agendamentos_json));
    }

    reset_localStorage() {
        localStorage.clear();
    }

    #nextId(lista) {
        let lastId = -1;
        lista.forEach((user)=>{
            if (user.id > lastId)
                lastId = user.id;
        });
        return lastId + 1;
    }
}

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

const CSTATUS = { ativo: 1, finalizado: 2, cancelado: 3, remarcado: 4 };

var objConexao = new Conexao();
Object.freeze(objConexao);

export default objConexao;