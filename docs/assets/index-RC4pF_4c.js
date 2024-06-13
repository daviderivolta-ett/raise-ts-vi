var V=Object.defineProperty;var W=(o,t,e)=>t in o?V(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var a=(o,t,e)=>(W(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();var x=(o=>(o.Default="default",o.Page="page",o.NotFound="not-found",o))(x||{});class H{constructor(t,e,s){a(this,"url");a(this,"type");a(this,"routing");this.url=t,this.type=e,this.routing=s}}class J{constructor(){a(this,"fontSize",14);a(this,"letterSpace",0);a(this,"lineHeight",1.15);a(this,"contrast","dark");a(this,"showSettings",!0)}}var E=(o=>(o.Light="light",o.Dark="dark",o.LightHigh="light-high",o.DarkHigh="dark-high",o))(E||{});const y=class y{constructor(){a(this,"_settings",new J);if(y._instance)return y._instance;y._instance=this}get settings(){return this._settings}set settings(t){this._settings=t,this.setFontSize(this.settings.fontSize),this.setLetterSpace(this.settings.letterSpace),this.setLineHeight(this.settings.lineHeight),this.setContrast(),this.setLocalStorageSettings()}static get instance(){return y._instance||(y._instance=new y),y._instance}getLocalStorageSettings(){const t=localStorage.getItem("settings");if(!t)return;const e=JSON.parse(t),s=this.parseLocalStorageSettings(e);this.settings={...s}}setLocalStorageSettings(){localStorage.setItem("settings",JSON.stringify(this.settings))}setLightContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 107, 88)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 32, 25)"),document.documentElement.style.setProperty("--secondary","rgb(71, 100, 91)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(243, 255, 249)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(3, 32, 25)"),document.documentElement.style.setProperty("--tertiary","rgb(59, 99, 122)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(251, 252, 255)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 30, 45)"),document.documentElement.style.setProperty("--error","rgb(184, 31, 33)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--on-error-container","rgb(65, 0, 3)"),document.documentElement.style.setProperty("--surface-dim","rgb(201, 218, 255)"),document.documentElement.style.setProperty("--surface","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(249, 249, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(240, 243, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(232, 238, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(223, 232, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--outline","rgb(92, 120, 163)"),document.documentElement.style.setProperty("--outline-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(236, 240, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(55, 222, 187)")}setDarkContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(55, 222, 187)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 56, 45)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 81, 66)"),document.documentElement.style.setProperty("--on-primary-container","rgb(184, 255, 233)"),document.documentElement.style.setProperty("--secondary","rgb(174, 205, 194)"),document.documentElement.style.setProperty("--on-secondary","rgb(25, 53, 46)"),document.documentElement.style.setProperty("--secondary-container","rgb(48, 76, 68)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(202, 233, 222)"),document.documentElement.style.setProperty("--tertiary","rgb(163, 204, 231)"),document.documentElement.style.setProperty("--on-tertiary","rgb(1, 52, 74)"),document.documentElement.style.setProperty("--tertiary-container","rgb(33, 75, 98)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(197, 231, 255)"),document.documentElement.style.setProperty("--error","rgb(255, 180, 171)"),document.documentElement.style.setProperty("--on-error","rgb(105, 0, 5)"),document.documentElement.style.setProperty("--error-container","rgb(147, 0, 10)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 218, 214)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface","rgb(0, 19, 46)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 56, 115)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 14, 37)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 27, 61)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 31, 69)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 41, 87)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 52, 107)"),document.documentElement.style.setProperty("--on-surface","rgb(213, 227, 255)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(171, 200, 247)"),document.documentElement.style.setProperty("--outline","rgb(118, 146, 191)"),document.documentElement.style.setProperty("--outline-variant","rgb(42, 72, 112)"),document.documentElement.style.setProperty("--inverse-surface","rgb(214, 227, 255)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 48, 99)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 107, 88)")}setLightHighContrast(){document.documentElement.style.setProperty("color-scheme","light"),document.documentElement.style.setProperty("--primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-dim","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-bright","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-low","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-high","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--outline","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--outline-variant","rgb(211, 211, 211)"),document.documentElement.style.setProperty("--inverse-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(255, 255, 255)"),document.documentElement.style.setProperty("--inverse-primary","rgb(255, 255, 255)")}setDarkHighContrast(){document.documentElement.style.setProperty("color-scheme","dark"),document.documentElement.style.setProperty("--primary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--primary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-primary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--secondary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-secondary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--tertiary-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-tertiary-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--error-container","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-error-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-dim","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-bright","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-lowest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-low","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-high","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--surface-container-highest","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--on-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--on-surface-variant","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--outline","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--outline-variant","rgb(78, 78, 0)"),document.documentElement.style.setProperty("--inverse-surface","rgb(255, 255, 0)"),document.documentElement.style.setProperty("--inverse-on-surface","rgb(0, 0, 0)"),document.documentElement.style.setProperty("--inverse-primary","rgb(0, 0, 0)")}setFontSize(t){document.documentElement.style.setProperty("font-size",t.toString()+"px")}setContrast(){switch(this.settings.contrast){case E.Light:this.setLightContrast();break;case E.Dark:this.setDarkContrast();break;case E.LightHigh:this.setLightHighContrast();break;default:this.setDarkHighContrast();break}}setLetterSpace(t){document.documentElement.style.setProperty("letter-spacing",t.toString()+"rem")}setLineHeight(t){document.documentElement.style.setProperty("line-height",t.toString())}parseLocalStorageSettings(t){let e=new J;return e.contrast=t.contrast,e.fontSize=t.fontSize,e.lineHeight=t.lineHeight,e.letterSpace=t.letterSpace,e.showSettings=t.showSettings,e}};a(y,"_instance");let d=y;class T{constructor(t,e,s=2){a(this,"type");a(this,"message");a(this,"duration");this.type=t,this.message=e,this.duration=s}static createEmpty(){return new T("info","",2)}}var M=(o=>(o.Error="error",o.Info="info",o))(M||{});const b=class b{constructor(){a(this,"_snackbar",new T(M.Info,""));a(this,"_live",document.body.querySelector("app-snackbar"));if(b._instance)return b._instance;b._instance=this}static get instance(){return b._instance||(b._instance=new b),b._instance}get snackbar(){return this._snackbar}set snackbar(t){this._snackbar=t}get live(){return this._live}set live(t){this._live=t}updateSnackbar(t,e,s=5){this.live&&(this.live.snackbar=new T(t,e,s))}resetSnackbar(){this.live&&this.live.resetSnackbar()}};a(b,"_instance");let L=b;class K extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"routes",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){window.addEventListener("hashchange",()=>{this.checkRoute()})}addRoutes(e){this.routes=[...e],this.checkRoute()}checkRoute(){const e=window.location.hash.slice(2);this.changeRoute(e)}changeRoute(e){if(L.instance.resetSnackbar(),e){const s=this.routes.findIndex(n=>n.url===e);this.shadowRoot.innerHTML=this.routes[s]?this.routes[s].routing():this.sendNotFound()}else{this.checkParams(window.location.search);const s=this.routes.filter(n=>n.type===x.Default);s?window.location.hash="#/"+s[0].url:this.sendNotFound()}}sendNotFound(){const e=this.routes.filter(s=>s.type===x.NotFound);return e.length===0||(window.location.hash="#/"+e[0].url,this.changeRoute(e[0].url)),"404: Not found"}checkParams(e){const s=new URLSearchParams(e),n=new J;let r=!1;if(s.forEach(i=>{switch(r=!0,i){case"blind":n.showSettings=!1;break;case"vi":n.contrast=E.DarkHigh;break;case"fine-motor":n.fontSize=32;break}}),r){const i=window.location.pathname+window.location.hash;history.replaceState(null,"",i)}d.instance.settings={...n}}}customElements.define("app-router",K);class Q extends HTMLElement{constructor(){super();a(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
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
            `}}customElements.define("app-loader",Q);class D{constructor(t,e){a(this,"color");a(this,"opacity");this.color=t,this.opacity=e}static createEmpty(){return new D("#008000",1)}}class B{constructor(t,e,s){a(this,"propertyName");a(this,"displayName");a(this,"type");this.propertyName=t,this.displayName=e,this.type=s}static createEmpty(){return new B("","","string")}}var C=(o=>(o.String="string",o.Image="image",o.Number="number",o))(C||{});class N{constructor(t,e,s,n,r,i){a(this,"name");a(this,"layer");a(this,"url");a(this,"style");a(this,"tags");a(this,"relevantProperties");this.name=t,this.layer=e,this.url=s,this.style=n,this.tags=r,this.relevantProperties=i}static createEmpty(){return new N("","","",D.createEmpty(),[],[B.createEmpty()])}}const f=class f{constructor(){a(this,"CATEGORIES_URL","./json/categories.json");a(this,"_data",{categories:[]});if(f._instance)return f._instance;f._instance=this}static get instance(){return f._instance||(f._instance=new f),f._instance}get data(){return this._data}set data(t){this._data=t}async getData(){if(this.data.categories.length!==0)return this._data;{let t=await this.fetchAppData(this.CATEGORIES_URL);return t=this.parseData(t),this.data=t,t}}async fetchAppData(t){try{const e=await fetch(t).then(n=>n.json()),s=await Promise.all(e.categories.map(async n=>{const r=await Promise.all(n.groups.map(async i=>{if(typeof i=="string")try{const c=await fetch(i);if(c.ok)return c.json();throw new Error("Errore durante il recupero dei dati.")}catch(c){return console.error(c),null}else return i}));return n.groups=r,n}));return{...e,categories:s}}catch(e){throw console.error("Errore durante il recupero dei dati JSON.",e),e}}parseData(t){return{categories:t.categories.map(s=>({name:s.name,groups:s.groups.map(n=>this.parseGroup(n))}))}}parseGroup(t){return Array.isArray(t)?t:{name:t.name,layers:t.layers.map(e=>this.parseLayer(e))}}parseLayer(t){return new N(t.name,t.layer,t.layer_url_wfs,new D(t.style.color,parseFloat(t.style.opacity)),t.tags,t.relevant_properties.map(e=>{let s=B.createEmpty();switch(s.displayName=e.display_name,s.propertyName=e.property_name,e.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}getAllTags(t){let e=[];return t.categories.map(n=>{n.groups.map(r=>{typeof r!="string"&&r.layers.map(i=>{i.tags.map(c=>{e.push(c)})})})}),[...new Set(e)]}filterLayersByTags(t){let e=[];return t.forEach(n=>{this.filterLayersByTag(n).forEach(i=>e.push(i))}),[...new Set(e)]}filterLayersByTag(t){let e=[];return e=this.data.categories.flatMap(s=>s.groups.flatMap(n=>typeof n=="string"?[N.createEmpty()]:n.layers.filter(r=>r.tags.some(i=>i.includes(t))))),e}};a(f,"_instance");let I=f;const v=class v{constructor(){a(this,"_activeLayers",[]);if(v._instance)return v._instance;v._instance=this}static get instance(){return v._instance||(v._instance=new v),v._instance}get activeLayers(){return this._activeLayers}set activeLayers(t){this._activeLayers=t,localStorage.setItem("layers",JSON.stringify(this.activeLayers))}getSavedLayers(){const t=localStorage.getItem("layers");if(!t)return;const e=JSON.parse(t);let s=[];s=e.map(n=>this.parseLayer(n)),this._activeLayers=s}parseLayer(t){return new N(t.name,t.layer,t.url=t.url,new D(t.style.color,t.style.opacity),t.tags,t.relevantProperties.map(e=>{let s=B.createEmpty();switch(s.displayName=e.displayName,s.propertyName=e.propertyName,e.type){case"image":s.type=C.Image;break;case"number":s.type=C.Number;break;default:s.type=C.String;break}return s}))}};a(v,"_instance");let A=v;class Y extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_tag","");this.shadowRoot=this.attachShadow({mode:"closed"})}get tag(){return this._tag}set tag(e){this._tag=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
                }

                .tag-chip:hover {
                    background-color:  var(--surface-container-highest); 
                    border-color: var(--primary);  
                }
            </style>
            `}setup(){this.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:this.tag}}))})}}customElements.define("app-tag-chip",Y);class Z extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_tags",[]);a(this,"_currentPageTags",[]);a(this,"_currentPage",0);a(this,"_tagsPerPage",8);a(this,"handleCheckbox",e=>{const s=e.target;this.dispatchEvent(new CustomEvent("tag-selected",{detail:{tag:s.tag}}))});this.shadowRoot=this.attachShadow({mode:"closed"})}get tags(){return this._tags}set tags(e){this._tags=e,this.connectedCallback()}get currentPageTags(){return this._currentPageTags}set currentPageTags(e){this._currentPageTags=e}get currentPage(){return this._currentPage}set currentPage(e){this._currentPage=e}get tagsPerPage(){return this._tagsPerPage}set tagsPerPage(e){this._tagsPerPage=e}connectedCallback(){this.render(),this.tags.length!==0&&(this.paginateTags(),this.setup())}render(){this.shadowRoot.innerHTML=`
            <div class="pagination">                    
                <p class="desc">Scegli una categoria per caricare i punti di interesse associati.</p>
                <p tabindex="-1" class="current-page">Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}</p>

                <div class="tags"></div>

                <div class="pagination-buttons">
                    <button type="button" class="pagination-btn prev-btn" aria-label="Pagina precedente">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>
                    </button>
                    <button type="button" class="pagination-btn next-btn" aria-label="Pagina successiva">
                        <span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>
                    </button>
                </div>
            </div>

            <style>
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

                .desc {
                    text-align: center;
                }

                .current-page {
                    text-align: center;
                }

                .pagination-buttons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 8px 0 0 0;
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
            `}setup(){const e=this.shadowRoot.querySelector(".prev-btn"),s=this.shadowRoot.querySelector(".next-btn");e&&s&&(e.addEventListener("click",()=>this.prevPage()),s.addEventListener("click",()=>this.nextPage()))}update(){const e=this.shadowRoot.querySelector(".current-page");if(!e)return;e.innerHTML=`Pagina ${this.currentPage+1} di ${this.getPagesNumber()+1}`;const s=this.shadowRoot.querySelector(".prev-btn"),n=this.shadowRoot.querySelector(".next-btn");if(!s||!n)return;this.currentPage===0?(s.setAttribute("disabled",""),s.style.visibility="hidden"):(s.removeAttribute("disabled"),s.style.visibility="visible"),this.currentPage===this.getPagesNumber()?(n.setAttribute("disabled",""),n.style.visibility="hidden"):(n.removeAttribute("disabled"),n.style.visibility="visible"),Array.from(this.shadowRoot.querySelectorAll("app-tag-chip")).forEach(i=>i.addEventListener("tag-selected",this.handleCheckbox))}paginateTags(){const e=this.currentPage*this.tagsPerPage;let s=e+this.tagsPerPage;s>this.tags.length&&(s=this.tags.length);const n=this.shadowRoot.querySelector(".tags");if(n){n.innerHTML="",this.currentPageTags=[];for(let r=e;r<s;r++){let i=this.tags[r];this.currentPageTags.push(i);let c=this.createChip(i);n.append(c)}this.update()}}createChip(e){let s=new Y;return s.tag=e,s}getPagesNumber(){return Math.floor(this.tags.length/this.tagsPerPage)}prevPage(){if(this.currentPage>0){this.currentPage--,this.paginateTags();const e=this.shadowRoot.querySelector(".current-page");e&&e.focus()}}nextPage(){if(this.currentPage<this.getPagesNumber()){this.currentPage++,this.paginateTags();const e=this.shadowRoot.querySelector(".current-page");e&&e.focus()}}}customElements.define("app-tags-wall",Z);class ee extends HTMLElement{constructor(){super();a(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}async connectedCallback(){await I.instance.getData(),this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="categories-page">
                <div class="page-header">
                    <h1 tabindex="-1" class="categories-page-title">Esplora categorie</h1>
                </div>
                <app-tags-wall></app-tags-wall>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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
            `;const e=this.shadowRoot.querySelector("h1");e&&e.focus()}setup(){const e=this.shadowRoot.querySelector("app-tags-wall");if(!e)return;let s=I.instance.getAllTags(I.instance.data);e.tags=s,e.addEventListener("tag-selected",n=>{A.instance.activeLayers=I.instance.filterLayersByTag(n.detail.tag),window.location.hash="/around-you"})}}customElements.define("page-categories",ee);const P=class P{constructor(){a(this,"_position",null);if(P._instance)return P._instance;P._instance=this}static get instance(){return P._instance||(P._instance=new P),P._instance}get position(){return this._position}set position(t){this._position=t}async getUserPosition(){try{return await new Promise((e,s)=>{navigator.geolocation.getCurrentPosition(n=>{e(n)},n=>{s(n)})})}catch(t){throw t}}};a(P,"_instance");let j=P;var l=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(l||{});class ${constructor(t,e){a(this,"type");a(this,"coordinates");this.type=t,this.coordinates=e}static createEmpty(){return new $("Point",[])}}class U{constructor(t,e,s,n,r){a(this,"type");a(this,"geometry");a(this,"properties");a(this,"id");a(this,"geometry_name");this.type=t,this.geometry=e,this.properties=s,this.id=n,this.geometry_name=r}static createEmpty(){return new U("",$.createEmpty(),{prop:""},"","")}}class m{constructor(){a(this,"uuid","");a(this,"name","");a(this,"type","Point");a(this,"coordinates",[]);a(this,"layerName","");a(this,"props",[]);a(this,"distance")}static fromFeature(t){const e=new m;switch(e.uuid=t.properties.uuid,e.name=t.properties.name,t.geometry.type){case l.LineString:e.type="LineString";break;case l.Polygon:e.type="Polygon";break;case l.MultiPoint:e.type="MultiPoint";break;case l.MultiLineString:e.type="MultiLineString";break;case l.MultiPolygon:e.type="MultiPolygon";break;default:e.type="Point";break}e.coordinates=t.geometry.coordinates,e.layerName=t.properties.layerName;for(const s in t.properties){if(typeof t.properties[s]!="object")continue;let n=new F;switch(n.displayName=t.properties[s].displayName,n.value=t.properties[s].value,t.properties[s].type){case"number":n.type="number";break;case"image":n.type="image";break;default:n.type="string";break}e.props.push(n)}return e}}var u=(o=>(o.Point="Point",o.LineString="LineString",o.Polygon="Polygon",o.MultiPoint="MultiPoint",o.MultiLineString="MultiLineString",o.MultiPolygon="MultiPolygon",o))(u||{});class F{constructor(){a(this,"displayName","");a(this,"type","string");a(this,"value","")}}var R=(o=>(o.String="string",o.Image="image",o.Number="number",o))(R||{});const h=class h{constructor(){if(h._instance)return h._instance;h._instance=this}static get instance(){return h._instance||(h._instance=new h),h._instance}async createGeoJson(t){const e=`${t.url}?service=WFS&typeName=${t.layer}&outputFormat=application/json&request=GetFeature&srsname=EPSG:4326`;let n=await(await fetch(e)).json(),r=this.substituteRelevantProperties(n,t),c={...this.createFeatureAdditionalProperties(r,t)};return c.features=c.features.slice(0,10),c.features=c.features.map(p=>this.parseFeature(p)),c}substituteRelevantProperties(t,e){return t.features.forEach(s=>{const n={};for(const r in s.properties){const i=e.relevantProperties.find(c=>c.propertyName===r);if(i){const c={displayName:i.displayName,type:i.type,value:s.properties[r]};n[r]=c}}s.properties=n}),t}createFeatureAdditionalProperties(t,e){return t.features=t.features.map((s,n)=>(s.properties.name=e.name+" "+n,s.properties.layerName=e.layer,s.properties.uuid=s.id,s)),t}parseFeature(t){let e=U.createEmpty();return e.type=t.type,e.properties=t.properties,e.geometry_name=t.geometry_name,e.id=t.id,t.geometry&&(e.geometry=this.parseFeatureGeometry(t.geometry)),e}parseFeatureGeometry(t){let e=$.createEmpty();return e.type=this.parseFeatureGeometryType(t.type),e.coordinates=t.coordinates,e}parseFeatureGeometryType(t){let e=l.Point;switch(t){case"LineString":e=l.LineString;break;case"Polygon":e=l.Polygon;break;case"MultiPoint":e=l.MultiPoint;break;case"MultiLineString":e=l.MultiLineString;break;case"MultiPolygon":e=l.MultiPolygon;break}return e}async getPoisFromLayers(t){let e=[];const s=t.map(async r=>h.instance.createGeoJson(r));return(await Promise.all(s)).forEach(r=>{r.features.forEach(i=>e.push(m.fromFeature(i)))}),e.filter(r=>!h.instance.isCoordinatesMultidimensional(r.coordinates))}isCoordinatesMultidimensional(t){if(!Array.isArray(t))return!1;for(let e=0;e<t.length;e++)if(Array.isArray(t[e]))return!0;return!1}orderPoisByDistance(t,e){return e.forEach(s=>{if(!h.instance.isCoordinatesMultidimensional(s.coordinates)){const n=Array.isArray(s.coordinates)?s.coordinates[1]:s.coordinates,r=Array.isArray(s.coordinates)?s.coordinates[0]:s.coordinates,i=this.haversineDistance(n,r,t.coords.latitude,t.coords.longitude);s.distance=i}}),e.sort((s,n)=>s.distance&&n.distance?s.distance-n.distance:0),e}haversineDistance(t,e,s,n){const r=t*Math.PI/180,i=s*Math.PI/180,p=(n-e)*Math.PI/180;return Math.acos(Math.sin(r)*Math.sin(i)+Math.cos(r)*Math.cos(i)*Math.cos(p))*6371e3}};a(h,"_instance");let O=h;const w=class w{constructor(){a(this,"_selectedPoi",new m);if(w._instance)return w._instance;w._instance=this}static get instance(){return w._instance||(w._instance=new w),w._instance}get selectedPoi(){return this._selectedPoi}set selectedPoi(t){this._selectedPoi=t,localStorage.setItem("selected-poi",JSON.stringify(this.selectedPoi))}getSelectedPoi(){const t=localStorage.getItem("selected-poi");if(!t)return;const e=JSON.parse(t);this._selectedPoi=this.parsePoi(e)}parsePoi(t){let e=new m;switch(e.uuid=t.uuid,e.name=t.name,t.type){case l.LineString:t.type=u.LineString;break;case l.Polygon:t.type=u.Polygon;break;case l.MultiPoint:t.type=u.MultiPoint;break;case l.MultiLineString:t.type=u.MultiLineString;break;case l.MultiPolygon:t.type=u.MultiPolygon;break;default:t.type=u.Point;break}e.coordinates=t.coordinates,e.layerName=t.layerName;for(const s in t.props){if(typeof t.props[s]!="object")continue;let n=new F;switch(n.displayName=t.props[s].displayName,n.value=t.props[s].value,t.props[s].type){case"number":n.type=R.Number;break;case"image":n.type=R.Image;break;default:n.type=R.String;break}e.props.push(n)}return t.distance&&(e.distance=t.distance),e}};a(w,"_instance");let _=w;class te extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new m);a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(e){this._poi=e}get position(){return this._position}set position(e){this._position=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <article class="poi-card" aria-labelledby="poi-card-title-${this.position}" aria-posinset="${this.position}" tabindex="${this.position}" aria-setsize="-1">
                <div class="poi-card-info">
                    <p class="poi-card-title" id="poi-card-title-${this.position}">${this.poi.name}</p>
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
            `}setup(){const e=this.shadowRoot.querySelector(".info-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-poi-card",te);class se extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_pois",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get pois(){return this._pois}set pois(e){this._pois=e}async connectedCallback(){L.instance.updateSnackbar(M.Info,"Caricamento...");try{const e=await j.instance.getUserPosition();this.pois=await O.instance.getPoisFromLayers(A.instance.activeLayers),this.pois=O.instance.orderPoisByDistance(e,this.pois),this.render(),this.setup(),this.pois.length===0&&this.renderMsg("empty")}catch{this.render(),this.renderMsg("error")}finally{L.instance.resetSnackbar()}}render(){this.shadowRoot.innerHTML=`
            <div class="around-you-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Punti di interesse</h1>
                </div>
                <p class="page-desc">Elenco punti di interesse nelle vicinanze</p>
                <section class="around-you-features" role="feed"></section>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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

                .message {
                    text-align: center;
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
            `;const e=this.shadowRoot.querySelector(".around-you-features");if(!e)return;this.pois.forEach((n,r)=>{const i=document.createElement("app-poi-card");i.poi=n,i.position=r+1,e.append(i)});const s=this.shadowRoot.querySelector("h1");s&&s.focus()}setup(){this.shadowRoot.querySelectorAll("app-poi-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}renderMsg(e){const s=this.shadowRoot.querySelector(".around-you-page");if(!s)return;const n=document.createElement("p");switch(e){case"error":n.innerText=`Impossibile trovare la tua posizione.

Per mostrare i punti di interesse nelle vicinanze è necessario concedere all'app l'autorizzazione ad accedere alla posizione del dispositivo.`;break;default:n.innerText=`Impossibile trovare punti di interesse nelle vicinanze senza selezionare alcuna categoria.

Andare nella sezione "Categorie" per selezionarne almeno una.`;break}n.classList.add("message"),s.appendChild(n)}}customElements.define("page-around-you",se);class z{constructor(t,e){a(this,"name");a(this,"pois");this.name=t,this.pois=e}static createEmpty(){return new z("",[])}}const S=class S{constructor(){a(this,"_customPath",new z("Percorso personalizzato",[]));a(this,"_suggestedPaths",[]);a(this,"_selectedSuggestedPath",new z("",[]));if(S._instance)return S._instance;S._instance=this}static get instance(){return S._instance||(S._instance=new S),S._instance}get customPath(){return this._customPath}set customPath(t){this._customPath=t}get suggestedPaths(){return this._suggestedPaths}set suggestedPaths(t){this._suggestedPaths=t}get selectedSuggestedPath(){return this._selectedSuggestedPath}set selectedSuggestedPath(t){this._selectedSuggestedPath=t,localStorage.setItem("selected-suggested-path",JSON.stringify(this.selectedSuggestedPath))}addPoiToCustomPath(t){if(this.isPoiInCustomPath(t))return;const e={...this.customPath};e.pois.unshift(t),this.customPath={...e}}isPoiInCustomPath(t){return this.customPath.pois.some(e=>e.uuid===t.uuid)}saveCustomPath(){localStorage.setItem("custom-path",JSON.stringify(this.customPath))}getSavedCustomPath(){const t=localStorage.getItem("custom-path");if(!t)return;const e=JSON.parse(t);this._customPath=this.parsePath(e)}parsePath(t){let e=new z(t.name,t.pois);return e.pois=e.pois.map(s=>this.parsePoi(s)),e}parsePoi(t){let e=new m;switch(e.uuid=t.uuid,e.name=t.name,t.type){case l.LineString:t.type=u.LineString;break;case l.Polygon:t.type=u.Polygon;break;case l.MultiPoint:t.type=u.MultiPoint;break;case l.MultiLineString:t.type=u.MultiLineString;break;case l.MultiPolygon:t.type=u.MultiPolygon;break;default:t.type=u.Point;break}e.coordinates=t.coordinates,e.layerName=t.layerName;for(const s in t.props){if(typeof t.props[s]!="object")continue;let n=new F;switch(n.displayName=t.props[s].displayName,n.value=t.props[s].value,t.props[s].type){case"number":n.type=R.Number;break;case"image":n.type=R.Image;break;default:n.type=R.String;break}e.props.push(n)}return t.distance&&(e.distance=t.distance),e}getCsvPaths(t){return new Promise((e,s)=>{let n=0;const r=[],i=[];for(;n<=t;){const c=fetch(`./suggested-paths/${n}.tsv`).then(p=>p.text()).then(p=>{const q=this.parseCsvFile(p);r.push(this.parseCsvPath(q))}).catch(p=>console.error("Errore durante il recupero dei percorsi suggeriti",p));i.push(c),n++}Promise.all(i).then(()=>{this.suggestedPaths=[...r],e()}).catch(c=>s(c))})}parseCsvFile(t){return t.split(`
`).map(n=>{const r=n.split("	");return{path:r[0],layerName:r[1],id:r[2],name:r[3],latitude:r[4],longitude:r[5],height:r[6],info:r[7]}})}parseCsvPath(t){let e=z.createEmpty();return e.name=t[1].path,t.forEach((s,n)=>{n!==0&&e.pois.push(this.parseCsvPoi(s))}),e}parseCsvPoi(t){let e=new m;return e.layerName=t.layerName,e.name=t.name,e.coordinates=[parseFloat(t.longitude),parseFloat(t.latitude),parseFloat(t.height)],e.type=u.Point,e.uuid=t.id,e.props=this.parseCsvPoiProperties(t.info),e}parseCsvPoiProperties(t){let e=[];return t.split("|").forEach(n=>{let r=new F;r.displayName=n.split(":")[0],r.value=n.split(":")[1].trim(),r.type=R.String,e.push(r)}),e}getSuggestedPaths(t){let e=[];return this.suggestedPaths.forEach(s=>{s.pois.forEach(n=>{t.forEach(r=>{n.layerName===r.layer&&e.push(s)})})}),[...new Set(e)]}getSelectedSuggestedPath(){const t=localStorage.getItem("selected-suggested-path");if(!t)return;const e=JSON.parse(t);this._selectedSuggestedPath=this.parsePath(e)}};a(S,"_instance");let g=S;const k=class k{constructor(){k._instance||(k._instance=this)}static get instance(){return k._instance||(k._instance=new k),k._instance}calculateDistance(t,e){const s=t[0]-e[0],n=t[1]-e[1];return Math.sqrt(s*s+n*n)}nearestInsertion(t,e){const s=[...t];let n=0,r=this.calculateDistance(e,s[0].coordinates);for(let c=1;c<s.length;c++){const p=this.calculateDistance(e,s[c].coordinates);p<r&&(r=p,n=c)}const i=[s.splice(n,1)[0]];for(;s.length>0;){r=Number.MAX_VALUE;let c=0;for(let p=0;p<s.length;p++){const q=this.calculateDistance(i[i.length-1].coordinates,s[p].coordinates);q<r&&(r=q,c=p)}i.push(s.splice(c,1)[0])}return i.reverse()}};a(k,"_instance");let G=k;class ne extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new m);a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(e){this._poi=e}get position(){return this._position}set position(e){this._position=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.setupPoiInfoBtn(),this.setupPoiDeleteBtn()}setupPoiInfoBtn(){const e=this.shadowRoot.querySelector(".poi-info-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}setupPoiDeleteBtn(){const e=this.shadowRoot.querySelector(".poi-delete-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-deleted",{detail:{deletedPoi:this.poi}}))})}}customElements.define("app-custom-path-card",ne);class re extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_customPath",{...g.instance.customPath});this.shadowRoot=this.attachShadow({mode:"closed"})}get customPath(){return this._customPath}set customPath(e){this._customPath=e,this.update(),this.setupCardsBeahviour()}connectedCallback(){this.render(),this.update(),this.setup(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
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
                :host {
                    display: block;
                    padding:  0 0 7rem 0;
                }
                
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
            `;const e=this.shadowRoot.querySelector("h1");e&&e.focus()}setup(){this.setupSaveCustomPathBtn(),this.setupReorderPoisBtn()}update(){const e=this.shadowRoot.querySelector(".custom-path-list");e&&(e.innerHTML="",this.customPath.pois.length===0&&e.append(this.renderEmptyMsg()),this.customPath.pois.forEach((s,n)=>{let r=document.createElement("app-custom-path-card");r.poi=s,r.position=n+1,e.append(r)}))}setupSaveCustomPathBtn(){const e=this.shadowRoot.querySelector("#save-custom-path-btn");e&&e.addEventListener("click",()=>{g.instance.saveCustomPath(),L.instance.updateSnackbar(M.Info,"Percorso personalizzato salvato")})}setupReorderPoisBtn(){const e=this.shadowRoot.querySelector("#reorder-pois-btn");e&&e.addEventListener("click",async()=>{let s=await j.instance.getUserPosition();if(!s)return;const n=G.instance.nearestInsertion(this.customPath.pois,[s.coords.latitude,s.coords.longitude]);this.customPath={...this.customPath,pois:n},g.instance.customPath=this.customPath,L.instance.updateSnackbar(M.Info,`Tappe riordinate secondo il percorso ottimale. Ordine attuale: ${this.customPath.pois.map(r=>r.name).join(", ")}.`)})}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-custom-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"}),s.addEventListener("poi-deleted",n=>{let r=this.customPath.pois.filter(i=>i.uuid!==n.detail.deletedPoi.uuid);this.customPath={...this.customPath,pois:r},g.instance.customPath=this.customPath,L.instance.updateSnackbar(M.Info,`Tappa ${n.detail.deletedPoi.name} rimossa`)})})}renderEmptyMsg(){const e=document.createElement("p");return e.classList.add("empty-msg"),e.innerHTML="Nessuna tappa attualmente presente nel percorso personalizzato",e}}customElements.define("page-custom-path",re);class ae extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_path",z.createEmpty());a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(e){this._path=e}get position(){return this._position}set position(e){this._position=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const e=this.shadowRoot.querySelector(".path-info-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("suggested-path-selected",{detail:{selectedSuggestedPath:this.path}}))})}}customElements.define("app-suggested-path-card",ae);class oe extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_paths",[]);this.shadowRoot=this.attachShadow({mode:"closed"})}get paths(){return this._paths}set paths(e){this._paths=e,this.update(),this.setupCardsBehaviour()}async connectedCallback(){await g.instance.getCsvPaths(1),this.render(),this.paths=g.instance.getSuggestedPaths(A.instance.activeLayers)}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-paths-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1" autofocus>Percorsi suggeriti</h1>
                </div>
                <p class="page-desc">Elenco di percorsi suggeriti in base ai layer selezionati.</p>
                <section class="suggested-paths-list" role="feed" aria-label="Percorsi suggeriti"></section>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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

                .empty {
                    text-align: center;
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
            `}update(){const e=this.shadowRoot.querySelector(".suggested-paths-list");e&&(e.innerHTML="",this.paths.length===0&&e.append(this.renderEmptyMsg()),this.paths.forEach((s,n)=>{let r=document.createElement("app-suggested-path-card");r.path=s,r.position=n,e.append(r)}))}setupCardsBehaviour(){this.shadowRoot.querySelectorAll("app-suggested-path-card").forEach(s=>{s.addEventListener("suggested-path-selected",n=>{g.instance.selectedSuggestedPath=n.detail.selectedSuggestedPath,window.location.hash="/selected-suggested-path"})})}renderEmptyMsg(){const e=document.createElement("p");return e.innerHTML="Nessun percorso suggerito per il layer attivato al momento",e.classList.add("empty"),e}}customElements.define("page-suggested-paths",oe);class ie extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new m);a(this,"_position",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(e){this._poi=e}get position(){return this._position}set position(e){this._position=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.setupPoiInfoBtn()}setupPoiInfoBtn(){const e=this.shadowRoot.querySelector(".poi-info-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("poi-selected",{detail:{selectedPoi:this.poi}}))})}}customElements.define("app-selected-suggested-path-card",ie);class ce extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_path",new z("",[]));this.shadowRoot=this.attachShadow({mode:"closed"})}get path(){return this._path}set path(e){this._path=e,this.update(),this.setupCardsBeahviour()}connectedCallback(){g.instance.getSelectedSuggestedPath(),this.path=g.instance.selectedSuggestedPath,this.render(),this.update(),this.setupCardsBeahviour()}render(){this.shadowRoot.innerHTML=`
            <div class="suggested-path-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">${this.path.name}</h1>
                </div>
                <section class="suggested-path-list" role="feed"></section>
            </div>

            <style>
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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
            `;const e=this.shadowRoot.querySelector("h1");e&&e.focus()}update(){const e=this.shadowRoot.querySelector(".suggested-path-list");e&&(e.innerHTML="",this.path.pois.forEach((s,n)=>{let r=document.createElement("app-selected-suggested-path-card");r.poi=s,r.position=n+1,e.append(r)}))}setupCardsBeahviour(){this.shadowRoot.querySelectorAll("app-selected-suggested-path-card").forEach(s=>{s.addEventListener("poi-selected",n=>{_.instance.selectedPoi=n.detail.selectedPoi,window.location.hash="/poi"})})}}customElements.define("page-selected-suggested-path",ce);class le extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_poi",new m);this.shadowRoot=this.attachShadow({mode:"closed"})}get poi(){return this._poi}set poi(e){this._poi=e}connectedCallback(){_.instance.getSelectedPoi(),this.poi=_.instance.selectedPoi,this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <div class="poi-page">
                <div class="page-header">
                    <h1 class="page-title" tabindex="-1">Dettaglio punto di interesse</h1>
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
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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
            `;const e=this.shadowRoot.querySelector("h1");e&&e.focus(),this.renderInfo()}renderInfo(){const e=this.shadowRoot.querySelector(".poi-page-infos");e&&this.poi.props.forEach(s=>{const n=this.renderTopic(s);e.appendChild(n)})}renderTopic(e){const s=document.createElement("div");s.classList.add("property");const n=document.createElement("label");n.classList.add("property-label"),n.innerHTML=e.displayName;const r=document.createElement("p");return r.classList.add("property-value"),e.value!==""?r.innerHTML=e.value:r.innerHTML="-",s.appendChild(n),s.appendChild(r),s}setup(){this.setupDirectionsBtn(),this.setupAddToCustomPathBtn()}setupDirectionsBtn(){const e=this.shadowRoot.querySelector("#directions-btn");e&&e.addEventListener("click",()=>{const s=`https://www.google.it/maps/dir/?api=1&destination=${this.poi.coordinates[1]},${this.poi.coordinates[0]}`;window.open(s,"_blank")})}setupAddToCustomPathBtn(){const e=this.shadowRoot.querySelector("#add-to-custom-path-btn");e&&e.addEventListener("click",()=>{L.instance.updateSnackbar(M.Info,"Aggiunto al percorso personalizzato"),g.instance.addPoiToCustomPath(this.poi)})}}customElements.define("page-poi",le);class de extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_contrast",E.LightHigh);this.shadowRoot=this.attachShadow({mode:"closed"})}get contrast(){return this._contrast}set contrast(e){this._contrast=e,this.update(),this.dispatchEvent(new CustomEvent("contrast-updated",{detail:{contrast:this.contrast}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const e=this.shadowRoot.querySelector("#light-contrast"),s=this.shadowRoot.querySelector("#dark-contrast"),n=this.shadowRoot.querySelector("#light-high-contrast"),r=this.shadowRoot.querySelector("#dark-high-contrast");!e||!s||!n||!r||(e.addEventListener("change",()=>this.contrast=E.Light),s.addEventListener("change",()=>this.contrast=E.Dark),n.addEventListener("change",()=>this.contrast=E.LightHigh),r.addEventListener("change",()=>this.contrast=E.DarkHigh))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="contrast"]')).forEach(s=>{s.value===this.contrast&&(s.checked=!0)})}}customElements.define("app-settings-contrast",de);class pe extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_fontSize",16);this.shadowRoot=this.attachShadow({mode:"closed"})}get fontSize(){return this._fontSize}set fontSize(e){this._fontSize=e,this.update(),this.dispatchEvent(new CustomEvent("font-size-updated",{detail:{fontSize:this.fontSize}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const e=this.shadowRoot.querySelector("#font-size-s"),s=this.shadowRoot.querySelector("#font-size-m"),n=this.shadowRoot.querySelector("#font-size-l"),r=this.shadowRoot.querySelector("#font-size-xl");!e||!s||!n||!r||(e.addEventListener("change",()=>this.fontSize=parseInt(e.value)),s.addEventListener("change",()=>this.fontSize=parseInt(s.value)),n.addEventListener("change",()=>this.fontSize=parseInt(n.value)),r.addEventListener("change",()=>this.fontSize=parseInt(r.value)))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="font-size"]')).forEach(s=>{s.value===this.fontSize.toString()&&(s.checked=!0)})}}customElements.define("app-settings-font-size",pe);class ue extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_letterSpace",0);this.shadowRoot=this.attachShadow({mode:"closed"})}get letterSpace(){return this._letterSpace}set letterSpace(e){this._letterSpace=e,this.update(),this.dispatchEvent(new CustomEvent("letter-space-updated",{detail:{letterSpace:this.letterSpace}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const e=this.shadowRoot.querySelector("#letter-space-s"),s=this.shadowRoot.querySelector("#letter-space-m"),n=this.shadowRoot.querySelector("#letter-space-l"),r=this.shadowRoot.querySelector("#letter-space-xl");!e||!s||!n||!r||(e.addEventListener("change",()=>this.letterSpace=parseInt(e.value)/100),s.addEventListener("change",()=>this.letterSpace=parseInt(s.value)/100),n.addEventListener("change",()=>this.letterSpace=parseInt(n.value)/100),r.addEventListener("change",()=>this.letterSpace=parseInt(r.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="letter-spacing"]')).forEach(s=>{s.value===(this.letterSpace*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-letter-space",ue);class he extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_lineHeight",1.15);this.shadowRoot=this.attachShadow({mode:"closed"})}get lineHeight(){return this._lineHeight}set lineHeight(e){this._lineHeight=e,this.update(),this.dispatchEvent(new CustomEvent("line-height-updated",{detail:{lineHeight:this.lineHeight}}))}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
            `}setup(){this.handleRadioChange()}handleRadioChange(){const e=this.shadowRoot.querySelector("#line-height-s"),s=this.shadowRoot.querySelector("#line-height-m"),n=this.shadowRoot.querySelector("#line-height-l"),r=this.shadowRoot.querySelector("#line-height-xl");!e||!s||!n||!r||(e.addEventListener("change",()=>this.lineHeight=parseInt(e.value)/100),s.addEventListener("change",()=>this.lineHeight=parseInt(s.value)/100),n.addEventListener("change",()=>this.lineHeight=parseInt(n.value)/100),r.addEventListener("change",()=>this.lineHeight=parseInt(r.value)/100))}update(){Array.from(this.shadowRoot.querySelectorAll('input[name="line-height"]')).forEach(s=>{s.value===Math.round(this.lineHeight*100).toString()&&(s.checked=!0)})}}customElements.define("app-settings-line-height",he);class ge extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_settings",{...d.instance.settings});this.shadowRoot=this.attachShadow({mode:"closed"})}get settings(){return this._settings}set settings(e){this._settings=e}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
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
                :host {
                    display: block;
                    padding:  0 0 5rem 0;
                }
                
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
            `;const e=this.shadowRoot.querySelector("h1");e&&e.focus()}setup(){const e=this.shadowRoot.querySelector("app-settings-contrast"),s=this.shadowRoot.querySelector("app-settings-font-size"),n=this.shadowRoot.querySelector("app-settings-letter-space"),r=this.shadowRoot.querySelector("app-settings-line-height");e&&s&&n&&r&&(e.contrast=this.settings.contrast,s.fontSize=this.settings.fontSize,r.lineHeight=this.settings.lineHeight,n.letterSpace=this.settings.letterSpace,e.addEventListener("contrast-updated",i=>{this.settings.contrast=i.detail.contrast,d.instance.settings.contrast=this.settings.contrast,d.instance.setContrast(),d.instance.settings=this.settings}),s.addEventListener("font-size-updated",i=>{this.settings.fontSize=i.detail.fontSize,d.instance.settings.fontSize=this.settings.fontSize,d.instance.setFontSize(this.settings.fontSize),d.instance.settings=this.settings}),n.addEventListener("letter-space-updated",i=>{this.settings.letterSpace=i.detail.letterSpace,d.instance.settings.letterSpace=this.settings.letterSpace,d.instance.setLetterSpace(this.settings.letterSpace),d.instance.settings=this.settings}),r.addEventListener("line-height-updated",i=>{this.settings.lineHeight=i.detail.lineHeight,d.instance.settings.lineHeight=this.settings.lineHeight,d.instance.setLineHeight(this.settings.lineHeight),d.instance.settings=this.settings}))}}customElements.define("page-settings",ge);class me extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_snackbar",T.createEmpty());this.shadowRoot=this.attachShadow({mode:"closed"})}get snackbar(){return this._snackbar}set snackbar(e){this._snackbar=e,this.update()}connectedCallback(){this.render(),this.update()}render(){this.shadowRoot.innerHTML=`
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
            `}update(){if(this.snackbar.message.length===0){const s=this.shadowRoot.querySelector(".snackbar");if(!s)return;s.classList.add("empty-snackbar");return}const e=this.shadowRoot.querySelector(".snackbar-message");if(e)switch(e.innerHTML=this.snackbar.message,this.snackbar.type){case M.Error:this.renderErrorSnackbar();break;default:this.renderInfoSnackbar();break}}renderInfoSnackbar(){const e=this.shadowRoot.querySelector(".snackbar");e&&(e.classList.remove("empty-snackbar"),e.classList.add("info-snackbar"))}renderErrorSnackbar(){const e=this.shadowRoot.querySelector(".snackbar");e&&(e.classList.remove("empty-snackbar"),e.classList.add("error-snackbar"))}resetSnackbar(){const e=this.shadowRoot.querySelector(".snackbar-message"),s=this.shadowRoot.querySelector(".snackbar");e&&s&&(e.innerHTML="",s.classList.remove("info-snackbar"),s.classList.remove("error-snackbar"),s.classList.add("empty-snackbar"))}}customElements.define("app-snackbar",me);class ye extends HTMLElement{constructor(){super();a(this,"shadowRoot");a(this,"_showSettings",!0);this.shadowRoot=this.attachShadow({mode:"closed"})}get showSettings(){return this._showSettings}set showSettings(e){this._showSettings=e,this.configBar(this.showSettings)}connectedCallback(){this.render(),this.setup(),this.checkCurrentPage()}render(){this.shadowRoot.innerHTML=`
            <nav class="menu" role="tablist">
                <a class="bar-el-link categories-link" href="/categories" title="Categorie" role="tab" aria-selected="false" aria-controls="categories-panel">
                    <span class="material-symbols-outlined icon" aria-label="Categorie">stacks</span>
                </a>

                <a class="bar-el-link around-you-link" href="/around-you" title="Intorno a te" role="tab" aria-selected="false" aria-controls="around-you-panel">
                    <span class="material-symbols-outlined icon" aria-label="Intorno a te">explore</span>
                </a>

                <a class="bar-el-link suggested-paths-link" href="/suggested-paths" title="Percorsi suggeriti" role="tab" aria-selected="false" aria-controls="suggested-paths-panel">
                    <span class="material-symbols-outlined icon" aria-label="Percorsi suggeriti">directions</span>
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
            `}setup(){this.onLinkClick(),window.addEventListener("hashchange",()=>this.checkCurrentPage())}onLinkClick(){Array.from(this.shadowRoot.querySelectorAll(".bar-el-link")).forEach(s=>{s.addEventListener("click",n=>{n.preventDefault();const r=s.getAttribute("href");r&&(window.location.hash=r)})})}checkCurrentPage(){const e=window.location.hash.slice(2);Array.from(this.shadowRoot.querySelectorAll(".bar-el-link")).forEach(n=>{var r;((r=n.getAttribute("href"))==null?void 0:r.slice(1))===e?(n.classList.add("current"),n.setAttribute("aria-selected","true")):(n.classList.remove("current"),n.setAttribute("aria-selected","false"))})}configBar(e){const s=this.shadowRoot.querySelector(".settings-link");s&&(e||(s.style.display="none"))}}customElements.define("app-bar",ye);class be extends HTMLElement{constructor(){super();a(this,"shadowRoot");this.shadowRoot=this.attachShadow({mode:"closed"})}connectedCallback(){this.render(),this.setup()}render(){this.shadowRoot.innerHTML=`
            <button type="button" aria-label="Torna alla profilazione">
                <span class="material-symbols-outlined">apps</span>
            </button>

            <style>
                button {
                    cursor: pointer;
                    height: 40px;
                    width: 40px;
                    background-color: transparent;
                    border: none;
                    color: var(--on-surface);

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
            `}setup(){const e=this.shadowRoot.querySelector("button");e&&e.addEventListener("click",()=>window.location.href="https://daviderivolta-ett.github.io/raise-app/")}}customElements.define("app-home",be);g.instance.getSavedCustomPath();A.instance.getSavedLayers();const fe=document.querySelector("app-router"),ve=new H("categories",x.Default,()=>"<page-categories />"),Pe=new H("around-you",x.Page,()=>"<page-around-you />"),we=new H("settings",x.Page,()=>"<page-settings />"),Se=new H("poi",x.Page,()=>"<page-poi />"),Ee=new H("custom-path",x.Page,()=>"<page-custom-path />"),xe=new H("suggested-paths",x.Page,()=>"<page-suggested-paths />"),ke=new H("selected-suggested-path",x.Page,()=>"<page-selected-suggested-path />"),Le=[ve,Pe,we,Se,Ee,xe,ke];fe.addRoutes(Le);d.instance.getLocalStorageSettings();const X=document.querySelector("app-bar");X&&(X.showSettings=d.instance.settings.showSettings);
