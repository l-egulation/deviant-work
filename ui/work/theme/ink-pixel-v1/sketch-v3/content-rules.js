(function(root){
 const price=(catalog,chapter,item)=>{const s=catalog.stages.find(x=>x.stage===Math.min(3,chapter));if(!s?.pricesKnown)return null;return item.type==='ink'?s.inkPrice:s.weaponBase+item.item.colors.length*s.perSlot+item.item.colors.filter(c=>c!=='neutral').length*s.perEnhanced};
 const equipReason=(slots,target,uid,remaining)=>slots[target]===uid?'장착 중':slots.includes(uid)?'':remaining>0?`교체 대기 ${Math.ceil(remaining)}초`:'';
 function offer(pool,owned,rng=Math.random){const remaining=pool.filter(x=>x.runtime==='implemented'&&!owned.includes(x.id));const choose=a=>a[Math.floor(rng()*a.length)];const safe=remaining.filter(x=>x.group==='safe'),risk=remaining.filter(x=>x.group!=='safe');if(!safe.length||new Set(risk.map(x=>x.group)).size<2)return null;const first=choose(risk);return [choose(safe),first,choose(risk.filter(x=>x.group!==first.group))]}
 const values=x=>{const m=x.description.match(/([\d.]+(?:%|초)?)\(강화 ([\d.]+(?:%|초)?)\)/);return m?{base:m[1],enhanced:m[2]}:{base:String(x.baseValue),enhanced:String(x.enhancedValue)}};
 const description=(x,matched=false)=>x.description.replace(/([\d.]+(?:%|초)?)\(강화 ([\d.]+(?:%|초)?)\)/g,(_,a,b)=>matched?b:a);
 function segments(x,matched=false){
  const text=description(x,matched),at=text.indexOf(' 시 '),cut=at<0?0:at+2;
  const result=[];
  function split(text,re,tone){let start=0;for(const m of text.matchAll(re)){if(m.index>start)result.push({text:text.slice(start,m.index),tone:'plain'});result.push({text:m[0],tone});start=m.index+m[0].length}if(start<text.length)result.push({text:text.slice(start),tone:'plain'})}
  if(cut)split(text.slice(0,cut),/상태이상 부여 시|기본 공격 시|스킬 공격 시|스위칭 공격 시|대쉬 시|기절한|속박된|중독된|슬로우 상태인/g,'trigger');
  const body=text.slice(cut),cool=body.search(/(?:잉크 )?쿨타임 \d+(?:\.\d+)?초\.$/),main=cool<0?body:body.slice(0,cool);
  split(main,/\d+(?:\.\d+)?초 동안 (?:기절|속박|중독)|\d+(?:\.\d+)?초마다 \d+(?:\.\d+)?의 피해|(?:이동속도가|공격 피해가|스킬 피해가) \d+(?:\.\d+)?% 증가|체력을 \d+(?:\.\d+)? 회복|방어막을 \d+(?:\.\d+)? 얻|스킬 쿨타임 \d+(?:\.\d+)?%를 줄|속도를|\d+(?:\.\d+)?% 감소|\d+(?:\.\d+)?초/g,'effect');
  if(cool>=0)result.push({text:body.slice(cool),tone:'plain'});return result;
 }
 const api={price,equipReason,offer,values,description,segments};if(typeof module!=='undefined')module.exports=api;else root.ContentRules=api;
})(globalThis);
