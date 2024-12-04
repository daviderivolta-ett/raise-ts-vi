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
        const data: any = await this.fetchGeoJsonDataWithRetry(layer);
        if (!data) return;

        let geoJSON: any = { type: 'FeatureCollection', features: [] };
        if (layer.get) geoJSON = this.createGeoJsonFromLayerWithGetUrl(data, layer);
        if (layer.post) geoJSON = this.createGeoJsonFromLayerWithPostUrl(data, layer);
        geoJSON.features = geoJSON.features.slice(0, 10).map((f: any) => this.parseFeature(f));

        return geoJSON;
    }

    private async fetchGeoJsonDataWithRetry(layer: Layer, retries: number = 10, delay: number = 1000) {
        for (let i = 0; i < retries; i++) {
            if (layer.get) {
                const url: string = this.createGetUrl(layer);
                try {
                    const response: Response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
                    const data: any = await response.json();
                    return data;
                } catch (error) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }

            if (layer.post) {
                const query: string = this.createPostQuery(layer);
                const options: RequestInit = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        data: query
                    }).toString()
                }
                try {
                    const response: Response = await fetch(layer.url, options);
                    const data: any = await response.json();
                    return data;
                } catch (error) {
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }
    }

    // private async fetchGeoJsonData(layer: Layer) {
    //     if (layer.get) {
    //         const url: string = this.createGetUrl(layer);
    //         try {
    //             const response: Response = await fetch(url);
    //             const data: any = await response.json();
    //             return data;
    //         } catch (error) {
    //             console.error('Errore nel recupero del layer ' + layer.id);
    //         }
    //     } else if (layer.post) {
    //         const query: string = this.createPostQuery(layer);
    //         const options: RequestInit = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             body: new URLSearchParams({
    //                 data: query
    //             }).toString()
    //         }
    //         try {
    //             const response: Response = await fetch(layer.url, options);
    //             const data: any = await response.json();
    //             return data;
    //         } catch (error) {
    //             console.error('Errore nel recupero del layer ' + layer.id);
    //         }
    //     }
    // }

    private createGetUrl(layer: Layer) {
        if (!layer.get) return layer.url;
        const mapOptions: Map<string, any> = new Map(Object.entries(layer.get));
        const paramsArray: [string, string][] = Array.from(mapOptions, ([key, value]) => [key, String(value)]);
        const params: URLSearchParams = new URLSearchParams(paramsArray);
        return `${layer.url}?${params.toString()}`;
    }

    private createPostQuery(layer: Layer) {
        const bounds: [number, number, number, number] = [44.3654649485199, 8.70205291300195, 44.499460199499595, 9.026271898848734];
        let query: string = '[out:json][timeout:20];\n(\n';
        for (const key in layer.post) {
            if (layer.post.hasOwnProperty(key)) {
                const value = layer.post[key];
                if (value.startsWith("~")) {
                    query += `nwr[${key}~"${value.slice(1)}"](${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]});\n`;
                } else {
                    query += `nwr[${key}="${value}"](${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]});\n`;
                }
            }
        }
        query += `);\nout geom;`
        return query;
    }

    private createGeoJsonFromLayerWithGetUrl(json: any, layer: Layer) {
        let geoJsonNewProp: any = this.substituteRelevantProperties(json, layer);
        let geoJsonAddProp = this.createFeatureAdditionalProperties(geoJsonNewProp, layer);
        return geoJsonAddProp;
    }

    private createGeoJsonFromLayerWithPostUrl(json: any, layer: Layer) {
        const geoJSON: any = {
            type: 'FeatureCollection',
            features: []
        };


        json.elements.forEach((el: any) => {
            const props: any = {};
            const elPropertiesKeys: string[] = Object.keys(el.tags);
            const matchingProperties: LayerProperty[] = layer.relevantProperties.filter((prop: LayerProperty) => elPropertiesKeys.includes(prop.propertyName));

            matchingProperties.forEach((matchingProperty: LayerProperty) => {
                const matchingKey: string = matchingProperty.propertyName;

                if (el.tags[matchingKey]) {
                    const prop = {
                        propertyName: matchingProperty.propertyName,
                        displayName: matchingProperty.displayName,
                        type: matchingProperty.type,
                        value: el.tags[matchingKey]
                    };

                    props[matchingKey] = prop;
                }
            });

            switch (el.type) {
                case 'node':
                    geoJSON.features.push(this.createGeoJsonPointFeature(el, props));
                    break;
                case 'way':
                    if (el.nodes && Array.isArray(el.nodes)) {
                        el.nodes[0] === el.nodes[el.nodes.length - 1] ? geoJSON.features.push(this.createGeoJsonPolygonFeature(el, props)) : geoJSON.features.push(this.createGeoJsonLineStringFeature(el, props));
                    }
                    break;
                case 'relation':
                    if (el.members && Array.isArray(el.members)) {
                        el.members.forEach((m: any) => {
                            if (m.type === 'way') {
                                geoJSON.features.push(this.createGeoJsonLineStringFeature(m, props))
                            }
                        });
                    }

                    break;
                default:
                    break;
            }

        });

        return this.createFeatureAdditionalProperties(geoJSON, layer);
    }

    private createGeoJsonPointFeature(element: any, props: Record<string, any>): any {
        return {
            type: 'Feature',
            properties: props,
            geometry: {
                type: 'Point',
                coordinates: [element.lon, element.lat]
            }
        }
    }

    private createGeoJsonPolygonFeature(element: any, props: Record<string, any>): any {
        return {
            type: 'Feature',
            properties: props,
            geometry: {
                type: 'Polygon',
                coordinates: [element.geometry.map((g: any) => [g.lon, g.lat])]
            }
        }
    }

    private createGeoJsonLineStringFeature(element: any, props: Record<string, any>): any {
        return {
            type: 'Feature',
            properties: props,
            geometry: {
                type: 'LineString',
                coordinates: element.geometry.map((g: any) => [g.lon, g.lat])
            }
        }
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
            f.properties.layerName = layer.id;
            f.properties.uuid = f.id ? f.id : `${layer.id}-${f.geometry.coordinates.toString()}`;
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
            if (geoJson) geoJson.features.forEach((f: Feature) => pois.push(Poi.fromFeature(f)));
        });
        pois = pois.map((p: Poi) => {
            const layer: Layer | undefined = layers.find((l: Layer) => l.id === p.layerName);
            if (layer) p.layer = layer;
            return p;
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