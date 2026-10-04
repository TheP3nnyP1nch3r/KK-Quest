/* Kaitlyn's Quest service worker: network first, cache as the offline fallback. */
const CACHE='kkquest-v5.0.0'; // bumped with APP_VERSION on every release; old kkquest-* caches are removed
const ASSETS=[
 "./",
 "bg-map2.jpg",
 "critters/archer.png",
 "critters/king.png",
 "critters/knight.png",
 "critters/necromancer.png",
 "critters/paladin.png",
 "critters/wanderer.png",
 "hero-scenes.js",
 "icon-180.png",
 "icon-192.png",
 "icon-512.png",
 "icons/campfire.png",
 "icons/castle-room.png",
 "icons/cave.png",
 "icons/day0-sun.png",
 "icons/day1-mon.png",
 "icons/day2-tue.png",
 "icons/day3-wed.png",
 "icons/day4-thu.png",
 "icons/day5-fri.png",
 "icons/day6-sat.png",
 "icons/flying-dragon.png",
 "icons/hooded-traveler.png",
 "icons/hunter-and-wolf.png",
 "icons/journal-and-quill.png",
 "icons/knight-swinging-sword.png",
 "icons/minotaur.png",
 "icons/owl.png",
 "icons/potion-bottle.png",
 "icons/signpost.png",
 "icons/sleeping-dragon.png",
 "icons/stone-bridge.png",
 "icons/sword-and-shield.png",
 "icons/treasure-chest.png",
 "icons/watchtower.png",
 "icons/witch-hut.png",
 "icons/witch-with-staff.png",
 "icons/wizard-fireball.png",
 "index.html",
 "manifest.webmanifest",
 "map.jpg",
 "pixel-assets.js",
 "pixel-core.js",
 "pixel-ui.js",
 "pixel.css",
 "theme.mp3"
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kkquest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(async()=>{
  const cached=await caches.match(e.request,{ignoreSearch:true});
  if(cached)return cached;
  if(e.request.mode==='navigate')return caches.match('index.html');
  return new Response('',{status:503,statusText:'Unavailable offline'});
 }));
});
