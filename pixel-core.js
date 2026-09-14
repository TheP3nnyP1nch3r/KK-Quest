/* Pure cosmetic model. No XP, skill, bond or gameplay-class mutations. */
(function(root){
'use strict';
const slots={outfit:'Outfits',head:'Headwear',main:'Weapons & tools',off:'Offhand',pet:'Companions'};
const catalog=[];
function add(id,name,slot,asset=id,extra={}){catalog.push({id,name,slot,asset,...extra})}
['ranger','knight','battlemage','trailkeeper'].forEach(id=>add(id,id[0].toUpperCase()+id.slice(1),'outfit'));
[['sword','Oathkeeper sword'],['saber','Traveler’s saber'],['axe','Trail axe'],['hammer','Forge hammer'],['bow','Woodland bow'],['staff','Wayfinder staff'],['spear','Dawn spear'],['paddle','Weekend paddle'],['rake','Route scoop rake'],['dustpan','Route dustpan']].forEach(([id,n])=>add(id,n,'main'));
add('shield','Round shield','off');add('lantern','Hearth lantern','off');
[['cap','Route cap'],['hood','Forest hood'],['circlet','Steward’s circlet'],['helmet','Blue-plume helm'],['hat','Starlight hat'],['goggles','Trail goggles']].forEach(([id,n])=>add(id,n,'head'));
['dragon','wolf','fox','griffin'].forEach(id=>add(id,id[0].toUpperCase()+id.slice(1),'pet'));
add('dawnblade','Dawnkeeper blade','main','sword',{special:true});add('sunpaddle','Sunward paddle','main','paddle',{special:true});
const get=id=>catalog.find(i=>i.id===id);
const starters={apprentice:['battlemage','staff'],scholar:['battlemage','staff'],warden:['knight','sword'],herbalist:['trailkeeper','axe'],barbarian:['trailkeeper','axe'],mage:['battlemage','staff'],knight:['knight','sword'],rogue:['ranger','bow']};
const aliases={winterhat:'cap','g-hood':'hood','w-axe-s':'axe','w-axe':'axe','w-axe-d':'axe','w-bow2':'bow','w-bow-g':'bow','w-bow-e':'bow','w-sword':'sword','w-sword2':'saber','w-sword-g':'sword','w-sword-big':'sword','w-claymore':'sword','w-hammer-s':'hammer','w-hammer-d':'hammer','w-shield-r':'shield','w-shield-r2':'shield','w-shield-h':'shield','w-shield-h2':'shield','w-shield-c':'shield','g-staff':'staff','w-spear':'spear','w-bow':'bow','k-round':'shield','k-badge':'shield','k-rect':'shield','k-spike':'shield','k-helm':'helmet','b-shield':'shield','b-hat':'cap','m-hat':'hat','r-xbow':'bow','r-2xbow':'bow','camp-hammer':'hammer','route-flashlight':'lantern',cap:'cap',circlet:'circlet',beanie:'cap',paddle:'paddle',lantern:'lantern',dog:'wolf',ember:'dragon','weekend-paddle':'paddle','sunforge-paddle':'sunpaddle','route-rake':'rake','route-dustpan':'dustpan','hearth-lantern':'lantern','hearthblade':'sword','ember-axe':'axe','warden-shield':'shield','moon-buckler':'shield','wayfinder-wand':'staff','crystal-staff':'staff','storm-hammer':'hammer','phoenix-spear':'spear','k-sword':'sword','k-great':'sword','b-axe':'axe','b-greataxe':'axe','m-staff':'staff','m-wand':'staff','r-knife':'saber','c-circlet':'circlet','c-hood':'hood','c-crown':'circlet'};
function migrate(s,lv,sex='female'){
 if(!s.pixel||s.pixel.version!==1){
  const [outfit,main]=starters[s.cls]||starters.apprentice;
  s.pixel={version:1,sex,owned:[outfit,main],equipped:{outfit,main},earnedThrough:1,queue:[],claimed:[],legacyOwned:[],classQueue:[]};
 }
 const p=s.pixel;
 p.legacyOwned=[...new Set([...(p.legacyOwned||[]),...Object.values(s.gear||{}),...(s.gear3dOwned||[]),...Object.values(s.gear3d||{})])];
 p.legacyOwned.forEach(id=>{const mapped=aliases[id];if(mapped&&!p.owned.includes(mapped))p.owned.push(mapped)});
 p.classQueue=p.classQueue||[];
 for(let l=p.earnedThrough+1;l<=lv;l++)p.queue.push({level:l,choices:null});
 p.earnedThrough=Math.max(p.earnedThrough,lv);
 return p;
}
function slotAt(l){if(l>=3&&l<=33&&(l-3)%10===0)return 'pet';return ({2:'main',4:'head',5:'outfit',6:'off',7:'main',8:'outfit',9:'head',10:'special'})[l]||['main','head','off','outfit'][(l-11)%4]}
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
