import { EventObservable } from "../observables/event.observable";

export class PositionService {
    private static _instance: PositionService;
    private _position: GeolocationPosition | null = null;
    private _watchId: number | null = null;

    constructor() {
        if (PositionService._instance) return PositionService._instance;
        PositionService._instance = this;
    }

    static get instance(): PositionService {
        if (!PositionService._instance) PositionService._instance = new PositionService();
        return PositionService._instance;
    }

    public get position(): GeolocationPosition | null {
        return this._position;
    }

    public set position(position: GeolocationPosition | null) {
        this._position = position;
        EventObservable.instance.publish('position-update', this.position);
    }

    public get watchId(): number | null {
        return this._watchId;
    }

    public set watchId(watchId: number | null) {
        this._watchId = watchId;
    }

    public async getUserPosition(): Promise<GeolocationPosition> {
        try {
            const position: GeolocationPosition = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve(position as GeolocationPosition);
                    },
                    error => {
                        reject(error);
                    }
                );
            });
            return position;

        } catch (error) {
            throw error;
        }
    }

    public async startWatchingPosition(): Promise<void> {
        this.watchId = navigator.geolocation.watchPosition(
            position => this.position = position as GeolocationPosition,
            error => {
                console.error(error);
                this.position = null;
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            }
        )
    }

    public stopWatchingPosition(): void {
        if (!this.watchId) return;
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
    }
}