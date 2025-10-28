export class GoogleAuthService {
    private static _instance: GoogleAuthService;
    private _auth: any;

    private constructor() { }

    public static get instance(): GoogleAuthService {
        if (!GoogleAuthService._instance) GoogleAuthService._instance = new GoogleAuthService();
        return GoogleAuthService._instance;
    }

    public get auth(): any {
        if (!this._auth) this._auth = this.loadAuth();    
        return this._auth
    }
    
    public set auth(value: any) {
        this._auth = value
        this.saveAuth(value);
    }

    public handleCredentialResponse(token: CredentialResponse): void {
        if (!token.credential) throw new Error(`Errore nell'autenticazione con Google.`);
        try {
            const responsePayload = this.decodeJWTResponse(token.credential);
            this.auth = responsePayload;
        } catch (error) {
            throw new Error('Errore nella decodifica del token ricevuto da Google: token non valido.');            
        }
    }

    public decodeJWTResponse(token: string): any {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    public saveAuth(payload: any): void {
        localStorage.setItem('google-auth', JSON.stringify(payload));
    }

    public loadAuth(): any {
        const payload: string | null = localStorage.getItem('google-auth');
        return payload ? JSON.parse(payload) : null;
    }

    public checkAuth(): boolean {
        if (!this.auth) return false;      
        const exp = this.auth['exp'];
        if (!exp) return false;      
        const expDate = new Date(exp * 1000);      
        return expDate > new Date() ? true : false;
    }
}