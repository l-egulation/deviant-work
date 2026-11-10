(()=>{
 document.body.classList.add('brushActions');
 const shop=location.pathname.includes('/ink-shop-v1/');
 function sync(){
  const all=[...document.querySelectorAll('.hasActionKeycap')];
  const eligible=all.filter(b=>!b.disabled);
  const focused=document.activeElement;
  const first=document.querySelector('main button:not(:disabled)');
  const target=shop?eligible[0]:(all.includes(focused)?focused:(focused===document.body?first:null));
  all.forEach(b=>b.classList.toggle('actionSelected',b===target&&!b.disabled));
 }
 document.addEventListener('focusin',sync);
 document.addEventListener('pointerover',e=>{const b=e.target.closest('.hasActionKeycap');if(b&&!b.disabled)b.focus({preventScroll:true})});
 new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});sync();
 if(!shop&&new URLSearchParams(location.search).get('action')==='confirm')document.querySelector('.saved .actionRow button:last-child')?.focus({preventScroll:true});
})();
