/* Pure cosmetic model. No XP, skill, bond or gameplay-class mutations. */
(function(root){
'use strict';
const slots={outfit:'Outfits',main:'Weapons & tools',pet:'Companions'};
const catalog=[];
function add(id,name,slot,asset=id,extra={}){catalog.push({id,name,slot,asset,...extra})}
["ranger","knight","battlemage","trailkeeper","duskwarden","frostguard","ironbound","stormcaller","sunstrider","wayfarer","tideguard","mossguard"].forEach(id=>add(id,id.split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' '),'outfit'));
[['sword','Oathkeeper sword'],['saber','Traveler’s saber'],['axe','Trail axe'],['hammer','Forge hammer'],['bow','Woodland bow'],['staff','Wayfinder staff'],['spear','Dawn spear'],['paddle','Weekend paddle'],['rake','Route scoop rake'],['dustpan','Route dustpan'],['longsword2','Emerald longsword'],['warhammer2','Stormsteel warhammer'],['longbow2','Thornwood longbow'],['halberd2','Griffin halberd'],['plumsaber2','Plum saber'],['battleaxe2','Ironroot battleaxe'],['tidestaff2','Tideglass staff'],['mace2','Brass flanged mace'],['mtnspear2','Mountain spear'],['dagger2','Emerald dagger'],['ravenscythe','Raven scythe'],['shellscythe','Tidewoven scythe'],['arcscepter','Alchemist arc scepter'],['macuahuitl','Jaguar macuahuitl'],['shamshir','Lion shamshir'],['threadchain','Moon thread chain'],['khopesh','Oracle khopesh'],['runehammer','Runebreaker hammer'],['crossblade','Skybolt crossblade'],['kanabo','Storm kanabo'],['sunglaive','Sunbreaker glaive'],['trident','Tidecall trident']].forEach(([id,n])=>add(id,n,'main'));
['dragon','wolf','fox','griffin','owlbear','phoenix'].forEach(id=>add(id,id[0].toUpperCase()+id.slice(1),'pet'));
add('dawnblade','Dawnkeeper blade','main','sword',{special:true});add('sunpaddle','Sunward paddle','main','paddle',{special:true});
const get=id=>catalog.find(i=>i.id===id);
const starters={apprentice:['ranger','staff'],scholar:['ranger','staff'],warden:['knight','sword'],herbalist:['trailkeeper','axe'],barbarian:['trailkeeper','axe'],mage:['battlemage','staff'],knight:['knight','sword'],rogue:['ranger','bow']};
const aliases={'k-round':'shield','k-badge':'shield','k-rect':'shield','k-spike':'shield','k-helm':'helmet','b-shield':'shield','b-hat':'cap','m-hat':'hat','r-xbow':'bow','r-2xbow':'bow','camp-hammer':'hammer','route-flashlight':'lantern',cap:'cap',circlet:'circlet',beanie:'cap',paddle:'paddle',lantern:'lantern',dog:'wolf',ember:'dragon','weekend-paddle':'paddle','sunforge-paddle':'sunpaddle','route-rake':'rake','route-dustpan':'dustpan','hearth-lantern':'lantern','hearthblade':'sword','ember-axe':'axe','warden-shield':'shield','moon-buckler':'shield','wayfinder-wand':'staff','crystal-staff':'staff','storm-hammer':'hammer','phoenix-spear':'spear','k-sword':'sword','k-great':'sword','b-axe':'axe','b-greataxe':'axe','m-staff':'staff','m-wand':'staff','r-knife':'saber','c-circlet':'circlet','c-hood':'hood','c-crown':'circlet'};
function migrate(s,lv,sex='female'){
 if(!s.pixel||s.pixel.version!==1){
  const [outfit,main]=starters[s.cls]||starters.apprentice;
  s.pixel={version:1,sex,owned:[outfit,main],equipped:{outfit,main},earnedThrough:1,queue:[],claimed:[],legacyOwned:[],classQueue:[]};
 }
 const p=s.pixel;
 p.legacyOwned=[...new Set([...(p.legacyOwned||[]),...Object.values(s.gear||{}),...(s.gear3dOwned||[]),...Object.values(s.gear3d||{})])];
 p.legacyOwned.forEach(id=>{const mapped=aliases[id];if(mapped&&get(mapped)&&!p.owned.includes(mapped))p.owned.push(mapped)});
 p.classQueue=p.classQueue||[];
 for(let l=p.earnedThrough+1;l<=lv;l++)p.queue.push({level:l,choices:null});
 p.earnedThrough=Math.max(p.earnedThrough,lv);
 return p;
}
function slotAt(l){if(l>=3&&l<=33&&(l-3)%10===0)return 'pet';return ({2:'main',4:'main',5:'outfit',6:'outfit',7:'main',8:'outfit',9:'main',10:'special'})[l]||['main','outfit'][(l-11)%2]}
function prepare(p){
 while(p.queue.length){const q=p.queue[0];if(q.choices)return q;
 const slot=slotAt(q.level);
 let pool=catalog.filter(i=>!p.owned.includes(i.id)&&(slot==='special'?i.special:slot==='pet'?i.slot==='pet':i.slot===slot&&!i.special));
 // Pets only come from the four companion milestones. Exhausted slots may award other equipment.
 if(!pool.length&&slot!=='pet')pool=catalog.filter(i=>!p.owned.includes(i.id)&&i.slot!=='pet'&&!i.special);
 if(!pool.length){p.claimed.push(q.level);p.queue.shift();continue}
 const offset=(q.level*7)%pool.length;pool=pool.slice(offset).concat(pool.slice(0,offset));
 q.choices=pool.slice(0,slot==='pet'?4:2).map(i=>i.id);return q;
 }return null;
}
function claim(p,id){const q=p.queue[0];if(!q||!q.choices||!q.choices.includes(id))return false;const i=get(id);if(!i)return false;
 if(!p.owned.includes(id))p.owned.push(id);p.equipped[i.slot]=id;p.claimed.push(q.level);p.queue.shift();return true}
function equip(p,id){const i=get(id);if(!i||!p.owned.includes(id))return false;if(p.equipped[i.slot]===id&&i.slot!=='outfit')delete p.equipped[i.slot];else p.equipped[i.slot]=id;return true}
root.QuestPixel={slots,catalog,get,starters,aliases,migrate,prepare,claim,equip,slotAt};
if(typeof module!=='undefined')module.exports=root.QuestPixel;
})(globalThis);
