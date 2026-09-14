/* Integration uses the original app's state and save/sync functions. */
const PX=QuestPixel;
let pixelFilter='outfit',pixelOpening=false,pixelDeferred=false;
const pixelAsset=(id,sex)=>'assets/pixel/'+(PX.get(id)?.slot==='outfit'?(sex||S.pixel.sex)+'-':'')+(PX.get(id)?.asset||id)+'.png';
function pixelState(){return PX.migrate(S,level().l,'female')}
function pixelFigure(p=pixelState(),pets=true){
 const e=p.equipped,sex=p.sex==='female'?'female':'male',outfit=PX.get(e.outfit)?.slot==='outfit'?e.outfit:'trailkeeper';
 const src=pixelAsset(outfit,sex),female=sex==='female';
 const hand={ranger:[female?135:130,female?291:309, female?279:278,female?287:307],knight:[female?133:128,female?287:310,female?272:279,female?285:305],battlemage:[female?128:128,female?292:309,female?274:277,female?289:308],trailkeeper:[female?131:128,female?292:309,female?279:279,female?293:308]}[outfit];
 const img=(id,x,y,w,h,cl='')=>`<img class="pixel-item ${cl}" src="${pixelAsset(id,sex)}" alt="" style="left:${x/384*100}%;top:${y/512*100}%;width:${w/384*100}%;height:${h/512*100}%">`;
 let layers='';
 const main=PX.get(e.main);
 if(main){const spec={sword:[78,224,.50,.84],saber:[78,224,.40,.84],axe:[124,222,.50,.84],hammer:[125,212,.50,.84],bow:[88,264,.25,.50],staff:[75,270,.5,.79],spear:[43,278,.5,.77],paddle:[90,170,.50,.83],rake:[90,204,.50,.15],dustpan:[103,197,.50,.15]}[main.asset]||[78,224,.5,.84];
 const [w,h,px,py]=spec;layers+=img(main.id,hand[0]-w*px,hand[1]-h*py,w,h,main.special?'pixel-special':'');}
 const off=PX.get(e.off);if(off){const isLantern=off.id==='lantern';layers+=img(off.id,hand[2]-(isLantern?30:59),hand[3]-(isLantern?8:58),isLantern?60:118,isLantern?104:118)}
 // Put the original clenched hand pixels back in front of the held layers.
 if(main||off){for(const [x,y] of [[hand[0],hand[1]],[hand[2],hand[3]]])layers+=`<img class="pixel-base" src="${src}" alt="" style="z-index:4;clip-path:inset(${(y-10)/512*100}% ${(384-x-13)/384*100}% ${(512-y-11)/512*100}% ${(x-13)/384*100}%)">`}
 if(e.head){const hs={cap:[139,33,110,80],hood:[133,18,124,159],circlet:[159,66,86,36],helmet:[128,4,131,149],hat:[123,-1,154,118],goggles:[145,29,111,136]}[e.head];if(hs)layers+=img(e.head,...hs)}
 const pet=PX.get(e.pet);
 return `<div class="pixel-figure" role="img" aria-label="${sex} ${outfit}${main?', '+main.name:''}${off?', '+off.name:''}${pet&&pets?', with '+pet.name:''}"><div class="pixel-rig"><img class="pixel-base" src="${src}" alt="">${layers}</div>${pet&&pets?`<img class="pixel-pet" src="${pixelAsset(pet.id)}" alt="">`:''}</div>`;
}
function pixelCheer(special=false){document.body.classList.remove('pixel-cheer');void document.body.offsetWidth;document.body.classList.add('pixel-cheer');if(special)document.body.classList.add('pixel-milestone');clearTimeout(pixelCheer.timer);pixelCheer.timer=setTimeout(()=>document.body.classList.remove('pixel-cheer','pixel-milestone'),1600)}
async function pixelBackup(raw){
 if(JSON.parse(raw)?.pixel)return;
 try{await window.storage.get(KEY+':pre-pixel-v3')}catch(e){await window.storage.set(KEY+':pre-pixel-v3',raw)}
}
function pixelDownload(value,name){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([value],{type:'application/json'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function pixelOnLevels(before,after){
 const p=pixelState();
 for(let l=before+1;l<=after;l++)if(l%10===0&&!p.classQueue.includes(l))p.classQueue.push(l);
 if(!S.pendingClass&&p.classQueue.length)S.pendingClass=p.classQueue.shift();
}
async function pixelNext(){
 if(!S||pixelOpening||pixelDeferred||el('loot').classList.contains('on')||el('sabbath').classList.contains('on'))return;
 if(S.pending){showLoot();return}if(S.pending3d){showLoot3d();return}if(S.pendingClass){showClassPick();return}
 const p=pixelState();
 if(p.classQueue.length){S.pendingClass=p.classQueue.shift();await save();showClassPick();return}
 const q=PX.prepare(p);if(!q){await save();return;}
 pixelOpening=true;
 // Persist the exact offered IDs before the player can see or select them.
 if(!await save()){pixelOpening=false;return}
 el('lootlv').textContent=q.level===10?'Level 10 · A promise kept':'Level '+q.level;
 el('lootsub').textContent=PX.slotAt(q.level)==='pet'?'Choose a traveling companion. Owned companions can be swapped freely.':q.level===10?'Choose a gold-lit keepsake. Your first ten levels deserve a celebration.':'Choose a keepsake for the road. It stays yours.';
 el('lootcards').innerHTML=q.choices.map(id=>{const i=PX.get(id);return `<button class="pixel-loot ${i.special?'pixel-special':''}" data-pixel-choice="${id}"><img src="${pixelAsset(id)}" alt=""><b>${i.name}</b><small>${i.special?'Level 10 keepsake':PX.slots[i.slot]} · cosmetic</small></button>`}).join('');
 el('lootcards').querySelectorAll('button').forEach(b=>b.onclick=async()=>{
  if(!PX.claim(p,b.dataset.pixelChoice))return;
  UNDO=null;S.log.unshift('Collected — '+PX.get(b.dataset.pixelChoice).name);el('loot').classList.remove('on');render();await save();pixelCheer(q.level===10);confetti(q.level===10?140:55,'center');setTimeout(pixelNext,350);
 });
 el('lootcards').insertAdjacentHTML('beforeend','<button class="ghost" id="pixel-later" style="grid-column:1/-1">Choose later</button>');el('pixel-later').onclick=()=>{pixelDeferred=true;el('loot').classList.remove('on');el('pixel-rewards')?.focus()};
 el('loot').classList.add('on');pixelOpening=false;el('lootcards').querySelector('button')?.focus();
}
function pixelRender(){
 const p=pixelState();
 el('pixelstage').innerHTML='<span class="pixel-stage-caption">Ashcombe Hall</span>'+pixelFigure(p);
 el('fig').innerHTML=pixelFigure(p,false);el('fig2').innerHTML=pixelFigure(p,false);
 const [,label,col]=condition();el('cond').innerHTML=`<span style="color:${col};font-weight:600">${label}</span> · vitality ${Math.round(S.vitality??100)}`;
 el('clsline').textContent=CLASSES[heroClass()].n+' · '+(PX.get(p.equipped.outfit)?.name||'Ranger')+' outfit';
 document.querySelector('.nm').textContent='Kaitlyn Wiles';
 el('gear').innerHTML=`<p class="sub">Cosmetics are yours to keep. Outfits work across every gameplay class.</p><div class="pixel-controls"><label>Character <select id="pixel-sex"><option value="male" ${p.sex==='male'?'selected':''}>Male</option><option value="female" ${p.sex==='female'?'selected':''}>Female</option></select></label></div><h3>Collection book · ${p.owned.length} / ${PX.catalog.length}</h3><div class="collection-tabs">${Object.entries(PX.slots).map(([id,n])=>`<button data-pixel-filter="${id}" aria-pressed="${id===pixelFilter}">${n}</button>`).join('')}</div><div class="collection">${PX.catalog.filter(i=>i.slot===pixelFilter).map(i=>{const owned=p.owned.includes(i.id),worn=p.equipped[i.slot]===i.id;return `<button class="${owned?'':'locked'}" data-pixel-equip="${i.id}" ${owned?'':'disabled'} aria-pressed="${worn}"><img src="${pixelAsset(i.id)}" alt=""><span>${i.name}</span><small>${worn?'Equipped':owned?'Wear / equip':i.slot==='pet'?'Levels 3 · 13 · 23 · 33':i.special?'Level 10 reward':'Locked · level rewards'}</small></button>`}).join('')}</div><div class="pixel-controls"><button id="pixel-rewards">${p.queue.length?'Open rewards ('+p.queue.length+')':'Check rewards'}</button>${false?'<button id="pixel-start">Choose starting class</button>':''}</div><p class="sub" style="margin-top:12px">Companions travel with you; Family members keep their own bonds. Optional slots can be emptied by tapping the equipped item again.</p>`;
 el('pixel-sex').onchange=e=>{p.sex=e.target.value;render();save()};
 el('pixel-rewards').onclick=()=>{pixelDeferred=false;pixelNext()};
 el('pixel-start')?.addEventListener('click',()=>{
  el('lootlv').textContent='Your first chapter';el('lootsub').textContent='Choose a gameplay class. Outfit changes later do not change your class.';
  el('lootcards').innerHTML=Object.entries(CLASSES).map(([id,c])=>`<button class="pixel-loot" data-start-class="${id}"><img src="${pixelAsset(PX.starters[id][0])}" alt=""><b>${c.n}</b></button>`).join('');
  el('lootcards').querySelectorAll('button').forEach(b=>b.onclick=()=>{S.cls=b.dataset.startClass;p.starterChosen=true;if(!p.legacyOwned.length){p.owned=[];p.equipped={}}for(const id of PX.starters[S.cls]){if(!p.owned.includes(id))p.owned.push(id);p.equipped[PX.get(id).slot]=id}el('loot').classList.remove('on');render();save()});el('loot').classList.add('on');
 });
 el('gear').querySelectorAll('[data-pixel-filter]').forEach(b=>b.onclick=()=>{pixelFilter=b.dataset.pixelFilter;pixelRender()});
 el('gear').querySelectorAll('[data-pixel-equip]').forEach(b=>b.onclick=()=>{if(PX.equip(p,b.dataset.pixelEquip)){render();save()}});
 if(p.legacyOwned.length){const names=p.legacyOwned.map(id=>ITEMS.find(i=>i.id===id)?.n||g3(id)?.[1]||id);
 el('gear').insertAdjacentHTML('beforeend',`<details class="pixel-legacy"><summary>Legacy keepsakes · ${names.length} preserved</summary><p class="sub">Original inventory remains in your save. Available matching designs are also unlocked in this collection; unmatched pieces are recorded here.</p><div>${names.map(n=>esc(n)).join(' · ')}</div></details>`)}
}
function pixelInstall(){
 for(const id of ['skinb','hairb','beardb'])el(id).hidden=true;
 el('fig2').parentElement.querySelector('.looks').innerHTML='<span class="sub">Choose your character and equipment in Hero → Collection book. Brown hair and light skin are part of this artwork.</span>';
 el('p-recent').querySelector('.row').insertAdjacentHTML('beforeend','<button class="ghost" id="pixel-backup">Download save</button><button class="ghost" id="pixel-original">Download pre-update backup</button>');
 el('pixel-backup').onclick=()=>pixelDownload(JSON.stringify(S,null,2),'kk-quest-save.json');
 el('pixel-original').onclick=async()=>{try{const r=await window.storage.get(KEY+':pre-pixel-v3');pixelDownload(r.value,'kk-quest-pre-pixel.json')}catch(e){toast('No earlier save exists for this profile.')}};
 el('loot').addEventListener('keydown',e=>{if(e.key==='Escape'&&el('pixel-later')){el('pixel-later').click();return}if(e.key!=='Tab')return;const nodes=[...el('loot').querySelectorAll('button,[tabindex="0"]')],first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}});
 const observer=new MutationObserver(()=>{if(!el('loot').classList.contains('on'))setTimeout(pixelNext,400)});observer.observe(el('loot'),{attributes:true,attributeFilter:['class']});
}
