/* ============================================================
   Motor de presentaciones — navegación + lápiz por diapositiva
   ============================================================ */
(function(){
  const slides = Array.from(document.querySelectorAll('.slide'));
  const total  = slides.length;
  let idx = 0;

  const counter = document.getElementById('counter');
  const progress= document.getElementById('progress');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const canvas  = document.getElementById('ink');
  const ctx     = canvas.getContext('2d');

  /* ---- estado del lápiz ---- */
  let mode = 'none';            // 'none' | 'draw' | 'erase'
  let color = '#7c5cff';
  let width = 4;
  let drawing = false;
  let last = null;
  const inkStore = {};          // tinta por índice de slide (dataURL)

  /* ---- mostrar slide ---- */
  function resizeCanvas(){
    const frame = canvas.parentElement;
    const r = frame.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = r.width  * dpr;
    canvas.height = r.height * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.lineCap='round';ctx.lineJoin='round';
    restoreInk();
  }
  function saveInk(){ inkStore[idx] = canvas.toDataURL(); }
  function restoreInk(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const data = inkStore[idx];
    if(data){
      const img = new Image();
      img.onload = ()=>{ const dpr=window.devicePixelRatio||1;
        ctx.drawImage(img,0,0,canvas.width/dpr,canvas.height/dpr); };
      img.src = data;
    }
  }
  function show(n){
    if(mode!=='none') saveInk();
    idx = Math.max(0, Math.min(total-1, n));
    slides.forEach((s,i)=>s.classList.toggle('on', i===idx));
    counter.textContent = (idx+1)+' / '+total;
    progress.style.width = ((idx+1)/total*100)+'%';
    prevBtn.disabled = idx===0;
    nextBtn.textContent = idx===total-1 ? 'Fin' : 'Siguiente';
    restoreInk();
  }

  /* ---- navegación ---- */
  prevBtn.addEventListener('click',()=>show(idx-1));
  nextBtn.addEventListener('click',()=>{ if(idx<total-1) show(idx+1); });
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show(idx+1);}
    else if(e.key==='ArrowLeft'){show(idx-1);}
    else if(e.key==='Home'){show(0);}
    else if(e.key==='End'){show(total-1);}
  });

  /* ---- herramientas ---- */
  function setMode(m){
    mode = (mode===m)?'none':m;
    document.getElementById('pen').classList.toggle('active', mode==='draw');
    document.getElementById('eraser').classList.toggle('active', mode==='erase');
    canvas.classList.toggle('draw', mode!=='none');
    canvas.style.pointerEvents = mode==='none' ? 'none' : 'auto';
  }
  document.getElementById('pen').addEventListener('click',()=>setMode('draw'));
  document.getElementById('eraser').addEventListener('click',()=>setMode('erase'));
  document.getElementById('clear').addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height); delete inkStore[idx];
  });

  document.querySelectorAll('.swatch').forEach(sw=>{
    sw.addEventListener('click',()=>{
      color = sw.dataset.color;
      document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));
      sw.classList.add('active');
      if(mode!=='draw') setMode('draw');
    });
  });
  document.querySelectorAll('.thick button').forEach(b=>{
    b.addEventListener('click',()=>{
      width = parseInt(b.dataset.w,10);
      document.querySelectorAll('.thick button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      if(mode!=='draw') setMode('draw');
    });
  });

  /* ---- dibujo ---- */
  function pos(e){
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return {x:p.clientX-r.left, y:p.clientY-r.top};
  }
  function start(e){
    if(mode==='none') return;
    drawing=true; last=pos(e); e.preventDefault();
  }
  function move(e){
    if(!drawing||mode==='none') return;
    const p = pos(e); e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y);
    if(mode==='erase'){
      ctx.globalCompositeOperation='destination-out';
      ctx.lineWidth=width*5;
    }else{
      ctx.globalCompositeOperation='source-over';
      ctx.strokeStyle=color; ctx.lineWidth=width;
    }
    ctx.stroke(); last=p;
  }
  function end(){ if(drawing){drawing=false;saveInk();} }

  canvas.addEventListener('mousedown',start);
  canvas.addEventListener('mousemove',move);
  window.addEventListener('mouseup',end);
  canvas.addEventListener('touchstart',start,{passive:false});
  canvas.addEventListener('touchmove',move,{passive:false});
  canvas.addEventListener('touchend',end);

  window.addEventListener('resize',()=>{ if(mode!=='none')saveInk(); resizeCanvas(); });

  /* ---- init ---- */
  resizeCanvas();
  show(0);
})();
