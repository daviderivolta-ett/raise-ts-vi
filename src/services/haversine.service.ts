export class HaversineService {
    private R: number = 6371e3;

    constructor() { }

    public haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const p1: number = lat1 * Math.PI / 180;
        const p2: number = lat2 * Math.PI / 180;
        const deltaLon: number = lon2 - lon1;
        const deltaLambda: number = (deltaLon * Math.PI) / 180;
        const d: number = Math.acos(
            Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
        ) * this.R;
        return d;
    }
}