const assert=require('node:assert/strict');
const {normalKinds,slotCount}=require('../reward-rules.js');
for(let mask=0;mask<64;mask++){
 let weapons=0,opportunities=0;
 for(let round=1;round<=6;round++){
  const kinds=normalKinds(round,weapons,opportunities,12,()=>.6);
  if(kinds.includes('ink'))opportunities++;
  const wantsInk=(mask>>(round-1))&1;
  const choice=wantsInk&&kinds.includes('ink')?'ink':'sketch';
  assert(kinds.includes(choice));if(choice==='sketch')weapons++;
 }
 assert(weapons>=3);assert(opportunities>=3);
}
assert.deepEqual(normalKinds(7,3,3,0),['sketch','sketch','sketch']);
assert(normalKinds(7,3,3,5).includes('ink'));
assert.equal(slotCount(1,1),1);assert.equal(slotCount(1,7),3);assert.equal(slotCount(2,6),5);assert.equal(slotCount(3,1),6);
console.log('PASS reward guarantees: 64 paths, exhausted ink fallback, 7+ and slot progression');
