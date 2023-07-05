class LoginManager {

    constructor() {
        if (LoginManager.instance) {
            return LoginManager.instance;
        }
        LoginManager.instance = this;
    }

    static loginPath() {return 'usuarioLogado'};

    // Nulo ou vazia
    getIdUsuarioLogado() { return localStorage.getItem(LoginManager.loginPath()); }

    async login(idUsuário, reload = false) { 
        localStorage.setItem(LoginManager.loginPath(), idUsuário); 
        if (reload) { window.location.reload(); }
    }

    logoff(reload = false) { 
        localStorage.setItem(LoginManager.loginPath(), ""); 
        if (reload) { window.location.reload(); }
    }

}

var loginManager = new LoginManager();
Object.freeze(loginManager);

export default loginManager;