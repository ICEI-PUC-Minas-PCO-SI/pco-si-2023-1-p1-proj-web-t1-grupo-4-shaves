class JSONServer {

    permissoes = { comum: 1, barbeiro: 2, admin: 3 }
    status = { ativo: 1, finalizado: 2, cancelado: 3, remarcado: 4 };
    servicos = ['Corte','Barba','Corte + Barba','Escova','Relaxamento'];

    static urlUsuarios() { return "https://tiaw-shavez-api.vercel.app/usuarios"; }
    static urlAgendamentos() { return "https://tiaw-shavez-api.vercel.app/agendamentos"; }

    constructor() {
        if (JSONServer.instance) {
            return JSONServer.instance;
        }
        JSONServer.instance = this;
    }

    // Métodos READ ---------------------
    async buscaUsuarios(idUsuário = -1) {
        if (idUsuário == -1) 
            return await fetch(JSONServer.urlUsuarios()).then(res=>res.json());
        else 
            return await fetch(JSONServer.urlUsuarios() + "/" + idUsuário).then(res=>res.json());
    }

    async buscaAgendamentos(idAgendamento = -1) { 
        if (idAgendamento == -1)
            return await fetch(JSONServer.urlAgendamentos()).then(res=>res.json()); 
        else
            return await fetch(JSONServer.urlAgendamentos() + "/" + idAgendamento).then(res=>res.json());
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