const assert=require('node:assert/strict'),C=require('./content.json'),Engine=require('./engine.js');
function steps(e,n){for(let i=0;i<n;i++)e.update(.001)}
let e=new Engine(C);e.begin('basic');steps(e,199);assert.equal(e.target.hp,60);steps(e,2);assert.equal(e.target.hp,50);steps(e,300);assert.equal(e.target.hp,50);assert.equal(e.events.filter(e=>e.type==='hit').length,1);assert.ok(Math.abs(e.target.x-9.05)<1e-8);assert.equal(e.action,null);
e=new Engine(C);e.begin('special');steps(e,299);assert.equal(e.target.hp,60);steps(e,2);assert.equal(e.target.hp,25);assert.equal(e.target.x,8.8);steps(e,400);assert.equal(e.begin('special'),false);assert.ok(Math.abs(e.cooldownUntil-5.3)<1e-8);
e=new Engine(C);e.target.x=12;e.begin('special');steps(e,800);assert.equal(e.target.hp,60);assert.equal(e.events.filter(x=>x.type==='hit').length,0);assert.ok(e.cooldownUntil>5);
e=new Engine(C);e.wall=true;e.begin('basic');steps(e,500);assert.equal(e.target.hp,60);
e=new Engine(C);e.player.face=-1;e.begin('basic');steps(e,500);assert.equal(e.target.hp,60);
e=new Engine(C);e.target.hp=10;e.begin('basic');steps(e,500);assert.equal(e.target.hp,0);e.begin('basic');steps(e,500);assert.equal(e.events.filter(x=>x.type==='death').length,1);e.reset();assert.equal(e.target.hp,60);assert.equal(e.cooldownUntil,0);
console.log('PASS: timing, damage, single hit, push, cooldown, miss, wall, facing, death, reset');
