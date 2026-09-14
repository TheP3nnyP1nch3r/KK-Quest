/* Kaitlyn's Quest service worker — network-first, falls back to cache when offline.
   Precaches the splash map, the icons, the theme and the character. The weapon models
   under models/gear/ are deliberately NOT precached: they are only fetched when a piece
   is actually equipped, and then cached on the way past. */
const CACHE='kkquest-v1.3.0'; // bump this with APP_VERSION in index.html on every deploy
const ICONS=['book','bridge','campfire','cave','chamber','chest','cottage','dragon','dragon-asleep',
 'knight','minotaur','owl','potion','ranger','signpost','sword-shield','tower','traveler','witch','wizard'];
const ASSETS=['./','index.html','three.min.js','manifest.webmanifest','map.jpg','theme.mp3',
 'icon-180.png','icon-192.png','icon-512.png',
 'models/hero.glb','models/hair-down.glb','models/hair-up.glb','models/anims.glb',
 ...ICONS.map(n=>'icons/'+n+'.png'),
 ...['knight','king','necromancer','paladin','archer','wanderer'].map(n=>'critters/'+n+'.png')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
