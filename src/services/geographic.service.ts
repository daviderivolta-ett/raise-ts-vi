import { Feature, FeatureGeometry, FeatureGeometryType } from '../models/feature.model';
import { Layer, LayerProperty } from '../models/layer.model';

export class GeoGraphicService {
    private static _instance: GeoGraphicService;

    constructor() {
        if (GeoGraphicService._instance) return GeoGraphicService._instance;
        GeoGraphicService._instance = this;
    }

    public static get instance(): GeoGraphicService {
        if (!GeoGraphicService._instance) GeoGraphicService._instance = new GeoGraphicService();
        return GeoGraphicService._instance;
    }

    public async createGeoJson(layer: Layer): Promise<any> {
        const url = `${layer.url}?service=WFS&typeName=${layer.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;
        const res: Response = await fetch(url);
        let rawGeoJson: any = await res.json();
        let geoJsonNewProp: any = this.substituteRelevantProperties(rawGeoJson, layer);
        let geoJsonAddProp: any = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);
        let geoJson: any = { ...geoJsonAddProp };
        geoJson.features = geoJsonAddProp.features.map((f: any) => this.parseFeature(f));
        return geoJson;
    }

    private substituteRelevantProperties(geoJson: any, layer: Layer) {
        geoJson.features.forEach((feature: any) => {
            const newProperties: any = {};

            for (const key in feature.properties) {
                const relevantProperty = layer.relevantProperties.find((prop: LayerProperty) => prop.propertyName === key);
                if (relevantProperty) {
                    const newPropertyValue = {
                        displayName: relevantProperty.displayName,
                        type: relevantProperty.type,
                        value: feature.properties[key]
                    };
                    newProperties[key] = newPropertyValue;
                }
            }
            feature.properties = newProperties;
        });

        return geoJson;
    }

    private createFeatureAdditionalProperties(geoJson: any, layer: Layer): any {
        geoJson.features = geoJson.features.map((f: Feature, i: number) => {
            f.properties.name = layer.name + ' ' + i;
            f.properties.layerName = layer.layer;

            switch (f.geometry.type) {
                case FeatureGeometryType.Point:
                    f.properties.uuid = layer.layer + f.geometry.coordinates[1] + f.geometry.coordinates[0];
                    break;

                case FeatureGeometryType.MultiPoint:
                    f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                    break;

                case FeatureGeometryType.LineString || FeatureGeometryType.Polygon || FeatureGeometryType.MultiPoint:
                    f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][])[0][1] + (f.geometry.coordinates as number[][])[0][0];
                    break;

                default:
                    f.properties.uuid = layer.layer + (f.geometry.coordinates as number[][][])[0][0][1] + (f.geometry.coordinates as number[][][])[0][0][0];
                    break;
            }

            f.properties.uuid = f.id;

            return f;
        });
        return geoJson;
    }

    private parseFeature(feature: any): Feature {
        let f: Feature = Feature.createEmpty();

        f.type = feature.type;
        f.properties = feature.properties;
        f.geometry_name = feature.geometry_name;
        f.id = feature.id;

        f.geometry = this.parseFeatureGeometry(feature.geometry);

        return f;
    }

    private parseFeatureGeometry(geometry: any): FeatureGeometry {
        let g: FeatureGeometry = FeatureGeometry.createEmpty();

        g.type = this.parseFeatureGeometryType(geometry.type);
        g.coordinates = geometry.coordinates;

        return g;
    }

    private parseFeatureGeometryType(type: any): FeatureGeometryType {
        let t: FeatureGeometryType = FeatureGeometryType.Point;

        switch (type) {
            case 'LineString':
                t = FeatureGeometryType.LineString;
                break;

            case 'Polygon':
                t = FeatureGeometryType.Polygon;
                break;

            case 'MultiPoint':
                t = FeatureGeometryType.MultiPoint;
                break;

            case 'MultiLineString':
                t = FeatureGeometryType.MultiLineString;
                break;

            case 'MultiPolygon':
                t = FeatureGeometryType.MultiPolygon;
                break;

            default:
                break;
        }

        return t;
    }
}