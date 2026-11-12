// UI prototype rules. First three offers include an unowned ink where available;
// remaining offers enforce the three-weapon guarantee. Exact weighting is not a balance claim.
(function(root){
 function normalKinds(round,weapons,opportunities,poolSize,rng=Math.random){
  if(!poolSize)return ['sketch','sketch','sketch'];
  if(round<=6&&6-round+1<=Math.max(0,3-weapons))return ['sketch','sketch','sketch'];
  if(round<=3||round>6||weapons>=3)return ['sketch','ink',rng()<.5?'ink':'sketch'];
  return Array.from({length:3},()=>rng()<.5?'ink':'sketch');
 }
 function slotCount(chapter,round){return chapter>=3?6:Math.min(3,Math.ceil(round/2))+(chapter===2?2:0)}
 const api={normalKinds,slotCount};if(typeof module!=='undefined')module.exports=api;else root.RewardRules=api;
})(globalThis);
