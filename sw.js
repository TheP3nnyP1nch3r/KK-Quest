/* Kaitlyn's Quest service worker — network-first, cache as fallback.
   Weapons under models/gear/ are not precached: they download the first time a
   piece is equipped, then stay cached. */
const CACHE='kkquest-v3.0.1'; // bump with APP_VERSION in index.html on every deploy
const ICONS=['campfire','castle-room','cave','flying-dragon','hooded-traveler','hunter-and-wolf',
 'journal-and-quill','knight-swinging-sword','minotaur','owl','potion-bottle','signpost','sleeping-dragon',
 'stone-bridge','sword-and-shield','treasure-chest','watchtower','witch-hut','witch-with-staff','wizard-fireball'];
const PIXEL=['assets/pixel/male-battlemage.png', 'assets/pixel/male-trailkeeper.png', 'assets/pixel/bow.png', 'assets/pixel/female-battlemage.png', 'assets/pixel/hat.png', 'assets/pixel/shield.png', 'assets/pixel/dustpan.png', 'assets/pixel/paddle.png', 'assets/pixel/female-trailkeeper.png', 'assets/pixel/circlet.png', 'assets/pixel/dragon.png', 'assets/pixel/griffin.png', 'assets/pixel/male-ranger.png', 'assets/pixel/female-ranger.png', 'assets/pixel/male-knight.png', 'assets/pixel/female-knight.png', 'assets/pixel/lantern.png', 'assets/pixel/wolf.png', 'assets/pixel/sword.png', 'assets/pixel/hood.png', 'assets/pixel/cap.png', 'assets/pixel/axe.png', 'assets/pixel/helmet.png', 'assets/pixel/saber.png', 'assets/pixel/hammer.png', 'assets/pixel/fox.png', 'assets/pixel/goggles.png', 'assets/pixel/lawson.png', 'assets/pixel/spear.png', 'assets/pixel/rake.png', 'assets/pixel/staff.png'];
const ASSETS=[...PIXEL,'pixel-core.js','pixel-ui.js','pixel.css','./','index.html','three.min.js','manifest.webmanifest','map.jpg','theme.mp3',
 'icon-180.png','icon-192.png','icon-512.png',
 'models/hero.glb','models/head.glb','models/hair-up.glb','models/hood.glb','models/anims.glb',
 ...ICONS.map(n=>'icons/'+n+'.png'),
 ...['knight','king','necromancer','paladin','archer','wanderer'].map(n=>'critters/'+n+'.png')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kkquest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('index.html'):new Response('Offline asset unavailable',{status:503})))));
});
