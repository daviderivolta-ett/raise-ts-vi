var J=Object.defineProperty;var j=(a,e,t)=>e in a?J(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var r=(a,e,t)=>(j(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();var f=(a=>(a.Default="default",a.Page="page",a.NotFound="not-found",a))(f||{});class C{constructor(e,t,n){r(this,"url");r(this,"type");r(this,"routing");this.url=e,this.type=t,this.routing=n}}class U extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(t){this.routes=[...t],this.checkRoute()}checkRoute(){const t=window.location.hash.slice(2);this.changeRoute(t)}changeRoute(t){if(t){const n=this.routes.findIndex(s=>s.url===t);this.shadowRoot.innerHTML=this.routes[n]?this.routes[n].routing():this.sendNotFound()}else{const n=this.routes.filter(s=>s.type===f.Default);n?window.location.hash="#/"+n[0].url:this.sendNotFound()}}sendNotFound(){const t=this.routes.filter(n=>n.type===f.NotFound);return t.length===0||(window.location.hash="#/"+t[0].url,this.changeRoute(t[0].url)),"404: Not found"}}customElements.define("app-router",U);class D extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="loader">
                <div id="loader-spin"></div>
                <p class="loader-text">Caricamento...</p>
            </div>

            <style>
                .loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
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
            `}}customElements.define("app-loader",D);class H{constructor(e,t){r(this,"color");r(this,"opacity");this.color=e,this.opacity=t}static createEmpty(){return new H("#008000",1)}}class x{constructor(e,t,n){r(this,"propertyName");r(this,"displayName");r(this,"type");this.propertyName=e,this.displayName=t,this.type=n}static createEmpty(){return new x("","","string")}}var w=(a=>(a.String="string",a.Image="image",a.Number="number",a))(w||{});class R{constructor(e,t,n,s,o,i){r(this,"name");r(this,"layer");r(this,"url");r(this,"style");r(this,"tags");r(this,"relevantProperties");this.name=e,this.layer=t,this.url=n,this.style=s,this.tags=o,this.relevantProperties=i}static createEmpty(){return new R("","","",H.createEmpty(),[],[x.createEmpty()])}}const d=class d{constructor(){r(this,"CATEGORIES_URL","./json/categories.json");r(this,"_data",{categories:[]});if(d._instance)return d._instance;d._instance=this}static get instance(){return d._instance||(d._instance=new d),d._instance}get data(){return this._data}set data(e){this._data=e}async getData(){if(this.data.categories.length!==0)return this._data;{let e=await this.fetchAppData(this.CATEGORIES_URL);return e=this.parseData(e),this.data=e,e}}async fetchAppData(e){try{const t=await fetch(e).then(s=>s.json()),n=await Promise.all(t.categories.map(async s=>{const o=await Promise.all(s.groups.map(async i=>{if(typeof i=="string")try{const c=await fetch(i);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return i}));return s.groups=o,s}));return{...t,categories:n}}catch(t){throw console.error("Errore durante il recupero dei dati JSON.",t),t}}parseData(e){return{categories:e.categories.map(n=>({name:n.name,groups:n.groups.map(s=>this.parseGroup(s))}))}}parseGroup(e){return Array.isArray(e)?e:{name:e.name,layers:e.layers.map(t=>this.parseLayer(t))}}parseLayer(e){return new R(e.name,e.layer,e.layer_url_wfs,new H(e.style.color,parseFloat(e.style.opacity)),e.tags,e.relevant_properties.map(t=>{let n=x.createEmpty();switch(n.displayName=t.display_name,n.propertyName=t.property_name,t.type){case"image":n.type=w.Image;break;case"number":n.type=w.Number;break;default:n.type=w.String;break}return n}))}getAllTags(e){let t=[];return e.categories.map(s=>{s.groups.map(o=>{typeof o!="string"&&o.layers.map(i=>{i.tags.map(c=>{t.push(c)})})})}),[...new Set(t)]}filterLayersByTags(e){let t=[];return e.forEach(s=>{this.filterLayersByTag(s).forEach(i=>t.push(i))}),[...new Set(t)]}filterLayersByTag(e){let t=[];return t=this.data.categories.flatMap(n=>n.groups.flatMap(s=>typeof s=="string"?[R.createEmpty()]:s.layers.filter(o=>o.tags.some(i=>i.includes(e))))),t}};r(d,"_instance");let S=d;const p=class p{constructor(){r(this,"_activeLayers",[]);if(p._instance)return p._instance;p._instance=this}static get instance(){return p._instance||(p._instance=new p),p._instance}get activeLayers(){return this._activeLayers}set activeLayers(e){this._activeLayers=e,localStorage.setItem("layers",JSON.stringify(this.activeLayers))}getSavedLayers(){const e=localStorage.getItem("layers");if(!e)return;const t=JSON.parse(e);let n=[];n=t.map(s=>this.parseLayer(s)),this._activeLayers=n}parseLayer(e){return new R(e.name,e.layer,e.url=e.url,new H(e.style.color,e.style.opacity),e.tags,e.relevantProperties.map(t=>{let n=x.createEmpty();switch(n.displayName=t.displayName,n.propertyName=t.propertyName,t.type){case"image":n.type=w.Image;break;case"number":n.type=w.Number;break;default:n.type=w.String;break}return n}))}};r(p,"_instance");let k=p;class B extends HTMLButtonElement{constructor(){super();r(this,"_tag","")}get tag(){return this._tag}set tag(t){this._tag=t}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:this.tag}}))})}}customElements.define("app-tag-chip",B,{extends:"button"});class G extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_tags",[]);r(this,"_currentPageTags",[]);r(this,"_currentPage",0);r(this,"_tagsPerPage",8);r(this,"handleCheckbox",t=>{const n=t.target;this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:n.tag}}))});this.shadowRoot=this.attachShadow({mode:"closed"})}get tags(){return this._tags}set tags(t){this._tags=t,this.connectedCallback()}get currentPageTags(){return this._currentPageTags}set currentPageTags(t){this._currentPageTags=t}get currentPage(){return this._currentPage}set currentPage(t){this._currentPage=t}get tagsPerPage(){return this._tagsPerPage}set tagsPerPage(t){this._tagsPerPage=t}connectedCallback(){this.render(),this.tags.length!==0&&(this.paginateTags(),this.setup())}render(){this.shadowRoot.innerHTML=`
            <div class="pagination">
                <p class="current-page">Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}</p>
                <div class="">
                    <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                </div>

                <button type="button" class="prev-btn">Precedente</button>
                <button type="button" class="next-btn">Successiva</button>

                <div class="tags"></div>
            </div>

            <style>
                .hidden {
                    display: none;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector(".prev-btn"),n=this.shadowRoot.querySelector(".next-btn");t&&n&&(t.addEventListener("click",()=>this.prevPage()),n.addEventListener("click",()=>this.nextPage()))}update(){const t=this.shadowRoot.querySelector(".current-page");if(!t)return;t.innerHTML=`Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}`;const n=this.shadowRoot.querySelector(".tags-list");if(!n)return;n.innerHTML=this.currentPageTags.join(", ");const s=this.shadowRoot.querySelector(".prev-btn"),o=this.shadowRoot.querySelector(".next-btn");if(!s||!o)return;this.currentPage===0?s.classList.add("hidden"):s.classList.remove("hidden"),this.currentPage===this.getPagesNumber()?o.classList.add("hidden"):o.classList.remove("hidden"),Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]')).forEach(c=>c.addEventListener("tag-selected",this.handleCheckbox))}paginateTags(){const t=this.currentPage*this.tagsPerPage;let n=t+this.tagsPerPage;n>this.tags.length&&(n=this.tags.length);const s=this.shadowRoot.querySelector(".tags");if(s){s.innerHTML="",this.currentPageTags=[];for(let o=t;o<n;o++){let i=this.tags[o];this.currentPageTags.push(i);let c=this.createChip(i);s.append(c)}this.update()}}createChip(t){let n=new B;return n.setAttribute("is","app-tag-chip"),n.classList.add("chip"),n.innerHTML=t.charAt(0).toUpperCase()+t.slice(1),n.tag=t,n}getPagesNumber(){return Math.floor(this.tags.length/this.tagsPerPage)}prevPage(){this.currentPage>0&&(this.currentPage--,this.paginateTags())}nextPage(){this.currentPage<this.getPagesNumber()&&(this.currentPage++,this.paginateTags())}}customElements.define("app-tags-wall",G);class V extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await S.instance.getData(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <h1>Esplora categorie</h1>
            <app-tags-wall />
            `}setup(){const t=this.shadowRoot.querySelector("app-tags-wall");if(!t)return;let n=S.instance.getAllTags(S.instance.data);t.tags=n,t.addEventListener("tag-selected",s=>{k.instance.activeLayers=S.instance.filterLayersByTag(s.detail.tag),window.location.hash="/around-you"})}}customElements.define("page-categories",V);const h=class h{constructor(){r(this,"_position",null);if(h._instance)return h._instance;h._instance=this}static get instance(){return h._instance||(h._instance=new h),h._instance}get position(){return this._position}set position(e){this._position=e}async getUserPosition(){try{return await new Promise((t,n)=>{navigator.geolocation.getCurrentPosition(s=>{t(s)},s=>{n(s)})})}catch(e){throw e}}};r(h,"_instance");let z=h;var l=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(l||{});class N{constructor(e,t){r(this,"type");r(this,"coordinates");this.type=e,this.coordinates=t}static createEmpty(){return new N("Point",[])}}class F{constructor(e,t,n,s,o){r(this,"type");r(this,"geometry");r(this,"properties");r(this,"id");r(this,"geometry_name");this.type=e,this.geometry=t,this.properties=n,this.id=s,this.geometry_name=o}static createEmpty(){return new F("",N.createEmpty(),{prop:""},"","")}}class v{constructor(){r(this,"uuid","");r(this,"name","");r(this,"type","Point");r(this,"coordinates",[]);r(this,"layerName","");r(this,"props",[]);r(this,"distance")}static fromFeature(e){const t=new v;switch(t.uuid=e.properties.uuid,t.name=e.properties.name,e.geometry.type){case l.LineString:t.type="LineString";break;case l.Polygon:t.type="Polygon";break;case l.MultiPoint:t.type="MultiPoint";break;case l.MultiLineString:t.type="MultiLineString";break;case l.MultiPolygon:t.type="MultiPolygon";break;default:t.type="Point";break}t.coordinates=e.geometry.coordinates,t.layerName=e.properties.layerName;for(const n in e.properties){if(typeof e.properties[n]!="object")continue;let s=new $;switch(s.displayName=e.properties[n].displayName,s.value=e.properties[n].value,e.properties[n].type){case"number":s.type="number";break;case"image":s.type="image";break;default:s.type="string";break}t.props.push(s)}return t}}var P=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(P||{});class ${constructor(){r(this,"displayName","");r(this,"type","string");r(this,"value","")}}var _=(a=>(a.String="string",a.Image="image",a.Number="number",a))(_||{});const u=class u{constructor(){if(u._instance)return u._instance;u._instance=this}static get instance(){return u._instance||(u._instance=new u),u._instance}async createGeoJson(e){const t=`${e.url}?service=WFS&typeName=${e.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let s=await(await fetch(t)).json(),o=this.substituteRelevantProperties(s,e),i=this.createFeatureAdditionalProperties(o,e),c={...i};return c.features=i.features.map(L=>this.parseFeature(L)),c}substituteRelevantProperties(e,t){return e.features.forEach(n=>{const s={};for(const o in n.properties){const i=t.relevantProperties.find(c=>c.propertyName===o);if(i){const c={displayName:i.displayName,type:i.type,value:n.properties[o]};s[o]=c}}n.properties=s}),e}createFeatureAdditionalProperties(e,t){return e.features=e.features.map((n,s)=>(n.properties.name=t.name+" "+s,n.properties.layerName=t.layer,n.properties.uuid=n.id,n)),e}parseFeature(e){let t=F.createEmpty();return t.type=e.type,t.properties=e.properties,t.geometry_name=e.geometry_name,t.id=e.id,e.geometry&&(t.geometry=this.parseFeatureGeometry(e.geometry)),t}parseFeatureGeometry(e){let t=N.createEmpty();return t.type=this.parseFeatureGeometryType(e.type),t.coordinates=e.coordinates,t}parseFeatureGeometryType(e){let t=l.Point;switch(e){case"LineString":t=l.LineString;break;case"Polygon":t=l.Polygon;break;case"MultiPoint":t=l.MultiPoint;break;case"MultiLineString":t=l.MultiLineString;break;case"MultiPolygon":t=l.MultiPolygon;break}return t}async getPoisFromLayers(e){let t=[];const n=e.map(async o=>u.instance.createGeoJson(o));return(await Promise.all(n)).forEach(o=>{o.features.forEach(i=>t.push(v.fromFeature(i)))}),t.filter(o=>!u.instance.isCoordinatesMultidimensional(o.coordinates))}isCoordinatesMultidimensional(e){if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))return!0;return!1}};r(u,"_instance");let T=u;class W{constructor(){r(this,"R",6371e3)}haversineDistance(e,t,n,s){const o=e*Math.PI/180,i=n*Math.PI/180,L=(s-t)*Math.PI/180;return Math.acos(Math.sin(o)*Math.sin(i)+Math.cos(o)*Math.cos(i)*Math.cos(L))*this.R}}const m=class m{constructor(){r(this,"_selectedPoi",new v);if(m._instance)return m._instance;m._instance=this}static get instance(){return m._instance||(m._instance=new m),m._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(e){this._selectedPoi=e,localStorage.setItem("selected-poi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const e=localStorage.getItem("selected-poi");if(!e)return;const t=JSON.parse(e);this._selectedPoi=this.parsePoi(t)}parsePoi(e){let t=new v;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=P.LineString;break;case l.Polygon:e.type=P.Polygon;break;case l.MultiPoint:e.type=P.MultiPoint;break;case l.MultiLineString:e.type=P.MultiLineString;break;case l.MultiPolygon:e.type=P.MultiPolygon;break;default:e.type=P.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const n in e.props){if(typeof e.props[n]!="object")continue;let s=new $;switch(s.displayName=e.props[n].displayName,s.value=e.props[n].value,e.props[n].type){case"number":s.type=_.Number;break;case"image":s.type=_.Image;break;default:s.type=_.String;break}t.props.push(s)}return e.distance&&(t.distance=e.distance),t}};r(m,"_instance");let M=m;class Y extends HTMLDialogElement{constructor(){super()}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <button autofocus aria-label="chiudi menu">Chiudi</button>
            <h2 id="menu-title">Menu</h2>
            <nav class="menu" >
                <ul>
                    <li><a href="/#/categories">Seleziona categoria</a></li>
                    <li><a href="/#/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/#/custom-path">Percorsi custom</a></li>
                </ul>
            </nav>
            `}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close())}}customElements.define("app-menu",Y,{extends:"dialog"});class K extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new v);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="poi-card">
                <h3>${this.poi.name}</h3>
                <div class="poi-card-info">
                    <p>${this.poi.name}</p>
                    <p>${Math.round(this.poi.distance)}m</p>
                </div>
            </div>

            <style>
                .poi-card {
                    cursor: pointer;
                    border: 1px solid var(--outline);
                }

                .poi-card-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            </style>

            `}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-feature-card",K);class Q extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_pois",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get pois(){return this._pois}set pois(t){this._pois=t}async connectedCallback(){this.createLoader(),k.instance.getSavedLayers();const t=await z.instance.getUserPosition();this.pois=await T.instance.getPoisFromLayers(k.instance.activeLayers),this.pois=this.orderPoisByDistance(t,this.pois),this.render(),this.setup(),this.removeLoader()}render(){this.shadowRoot.innerHTML=`
            <button id="app-menu-btn" aria-label="apri menu">Menu</button>
            <dialog is="app-menu" aria-labelledby="menu-title"></dialog>
            <h1>Punti di interesse</h1>
            <a href="/#/settings">Impostazioni</a>
            <div class="around-you-features"></div>
            `;const t=this.shadowRoot.querySelector(".around-you-features");t&&this.pois.forEach(n=>{const s=document.createElement("app-feature-card");s.poi=n,t.append(s)})}setup(){const t=this.shadowRoot.querySelector("button#app-menu-btn"),n=this.shadowRoot.querySelector('dialog[is="app-menu"]');if(!t||!n)return;t.addEventListener("click",()=>n.showModal()),this.shadowRoot.querySelectorAll("app-feature-card").forEach(o=>{o.addEventListener("poi-selected",i=>{M.instance.selectedPoi=i.detail.selectedPoi,window.location.href="/#/poi"})})}createLoader(){const t=new D;document.body.append(t)}removeLoader(){const t=document.body.querySelector("app-loader");t&&t.remove()}orderPoisByDistance(t,n){const s=new W;return n.forEach(o=>{if(!T.instance.isCoordinatesMultidimensional(o.coordinates)){const i=Array.isArray(o.coordinates)?o.coordinates[1]:o.coordinates,c=Array.isArray(o.coordinates)?o.coordinates[0]:o.coordinates,L=s.haversineDistance(i,c,t.coords.latitude,t.coords.longitude);o.distance=L}}),n.sort((o,i)=>o.distance&&i.distance?o.distance-i.distance:0),n}}customElements.define("page-around-you",Q);class A{constructor(){r(this,"fontSize",16);r(this,"letterSpace",0);r(this,"lineHeight",1.15);r(this,"contrast","light-high")}}var b=(a=>(a.Light="light",a.Dark="dark",a.LightHigh="light-high",a.DarkHigh="dark-high",a))(b||{});const g=class g{constructor(){r(this,"_settings",new A);if(g._instance)return g._instance;g._instance=this}get settings(){return this._settings}set settings(e){this._settings=e,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return g._instance||(g._instance=new g),g._instance}getLocalStorageSettings(){const e=localStorage.getItem("settings");if(!e)return;const t=JSON.parse(e),n=this.parseLocalStorageSettings(t);this.settings={...n}}setLocalStorageSettings(){localStorage.setItem("settings",JSON.stringify(this.settings))}setLightContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}setDarkContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightHighContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-dim","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--outline","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--outline-variant","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(255, 255, 255)")}setDarkHighContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--primary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--outline","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--outline-variant","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--inverse-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 0, 0)")}setFontSize(e){document.documentElement.style.setProperty("font-size",e.toString()+"px")}setContrast(){switch(this.settings.contrast){case b.Light:this.setLightContrast();break;case b.Dark:this.setDarkContrast();break;case b.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(e){document.documentElement.style.setProperty("letter-spacing",e.toString()+"rem")}setLineHeight(e){document.documentElement.style.setProperty("line-height",e.toString())}parseLocalStorageSettings(e){let t=new A;return t.contrast=e.contrast,t.fontSize=e.fontSize,t.lineHeight=e.lineHeight,t.letterSpace=e.letterSpace,t}};r(g,"_instance");let E=g;class X extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_contrast",b.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(t){this._contrast=t,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="component">
                <h2>Contrasto</h2>
                <div class="contrast-option">
                    <input type="radio" id="light-contrast" name="contrast" value="light">
                    <label for="light-contrast">Light</label>
                </div>
                <div class="contrast-option">
                    <input type="radio" id="dark-contrast" name="contrast" value="dark">
                    <label for="dark-contrast">Dark</label>
                </div>
                <div class="contrast-option">
                    <input type="radio" id="light-high-contrast" name="contrast" value="light-high">
                    <label for="light-high-contrast">Light alto contrasto</label>
                </div>
                <div class="contrast-option">
                    <input type="radio" id="dark-high-contrast" name="contrast" value="dark-high">
                    <label for="dark-high-contrast">Dark alto contrasto</label>
                </div>
            </div>

            <style>
                .contrast-option {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                input[type="radio"] {
                    opacity: 0;
                    width: 0;
                    height: 0;
                    position: absolute;
                }

                input[type="radio"]:checked + label {
                    background-color: crimson;
                }
            </style>
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#light-contrast"),n=this.shadowRoot.querySelector("#dark-contrast"),s=this.shadowRoot.querySelector("#light-high-contrast"),o=this.shadowRoot.querySelector("#dark-high-contrast");!t||!n||!s||!o||(t.addEventListener("change",()=>this.contrast=b.Light),n.addEventListener("change",()=>this.contrast=b.Dark),s.addEventListener("change",()=>this.contrast=b.LightHigh),o.addEventListener("change",()=>this.contrast=b.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(n=>{n.value===this.contrast&&(n.checked=!0)})}}customElements.define("app-settings-contrast",X);class Z extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="component">
                <h2>Dimensione testo</h2>
                <label for="text-size">Dimensione testo</label>
                <input type="range" id="text-size" name="text-size" min="16" max="72" list="font-size-values" value="${this.fontSize}">
                <datalist id="font-size-values">
                    <option value="16"></option>
                    <option value="24"></option>
                    <option value="36"></option>
                    <option value="48"></option>
                    <option value="60"></option>
                    <option value="72"></option>
                </datalist>
            </div>
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),n=Array.from(this.shadowRoot.querySelectorAll("#font-size-values option")).map(s=>parseFloat(s.value));!t||!n||t.addEventListener("input",()=>{let s=parseFloat(t.value);s=n.reduce((i,c)=>Math.abs(c-s)<Math.abs(i-s)?c:i),t.value=s.toString(),this.fontSize=s})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=this.fontSize.toString())}}customElements.define("app-settings-font-size",Z);class tt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(t){this._letterSpace=t,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="component">
                <h2>Spaziatura testo</h2>
                <label for="letter-space">Spaziatura testo</label>
                <input type="range" id="letter-space" name="letter-spacing" min="0" max="100" list="letter-space-values" value="0">
                <datalist id="letter-space-values">
                    <option value="0"></option>
                    <option value="25"></option>
                    <option value="50"></option>
                    <option value="75"></option>
                    <option value="100"></option>
                </datalist>
            </div>
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),n=Array.from(this.shadowRoot.querySelectorAll("#letter-space-values option")).map(s=>parseFloat(s.value));!t||!n||t.addEventListener("input",()=>{let s=parseFloat(t.value);s=n.reduce((i,c)=>Math.abs(c-s)<Math.abs(i-s)?c:i),t.value=s.toString(),this.letterSpace=s/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.letterSpace*100).toString())}}customElements.define("app-settings-letter-space",tt);class et extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="component">
                <h2>Altezza testo</h2>
                <label for="line-height">Spaziatura testo</label>
                <input type="range" id="line-height" name="line-height" min="115" max="200" list="line-height-values" value="115">
                <datalist id="line-height-values">
                    <option value="115"></option>
                    <option value="125"></option>
                    <option value="150"></option>
                    <option value="175"></option>
                    <option value="200"></option>
                </datalist>
            </div>
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),n=Array.from(this.shadowRoot.querySelectorAll("#line-height-values option")).map(s=>parseFloat(s.value));!t||!n||t.addEventListener("input",()=>{let s=parseFloat(t.value);s=n.reduce((i,c)=>Math.abs(c-s)<Math.abs(i-s)?c:i),t.value=s.toString(),this.lineHeight=s/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.lineHeight*100).toString())}}customElements.define("app-settings-line-height",et);class nt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_settings",new A);this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t,this.update()}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <p class="test-text">
                Questo è un testo di esempio. Le dimensioni e il colore di questo testo cambiano quando cambi le preferenze del tuo display.
            </p>
            `}update(){const t=this.shadowRoot.querySelector(".test-text");t&&(t.style.setProperty("font-size",`${this.settings.fontSize}px`),t.style.setProperty("letter-spacing",`${this.settings.letterSpace}rem`),t.style.setProperty("line-height",this.settings.lineHeight+""))}}customElements.define("app-text-test",nt);class st extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_settings",{...E.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="page">
                <app-settings-contrast></app-settings-contrast>
                <app-settings-font-size></app-settings-font-size>
                <app-settings-letter-space></app-settings-letter-space>
                <app-settings-line-height></app-settings-line-height>
                <app-text-test></app-text-test>
                <button type="button" class="apply-btn">Applica</button>
            </div>

            <style>
                .page {
                    max-width: 500px;
                    margin: auto;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector("app-settings-contrast"),n=this.shadowRoot.querySelector("app-settings-font-size"),s=this.shadowRoot.querySelector("app-settings-letter-space"),o=this.shadowRoot.querySelector("app-settings-line-height"),i=this.shadowRoot.querySelector(".apply-btn");t&&n&&s&&o&&i&&(t.contrast=this.settings.contrast,n.fontSize=this.settings.fontSize,o.lineHeight=this.settings.lineHeight,s.letterSpace=this.settings.letterSpace,t.addEventListener("contrast-updated",c=>{this.settings.contrast=c.detail.contrast,E.instance.settings.contrast=this.settings.contrast,E.instance.setContrast()}),n.addEventListener("font-size-updated",c=>{this.settings.fontSize=c.detail.fontSize,this.update()}),s.addEventListener("letter-space-updated",c=>{this.settings.letterSpace=c.detail.letterSpace,this.update()}),o.addEventListener("line-height-updated",c=>{this.settings.lineHeight=c.detail.lineHeight,this.update()}),i.addEventListener("click",()=>{window.location.href="/#/around-you",E.instance.settings=this.settings}))}update(){const t=this.shadowRoot.querySelector("app-text-test");t&&(t.settings=this.settings)}}customElements.define("page-settings",st);class q{constructor(e,t,n=2){r(this,"type");r(this,"message");r(this,"duration");this.type=e,this.message=t,this.duration=n}static createEmpty(){return new q("info","",2)}}var O=(a=>(a.Loader="loader",a.Temporary="temporary",a.Error="error",a.Info="info",a))(O||{});const y=class y{constructor(){if(y._instance)return y._instance;y._instance=this}static get instance(){return y._instance||(y._instance=new y),y._instance}updateSnackbar(e,t,n){return new q(e,t,n)}};r(y,"_instance");let I=y;class rt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new v);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){M.instance.getSelectedPoi(),this.poi=M.instance.selectedPoi,this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="page-poi">
                <h1>${this.poi.name}</h1>
                <p>${this.poi.name}</p>
                <button type="button" id="directions-btn">Indicazioni</button>
                <button type="button" id="add-to-custom-path-btn">Aggiungi</button>
            </div>
            `,this.renderInfo()}renderInfo(){const t=this.shadowRoot.querySelector(".page-poi");t&&this.poi.props.forEach(n=>{const s=this.renderTopic(n);t.appendChild(s)})}renderTopic(t){const n=document.createElement("div");n.classList.add("property");const s=document.createElement("label");s.classList.add("property-label"),s.innerHTML=t.displayName;const o=document.createElement("p");return o.classList.add("property-value"),t.value!==""?o.innerHTML=t.value:o.innerHTML="-",n.appendChild(s),n.appendChild(o),n}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const t=this.shadowRoot.querySelector("#directions-btn");t&&t.addEventListener("click",()=>{const n=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;window.open(n,"_blank")})}setupAddToCustomPathBtn(){const t=this.shadowRoot.querySelector("#add-to-custom-path-btn");t&&t.addEventListener("click",()=>{const n=document.body.querySelector("app-snackbar");n&&(n.snackbar=I.instance.updateSnackbar(O.Info,"Aggiunto al percorso personalizzato",2))})}}customElements.define("page-poi",rt);class ot extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-page">
                <nav>
                    <button type="button" aria-label="Riordina punti di interesse">Riordina punti di interesse</button>
                    <button type="button" aria-label="Modifica percorso">Modifica percorso</button>
                    <button type="button" aria-label="Crea nuovo percorso">Crea nuovo percorso</button>
                    <button type="button" aria-label="Salva percorso">Salva percorso</button>
                    <button type="button" aria-label="Carica percorsi salvati">Carica percorsi salvati</button>
                </nav>
                <h1>Percorso personalizzato</h1>
                <div class="custom-path-list"></div>
            </div>
            `}}customElements.define("page-custom-path",ot);class at extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_snackbar",q.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get snackbar(){return this._snackbar}set snackbar(t){this._snackbar=t,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>
            `}update(){if(this.snackbar.message.length===0)return;const t=this.shadowRoot.querySelector(".snackbar-message");t&&(t.innerHTML=this.snackbar.message)}}customElements.define("app-snackbar",at);E.instance.getLocalStorageSettings();const it=document.querySelector("app-router"),ct=new C("categories",f.Default,()=>"<page-categories />"),lt=new C("around-you",f.Page,()=>"<page-around-you />"),ut=new C("settings",f.Page,()=>"<page-settings />"),dt=new C("poi",f.Page,()=>"<page-poi />"),pt=new C("custom-path",f.Page,()=>"<page-custom-path />"),ht=[ct,lt,ut,dt,pt];it.addRoutes(ht);
