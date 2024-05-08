var Y=Object.defineProperty;var K=(a,e,t)=>e in a?Y(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var o=(a,e,t)=>(K(a,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();var v=(a=>(a.Default="default",a.Page="page",a.NotFound="not-found",a))(v||{});class _{constructor(e,t,s){o(this,"url");o(this,"type");o(this,"routing");this.url=e,this.type=t,this.routing=s}}class Q extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(t){this.routes=[...t],this.checkRoute()}checkRoute(){const t=window.location.hash.slice(2);this.changeRoute(t)}changeRoute(t){if(t){const s=this.routes.findIndex(n=>n.url===t);this.shadowRoot.innerHTML=this.routes[s]?this.routes[s].routing():this.sendNotFound()}else{const s=this.routes.filter(n=>n.type===v.Default);s?window.location.hash="#/"+s[0].url:this.sendNotFound()}}sendNotFound(){const t=this.routes.filter(s=>s.type===v.NotFound);return t.length===0||(window.location.hash="#/"+t[0].url,this.changeRoute(t[0].url)),"404: Not found"}}customElements.define("app-router",Q);class G extends HTMLElement{constructor(){super();o(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
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
            `}}customElements.define("app-loader",G);class A{constructor(e,t){o(this,"color");o(this,"opacity");this.color=e,this.opacity=t}static createEmpty(){return new A("#008000",1)}}class I{constructor(e,t,s){o(this,"propertyName");o(this,"displayName");o(this,"type");this.propertyName=e,this.displayName=t,this.type=s}static createEmpty(){return new I("","","string")}}var C=(a=>(a.String="string",a.Image="image",a.Number="number",a))(C||{});class N{constructor(e,t,s,n,r,i){o(this,"name");o(this,"layer");o(this,"url");o(this,"style");o(this,"tags");o(this,"relevantProperties");this.name=e,this.layer=t,this.url=s,this.style=n,this.tags=r,this.relevantProperties=i}static createEmpty(){return new N("","","",A.createEmpty(),[],[I.createEmpty()])}}const m=class m{constructor(){o(this,"CATEGORIES_URL","./json/categories.json");o(this,"_data",{categories:[]});if(m._instance)return m._instance;m._instance=this}static get instance(){return m._instance||(m._instance=new m),m._instance}get data(){return this._data}set data(e){this._data=e}async getData(){if(this.data.categories.length!==0)return this._data;{let e=await this.fetchAppData(this.CATEGORIES_URL);return e=this.parseData(e),this.data=e,e}}async fetchAppData(e){try{const t=await fetch(e).then(n=>n.json()),s=await Promise.all(t.categories.map(async n=>{const r=await Promise.all(n.groups.map(async i=>{if(typeof i=="string")try{const c=await fetch(i);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return i}));return n.groups=r,n}));return{...t,categories:s}}catch(t){throw console.error("Errore durante il recupero dei dati JSON.",t),t}}parseData(e){return{categories:e.categories.map(s=>({name:s.name,groups:s.groups.map(n=>this.parseGroup(n))}))}}parseGroup(e){return Array.isArray(e)?e:{name:e.name,layers:e.layers.map(t=>this.parseLayer(t))}}parseLayer(e){return new N(e.name,e.layer,e.layer_url_wfs,new A(e.style.color,parseFloat(e.style.opacity)),e.tags,e.relevant_properties.map(t=>{let s=I.createEmpty();switch(s.displayName=t.display_name,s.propertyName=t.property_name,t.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}getAllTags(e){let t=[];return e.categories.map(n=>{n.groups.map(r=>{typeof r!="string"&&r.layers.map(i=>{i.tags.map(c=>{t.push(c)})})})}),[...new Set(t)]}filterLayersByTags(e){let t=[];return e.forEach(n=>{this.filterLayersByTag(n).forEach(i=>t.push(i))}),[...new Set(t)]}filterLayersByTag(e){let t=[];return t=this.data.categories.flatMap(s=>s.groups.flatMap(n=>typeof n=="string"?[N.createEmpty()]:n.layers.filter(r=>r.tags.some(i=>i.includes(e))))),t}};o(m,"_instance");let H=m;const y=class y{constructor(){o(this,"_activeLayers",[]);if(y._instance)return y._instance;y._instance=this}static get instance(){return y._instance||(y._instance=new y),y._instance}get activeLayers(){return this._activeLayers}set activeLayers(e){this._activeLayers=e,localStorage.setItem("layers",JSON.stringify(this.activeLayers))}getSavedLayers(){const e=localStorage.getItem("layers");if(!e)return;const t=JSON.parse(e);let s=[];s=t.map(n=>this.parseLayer(n)),this._activeLayers=s}parseLayer(e){return new N(e.name,e.layer,e.url=e.url,new A(e.style.color,e.style.opacity),e.tags,e.relevantProperties.map(t=>{let s=I.createEmpty();switch(s.displayName=t.displayName,s.propertyName=t.propertyName,t.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}};o(y,"_instance");let q=y;class W extends HTMLButtonElement{constructor(){super();o(this,"_tag","")}get tag(){return this._tag}set tag(t){this._tag=t}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:this.tag}}))})}}customElements.define("app-tag-chip",W,{extends:"button"});class X extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_tags",[]);o(this,"_currentPageTags",[]);o(this,"_currentPage",0);o(this,"_tagsPerPage",8);o(this,"handleCheckbox",t=>{const s=t.target;this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:s.tag}}))});this.shadowRoot=this.attachShadow({mode:"closed"})}get tags(){return this._tags}set tags(t){this._tags=t,this.connectedCallback()}get currentPageTags(){return this._currentPageTags}set currentPageTags(t){this._currentPageTags=t}get currentPage(){return this._currentPage}set currentPage(t){this._currentPage=t}get tagsPerPage(){return this._tagsPerPage}set tagsPerPage(t){this._tagsPerPage=t}connectedCallback(){this.render(),this.tags.length!==0&&(this.paginateTags(),this.setup())}render(){this.shadowRoot.innerHTML=`
            <div class="pagination">
                <div class="current-page-status">
                    <p class="current-page">Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}</p>
                    <p>Categorie in questa pagina: <span class="tags-list"></span></p>
                </div>

                <div class="pagination-buttons">
                    <button type="button" class="pagination-btn prev-btn" aria-label="Pagine precedente"><span class="material-symbols-outlined">chevron_left</span> Precedente</button>
                    <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">Successiva <span class="material-symbols-outlined">chevron_right</span></button>
                </div>

                <div class="tags"></div>
            </div>

            <style>
                button {
                    cursor: pointer;
                }

                button[disabled] {
                    cursor: not-allowed;
                }

                .pagination-buttons {
                    display: flex;
                    justify-content: space-between;
                }

                .pagination-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hidden {
                    display: none;
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
                    border-radius: var( --border-radius-circle);
                }

                button[is="app-tag-chip"]:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector(".prev-btn"),s=this.shadowRoot.querySelector(".next-btn");t&&s&&(t.addEventListener("click",()=>this.prevPage()),s.addEventListener("click",()=>this.nextPage()))}update(){const t=this.shadowRoot.querySelector(".current-page");if(!t)return;t.innerHTML=`Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}`;const s=this.shadowRoot.querySelector(".tags-list");if(!s)return;s.innerHTML=this.currentPageTags.join(", ");const n=this.shadowRoot.querySelector(".prev-btn"),r=this.shadowRoot.querySelector(".next-btn");if(!n||!r)return;this.currentPage===0?n.setAttribute("disabled",""):n.removeAttribute("disabled"),this.currentPage===this.getPagesNumber()?r.setAttribute("disabled",""):r.removeAttribute("disabled"),Array.from(this.shadowRoot.querySelectorAll('button[is="app-tag-chip"]')).forEach(c=>c.addEventListener("tag-selected",this.handleCheckbox)),t.focus()}paginateTags(){const t=this.currentPage*this.tagsPerPage;let s=t+this.tagsPerPage;s>this.tags.length&&(s=this.tags.length);const n=this.shadowRoot.querySelector(".tags");if(n){n.innerHTML="",this.currentPageTags=[];for(let r=t;r<s;r++){let i=this.tags[r];this.currentPageTags.push(i);let c=this.createChip(i);n.append(c)}this.update()}}createChip(t){let s=new W;return s.setAttribute("is","app-tag-chip"),s.classList.add("chip"),s.innerHTML=t.charAt(0).toUpperCase()+t.slice(1),s.tag=t,s}getPagesNumber(){return Math.floor(this.tags.length/this.tagsPerPage)}prevPage(){this.currentPage>0&&(this.currentPage--,this.paginateTags())}nextPage(){this.currentPage<this.getPagesNumber()&&(this.currentPage++,this.paginateTags())}}customElements.define("app-tags-wall",X);class Z extends HTMLElement{constructor(){super();o(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await H.instance.getData(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="categories-page">
                <h1 tabindex="-1" class="categories-page-title">Esplora categorie</h1>
                <app-tags-wall />
            </div>

            <style>
                .categories-page-title {
                    text-align: center;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){const t=this.shadowRoot.querySelector("app-tags-wall");if(!t)return;let s=H.instance.getAllTags(H.instance.data);t.tags=s,t.addEventListener("tag-selected",n=>{q.instance.activeLayers=H.instance.filterLayersByTag(n.detail.tag),window.location.hash="/around-you"})}}customElements.define("page-categories",Z);const b=class b{constructor(){o(this,"_position",null);if(b._instance)return b._instance;b._instance=this}static get instance(){return b._instance||(b._instance=new b),b._instance}get position(){return this._position}set position(e){this._position=e}async getUserPosition(){try{return await new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(n=>{t(n)},n=>{s(n)})})}catch(e){throw e}}};o(b,"_instance");let D=b;var l=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(l||{});class J{constructor(e,t){o(this,"type");o(this,"coordinates");this.type=e,this.coordinates=t}static createEmpty(){return new J("Point",[])}}class U{constructor(e,t,s,n,r){o(this,"type");o(this,"geometry");o(this,"properties");o(this,"id");o(this,"geometry_name");this.type=e,this.geometry=t,this.properties=s,this.id=n,this.geometry_name=r}static createEmpty(){return new U("",J.createEmpty(),{prop:""},"","")}}class g{constructor(){o(this,"uuid","");o(this,"name","");o(this,"type","Point");o(this,"coordinates",[]);o(this,"layerName","");o(this,"props",[]);o(this,"distance")}static fromFeature(e){const t=new g;switch(t.uuid=e.properties.uuid,t.name=e.properties.name,e.geometry.type){case l.LineString:t.type="LineString";break;case l.Polygon:t.type="Polygon";break;case l.MultiPoint:t.type="MultiPoint";break;case l.MultiLineString:t.type="MultiLineString";break;case l.MultiPolygon:t.type="MultiPolygon";break;default:t.type="Point";break}t.coordinates=e.geometry.coordinates,t.layerName=e.properties.layerName;for(const s in e.properties){if(typeof e.properties[s]!="object")continue;let n=new F;switch(n.displayName=e.properties[s].displayName,n.value=e.properties[s].value,e.properties[s].type){case"number":n.type="number";break;case"image":n.type="image";break;default:n.type="string";break}t.props.push(n)}return t}}var d=(a=>(a.Point="Point",a.LineString="LineString",a.Polygon="Polygon",a.MultiPoint="MultiPoint",a.MultiLineString="MultiLineString",a.MultiPolygon="MultiPolygon",a))(d||{});class F{constructor(){o(this,"displayName","");o(this,"type","string");o(this,"value","")}}var k=(a=>(a.String="string",a.Image="image",a.Number="number",a))(k||{});const p=class p{constructor(){if(p._instance)return p._instance;p._instance=this}static get instance(){return p._instance||(p._instance=new p),p._instance}async createGeoJson(e){const t=`${e.url}?service=WFS&typeName=${e.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let n=await(await fetch(t)).json(),r=this.substituteRelevantProperties(n,e),c={...this.createFeatureAdditionalProperties(r,e)};return c.features=c.features.slice(0,10),c.features=c.features.map(u=>this.parseFeature(u)),c}substituteRelevantProperties(e,t){return e.features.forEach(s=>{const n={};for(const r in s.properties){const i=t.relevantProperties.find(c=>c.propertyName===r);if(i){const c={displayName:i.displayName,type:i.type,value:s.properties[r]};n[r]=c}}s.properties=n}),e}createFeatureAdditionalProperties(e,t){return e.features=e.features.map((s,n)=>(s.properties.name=t.name+" "+n,s.properties.layerName=t.layer,s.properties.uuid=s.id,s)),e}parseFeature(e){let t=U.createEmpty();return t.type=e.type,t.properties=e.properties,t.geometry_name=e.geometry_name,t.id=e.id,e.geometry&&(t.geometry=this.parseFeatureGeometry(e.geometry)),t}parseFeatureGeometry(e){let t=J.createEmpty();return t.type=this.parseFeatureGeometryType(e.type),t.coordinates=e.coordinates,t}parseFeatureGeometryType(e){let t=l.Point;switch(e){case"LineString":t=l.LineString;break;case"Polygon":t=l.Polygon;break;case"MultiPoint":t=l.MultiPoint;break;case"MultiLineString":t=l.MultiLineString;break;case"MultiPolygon":t=l.MultiPolygon;break}return t}async getPoisFromLayers(e){let t=[];const s=e.map(async r=>p.instance.createGeoJson(r));return(await Promise.all(s)).forEach(r=>{r.features.forEach(i=>t.push(g.fromFeature(i)))}),t.filter(r=>!p.instance.isCoordinatesMultidimensional(r.coordinates))}isCoordinatesMultidimensional(e){if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))return!0;return!1}orderPoisByDistance(e,t){return t.forEach(s=>{if(!p.instance.isCoordinatesMultidimensional(s.coordinates)){const n=Array.isArray(s.coordinates)?s.coordinates[1]:s.coordinates,r=Array.isArray(s.coordinates)?s.coordinates[0]:s.coordinates,i=this.haversineDistance(n,r,e.coords.latitude,e.coords.longitude);s.distance=i}}),t.sort((s,n)=>s.distance&&n.distance?s.distance-n.distance:0),t}haversineDistance(e,t,s,n){const r=e*Math.PI/180,i=s*Math.PI/180,u=(n-t)*Math.PI/180;return Math.acos(Math.sin(r)*Math.sin(i)+Math.cos(r)*Math.cos(i)*Math.cos(u))*6371e3}};o(p,"_instance");let $=p;const P=class P{constructor(){o(this,"_selectedPoi",new g);if(P._instance)return P._instance;P._instance=this}static get instance(){return P._instance||(P._instance=new P),P._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(e){this._selectedPoi=e,localStorage.setItem("selected-poi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const e=localStorage.getItem("selected-poi");if(!e)return;const t=JSON.parse(e);this._selectedPoi=this.parsePoi(t)}parsePoi(e){let t=new g;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=d.LineString;break;case l.Polygon:e.type=d.Polygon;break;case l.MultiPoint:e.type=d.MultiPoint;break;case l.MultiLineString:e.type=d.MultiLineString;break;case l.MultiPolygon:e.type=d.MultiPolygon;break;default:e.type=d.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let n=new F;switch(n.displayName=e.props[s].displayName,n.value=e.props[s].value,e.props[s].type){case"number":n.type=k.Number;break;case"image":n.type=k.Image;break;default:n.type=k.String;break}t.props.push(n)}return e.distance&&(t.distance=e.distance),t}};o(P,"_instance");let x=P;class tt extends HTMLDialogElement{constructor(){super()}connectedCallback(){this.render(),this.setup()}render(){this.innerHTML=`
            <button autofocus aria-label="chiudi menu">Chiudi</button>
            <h2 id="menu-title">Menu</h2>
            <nav class="menu" >
                <ul>
                    <li><a href="/categories">Seleziona categoria</a></li>
                    <li><a href="/around-you">Intorno a me</a></li>
                    <li><a href="/suggested-paths">Percorsi suggeriti</a></li>
                    <li><a href="/custom-path">Percorsi custom</a></li>
                    <li><a href="/settings">Impostazioni</a></li>
                </ul>
            </nav>
            `}setup(){this.setupCloseBtn(),this.setupLinkBehaviour()}setupCloseBtn(){const e=this.querySelector("button");e&&e.addEventListener("click",()=>this.close())}setupLinkBehaviour(){const e=this.querySelectorAll("a");e&&e.forEach(t=>{t.addEventListener("click",s=>{s.preventDefault();const n=t.getAttribute("href");n&&(this.close(),window.location.hash=n)})})}}customElements.define("app-menu",tt,{extends:"dialog"});class et extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",new g);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="poi-card">
                <h3>${this.poi.name}</h3>
                <div class="poi-card-info">
                    <p>${this.poi.name}</p>
                    <p>${Math.round(this.poi.distance)}m</p>
                </div>
                <button type="button" id="info-btn">Vedi</button>
            </div>

            <style>
                .poi-card {
                    border: 1px solid var(--outline);
                }

                .poi-card-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                button {
                    cursor: pointer;
                }
            </style>

            `}setup(){const t=this.shadowRoot.querySelector("#info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-poi-card",et);class st extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_pois",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get pois(){return this._pois}set pois(t){this._pois=t}async connectedCallback(){this.createLoader();const t=await D.instance.getUserPosition();this.pois=await $.instance.getPoisFromLayers(q.instance.activeLayers),this.pois=$.instance.orderPoisByDistance(t,this.pois),this.render(),this.setup(),this.removeLoader()}render(){this.shadowRoot.innerHTML=`
            <div class="around-you-page">
                <h1 tabindex="-1">Punti di interesse</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <div class="around-you-features"></div>
            </div>
            `;const t=this.shadowRoot.querySelector(".around-you-features");if(!t)return;this.pois.forEach(n=>{const r=document.createElement("app-poi-card");r.poi=n,t.append(r)});const s=this.shadowRoot.querySelector("h1");s&&s.focus()}setup(){this.shadowRoot.querySelectorAll("app-poi-card").forEach(s=>{s.addEventListener("poi-selected",n=>{x.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}createLoader(){const t=new G;document.body.append(t)}removeLoader(){const t=document.body.querySelector("app-loader");t&&t.remove()}}customElements.define("page-around-you",st);class z{constructor(e,t,s=2){o(this,"type");o(this,"message");o(this,"duration");this.type=e,this.message=t,this.duration=s}static createEmpty(){return new z("info","",2)}}var B=(a=>(a.Error="error",a.Info="info",a))(B||{});class R{constructor(e,t){o(this,"name");o(this,"pois");this.name=e,this.pois=t}static createEmpty(){return new R("",[])}}const f=class f{constructor(){o(this,"_customPath",new R("Percorso personalizzato",[]));o(this,"_suggestedPaths",[]);o(this,"_selectedSuggestedPath",new R("",[]));if(f._instance)return f._instance;f._instance=this}static get instance(){return f._instance||(f._instance=new f),f._instance}get customPath(){return this._customPath}set customPath(e){this._customPath=e}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(e){this._suggestedPaths=e}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(e){this._selectedSuggestedPath=e,localStorage.setItem("selected-suggested-path",JSON.stringify(this.selectedSuggestedPath))}addPoiToCustomPath(e){if(this.isPoiInCustomPath(e))return;const t={...this.customPath};t.pois.unshift(e),this.customPath={...t}}isPoiInCustomPath(e){return this.customPath.pois.some(t=>t.uuid===e.uuid)}saveCustomPath(){localStorage.setItem("custom-path",JSON.stringify(this.customPath))}getSavedCustomPath(){const e=localStorage.getItem("custom-path");if(!e)return;const t=JSON.parse(e);this._customPath=this.parsePath(t)}parsePath(e){let t=new R(e.name,e.pois);return t.pois=t.pois.map(s=>this.parsePoi(s)),t}parsePoi(e){let t=new g;switch(t.uuid=e.uuid,t.name=e.name,e.type){case l.LineString:e.type=d.LineString;break;case l.Polygon:e.type=d.Polygon;break;case l.MultiPoint:e.type=d.MultiPoint;break;case l.MultiLineString:e.type=d.MultiLineString;break;case l.MultiPolygon:e.type=d.MultiPolygon;break;default:e.type=d.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let n=new F;switch(n.displayName=e.props[s].displayName,n.value=e.props[s].value,e.props[s].type){case"number":n.type=k.Number;break;case"image":n.type=k.Image;break;default:n.type=k.String;break}t.props.push(n)}return e.distance&&(t.distance=e.distance),t}getCsvPaths(e){return new Promise((t,s)=>{let n=0;const r=[],i=[];for(;n<=e;){const c=fetch(`./suggested-paths/${n}.tsv`).then(u=>u.text()).then(u=>{const T=this.parseCsvFile(u);r.push(this.parseCsvPath(T))}).catch(u=>console.error("Errore durante il recupero dei percorsi suggeriti",u));i.push(c),n++}Promise.all(i).then(()=>{this.suggestedPaths=[...r],t()}).catch(c=>s(c))})}parseCsvFile(e){return e.split(`
`).map(n=>{const r=n.split("	");return{path:r[0],layerName:r[1],id:r[2],name:r[3],latitude:r[4],longitude:r[5],height:r[6],info:r[7]}})}parseCsvPath(e){let t=R.createEmpty();return t.name=e[1].path,e.forEach((s,n)=>{n!==0&&t.pois.push(this.parseCsvPoi(s))}),t}parseCsvPoi(e){let t=new g;return t.layerName=e.layerName,t.name=e.name,t.coordinates=[parseFloat(e.longitude),parseFloat(e.latitude),parseFloat(e.height)],t.type=d.Point,t.uuid=e.id,t.props=this.parseCsvPoiProperties(e.info),t}parseCsvPoiProperties(e){let t=[];return e.split("|").forEach(n=>{let r=new F;r.displayName=n.split(":")[0],r.value=n.split(":")[1].trim(),r.type=k.String,t.push(r)}),t}getSuggestedPaths(e){let t=[];return this.suggestedPaths.forEach(s=>{s.pois.forEach(n=>{e.forEach(r=>{n.layerName===r.layer&&t.push(s)})})}),[...new Set(t)]}getSelectedSuggestedPath(){const e=localStorage.getItem("selected-suggested-path");if(!e)return;const t=JSON.parse(e);this._selectedSuggestedPath=this.parsePath(t)}};o(f,"_instance");let h=f;const E=class E{constructor(){o(this,"_snackbar",new z(B.Info,""));o(this,"_live",document.body.querySelector("app-snackbar"));if(E._instance)return E._instance;E._instance=this}static get instance(){return E._instance||(E._instance=new E),E._instance}get snackbar(){return this._snackbar}set snackbar(e){this._snackbar=e}get live(){return this._live}set live(e){this._live=e}updateSnackbar(e,t,s=5){this.live&&(this.live.snackbar=new z(e,t,s))}};o(E,"_instance");let O=E;const S=class S{constructor(){S._instance||(S._instance=this)}static get instance(){return S._instance||(S._instance=new S),S._instance}calculateDistance(e,t){const s=e[0]-t[0],n=e[1]-t[1];return Math.sqrt(s*s+n*n)}nearestInsertion(e,t){const s=[...e];let n=0,r=this.calculateDistance(t,s[0].coordinates);for(let c=1;c<s.length;c++){const u=this.calculateDistance(t,s[c].coordinates);u<r&&(r=u,n=c)}const i=[s.splice(n,1)[0]];for(;s.length>0;){r=Number.MAX_VALUE;let c=0;for(let u=0;u<s.length;u++){const T=this.calculateDistance(i[i.length-1].coordinates,s[u].coordinates);T<r&&(r=T,c=u)}i.push(s.splice(c,1)[0])}return i.reverse()}};o(S,"_instance");let j=S;class nt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",new g);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-card">
                <h4 class="custom-path-card-title">${this.poi.name}</h4>
                <button type="button" id="poi-info-btn">Vedi tappa</button>
                <button type="button" id="poi-delete-btn">Elimina tappa</button>
            </div>
            `}setup(){this.setupPoiInfoBtn(),this.setupPoiDeleteBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector("#poi-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}setupPoiDeleteBtn(){const t=this.shadowRoot.querySelector("#poi-delete-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-deleted",{detail:{deletedPoi:this.poi}}))})}}customElements.define("app-custom-path-card",nt);class ot extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_customPath",{...h.instance.customPath});this.shadowRoot=this.attachShadow({mode:"closed"})}get customPath(){return this._customPath}set customPath(t){this._customPath=t,this.update(),this.setupCardsBeahviour()}connectedCallback(){this.render(),this.update(),this.setup(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-page">
                <h1 tabindex="-1">Percorso personalizzato</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <ul class="custom-path-list" aria-label="Tappe presenti nel percorso"></ul>
                <nav>
                    <button type="button" id="reorder-pois-btn" aria-label="Riordina punti di interesse">Riordina punti di interesse</button>
                    <button type="button" id="save-custom-path-btn" aria-label="Salva percorso">Salva percorso</button>
                </nav>
            </div>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){this.setupSaveCustomPathBtn(),this.setupReorderPoisBtn()}update(){const t=this.shadowRoot.querySelector(".custom-path-list");t&&(t.innerHTML="",this.customPath.pois.forEach(s=>{let n=document.createElement("li"),r=document.createElement("app-custom-path-card");r.poi=s,n.append(r),t.append(n)}))}setupSaveCustomPathBtn(){const t=this.shadowRoot.querySelector("#save-custom-path-btn");t&&t.addEventListener("click",()=>{h.instance.saveCustomPath(),O.instance.updateSnackbar(B.Info,"Percorso personalizzato salvato")})}setupReorderPoisBtn(){const t=this.shadowRoot.querySelector("#reorder-pois-btn");t&&t.addEventListener("click",async()=>{let s=await D.instance.getUserPosition();if(!s)return;const n=j.instance.nearestInsertion(this.customPath.pois,[s.coords.latitude,s.coords.longitude]);this.customPath={...this.customPath,pois:n},h.instance.customPath=this.customPath})}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-custom-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{x.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"}),s.addEventListener("poi-deleted",n=>{let r=this.customPath.pois.filter(i=>i.uuid!==n.detail.deletedPoi.uuid);this.customPath={...this.customPath,pois:r},h.instance.customPath=this.customPath})})}}customElements.define("page-custom-path",ot);class rt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_path",R.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(t){this._path=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-path-card">
                <h4 class="suggested-path-card-title">${this.path.name}</h4>
                <p class="suggested-path-card-length">${this.path.pois.length} tappe</p>
                <button type="button" id="path-info-btn">Apri percorso</button>
            </div>
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector("#path-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("suggested-path-selected",{detail:{selectedSuggestedPath:this.path}}))})}}customElements.define("app-suggested-path-card",rt);class at extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get paths(){return this._paths}set paths(t){this._paths=t,this.update(),this.setupCardsBehaviour()}async connectedCallback(){await h.instance.getCsvPaths(1),this.render(),this.paths=h.instance.getSuggestedPaths(q.instance.activeLayers)}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-paths-page">
                <h1 tabindex="-1" autofocus>Percorsi suggeriti</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <ul class="suggested-paths-list" aria-label="Percorsi suggeriti"></ul>
            </div>
            `}update(){const t=this.shadowRoot.querySelector(".suggested-paths-list");t&&(t.innerHTML="",this.paths.length===0&&t.append(this.renderEmptyMsg()),this.paths.forEach(s=>{let n=document.createElement("li"),r=document.createElement("app-suggested-path-card");r.path=s,n.append(r),t.append(n)}))}setupCardsBehaviour(){this.shadowRoot.querySelectorAll("app-suggested-path-card").forEach(s=>{s.addEventListener("suggested-path-selected",n=>{h.instance.selectedSuggestedPath=n.detail.selectedSuggestedPath,window.location.hash="/selected-suggested-path"})})}renderEmptyMsg(){const t=document.createElement("p");return t.innerHTML="Nessun percorso suggerito per il layer attivato al momento",t}}customElements.define("page-suggested-paths",at);class it extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",new g);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-card">
                <h4 class="custom-path-card-title">${this.poi.name}</h4>
                <button type="button" id="poi-info-btn">Vedi tappa</button>
            </div>
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector("#poi-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-selected-suggested-path-card",it);class ct extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_path",new R("",[]));this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(t){this._path=t,this.update(),this.setupCardsBeahviour()}connectedCallback(){h.instance.getSelectedSuggestedPath(),this.path=h.instance.selectedSuggestedPath,this.render(),this.update(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-path-page">
                <h1 tabindex="-1">${this.path.name}</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <div class="suggested-path-list"></div>
            </div>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}update(){const t=this.shadowRoot.querySelector(".suggested-path-list");t&&(t.innerHTML="",this.path.pois.forEach(s=>{let n=document.createElement("li"),r=document.createElement("app-selected-suggested-path-card");r.poi=s,n.append(r),t.append(n)}))}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-selected-suggested-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{x.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}}customElements.define("page-selected-suggested-path",ct);class lt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_poi",new g);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){x.instance.getSelectedPoi(),this.poi=x.instance.selectedPoi,this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="poi-page">
                <h1 tabindex="-1">${this.poi.name}</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <p>${this.poi.name}</p>
                <button type="button" id="directions-btn">Indicazioni</button>
                <button type="button" id="add-to-custom-path-btn">Aggiungi</button>
                <div class="poi-page-infos"></div>
            </div>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus(),this.renderInfo()}renderInfo(){const t=this.shadowRoot.querySelector(".poi-page-infos");t&&this.poi.props.forEach(s=>{const n=this.renderTopic(s);t.appendChild(n)})}renderTopic(t){const s=document.createElement("div");s.classList.add("property");const n=document.createElement("label");n.classList.add("property-label"),n.innerHTML=t.displayName;const r=document.createElement("p");return r.classList.add("property-value"),t.value!==""?r.innerHTML=t.value:r.innerHTML="-",s.appendChild(n),s.appendChild(r),s}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const t=this.shadowRoot.querySelector("#directions-btn");t&&t.addEventListener("click",()=>{const s=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;window.open(s,"_blank")})}setupAddToCustomPathBtn(){const t=this.shadowRoot.querySelector("#add-to-custom-path-btn");t&&t.addEventListener("click",()=>{O.instance.updateSnackbar(B.Info,"Aggiunto al percorso personalizzato"),h.instance.addPoiToCustomPath(this.poi)})}}customElements.define("page-poi",lt);class V{constructor(){o(this,"fontSize",16);o(this,"letterSpace",0);o(this,"lineHeight",1.15);o(this,"contrast","light-high")}}var L=(a=>(a.Light="light",a.Dark="dark",a.LightHigh="light-high",a.DarkHigh="dark-high",a))(L||{});const w=class w{constructor(){o(this,"_settings",new V);if(w._instance)return w._instance;w._instance=this}get settings(){return this._settings}set settings(e){this._settings=e,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return w._instance||(w._instance=new w),w._instance}getLocalStorageSettings(){const e=localStorage.getItem("settings");if(!e)return;const t=JSON.parse(e),s=this.parseLocalStorageSettings(t);this.settings={...s}}setLocalStorageSettings(){localStorage.setItem("settings",JSON.stringify(this.settings))}setLightContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}setDarkContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightHighContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-dim","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--outline","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--outline-variant","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(255, 255, 255)")}setDarkHighContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--primary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--outline","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--outline-variant","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--inverse-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 0, 0)")}setFontSize(e){document.documentElement.style.setProperty("font-size",e.toString()+"px")}setContrast(){switch(this.settings.contrast){case L.Light:this.setLightContrast();break;case L.Dark:this.setDarkContrast();break;case L.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(e){document.documentElement.style.setProperty("letter-spacing",e.toString()+"rem")}setLineHeight(e){document.documentElement.style.setProperty("line-height",e.toString())}parseLocalStorageSettings(e){let t=new V;return t.contrast=e.contrast,t.fontSize=e.fontSize,t.lineHeight=e.lineHeight,t.letterSpace=e.letterSpace,t}};o(w,"_instance");let M=w;class ut extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_contrast",L.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(t){this._contrast=t,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#light-contrast"),s=this.shadowRoot.querySelector("#dark-contrast"),n=this.shadowRoot.querySelector("#light-high-contrast"),r=this.shadowRoot.querySelector("#dark-high-contrast");!t||!s||!n||!r||(t.addEventListener("change",()=>this.contrast=L.Light),s.addEventListener("change",()=>this.contrast=L.Dark),n.addEventListener("change",()=>this.contrast=L.LightHigh),r.addEventListener("change",()=>this.contrast=L.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(s=>{s.value===this.contrast&&(s.checked=!0)})}}customElements.define("app-settings-contrast",ut);class dt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#font-size-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.fontSize=n})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=this.fontSize.toString())}}customElements.define("app-settings-font-size",dt);class pt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(t){this._letterSpace=t,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#letter-space-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.letterSpace=n/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.letterSpace*100).toString())}}customElements.define("app-settings-letter-space",pt);class ht extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleSlider()}handleSlider(){const t=this.shadowRoot.querySelector('input[type="range"]'),s=Array.from(this.shadowRoot.querySelectorAll("#line-height-values option")).map(n=>parseFloat(n.value));!t||!s||t.addEventListener("input",()=>{let n=parseFloat(t.value);n=s.reduce((i,c)=>Math.abs(c-n)<Math.abs(i-n)?c:i),t.value=n.toString(),this.lineHeight=n/100})}update(){const t=this.shadowRoot.querySelector('input[type="range"]');t&&(t.value=(this.lineHeight*100).toString())}}customElements.define("app-settings-line-height",ht);class gt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_settings",new V);this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t,this.update()}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
            <p class="test-text">
                Questo è un testo di esempio. Le dimensioni e il colore di questo testo cambiano quando cambi le preferenze del tuo display.
            </p>
            `}update(){const t=this.shadowRoot.querySelector(".test-text");t&&(t.style.setProperty("font-size",`${this.settings.fontSize}px`),t.style.setProperty("letter-spacing",`${this.settings.letterSpace}rem`),t.style.setProperty("line-height",this.settings.lineHeight+""))}}customElements.define("app-text-test",gt);class mt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_settings",{...M.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t}connectedCallback(){this.render(),this.setup(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-page">
                <h1 tabindex="-1">Impostazioni</h1>
                <button is="app-menu-btn" aria-label="apri menu">Menu</button>
                <app-settings-contrast></app-settings-contrast>
                <app-settings-font-size></app-settings-font-size>
                <app-settings-letter-space></app-settings-letter-space>
                <app-settings-line-height></app-settings-line-height>
                <app-text-test></app-text-test>
                <button type="button" class="apply-btn">Applica</button>
            </div>

            <style>
                .settings-page {
                    max-width: 500px;
                    margin: auto;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){const t=this.shadowRoot.querySelector("app-settings-contrast"),s=this.shadowRoot.querySelector("app-settings-font-size"),n=this.shadowRoot.querySelector("app-settings-letter-space"),r=this.shadowRoot.querySelector("app-settings-line-height"),i=this.shadowRoot.querySelector(".apply-btn");t&&s&&n&&r&&i&&(t.contrast=this.settings.contrast,s.fontSize=this.settings.fontSize,r.lineHeight=this.settings.lineHeight,n.letterSpace=this.settings.letterSpace,t.addEventListener("contrast-updated",c=>{this.settings.contrast=c.detail.contrast,M.instance.settings.contrast=this.settings.contrast,M.instance.setContrast()}),s.addEventListener("font-size-updated",c=>{this.settings.fontSize=c.detail.fontSize,this.update()}),n.addEventListener("letter-space-updated",c=>{this.settings.letterSpace=c.detail.letterSpace,this.update()}),r.addEventListener("line-height-updated",c=>{this.settings.lineHeight=c.detail.lineHeight,this.update()}),i.addEventListener("click",()=>{window.location.href="/#/around-you",M.instance.settings=this.settings}))}update(){const t=this.shadowRoot.querySelector("app-text-test");t&&(t.settings=this.settings)}}customElements.define("page-settings",mt);class yt extends HTMLElement{constructor(){super();o(this,"shadowRoot");o(this,"_snackbar",z.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get snackbar(){return this._snackbar}set snackbar(t){this._snackbar=t,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>

            <style>
                .snackbar {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    visibility: hidden;
                }

                .info-snackbar {
                    background-color: blue;
                    visibility: visible;
                }

                .error-snackbar {
                    background-color: crimson;
                    visibility: visible;
                }
            </style>
            `}update(){if(this.snackbar.message.length===0)return;const t=this.shadowRoot.querySelector(".snackbar-message");if(t){switch(t.innerHTML=this.snackbar.message,this.snackbar.type){case B.Error:this.renderErrorSnackbar();break;default:this.renderInfoSnackbar();break}setTimeout(()=>this.resetSnackbar(),this.snackbar.duration*1e3)}}renderInfoSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&t.classList.add("info-snackbar")}renderErrorSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&t.classList.add("error-snackbar")}resetSnackbar(){const t=this.shadowRoot.querySelector(".snackbar-message"),s=this.shadowRoot.querySelector(".snackbar");t&&s&&(t.innerHTML="",s.classList.remove("info-snackbar"),s.classList.remove("error-snackbar"))}}customElements.define("app-snackbar",yt);class bt extends HTMLButtonElement{constructor(){super()}connectedCallback(){this.setup()}setup(){this.addEventListener("click",()=>{const e=document.body.querySelector('dialog[is="app-menu"]');e&&e.showModal()})}}customElements.define("app-menu-btn",bt,{extends:"button"});M.instance.getLocalStorageSettings();h.instance.getSavedCustomPath();q.instance.getSavedLayers();const Pt=document.querySelector("app-router"),ft=new _("categories",v.Default,()=>"<page-categories />"),Et=new _("around-you",v.Page,()=>"<page-around-you />"),wt=new _("settings",v.Page,()=>"<page-settings />"),vt=new _("poi",v.Page,()=>"<page-poi />"),St=new _("custom-path",v.Page,()=>"<page-custom-path />"),Lt=new _("suggested-paths",v.Page,()=>"<page-suggested-paths />"),kt=new _("selected-suggested-path",v.Page,()=>"<page-selected-suggested-path />"),Rt=[ft,Et,wt,vt,St,Lt,kt];Pt.addRoutes(Rt);
