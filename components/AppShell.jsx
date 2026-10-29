'use client';
// Mobile app shell: sticky bottom tab bar, slide-up menu sheet, PWA install prompt and service worker registration.
// Shown on phones and small tablets only (see app/app.css). Desktop keeps the normal header and footer.
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useRef,useState} from 'react';
import {services} from '@/lib/services';
import {business,telHref} from '@/lib/site';

const DISMISS_KEY='mrppc-install-dismissed';
const DISMISS_DAYS=10;
const store={get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};

const Icon={
  home:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>,
  grid:<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/></svg>,
  call:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>,
  wa:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.7l4.8-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A8 8 0 1 1 12 20zm4.4-6c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>,
  menu:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  close:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  share:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  plus:<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  download:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
};

export default function AppShell(){
  const path=usePathname();
  const [sheet,setSheet]=useState(false);
  const [prompt,setPrompt]=useState(null);       // Android / desktop Chrome install event
  const [ios,setIos]=useState(false);            // iPhone or iPad, install is manual via Share
  const [installed,setInstalled]=useState(false);
  const [banner,setBanner]=useState(false);
  const [iosHelp,setIosHelp]=useState(false);
  const sheetRef=useRef(null);

  // close overlays on navigation
  useEffect(()=>{setSheet(false);setIosHelp(false)},[path]);

  // lock page scroll while a sheet is open, close on Escape
  useEffect(()=>{const open=sheet||iosHelp;document.documentElement.classList.toggle('sheet-open',open);if(!open)return;
    const onKey=e=>{if(e.key==='Escape'){setSheet(false);setIosHelp(false)}};window.addEventListener('keydown',onKey);
    sheetRef.current?.querySelector('a,button')?.focus();return()=>window.removeEventListener('keydown',onKey)},[sheet,iosHelp]);

  useEffect(()=>{
    const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
    setInstalled(standalone);document.documentElement.classList.toggle('is-app',standalone);
    const ua=navigator.userAgent;const isIos=/iphone|ipad|ipod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);setIos(isIos);
    const onPrompt=e=>{e.preventDefault();setPrompt(e)};
    const onInstalled=()=>{setInstalled(true);setBanner(false);setPrompt(null)};
    window.addEventListener('beforeinstallprompt',onPrompt);window.addEventListener('appinstalled',onInstalled);
    if('serviceWorker' in navigator&&process.env.NODE_ENV==='production')navigator.serviceWorker.register('/sw.js').catch(()=>{});
    return()=>{window.removeEventListener('beforeinstallprompt',onPrompt);window.removeEventListener('appinstalled',onInstalled)}},[]);

  // show the install banner once the visitor has engaged a little, unless dismissed recently
  const canInstall=!installed&&(prompt||ios);
  useEffect(()=>{if(!canInstall)return;const last=Number(store.get(DISMISS_KEY)||0);if(Date.now()-last<DISMISS_DAYS*864e5)return;
    let done=false;const show=()=>{if(!done){done=true;setBanner(true)}};const t=setTimeout(show,12000);
    const onScroll=()=>{if(scrollY>innerHeight*1.2)show()};window.addEventListener('scroll',onScroll,{passive:true});
    return()=>{clearTimeout(t);window.removeEventListener('scroll',onScroll)}},[canInstall]);

  const install=async()=>{if(prompt){prompt.prompt();const {outcome}=await prompt.userChoice.catch(()=>({}));if(outcome==='accepted')setInstalled(true);setPrompt(null);setBanner(false)}else if(ios){setBanner(false);setSheet(false);setIosHelp(true)}};
  const dismiss=()=>{store.set(DISMISS_KEY,String(Date.now()));setBanner(false)};

  const active=href=>href==='/'?path==='/':path.startsWith(href);
  const tabs=[['/','Home',Icon.home],['/services/','Services',Icon.grid]];

  return <>
    <nav className="app-tabbar" aria-label="Quick actions">
      {tabs.map(([href,label,icon])=><Link key={href} href={href} className="tab" aria-current={active(href)?'page':undefined}>{icon}<span>{label}</span></Link>)}
      <a className="tab tab-call" href={telHref} aria-label={`Call ${business.phone}`}><span className="call-orb">{Icon.call}</span><span>Call</span></a>
      <a className="tab tab-wa" href={business.whatsapp} rel="noopener" aria-label="WhatsApp">{Icon.wa}<span>WhatsApp</span></a>
      <button type="button" className="tab" aria-expanded={sheet} aria-controls="app-sheet" onClick={()=>setSheet(s=>!s)}>{sheet?Icon.close:Icon.menu}<span>Menu</span></button>
    </nav>

    <div className={`app-backdrop${sheet||iosHelp?' show':''}`} onClick={()=>{setSheet(false);setIosHelp(false)}} aria-hidden="true"/>

    <div id="app-sheet" ref={sheet?sheetRef:null} className={`app-sheet${sheet?' open':''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!sheet} inert={!sheet}>
      <span className="sheet-grab" aria-hidden="true"/>
      <div className="sheet-head"><strong>MrPPC<span>.pk</span></strong><button type="button" className="sheet-close" aria-label="Close menu" onClick={()=>setSheet(false)}>{Icon.close}</button></div>
      <div className="sheet-quick">
        <Link href="/blog/" aria-current={active('/blog/')?'page':undefined}>Blog</Link>
        <Link href="/our-approach/" aria-current={active('/our-approach/')?'page':undefined}>Our approach</Link>
        <Link href="/about/" aria-current={active('/about/')?'page':undefined}>About Syed</Link>
        <Link href="/contact/" aria-current={active('/contact/')?'page':undefined}>Contact</Link>
      </div>
      <p className="sheet-label">Services</p>
      <div className="sheet-services">{services.map(s=><Link key={s.slug} href={`/services/${s.slug}/`} aria-current={active(`/services/${s.slug}/`)?'page':undefined}>{s.name}</Link>)}</div>
      <Link className="button sheet-cta" href="/contact/">Get a free PPC audit</Link>
      {canInstall&&<button type="button" className="sheet-install" onClick={install}>{Icon.download}<span><b>Install the MrPPC app</b><small>Free, no app store needed</small></span></button>}
      <p className="sheet-foot">{business.addressLine}<br/><a href={telHref}>{business.phone}</a></p>
    </div>

    {banner&&canInstall&&<div className="install-banner" role="dialog" aria-label="Install the MrPPC app">
      <img src="/icons/icon-192.png" alt="" width="44" height="44"/>
      <div><b>Get the MrPPC app</b><small>Quick access to calls, WhatsApp and free PPC guides</small></div>
      <button type="button" className="ib-install" onClick={install}>Install</button>
      <button type="button" className="ib-close" aria-label="Not now" onClick={dismiss}>{Icon.close}</button>
    </div>}

    <div className={`app-sheet ios-help${iosHelp?' open':''}`} role="dialog" aria-modal="true" aria-label="Add MrPPC to your home screen" aria-hidden={!iosHelp} inert={!iosHelp} ref={iosHelp?sheetRef:null}>
      <span className="sheet-grab" aria-hidden="true"/>
      <div className="sheet-head"><strong>Add to Home Screen</strong><button type="button" className="sheet-close" aria-label="Close" onClick={()=>setIosHelp(false)}>{Icon.close}</button></div>
      <ol className="ios-steps">
        <li><span className="ios-ic">{Icon.share}</span><div><b>Tap the Share button</b><small>In Safari it is in the bottom bar. In Chrome it is at the top right.</small></div></li>
        <li><span className="ios-ic">{Icon.plus}</span><div><b>Choose "Add to Home Screen"</b><small>Scroll down the list if you do not see it straight away.</small></div></li>
        <li><span className="ios-ic"><img src="/icons/icon-192.png" alt="" width="28" height="28"/></span><div><b>Tap "Add"</b><small>MrPPC now opens from your home screen like an app.</small></div></li>
      </ol>
    </div>
  </>}
