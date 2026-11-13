const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
function gallery(){
 const element={addEventListener(){},style:{}};
 const context=vm.createContext({URLSearchParams,location:{search:''},innerWidth:1920,innerHeight:1080,console,
  document:{getElementById:()=>element,querySelector:()=>element,addEventListener(){},body:{dataset:{}}},
  window:{addEventListener(){},parent:{postMessage(){}}}});
 const run=code=>vm.runInContext(code,context);
 for(const name of ['runtime-content.js','content-rules.js','reward-rules.js','app.js'])run(fs.readFileSync(path.join(__dirname,'..',name),'utf8'));
 run('render=()=>{};');
 run(fs.readFileSync(path.join(__dirname,'..','content-flows.js'),'utf8'));
 return run;
}
test('shop retains six typed places with exhausted ink places empty',()=>{
 const run=gallery();run('owned=[...inkData];newShopRun()');
 assert.equal(run('shopOffers.length'),6);
 assert.equal(run('shopOffers.filter(o=>o.type==="sketch").length'),3);
 assert.equal(run('shopOffers.filter(o=>o.type==="ink"&&!o.item).length'),3);
});
test('external registration replaces only its unsold ink; purchase and revisits preserve shelf',()=>{
 const run=gallery();run('owned=[];newShopRun();const before=shopOffers.map(o=>o.item);owned.push(shopOffers[3].item);reconcileShop()');
 assert.equal(run('shopOffers.every((o,i)=>i===3||o.item===before[i])'),true);
 assert.equal(run('new Set(shopOffers.filter(o=>o.type==="ink").map(o=>o.item.id)).size'),3);
 run('gold=10000;pick=4;buy();const sold=shopOffers[4];const after=shopOffers.map(o=>o.item);makeShop(1)');
 assert.equal(run('shopOffers[4]===sold&&sold.sold'),true);
 assert.equal(run('shopOffers.every((o,i)=>o.item===after[i])'),true);
 const balance=run('gold');run('buy()');assert.equal(run('gold'),balance);
});
test('stage prices use slot/enhancement counts and unknown stage cannot buy',()=>{
 const run=gallery();
 assert.equal(run('ContentRules.price(RuntimeContent.run,1,{type:"sketch",item:{colors:["neutral","red","neutral"]}})'),550);
 assert.equal(run('ContentRules.price(RuntimeContent.run,2,{type:"sketch",item:{colors:["neutral","red","neutral","neutral","neutral"]}})'),1315);
 run('makeShop(3);gold=10000;pick=0;buy()');assert.equal(run('gold'),10000);assert.equal(run('shopOffers[0].sold'),false);
});
test('boss offers three maximum-slot weapons and completes after one selected receipt',()=>{
 const run=gallery();run('view="boss";chances=0;rewardChapter=2;openRewards();pick=2;const chosen=offers[2].item;takeReward()');
 assert.equal(run('receipt.item===chosen&&stock.includes(chosen)'),true);
 assert.equal(run('receipt.item.colors.length'),5);
 assert.equal(run('bossPending'),false);
 assert.equal(run('remainingRewards()'),0);
});
test('weapon receipt configures the acquired item and closing keeps its draft',()=>{
 const run=gallery();run('view="boss";chances=0;openRewards();pick=1;takeReward();const acquired=receipt.item;configureReceipt();draft.applied[0]=owned[0];back()');
 assert.equal(run('stock.includes(acquired)&&acquired.applied[0]===owned[0]'),true);
 assert.equal(run('view'), 'reward');assert.equal(run('stage'),'exploration');
});
test('ink receipt applies only to unconfirmed sketches and preserves completed weapons',()=>{
 const run=gallery();run('view="reward";openRewards();pick=offers.findIndex(o=>o.type==="ink");takeReward();const acquired=receipt.item;configureReceipt();selectReceiptWeapon(stock[1].uid);slot=1;applyReceiptInk()');
 assert.equal(run('stock[1].applied[1]===acquired&&owned.includes(acquired)'),true);
 run('const selected=draft;selectReceiptWeapon(weapons[1].uid)');
 assert.equal(run('draft===selected'),true);
 assert.equal(run('weapons[1].applied[1]'),null);
});
test('registered final unowned ink leaves an empty place without replacing weapons or sold goods',()=>{
 const run=gallery();run('owned=inkData.slice(1);newShopRun();const weaponsBefore=shopOffers.slice(0,3).map(o=>o.item);owned.push(inkData[0]);reconcileShop()');
 assert.equal(run('shopOffers.slice(3).every(o=>o.type==="ink"&&!o.item)'),true);
 assert.equal(run('shopOffers.slice(0,3).every((o,i)=>o.item===weaponsBefore[i])'),true);
});
test('chapter exit refuses banked or pending rewards and resets only after they are resolved',()=>{
 const run=gallery();assert.equal(run('advanceRewardChapter()'),false);
 run('chances=0;bossPending=true');assert.equal(run('advanceRewardChapter()'),false);
 run('bossPending=false;bossRound=1');assert.equal(run('advanceRewardChapter()'),true);
 assert.equal(run('rewardChapter'),2);assert.equal(run('bossRound'),0);
});
