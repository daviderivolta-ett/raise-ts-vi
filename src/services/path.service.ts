import { FeatureGeometryType } from '../models/feature.model';
import { Path } from '../models/path.model';
import { Poi, PoiProperty, PoiPropertyType, PoiType } from '../models/poi.model';

export class PathService {
    private static _instance: PathService;
    private _customPath: Path = new Path('Percorso personalizzato', []);

    constructor() {
        if (PathService._instance) return PathService._instance;
        PathService._instance = this;
    }

    public get customPath(): Path {
        return this._customPath;
    }

    public set customPath(customPath: Path) {
        this._customPath = customPath;
    }

    public static get instance(): PathService {
        if (!PathService._instance) PathService._instance = new PathService();
        return PathService._instance;
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
}