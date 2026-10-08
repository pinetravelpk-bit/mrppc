'use client';
import {useEffect} from 'react';
export default function HeroMotion(){useEffect(()=>{
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),root=document.querySelector('.hero-media');if(!root)return;
const slides=[...root.querySelectorAll('.slide')],dots=[...root.querySelectorAll('.dots button')],pause=root.querySelector('#pause');
let current=0,paused=reduced.matches,timer,frame,orbitalTime=0,lastOrbitFrame=0;
const controller=new AbortController();const on=(el,type,fn,options={})=>el.addEventListener(type,fn,{...options,signal:controller.signal});
function showSlide(index){current=index;slides.forEach((s,i)=>{s.classList.toggle('active',i===index);s.setAttribute('aria-hidden',String(i!==index))});dots.forEach((d,i)=>{d.classList.toggle('selected',i===index);d.setAttribute('aria-pressed',String(i===index))})}
function setTimer(){clearInterval(timer);if(slides.length>1&&!paused&&!document.hidden)timer=setInterval(()=>showSlide((current+1)%slides.length),7600)}
function syncMotion(){document.body.classList.toggle('paused',paused);pause.textContent=paused?'Play motion ▷':'Pause motion Ⅱ';pause.setAttribute('aria-label',paused?'Play animations':'Pause animations');pause.setAttribute('aria-pressed',String(paused));setTimer()}
dots.forEach((dot,i)=>on(dot,'click',()=>{showSlide(i);setTimer()}));on(pause,'click',()=>{paused=!paused;syncMotion()});on(document,'visibilitychange',setTimer);on(reduced,'change',e=>{paused=e.matches;syncMotion()});
let startX=null;on(root,'touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});on(root,'touchend',e=>{if(startX===null)return;const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>55){showSlide((current+(delta<0?1:slides.length-1))%slides.length);setTimer()}startX=null},{passive:true});
const orbitLayers=[...root.querySelectorAll('[data-orbit]')],orbitRings=[...root.querySelectorAll('[data-ring]')];
function paintOrbits(time){
 orbitLayers.forEach(el=>{
  const stage=el.parentElement;if(!stage.closest('.slide').classList.contains('active'))return;
  const type=el.dataset.orbit,phase=Number(el.dataset.phase),radius=Number(el.dataset.radius);
  const speed=type==='commerce'?.85:type==='growth'?.8:.72;
  const angle=time*speed+phase;
  const w=stage.clientWidth,h=stage.clientHeight;
  const depth=Math.sin(angle);
  const x=Math.cos(angle)*w*radius;
  const y=depth*h*(type==='social'?.27:.22)-Math.cos(angle)*h*.15;
  const scale=.77+(depth+1)*.19;
  el.style.transform=`translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(${scale}) rotate(${Math.sin(angle)*12}deg)`;
  el.style.zIndex=depth>0?'5':'1';
  el.style.opacity=String(.78+(depth+1)*.11);
 });
 orbitRings.forEach(el=>{
  if(!el.closest('.slide').classList.contains('active'))return;
  const type=el.dataset.ring;
  const phase=time*(type==='social'?.72:type==='commerce'?.85:.8);
  const secondary=el.classList.contains('ring-second');
  const tilt=type==='growth'?phase*180/Math.PI:(secondary?22:-20)+Math.sin(phase)*15;
  el.style.transform=`rotate(${tilt}deg) rotateX(${Math.cos(phase)*28}deg) rotateY(${Math.sin(phase)*28}deg)`;
  // A rotating highlight follows the same orbital phase as the foreground symbols.
  el.style.filter=`drop-shadow(${Math.cos(phase)*5}px ${Math.sin(phase)*5}px 8px #b78aff55)`;
 });
}

function orbitFrame(now){const delta=lastOrbitFrame?Math.min((now-lastOrbitFrame)/1000,.05):0;lastOrbitFrame=now;if(!paused&&!reduced.matches&&!document.hidden)orbitalTime+=delta;if(!document.hidden)paintOrbits(orbitalTime);frame=requestAnimationFrame(orbitFrame)}
syncMotion();frame=requestAnimationFrame(orbitFrame);
return()=>{controller.abort();clearInterval(timer);cancelAnimationFrame(frame);document.body.classList.remove('paused')};
},[]);return null}
