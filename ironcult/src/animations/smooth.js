import Lenis from 'lenis';import gsap from 'gsap';import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export function startSmooth(){if(reduced())return()=>{};const l=new Lenis({lerp:.09});l.on('scroll',ScrollTrigger.update);
const f=t=>l.raf(t*1000);gsap.ticker.add(f);gsap.ticker.lagSmoothing(0);return()=>{gsap.ticker.remove(f);l.destroy()}}
export {gsap,ScrollTrigger};
