/* Kaitlyn's Quest service worker — network-first, cache as fallback.
   Weapons under models/gear/ are not precached: they download the first time a
   piece is equipped, then stay cached. */
const CACHE='kkquest-v2.0.0'; // bump with APP_VERSION in index.html on every deploy
const ICONS=['campfire','castle-room','cave','flying-dragon','hooded-traveler','hunter-and-wolf',
 'journal-and-quill','knight-swinging-sword','minotaur','owl','potion-bottle','signpost','sleeping-dragon',
 'stone-bridge','sword-and-shield','treasure-chest','watchtower','witch-hut','witch-with-staff','wizard-fireball'];
const ASSETS=['./','index.html','three.min.js','manifest.webmanifest','map.jpg','theme.mp3',
 'icon-180.png','icon-192.png','icon-512.png',
 'models/hero.glb','models/head.glb','models/hair-up.glb','models/hood.glb','models/anims.glb',
 ...ICONS.map(n=>'icons/'+n+'.png'),
 ...['knight','king','necromancer','paladin','archer','wanderer'].map(n=>'critters/'+n+'.png')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
