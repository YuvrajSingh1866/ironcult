import {useEffect,useState} from 'react';import {getEvents,clearEvents} from '../analytics/track';import {inr} from '../components/Chrome';
const count=(ev,n)=>ev.filter(e=>e.name===n).length;
const top=a=>Object.entries(a.reduce((m,k)=>(m[k]=(m[k]||0)+1,m),{})).sort((x,y)=>y[1]-x[1]).slice(0,5);
export default function Analytics(){const [ev,setEv]=useState(getEvents());
useEffect(()=>{const f=()=>setEv(getEvents());addEventListener('ironcult-track',f);return()=>removeEventListener('ironcult-track',f)},[]);
const pv=count(ev,'page_view'),pu=count(ev,'purchase');const rev=ev.filter(e=>e.name==='purchase').reduce((s,e)=>s+(e.data.value||0),0);
const funnel=[['Page views',pv],['Product views',count(ev,'view_item')],['Add to cart',count(ev,'add_to_cart')],['Checkout started',count(ev,'begin_checkout')],['Purchases',pu]];const m=Math.max(1,...funnel.map(f=>f[1]));
const prods=top(ev.filter(e=>e.name==='add_to_cart').map(e=>e.data.title));const sr=top(ev.filter(e=>e.name==='search').map(e=>String(e.data.q).toLowerCase()));
const exp=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(ev,null,2)],{type:'application/json'}));a.download='ironcult-events.json';a.click()};
return <div className="page"><h1 className="page-h">ANALYTICS</h1><p className="mono">LIVE EVENTS FROM THIS BROWSER · {ev.length} LOGGED</p>
<div className="kpis">{[['Page views',pv],['Orders',pu],['Revenue',inr(rev)],['Conversion',(pv?pu/pv*100:0).toFixed(1)+'%']].map(([l,v])=><div key={l} className="kpi"><b>{v}</b><span className="mono">{l.toUpperCase()}</span></div>)}</div>
<h3 className="ah">FUNNEL</h3>{funnel.map(([l,v])=><div key={l} className="frow"><span className="mono">{l.toUpperCase()}</span><div className="bar"><i style={{width:(v/m*100)+'%'}}/></div><b>{v}</b></div>)}
<div className="two"><div><h3 className="ah">TOP ADDED</h3>{prods.length?prods.map(([k,v])=><div className="row" key={k}><span>{k}</span><span className="mono">{v}</span></div>):<p className="mono">NO DATA YET</p>}</div>
<div><h3 className="ah">TOP SEARCHES</h3>{sr.length?sr.map(([k,v])=><div className="row" key={k}><span>{k}</span><span className="mono">{v}</span></div>):<p className="mono">NO DATA YET</p>}</div></div>
<h3 className="ah">RECENT</h3><div className="feed">{[...ev].reverse().slice(0,12).map((e,i)=><div key={i} className="mono">{new Date(e.t).toLocaleTimeString()} — {e.name} — {e.path}</div>)}</div>
<div className="ctas"><button className="btn ghost" onClick={exp}>EXPORT JSON</button><button className="btn ghost" onClick={clearEvents}>RESET</button></div></div>}
