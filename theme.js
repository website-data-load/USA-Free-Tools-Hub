(()=>{
  const btn=document.getElementById('themeBtn');
  if(!btn)return;
  const apply=mode=>{
    document.body.classList.toggle('dark',mode==='dark');
    btn.textContent=mode==='dark'?'☾':'☀︎';
    btn.setAttribute('aria-label',mode==='dark'?'Switch to light mode':'Switch to dark mode');
  };
  const saved=localStorage.getItem('theme');
  apply(saved==='dark'?'dark':'light');
  btn.addEventListener('click',()=>{
    const next=document.body.classList.contains('dark')?'light':'dark';
    localStorage.setItem('theme',next);
    apply(next);
  });
})();
