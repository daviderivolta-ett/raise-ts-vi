var ot=Object.defineProperty;var rt=(o,e,t)=>e in o?ot(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var a=(o,e,t)=>(rt(o,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();var E=(o=>(o.Default="default",o.Page="page",o.NotFound="not-found",o))(E||{});class C{constructor(e,t,s){a(this,"url");a(this,"type");a(this,"routing");this.url=e,this.type=t,this.routing=s}}class O{constructor(){a(this,"fontSize",14);a(this,"letterSpace",0);a(this,"lineHeight",1.15);a(this,"contrast","dark");a(this,"showSettings",!0)}}var g=(o=>(o.Light="light",o.Dark="dark",o.LightHigh="light-high",o.DarkHigh="dark-high",o))(g||{});const M=class M{constructor(){a(this,"_auth")}static get instance(){return M._instance||(M._instance=new M),M._instance}get auth(){return this._auth||(this._auth=this.loadAuth()),this._auth}set auth(e){this._auth=e,this.saveAuth(e)}handleCredentialResponse(e){if(!e.credential)throw new Error("Errore nell'autenticazione con Google.");try{const t=this.decodeJWTResponse(e.credential);this.auth=t}catch{throw new Error("Errore nella decodifica del token ricevuto da Google: token non valido.")}}decodeJWTResponse(e){let s=e.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),i=decodeURIComponent(atob(s).split("").map(n=>"%"+("00"+n.charCodeAt(0).toString(16)).slice(-2)).join(""));return JSON.parse(i)}saveAuth(e){localStorage.setItem("google-auth",JSON.stringify(e))}loadAuth(){const e=localStorage.getItem("google-auth");return e?JSON.parse(e):null}checkAuth(){if(!this.auth)return!1;const e=this.auth.exp;return e?new Date(e*1e3)>new Date:!1}};a(M,"_instance");let j=M;const m=class m{constructor(){a(this,"_settings",new O);if(m._instance)return m._instance;m._instance=this}get settings(){return this._settings}set settings(e){this._settings=e,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return m._instance||(m._instance=new m),m._instance}getLocalStorageSettings(){const e=localStorage.getItem("settings-vi");if(!e)return;const t=JSON.parse(e),s=this.parseLocalStorageSettings(t);this.settings={...s}}setLocalStorageSettings(){localStorage.setItem("settings-vi",JSON.stringify(this.settings))}setLightContrast(){document.body.classList.remove("dark"),document.body.classList.remove("dark-high"),document.body.classList.remove("light-high"),document.body.classList.add("light")}setDarkContrast(){document.body.classList.remove("light"),document.body.classList.remove("light-high"),document.body.classList.remove("dark-high"),document.body.classList.add("dark")}setLightHighContrast(){document.body.classList.remove("light"),document.body.classList.remove("dark"),document.body.classList.remove("dark-high"),document.body.classList.add("light-high")}setDarkHighContrast(){document.body.classList.remove("light"),document.body.classList.remove("dark"),document.body.classList.remove("light-high"),document.body.classList.add("dark-high")}setFontSize(e){document.documentElement.style.setProperty("font-size",e.toString()+"px")}setContrast(){switch(this.settings.contrast){case g.Light:this.setLightContrast();break;case g.Dark:this.setDarkContrast();break;case g.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(e){document.documentElement.style.setProperty("letter-spacing",e.toString()+"rem")}setLineHeight(e){document.documentElement.style.setProperty("line-height",e.toString())}parseLocalStorageSettings(e){let t=new O;return t.contrast=e.contrast,t.fontSize=e.fontSize,t.lineHeight=e.lineHeight,t.letterSpace=e.letterSpace,t.showSettings=e.showSettings,t}};a(m,"_instance");let l=m;class q{constructor(e,t,s=2){a(this,"type");a(this,"message");a(this,"duration");this.type=e,this.message=t,this.duration=s}static createEmpty(){return new q("info","",2)}}var z=(o=>(o.Error="error",o.Info="info",o))(z||{});const f=class f{constructor(){a(this,"_snackbar",new q(z.Info,""));a(this,"_live",document.body.querySelector("app-snackbar"));if(f._instance)return f._instance;f._instance=this}static get instance(){return f._instance||(f._instance=new f),f._instance}get snackbar(){return this._snackbar}set snackbar(e){this._snackbar=e}get live(){return this._live}set live(e){this._live=e}updateSnackbar(e,t,s=5){this.live&&(this.live.snackbar=new q(e,t,s))}resetSnackbar(){this.live&&this.live.resetSnackbar()}};a(f,"_instance");let k=f;class ct extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(t){this.routes=[...t],this.checkRoute()}checkRoute(){const t=window.location.hash.slice(2)||"categories";this.changeRoute(t)}changeRoute(t){k.instance.resetSnackbar();const s=this.routes.find(n=>n.url===t);if(!j.instance.checkAuth()){window.location.href="/";return}if(this.checkParams(window.location.search),!s){window.location.hash="#/categories";return}this.shadowRoot.innerHTML=s.routing()}checkParams(t){const s=new URLSearchParams(t),i=new O;let n=!1;if(s.forEach(r=>{switch(n=!0,r){case"blind":i.showSettings=!1;break;case"vi":i.fontSize=24,i.contrast=g.DarkHigh;break;case"fine-motor":i.fontSize=24;break;case"color-blindness":i.contrast=g.DarkHigh;break}}),n){const r=window.location.pathname+window.location.hash;history.replaceState(null,"",r)}l.instance.settings={...i}}}customElements.define("app-router",ct);const X=document.createElement("template");X.innerHTML=`
    <div class="loader">
        <div class="loader__spinner"></div>
        <p class="loader__msg">Caricamento...</p>
    </div>
    `;const Y=document.createElement("style");Y.innerHTML=`
    .loader {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loader__spinner {
        bottom: 24px;
        width: 32px;
        height: 32px;
        margin: 16px;
        border-radius: 50%;
        animation: rotate 1s linear infinite;
    }

    .loader__spinner::before {
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
    `;class lt extends HTMLElement{constructor(){super();a(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(X.content.cloneNode(!0)),this.shadowRoot.appendChild(Y.cloneNode(!0))}}customElements.define("app-spinner-loader",lt);class J{constructor(e,t,s){a(this,"propertyName");a(this,"displayName");a(this,"type");this.propertyName=e,this.displayName=t,this.type=s}static createEmpty(){return new J("","","string")}}class T{constructor(){a(this,"id","");a(this,"name","");a(this,"url","");a(this,"method","get");a(this,"params",{});a(this,"tags",[]);a(this,"relevantProperties",[])}static createEmpty(){return{id:"",name:"",url:"",method:"get",params:{},tags:[],relevantProperties:[]}}}const y=class y{constructor(){a(this,"CATEGORIES_URL","./json/categories.json");a(this,"_data",{categories:[]});if(y._instance)return y._instance;y._instance=this}static get instance(){return y._instance||(y._instance=new y),y._instance}get data(){return this._data}set data(e){this._data=e}async getData(){if(this.data.categories.length!==0)return this._data;{let e=await this.fetchAppData(this.CATEGORIES_URL);return e=this.parseData(e),this.data=e,e}}async fetchAppData(e){try{const t=await fetch(e).then(i=>i.json()),s=await Promise.all(t.categories.map(async i=>{const n=await Promise.all(i.groups.map(async r=>{if(typeof r=="string")try{const c=await fetch(r);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return r}));return i.groups=n,i}));return{...t,categories:s}}catch(t){throw console.error("Errore durante il recupero dei dati JSON.",t),t}}parseData(e){return{categories:e.categories.map(s=>({name:s.name,groups:s.groups.map(i=>this.parseGroup(i))}))}}parseGroup(e){return Array.isArray(e)?e:{name:e.name,layers:e.layers.map(t=>this._parseLayer(t))}}_parseLayer(e){const t=T.createEmpty();return e.id&&(t.id=e.id),e.name&&(t.name=e.name),e.url&&(t.url=e.url),e.get&&(t.method="get",t.params={...e.get}),e.post&&(t.method="post",t.params={...e.post}),e.tags&&(t.tags=[...e.tags]),e.relevant_properties&&(t.relevantProperties=e.relevant_properties.map(s=>this._parseProperty(s))),t}_parseProperty(e){let t=J.createEmpty();return e.property_name&&(t.propertyName=e.property_name),e.display_name&&(t.displayName=e.display_name),e.type&&(t.type=e.type),t}getAllTags(e){let t=[];return e.categories.map(i=>{i.groups.map(n=>{typeof n!="string"&&n.layers.map(r=>{r.tags.map(c=>{t.push(c)})})})}),[...new Set(t)]}filterLayersByTags(e){let t=[];return e.forEach(i=>{this.filterLayersByTag(i).forEach(r=>t.push(r))}),[...new Set(t)]}filterLayersByTag(e){let t=[];return t=this.data.categories.flatMap(s=>s.groups.flatMap(i=>typeof i=="string"?[T.createEmpty()]:i.layers.filter(n=>n.tags.some(r=>r.includes(e))))),t}getLayerById(e){for(const t of this.data.categories)for(const s of t.groups){if(typeof s=="string")continue;const i=s.layers.find(n=>n.id===e);if(i)return i}}};a(y,"_instance");let H=y;class G extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_tag","");this.shadowRoot=this.attachShadow({mode:"closed"})}get tag(){return this._tag}set tag(t){this._tag=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <button type="button" class="tag-chip">${this.tag.charAt(0).toUpperCase()+this.tag.slice(1)}</button>

            <style>
                .tag-chip {
                    cursor: pointer;
                    width: 100%;
                    display: block;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border: 1px solid var(--outline);
                    padding: 8px 8px;
                    border-radius: var( --border-radius-s);
                    font-size: 1rem;
                    letter-spacing: inherit;
                    line-height: inherit;
                }

                .tag-chip:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }
            </style>
            `}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{bubbles:!0,composed:!0,detail:{id:this.id}}))})}}customElements.define("app-tag-chip",G);const Q=document.createElement("template");Q.innerHTML=`
    <div class="categories-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Esplora macrocategorie</h1>
        </div>
        <p class="desc">Scegli una macrocategoria per conoscere le sue sottocategorie.</p>
        <div class="list">
            <paginated-list page-elements="13" current-page="0"></paginated-list>
        </div>
    </div>
    `;const K=document.createElement("style");K.innerHTML=`
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
        
    .title {
        text-align: center;
        font-size: 1rem;
    }

    .desc {
        text-align: center;
        color: var(--on-surface-variant);
        margin: 0 0 24px 0;
    }
    `;class dt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_list");a(this,"_tags",[]);a(this,"_onTagSelected",t=>{const s=t;window.location.hash=`/layers?layer=${s.detail.id}`});this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Q.content.cloneNode(!0)),this.shadowRoot.appendChild(K.cloneNode(!0)),this._list=this.shadowRoot.querySelector("paginated-list")}set tags(t){this._tags=t,this._render()}async connectedCallback(){const t=await H.instance.getData();this.tags=H.instance.getAllTags(t).sort(),this._setup()}disconnectedCallback(){this.removeEventListener("tag-selected",this._onTagSelected)}_render(){this._tags.forEach(t=>{const s=new G;s.id=t,s.tag=t,this._list.appendChild(s)})}_setup(){this.addEventListener("tag-selected",this._onTagSelected)}}customElements.define("page-categories",dt);const b=class b{constructor(){a(this,"_activeLayers",[]);if(b._instance)return b._instance;b._instance=this}static get instance(){return b._instance||(b._instance=new b),b._instance}get activeLayers(){return this._activeLayers}set activeLayers(e){this._activeLayers=e,localStorage.setItem("layers-vi",JSON.stringify(this.activeLayers))}getSavedLayers(){const e=localStorage.getItem("layers-vi");if(!e)return;const t=JSON.parse(e);let s=[];s=t.map(i=>this.parseLayer(i)),this._activeLayers=s}parseLayer(e){const t=T.createEmpty();return e.id&&(t.id=e.id),e.name&&(t.name=e.name),e.url&&(t.url=e.url),e.method&&(t.method=e.method),e.params&&(t.params={...e.params}),e.tags&&(t.tags=[...e.tags]),e.relevantProperties&&(t.relevantProperties=e.relevantProperties),t}};a(b,"_instance");let N=b;const Z=document.createElement("template");Z.innerHTML=`
    <div class="layers-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Scegli una categoria</h1>
        </div>
        <p class="desc">Scegli una categoria per cercare i punti di interesse associati.</p>
        <div class="list">
            <paginated-list page-elements="13" current-page="0"></paginated-list>
        </div>
    </div>
    `;const V=document.createElement("style");V.innerHTML=`
    h1,
    p {
        font-weight: 400;
        margin: 0;
    }

    .layers-page {
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
        
    .title {
        text-align: center;
        font-size: 1rem;
    }

    .desc {
        text-align: center;
        color: var(--on-surface-variant);
        margin: 0 0 24px 0;
    }
    `;class ht extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_list");a(this,"_layers",[]);a(this,"_onTagSelected",t=>{const s=t,i=H.instance.getLayerById(s.detail.id);i&&(N.instance.activeLayers=[i]),window.location.hash="/around-me"});this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(Z.content.cloneNode(!0)),this.shadowRoot.appendChild(V.cloneNode(!0)),this._list=this.shadowRoot.querySelector("paginated-list")}set layers(t){this._layers=t}async connectedCallback(){const t=window.location.hash.slice(2),i=new URLSearchParams(t.slice(t.indexOf("?"))).get("layer");if(!i){window.location.hash="/categories";return}await H.instance.getData(),this.layers=H.instance.filterLayersByTag(i).sort((n,r)=>n.name.localeCompare(r.name)),this._render(),this._setup()}disconnectedCallback(){this.removeEventListener("tag-selected",this._onTagSelected)}_render(){this._layers.forEach(t=>{const s=new G;s.id=t.id,s.tag=t.name,this._list.appendChild(s)})}_setup(){this.addEventListener("tag-selected",this._onTagSelected)}}customElements.define("page-layers",ht);const tt=document.createElement("template");tt.innerHTML=`
    <div class="paginated-list">
        <div class="list">
            <slot></slot>
        </div>
        <div class="pagination">
            <button type="button" class="pagination-btn prev-btn" aria-label="Pagina precedente">
                <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
            </button>
            <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">
                <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
            </button>
        </div>
    </div>
    `;const et=document.createElement("style");et.innerHTML=`
    button {
        cursor: pointer;
        font-family: 'Inter', Arial, Helvetica, sans-serif;
        font-size: 1rem;

        &[disabled] {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    .list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .pagination {
        display: none;
        margin: 8px 0 0 0;
    }

    .pagination--visible {
        display: flex;
        justify-content: space-between;
        align-items: center;
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

        &:hover {
            opacity: .8;
        }
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
    `;class st extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_slot");a(this,"_slottedElements",[]);a(this,"_pagination");a(this,"_prevBtn");a(this,"_nextBtn");a(this,"_hasPagination",!1);a(this,"_pageElements",10);a(this,"_currentPage",0);this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(tt.content.cloneNode(!0)),this.shadowRoot.appendChild(et.cloneNode(!0)),this._slot=this.shadowRoot.querySelector("slot"),this._pagination=this.shadowRoot.querySelector(".pagination"),this._prevBtn=this.shadowRoot.querySelector(".prev-btn"),this._nextBtn=this.shadowRoot.querySelector(".next-btn")}get hasPagination(){return this._hasPagination}set hasPagination(t){this._hasPagination=t}set pageElements(t){this._pageElements=t,this._checkPagination()}set currentPage(t){this._currentPage=t,this._changePage(t)}connectedCallback(){this._setup()}disconnectedCallback(){}attributeChangedCallback(t,s,i){t==="page-elements"&&i!==s&&(this.pageElements=parseInt(i)),t==="current-page"&&i!==s&&(parseInt(i)>=0&&parseInt(i)<=this._getPagesNumber()?this.currentPage=parseInt(i):parseInt(i)<0?this.setAttribute("current-page","0"):this.setAttribute("current-page",`${this._getPagesNumber()}`))}_setup(){this._slot.onslotchange=()=>this._onSlotChange(),this._prevBtn.onclick=()=>this._onPrevClick(),this._nextBtn.onclick=()=>this._onNextClick()}_onSlotChange(){this._checkPagination(),this._checkBtnStatus(),this._paginateElements(this._currentPage)}_onPrevClick(){this.setAttribute("current-page",JSON.stringify(this._currentPage-1))}_onNextClick(){this.setAttribute("current-page",JSON.stringify(this._currentPage+1))}_checkPagination(){this._slottedElements=this._slot.assignedElements(),this._slottedElements.length>=this._pageElements?this._pagination.classList.add("pagination--visible"):this._pagination.classList.remove("pagination--visible")}_changePage(t){this._checkBtnStatus(),this._paginateElements(t)}_getPagesNumber(){return Math.floor(this._slottedElements.length/this._pageElements)}_checkBtnStatus(){this._prevBtn.disabled=this._currentPage===0,this._nextBtn.disabled=this._currentPage===this._getPagesNumber()}_paginateElements(t){const s=t*this._pageElements,i=Math.min(s+this._pageElements,this._slottedElements.length);this._slottedElements.forEach(n=>{const r=n;r.style.display="none"});for(let n=s;n<i;n++){const r=this._slottedElements[n];r.style.display=""}}}a(st,"observedAttributes",["page-elements","current-page"]);customElements.define("paginated-list",st);var h=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(h||{});class P{constructor(){a(this,"uuid","");a(this,"name","");a(this,"type","Point");a(this,"coordinates",[]);a(this,"layer",T.createEmpty());a(this,"layerName","");a(this,"props",[]);a(this,"distance")}static fromFeature(e){const t=new P;switch(t.uuid=e.properties.uuid,t.name=e.properties.name,e.geometry.type){case h.LineString:t.type="LineString";break;case h.Polygon:t.type="Polygon";break;case h.MultiPoint:t.type="MultiPoint";break;case h.MultiLineString:t.type="MultiLineString";break;case h.MultiPolygon:t.type="MultiPolygon";break;default:t.type="Point";break}t.coordinates=e.geometry.coordinates,t.layerName=e.properties.layerName;for(const s in e.properties){if(typeof e.properties[s]!="object")continue;let i=new W;switch(i.displayName=e.properties[s].displayName,i.value=e.properties[s].value,e.properties[s].type){case"number":i.type="number";break;case"image":i.type="image";break;default:i.type="string";break}t.props.push(i)}return t}}var d=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(d||{});class W{constructor(){a(this,"displayName","");a(this,"type","string");a(this,"value","")}}var I=(o=>(o.String="string",o.Image="image",o.Number="number",o))(I||{});const u=class u{constructor(){if(u._instance)return u._instance;u._instance=this}static get instance(){return u._instance||(u._instance=new u),u._instance}async getPoisFromLayer(e){const t=await this.fetchLayerData(e);let s;return e.method==="get"&&(s=this._createGeoJsonFromLayerWithGetUrl(t,e)),e.method==="post"&&(s=this._createGeoJsonFromLayerWithPostUrl(t,e)),s.features.slice(0,20).map(i=>this._parseFeature(i,e)).filter(i=>i.type===d.Point)}_parseFeature(e,t){let s=new P;if(e.properties&&e.properties.uuid&&(s.uuid=e.properties.uuid),e.properties&&e.properties.customName&&(s.name=e.properties.customName),e.properties&&e.properties.layerId&&(s.layerName=e.properties.layerId),e.properties&&e.properties.props&&(s.props=[...e.properties.props]),s.layer=t,e.geometry)switch(e.geometry.type){case"Point":s.coordinates=e.geometry.coordinates,s.type=d.Point;break;case"LineString":s.coordinates=e.geometry.coordinates,s.type=d.LineString;break;case"Polygon":s.coordinates=e.geometry.coordinates,s.type=d.Polygon;break;default:console.warn(`Unsupported geometry type: ${e.geometry.type}`),s.type=d.Polygon}return s}async fetchLayerData(e){switch(e.method){case"get":const t=this._createGetUrl(e);try{const i=await fetch(t);if(i.ok)return await i.json();throw new Error("Errore nel recupero dei dati del layer")}catch{throw new Error("Errore nel recupero dei dati del layer")}case"post":const s=this._createPostQuery(e);try{const i=await fetch(e.url,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({data:s}).toString()});if(i.ok)return await i.json();throw new Error("Errore nel recupero dei dati del layer")}catch{throw new Error("Errore nel recupero dei dati del layer")}}}_createGetUrl(e){const t=new Map(Object.entries(e.params)),s=Array.from(t,([n,r])=>[n,String(r)]),i=new URLSearchParams(s);return`${e.url}?${i.toString()}`}_createPostQuery(e){const t=[44.3654649485199,8.70205291300195,44.499460199499595,9.026271898848734];let s=`[out:json][timeout:20];
(
`;for(const i in e.params)if(e.params.hasOwnProperty(i)){const n=e.params[i];n.startsWith("~")?s+=`nwr["${i}"~"${n.slice(1)}"](${t[0]},${t[1]},${t[2]},${t[3]});
`:s+=`nwr["${i}"="${n}"](${t[0]},${t[1]},${t[2]},${t[3]});
`}return s+=`);
out geom;`,s}_createGeoJsonFromLayerWithGetUrl(e,t){let s={type:"FeatureCollection",features:[]};return e.features&&Array.isArray(e.features)&&(s.features=e.features.map((i,n)=>{let r={customName:i.properties.name?i.properties.name:`${t.name} ${n}`,layerId:t.id,uuid:this._createFeatureUuid(t.id,i),props:this._createFeatureProps(i.properties,t.relevantProperties)};return{...i,properties:r}})),s}_createFeatureUuid(e,t){const s=i=>i.toString().replace(/\D/g,"");switch(t.geometry.type){case"Point":const i=t.geometry.coordinates[0]+t.geometry.coordinates[1];return e+s(i);case"LineString":const n=t.geometry.coordinates[0][0]+t.geometry.coordinates[0][1];return e+s(n);case"Polygon":const r=t.geometry.coordinates[0][0][0]+t.geometry.coordinates[0][0][1];return e+s(r);case"MultiPoint":const c=t.geometry.coordinates[0][0]+t.geometry.coordinates[0][1];return e+s(c);case"MultiLineString":const p=t.geometry.coordinates[0][0][0]+t.geometry.coordinates[0][0][1];return e+s(p);case"MultiPolygon":const _=t.geometry.coordinates[0][0][0][0]+t.geometry.coordinates[0][0][0][1];return e+s(_);case"GeometryCollection":return e+this._createFeatureUuid(e,{type:"Feature",geometry:t.geometry.geometries[0]});default:return""}}_createFeatureProps(e,t){return Object.keys(e).map(s=>{const i=t.find(n=>n.propertyName===s);return i&&e[s]!==void 0&&e[s]!==null?{propertyName:i.propertyName,displayName:i.displayName,type:i.type,value:e[s]}:null}).filter(s=>s!==null)}_createGeoJsonFromLayerWithPostUrl(e,t){const s={type:"FeatureCollection",features:[]};for(const i of e.elements)switch(i.type){case"node":s.features.push(this._createGeoJsonPointFeature(i,t));break}return s}_createGeoJsonPointFeature(e,t){return{type:"Feature",properties:{customName:e.tags.name?e.tags.name:`${t.name}`,layerId:t.id,uuid:this._createFeatureUuid(t.id,{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[e.lon,e.lat]}}),props:this._createFeatureProps(e.tags,t.relevantProperties)},geometry:{type:"Point",coordinates:[e.lon,e.lat]}}}orderPoisByDistance(e,t){return t.forEach(s=>{if(!u.instance.isCoordinatesMultidimensional(s.coordinates)){const i=Array.isArray(s.coordinates)?s.coordinates[1]:s.coordinates,n=Array.isArray(s.coordinates)?s.coordinates[0]:s.coordinates,r=this.haversineDistance(i,n,e.coords.latitude,e.coords.longitude);s.distance=r}}),t.sort((s,i)=>s.distance&&i.distance?s.distance-i.distance:0),t}isCoordinatesMultidimensional(e){if(!Array.isArray(e))return!1;for(let t=0;t<e.length;t++)if(Array.isArray(e[t]))return!0;return!1}haversineDistance(e,t,s,i){const n=e*Math.PI/180,r=s*Math.PI/180,p=(i-t)*Math.PI/180;return Math.acos(Math.sin(n)*Math.sin(r)+Math.cos(n)*Math.cos(r)*Math.cos(p))*6371e3}};a(u,"_instance");let D=u;const v=class v{constructor(){a(this,"_selectedPoi",new P);if(v._instance)return v._instance;v._instance=this}static get instance(){return v._instance||(v._instance=new v),v._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(e){this._selectedPoi=e,localStorage.setItem("selected-poi-vi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const e=localStorage.getItem("selected-poi-vi");if(!e)return;const t=JSON.parse(e);this._selectedPoi=this.parsePoi(t)}parsePoi(e){let t=new P;switch(t.uuid=e.uuid,t.name=e.name,e.type){case h.LineString:e.type=d.LineString;break;case h.Polygon:e.type=d.Polygon;break;case h.MultiPoint:e.type=d.MultiPoint;break;case h.MultiLineString:e.type=d.MultiLineString;break;case h.MultiPolygon:e.type=d.MultiPolygon;break;default:e.type=d.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName,t.layer=N.instance.parseLayer(e.layer);for(const s in e.props){if(typeof e.props[s]!="object")continue;let i=new W;switch(i.displayName=e.props[s].displayName,i.value=e.props[s].value,e.props[s].type){case"number":i.type=I.Number;break;case"image":i.type=I.Image;break;default:i.type=I.String;break}t.props.push(i)}return e.distance&&(t.distance=e.distance),t}};a(v,"_instance");let A=v;const w=class w{constructor(){a(this,"listeners",{});if(w._instance)return w._instance;w._instance=this}static get instance(){return w._instance||(w._instance=new w),w._instance}subscribe(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t)}unsubscribe(e,t){this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(s=>s!==t))}unsubscribeAll(e){delete this.listeners[e]}publish(e,t){this.listeners[e]&&this.listeners[e].forEach(s=>s(t))}};a(w,"_instance");let F=w;const S=class S{constructor(){a(this,"_position",null);a(this,"_watchId",null);if(S._instance)return S._instance;S._instance=this}static get instance(){return S._instance||(S._instance=new S),S._instance}get position(){return this._position}set position(e){this._position=e,F.instance.publish("position-update",this.position)}get watchId(){return this._watchId}set watchId(e){this._watchId=e}async getUserPosition(){try{return await new Promise((t,s)=>{navigator.geolocation.getCurrentPosition(i=>{t(i)},i=>{s(i)},{timeout:5e3})})}catch(e){throw e}}async startWatchingPosition(){this.watchId=navigator.geolocation.watchPosition(e=>this.position=e,e=>{console.error(e),this.position=null},{enableHighAccuracy:!1,timeout:5e3,maximumAge:0})}stopWatchingPosition(){this.watchId&&(navigator.geolocation.clearWatch(this.watchId),this.watchId=null)}};a(S,"_instance");let B=S;class it extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new P);a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){var t;this.shadowRoot.innerHTML=`
            <article class="poi-card" aria-labelledby="poi-card-title-${this.position}" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="poi-card-info">
                    <p class="poi-card-title" id="poi-card-title-${this.position}">${((t=this.poi.props.find(s=>s.displayName==="Nome"))==null?void 0:t.value)||this.poi.name}</p>
                    <p class="poi-card-distance" role="text" aria-label="Distanza da te: ${Math.round(this.poi.distance)} metri">${Math.round(this.poi.distance)}<span aria-hidden="true">m</span></p>
                </div>
                <button type="button" class="info-btn" aria-label="Vedi dettagli punto di interesse">
                    <span class="material-symbols-outlined">chevron_right</span>
                </button>
            </article>

            <style>
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
            `}setup(){const t=this.shadowRoot.querySelector(".info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{composed:!0,bubbles:!0,detail:{selectedPoi:this.poi}}))})}}customElements.define("app-poi-card",it);const at=document.createElement("template");at.innerHTML=`
    <div class="around-me-page">
        <div class="page-header">
            <h1 tabindex="-1" class="title">Punti di interesse</h1>
        </div>
        <p class="desc">Elenco punti di interesse nelle vicinanze</p>
        <section class="around-you-features" role="feed"></section>
        <div class="message"></div>
    </div>
    `;const nt=document.createElement("style");nt.innerHTML=`
    h1,
    p {
        font-weight: 400;
        margin: 0;
    }
    
    .around-me-page {
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

    .title {
        text-align: center;
        font-size: 1rem;
    }

    .desc {
        text-align: center;
        color: var(--on-surface-variant);
        margin: 0 0 24px 0;
    }

    .around-you-features {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .message {
        text-align: center;
    }
    `;class pt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_heading");a(this,"_list");a(this,"_message");a(this,"_pois",[]);a(this,"_onPoiSelected",t=>{const s=t;A.instance.selectedPoi=s.detail.selectedPoi,window.location.hash="/poi"});this.shadowRoot=this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(at.content.cloneNode(!0)),this.shadowRoot.appendChild(nt.cloneNode(!0)),this._heading=this.shadowRoot.querySelector(".title"),this._list=this.shadowRoot.querySelector(".around-you-features"),this._message=this.shadowRoot.querySelector(".message")}set pois(t){this._pois=t}async connectedCallback(){k.instance.updateSnackbar(z.Info,"Caricamento..."),this._updateMsg("loading");let t=null;try{t=await B.instance.getUserPosition();const s=await D.instance.getPoisFromLayer(N.instance.activeLayers[0]);this.pois=D.instance.orderPoisByDistance(t,s),this._pois.length===0&&this._updateMsg("empty")}catch{this._updateMsg("error")}finally{this._render(),this._setup(),this._pois.length!==0&&this._updateMsg(),k.instance.resetSnackbar()}}disconnectedCallback(){this.removeEventListener("poi-selected",this._onPoiSelected)}async _render(){this._heading.innerHTML=this._pois[0]?this._pois[0].layer.name:"Punti di interesse",this._list.innerHTML="",this._pois.forEach((t,s)=>{const i=new it;i.poi=t,i.position=s+1,this._list.appendChild(i)})}_setup(){this.addEventListener("poi-selected",this._onPoiSelected)}_updateMsg(t){switch(this._message.innerHTML="",t){case"loading":this._message.innerHTML="<app-spinner-loader />";break;case"error":this._message.innerText=`Impossibile trovare la tua posizione.

Per mostrare i punti di interesse nelle vicinanze è necessario concedere all'app l'autorizzazione ad accedere alla posizione del dispositivo.`;break;case"empty":this._message.innerText=`Sembra non ci siano punti di interesse per la categoria selezionata.

Andare nella sezione "Categorie" e sceglierne un'altra.`;break}}}customElements.define("page-around-me",pt);class ${constructor(e,t){a(this,"name");a(this,"pois");this.name=e,this.pois=t}static createEmpty(){return new $("",[])}}const L=class L{constructor(){a(this,"_customPath",new $("Percorso personalizzato",[]));if(L._instance)return L._instance;L._instance=this}static get instance(){return L._instance||(L._instance=new L),L._instance}get customPath(){return this._customPath}set customPath(e){this._customPath=e}addPoiToCustomPath(e){if(this.isPoiInCustomPath(e))return;const t={...this.customPath};t.pois.unshift(e),this.customPath={...t}}isPoiInCustomPath(e){return this.customPath.pois.some(t=>t.uuid===e.uuid)}saveCustomPath(){localStorage.setItem("custom-path-vi",JSON.stringify(this.customPath))}getSavedCustomPath(){const e=localStorage.getItem("custom-path-vi");if(!e)return;const t=JSON.parse(e);this._customPath=this.parsePath(t)}parsePath(e){let t=new $(e.name,e.pois);return t.pois=t.pois.map(s=>this.parsePoi(s)),t}parsePoi(e){let t=new P;switch(t.uuid=e.uuid,t.name=e.name,e.type){case h.LineString:e.type=d.LineString;break;case h.Polygon:e.type=d.Polygon;break;case h.MultiPoint:e.type=d.MultiPoint;break;case h.MultiLineString:e.type=d.MultiLineString;break;case h.MultiPolygon:e.type=d.MultiPolygon;break;default:e.type=d.Point;break}t.coordinates=e.coordinates,t.layerName=e.layerName;for(const s in e.props){if(typeof e.props[s]!="object")continue;let i=new W;switch(i.displayName=e.props[s].displayName,i.value=e.props[s].value,e.props[s].type){case"number":i.type=I.Number;break;case"image":i.type=I.Image;break;default:i.type=I.String;break}t.props.push(i)}return e.distance&&(t.distance=e.distance),t}};a(L,"_instance");let R=L;const x=class x{constructor(){x._instance||(x._instance=this)}static get instance(){return x._instance||(x._instance=new x),x._instance}calculateDistance(e,t){const s=e[0]-t[0],i=e[1]-t[1];return Math.sqrt(s*s+i*i)}nearestInsertion(e,t){const s=[...e];let i=0,n=this.calculateDistance(t,s[0].coordinates);for(let c=1;c<s.length;c++){const p=this.calculateDistance(t,s[c].coordinates);p<n&&(n=p,i=c)}const r=[s.splice(i,1)[0]];for(;s.length>0;){n=Number.MAX_VALUE;let c=0;for(let p=0;p<s.length;p++){const _=this.calculateDistance(r[r.length-1].coordinates,s[p].coordinates);_<n&&(n=_,c=p)}r.push(s.splice(c,1)[0])}return r.reverse()}};a(x,"_instance");let U=x;class ut extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new P);a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}get position(){return this._position}set position(t){this._position=t}connectedCallback(){this.render(),this.setup()}render(){var t;this.shadowRoot.innerHTML=`
            <article class="custom-path-card" aria-labelledby="custom-path-card-title" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="custom-path-card-info">
                    <h3 class="custom-path-card-title" id="custom-path-card-title">${((t=this.poi.props.find(s=>s.displayName==="Nome"))==null?void 0:t.value)||this.poi.name}</h3>
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
            `}setup(){this.setupPoiInfoBtn(),this.setupPoiDeleteBtn()}setupPoiInfoBtn(){const t=this.shadowRoot.querySelector(".poi-info-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}setupPoiDeleteBtn(){const t=this.shadowRoot.querySelector(".poi-delete-btn");t&&t.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-deleted",{detail:{deletedPoi:this.poi}}))})}}customElements.define("app-custom-path-card",ut);class gt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_customPath",{...R.instance.customPath});this.shadowRoot=this.attachShadow({mode:"closed"})}get customPath(){return this._customPath}set customPath(t){this._customPath=t,this.update(),this.setupCardsBeahviour()}connectedCallback(){this.render(),this.update(),this.setup(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="custom-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Percorso personalizzato</h1>
                </div>
                <section class="custom-path-list" role="feed"></section>
                <div class="custom-path-tools">
                    <button type="button" id="reorder-pois-btn" class="tool-btn" title="Ottimizza ordine punti di interesse">
                        <span class="material-symbols-outlined tool-icon" aria-hidden="true">sort</span>
                    </button>
                    <button type="button" id="save-custom-path-btn" class="tool-btn" title="Salva percorso personalizzato">
                        <span class="material-symbols-outlined tool-icon" aria-hidden="true">bookmark</span>
                    </button>
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

                .custom-path-tools {
                    position: fixed;
                    left: 50%;
                    bottom: calc(3rem + 2px);
                    transform: translateX(-50%);
                    display: flex;
                    justify-content: space-between;
                    gap: 1px;
                    width: 100%;
                    max-width: 576px;
                    min-height: 3rem;
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
                    border-radius: var(--border-radius-s);
                }

                .tool-btn:hover {
                    color: var(--on-surface-variant);
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.6rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){this.setupSaveCustomPathBtn(),this.setupReorderPoisBtn()}update(){const t=this.shadowRoot.querySelector(".custom-path-list");t&&(t.innerHTML="",this.customPath.pois.length===0&&t.append(this.renderEmptyMsg()),this.customPath.pois.forEach((s,i)=>{let n=document.createElement("app-custom-path-card");n.poi=s,n.position=i+1,t.append(n)}))}setupSaveCustomPathBtn(){const t=this.shadowRoot.querySelector("#save-custom-path-btn");t&&t.addEventListener("click",()=>{R.instance.saveCustomPath(),k.instance.updateSnackbar(z.Info,"Percorso personalizzato salvato")})}setupReorderPoisBtn(){const t=this.shadowRoot.querySelector("#reorder-pois-btn");t&&t.addEventListener("click",async()=>{let s=await B.instance.getUserPosition();if(!s)return;const i=U.instance.nearestInsertion(this.customPath.pois,[s.coords.latitude,s.coords.longitude]);this.customPath={...this.customPath,pois:i},R.instance.customPath=this.customPath,k.instance.updateSnackbar(z.Info,`Tappe riordinate secondo il percorso ottimale. Ordine attuale: ${this.customPath.pois.map(n=>n.name).join(", ")}.`)})}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-custom-path-card").forEach(s=>{s.addEventListener("poi-selected",i=>{A.instance.selectedPoi=i.detail.selectedPoi,window.location.hash="/poi"}),s.addEventListener("poi-deleted",i=>{let n=this.customPath.pois.filter(r=>r.uuid!==i.detail.deletedPoi.uuid);this.customPath={...this.customPath,pois:n},R.instance.customPath=this.customPath,k.instance.updateSnackbar(z.Info,`Tappa ${i.detail.deletedPoi.name} rimossa`)})})}renderEmptyMsg(){const t=document.createElement("p");return t.classList.add("empty-msg"),t.innerHTML="Nessuna tappa attualmente presente nel percorso personalizzato",t}}customElements.define("page-custom-path",gt);class mt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new P);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(t){this._poi=t}connectedCallback(){A.instance.getSelectedPoi(),this.poi=A.instance.selectedPoi,console.log(this.poi),this.render(),this.setup()}render(){var s;this.shadowRoot.innerHTML=`
            <div class="poi-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Dettaglio punto di interesse</h1>
                </div>
                <h2 class="poi-name">${((s=this.poi.props.find(i=>i.displayName==="Nome"))==null?void 0:s.value)||this.poi.name}</h2>
                <p class="poi-category">${this.poi.layer.name}</p>
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
                    letter-spacing: inherit;
                    line-height: inherit;
                }

                #add-to-custom-path-btn {
                    color: var(--on-surface);
                    background-color: var(--surface-container-high);
                    border: 1px solid var(--outline);
                    border-radius: var(--border-radius-circle);
                    letter-spacing: inherit;
                    line-height: inherit;
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
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus(),this.renderInfo()}renderInfo(){const t=this.shadowRoot.querySelector(".poi-page-infos");t&&this.poi.props.forEach(s=>{const i=this.renderTopic(s);t.appendChild(i)})}renderTopic(t){const s=document.createElement("div");s.classList.add("property");const i=document.createElement("label");i.classList.add("property-label"),i.innerHTML=t.displayName;const n=document.createElement("p");return n.classList.add("property-value"),t.value!==""?n.innerHTML=t.value:n.innerHTML="-",s.appendChild(i),s.appendChild(n),s}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const t=this.shadowRoot.querySelector("#directions-btn");t&&t.addEventListener("click",()=>{const s=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}&travelmode=walking`;window.open(s,"_blank")})}setupAddToCustomPathBtn(){const t=this.shadowRoot.querySelector("#add-to-custom-path-btn");t&&t.addEventListener("click",()=>{k.instance.updateSnackbar(z.Info,"Aggiunto al percorso personalizzato"),R.instance.addPoiToCustomPath(this.poi)})}}customElements.define("page-poi",mt);class ft extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_contrast",g.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(t){this._contrast=t,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#light-contrast"),s=this.shadowRoot.querySelector("#dark-contrast"),i=this.shadowRoot.querySelector("#light-high-contrast"),n=this.shadowRoot.querySelector("#dark-high-contrast");!t||!s||!i||!n||(t.addEventListener("change",()=>this.contrast=g.Light),s.addEventListener("change",()=>this.contrast=g.Dark),i.addEventListener("change",()=>this.contrast=g.LightHigh),n.addEventListener("change",()=>this.contrast=g.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(s=>{s.value===this.contrast&&(s.checked=!0)})}}customElements.define("app-settings-contrast",ft);class yt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(t){this._fontSize=t,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-font-size">
                <h2 class="settings-title">Dimensione testo</h2>
                <div class="font-size-option-list">
                    <div class="font-size-option">
                        <input type="radio" id="font-size-s" name="font-size" value="14">
                        <label for="font-size-s" aria-label="Dimensione font: S">S</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-m" name="font-size" value="20">
                        <label for="font-size-m" aria-label="Dimensione font: M">M</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-l" name="font-size" value="24">
                        <label for="font-size-l" aria-label="Dimensione font: L">L</label>
                    </div>
                    <div class="font-size-option">
                        <input type="radio" id="font-size-xl" name="font-size" value="32">
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#font-size-s"),s=this.shadowRoot.querySelector("#font-size-m"),i=this.shadowRoot.querySelector("#font-size-l"),n=this.shadowRoot.querySelector("#font-size-xl");!t||!s||!i||!n||(t.addEventListener("change",()=>this.fontSize=parseInt(t.value)),s.addEventListener("change",()=>this.fontSize=parseInt(s.value)),i.addEventListener("change",()=>this.fontSize=parseInt(i.value)),n.addEventListener("change",()=>this.fontSize=parseInt(n.value)))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="font-size"]')).forEach(s=>{s.value===this.fontSize.toString()&&(s.checked=!0)})}}customElements.define("app-settings-font-size",yt);class bt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(t){this._letterSpace=t,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#letter-space-s"),s=this.shadowRoot.querySelector("#letter-space-m"),i=this.shadowRoot.querySelector("#letter-space-l"),n=this.shadowRoot.querySelector("#letter-space-xl");!t||!s||!i||!n||(t.addEventListener("change",()=>this.letterSpace=parseInt(t.value)/100),s.addEventListener("change",()=>this.letterSpace=parseInt(s.value)/100),i.addEventListener("change",()=>this.letterSpace=parseInt(i.value)/100),n.addEventListener("change",()=>this.letterSpace=parseInt(n.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="letter-spacing"]')).forEach(s=>{s.value===(this.letterSpace*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-letter-space",bt);class vt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(t){this._lineHeight=t,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const t=this.shadowRoot.querySelector("#line-height-s"),s=this.shadowRoot.querySelector("#line-height-m"),i=this.shadowRoot.querySelector("#line-height-l"),n=this.shadowRoot.querySelector("#line-height-xl");!t||!s||!i||!n||(t.addEventListener("change",()=>this.lineHeight=parseInt(t.value)/100),s.addEventListener("change",()=>this.lineHeight=parseInt(s.value)/100),i.addEventListener("change",()=>this.lineHeight=parseInt(i.value)/100),n.addEventListener("change",()=>this.lineHeight=parseInt(n.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="line-height"]')).forEach(s=>{s.value===Math.round(this.lineHeight*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-line-height",vt);class wt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_settings",{...l.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(t){this._settings=t}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="settings-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Impostazioni</h1>
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
            `;const t=this.shadowRoot.querySelector("h1");t&&t.focus()}setup(){const t=this.shadowRoot.querySelector("app-settings-contrast"),s=this.shadowRoot.querySelector("app-settings-font-size"),i=this.shadowRoot.querySelector("app-settings-letter-space"),n=this.shadowRoot.querySelector("app-settings-line-height");t&&s&&i&&n&&(t.contrast=this.settings.contrast,s.fontSize=this.settings.fontSize,n.lineHeight=this.settings.lineHeight,i.letterSpace=this.settings.letterSpace,t.addEventListener("contrast-updated",r=>{this.settings.contrast=r.detail.contrast,l.instance.settings.contrast=this.settings.contrast,l.instance.setContrast(),l.instance.settings=this.settings}),s.addEventListener("font-size-updated",r=>{this.settings.fontSize=r.detail.fontSize,l.instance.settings.fontSize=this.settings.fontSize,l.instance.setFontSize(this.settings.fontSize),l.instance.settings=this.settings}),i.addEventListener("letter-space-updated",r=>{this.settings.letterSpace=r.detail.letterSpace,l.instance.settings.letterSpace=this.settings.letterSpace,l.instance.setLetterSpace(this.settings.letterSpace),l.instance.settings=this.settings}),n.addEventListener("line-height-updated",r=>{this.settings.lineHeight=r.detail.lineHeight,l.instance.settings.lineHeight=this.settings.lineHeight,l.instance.setLineHeight(this.settings.lineHeight),l.instance.settings=this.settings}))}}customElements.define("page-settings",wt);class St extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_snackbar",q.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get snackbar(){return this._snackbar}set snackbar(t){this._snackbar=t,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
            <div class="snackbar">
                <p class="snackbar-message"></p>
            </div>

            <style>
                p {
                    margin: 0;
                    padding: 16px;
                    box-sizing: border-box;
                }

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
            `}update(){if(this.snackbar.message.length===0){const s=this.shadowRoot.querySelector(".snackbar");if(!s)return;s.classList.add("empty-snackbar");return}const t=this.shadowRoot.querySelector(".snackbar-message");if(t)switch(t.innerHTML=this.snackbar.message,this.snackbar.type){case z.Error:this.renderErrorSnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&(t.classList.remove("empty-snackbar"),t.classList.add("info-snackbar"))}renderErrorSnackbar(){const t=this.shadowRoot.querySelector(".snackbar");t&&(t.classList.remove("empty-snackbar"),t.classList.add("error-snackbar"))}resetSnackbar(){const t=this.shadowRoot.querySelector(".snackbar-message"),s=this.shadowRoot.querySelector(".snackbar");t&&s&&(t.innerHTML="",s.classList.remove("info-snackbar"),s.classList.remove("error-snackbar"),s.classList.add("empty-snackbar"))}}customElements.define("app-snackbar",St);class Lt extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_showSettings",!0);this.shadowRoot=this.attachShadow({mode:"closed"})}get showSettings(){return this._showSettings}set showSettings(t){this._showSettings=t,this.configBar(this.showSettings)}connectedCallback(){this.render(),this.setup(),this.checkCurrentPage()}render(){this.shadowRoot.innerHTML=`
            <nav class="menu" role="tablist">
                <a class="bar-el-link categories-link" href="/categories" title="Categorie" role="tab" aria-selected="false" aria-controls="categories-panel">
                    <span class="material-symbols-outlined icon" aria-label="Categorie">stacks</span>
                </a>

                <a class="bar-el-link around-you-link" href="/around-me" title="Intorno a te" role="tab" aria-selected="false" aria-controls="around-you-panel">
                    <span class="material-symbols-outlined icon" aria-label="Intorno a te">explore</span>
                </a>

                <a class="bar-el-link custom-path-link" href="/custom-path" title="Percorso personalizzato" role="tab" aria-selected="false" aria-controls="cusotm-path-panel">
                    <span class="material-symbols-outlined icon" aria-label="Percorso personalizzato">favorite</span>
                </a>

                <a class="bar-el-link settings-link" href="/settings" title="Impostazioni" role="tab" aria-selected="false" aria-controls="settings-panel">
                    <span class="bg"></span>
                    <span class="material-symbols-outlined icon" aria-label="Impostazioni">more_vert</span>
                </a>
            </nav>

            <style>
                .menu {
                    display: flex;
                    justify-content: space-between;
                    align-items: stretch;
                    padding: 0;
                    margin: 0;
                    list-style-type: none;
                    min-height: 3rem;
                    background-color: var(--surface-container-high);
                    border-radius: var(--border-radius-s) var(--border-radius-s) 0 0;
                    max-width: 576px;
                    margin: auto;
                }

                .bar-el-link {
                    position: relative;
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: var(--on-surface);
                    font-size: .8rem;
                    width: 100%;
                    flex-grow: 1;
                    text-align: center;
                }

                .icon {
                    width: 88%;
                    height: 72%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 100px;
                    z-index: 1;
                }

                .current .icon {
                    color: var(--on-primary-container);
                    background-color: var(--primary-container);
                }

                .current .material-symbols-outlined {
                    font-variation-settings:
                        'FILL' 1,
                        'opsz' 20;
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.6rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){this.onLinkClick(),window.addEventListener("hashchange",()=>this.checkCurrentPage())}onLinkClick(){Array.from(this.shadowRoot.querySelectorAll(".bar-el-link")).forEach(s=>{s.addEventListener("click",i=>{i.preventDefault();const n=s.getAttribute("href");n&&(window.location.hash=n)})})}checkCurrentPage(){const t=window.location.hash.slice(2);Array.from(this.shadowRoot.querySelectorAll(".bar-el-link")).forEach(i=>{var n;((n=i.getAttribute("href"))==null?void 0:n.slice(1))===t?(i.classList.add("current"),i.setAttribute("aria-selected","true")):(i.classList.remove("current"),i.setAttribute("aria-selected","false"))})}configBar(t){const s=this.shadowRoot.querySelector(".settings-link");s&&(t||(s.style.display="none"))}}customElements.define("app-bar",Lt);class xt extends HTMLElement{constructor(){super();a(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <button type="button" aria-label="Torna alla profilazione">
                <span class="material-symbols-outlined">home</span>
            </button>

            <style>
                button {
                    cursor: pointer;
                    min-height: 40px;
                    min-width: 40px;
                    background-color: transparent;
                    border: none;
                    color: var(--on-surface);
                    background-color: var(--surface-container);
                    border-radius: var(--border-radius-m);

                    &:hover {
                        color: var(--on-surface-variant);
                    }
                }

                .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-size: 1.6rem;
                    font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24;
                }
            </style>
            `}setup(){const t=this.shadowRoot.querySelector("button");t&&t.addEventListener("click",()=>window.location.href="../")}}customElements.define("app-home",xt);kt();async function kt(){R.instance.getSavedCustomPath(),N.instance.getSavedLayers();const o=document.querySelector("app-router"),e=new C("categories",E.Default,()=>"<page-categories />"),t=new C("layers",E.Default,()=>"<page-layers />"),s=new C("around-you",E.Page,()=>"<page-around-you />"),i=new C("around-me",E.Page,()=>"<page-around-me />"),n=new C("settings",E.Page,()=>"<page-settings />"),r=new C("poi",E.Page,()=>"<page-poi />"),c=new C("custom-path",E.Page,()=>"<page-custom-path />"),p=[e,t,s,i,n,r,c];o.addRoutes(p),l.instance.getLocalStorageSettings();const _=document.querySelector("app-bar");_&&(_.showSettings=l.instance.settings.showSettings)}
