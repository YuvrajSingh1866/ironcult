import {useMemo,useState,useEffect} from 'react';import {track} from '../analytics/track';import {Link} from 'react-router-dom';import {motion,AnimatePresence} from 'framer-motion';import {ArrowUpRight} from 'lucide-react';
import {programs,CATEGORIES} from '../data/programs';import {useCart} from '../context/CartContext';import {inr} from '../components/Chrome';
export default function Programs(){const {add}=useCart();const [q,setQ]=useState('');const [cat,setCat]=useState('All');const [lvl,setLvl]=useState('All');const [max,setMax]=useState(5000);const [sort,setSort]=useState('Featured');
useEffect(()=>{if(q.length<3)return;const t=setTimeout(()=>track('search',{q}),800);return()=>clearTimeout(t)},[q]);
const list=useMemo(()=>{let l=programs.filter(p=>(cat==='All'||p.category===cat)&&(lvl==='All'||p.level===lvl)&&p.price<=max&&p.title.toLowerCase().includes(q.toLowerCase()));
const s={Featured:(a,b)=>b.featured-a.featured||a.order-b.order,Newest:(a,b)=>b.isNew-a.isNew||a.order-b.order,'Price low→high':(a,b)=>a.price-b.price,'Price high→low':(a,b)=>b.price-a.price,Rating:(a,b)=>b.rating-a.rating};return [...l].sort(s[sort])},[q,cat,lvl,max,sort]);
return <div className="page"><h1 className="page-h">PROGRAMS</h1>
<div className="filters"><input placeholder="SEARCH" value={q} onChange={e=>setQ(e.target.value)}/><select value={lvl} onChange={e=>setLvl(e.target.value)}>{['All','Beginner','Intermediate','Advanced'].map(x=><option key={x}>{x}</option>)}</select>
<label className="mono">UP TO {inr(max)}<input type="range" min="500" max="5000" step="100" value={max} onChange={e=>setMax(+e.target.value)}/></label>
<select value={sort} onChange={e=>setSort(e.target.value)}>{['Featured','Newest','Price low→high','Price high→low','Rating'].map(x=><option key={x}>{x}</option>)}</select></div>
<div className="tabs">{['All',...CATEGORIES].map(c=><button key={c} className={'mono'+(cat===c?' on':'')} onClick={()=>setCat(c)}>{c.toUpperCase()}</button>)}</div>
<motion.div layout className="pgrid"><AnimatePresence>{list.map((p,i)=><motion.article layout key={p.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.9}} transition={{duration:.4}} className={'pcard'+(i%5===0?' wide':'')}>
<Link to={'/program/'+p.id} data-cursor="OPEN"><div className="img"><img src={p.image} alt={p.title}/><img className="alt" src={p.image2} alt=""/></div>
<div className="meta"><span className="mono">{p.category.toUpperCase()} · {p.level.toUpperCase()}</span><h3>{p.title} {p.isNew&&<em className="mono tag">NEW</em>}</h3><div className="row"><span className="mono">{inr(p.price)} <s>{inr(p.originalPrice)}</s></span><ArrowUpRight className="arr"/></div></div></Link>
<button className="addbtn mono" onClick={e=>add(p,e.currentTarget)}>ADD TO CART</button></motion.article>)}</AnimatePresence></motion.div>
{!list.length&&<p className="mono empty">NOTHING MATCHES. RESET YOUR FILTERS.</p>}</div>}
