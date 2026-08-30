/* Universal local-file progress UI for every tool that uses <input type="file">.
   Files are processed locally in the browser; they are not uploaded to a server. */
(function(){
  const SELECTOR='input[type="file"]';
  function attach(input){
    if(input.dataset.progressAttached==='1') return;
    input.dataset.progressAttached='1';
    const wrap=input.closest('.dropzone') || input.parentElement;
    if(!wrap) return;
    let box=wrap.querySelector('.upload-progress');
    if(!box){
      box=document.createElement('div');
      box.className='upload-progress';
      box.setAttribute('aria-live','polite');
      box.innerHTML='<div class="upload-progress-head"><span class="upload-progress-label">File ready</span><strong class="upload-progress-value">0%</strong></div><div class="upload-progress-track"><span class="upload-progress-fill"></span></div><div class="upload-progress-status">Choose a file to begin.</div>';
      wrap.appendChild(box);
    }
    input.addEventListener('change',function(){
      const files=[...input.files];
      const value=box.querySelector('.upload-progress-value');
      const fill=box.querySelector('.upload-progress-fill');
      const label=box.querySelector('.upload-progress-label');
      const status=box.querySelector('.upload-progress-status');
      if(!files.length){value.textContent='0%';fill.style.width='0%';label.textContent='File ready';status.textContent='Choose a file to begin.';return;}
      /* File inputs select local files; no network upload occurs. 100% means the browser has accepted the selection. */
      value.textContent='100%';fill.style.width='100%';label.textContent=files.length===1?'File ready':'Files ready';status.textContent=files.length===1?`${files[0].name} is ready for local processing.`:`${files.length} files are ready for local processing.`;
    });
  }
  function scan(){document.querySelectorAll(SELECTOR).forEach(attach)}
  scan();
  new MutationObserver(scan).observe(document.documentElement,{subtree:true,childList:true});
})();
