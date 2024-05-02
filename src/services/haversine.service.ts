interface Coordinate {
    latitude: number;
    longitude: number;
    lat?: number;
    lng?: number;
}

type CoordinateArray = [number, number];

type CoordinateInput = Coordinate | CoordinateArray;

export class HaversinService {
    private static _instance: HaversinService;
    private asin = Math.asin;
    private cos = Math.cos;
    private sin = Math.sin;
    private sqrt = Math.sqrt;
    private PI: number = Math.PI;
    private R: number = 6378137;

    constructor() {
        if (HaversinService._instance) return HaversinService._instance;
        HaversinService._instance = this;
    }

    static get instance(): HaversinService {
        if (!HaversinService._instance) HaversinService._instance = new HaversinService();
        return HaversinService._instance;
    }

    private squared(x: number) {
        return x * x;
    }

    private toRad(x: number) {
        return x * this.PI / 180.0;
    }

    private hav(x: number) {
        return this.squared(this.sin(x / 2));
    }

    public haversineDistance(a: CoordinateInput, b: CoordinateInput) {
        const aLat = this.toRad(Array.isArray(a) ? a[1] : (a.latitude || a.lat || 0));
        const bLat = this.toRad(Array.isArray(b) ? b[1] : (b.latitude || b.lat || 0));
        const aLng = this.toRad(Array.isArray(a) ? a[0] : (a.longitude || a.lng || 0));
        const bLng = this.toRad(Array.isArray(b) ? b[0] : (b.longitude || b.lng || 0));
    
        const ht = this.hav(bLat - aLat) + this.cos(aLat) * this.cos(bLat) * this.hav(bLng - aLng);
        return 2 * this.R * this.asin(this.sqrt(ht));
    }
}