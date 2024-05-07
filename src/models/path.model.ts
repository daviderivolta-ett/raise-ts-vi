import { Poi } from './poi.model';

export class Path {
    name: string;
    pois: Poi[];

    constructor(name: string, pois: Poi[]) {
        this.name = name;
        this.pois = pois;
    }

    static createEmpty(): Path {
        return new Path('', []);
    }
}