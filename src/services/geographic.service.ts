import { Layer, LayerProperty } from '../models/layer.model';
import { Poi, PoiType } from '../models/poi.model';

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

    public async getPoisFromLayer(layer: Layer): Promise<Poi[]> {
        const data: any = await this.fetchLayerData(layer);
        let geoJSON: any;
        if (layer.method === 'get') geoJSON = this._createGeoJsonFromLayerWithGetUrl(data, layer);
        if (layer.method === 'post') geoJSON = this._createGeoJsonFromLayerWithPostUrl(data, layer);
        return geoJSON.features.slice(0, 20).map((f: any) => this._parseFeature(f, layer)).filter((p: Poi) => p.type === PoiType.Point);
    }

    private _parseFeature(feature: GeoJSON.Feature, layer: Layer): Poi {
        let p: Poi = new Poi();

        if (feature.properties && feature.properties.uuid) p.uuid = feature.properties.uuid;
        if (feature.properties && feature.properties.customName) p.name = feature.properties.customName;
        if (feature.properties && feature.properties.layerId) p.layerName = feature.properties.layerId;
        if (feature.properties && feature.properties.props) p.props = [...feature.properties.props];

        p.layer = layer;

        if (feature.geometry) {
            switch (feature.geometry.type) {
                case 'Point':
                    p.coordinates = feature.geometry.coordinates;
                    p.type = PoiType.Point;
                    break;
                case 'LineString':
                    p.coordinates = feature.geometry.coordinates;
                    p.type = PoiType.LineString;
                    break;
                case 'Polygon':
                    p.coordinates = feature.geometry.coordinates;
                    p.type = PoiType.Polygon;
                    break;
                default:
                    console.warn(`Unsupported geometry type: ${feature.geometry.type}`);
                    p.type = PoiType.Polygon;
            }
        }
        
        return p;
    }

    public async fetchLayerData(layer: Layer): Promise<any> {
        switch (layer.method) {
            case 'get':
                const url: string = this._createGetUrl(layer);

                try {
                    const response: Response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    }
                    else {
                        throw new Error('Errore nel recupero dei dati del layer');
                    }
                } catch (error) {
                    throw new Error('Errore nel recupero dei dati del layer');
                }

            case 'post':
                const query: string = this._createPostQuery(layer);

                try {
                    const response: Response = await fetch(layer.url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: new URLSearchParams({
                            data: query
                        }).toString()
                    });
                    if (response.ok) {
                        const data: any = await response.json();
                        return data;
                    } else {
                        throw new Error('Errore nel recupero dei dati del layer');
                    }

                } catch (error) {
                    throw new Error('Errore nel recupero dei dati del layer');
                }

            default:
                break;
        }
    }

    private _createGetUrl(layer: Layer): string {
        const mapOptions: Map<string, any> = new Map(Object.entries(layer.params));
        const paramsArray: [string, string][] = Array.from(mapOptions, ([key, value]) => [key, String(value)]);
        const params: URLSearchParams = new URLSearchParams(paramsArray);
        return `${layer.url}?${params.toString()}`;
    }

    private _createPostQuery(layer: Layer): string {
        const bounds: [number, number, number, number] = [44.3654649485199, 8.70205291300195, 44.499460199499595, 9.026271898848734];
        let query: string = '[out:json][timeout:20];\n(\n';

        for (const key in layer.params) {
            if (layer.params.hasOwnProperty(key)) {
                const value = layer.params[key];
                if (value.startsWith("~")) {
                    query += `nwr["${key}"~"${value.slice(1)}"](${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]});\n`;
                } else {
                    query += `nwr["${key}"="${value}"](${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]});\n`;
                }
            }
        }

        query += `);\nout geom;`;

        return query;
    }

    private _createGeoJsonFromLayerWithGetUrl(json: any, layer: Layer): GeoJSON.FeatureCollection {
        let geoJSON: GeoJSON.FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        }

        if (json.features && Array.isArray(json.features)) {
            geoJSON.features = json.features.map((f: any, i: number) => {

                let properties: any = {
                    customName: f.properties['name'] ? f.properties['name'] : `${layer.name} ${i}`,
                    layerId: layer.id,
                    uuid: this._createFeatureUuid(layer.id, f),
                    props: this._createFeatureProps(f.properties, layer.relevantProperties)
                };

                return { ...f, properties }

            });
        }

        return geoJSON;
    }

    private _createFeatureUuid(layerId: string, feature: GeoJSON.Feature): string {
        const sanitize = (value: number): string => {
            // Converte il valore numerico in una stringa senza caratteri speciali
            return value.toString().replace(/\D/g, '');  // Rimuove qualsiasi carattere non numerico (anche decimali)
        };

        switch (feature.geometry.type) {
            case 'Point':
                // Per un Point, somma le coordinate e converte il risultato in un ID
                const pointSum = feature.geometry.coordinates[0] + feature.geometry.coordinates[1];
                return layerId + sanitize(pointSum);

            case 'LineString':
                // Per un LineString, somma le coordinate del primo punto
                const lineSum = feature.geometry.coordinates[0][0] + feature.geometry.coordinates[0][1];
                return layerId + sanitize(lineSum);

            case 'Polygon':
                // Per un Polygon, somma le coordinate del primo punto del primo anello
                const polygonSum = feature.geometry.coordinates[0][0][0] + feature.geometry.coordinates[0][0][1];
                return layerId + sanitize(polygonSum);

            case 'MultiPoint':
                // Per un MultiPoint, somma le coordinate del primo punto
                const multiPointSum = feature.geometry.coordinates[0][0] + feature.geometry.coordinates[0][1];
                return layerId + sanitize(multiPointSum);

            case 'MultiLineString':
                // Per un MultiLineString, somma le coordinate del primo punto della prima linea
                const multiLineSum = feature.geometry.coordinates[0][0][0] + feature.geometry.coordinates[0][0][1];
                return layerId + sanitize(multiLineSum);

            case 'MultiPolygon':
                // Per un MultiPolygon, somma le coordinate del primo punto del primo anello del primo poligono
                const multiPolygonSum = feature.geometry.coordinates[0][0][0][0] + feature.geometry.coordinates[0][0][0][1];
                return layerId + sanitize(multiPolygonSum);

            case 'GeometryCollection':
                // Per una GeometryCollection, usa il primo elemento geometrico
                return layerId + this._createFeatureUuid(layerId, { type: 'Feature', geometry: feature.geometry.geometries[0] } as GeoJSON.Feature);

            default:
                return '';
        }
    }

    private _createFeatureProps(properties: Record<string, any>, relevantProperties: LayerProperty[]): Record<string, any>[] {
        return Object.keys(properties)
            .map((key: string) => {
                const foundProp: LayerProperty | undefined = relevantProperties.find((r: LayerProperty) => r.propertyName === key);
                if (foundProp && properties[key] !== undefined && properties[key] !== null) {
                    return {
                        propertyName: foundProp.propertyName,
                        displayName: foundProp.displayName,
                        type: foundProp.type,
                        value: properties[key]
                    };
                }

                return null;
            })
            .filter((prop: any) => prop !== null) as Record<string, any>[];
    }

    private _createGeoJsonFromLayerWithPostUrl(json: any, layer: Layer): GeoJSON.FeatureCollection {
        const geoJSON: GeoJSON.FeatureCollection = {
            type: 'FeatureCollection',
            features: []
        };

        for (const element of json.elements) {
            switch (element.type) {
                case 'node':
                    geoJSON.features.push(this._createGeoJsonPointFeature(element, layer));
                    break;

                default:
                    break;
            }
        }

        return geoJSON;
    }

    private _createGeoJsonPointFeature(element: any, layer: Layer): any {
        return {
            type: 'Feature',
            properties: {
                customName: element.tags['name'] ? element.tags['name'] : `${layer.name}`,
                layerId: layer.id,
                uuid: this._createFeatureUuid(layer.id, { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [element.lon, element.lat] } }),
                props: this._createFeatureProps(element.tags, layer.relevantProperties)
            },
            geometry: {
                type: 'Point',
                coordinates: [element.lon, element.lat]
            }
        }
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