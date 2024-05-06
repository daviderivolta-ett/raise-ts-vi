var D=Object.defineProperty;var B=(a,e,t)=>e in a?D(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var r=(a,e,t)=>(B(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();var b=(a=>(a.Default="default",a.Page="page",a.NotFound="not-found",a))(b||{});class M{constructor(e,t,s){r(this,"url");r(this,"type");r(this,"routing");this.url=e,this.type=t,this.routing=s}}class $ extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(t){this.routes=[...t],this.checkRoute()}checkRoute(){const t=window.location.hash.slice(2);this.changeRoute(t)}changeRoute(t){if(t){const s=this.routes.findIndex(n=>n.url===t);this.shadowRoot.innerHTML=this.routes[s]?this.routes[s].routing():this.sendNotFound()}else{const s=this.routes.filter(n=>n.type===b.Default);s?window.location.hash="#/"+s[0].url:this.sendNotFound()}}sendNotFound(){const t=this.routes.filter(s=>s.type===b.NotFound);return t.length===0||(window.location.hash="#/"+t[0].url,this.changeRoute(t[0].url)),"404: Not found"}}customElements.define("app-router",$);class A extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
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
            `}}customElements.define("app-loader",A);class C{constructor(e,t){r(this,"color");r(this,"opacity");this.color=e,this.opacity=t}static createEmpty(){return new C("#008000",1)}}class H{constructor(e,t,s){r(this,"propertyName");r(this,"displayName");r(this,"type");this.propertyName=e,this.displayName=t,this.type=s}static createEmpty(){return new H("","","string")}}var E=(a=>(a.String="string",a.Image="image",a.Number="number",a))(E||{});class L{constructor(e,t,s,n,o,i){r(this,"name");r(this,"layer");r(this,"url");r(this,"style");r(this,"tags");r(this,"relevantProperties");this.name=e,this.layer=t,this.url=s,this.style=n,this.tags=o,this.relevantProperties=i}static createEmpty(){return new L("","","",C.createEmpty(),[],[H.createEmpty()])}}const d=class d{constructor(){r(this,"CATEGORIES_URL","./json/categories.json");r(this,"_data",{categories:[]});if(d._instance)return d._instance;d._instance=this}static get instance(){return d._instance||(d._instance=new d),d._instance}get data(){return this._data}set data(e){this._data=e}async getData(){if(this.data.categories.length!==0)return this._data;{let e=await this.fetchAppData(this.CATEGORIES_URL);return e=this.parseData(e),this.data=e,e}}async fetchAppData(e){try{const t=await fetch(e).then(n=>n.json()),s=await Promise.all(t.categories.map(async n=>{const o=await Promise.all(n.groups.map(async i=>{if(typeof i=="string")try{const c=await fetch(i);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return i}));return n.groups=o,n}));return{...t,categories:s}}catch(t){throw console.error("Errore durante il recupero dei dati JSON.",t),t}}parseData(e){return{categories:e.categories.map(s=>({name:s.name,groups:s.groups.map(n=>this.parseGroup(n))}))}}parseGroup(e){return Array.isArray(e)?e:{name:e.name,layers:e.layers.map(t=>this.parseLayer(t))}}parseLayer(e){return new L(e.name,e.layer,e.layer_url_wfs,new C(e.style.color,parseFloat(e.style.opacity)),e.tags,e.relevant_properties.map(t=>{let s=H.createEmpty();switch(s.displayName=t.display_name,s.propertyName=t.property_name,t.type){case"image":s.type=E.Image;break;case"number":s.type=E.Number;break;default:s.type=E.String;break}return s}))}getAllTags(e){let t=[];return e.categories.map(n=>{n.groups.map(o=>{typeof o!="string"&&o.layers.map(i=>{i.tags.map(c=>{t.push(c)})})})}),[...new Set(t)]}filterLayersByTags(e){let t=[];return e.forEach(n=>{this.filterLayersByTag(n).forEach(i=>t.push(i))}),[...new Set(t)]}filterLayersByTag(e){let t=[];return t=this.data.categories.flatMap(s=>s.groups.flatMap(n=>typeof n=="string"?[L.createEmpty()]:n.layers.filter(o=>o.tags.some(i=>i.includes(e))))),t}};r(d,"_instance");let v=d;const p=class p{constructor(){r(this,"_activeLayers",[]);if(p._instance)return p._instance;p._instance=this}static get instance(){return p._instance||(p._instance=new p),p._instance}get activeLayers(){return this._activeLayers}set activeLayers(e){this._activeLayers=e,localStorage.setItem("layers",JSON.stringify(this.activeLayers))}getSavedLayers(){const e=localStorage.getItem("layers");if(!e)return;const t=JSON.parse(e);let s=[];s=t.map(n=>this.parseLayer(n)),this._activeLayers=s}parseLayer(e){return new L(e.name,e.layer,e.url=e.url,new C(e.style.color,e.style.opacity),e.tags,e.relevantProperties.map(t=>{let s=H.createEmpty();switch(s.displayName=t.displayName,s.propertyName=t.propertyName,t.type){case"image":s.type=E.Image;break;case"number":s.type=E.Number;break;default:s.type=E.String;break}return s}))}};r(p,"_instance");let R=p;class F extends HTMLButtonElement{constructor(){super();r(this,"_tag","")}get tag(){return this._tag}set tag(t){this._tag=t}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:this.tag}}))})}}customElements.define("app-tag-chip",F,{extends:"button"});class O extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_tags",[]);r(this,"_currentPageTags",[]);r(this,"_currentPage",0);r(this,"_tagsPerPage",8);r(this,"handleCheckbox",t=>{const s=t.target;this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:s.tag}}))});this.shadowRoot=this.attachShadow({mode:"closed"})}get tags(){return this._tags}set tags(t){this._tags=t,this.connectedCallback()}get currentPageTags(){return this._currentPageTags}set currentPageTags(t){this._currentPageTags=t}get currentPage(){return this._currentPage}set currentPage(t){this._currentPage=t}get tagsPerPage(){return this._tagsPerPage}set tagsPerPage(t){this._tagsPerPage=t}connectedCallback(){this.render(),this.tags.length!==0&&(this.paginateTags(),this.setup())}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){const t=this.shadowRoot.querySelector(".prev-btn"),s=this.shadowRoot.querySelector(".next-btn");t&&s&&(t.addEventListener("click",()=>this.prevPage()),s.addEventListener("click",()=>this.nextPage()))}update(){const t=this.shadowRoot.querySelector(".current-page");if(!t)return;t.innerHTML=`Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}`;const s=this.shadowRoot.querySelector(".tags-list");if(!s)return;s.innerHTML=this.currentPageTags.join(", ");const n=this.shadowRoot.querySelector(".prev-btn"),o=this.shadowRoot.querySelector(".next-btn");if(!n||!o)return;this.currentPage===0?n.classList.add("hidden"):n.classList.remove("hidden"),this.currentPage===this.getPagesNumber()?o.classList.add("hidden"):o.classList.remove("hidden"),Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]')).forEach(c=>c.addEventListener("tag-selected",this.handleCheckbox))}paginateTags(){const t=this.currentPage*this.tagsPerPage;let s=t+this.tagsPerPage;s>this.tags.length&&(s=this.tags.length);const n=this.shadowRoot.querySelector(".tags");if(n){n.innerHTML="",this.currentPageTags=[];for(let o=t;o<s;o++){let i=this.tags[o];this.currentPageTags.push(i);let c=this.createChip(i);n.append(c)}this.update()}}createChip(t){let s=new F;return s.setAttribute("is","app-tag-chip"),s.classList.add("chip"),s.innerHTML=t.charAt(0).toUpperCase()+t.slice(1),s.tag=t,s}getPagesNumber(){return Math.floor(this.tags.length/this.tagsPerPage)}prevPage(){this.currentPage>0&&(this.currentPage--,this.paginateTags())}nextPage(){this.currentPage<this.getPagesNumber()&&(this.currentPage++,this.paginateTags())}}customElements.define("app-tags-wall",O);class J extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await v.instance.getData(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <h1>Esplora categorie</h1>
            <app-tags-wall />
            `}setup(){const t=this.shadowRoot.querySelector("app-tags-wall");if(!t)return;let s=v.instance.getAllTags(v.instance.data);t.tags=s,t.addEventListener("tag-selected",n=>{R.instance.activeLayers=v.instance.filterLayersByTag(n.detail.tag),window.location.hash="/around-you"})}}customElements.define("page-categories",J);const h=class h{constructor(){r(this,"_position",null);if(h._instance)return h._instance;h._instance=this}static get instance(){return h._instance||(h._instance=new h),h._instance}get position(){return this._position}set position(e){this._position=e}async getUserPosition(){try{return await new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(n=>{t(n)},n=>{s(n)})})}catch(e){throw e}}};r(h,"_instance");let N=h;var l=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(l||{});class T{constructor(e,t){r(this,"type");r(this,"coordinates");this.type=e,this.coordinates=t}static createEmpty(){return new T("Point",[])}}class z{constructor(e,t,s,n,o){r(this,"type");r(this,"geometry");r(this,"properties");r(this,"id");r(this,"geometry_name");this.type=e,this.geometry=t,this.properties=s,this.id=n,this.geometry_name=o}static createEmpty(){return new z("",T.createEmpty(),{prop:""},"","")}}class w{constructor(){r(this,"uuid","");r(this,"name","");r(this,"type","Point");r(this,"coordinates",[]);r(this,"layerName","");r(this,"props",[]);r(this,"distance")}static fromFeature(e){const t=new w;switch(t.uuid=e.properties.uuid,t.name=e.properties.name,e.geometry.type){case l.LineString:t.type="LineString";break;case l.Polygon:t.type="Polygon";break;case l.MultiPoint:t.type="MultiPoint";break;case l.MultiLineString:t.type="MultiLineString";break;case l.MultiPolygon:t.type="MultiPolygon";break;default:t.type="Point";break}t.coordinates=e.geometry.coordinates,t.layerName=e.properties.layerName;for(const s in e.properties){if(typeof e.properties[s]!="object")continue;let n=new I;switch(n.displayName=e.properties[s].displayName,n.value=e.properties[s].value,e.properties[s].type){case"number":n.type="number";break;case"image":n.type="image";break;default:n.type="string";break}t.props.push(n)}return t}}var f=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(f||{});class I{constructor(){r(this,"displayName","");r(this,"type","string");r(this,"value","")}}var x=(a=>(a.String="string",a.Image="image",a.Number="number",a))(x||{});const u=class u{constructor(){if(u._instance)return u._instance;u._instance=this}static get instance(){return u._instance||(u._instance=new u),u._instance}async createGeoJson(e){const t=`${e.url}?service=WFS&typeName=${e.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let n=await(await fetch(t)).json(),o=this.substituteRelevantProperties(n,e),i=this.createFeatureAdditionalProperties(o,e),c={...i};return c.features=i.features.map(S=>this.parseFeature(S)),c}substituteRelevantProperties(e,t){return e.features.forEach(s=>{const n={};for(const o in s.properties){const i=t.relevantProperties.find(c=>c.propertyName===o);if(i){const c={displayName:i.displayName,type:i.type,value:s.properties[o]};n[o]=c}}s.properties=n}),e}createFeatureAdditionalProperties(e,t){return e.features=e.features.map((s,n)=>(s.properties.name=t.name+" "+n,s.properties.layerName=t.layer,s.properties.uuid=s.id,s)),e}parseFeature(e){let t=z.createEmpty();return t.type=e.type,t.properties=e.properties,t.geometry_name=e.geometry_name,t.id=e.id,e.geometry&&(t.geometry=this.parseFeatureGeometry(e.geometry)),t}parseFeatureGeometry(e){let t=T.createEmpty();return t.type=this.parseFeatureGeometryType(e.type),t.coordinates=e.coordinates,t}parseFeatureGeometryType(e){let t=l.Point;switch(e){case"LineString":t=l.LineString;break;case"Polygon":t=l.Polygon;break;case"MultiPoint":t=l.MultiPoint;break;case"MultiLineString":t=l.MultiLineString;break;case"MultiPolygon":t=l.MultiPolygon;break}return t}async getPoisFromLayers(e){let t=[];const s=e.map(async o=>u.instance.createGeoJson(o));return(await Promise.all(s)).forEach(o=>{o.features.forEach(i=>t.push(w.fromFeature(i)))}),t.filter(o=>!u.instance.isCoordinatesMultidimensional(o.coordinates))}isCoordinatesMultidimensional(e){if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))return!0;return!1}};r(u,"_instance");let _=u;class j{constructor(){r(this,"R",6371e3)}haversineDistance(e,t,s,n){const o=e*Math.PI/180,i=s*Math.PI/180,S=(n-t)*Math.PI/180;return Math.acos(Math.sin(o)*Math.sin(i)+Math.cos(o)*Math.cos(i)*Math.cos(S))*this.R}}const m=class m{constructor(){r(this,"_selectedPoi",new w);if(m._instance)return m._instance;m._instance=this}static get instance(){return m._instance||(m._instance=new m),m._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(e){this._selectedPoi=e,localStorage.setItem("selected-poi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const e=localStorage.getItem("selected-poi");if(!e)return;const t=JSON.parse(e);this._selectedPoi=this.parsePoi(t)}parsePoi(e){let t=new w;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=f.LineString;break;case l.Polygon:e.type=f.Polygon;break;case l.MultiPoint:e.type=f.MultiPoint;break;case l.MultiLineString:e.type=f.MultiLineString;break;case l.MultiPolygon:e.type=f.MultiPolygon;break;default:e.type=f.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let n=new I;switch(n.displayName=e.props[s].displayName,n.value=e.props[s].value,e.props[s].type){case"number":n.type=x.Number;break;case"image":n.type=x.Image;break;default:n.type=x.String;break}t.props.push(n)}return e.distance&&(t.distance=e.distance),t}};r(m,"_instance");let k=m;class U extends HTMLDialogElement{constructor(){super()}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <button autofocus aria-label="chiudi menu">Chiudi</button>
            <h2 id="menu-title">Menu</h2>
            <nav class="menu" >
                <ul>
                    <li><a href="/#/categories">Seleziona categoria</a></li>
                    <li><a href="/#/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/#/custom-path">Percorsi custom</a></li>
                </ul>
            </nav>
            `}setup(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close())}}customElements.define("app-menu",U,{extends:"dialog"});class G extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new w);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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

            `}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-feature-card",G);class V extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_pois",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get pois(){return this._pois}set pois(t){this._pois=t}async connectedCallback(){this.createLoader(),R.instance.getSavedLayers();const t=await N.instance.getUserPosition();this.pois=await _.instance.getPoisFromLayers(R.instance.activeLayers),this.pois=this.orderPoisByDistance(t,this.pois),this.render(),this.setup(),this.removeLoader()}render(){this.shadowRoot.innerHTML=`
            <button id="app-menu-btn" aria-label="apri menu">Menu</button>
            <dialog is="app-menu" aria-labelledby="menu-title"></dialog>
            <h1>Punti di interesse</h1>
            <a href="/#/settings">Impostazioni</a>
            <div class="around-you-features"></div>
            `;const t=this.shadowRoot.querySelector(".around-you-features");t&&this.pois.forEach(s=>{const n=document.createElement("app-feature-card");n.poi=s,t.append(n)})}setup(){const t=this.shadowRoot.querySelector("button#app-menu-btn"),s=this.shadowRoot.querySelector('dialog[is="app-menu"]');if(!t||!s)return;t.addEventListener("click",()=>s.showModal()),this.shadowRoot.querySelectorAll("app-feature-card").forEach(o=>{o.addEventListener("poi-selected",i=>{k.instance.selectedPoi=i.detail.selectedPoi,window.location.href="/#/poi"})})}createLoader(){const t=new A;document.body.append(t)}removeLoader(){const t=document.body.querySelector("app-loader");t&&t.remove()}orderPoisByDistance(t,s){const n=new j;return s.forEach(o=>{if(!_.instance.isCoordinatesMultidimensional(o.coordinates)){const i=Array.isArray(o.coordinates)?o.coordinates[1]:o.coordinates,c=Array.isArray(o.coordinates)?o.coordinates[0]:o.coordinates,S=n.haversineDistance(i,c,t.coords.latitude,t.coords.longitude);o.distance=S}}),s.sort((o,i)=>o.distance&&i.distance?o.distance-i.distance:0),s}}customElements.define("page-around-you",V);class q{constructor(){r(this,"fontSize",16);r(this,"letterSpace",0);r(this,"lineHeight",1.15);r(this,"contrast","light-high")}}var y=(a=>(a.Light="light",a.Dark="dark",a.LightHigh="light-high",a.DarkHigh="dark-high",a))(y||{});const g=class g{constructor(){r(this,"_settings",new q);if(g._instance)return g._instance;g._instance=this}get settings(){return this._settings}set settings(e){this._settings=e,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return g._instance||(g._instance=new g),g._instance}getLocalStorageSettings(){const e=localStorage.getItem("settings");if(!e)return;const t=JSON.parse(e),s=this.parseLocalStorageSettings(t);this.settings={...s}}setLocalStorageSettings(){localStorage.setItem("settings",JSON.stringify(this.settings))}setLightContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}setDarkContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightHighContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-dim","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--outline","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--outline-variant","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(255, 255, 255)")}setDarkHighContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--primary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--outline","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--outline-variant","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--inverse-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 0, 0)")}setFontSize(e){document.documentElement.style.setProperty("font-size",e.toString()+"px")}setContrast(){switch(this.settings.contrast){case y.Light:this.setLightContrast();break;case y.Dark:this.setDarkContrast();break;case y.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(e){document.documentElement.style.setProperty("letter-spacing",e.toString()+"rem")}setLineHeight(e){document.documentElement.style.setProperty("line-height",e.toString())}parseLocalStorageSettings(e){let t=new q;return t.contrast=e.contrast,t.fontSize=e.fontSize,t.lineHeight=e.lineHeight,t.letterSpace=e.letterSpace,t}};r(g,"_instance");let P=g;class W extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_contrast",y.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(t){this._contrast=t,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#light-contrast"),s=this.shadowRoot.querySelector("#dark-contrast"),n=this.shadowRoot.querySelector("#light-high-contrast"),o=this.shadowRoot.querySelector("#dark-high-contrast");!t||!s||!n||!o||(t.addEventListener("change",()=>this.contrast=y.Light),s.addEventListener("change",()=>this.contrast=y.Dark),n.addEventListener("change",()=>this.contrast=y.LightHigh),o.addEventListener("change",()=>this.contrast=y.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(s=>{s.value===this.contrast&&(s.checked=!0)})}}customElements.define("app-settings-contrast",W);class Y extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#font-size-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.fontSize=n})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=this.fontSize.toString())}}customElements.define("app-settings-font-size",Y);class K extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(t){this._letterSpace=t,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#letter-space-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.letterSpace=n/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.letterSpace*100).toString())}}customElements.define("app-settings-letter-space",K);class Q extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#line-height-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.lineHeight=n/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.lineHeight*100).toString())}}customElements.define("app-settings-line-height",Q);class X extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_settings",new q);this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t,this.update()}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <p class="test-text">
                Questo è un testo di esempio. Le dimensioni e il colore di questo testo cambiano quando cambi le preferenze del tuo display.
            </p>
            `}update(){const t=this.shadowRoot.querySelector(".test-text");t&&(t.style.setProperty("font-size",`${this.settings.fontSize}px`),t.style.setProperty("letter-spacing",`${this.settings.letterSpace}rem`),t.style.setProperty("line-height",this.settings.lineHeight+""))}}customElements.define("app-text-test",X);class Z extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_settings",{...P.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){const t=this.shadowRoot.querySelector("app-settings-contrast"),s=this.shadowRoot.querySelector("app-settings-font-size"),n=this.shadowRoot.querySelector("app-settings-letter-space"),o=this.shadowRoot.querySelector("app-settings-line-height"),i=this.shadowRoot.querySelector(".apply-btn");t&&s&&n&&o&&i&&(t.contrast=this.settings.contrast,s.fontSize=this.settings.fontSize,o.lineHeight=this.settings.lineHeight,n.letterSpace=this.settings.letterSpace,t.addEventListener("contrast-updated",c=>{this.settings.contrast=c.detail.contrast,P.instance.settings.contrast=this.settings.contrast,P.instance.setContrast()}),s.addEventListener("font-size-updated",c=>{this.settings.fontSize=c.detail.fontSize,this.update()}),n.addEventListener("letter-space-updated",c=>{this.settings.letterSpace=c.detail.letterSpace,this.update()}),o.addEventListener("line-height-updated",c=>{this.settings.lineHeight=c.detail.lineHeight,this.update()}),i.addEventListener("click",()=>{window.location.href="/#/around-you",P.instance.settings=this.settings}))}update(){const t=this.shadowRoot.querySelector("app-text-test");t&&(t.settings=this.settings)}}customElements.define("page-settings",Z);class tt extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_poi",new w);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){k.instance.getSelectedPoi(),this.poi=k.instance.selectedPoi,this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="page-poi">
                <h1>${this.poi.name}</h1>
                <p>${this.poi.name}</p>
                <button type="button" id="directions-btn">Indicazioni</button>
                <button type="button" id="add-to-custom-path-btn">Aggiungi</button>
            </div>
            `,this.renderInfo()}renderInfo(){const t=this.shadowRoot.querySelector(".page-poi");t&&this.poi.props.forEach(s=>{const n=this.renderTopic(s);t.appendChild(n)})}renderTopic(t){const s=document.createElement("div");s.classList.add("property");const n=document.createElement("label");n.classList.add("property-label"),n.innerHTML=t.displayName;const o=document.createElement("p");return o.classList.add("property-value"),t.value!==""?o.innerHTML=t.value:o.innerHTML="-",s.appendChild(n),s.appendChild(o),s}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const t=this.shadowRoot.querySelector("#directions-btn");t&&t.addEventListener("click",()=>{const s=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;window.open(s,"_blank")})}setupAddToCustomPathBtn(){const t=this.shadowRoot.querySelector("#add-to-custom-path-btn");t&&t.addEventListener("click",()=>{const s=document.body.querySelector("app-snackbar");s&&(s.msg="ehiehiehiehiehi")})}}customElements.define("page-poi",tt);class et extends HTMLElement{constructor(){super();r(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
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
            `}}customElements.define("page-custom-path",et);class st extends HTMLElement{constructor(){super();r(this,"shadowRoot");r(this,"_msg","");this.shadowRoot=this.attachShadow({mode:"closed"})}get msg(){return this._msg}set msg(t){this._msg=t,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>
            `}update(){if(this.msg.length===0)return;const t=this.shadowRoot.querySelector(".snackbar-message");t&&(t.innerHTML=this.msg)}}customElements.define("app-snackbar",st);P.instance.getLocalStorageSettings();const nt=document.querySelector("app-router"),rt=new M("categories",b.Default,()=>"<page-categories />"),ot=new M("around-you",b.Page,()=>"<page-around-you />"),at=new M("settings",b.Page,()=>"<page-settings />"),it=new M("poi",b.Page,()=>"<page-poi />"),ct=new M("custom-path",b.Page,()=>"<page-custom-path />"),lt=[rt,ot,at,it,ct];nt.addRoutes(lt);
