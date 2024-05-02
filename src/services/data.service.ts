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
                layers: group.layers.map((layer: any) => this.parseLayer(layer))
            };
        }
    }

    private parseLayer(layer: any): Layer {
        return new Layer(
            layer.name,
            layer.layer,
            layer.layer_url_wfs,
            new LayerStyle(layer.style.color, parseFloat(layer.style.opacity)),
            layer.tags,
            layer.relevant_properties.map((property: any) => {
                let p: LayerProperty = LayerProperty.createEmpty();
                p.displayName = property.display_name;
                p.propertyName = property.property_name;

                switch (property.type) {
                    case 'image':
                        p.type = PropertyType.Image;
                        break;
                    case 'number':
                        p.type = PropertyType.Number;
                        break;
                    default:
                        p.type = PropertyType.String;
                        break;
                }

                return p;
            })
        );
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
}