import {track} from '../analytics/track';import {useEffect,useLayoutEffect,useRef,useState} from 'react';import {Link} from 'react-router-dom';import {ArrowUpRight} from 'lucide-react';
import {gsap,reduced} from '../animations/smooth';import {programs,visual} from '../data/programs';import {Magnetic,SplitText} from '../components/UI';import {inr} from '../components/Chrome';
const STATS=[['Members',48200],['Programs',14],['Lbs Lifted',9200000],['Transformations',7300]];
const TIERS=[['Starter',499,['1 program of your choice','Community access','Monthly check-in']],['Pro',1499,['All workout programs','Diet plans included','Weekly live Q&A']],['Elite',3999,['Everything in Pro','1:1 coach reviews','Merch drop every quarter']]];
export default function Home(){const root=useRef();const [load,setLoad]=useState(0);const [done,setDone]=useState(false);const [sent,setSent]=useState(false);const [email,setEmail]=useState('');
useEffect(()=>{const o={n:0};const t=gsap.to(o,{n:100,duration:reduced()?.1:2.2,ease:'power2.inOut',onUpdate:()=>setLoad(Math.round(o.n)),onComplete:()=>setTimeout(()=>setDone(true),200)});return()=>t.kill()},[]);
useLayoutEffect(()=>{if(!done)return;const ctx=gsap.context(()=>{
gsap.from('.hero-title .mi',{yPercent:115,stagger:.06,duration:1.2,ease:'power4.out'});
const mm=gsap.matchMedia();
mm.add('(min-width:769px)',()=>{const tr=document.querySelector('.htrack');gsap.to(tr,{x:()=>-(tr.scrollWidth-innerWidth+80),ease:'none',scrollTrigger:{trigger:'.hwrap',pin:true,scrub:1,end:()=>'+='+tr.scrollWidth,invalidateOnRefresh:true}})});
gsap.utils.toArray('[data-split] .mi').forEach(el=>gsap.from(el,{yPercent:115,duration:1,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 92%'}}));
gsap.utils.toArray('.stat b').forEach(el=>{const o={n:0},t=+el.dataset.v;gsap.to(o,{n:t,duration:2,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%',once:true},onUpdate:()=>el.textContent=Math.round(o.n).toLocaleString('en-IN')})});
gsap.timeline({scrollTrigger:{trigger:'.manifesto',start:'top top',end:'+=1800',pin:true,scrub:true}}).fromTo('.manifesto',{backgroundColor:'#0A0A0A'},{backgroundColor:'#C6FF00',duration:1}).to('.manifesto',{backgroundColor:'#0A0A0A',duration:1}).from('.mline .mi',{yPercent:115,stagger:.4,duration:1},0);
gsap.to('.lift',{scale:1.8,letterSpacing:'.15em',scrollTrigger:{trigger:'.liftsec',start:'top top',end:'+=900',pin:true,scrub:true}});
const mv=e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to('.hero-title',{x:x*40,y:y*20,duration:.8});gsap.to('.hero-bg',{x:-x*30,y:-y*30,duration:1})};
if(!matchMedia('(pointer:coarse)').matches)addEventListener('mousemove',mv);
let last=0;const sc=()=>{const a=document.querySelector('.mq-track')?.getAnimations()[0];if(a){a.playbackRate=1+Math.min(Math.abs(scrollY-last),60)/4;last=scrollY}};addEventListener('scroll',sc);
return()=>{removeEventListener('mousemove',mv);removeEventListener('scroll',sc);mm.revert()}},root);return()=>ctx.revert()},[done]);
const words=Array(8).fill('NO EXCUSES — NO DAYS OFF — JOIN THE CULT — ').join('');
return <div ref={root}>
{!done&&<div className="loader"><div className="logo big">IRON<b>CULT</b></div><div className="count">{load}</div></div>}
<section className="hero"><div className="hero-bg" style={{backgroundImage:`url("${visual('Iron Cult',true)}")`}}/>
<div className="hero-in"><p className="mono">JOIN THE CULT. BUILD THE BODY.</p><h1 className="hero-title">{'IRONCULT'.split('').map((c,i)=><span className="mask" key={i}><span className="mi">{c}</span></span>)}</h1>
<div className="ctas"><Magnetic><Link to="/programs" className="btn" data-cursor="GO">START TRAINING</Link></Magnetic><Magnetic><Link to="/programs" className="btn ghost" data-cursor="VIEW">VIEW PROGRAMS</Link></Magnetic></div></div></section>
<div className="mq"><div className="mq-track">{words}</div></div>
<section className="liftsec"><span className="lift">LIFT</span></section>
<section className="hwrap"><SplitText text="THE PROGRAMS" className="sec-h"/><div className="hscroll"><div className="htrack">{programs.filter(p=>p.featured).map(p=><Link key={p.id} to={'/program/'+p.id} className="hcard" data-cursor="VIEW"><div className="img"><img src={p.image} alt={p.title}/></div><div className="meta"><h3>{p.title}</h3><span className="mono">{inr(p.price)} <ArrowUpRight size={16}/></span></div></Link>)}</div></div></section>
<section className="stats">{STATS.map(([l,v])=><div className="stat" key={l}><b data-v={v}>0</b><span className="mono">{l}</span></div>)}</section>
<section className="manifesto" id="about"><h2><span className="mline mask"><span className="mi">WE DON'T DO MOTIVATION.</span></span><span className="mline mask"><span className="mi acid">WE DO DISCIPLINE.</span></span></h2></section>
<section className="tiers" id="membership"><SplitText text="MEMBERSHIP" className="sec-h"/><div className="tgrid">{TIERS.map(([n,p,f])=><div className="tier" key={n}><h3>{n}</h3><p className="tp">{inr(p)}<small className="mono">/MONTH</small></p><ul>{f.map(x=><li key={x} className="mono">{x}</li>)}</ul><Link to="/programs" className="btn ghost" data-cursor="JOIN">JOIN {n.toUpperCase()}</Link></div>)}</div></section>
<section className="news"><h2>GET THE DROP.</h2>{sent?<p className="mono acid">YOU'RE IN. WELCOME TO THE CULT.</p>:<form onSubmit={e=>{e.preventDefault();if(/^\S+@\S+\.\S+$/.test(email)){track('newsletter_signup');setSent(true)}}}><input type="email" required placeholder="YOUR EMAIL" value={email} onChange={e=>setEmail(e.target.value)}/><button className="btn">SIGN UP</button></form>}</section>
</div>}
