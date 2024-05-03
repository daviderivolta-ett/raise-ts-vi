import { Feature, FeatureGeometryType } from "./feature.model";

export class Poi {
    uuid: string = '';
    name: string = '';
    type: PoiType = PoiType.Point;
    coordinates: number[] | number[][] | number[][][] = [];
    layerName: string = '';
    props: PoiProperty[] = [];
    distance?: number;

    constructor() { }

    static fromFeature(feature: Feature): Poi {
        const poi: Poi = new Poi();

        poi.uuid = feature.properties.uuid;
        poi.name = feature.properties.name;

        switch (feature.geometry.type) {
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

        poi.coordinates = feature.geometry.coordinates;
        poi.layerName = feature.properties.layerName;

        for (const key in feature.properties) {
            if (typeof feature.properties[key] !== 'object') continue;

            let prop: PoiProperty = new PoiProperty();
            
            prop.displayName = feature.properties[key].displayName;
            prop.value = feature.properties[key].value;

            switch (feature.properties[key].type) {
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

            poi.props.push(prop);
        }

        return poi;
    }
}

export enum PoiType {
    Point = 'Point',
    LineString = 'LineString',
    Polygon = 'Polygon',
    MultiPoint = 'MultiPoint',
    MultiLineString = 'MultiLineString',
    MultiPolygon = 'MultiPolygon'
}

export class PoiProperty {
    displayName: string = '';
    type: PoiPropertyType = PoiPropertyType.String;
    value: string = '';

    constructor() { }
}

export enum PoiPropertyType {
    String = 'string',
    Image = 'image',
    Number = 'number'
}