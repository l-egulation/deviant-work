const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const R=require('./content-rules.js');
const C=vm.runInNewContext(fs.readFileSync(__dirname+'/runtime-content.js','utf8')+';RuntimeContent');
assert.equal(C.run.inks.length,36);assert.equal(C.maintenance.filter(x=>x.runtime==='implemented').length,30);assert.equal(C.seal.length,12);
for(const x of C.run.inks){assert.ok(x.symbol&&x.badge);assert.ok(!R.description(x).includes('(강화'));assert.ok(!R.description(x,true).includes('(강화'));}
assert.equal(R.price(C.run,1,{type:'sketch',item:{colors:['neutral']}}),300);
assert.equal(R.price(C.run,2,{type:'ink'}),400);assert.equal(R.price(C.run,3,{type:'ink'}),null);
assert.equal(R.equipReason(['a','b'],0,'b',10),'');assert.ok(R.equipReason(['a','b'],0,'c',10));assert.equal(R.equipReason(['a','b'],0,'a',0),'장착 중');
for(let i=0;i<100;i++){const offer=R.offer(C.maintenance,[]);assert.equal(offer[0].group,'safe');assert.notEqual(offer[1].group,offer[2].group);assert.ok(offer.every(x=>x.runtime==='implemented'));}
assert.equal(R.offer(C.maintenance,C.maintenance.map(x=>x.id)),null);
console.log('Content rules passed: 36 inks, 30 active augments, 12 seal augments, prices and cooldown exceptions');

for(const ink of C.run.inks)for(const match of [false,true]){const ts=R.segments(ink,match);assert.equal(ts.map(t=>t.text).join(''),R.description(ink,match));assert.ok(ts.some(t=>t.tone==='trigger'));assert.ok(ts.some(t=>t.tone==='effect'));assert.ok(!ts.some(t=>t.tone==='effect'&&/쿨타임 \d+초/.test(t.text)));}
const ts=R.segments(C.run.inks[4]);assert.equal(ts[0].text,'이 무기로 ');assert.equal(ts[0].tone,'plain');assert.equal(ts[1].text,'상태이상 부여 시');
console.log('Semantic ink color checks passed for 36 inks × 2 modes');
