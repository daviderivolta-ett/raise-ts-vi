import { FeatureGeometryType } from '../models/feature.model';
import { Layer } from '../models/layer.model';
import { Path } from '../models/path.model';
import { Poi, PoiProperty, PoiPropertyType, PoiType } from '../models/poi.model';

export class PathService {
    private static _instance: PathService;
    private _customPath: Path = new Path('Percorso personalizzato', []);
    private _suggestedPaths: Path[] = [];

    constructor() {
        if (PathService._instance) return PathService._instance;
        PathService._instance = this;
    }

    public static get instance(): PathService {
        if (!PathService._instance) PathService._instance = new PathService();
        return PathService._instance;
    }

    public get customPath(): Path {
        return this._customPath;
    }

    public set customPath(customPath: Path) {
        this._customPath = customPath;
    }

    public get suggestedPaths(): Path[] {
        return this._suggestedPaths;
    }

    public set suggestedPaths(suggestedPaths: Path[]) {
        this._suggestedPaths = suggestedPaths;           
    }

    public addPoiToCustomPath(poi: Poi): void {
        if (this.isPoiInCustomPath(poi)) {
            return;
        }
        const path: Path = { ...this.customPath };
        path.pois.unshift(poi);
        this.customPath = { ...path };
    }

    private isPoiInCustomPath(poi: Poi): boolean {
        return this.customPath.pois.some((p: Poi) => p.uuid === poi.uuid);
    }

    public saveCustomPath(): void {
        localStorage.setItem('custom-path', JSON.stringify(this.customPath));
    }

    public getSavedCustomPath(): void {
        const savedCustomPathString: string | null = localStorage.getItem('custom-path');
        if (!savedCustomPathString) return;
        const rawSavedCustomPath: any = JSON.parse(savedCustomPathString);
        this._customPath = this.parseCustomPath(rawSavedCustomPath);
    }

    private parseCustomPath(path: any): Path {
        let p: Path = new Path(
            path.name,
            path.pois
        );

        p.pois = p.pois.map((poi: any) => this.parsePoi(poi));

        return p;
    }

    private parsePoi(poi: any): Poi {
        let p: Poi = new Poi();

        p.uuid = poi.uuid;
        p.name = poi.name;

        switch (poi.type) {
            case FeatureGeometryType.LineString:
                poi.type = PoiType.LineString;
                break;
            case FeatureGeometryType.Polygon:
                poi.type = PoiType.Polygon;
                break;
            case FeatureGeometryType.MultiPoint:
                poi.type = PoiType.MultiPoint;
                break;
            case FeatureGeometryType.MultiLineString:
                poi.type = PoiType.MultiLineString;
                break;
            case FeatureGeometryType.MultiPolygon:
                poi.type = PoiType.MultiPolygon;
                break;
            default:
                poi.type = PoiType.Point
                break;
        }

        p.coordinates = poi.coordinates;
        p.layerName = poi.layerName;

        for (const key in poi.props) {
            if (typeof poi.props[key] !== 'object') continue;

            let prop: PoiProperty = new PoiProperty();

            prop.displayName = poi.props[key].displayName;
            prop.value = poi.props[key].value;

            switch (poi.props[key].type) {
                case 'number':
                    prop.type = PoiPropertyType.Number;
                    break;
                case 'image':
                    prop.type = PoiPropertyType.Image;
                    break;
                default:
                    prop.type = PoiPropertyType.String
                    break;
            }

            p.props.push(prop);
        }

        if (poi.distance) p.distance = poi.distance;

        return p;
    }

    public getCsvPaths(fileNumber: number): void {
        let index = 0;
        const paths: Path[] = [];
        const promises: Promise<any>[] = [];

        while (index <= fileNumber) {
            const promise = fetch(`./suggested-paths/${index}.tsv`)
                .then(res => res.text())
                .then(data => {
                    const parsedCsv: Record<string, string>[] = this.parseCsvFile(data);
                    paths.push(this.parseCsvPath(parsedCsv));
                })
                .catch(error => console.error('Errore durante il recupero dei percorsi suggeriti', error))

            promises.push(promise);
            index++;
        }
        Promise.all(promises).then(() => this.suggestedPaths = [...paths]);
    }

    private parseCsvFile(text: any): Record<string, string>[] {
        const lines: string[] = text.split('\n');

        const data: Record<string, string>[] = lines.map((line: string) => {
            const columns: string[] = line.split('\t');

            return {
                path: columns[0],
                layerName: columns[1],
                id: columns[2],
                name: columns[3],
                latitude: columns[4],
                longitude: columns[5],
                height: columns[6],
                info: columns[7],
            }
        });

        return data;
    }

    private parseCsvPath(data: Record<string, string>[]): Path {
        let path: Path = Path.createEmpty();

        path.name = data[1].path;

        data.forEach((d: Record<string, string>, index) => {
            if (index === 0) return;
            path.pois.push(this.parseCsvPoi(d));
        });

        return path;
    }

    private parseCsvPoi(data: Record<string, string>): Poi {
        let poi: Poi = new Poi();

        poi.layerName = data.layerName;
        poi.name = data.name;
        poi.coordinates = [parseFloat(data.longitude), parseFloat(data.latitude), parseFloat(data.height)];
        poi.type = PoiType.Point;
        poi.uuid = data.id;
        poi.props = this.parseCsvPoiProperties(data.info);

        return poi;
    }

    private parseCsvPoiProperties(data: string): PoiProperty[] {
        let properties: PoiProperty[] = [];

        const props: string[] = data.split('|');

        props.forEach((prop: string) => {
            let property: PoiProperty = new PoiProperty();
            property.displayName = prop.split(':')[0];
            property.value = prop.split(':')[1].trim();
            property.type = PoiPropertyType.String;

            properties.push(property);
        });

        return properties;
    }

    public getSuggestedPaths(layers: Layer[]): Path[] {
        let paths: Path[] = [];        
        this.suggestedPaths.forEach((path: Path) => {            
            path.pois.forEach((poi: Poi) => {
                layers.forEach((layer: Layer) => {
                    if (poi.layerName === layer.layer) paths.push(path);
                });
            });
        });
        return [...new Set(paths)];
    }
}