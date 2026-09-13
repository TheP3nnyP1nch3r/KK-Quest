/* Kaitlyn's Quest service worker — network-first, falls back to cache when offline.
   Everything the app needs is either in index.html or three.min.js; there are no model
   or audio files to precache (the 3D figure and the fanfare are both built in code). */
const CACHE='kkquest-v1.0.0'; // bump this with APP_VERSION in index.html on every deploy
const ASSETS=['./','index.html','three.min.js','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png',
 ...['knight','king','necromancer','paladin','archer','wanderer'].map(n=>'critters/'+n+'.png')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
