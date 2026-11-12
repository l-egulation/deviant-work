/* Shared visual F hint; existing page handlers remain authoritative. */
(()=>{const page=location.pathname.split('/').slice(-2,-1)[0];const selectors={
'screen-set-v6':'.equipAction button',
'maintenance-growth-v2':'.actionRow button',
'maintenance-palette-v1':'.taskDecision button',
'maintenance-stamp-v1':'.actionRow .action',
'ink-shop-v1':'.actionRow .action',
'departure-v1':'.actionRow button,.confirm button',
'run-result-v1':'#return',
'pause-menu-v1':'.choice',
'settings-v1':'#apply,#reset,#confirm,#cancel',
'seal-reward-v1':'#claim',
'boss-altar-v1':'#claim'
};const selector=selectors[page];if(!selector)return;
function sync(){document.querySelectorAll(selector).forEach(b=>{let k=[...b.querySelectorAll('kbd')].find(x=>x.textContent.trim()===(b.dataset.fixedKey||'F'));if(!k){k=document.createElement('kbd');k.textContent=b.dataset.fixedKey||'F';b.prepend(k)}if(!k.classList.contains('actionKeycap')){k.classList.add('actionKeycap');k.setAttribute('aria-hidden','true');b.classList.add('hasActionKeycap')}});}
sync();new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});
})();
