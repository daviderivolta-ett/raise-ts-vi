import { Layer, LayerProperty, LayerStyle, PropertyType } from '../models/layer.model';

export class LayerService {
    private static _instance: LayerService;
    private _activeLayers: Layer[] = [];

    constructor() {
        if (LayerService._instance) return LayerService._instance;
        LayerService._instance = this;
    }

    public static get instance(): LayerService {
        if (!LayerService._instance) LayerService._instance = new LayerService();
        return LayerService._instance;
    }

    public get activeLayers(): Layer[] {
        return this._activeLayers;
    }

    public set activeLayers(activeLayers: Layer[]) {
        this._activeLayers = activeLayers;
        localStorage.setItem('layers', JSON.stringify(this.activeLayers));
    }

    public getSavedLayers(): void {
        const savedLayersString: string | null = localStorage.getItem('layers');
        if (!savedLayersString) return;
        const rawSavedLayers: any = JSON.parse(savedLayersString);
        let savedLayers: Layer[] = [];
        savedLayers = rawSavedLayers.map((layer: any) => this.parseLayer(layer));
        this._activeLayers = savedLayers;       
    }

    private parseLayer(layer: any): Layer {
        return new Layer(
            layer.name,
            layer.layer,
            layer.url = layer.url,
            new LayerStyle(layer.style.color, layer.style.opacity),
            layer.tags,
            layer.relevantProperties.map((property: any) => {
                let p: LayerProperty = LayerProperty.createEmpty();
                p.displayName = property.displayName;
                p.propertyName = property.propertyName;

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
}