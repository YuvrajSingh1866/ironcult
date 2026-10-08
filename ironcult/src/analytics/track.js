const KEY='ironcult-events';
export const getEvents=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}};
export const clearEvents=()=>{try{localStorage.removeItem(KEY)}catch{}window.dispatchEvent(new Event('ironcult-track'))};
export function track(name,data={}){
try{const l=getEvents();l.push({name,data,t:Date.now(),path:location.pathname});localStorage.setItem(KEY,JSON.stringify(l.slice(-1000)))}catch{}
window.dispatchEvent(new Event('ironcult-track'));
if(window.gtag){const{items,...rest}=data;window.gtag('event',name,rest)}}
export function initGA(){const id=import.meta.env.VITE_GA_ID;if(!id||window.gtag)return;
const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+id;document.head.appendChild(s);
window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',id,{send_page_view:false})}
