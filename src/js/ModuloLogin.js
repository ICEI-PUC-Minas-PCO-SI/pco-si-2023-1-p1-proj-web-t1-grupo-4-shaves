class LoginManager {

    constructor() {
        if (LoginManager.instance) {
            return LoginManager.instance;
        }
        LoginManager.instance = this;
    }

    static loginPath() {return 'UsuarioLogado'};

    getIdUsuarioLogado() { return localStorage.getItem(LoginManager.loginPath()); }

    login(idUsuário, reload = false) { 
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