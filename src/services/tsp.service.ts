import { Poi } from '../models/poi.model';

export class TspService {
    private static _instance: TspService;

    constructor() {
        if (!TspService._instance) {
            TspService._instance = this;
        }
    }

    static get instance(): TspService {
        if (!TspService._instance) TspService._instance = new TspService();
        return TspService._instance;
    }

    private calculateDistance(firstPosition: number[], secondPosition: number[]): number {
        const dx: number = firstPosition[0] - secondPosition[0];
        const dy: number = firstPosition[1] - secondPosition[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    public nearestInsertion(pois: Poi[], initialPosition: number[]): Poi[] {
        const remainingPois: Poi[] = [...pois];

        let currentIndex: number = 0;
        let minDistance: number = this.calculateDistance(initialPosition, remainingPois[0].coordinates as number[]);

        for (let i = 1; i < remainingPois.length; i++) {
            const distance: number = this.calculateDistance(initialPosition, remainingPois[i].coordinates as number[]);
            if (distance < minDistance) {
                minDistance = distance;
                currentIndex = i;
            }
        }

        const path: Poi[] = [remainingPois.splice(currentIndex, 1)[0]];

        while (remainingPois.length > 0) {
            minDistance = Number.MAX_VALUE;
            let nextIndex: number = 0;

            for (let i = 0; i < remainingPois.length; i++) {
                const distance: number = this.calculateDistance(path[path.length - 1].coordinates as number[], remainingPois[i].coordinates as number[]);
                if (distance < minDistance) {
                    minDistance = distance;
                    nextIndex = i;
                }
            }
            path.push(remainingPois.splice(nextIndex, 1)[0]);
        }

        return path.reverse();
    }

}