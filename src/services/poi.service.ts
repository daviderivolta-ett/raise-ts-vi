import { FeatureGeometryType } from '../models/feature.model';
import { Poi, PoiProperty, PoiPropertyType, PoiType } from '../models/poi.model';

export class PoiService {
    private static _instance: PoiService;
    private _selectedPoi: Poi = new Poi();

    constructor() {
        if (PoiService._instance) return PoiService._instance;
        PoiService._instance = this;
    }

    static get instance(): PoiService {
        if (!PoiService._instance) PoiService._instance = new PoiService();
        return PoiService._instance;
    }

    public get selectedPoi(): Poi {
        return this._selectedPoi;
    }

    public set selectedPoi(selectedPoi: Poi) {
        this._selectedPoi = selectedPoi;
        localStorage.setItem('selected-poi-vi', JSON.stringify(this.selectedPoi));
    }

    public getSelectedPoi(): void {
        const savedSelectedPoiString: string | null = localStorage.getItem('selected-poi-vi');
        if (!savedSelectedPoiString) return;
        const rawSavedSelectedPoi: any = JSON.parse(savedSelectedPoiString);             
        this._selectedPoi = this.parsePoi(rawSavedSelectedPoi);
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