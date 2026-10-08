'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export default function Reveal(){const path=usePathname();useEffect(()=>{document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[path]);return null;}
