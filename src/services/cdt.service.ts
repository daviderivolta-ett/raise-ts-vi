export class CDTService {
    private static _instance: CDTService;

    private CDT_URL: string = './jsons/profile.mock.json';

    private _profile: string | undefined;

    private constructor() { }

    static get instance(): CDTService {
        if (!CDTService._instance) this._instance = new CDTService();
        return this._instance;
    }

    public get profile(): string | undefined {        
        if (!this._profile) this._profile = this.loadProfile();
        return this._profile;
    }

    public set profile(value: string | undefined) {
        this._profile = value;
        this.saveProfile(value);
    }

    public saveProfile(profile: string | undefined): void {
        localStorage.setItem('user-profile', JSON.stringify(profile));
    }

    public loadProfile(): any {
        const profile: string | null = localStorage.getItem('user-profile');
        return profile ? JSON.parse(profile) : undefined;
    }

    public async getUserProfile(id: string): Promise<string | undefined> {
        return this.fetchUserProfile(id)
            .then((profile: string | undefined) => {
                this.profile = profile;
                return profile;
            })
            .catch((err: unknown) => {
                if (err instanceof Error) throw err;
                else throw new Error('Errore nella ricezione del profilo utente dal Citizen Digital Twin.');
            })
    }

    public async fetchUserProfile(id: string): Promise<string | undefined> {
        return fetch(this.CDT_URL)
            .then((res: Response) => {
                if (!res.ok) throw new Error(`Errore nel recuperare i dati dell'utente dal Citizen Digital Twin: nessuna risposta o url errato.`);
                try {
                    return res.json();
                } catch (error) {
                    throw new Error(`Errore nell'interpretare i dati dell'utente recuperati dal Citizen Digital Twin`);
                }
            })
            .then((data: any) => {
                return this._parseUserProfile(id, data);
            })
            .catch((err: unknown) => {
                if (err instanceof Error) throw err;
                else throw new Error('Errore generico nel recupero dei dati dal Citizen Digital Twin.');
            })
    }

    private _parseUserProfile(id: string, data: Record<string, string>): string | undefined {
        const map: Map<string, string> = new Map<string, string>(Object.entries(data));
        const profile: string | undefined = map.get(id);
        return profile;
    }
}