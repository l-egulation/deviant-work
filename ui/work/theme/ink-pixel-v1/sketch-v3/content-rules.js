(function(root){
 const price=(catalog,chapter,item)=>{const s=catalog.stages.find(x=>x.stage===Math.min(3,chapter));if(!s?.pricesKnown)return null;return item.type==='ink'?s.inkPrice:s.weaponBase+item.item.colors.length*s.perSlot+item.item.colors.filter(c=>c!=='neutral').length*s.perEnhanced};
 const equipReason=(slots,target,uid,remaining)=>slots[target]===uid?'장착 중':slots.includes(uid)?'':remaining>0?`교체 대기 ${Math.ceil(remaining)}초`:'';
 function offer(pool,owned,rng=Math.random){const remaining=pool.filter(x=>x.runtime==='implemented'&&!owned.includes(x.id));const choose=a=>a[Math.floor(rng()*a.length)];const safe=remaining.filter(x=>x.group==='safe'),risk=remaining.filter(x=>x.group!=='safe');if(!safe.length||new Set(risk.map(x=>x.group)).size<2)return null;const first=choose(risk);return [choose(safe),first,choose(risk.filter(x=>x.group!==first.group))]}
 const values=x=>{const m=x.description.match(/([\d.]+(?:%|초)?)\(강화 ([\d.]+(?:%|초)?)\)/);return m?{base:m[1],enhanced:m[2]}:{base:String(x.baseValue),enhanced:String(x.enhancedValue)}};
 const description=(x,matched=false)=>x.description.replace(/([\d.]+(?:%|초)?)\(강화 ([\d.]+(?:%|초)?)\)/g,(_,a,b)=>matched?b:a);
 const api={price,equipReason,offer,values,description};if(typeof module!=='undefined')module.exports=api;else root.ContentRules=api;
})(globalThis);
