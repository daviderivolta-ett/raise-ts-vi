import { Data, Layer, LayerCategory, LayerGroup, LayerProperty, LayerStyle, PropertyType } from '../models/layer.model';

export class DataService {
    private static _instance: DataService;
    private CATEGORIES_URL: string = './json/categories.json';
    private _data: Data = { categories: [] };

    constructor() {
        if (DataService._instance) return DataService._instance;
        DataService._instance = this;
    }

    static get instance(): DataService {
        if (!DataService._instance) DataService._instance = new DataService();
        return DataService._instance;
    }

    public get data(): Data {
        return this._data;
    }

    public set data(data: Data) {
        this._data = data;
    }

    public async getData(): Promise<Data> {
        if (this.data.categories.length !== 0) {
            return this._data;
        } else {
            let data: Data = await this.fetchAppData(this.CATEGORIES_URL);
            data = this.parseData(data);         
            this.data = data;           
            return data;
        }
    }

    private async fetchAppData(url: string): Promise<Data> {
        try {
            const data: Data = await fetch(url).then(res => res.json());
            const categoriesPromises: LayerCategory[] = await Promise.all(data.categories.map(async (category: LayerCategory) => {
                const groupPromises: LayerGroup[] | string[] = await Promise.all(category.groups.map(async (group: LayerGroup | string) => {
                    if (typeof group === 'string') {
                        try {
                            const res = await fetch(group);
                            if (res.ok) return res.json();
                            throw new Error('Errore durante il recupero dei dati.');
                        } catch (error) {
                            console.error(error);
                            return null;
                        }
                    } else {
                        return group;
                    }
                }));
                category.groups = groupPromises;
                return category;
            }));

            return {
                ...data,
                categories: categoriesPromises
            }
        } catch (error) {
            console.error('Errore durante il recupero dei dati JSON.', error);
            throw error;
        }
    }

    private parseData(data: any): Data {
        const parsedCategories: LayerCategory[] = data.categories.map((category: any) => ({
            name: category.name,
            groups: category.groups.map((group: any) => this.parseGroup(group))
        }));

        return {
            categories: parsedCategories
        };
    }

    private parseGroup(group: any): LayerGroup | string[] {
        if (Array.isArray(group)) {
            return group;
        } else {
            return {
                name: group.name,
                layers: group.layers.map((layer: any) => this._parseLayer(layer))
            };
        }
    }

    private _parseLayer(layer: any): Layer {        
        const l: Layer = Layer.createEmpty();

        if (layer.id) l.id = layer.id;
        if (layer.name) l.name = layer.name;
        if (layer.url) l.url = layer.url;
        if (layer.get) {
            l.method = 'get';
            l.params = { ...layer.get };
        }
        if (layer.post) {
            l.method = 'post';
            l.params = { ...layer.post };
        }
        if (layer.tags) l.tags = [...layer.tags];
        if (layer.relevant_properties) l.relevantProperties = layer.relevant_properties.map((p: any) => this._parseProperty(p));

        return l;
    }

    private _parseProperty(p: any): LayerProperty {
        let prop: LayerProperty = LayerProperty.createEmpty();

        if (p.property_name) prop.propertyName = p.property_name;
        if (p.display_name) prop.displayName = p.display_name;
        if (p.type) prop.type = p.type;

        return prop;
    }

    public getAllTags(data: Data): string[] {
        let tags: string[] = [];

        data.categories.map((category: LayerCategory) => {
            category.groups.map((group: LayerGroup | string) => {
                if (typeof group !== 'string') {
                    group.layers.map((layer: Layer) => {
                        layer.tags.map((tag: string) => {
                            tags.push(tag);
                        });
                    });
                }
            });
        });

        let uniq: string[] = [...new Set(tags)];

        return uniq;
    }

    public filterLayersByTags(tags: string[]): Layer[] {
        let allLayers: Layer[] = [];

        tags.forEach((tag: string) => {
            const layers: Layer[] = this.filterLayersByTag(tag);
            layers.forEach((layer: Layer) => allLayers.push(layer));
        });

        let uniq: Layer[] = [...new Set(allLayers)];

        return uniq;
    }

    public filterLayersByTag(value: string): Layer[] {
        let layers: Layer[] = [];

        layers = this.data.categories.flatMap((category: LayerCategory) => {
            return category.groups.flatMap((group: LayerGroup | string) => {
                if (typeof group === 'string') return [Layer.createEmpty()];
                return group.layers.filter((layer: Layer) => {
                    return layer.tags.some((tag: string) => tag.includes(value));
                });
            });
        });

        return layers;
    }

    public getLayerById(id: string): Layer | undefined {
        for (const category of this.data.categories) {
            for (const group of category.groups) {
                if (typeof group === 'string') continue;
                const layer = group.layers.find((layer: Layer) => layer.id === id);
                if (layer) return layer;
            }
        }
        return undefined;
    }

}