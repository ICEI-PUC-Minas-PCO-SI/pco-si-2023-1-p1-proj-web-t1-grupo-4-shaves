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

class JSONServer {

    permissoes = { comum: 1, barbeiro: 2, admin: 3 }
    status = { ativo: 1, finalizado: 2, cancelado: 3, remarcado: 4 };
    servicos = ['Corte','Barba','Corte + Barba','Escova','Relaxamento'];

    static urlUsuarios() { return "http://localhost:3000/usuarios"; }
    static urlAgendamentos() { return "http://localhost:3000/agendamentos"; }

    constructor() {
        if (Conexao.instance) {
            return Conexao.instance;
        }
        Conexao.instance = this;
    }

    // Métodos READ ---------------------
    async buscaUsuarios(idUsuário = -1) {
        if (idUsuário == -1) 
            return await fetch(JSONServer.urlUsuarios()).then(res=>res.json());
        else 
            return await fetch(JSONServer.urlUsuarios() + "/" + idUsuário).then(res=>res.json());
    }

    async buscaAgendamentos() { 
        return await fetch(JSONServer.urlAgendamentos()).then(res=>res.json()); 
    }

    async verificarContaExistente(email, senha) {
        // Chama o metodo do JSONSERVER
        var usuarios = await JSONServer.buscaUsuarios();
      
        // Verifica por email igual
        var usuarioExistente = usuarios.find(
          (usuario) => usuario.email === email
        );
      
        if (usuarioExistente) {
            // Verifica se senha é igual
          if (usuarioExistente.senha === senha) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      
    // ----------------------------------

    // Métodos CREATE -------------------------------------
    async novoUsuario(nome, senha, email = "", permissao = this.permissoes.comum, dataCriacao = "", telefone = "") {
        var usuario = {
            //"id": this.#nextId(await this.buscaUsuarios()),
            "nome": nome, 
            "senha": senha, 
            "email": email,
            "permissao": permissao,
            "dataCriacao": dataCriacao, 
            "telefone": telefone,
            "trabalhos": 0,
            "imagem_perfil": "",
        }
        console.log(usuario);
        $.ajax({
            url: JSONServer.urlUsuarios(),
            method: 'POST',
            data: usuario,
            success: (res) => { console.log("Novo usuário cadastrado."); return true; },
            error: (xhr,status,error) => { console.log("Erro ao cadastrar:" + status + " " + error); return false; }
        });
    }

    async novoAgendamento(data = "", horario = "", cliente = "", barbeiro = "", servico = this.servicos[0], descricao = "", status = this.status.ativo) {
        let novo_agendamento = {
            //"id": this.#nextId(this.lista_agendamentos_json),
            "data": data,    
            "horario": horario,    
            "cliente": cliente,   
            "barbeiro": barbeiro,   
            "servico": servico, 
            "descricao": descricao,
            "status": status
        }
        $.ajax({
            url: JSONServer.urlAgendamentos(),
            method: 'POST',
            data: novo_agendamento,
            success: (res) => { console.log("Novo agendamento cadastrado."); },
            error: (xhr,status,error) => { console.log("Erro ao cadastrar:" + error); }
        });
    }
    // ----------------------------------------------------

    // Métodos UPDATE -------------------------------------
    async editaUsuario(idUsuário, ObjUsuario) {
        $.ajax({
            url: JSONServer.urlUsuarios() + "/" + idUsuário,
            method: 'PUT',
            data: ObjUsuario,
            success: (res) => { console.log("Usuário editado."); },
            error: (xhr,status,error) => { console.log("Erro ao editar o usuário:" + error); }
        });
    }

    async editaAgendamento(idAgendamento, ObjAgendamento) {
        $.ajax({
            url: JSONServer.urlAgendamentos() + "/" + idAgendamento,
            method: 'PUT',
            data: ObjAgendamento,
            success: (res) => { console.log("Agendamento editado."); },
            error: (xhr,status,error) => { console.log("Erro ao editar o agendamento:" + error); }
        });
    }
    // ----------------------------------------------------

    // Métodos DELETE ---------------------
    async apagaUsuario(idUsuário) {
        $.ajax({
            url: JSONServer.urlUsuarios() + "/" + idUsuário,
            method: 'DELETE',
            success: (res) => { console.log("Usuário editado."); },
            error: (xhr,status,error) => { console.log("Erro ao editar o usuário:" + error); }
        });
    }

    async apagaAgendamento(idAgendamento) {
        $.ajax({
            url: JSONServer.urlAgendamentos() + "/" + idAgendamento,
            method: 'DELETE',
            success: (res) => { console.log("Agendamento apagado."); },
            error: (xhr,status,error) => { console.log("Erro ao apagar o agendamento:" + error); }
        });
    }
    // ------------------------------------

    // Métodos variados ------------------------------
    async uploadImagemPerfil(idUsuário, nomeArquivo) {
        if (nomeArquivo == null) { return; }
        this.buscaUsuarios().then(usuarios=>{
            usuarios.forEach(user=>{
                if (user.id != idUsuário) { return; }
                user.imagem_perfil = nomeArquivo;
                $.ajax({
                    url: JSONServer.urlUsuarios() + "/" + idUsuário,
                    method: 'PUT',
                    data: user,
                    success: (res) => { console.log("Imagem de perfil salva."); },
                    error: (xhr,status,error) => { console.log("Erro ao salvar a imagem:" + error); }
                });
            })
        })
    }

    async uploadImagemTrabalho(idUsuário, nomeArquivo, descricaoImagem, tituloCorte) {
        if (nomeArquivo == null) { return; }
        this.buscaUsuarios().then(usuarios=>{
            usuarios.forEach(user=>{
                if (user.id != idUsuário) { return; }
                if (user.trabalhos == 1) {
                    user.trabalhos = [{
                        "caminho": resultadoArquivo,
                        "descricao": descricaoImagem,
                        "titulo":tituloCorte
                    }]
                } else {
                    user.trabalhos.push({
                        "caminho": resultadoArquivo,
                        "descricao": descricaoImagem,
                        "titulo":tituloCorte
                    })
                }
                $.ajax({
                    url: JSONServer.urlUsuarios() + "/" + idUsuário,
                    method: 'PUT',
                    data: user,
                    success: (res) => { console.log("Imagem de trabalho salva."); },
                    error: (xhr,status,error) => { console.log("Erro ao salvar a imagem:" + error); }
                });
            })
        })
        
    }
    // -----------------------------------------------

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

var objConexao = new JSONServer();
Object.freeze(objConexao);

export default objConexao;