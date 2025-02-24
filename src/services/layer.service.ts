import { Layer } from '../models/layer.model';

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
        localStorage.setItem('layers-vi', JSON.stringify(this.activeLayers));
    }

    public getSavedLayers(): void {        
        const savedLayersString: string | null = localStorage.getItem('layers-vi');       
        if (!savedLayersString) return;
        const rawSavedLayers: any = JSON.parse(savedLayersString);
        let savedLayers: Layer[] = [];
        savedLayers = rawSavedLayers.map((layer: any) => this.parseLayer(layer));
        this._activeLayers = savedLayers;
    }

    public parseLayer(layer: any): Layer {
        const l: Layer = Layer.createEmpty();

        if (layer.id) l.id = layer.id;
        if (layer.name) l.name = layer.name;
        if (layer.url) l.url = layer.url;
        if (layer.method) l.method = layer.method;
        if (layer.params) l.params = {...layer.params};
        if (layer.tags) l.tags = [...layer.tags];
        if (layer.relevantProperties) l.relevantProperties = layer.relevantProperties;

        return l;
    }
}