import {useState,useRef} from 'react';
export default function useScramble(text){const [v,setV]=useState(text);const t=useRef();
const run=()=>{clearInterval(t.current);let n=0;t.current=setInterval(()=>{setV(text.split('').map((c,i)=>i<n?c:'#$%&*+/<>'[Math.floor(Math.random()*9)]).join(''));n+=.5;if(n>=text.length){clearInterval(t.current);setV(text)}},30)};
return [v,run]}
