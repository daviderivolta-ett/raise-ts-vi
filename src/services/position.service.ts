import { Feature } from "../models/feature.model";

export class PositionService {
    private static _instance: PositionService;
    private _position: GeolocationPosition | null = null;

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
}