import {useEffect,useRef} from 'react';import gsap from 'gsap';
export function Magnetic({children}){const r=useRef();useEffect(()=>{const e=r.current;if(matchMedia('(pointer:coarse)').matches)return;
const mv=ev=>{const b=e.getBoundingClientRect();gsap.to(e,{x:(ev.clientX-b.left-b.width/2)*.3,y:(ev.clientY-b.top-b.height/2)*.3,duration:.4})};
const lv=()=>gsap.to(e,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'});e.addEventListener('mousemove',mv);e.addEventListener('mouseleave',lv);return()=>{e.removeEventListener('mousemove',mv);e.removeEventListener('mouseleave',lv)}},[]);
return <span ref={r} style={{display:'inline-block'}}>{children}</span>}
export function SplitText({text,className='',as:T='h2'}){return <T className={className} data-split>{text.split(' ').map((w,i)=><span key={i} className="mask"><span className="mi">{w}&nbsp;</span></span>)}</T>}
export function Cursor(){const d=useRef(),l=useRef();useEffect(()=>{if(matchMedia('(pointer:coarse)').matches)return;const e=d.current;e.style.display='flex';
const x=gsap.quickTo(e,'x',{duration:.25}),y=gsap.quickTo(e,'y',{duration:.25});
const mv=ev=>{x(ev.clientX);y(ev.clientY)};
const ov=ev=>{const t=ev.target.closest('[data-cursor],a,button');e.classList.toggle('big',!!t);l.current.textContent=t?.dataset?.cursor||''};
addEventListener('mousemove',mv);addEventListener('mouseover',ov);return()=>{removeEventListener('mousemove',mv);removeEventListener('mouseover',ov)}},[]);
return <div ref={d} className="cursor"><span ref={l}/></div>}
