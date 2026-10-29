// MrPPC.pk service worker: makes the site installable and usable offline.
// Pages and data: network first, saved copy only when offline (so new content always shows).
// Hashed static files, images and icons: cache first (their URLs change when they change).
// Bump VERSION to clear old caches.
const VERSION='v1';
const STATIC=`mrppc-static-${VERSION}`;
const PAGES=`mrppc-pages-${VERSION}`;
const PRECACHE=['/','/offline/','/services/','/blog/','/contact/','/manifest.webmanifest','/icons/icon-192.png','/icons/icon-512.png','/favicon.svg'];
const MAX_PAGES=60;

self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(PAGES);await Promise.all(PRECACHE.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})));self.skipWaiting()})())});

self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('mrppc-')&&k!==STATIC&&k!==PAGES).map(k=>caches.delete(k)));await self.clients.claim()})())});

async function trim(name,max){const c=await caches.open(name);const keys=await c.keys();for(let i=0;i<keys.length-max;i++)await c.delete(keys[i])}

async function networkFirst(req,fallbackToOffline){const c=await caches.open(PAGES);
  try{const res=await fetch(req);if(res.ok&&res.type==='basic'){c.put(req,res.clone());trim(PAGES,MAX_PAGES)}return res}
  catch(err){const hit=await c.match(req,{ignoreSearch:fallbackToOffline});if(hit)return hit;if(fallbackToOffline){const off=await c.match('/offline/');if(off)return off}throw err}}

async function cacheFirst(req){const c=await caches.open(STATIC);const hit=await c.match(req);if(hit)return hit;const res=await fetch(req);if(res.ok)c.put(req,res.clone());return res}

self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==location.origin)return;if(url.pathname==='/sw.js')return;
  if(req.mode==='navigate'){e.respondWith(networkFirst(req,true));return}
  if(url.pathname.startsWith('/_next/static/')||url.pathname.startsWith('/assets/')||url.pathname.startsWith('/icons/')||/\.(woff2?|png|webp|svg|jpg|jpeg|gif|ico)$/.test(url.pathname)){e.respondWith(cacheFirst(req));return}
  e.respondWith(networkFirst(req,false))});
