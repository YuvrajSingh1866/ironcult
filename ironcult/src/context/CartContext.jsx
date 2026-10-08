import {createContext,useContext,useEffect,useState,useCallback} from 'react';import gsap from 'gsap';import {track} from '../analytics/track';
const Ctx=createContext();export const useCart=()=>useContext(Ctx);
export function CartProvider({children}){
const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem('ironcult-cart'))||[]}catch{return[]}});
const [open,setOpen]=useState(false);const [toast,setToast]=useState(false);
useEffect(()=>{localStorage.setItem('ironcult-cart',JSON.stringify(items))},[items]);
const fly=el=>{const t=document.getElementById('cart-btn');if(!el||!t)return;const a=el.getBoundingClientRect(),b=t.getBoundingClientRect();const c=document.createElement('div');
Object.assign(c.style,{position:'fixed',zIndex:9999,left:a.left+'px',top:a.top+'px',width:'60px',height:'60px',background:'#C6FF00',pointerEvents:'none'});document.body.appendChild(c);
gsap.to(c,{left:b.left+'px',top:b.top+'px',scale:.2,opacity:.4,duration:.8,ease:'power3.in',onComplete:()=>c.remove()})};
const add=useCallback((p,el)=>{track('add_to_cart',{id:p.id,title:p.title,price:p.price});fly(el);setItems(i=>i.find(x=>x.id===p.id)?i.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...i,{id:p.id,title:p.title,price:p.price,image:p.image,qty:1}]);setToast(true);setTimeout(()=>setToast(false),1800)},[]);
const qty=(id,d)=>setItems(i=>i.map(x=>x.id===id?{...x,qty:x.qty+d}:x).filter(x=>x.qty>0));
const remove=id=>setItems(i=>i.filter(x=>x.id!==id));const clear=()=>setItems([]);
const count=items.reduce((s,x)=>s+x.qty,0),total=items.reduce((s,x)=>s+x.qty*x.price,0);
return <Ctx.Provider value={{items,add,qty,remove,clear,count,total,open,setOpen,toast}}>{children}</Ctx.Provider>}
