import { Feature, FeatureGeometry, FeatureGeometryType } from '../models/feature.model';
import { Layer, LayerProperty } from '../models/layer.model';
import { Poi } from '../models/poi.model';

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
        geoJson.features = geoJson.features.slice(0, 10);
        geoJson.features = geoJson.features.map((f: any) => this.parseFeature(f));
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

        if (feature.geometry) f.geometry = this.parseFeatureGeometry(feature.geometry);

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

    public async getPoisFromLayers(layers: Layer[]): Promise<Poi[]> {
        let pois: Poi[] = [];
        const geoJsonPromises: Promise<any>[] = layers.map(async (layer: Layer) => {
            return GeoGraphicService.instance.createGeoJson(layer);
        });
        const geoJsons: any = await Promise.all(geoJsonPromises);
        geoJsons.forEach((geoJson: any) => {
            geoJson.features.forEach((f: Feature) => pois.push(Poi.fromFeature(f)));
        });
        return pois.filter((poi: Poi) => !GeoGraphicService.instance.isCoordinatesMultidimensional(poi.coordinates));
    }

    public isCoordinatesMultidimensional(coordinates: number[] | number[][] | number[][][]): boolean {
        if (!Array.isArray(coordinates)) {
            return false;
        }

        for (let i = 0; i < coordinates.length; i++) {
            if (Array.isArray(coordinates[i])) {
                return true;
            }
        }

        return false;
    }

    public orderPoisByDistance(position: GeolocationPosition, pois: Poi[]): Poi[] {
        pois.forEach((poi: Poi) => {
            if (!GeoGraphicService.instance.isCoordinatesMultidimensional(poi.coordinates)) {
                const lat = Array.isArray(poi.coordinates) ? poi.coordinates[1] : poi.coordinates;
                const lon = Array.isArray(poi.coordinates) ? poi.coordinates[0] : poi.coordinates;
                const distance = this.haversineDistance(lat as number, lon as number, position.coords.latitude, position.coords.longitude);
                // const distance = haversine.haversineDistance(lat as number, lon as number, 44.44416497901924, 8.732173415343668);
                poi.distance = distance;
            }
        });

        pois.sort((a, b) => {
            if (a.distance && b.distance) return a.distance - b.distance;
            return 0;
        });

        return pois;
    }

    private haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const p1: number = lat1 * Math.PI / 180;
        const p2: number = lat2 * Math.PI / 180;
        const deltaLon: number = lon2 - lon1;
        const deltaLambda: number = (deltaLon * Math.PI) / 180;
        const d: number = Math.acos(
            Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda),
        ) * 6371e3;
        return d;
    }
}