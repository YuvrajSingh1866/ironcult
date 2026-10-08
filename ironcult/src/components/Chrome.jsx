import {useEffect,useState} from 'react';import {Link,useLocation,useNavigate} from 'react-router-dom';import {AnimatePresence,motion} from 'framer-motion';
import {ShoppingBag,Search,X,Plus,Minus,Menu} from 'lucide-react';import {useCart} from '../context/CartContext';import useScramble from '../hooks/useScramble';
export const inr=n=>'₹'+n.toLocaleString('en-IN');
function NavLink({label,onClick}){const [v,run]=useScramble(label);return <a href="#" className="mono navlink" onMouseEnter={run} onClick={e=>{e.preventDefault();onClick()}}>{v}</a>}
export function Nav(){const {count,setOpen}=useCart();const nav=useNavigate();const {pathname}=useLocation();const [sc,setSc]=useState(false);const [m,setM]=useState(false);
useEffect(()=>{const f=()=>setSc(scrollY>60);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
const go=id=>{setM(false);if(id==='programs'||id==='analytics'){nav('/'+id);return}if(pathname!=='/')nav('/');setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'}),pathname==='/'?0:1500)};
return <><header className={'nav'+(sc?' solid':'')}><Link to="/" className="logo">IRON<b>CULT</b></Link>
<nav className="links"><NavLink label="PROGRAMS" onClick={()=>go('programs')}/><NavLink label="MEMBERSHIP" onClick={()=>go('membership')}/><NavLink label="ABOUT" onClick={()=>go('about')}/><NavLink label="ANALYTICS" onClick={()=>go('analytics')}/></nav>
<div className="navr"><Link to="/programs" aria-label="Search"><Search size={20}/></Link>
<button id="cart-btn" aria-label="Cart" onClick={()=>setOpen(true)}><ShoppingBag size={20}/><motion.span key={count} initial={{scale:2}} animate={{scale:1}} className="badge">{count}</motion.span></button>
<button className="burger" aria-label="Menu" onClick={()=>setM(true)}><Menu size={22}/></button></div></header>
<AnimatePresence>{m&&<motion.div className="mobmenu" initial={{clipPath:'inset(0 0 100% 0)'}} animate={{clipPath:'inset(0 0 0% 0)'}} exit={{clipPath:'inset(0 0 100% 0)'}} transition={{duration:.6,ease:[.76,0,.24,1]}}>
<button className="x" onClick={()=>setM(false)} aria-label="Close"><X size={28}/></button>{[['PROGRAMS','programs'],['MEMBERSHIP','membership'],['ABOUT','about'],['ANALYTICS','analytics']].map(([l,id],i)=><motion.a key={id} href="#" initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.3+i*.1}} onClick={e=>{e.preventDefault();go(id)}}>{l}</motion.a>)}</motion.div>}</AnimatePresence></>}
export function CartDrawer(){const {open,setOpen,items,qty,remove,total,toast}=useCart();const nav=useNavigate();
return <><AnimatePresence>{toast&&<motion.div className="toast mono" initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}}>ADDED TO CART</motion.div>}</AnimatePresence>
<AnimatePresence>{open&&<><motion.div className="scrim" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)}/>
<motion.aside className="drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.6,ease:[.76,0,.24,1]}}>
<div className="dh"><h3>YOUR CART</h3><button onClick={()=>setOpen(false)} aria-label="Close cart"><X/></button></div>
<div className="dbody">{items.length===0&&<p className="mono">NOTHING HERE YET. NO EXCUSES.</p>}
{items.map((i,k)=><motion.div key={i.id} className="ditem" initial={{x:60,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:.3+k*.08}}><img src={i.image} alt={i.title}/>
<div><h4>{i.title}</h4><p className="mono">{inr(i.price)}</p><div className="qty"><button onClick={()=>qty(i.id,-1)} aria-label="Less"><Minus size={14}/></button><span>{i.qty}</span><button onClick={()=>qty(i.id,1)} aria-label="More"><Plus size={14}/></button><button className="rm mono" onClick={()=>remove(i.id)}>REMOVE</button></div></div></motion.div>)}</div>
<div className="df"><div className="row"><span className="mono">TOTAL</span><strong>{inr(total)}</strong></div><button className="btn" disabled={!items.length} onClick={()=>{setOpen(false);nav('/checkout')}}>CHECKOUT</button></div></motion.aside></>}</AnimatePresence></>}
export function Footer(){return <footer className="foot"><div className="fgrid"><div><p className="mono">JOIN THE CULT. BUILD THE BODY.</p><Link to="/programs">Programs</Link><Link to="/checkout">Checkout</Link><Link to="/analytics">Analytics</Link><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></div><p className="mono">© {new Date().getFullYear()} IRONCULT. ALL RIGHTS RESERVED.</p></div><h2 className="nodays">NO DAYS OFF.</h2><div className="wordmark">IRONCULT</div></footer>}
