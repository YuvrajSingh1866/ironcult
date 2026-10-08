import {useEffect} from 'react';import {Routes,Route,useLocation} from 'react-router-dom';import {motion} from 'framer-motion';
import {startSmooth,ScrollTrigger} from './animations/smooth';import {Nav,CartDrawer,Footer} from './components/Chrome';import {Cursor} from './components/UI';
import {track,initGA} from './analytics/track';import Analytics from './pages/Analytics';import Home from './pages/Home';import Programs from './pages/Programs';import Detail from './pages/Detail';import Checkout from './pages/Checkout';
export default function App(){const {pathname}=useLocation();
useEffect(()=>{initGA();return startSmooth()},[]);
useEffect(()=>{scrollTo(0,0);track('page_view',{path:pathname});const t=setTimeout(()=>ScrollTrigger.refresh(),800);return()=>clearTimeout(t)},[pathname]);
return <><div className="grain"/><Cursor/><Nav/><CartDrawer/>
<motion.div key={'c'+pathname} className="curtain" initial={{scaleY:1}} animate={{scaleY:0}} transition={{duration:.7,ease:[.76,0,.24,1]}}/>
<main><Routes><Route path="/" element={<Home/>}/><Route path="/programs" element={<Programs/>}/><Route path="/program/:id" element={<Detail/>}/><Route path="/analytics" element={<Analytics/>}/><Route path="/checkout" element={<Checkout/>}/></Routes></main><Footer/></>}
