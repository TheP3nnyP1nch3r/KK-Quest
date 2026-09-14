const fs=require('fs'),assert=require('node:assert/strict');
(async()=>{const {default:worker}=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync('worker/worker.js')).toString('base64'));let db=new Map();let backups=[];const env={TOKEN:'test-token',STATE:{get:async k=>db.get(k),put:async(k,v,o)=>{db.set(k,v);if(o)backups.push(o)}}};const req=(method,body,token='test-token')=>new Request('https://kk.test/state',{method,headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
assert.equal((await worker.fetch(req('GET',null,'wrong'),env)).status,401);
assert.equal((await worker.fetch(req('GET'),env)).status,404);
assert.equal((await worker.fetch(req('PUT',{}),env)).status,400);
const body={t:1,s:{xp:940,attr:{vig:1,stl:2,dev:3,kin:4,nrv:5},pixel:{version:1,sex:'female'}}};assert.equal((await worker.fetch(req('PUT',body),env)).status,200);assert.deepEqual(await(await worker.fetch(req('GET'),env)).json(),body);
body.t=2;await worker.fetch(req('PUT',body),env);assert.equal(backups[0].expirationTtl,2592000);assert.equal((await worker.fetch(req('OPTIONS'),env)).status,200);console.log('PASS Worker authorization, empty state, malformed envelope, save round trip, backup TTL, CORS preflight');})();
