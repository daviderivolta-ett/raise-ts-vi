var V=Object.defineProperty;var W=(o,e,t)=>e in o?V(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>(W(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();var L=(o=>(o.Default="default",o.Page="page",o.NotFound="not-found",o))(L||{});class H{constructor(e,t,s){r(this,"url");r(this,"type");r(this,"routing");this.url=e,this.type=t,this.routing=s}}class A{constructor(e,t,s=2){r(this,"type");r(this,"message");r(this,"duration");this.type=e,this.message=t,this.duration=s}static createEmpty(){return new A("info","",2)}}var x=(o=>(o.Error="error",o.Info="info",o))(x||{});const b=class b{constructor(){r(this,"_snackbar",new A(x.Info,""));r(this,"_live",document.body.querySelector("app-snackbar"));if(b._instance)return b._instance;b._instance=this}static get instance(){return b._instance||(b._instance=new b),b._instance}get snackbar(){return this._snackbar}set snackbar(e){this._snackbar=e}get live(){return this._live}set live(e){this._live=e}updateSnackbar(e,t,s=5){this.live&&(this.live.snackbar=new A(e,t,s))}resetSnackbar(){this.live&&this.live.resetSnackbar()}};r(b,"_instance");let m=b;class K extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(t){this.routes=[...t],this.checkRoute()}checkRoute(){const t=window.location.hash.slice(2);this.changeRoute(t)}changeRoute(t){if(m.instance.resetSnackbar(),t){const s=this.routes.findIndex(n=>n.url===t);this.shadowRoot.innerHTML=this.routes[s]?this.routes[s].routing():this.sendNotFound()}else{const s=this.routes.filter(n=>n.type===L.Default);s?window.location.hash="#/"+s[0].url:this.sendNotFound()}}sendNotFound(){const t=this.routes.filter(s=>s.type===L.NotFound);return t.length===0||(window.location.hash="#/"+t[0].url,this.changeRoute(t[0].url)),"404: Not found"}}customElements.define("app-router",K);class X extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="loader">
                <div id="loader-spin"></div>
                <p class="loader-text">Caricamento...</p>
            </div>

            <style>
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100dvh;
                    width: 100vw;
                    background-color: var(--surface-container);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #loader-spin {
                    position: absolute;
                    bottom: 24px;
                    width: 32px;
                    height: 32px;
                    margin: 16px;
                    border-radius: 50%;
                    animation: rotate 1s linear infinite
                }
                
                #loader-spin::before {
                    content: "";
                    box-sizing: border-box;
                    position: absolute;
                    inset: 0px;
                    border-radius: 50%;
                    border: 3px solid var(--on-surface);
                    animation: prixClipFix 2s linear infinite;
                }
                
                @keyframes rotate {
                    100% {
                        transform: rotate(360deg)
                    }
                }
                
                @keyframes prixClipFix {
                    0% {
                        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
                    }
                
                    25% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
                    }
                
                    50% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
                    }
                
                    75% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
                    }
                
                    100% {
                        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
                    }
                }
            </style>
            `}}customElements.define("app-loader",X);class D{constructor(e,t){r(this,"color");r(this,"opacity");this.color=e,this.opacity=t}static createEmpty(){return new D("#008000",1)}}class B{constructor(e,t,s){r(this,"propertyName");r(this,"displayName");r(this,"type");this.propertyName=e,this.displayName=t,this.type=s}static createEmpty(){return new B("","","string")}}var C=(o=>(o.String="string",o.Image="image",o.Number="number",o))(C||{});class N{constructor(e,t,s,n,a,i){r(this,"name");r(this,"layer");r(this,"url");r(this,"style");r(this,"tags");r(this,"relevantProperties");this.name=e,this.layer=t,this.url=s,this.style=n,this.tags=a,this.relevantProperties=i}static createEmpty(){return new N("","","",D.createEmpty(),[],[B.createEmpty()])}}const f=class f{constructor(){r(this,"CATEGORIES_URL","./json/categories.json");r(this,"_data",{categories:[]});if(f._instance)return f._instance;f._instance=this}static get instance(){return f._instance||(f._instance=new f),f._instance}get data(){return this._data}set data(e){this._data=e}async getData(){if(this.data.categories.length!==0)return this._data;{let e=await this.fetchAppData(this.CATEGORIES_URL);return e=this.parseData(e),this.data=e,e}}async fetchAppData(e){try{const t=await fetch(e).then(n=>n.json()),s=await Promise.all(t.categories.map(async n=>{const a=await Promise.all(n.groups.map(async i=>{if(typeof i=="string")try{const c=await fetch(i);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return i}));return n.groups=a,n}));return{...t,categories:s}}catch(t){throw console.error("Errore durante il recupero dei dati JSON.",t),t}}parseData(e){return{categories:e.categories.map(s=>({name:s.name,groups:s.groups.map(n=>this.parseGroup(n))}))}}parseGroup(e){return Array.isArray(e)?e:{name:e.name,layers:e.layers.map(t=>this.parseLayer(t))}}parseLayer(e){return new N(e.name,e.layer,e.layer_url_wfs,new D(e.style.color,parseFloat(e.style.opacity)),e.tags,e.relevant_properties.map(t=>{let s=B.createEmpty();switch(s.displayName=t.display_name,s.propertyName=t.property_name,t.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}getAllTags(e){let t=[];return e.categories.map(n=>{n.groups.map(a=>{typeof a!="string"&&a.layers.map(i=>{i.tags.map(c=>{t.push(c)})})})}),[...new Set(t)]}filterLayersByTags(e){let t=[];return e.forEach(n=>{this.filterLayersByTag(n).forEach(i=>t.push(i))}),[...new Set(t)]}filterLayersByTag(e){let t=[];return t=this.data.categories.flatMap(s=>s.groups.flatMap(n=>typeof n=="string"?[N.createEmpty()]:n.layers.filter(a=>a.tags.some(i=>i.includes(e))))),t}};r(f,"_instance");let I=f;const v=class v{constructor(){r(this,"_activeLayers",[]);if(v._instance)return v._instance;v._instance=this}static get instance(){return v._instance||(v._instance=new v),v._instance}get activeLayers(){return this._activeLayers}set activeLayers(e){this._activeLayers=e,localStorage.setItem("layers",JSON.stringify(this.activeLayers))}getSavedLayers(){const e=localStorage.getItem("layers");if(!e)return;const t=JSON.parse(e);let s=[];s=t.map(n=>this.parseLayer(n)),this._activeLayers=s}parseLayer(e){return new N(e.name,e.layer,e.url=e.url,new D(e.style.color,e.style.opacity),e.tags,e.relevantProperties.map(t=>{let s=B.createEmpty();switch(s.displayName=t.displayName,s.propertyName=t.propertyName,t.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}};r(v,"_instance");let q=v;class U extends HTMLButtonElement{constructor(){super();r(this,"_tag","")}get tag(){return this._tag}set tag(t){this._tag=t}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:this.tag}}))})}}customElements.define("app-tag-chip",U,{extends:"button"});class Q extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_tags",[]);r(this,"_currentPageTags",[]);r(this,"_currentPage",0);r(this,"_tagsPerPage",8);r(this,"handleCheckbox",t=>{const s=t.target;this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:s.tag}}))});this.shadowRoot=this.attachShadow({mode:"closed"})}get tags(){return this._tags}set tags(t){this._tags=t,this.connectedCallback()}get currentPageTags(){return this._currentPageTags}set currentPageTags(t){this._currentPageTags=t}get currentPage(){return this._currentPage}set currentPage(t){this._currentPage=t}get tagsPerPage(){return this._tagsPerPage}set tagsPerPage(t){this._tagsPerPage=t}connectedCallback(){this.render(),this.tags.length!==0&&(this.paginateTags(),this.setup())}render(){this.shadowRoot.innerHTML=`
            <div class="pagination">
                <div class="current-page-status">                    
                    <p>Scegli una categoria per caricare i punti di interesse associati.</p>
                    <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                </div>

                <div class="pagination-buttons">
                    <button type="button" class="pagination-btn prev-btn" aria-label="Paginazione precedente"><span class="material-symbols-outlined">chevron_left</span></button>
                    <p tabindex="-1" class="current-page">Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}</p>
                    <button type="button" class="pagination-btn next-btn" aria-label="Paginazione successiva"><span class="material-symbols-outlined">chevron_right</span></button>
                </div>

                <div class="tags"></div>
            </div>

            <style>
                *:focus {
                    outline: 1px solid default;
                }

                p {
                    color: var(--on-surface-variant);
                }

                button {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                }

                button[disabled] {
                    cursor: not-allowed;
                    opacity: 0.5;
                }

                .current-page-status {
                    text-align: center;
                }

                .current-page {
                    text-align: center;
                }

                .pagination-buttons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0 0 8px 0;
                }

                .pagination-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                    min-height: 40px;
                    min-width: 40px;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                .tags {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                button[is="app-tag-chip"] {
                    width: 100%;
                    display: block;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border: 1px solid var(--outline);
                    padding: 8px 8px;
                    border-radius: var( --border-radius-s);
                }

                button[is="app-tag-chip"]:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector(".prev-btn"),s=this.shadowRoot.querySelector(".next-btn");t&&s&&(t.addEventListener("click",()=>this.prevPage()),s.addEventListener("click",()=>this.nextPage()))}update(){const t=this.shadowRoot.querySelector(".current-page");if(!t)return;t.innerHTML=`Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}`;const s=this.shadowRoot.querySelector(".tags-list");if(!s)return;s.innerHTML=this.currentPageTags.join(", ");const n=this.shadowRoot.querySelector(".prev-btn"),a=this.shadowRoot.querySelector(".next-btn");if(!n||!a)return;this.currentPage===0?n.setAttribute("disabled",""):n.removeAttribute("disabled"),this.currentPage===this.getPagesNumber()?a.setAttribute("disabled",""):a.removeAttribute("disabled"),Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]')).forEach(c=>c.addEventListener("tag-selected",this.handleCheckbox))}paginateTags(){const t=this.currentPage*this.tagsPerPage;let s=t+this.tagsPerPage;s>this.tags.length&&(s=this.tags.length);const n=this.shadowRoot.querySelector(".tags");if(n){n.innerHTML="",this.currentPageTags=[];for(let a=t;a<s;a++){let i=this.tags[a];this.currentPageTags.push(i);let c=this.createChip(i);n.append(c)}this.update()}}createChip(t){let s=new U;return s.setAttribute("is","app-tag-chip"),s.classList.add("chip"),s.innerHTML=t.charAt(0).toUpperCase()+t.slice(1),s.tag=t,s}getPagesNumber(){return Math.floor(this.tags.length/this.tagsPerPage)}prevPage(){this.currentPage>0&&(this.currentPage--,this.paginateTags(),m.instance.updateSnackbar(x.Info,`Paginazione cambiata: pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}. Categorie in questa pagina: ${this.currentPageTags.join(", ")}`))}nextPage(){this.currentPage<this.getPagesNumber()&&(this.currentPage++,this.paginateTags(),m.instance.updateSnackbar(x.Info,`Paginazione cambiata: pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}. Categorie in questa pagina: ${this.currentPageTags.join(", ")}`))}}customElements.define("app-tags-wall",Q);class Z extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await I.instance.getData(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="categories-page">
                <div class="page-header">
                    <h1 tabindex="-1" class="categories-page-title">Esplora categorie</h1>
                </div>
                <app-tags-wall />
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .categories-page {
                    position: relative;
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                .categories-page-title {
                    text-align: center;
                    font-size: 1rem;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){const t=this.shadowRoot.querySelector("app-tags-wall");if(!t)return;let s=I.instance.getAllTags(I.instance.data);t.tags=s,t.addEventListener("tag-selected",n=>{q.instance.activeLayers=I.instance.filterLayersByTag(n.detail.tag),window.location.hash="/around-you"})}}customElements.define("page-categories",Z);const P=class P{constructor(){r(this,"_position",null);if(P._instance)return P._instance;P._instance=this}static get instance(){return P._instance||(P._instance=new P),P._instance}get position(){return this._position}set position(e){this._position=e}async getUserPosition(){try{return await new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(n=>{t(n)},n=>{s(n)})})}catch(e){throw e}}};r(P,"_instance");let j=P;var l=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(l||{});class O{constructor(e,t){r(this,"type");r(this,"coordinates");this.type=e,this.coordinates=t}static createEmpty(){return new O("Point",[])}}class G{constructor(e,t,s,n,a){r(this,"type");r(this,"geometry");r(this,"properties");r(this,"id");r(this,"geometry_name");this.type=e,this.geometry=t,this.properties=s,this.id=n,this.geometry_name=a}static createEmpty(){return new G("",O.createEmpty(),{prop:""},"","")}}class y{constructor(){r(this,"uuid","");r(this,"name","");r(this,"type","Point");r(this,"coordinates",[]);r(this,"layerName","");r(this,"props",[]);r(this,"distance")}static fromFeature(e){const t=new y;switch(t.uuid=e.properties.uuid,t.name=e.properties.name,e.geometry.type){case l.LineString:t.type="LineString";break;case l.Polygon:t.type="Polygon";break;case l.MultiPoint:t.type="MultiPoint";break;case l.MultiLineString:t.type="MultiLineString";break;case l.MultiPolygon:t.type="MultiPolygon";break;default:t.type="Point";break}t.coordinates=e.geometry.coordinates,t.layerName=e.properties.layerName;for(const s in e.properties){if(typeof e.properties[s]!="object")continue;let n=new F;switch(n.displayName=e.properties[s].displayName,n.value=e.properties[s].value,e.properties[s].type){case"number":n.type="number";break;case"image":n.type="image";break;default:n.type="string";break}t.props.push(n)}return t}}var u=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(u||{});class F{constructor(){r(this,"displayName","");r(this,"type","string");r(this,"value","")}}var z=(o=>(o.String="string",o.Image="image",o.Number="number",o))(z||{});const h=class h{constructor(){if(h._instance)return h._instance;h._instance=this}static get instance(){return h._instance||(h._instance=new h),h._instance}async createGeoJson(e){const t=`${e.url}?service=WFS&typeName=${e.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let n=await(await fetch(t)).json(),a=this.substituteRelevantProperties(n,e),c={...this.createFeatureAdditionalProperties(a,e)};return c.features=c.features.slice(0,10),c.features=c.features.map(d=>this.parseFeature(d)),c}substituteRelevantProperties(e,t){return e.features.forEach(s=>{const n={};for(const a in s.properties){const i=t.relevantProperties.find(c=>c.propertyName===a);if(i){const c={displayName:i.displayName,type:i.type,value:s.properties[a]};n[a]=c}}s.properties=n}),e}createFeatureAdditionalProperties(e,t){return e.features=e.features.map((s,n)=>(s.properties.name=t.name+" "+n,s.properties.layerName=t.layer,s.properties.uuid=s.id,s)),e}parseFeature(e){let t=G.createEmpty();return t.type=e.type,t.properties=e.properties,t.geometry_name=e.geometry_name,t.id=e.id,e.geometry&&(t.geometry=this.parseFeatureGeometry(e.geometry)),t}parseFeatureGeometry(e){let t=O.createEmpty();return t.type=this.parseFeatureGeometryType(e.type),t.coordinates=e.coordinates,t}parseFeatureGeometryType(e){let t=l.Point;switch(e){case"LineString":t=l.LineString;break;case"Polygon":t=l.Polygon;break;case"MultiPoint":t=l.MultiPoint;break;case"MultiLineString":t=l.MultiLineString;break;case"MultiPolygon":t=l.MultiPolygon;break}return t}async getPoisFromLayers(e){let t=[];const s=e.map(async a=>h.instance.createGeoJson(a));return(await Promise.all(s)).forEach(a=>{a.features.forEach(i=>t.push(y.fromFeature(i)))}),t.filter(a=>!h.instance.isCoordinatesMultidimensional(a.coordinates))}isCoordinatesMultidimensional(e){if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))return!0;return!1}orderPoisByDistance(e,t){return t.forEach(s=>{if(!h.instance.isCoordinatesMultidimensional(s.coordinates)){const n=Array.isArray(s.coordinates)?s.coordinates[1]:s.coordinates,a=Array.isArray(s.coordinates)?s.coordinates[0]:s.coordinates,i=this.haversineDistance(n,a,e.coords.latitude,e.coords.longitude);s.distance=i}}),t.sort((s,n)=>s.distance&&n.distance?s.distance-n.distance:0),t}haversineDistance(e,t,s,n){const a=e*Math.PI/180,i=s*Math.PI/180,d=(n-t)*Math.PI/180;return Math.acos(Math.sin(a)*Math.sin(i)+Math.cos(a)*Math.cos(i)*Math.cos(d))*6371e3}};r(h,"_instance");let $=h;const w=class w{constructor(){r(this,"_selectedPoi",new y);if(w._instance)return w._instance;w._instance=this}static get instance(){return w._instance||(w._instance=new w),w._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(e){this._selectedPoi=e,localStorage.setItem("selected-poi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const e=localStorage.getItem("selected-poi");if(!e)return;const t=JSON.parse(e);this._selectedPoi=this.parsePoi(t)}parsePoi(e){let t=new y;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=u.LineString;break;case l.Polygon:e.type=u.Polygon;break;case l.MultiPoint:e.type=u.MultiPoint;break;case l.MultiLineString:e.type=u.MultiLineString;break;case l.MultiPolygon:e.type=u.MultiPolygon;break;default:e.type=u.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let n=new F;switch(n.displayName=e.props[s].displayName,n.value=e.props[s].value,e.props[s].type){case"number":n.type=z.Number;break;case"image":n.type=z.Image;break;default:n.type=z.String;break}t.props.push(n)}return e.distance&&(t.distance=e.distance),t}};r(w,"_instance");let _=w;class tt extends HTMLDialogElement{constructor(){super()}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <div class="dialog-content">
                <div class="menu-header">
                    <h2 class="menu-title">Menu</h2>
                    <button type="button" class="close-menu-btn" aria-label="Chiudi menu" autofocus>
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
                <nav class="menu" >
                    <ul>
                        <li><a href="/categories">Seleziona categoria</a></li>
                        <li><a href="/around-you">Intorno a me</a></li>
                        <li><a href="/suggested-paths">Percorsi suggeriti</a></li>
                        <li><a href="/custom-path">Percorso personalizzato</a></li>
                        <li><a href="/settings">Impostazioni</a></li>
                    </ul>
                </nav>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                    color: var(--on-surface);
                }

                .menu-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                .dialog-content {
                    position: relative;
                    max-width: 576px;
                    margin: auto;
                    padding: 0 4%;
                }

                button.close-menu-btn {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .menu-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .menu ul {
                    margin: 0;
                    padding: 0;
                    text-align: center;
                    list-style-type: none;
                }

                .menu ul li + li {
                    margin: 16px 0;
                }

                .menu a {
                    color: var(--on-surface-variant);
                    text-decoration: none;
                    font-size: 1.4rem;
                }

                .menu a:hover {
                    color: var(--primary);
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){this.setupCloseBtn(),this.setupLinkBehaviour()}setupCloseBtn(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close())}setupLinkBehaviour(){const e=this.querySelectorAll("a");e&&e.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const n=t.getAttribute("href");n&&(this.close(),window.location.hash=n)})})}}customElements.define("app-menu",tt,{extends:"dialog"});class et extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new y);r(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <article class="poi-card" aria-labelledby="poi-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="poi-card-info">
                    <h3 class="poi-card-title" id="poi-card-title">${this.poi.name}</h3>
                    <p class="poi-card-distance" aria-label="Distanza da te: ${Math.round(this.poi.distance)} metri">${Math.round(this.poi.distance)}<span aria-hidden="true">m</span></p>
                </div>
                <button type="button" class="info-btn" aria-label="Vedi dettagli punto di interesse">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .poi-card-title {
                    font-size: 1rem;
                    margin: 0 0 8px 0;
                }

                .poi-card-distance {
                    font-size: .9rem;
                    color: var(--on-surface-variant);
                }

                .info-btn {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-m);
                    box-sizing: border-box;
                }

                .info-btn:hover {
                    opacity: 0.75;
                }

                .poi-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-s);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                button {
                    cursor: pointer;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector(".info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-poi-card",et);class st extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_pois",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get pois(){return this._pois}set pois(t){this._pois=t}async connectedCallback(){this.createLoader();const t=await j.instance.getUserPosition();m.instance.updateSnackbar(x.Info,"Caricamento..."),this.pois=await $.instance.getPoisFromLayers(q.instance.activeLayers),this.pois=$.instance.orderPoisByDistance(t,this.pois),this.render(),this.setup(),this.removeLoader(),m.instance.resetSnackbar()}render(){this.shadowRoot.innerHTML=`
            <div class="around-you-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Punti di interesse</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <p class="page-desc">Elenco punti di interesse nelle vicinanze.</p>
                <section class="around-you-features" role="feed"></section>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .around-you-page {
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }
                
                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }
                
                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .page-desc {
                    text-align: center;
                    margin: 0 0 24px 0;
                    color: var(--on-surface-variant);
                }

                .around-you-features {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector(".around-you-features");if(!t)return;this.pois.forEach((n,a)=>{const i=document.createElement("app-poi-card");i.poi=n,i.position=a+1,t.append(i)});const s=this.shadowRoot.querySelector("h1");s&&s.focus()}setup(){this.shadowRoot.querySelectorAll("app-poi-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}createLoader(){const t=new X;document.body.append(t)}removeLoader(){const t=document.body.querySelector("app-loader");t&&t.remove()}}customElements.define("page-around-you",st);class M{constructor(e,t){r(this,"name");r(this,"pois");this.name=e,this.pois=t}static createEmpty(){return new M("",[])}}const E=class E{constructor(){r(this,"_customPath",new M("Percorso personalizzato",[]));r(this,"_suggestedPaths",[]);r(this,"_selectedSuggestedPath",new M("",[]));if(E._instance)return E._instance;E._instance=this}static get instance(){return E._instance||(E._instance=new E),E._instance}get customPath(){return this._customPath}set customPath(e){this._customPath=e}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(e){this._suggestedPaths=e}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(e){this._selectedSuggestedPath=e,localStorage.setItem("selected-suggested-path",JSON.stringify(this.selectedSuggestedPath))}addPoiToCustomPath(e){if(this.isPoiInCustomPath(e))return;const t={...this.customPath};t.pois.unshift(e),this.customPath={...t}}isPoiInCustomPath(e){return this.customPath.pois.some(t=>t.uuid===e.uuid)}saveCustomPath(){localStorage.setItem("custom-path",JSON.stringify(this.customPath))}getSavedCustomPath(){const e=localStorage.getItem("custom-path");if(!e)return;const t=JSON.parse(e);this._customPath=this.parsePath(t)}parsePath(e){let t=new M(e.name,e.pois);return t.pois=t.pois.map(s=>this.parsePoi(s)),t}parsePoi(e){let t=new y;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=u.LineString;break;case l.Polygon:e.type=u.Polygon;break;case l.MultiPoint:e.type=u.MultiPoint;break;case l.MultiLineString:e.type=u.MultiLineString;break;case l.MultiPolygon:e.type=u.MultiPolygon;break;default:e.type=u.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let n=new F;switch(n.displayName=e.props[s].displayName,n.value=e.props[s].value,e.props[s].type){case"number":n.type=z.Number;break;case"image":n.type=z.Image;break;default:n.type=z.String;break}t.props.push(n)}return e.distance&&(t.distance=e.distance),t}getCsvPaths(e){return new Promise((t,s)=>{let n=0;const a=[],i=[];for(;n<=e;){const c=fetch(`./suggested-paths/${n}.tsv`).then(d=>d.text()).then(d=>{const T=this.parseCsvFile(d);a.push(this.parseCsvPath(T))}).catch(d=>console.error("Errore durante il recupero dei percorsi suggeriti",d));i.push(c),n++}Promise.all(i).then(()=>{this.suggestedPaths=[...a],t()}).catch(c=>s(c))})}parseCsvFile(e){return e.split(`
`).map(n=>{const a=n.split("	");return{path:a[0],layerName:a[1],id:a[2],name:a[3],latitude:a[4],longitude:a[5],height:a[6],info:a[7]}})}parseCsvPath(e){let t=M.createEmpty();return t.name=e[1].path,e.forEach((s,n)=>{n!==0&&t.pois.push(this.parseCsvPoi(s))}),t}parseCsvPoi(e){let t=new y;return t.layerName=e.layerName,t.name=e.name,t.coordinates=[parseFloat(e.longitude),parseFloat(e.latitude),parseFloat(e.height)],t.type=u.Point,t.uuid=e.id,t.props=this.parseCsvPoiProperties(e.info),t}parseCsvPoiProperties(e){let t=[];return e.split("|").forEach(n=>{let a=new F;a.displayName=n.split(":")[0],a.value=n.split(":")[1].trim(),a.type=z.String,t.push(a)}),t}getSuggestedPaths(e){let t=[];return this.suggestedPaths.forEach(s=>{s.pois.forEach(n=>{e.forEach(a=>{n.layerName===a.layer&&t.push(s)})})}),[...new Set(t)]}getSelectedSuggestedPath(){const e=localStorage.getItem("selected-suggested-path");if(!e)return;const t=JSON.parse(e);this._selectedSuggestedPath=this.parsePath(t)}};r(E,"_instance");let g=E;const k=class k{constructor(){k._instance||(k._instance=this)}static get instance(){return k._instance||(k._instance=new k),k._instance}calculateDistance(e,t){const s=e[0]-t[0],n=e[1]-t[1];return Math.sqrt(s*s+n*n)}nearestInsertion(e,t){const s=[...e];let n=0,a=this.calculateDistance(t,s[0].coordinates);for(let c=1;c<s.length;c++){const d=this.calculateDistance(t,s[c].coordinates);d<a&&(a=d,n=c)}const i=[s.splice(n,1)[0]];for(;s.length>0;){a=Number.MAX_VALUE;let c=0;for(let d=0;d<s.length;d++){const T=this.calculateDistance(i[i.length-1].coordinates,s[d].coordinates);T<a&&(a=T,c=d)}i.push(s.splice(c,1)[0])}return i.reverse()}};r(k,"_instance");let J=k;class nt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new y);r(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <article class="custom-path-card" aria-labelledby="custom-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="custom-path-card-info">
                    <h3 class="custom-path-card-title" id="custom-path-card-title">${this.poi.name}</h3>
                </div>
                <div class="custom-path-card-buttons">
                    <button type="button" class="poi-delete-btn" aria-label="Elimina tappa">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                    <button type="button" class="poi-info-btn" aria-label="Vedi dettagli punto di interesse">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .custom-path-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-m);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                button {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    box-sizing: border-box;
                    border-radius: var( --border-radius-s);
                }

                button:hover {
                    opacity: .8;
                }

                .custom-path-card-buttons {
                    display: flex;
                    gap: .5rem;
                }

                .poi-info-btn {
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                }

                .poi-delete-btn {
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border: 1px solid transparent;
                }

                .poi-delete-btn:hover {
                    background-color: var(--surface-container-high);
                    color: var(--on-surface-variant);
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){this.setupPoiInfoBtn(),this.setupPoiDeleteBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector(".poi-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}setupPoiDeleteBtn(){const t=this.shadowRoot.querySelector(".poi-delete-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-deleted",{detail:{deletedPoi:this.poi}}))})}}customElements.define("app-custom-path-card",nt);class at extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_customPath",{...g.instance.customPath});this.shadowRoot=this.attachShadow({mode:"closed"})}get customPath(){return this._customPath}set customPath(t){this._customPath=t,this.update(),this.setupCardsBeahviour()}connectedCallback(){this.render(),this.update(),this.setup(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Percorso personalizzato</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <section class="custom-path-list" role="feed"></section>
                <div class="custom-path-tools-wrapper">
                    <nav class="custom-path-tools">
                        <button type="button" id="reorder-pois-btn" class="tool-btn" title="Ottimizza ordine punti di interesse">
                            <span class="material-symbols-outlined tool-icon">sort</span>
                        </button>
                        <button type="button" id="save-custom-path-btn" class="tool-btn" title="Salva percorso personalizzato">
                            <span class="material-symbols-outlined tool-icon">bookmark</span>
                        </button>
                    </nav>
                </div>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .custom-path-page {
                    position: relative;
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .custom-path-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;                   
                }

                .empty-msg {
                    text-align: center;
                }

                .custom-path-tools-wrapper {
                    width: 100%;
                    max-width: 576px;
                }

                .custom-path-tools {
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    min-height: 48px;
                    max-width: inherit;
                    display: flex;
                    justify-content: space-between;
                    gap: 1px;
                }
                
                button {
                    cursor: pointer;
                }

                .tool-btn {
                    cursor: pointer;
                    font-family: Inter, sans-serif;
                    width: 100%;
                    border: none;
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    font-size: .8rem;
                    font-weight: 500;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: .5rem;
                }

                .tool-btn:hover {
                    color: var(--on-surface-variant);
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){this.setupSaveCustomPathBtn(),this.setupReorderPoisBtn()}update(){const t=this.shadowRoot.querySelector(".custom-path-list");t&&(t.innerHTML="",this.customPath.pois.length===0&&t.append(this.renderEmptyMsg()),this.customPath.pois.forEach((s,n)=>{let a=document.createElement("app-custom-path-card");a.poi=s,a.position=n+1,t.append(a)}))}setupSaveCustomPathBtn(){const t=this.shadowRoot.querySelector("#save-custom-path-btn");t&&t.addEventListener("click",()=>{g.instance.saveCustomPath(),m.instance.updateSnackbar(x.Info,"Percorso personalizzato salvato")})}setupReorderPoisBtn(){const t=this.shadowRoot.querySelector("#reorder-pois-btn");t&&t.addEventListener("click",async()=>{let s=await j.instance.getUserPosition();if(!s)return;const n=J.instance.nearestInsertion(this.customPath.pois,[s.coords.latitude,s.coords.longitude]);this.customPath={...this.customPath,pois:n},g.instance.customPath=this.customPath,m.instance.updateSnackbar(x.Info,`Tappe riordinate secondo il percorso ottimale. Ordine attuale: ${this.customPath.pois.map(a=>a.name).join(", ")}.`)})}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-custom-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"}),s.addEventListener("poi-deleted",n=>{let a=this.customPath.pois.filter(i=>i.uuid!==n.detail.deletedPoi.uuid);this.customPath={...this.customPath,pois:a},g.instance.customPath=this.customPath,m.instance.updateSnackbar(x.Info,`Tappa ${n.detail.deletedPoi.name} rimossa`)})})}renderEmptyMsg(){const t=document.createElement("p");return t.classList.add("empty-msg"),t.innerHTML="Nessuna tappa attualmente presente nel percorso personalizzato",t}}customElements.define("page-custom-path",at);class rt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_path",M.createEmpty());r(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(t){this._path=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <article class="suggested-path-card" aria-labelledby="suggested-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="poi-card-info">
                    <h3 class="suggested-path-card-title">${this.path.name}</h3>
                    <p class="suggested-path-card-length" aria-label="Tappe in questo percorso: ${this.path.pois.length}">${this.path.pois.length} tappe</p>
                </div>
                <button type="button" class="path-info-btn" aria-label="Apri percorso suggerito: ${this.path.name}">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .suggested-path-card-title {
                    font-size: 1rem;
                    margin: 0 0 8px 0;
                }

                .suggested-path-card-lenght {
                    font-size: .9rem;
                    color: var(--on-surface-variant);
                }

                .path-info-btn {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-m);
                    box-sizing: border-box;
                }

                .path-info-btn:hover {
                    opacity: 0.75;
                }

                .suggested-path-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-m);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .suggested-path-card-length {
                    color: var(--on-surface-variant);
                }

                button {
                    cursor: pointer;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector(".path-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("suggested-path-selected",{detail:{selectedSuggestedPath:this.path}}))})}}customElements.define("app-suggested-path-card",rt);class ot extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get paths(){return this._paths}set paths(t){this._paths=t,this.update(),this.setupCardsBehaviour()}async connectedCallback(){await g.instance.getCsvPaths(1),this.render(),this.paths=g.instance.getSuggestedPaths(q.instance.activeLayers)}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-paths-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1" autofocus>Percorsi suggeriti</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                    <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <p class="page-desc">Elenco di percorsi suggeriti in base ai layer selezionati.</p>
                <section class="suggested-paths-list" role="feed" aria-label="Percorsi suggeriti"></section>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .suggested-paths-page {
                    position: relative;
                    padding: 0 4%;
                }
                
                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                .page-desc {
                    text-align: center;
                    color: var(--on-surface-variant);
                }

                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .suggested-paths-list {
                    margin: 1.5rem 0;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}update(){const t=this.shadowRoot.querySelector(".suggested-paths-list");t&&(t.innerHTML="",this.paths.length===0&&t.append(this.renderEmptyMsg()),this.paths.forEach((s,n)=>{let a=document.createElement("app-suggested-path-card");a.path=s,a.position=n,t.append(a)}))}setupCardsBehaviour(){this.shadowRoot.querySelectorAll("app-suggested-path-card").forEach(s=>{s.addEventListener("suggested-path-selected",n=>{g.instance.selectedSuggestedPath=n.detail.selectedSuggestedPath,window.location.hash="/selected-suggested-path"})})}renderEmptyMsg(){const t=document.createElement("p");return t.innerHTML="Nessun percorso suggerito per il layer attivato al momento",t}}customElements.define("page-suggested-paths",ot);class it extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new y);r(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <article class="selected-suggested-path-card" aria-labelledby="selected-suggested-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="selected-suggested-path-card-info">
                    <h3 class="selected-suggested-path-card-title" id="selected-suggested-path-card-title">${this.poi.name}</h3>
                </div>
                <div class="selected-suggested-path-card-buttons">
                    <button type="button" class="poi-info-btn" aria-label="Vedi dettagli punto di interesse">
                        <span class="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </article>

            <style>
                h3,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .selected-suggested-path-card {
                    background-color: var(--surface-container);
                    color: var(--on-surface);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-m);
                    padding: 24px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                button {
                    font-family: 'Inter', Arial, Helvetica, sans-serif;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 32px;
                    min-width: 32px;
                    box-sizing: border-box;
                    border-radius: var( --border-radius-s);
                }

                button:hover {
                    opacity: .8;
                }

                .selected-suggested-path-card-buttons {
                    display: flex;
                    gap: .5rem;
                }

                .poi-info-btn {
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector(".poi-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-selected-suggested-path-card",it);class ct extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_path",new M("",[]));this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(t){this._path=t,this.update(),this.setupCardsBeahviour()}connectedCallback(){g.instance.getSelectedSuggestedPath(),this.path=g.instance.selectedSuggestedPath,this.render(),this.update(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">${this.path.name}</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <section class="suggested-path-list" role="feed"></section>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .suggested-path-page {
                    position: relative;
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .suggested-path-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;                   
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}update(){const t=this.shadowRoot.querySelector(".suggested-path-list");t&&(t.innerHTML="",this.path.pois.forEach((s,n)=>{let a=document.createElement("app-selected-suggested-path-card");a.poi=s,a.position=n+1,t.append(a)}))}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-selected-suggested-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}}customElements.define("page-selected-suggested-path",ct);class lt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new y);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){_.instance.getSelectedPoi(),this.poi=_.instance.selectedPoi,this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="poi-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Dettaglio punto di interesse</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <h2 class="poi-name">${this.poi.name}</h2>
                <p class="poi-category">${this.poi.name}</p>
                <div class="poi-page-buttons">
                    <button type="button" id="directions-btn" aria-label="Vedi indicazioni stradali">Indicazioni</button>
                    <button type="button" id="add-to-custom-path-btn" aria-label="Aggiungi tappa a percorso personalizzato">Aggiungi</button>
                </div>
                <div class="poi-page-infos"></div>
            </div>

            <style>
                h1,
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .poi-page {
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }

                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .poi-name {
                    margin: 0 0 8px 0;
                }

                .poi-category {
                    color: var(--on-surface-variant);
                }

                .poi-page-buttons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                    margin: 1.25rem 0 2rem 0;
                }

                #directions-btn {
                    background-color: var(--primary);
                    color: var(--on-primary);
                    border: 1px solid transparent;
                    border-radius: var(--border-radius-circle);
                }

                #add-to-custom-path-btn {
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-circle);
                }

                button {
                    cursor: pointer;
                    font-family: Inter, sans-serif;
                    font-size: .8rem;
                    font-weight: 500;
                    padding: 8px 0;
                    width: 100%;
                }

                button:hover {
                    opacity: .8;
                }

                .property {
                    margin: 0px 0px 1rem;
                }

                .property-label {
                    display: block;
                    color: var(--on-surface-variant);
                    margin: 0px 0px 4px;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus(),this.renderInfo()}renderInfo(){const t=this.shadowRoot.querySelector(".poi-page-infos");t&&this.poi.props.forEach(s=>{const n=this.renderTopic(s);t.appendChild(n)})}renderTopic(t){const s=document.createElement("div");s.classList.add("property");const n=document.createElement("label");n.classList.add("property-label"),n.innerHTML=t.displayName;const a=document.createElement("p");return a.classList.add("property-value"),t.value!==""?a.innerHTML=t.value:a.innerHTML="-",s.appendChild(n),s.appendChild(a),s}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const t=this.shadowRoot.querySelector("#directions-btn");t&&t.addEventListener("click",()=>{const s=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;window.open(s,"_blank")})}setupAddToCustomPathBtn(){const t=this.shadowRoot.querySelector("#add-to-custom-path-btn");t&&t.addEventListener("click",()=>{m.instance.updateSnackbar(x.Info,"Aggiunto al percorso personalizzato"),g.instance.addPoiToCustomPath(this.poi)})}}customElements.define("page-poi",lt);class Y{constructor(){r(this,"fontSize",16);r(this,"letterSpace",0);r(this,"lineHeight",1.15);r(this,"contrast","light-high")}}var R=(o=>(o.Light="light",o.Dark="dark",o.LightHigh="light-high",o.DarkHigh="dark-high",o))(R||{});const S=class S{constructor(){r(this,"_settings",new Y);if(S._instance)return S._instance;S._instance=this}get settings(){return this._settings}set settings(e){this._settings=e,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return S._instance||(S._instance=new S),S._instance}getLocalStorageSettings(){const e=localStorage.getItem("settings");if(!e)return;const t=JSON.parse(e),s=this.parseLocalStorageSettings(t);this.settings={...s}}setLocalStorageSettings(){localStorage.setItem("settings",JSON.stringify(this.settings))}setLightContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}setDarkContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightHighContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-dim","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--outline","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--outline-variant","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(255, 255, 255)")}setDarkHighContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--primary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--outline","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--outline-variant","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--inverse-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 0, 0)")}setFontSize(e){document.documentElement.style.setProperty("font-size",e.toString()+"px")}setContrast(){switch(this.settings.contrast){case R.Light:this.setLightContrast();break;case R.Dark:this.setDarkContrast();break;case R.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(e){document.documentElement.style.setProperty("letter-spacing",e.toString()+"rem")}setLineHeight(e){document.documentElement.style.setProperty("line-height",e.toString())}parseLocalStorageSettings(e){let t=new Y;return t.contrast=e.contrast,t.fontSize=e.fontSize,t.lineHeight=e.lineHeight,t.letterSpace=e.letterSpace,t}};r(S,"_instance");let p=S;class dt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_contrast",R.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(t){this._contrast=t,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-contrast">
                <h2 class="settings-title">Contrasto</h2>
                <div class="contrast-option-list">
                    <div class="contrast-option">
                        <input type="radio" id="light-contrast" name="contrast" value="light">
                        <label for="light-contrast" aria-label="Tema light">Light</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="dark-contrast" name="contrast" value="dark">
                        <label for="dark-contrast" aria-label="Tema dark">Dark</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="light-high-contrast" name="contrast" value="light-high">
                        <label for="light-high-contrast" aria-label="Tema light ad alto contrasto">Light alto contrasto</label>
                    </div>
                    <div class="contrast-option">
                        <input type="radio" id="dark-high-contrast" name="contrast" value="dark-high">
                        <label for="dark-high-contrast" aria-label="Tema dark ad alto contrasto">Dark alto contrasto</label>
                    </div>
                </div>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1.7rem;
                    margin: 0 0 16px 0;
                }

                .contrast-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .contrast-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .contrast-option label {
                    cursor: inherit;
                    height: 100%;
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }

                input[type="radio"]:checked + label {
                    color: var(--inverse-on-surface);
                    background-color: var(--inverse-surface);
                }
            </style>
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#light-contrast"),s=this.shadowRoot.querySelector("#dark-contrast"),n=this.shadowRoot.querySelector("#light-high-contrast"),a=this.shadowRoot.querySelector("#dark-high-contrast");!t||!s||!n||!a||(t.addEventListener("change",()=>this.contrast=R.Light),s.addEventListener("change",()=>this.contrast=R.Dark),n.addEventListener("change",()=>this.contrast=R.LightHigh),a.addEventListener("change",()=>this.contrast=R.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(s=>{s.value===this.contrast&&(s.checked=!0)})}}customElements.define("app-settings-contrast",dt);class pt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-font-size">
                <h2 class="settings-title">Dimensione testo</h2>
                <div class="font-size-option-list">
                    <div class="font-size-option">
                        <input type="radio" id="font-size-s" name="font-size" value="14">
                        <label for="font-size-s" aria-label="Dimensione font: S">S</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-m" name="font-size" value="24">
                        <label for="font-size-m" aria-label="Dimensione font: M">M</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-l" name="font-size" value="32">
                        <label for="font-size-l" aria-label="Dimensione font: L">L</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-xl" name="font-size" value="40">
                        <label for="font-size-xl" aria-label="Dimensione font: XL">XL</label>
                    </div>
                </div>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1.7rem;
                    margin: 0 0 16px 0;
                }

                .font-size-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .font-size-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .font-size-option label {
                    cursor: inherit;
                    height: 100%;
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
                
                input[type="radio"]:checked + label {
                    color: var(--inverse-on-surface);
                    background-color: var(--inverse-surface);
                }
            </style>
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#font-size-s"),s=this.shadowRoot.querySelector("#font-size-m"),n=this.shadowRoot.querySelector("#font-size-l"),a=this.shadowRoot.querySelector("#font-size-xl");!t||!s||!n||!a||(t.addEventListener("change",()=>this.fontSize=parseInt(t.value)),s.addEventListener("change",()=>this.fontSize=parseInt(s.value)),n.addEventListener("change",()=>this.fontSize=parseInt(n.value)),a.addEventListener("change",()=>this.fontSize=parseInt(a.value)))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="font-size"]')).forEach(s=>{s.value===this.fontSize.toString()&&(s.checked=!0)})}}customElements.define("app-settings-font-size",pt);class ut extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(t){this._letterSpace=t,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-letter-space">
                <h2 class="settings-title">Spaziatura testo</h2>
                <div class="letter-space-option-list">
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-s" name="letter-spacing" value="0">
                        <label for="letter-space-s" aria-label="Spaziatura testo: S">S</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-m" name="letter-spacing" value="25">
                        <label for="letter-space-m" aria-label="Spaziatura testo: M">M</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-l" name="letter-spacing" value="50">
                        <label for="letter-space-l" aria-label="Spaziatura testo: L">L</label>
                    </div>
                    <div class="letter-space-option">
                        <input type="radio" id="letter-space-xl" name="letter-spacing" value="75">
                        <label for="letter-space-xl" aria-label="Spaziatura testo: XL">XL</label>
                    </div>
                </div>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1.7rem;
                    margin: 0 0 16px 0;
                }

                .letter-space-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .letter-space-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .letter-space-option label {
                    cursor: inherit;
                    height: 100%;
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
                
                input[type="radio"]:checked + label {
                    color: var(--inverse-on-surface);
                    background-color: var(--inverse-surface);
                }
            </style>
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#letter-space-s"),s=this.shadowRoot.querySelector("#letter-space-m"),n=this.shadowRoot.querySelector("#letter-space-l"),a=this.shadowRoot.querySelector("#letter-space-xl");!t||!s||!n||!a||(t.addEventListener("change",()=>this.letterSpace=parseInt(t.value)/100),s.addEventListener("change",()=>this.letterSpace=parseInt(s.value)/100),n.addEventListener("change",()=>this.letterSpace=parseInt(n.value)/100),a.addEventListener("change",()=>this.letterSpace=parseInt(a.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="letter-spacing"]')).forEach(s=>{s.value===(this.letterSpace*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-letter-space",ut);class ht extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-line-height">
                <h2 class="settings-title">Altezza testo</h2>
                <div class="line-height-option-list">
                    <div class="line-height-option">
                        <input type="radio" id="line-height-s" name="line-height" value="115">
                        <label for="line-height-s" aria-label="Altezza testo: S">S</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-m" name="line-height" value="150">
                        <label for="line-height-m" aria-label="Altezza testo: M">M</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-l" name="line-height" value="175">
                        <label for="line-height-l" aria-label="Altezza testo: L">L</label>
                    </div>
                    <div class="line-height-option">
                        <input type="radio" id="line-height-xl" name="line-height" value="200">
                        <label for="line-height-xl" aria-label="Altezza testo: XL">XL</label>
                    </div>
                </div>
            </div>

            <style>
                h2,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-title {
                    text-align: center;
                    font-size: 1.7rem;
                    margin: 0 0 16px 0;
                }

                .line-height-option-list {
                    display: flex;
                    flex-wrap: wrap;
                }

                .line-height-option {
                    cursor: pointer;
                    width: calc(50% - 16px);
                    min-height: 80px;
                    margin: 8px;
                    position: relative;
                }

                .line-height-option label {
                    cursor: inherit;
                    height: 100%;
                    padding: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                    border: 1px solid transparent;
                    border-radius: var( --border-radius-s);
                    box-sizing: border-box;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }
                
                input[type="radio"]:checked + label {
                    color: var(--inverse-on-surface);
                    background-color: var(--inverse-surface);
                }
            </style>
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#line-height-s"),s=this.shadowRoot.querySelector("#line-height-m"),n=this.shadowRoot.querySelector("#line-height-l"),a=this.shadowRoot.querySelector("#line-height-xl");!t||!s||!n||!a||(t.addEventListener("change",()=>this.lineHeight=parseInt(t.value)/100),s.addEventListener("change",()=>this.lineHeight=parseInt(s.value)/100),n.addEventListener("change",()=>this.lineHeight=parseInt(n.value)/100),a.addEventListener("change",()=>this.lineHeight=parseInt(a.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="line-height"]')).forEach(s=>{s.value===Math.round(this.lineHeight*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-line-height",ht);class gt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_settings",{...p.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Impostazioni</h1>
                    <button is="app-menu-btn" aria-label="apri menu">
                        <span class="material-symbols-outlined">menu</span>
                    </button>
                </div>
                <app-settings-contrast class="settings-option"></app-settings-contrast>
                <app-settings-font-size class="settings-option"></app-settings-font-size>
                <app-settings-letter-space class="settings-option"></app-settings-letter-space>
                <app-settings-line-height class="settings-option"></app-settings-line-height>
            </div>

            <style>
                h1,
                p {
                    font-weight: 400;
                    margin: 0;
                }

                .settings-page {
                    padding: 0 4%;
                }

                .page-header {
                    position: relative;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0 24px 0;
                }
                
                button[is="app-menu-btn"] {
                    cursor: pointer;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    color: var(--on-surface);
                    background-color: transparent;
                    border: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 0;
                    height: 40px;
                    width: 40px;
                }

                .page-title {
                    text-align: center;
                    font-size: 1rem;
                }

                .page-desc {
                    text-align: center;
                    margin: 0 0 24px 0;
                    color: var(--on-surface-variant);
                }

                .settings-option {
                    display: block;
                    margin: 0 0 40px 0;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.2rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){const t=this.shadowRoot.querySelector("app-settings-contrast"),s=this.shadowRoot.querySelector("app-settings-font-size"),n=this.shadowRoot.querySelector("app-settings-letter-space"),a=this.shadowRoot.querySelector("app-settings-line-height");t&&s&&n&&a&&(t.contrast=this.settings.contrast,s.fontSize=this.settings.fontSize,a.lineHeight=this.settings.lineHeight,n.letterSpace=this.settings.letterSpace,t.addEventListener("contrast-updated",i=>{this.settings.contrast=i.detail.contrast,p.instance.settings.contrast=this.settings.contrast,p.instance.setContrast(),p.instance.settings=this.settings}),s.addEventListener("font-size-updated",i=>{this.settings.fontSize=i.detail.fontSize,p.instance.settings.fontSize=this.settings.fontSize,p.instance.setFontSize(this.settings.fontSize),p.instance.settings=this.settings}),n.addEventListener("letter-space-updated",i=>{this.settings.letterSpace=i.detail.letterSpace,p.instance.settings.letterSpace=this.settings.letterSpace,p.instance.setLetterSpace(this.settings.letterSpace),p.instance.settings=this.settings}),a.addEventListener("line-height-updated",i=>{this.settings.lineHeight=i.detail.lineHeight,p.instance.settings.lineHeight=this.settings.lineHeight,p.instance.setLineHeight(this.settings.lineHeight),p.instance.settings=this.settings}))}}customElements.define("page-settings",gt);class mt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_snackbar",A.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get snackbar(){return this._snackbar}set snackbar(t){this._snackbar=t,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>

            <style>
                .snackbar {
                    position: sticky;
                    top: 0;
                    left: 0;
                    width: 100%;
                    text-align: center;
                    box-sizing: border-box;
                    background-color: var(--primary);
                    color: var(--on-primary);
                }
                
                .empty-snackbar {
                    height: 0;
                }
                
                .info-snackbar {
                    padding: 8px 4%;                    
                }
                
                .error-snackbar {
                    padding: 8px 4%;                   

                }
            </style>
            `}update(){if(this.snackbar.message.length===0){const s=this.shadowRoot.querySelector(".snackbar");if(!s)return;s.classList.add("empty-snackbar");return}const t=this.shadowRoot.querySelector(".snackbar-message");if(t)switch(t.innerHTML=this.snackbar.message,this.snackbar.type){case x.Error:this.renderErrorSnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&(t.classList.remove("empty-snackbar"),t.classList.add("info-snackbar"))}renderErrorSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&(t.classList.remove("empty-snackbar"),t.classList.add("error-snackbar"))}resetSnackbar(){const t=this.shadowRoot.querySelector(".snackbar-message"),s=this.shadowRoot.querySelector(".snackbar");t&&s&&(t.innerHTML="",s.classList.remove("info-snackbar"),s.classList.remove("error-snackbar"),s.classList.add("empty-snackbar"))}}customElements.define("app-snackbar",mt);class yt extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{const e=document.body.querySelector('dialog[is="app-menu"]');e&&e.showModal()})}}customElements.define("app-menu-btn",yt,{extends:"button"});p.instance.getLocalStorageSettings();g.instance.getSavedCustomPath();q.instance.getSavedLayers();const bt=document.querySelector("app-router"),ft=new H("categories",L.Default,()=>"<page-categories />"),vt=new H("around-you",L.Page,()=>"<page-around-you />"),Pt=new H("settings",L.Page,()=>"<page-settings />"),wt=new H("poi",L.Page,()=>"<page-poi />"),Et=new H("custom-path",L.Page,()=>"<page-custom-path />"),St=new H("suggested-paths",L.Page,()=>"<page-suggested-paths />"),xt=new H("selected-suggested-path",L.Page,()=>"<page-selected-suggested-path />"),Lt=[ft,vt,Pt,wt,Et,St,xt];bt.addRoutes(Lt);
