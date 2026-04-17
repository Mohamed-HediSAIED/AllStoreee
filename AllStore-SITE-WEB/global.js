/* ALLSTORE 24/7 — Global JS */
(function(){
  'use strict';

  /* ── Background image as real <img> element (bulletproof) ──── */
  function setupBg(){
    if(!document.body){ return setTimeout(setupBg, 10); }
    if(document.getElementById('als-bg-img')) return;
    const isMobile = window.matchMedia('(max-width:768px)').matches;
    const img = document.createElement('img');
    img.id = 'als-bg-img';
    img.src = isMobile ? 'IMG_9422.jpg' : 'IMG_9440.jpg';
    img.alt = '';
    img.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;min-width:100vw;min-height:100vh;object-fit:cover;object-position:center center;z-index:-2;pointer-events:none;user-select:none;';
    const overlay = document.createElement('div');
    overlay.id = 'als-bg-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.45);z-index:-1;pointer-events:none;';
    document.body.insertBefore(overlay, document.body.firstChild);
    document.body.insertBefore(img, document.body.firstChild);
    const updateBg = () => {
      const mobile = window.matchMedia('(max-width:768px)').matches;
      const newSrc = mobile ? 'IMG_9422.jpg' : 'IMG_9440.jpg';
      if(!img.src.endsWith(newSrc)) img.src = newSrc;
    };
    window.addEventListener('resize', updateBg);
    window.addEventListener('orientationchange', updateBg);
  }
  setupBg();

  /* ── Nav hide/show ──────────────────────────────────────────── */
  const header=document.querySelector('header');
  let last=0;
  window.addEventListener('scroll',()=>{
    const s=scrollY;
    if(s>80)header.classList.add('scrolled');else header.classList.remove('scrolled');
    if(s>last+6&&s>100)header.classList.add('up');else if(s<last-6)header.classList.remove('up');
    last=s;
  },{passive:true});

  /* ── Scroll reveal ──────────────────────────────────────────── */
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}});
  },{threshold:.1,rootMargin:'0px 0px -36px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  /* ── 3D card tilt — handled by luxury.js ──────────────────── */
  /* ── Page transitions — handled by luxury.js ────────────── */

  /* ── Globals ────────────────────────────────────────────────── */
  window.scrollSection=function(btn,dir){
    const ps=btn.closest('.sw').querySelector('.ps');
    ps.scrollBy({left:dir*400,behavior:'smooth'});
  };
  window.switchTab=function(id){
    document.querySelectorAll('.tab-panel').forEach(p=>p.style.display='none');
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('tab-'+id).style.display='';
    document.querySelector(`[onclick="switchTab('${id}')"]`).classList.add('active');
  };

  /* ══════════════════════════════════════════════════════════════
     PANIER — Cart persistant (localStorage)
  ══════════════════════════════════════════════════════════════ */
  const CART_KEY='als_cart';
  const getCart=()=>{try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]}};
  const saveCart=items=>localStorage.setItem(CART_KEY,JSON.stringify(items));
  const inCart=id=>getCart().some(i=>i.id===id);

  window.addToCart=function(id,brand,name,img,price){
    let cart=getCart();
    if(!inCart(id)){cart.push({id,brand,name,img,price});saveCart(cart)}
    updateCartUI();
    showToast(name+' ajouté au panier');
  };

  window.removeFromCart=function(id){
    saveCart(getCart().filter(i=>i.id!==id));
    updateCartUI();
    if(document.getElementById('cart-items'))renderCartPage();
  };

  window.updateCartUI=function(){
    const c=getCart();
    // Header badge
    const cnt=document.getElementById('cart-count');
    if(cnt){cnt.textContent=c.length;cnt.style.display=c.length?'flex':'none'}
    // Bottom nav badge
    const bnCnt=document.getElementById('bn-cart-count');
    if(bnCnt){bnCnt.textContent=c.length;bnCnt.style.display=c.length?'flex':'none'}
  }

  window.renderCartPage=function(){
    const wlEl=document.getElementById('wishlist-on-cart');
    const cartEl=document.getElementById('cart-items');
    if(wlEl){
      const wl=getWL();
      if(!wl.length){wlEl.innerHTML='<p class="wl-empty">Votre liste de souhait est vide.</p>';}else{
      wlEl.innerHTML='';
      wl.forEach(i=>{
        const row=document.createElement('div');row.className='cart-row';
        row.innerHTML=`<div class="cart-img"><img src="" alt=""></div><div class="cart-info"><span class="cart-brand"></span><span class="cart-name"></span></div>`;
        row.querySelector('img').src=i.img;row.querySelector('img').alt=i.name;
        row.querySelector('.cart-brand').textContent=i.brand;
        row.querySelector('.cart-name').textContent=i.name;
        const btn=document.createElement('button');btn.className='btn-add-cart';
        btn.textContent=inCart(i.id)?'✓ Dans le panier':'Ajouter au panier';
        btn.addEventListener('click',()=>addToCart(i.id,i.brand,i.name,i.img,i.price||''));
        row.appendChild(btn);wlEl.appendChild(row);
      });
    }}
    if(cartEl){
      const cart=getCart();
      if(!cart.length){cartEl.innerHTML='<p class="wl-empty">Votre panier est vide.</p>';return;}
      cartEl.innerHTML='';
      cart.forEach(i=>{
        const row=document.createElement('div');row.className='cart-row';
        row.innerHTML=`<div class="cart-img"><img src="" alt=""></div><div class="cart-info"><span class="cart-brand"></span><span class="cart-name"></span></div>`;
        row.querySelector('img').src=i.img;row.querySelector('img').alt=i.name;
        row.querySelector('.cart-brand').textContent=i.brand;
        row.querySelector('.cart-name').textContent=i.name;
        if(i.price){const pr=document.createElement('span');pr.className='cart-price';pr.textContent=i.price;row.querySelector('.cart-info').appendChild(pr);}
        const btn=document.createElement('button');btn.className='btn-remove-cart';btn.innerHTML='&#x2715; Retirer';
        btn.addEventListener('click',()=>removeFromCart(i.id));
        row.appendChild(btn);cartEl.appendChild(row);
      });
    }
  };

  /* ══════════════════════════════════════════════════════════════
     WISHLIST — Liste de souhait persistante (localStorage)
  ══════════════════════════════════════════════════════════════ */
  const WL_KEY='als_wishlist';
  const getWL=()=>{try{return JSON.parse(localStorage.getItem(WL_KEY))||[]}catch{return[]}};
  const saveWL=items=>localStorage.setItem(WL_KEY,JSON.stringify(items));
  const inWL=id=>getWL().some(i=>i.id===id);

  function toggleWL(id,brand,name,img){
    let wl=getWL();
    const idx=wl.findIndex(i=>i.id===id);
    if(idx>-1)wl.splice(idx,1);else wl.push({id,brand,name,img});
    saveWL(wl);updateWLUI();
    return idx===-1;
  }

  function updateWLUI(){
    const wl=getWL();
    const cnt=document.getElementById('wl-count');
    if(cnt){cnt.textContent=wl.length;cnt.style.display=wl.length?'flex':'none'}
    const el=document.getElementById('wl-items');
    if(!el)return;
    if(!wl.length){
      el.innerHTML='<p class="wl-empty">Votre liste de souhait est vide.<br>Cliquez sur \u2764 sur une pi\u00e8ce pour l\'ajouter.</p>';
      return;
    }
    el.innerHTML='';
    wl.forEach(i=>{
      const item=document.createElement('div');item.className='wl-item';
      item.innerHTML=`<div class="wl-item-img"><img src="" alt=""></div><div class="wl-item-info"><span class="wl-item-brand"></span><span class="wl-item-name"></span></div><div class="wl-item-actions"><a href="assistant.html" class="wl-sourcer">Sourcer \u2192</a></div>`;
      item.querySelector('img').src=i.img;item.querySelector('img').alt=i.name;
      item.querySelector('.wl-item-brand').textContent=i.brand;
      item.querySelector('.wl-item-name').textContent=i.name;
      const rmBtn=document.createElement('button');rmBtn.className='wl-remove';rmBtn.innerHTML='&#x2715;';
      rmBtn.addEventListener('click',()=>window._wlRemove(i.id));
      item.querySelector('.wl-item-actions').appendChild(rmBtn);
      el.appendChild(item);
    });
  }

  window._wlRemove=function(id){
    saveWL(getWL().filter(i=>i.id!==id));
    updateWLUI();
    document.querySelectorAll('.wl-btn').forEach(btn=>{
      const card=btn.closest('.pc');if(!card)return;
      const bid=((card.querySelector('.ct')||{textContent:''}).textContent+'_'+(card.querySelector('.cn')||{textContent:''}).textContent).trim().replace(/\s+/g,'_').toLowerCase();
      btn.classList.toggle('wl-active',inWL(bid));
    });
  };

  window._toggleWLDrawer=function(){
    const d=document.getElementById('wl-drawer');
    const ov=document.getElementById('wl-overlay');
    if(d){d.classList.toggle('open');ov&&ov.classList.toggle('open')}
    updateWLUI();
  };

  // Injecter les icônes nav (recherche, compte, panier) dans un wrapper
  (function(){
    const nav=document.querySelector('nav');if(!nav)return;
    // Wrapper pour les icônes à droite
    const iconsWrap=document.createElement('div');
    iconsWrap.className='nav-icons';
    // Bouton recherche
    const searchBtn=document.createElement('a');
    searchBtn.id='search-nav-btn';searchBtn.href='boutique.html';searchBtn.setAttribute('aria-label','Rechercher');
    searchBtn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>`;
    iconsWrap.appendChild(searchBtn);
    // Bouton compte
    const accountBtn=document.createElement('a');
    accountBtn.id='account-nav-btn';accountBtn.href='compte.html';accountBtn.setAttribute('aria-label','Mon compte');
    accountBtn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    iconsWrap.appendChild(accountBtn);
    // Bouton panier (icône sac shopping)
    const cartBtn=document.createElement('a');
    cartBtn.id='cart-nav-btn';cartBtn.href='panier.html';cartBtn.setAttribute('aria-label','Mon panier');
    cartBtn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><span id="cart-count" style="display:none">0</span>`;
    iconsWrap.appendChild(cartBtn);
    nav.appendChild(iconsWrap);
    // Bouton favoris caché (gardé pour le drawer)
    const wlBtn=document.createElement('button');
    wlBtn.id='wl-nav-btn';wlBtn.setAttribute('aria-label','Liste de souhait');wlBtn.style.display='none';
    wlBtn.onclick=window._toggleWLDrawer;
    wlBtn.innerHTML=`<span id="wl-count" style="display:none">0</span>`;
    nav.appendChild(wlBtn);
    const ov=document.createElement('div');ov.id='wl-overlay';ov.onclick=window._toggleWLDrawer;
    const dr=document.createElement('div');dr.id='wl-drawer';
    dr.innerHTML=`<div class="wl-drawer-inner"><div class="wl-drawer-head"><span>Liste de souhait</span><button class="wl-close" onclick="window._toggleWLDrawer()">\u2715</button></div><div id="wl-items"></div><a href="panier.html" class="wl-cta-all">Voir le panier \u2192</a></div>`;
    document.body.append(ov,dr);
    updateWLUI();
    updateCartUI();
    // Bottom nav setup (runs after DOM is ready since bottom-nav is after this script)
    document.addEventListener('DOMContentLoaded',function(){
      // Wrap bn-items in a pill div (Apple Store style)
      const bnav=document.querySelector('.bottom-nav');
      if(bnav && !bnav.querySelector('.bottom-nav-pill')){
        const pill=document.createElement('div');
        pill.className='bottom-nav-pill';
        const items=Array.from(bnav.querySelectorAll('.bn-item'));
        items.forEach(function(item){pill.appendChild(item)});
        bnav.prepend(pill);
      }
      // Inject cart badge
      const bnPanier=document.getElementById('bn-panier');
      if(bnPanier && !document.getElementById('bn-cart-count')){
        const badge=document.createElement('span');
        badge.id='bn-cart-count';badge.className='bn-badge';
        badge.style.display='none';badge.textContent='0';
        bnPanier.appendChild(badge);
      }
      updateCartUI();
    });
  })();

  // Injecter les boutons coeur sur chaque carte produit
  function injectWLBtn(card, brandSel, nameSel, imgSel) {
    const brand=((card.querySelector(brandSel)||{textContent:''}).textContent).trim();
    const name=((card.querySelector(nameSel)||{textContent:''}).textContent).trim();
    const img=(card.querySelector(imgSel)||{getAttribute:()=>''}).getAttribute('src')||'';
    const id=(brand+'_'+name).replace(/\s+/g,'_').toLowerCase();
    const btn=document.createElement('button');
    btn.className='wl-btn'+(inWL(id)?' wl-active':'');
    btn.setAttribute('aria-label','Ajouter à la liste de souhait');
    btn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    btn.addEventListener('click',e=>{
      e.preventDefault();e.stopPropagation();
      const added=toggleWL(id,brand,name,img);
      btn.classList.toggle('wl-active',added);
      showToast(added?name+' ajout\u00e9 \u00e0 la liste de souhait':name+' retir\u00e9 de la liste de souhait');
    });
    card.appendChild(btn);
  }
  // Page accueil (.pc)
  document.querySelectorAll('.pc').forEach(card=>injectWLBtn(card,'.ct','.cn','.ci img'));
  // Boutique (.b-card)
  document.querySelectorAll('.b-card').forEach(card=>injectWLBtn(card,'.b-brand','.b-name','.b-img img'));

  /* ── Toast notification ─────────────────────────────────────── */
  function showToast(msg){
    let t=document.getElementById('wl-toast');
    if(!t){t=document.createElement('div');t.id='wl-toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('show');
    clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2500);
  }

  /* LIVE TICKER — supprimé */

  /* ══════════════════════════════════════════════════════════════
     PERSONNALISATION — Greeting avec prenom memorise
  ══════════════════════════════════════════════════════════════ */
  (function(){
    const name=localStorage.getItem('als_name');
    if(!name)return;
    const ey=document.querySelector('.hero-eyebrow');
    if(ey)ey.textContent='Bienvenue, '+name+' \u2014 Sourcing d\'Exception';
  })();

  /* ══════════════════════════════════════════════════════════════
     HAMBURGER MOBILE MENU
  ══════════════════════════════════════════════════════════════ */
  (function(){
    const nav=document.querySelector('nav');
    if(!nav)return;
    const ham=document.createElement('button');
    ham.id='ham-btn';
    ham.setAttribute('aria-label','Ouvrir le menu');
    ham.innerHTML='<span></span><span></span><span></span>';
    nav.appendChild(ham);
    ham.addEventListener('click',()=>{
      const open=document.body.classList.toggle('nav-open');
      document.body.style.overflow=open?'hidden':'';
      ham.setAttribute('aria-label',open?'Fermer':'Ouvrir le menu');
    });
    document.querySelectorAll('.nav-links a').forEach(a=>{
      a.addEventListener('click',()=>{
        document.body.classList.remove('nav-open');
        document.body.style.overflow='';
      });
    });
    // Close on overlay click (touch outside)
    document.addEventListener('click',e=>{
      if(!document.body.classList.contains('nav-open'))return;
      if(e.target.closest('.nav-links')||e.target.closest('#ham-btn'))return;
      if(e.target.closest('nav'))return;
      document.body.classList.remove('nav-open');
      document.body.style.overflow='';
      ham.setAttribute('aria-label','Ouvrir le menu');
    });
  })();

  /* BRAND MARQUEE — désactivé */

  /* ── Magnetic buttons — handled by luxury.js ──────────────── */

  /* ══════════════════════════════════════════════════════════════
     HERO PARALLAX (desktop only)
  ══════════════════════════════════════════════════════════════ */
  (function(){
    if(window.matchMedia('(max-width:768px)').matches)return;
    const hero=document.querySelector('.hero');
    if(!hero)return;
    let ready=false;
    setTimeout(()=>{ready=true;},1300);
    const map=[
      ['.hero-badge-live',-.06],['.hero-eyebrow',-.10],
      ['h1',-.16],['.hero-ornament',-.13],
      ['.hero-sub',-.09],['.hero-stats',-.05],
    ].map(([sel,spd])=>[hero.querySelector(sel),spd]).filter(([el])=>el);
    const heroH=()=>hero.offsetHeight;
    window.addEventListener('scroll',()=>{
      if(!ready)return;
      const s=window.scrollY;
      if(s>heroH()){map.forEach(([el])=>{el.style.transform='';});return;}
      map.forEach(([el,spd])=>{el.style.transform=`translateY(${s*spd}px)`;});
    },{passive:true});
  })();

  /* ── Card spotlight — handled by luxury.js 3D levitation ── */

  /* ══════════════════════════════════════════════════════════════
     GRADIENT TEXT — headings clés
  ══════════════════════════════════════════════════════════════ */
  (function(){
    document.querySelectorAll('.hero h1 em,.page-hero h1 em,.ap-hero h1 em').forEach(el=>el.classList.add('grad-text'));
  })();

  /* ══════════════════════════════════════════════════════════════
     FOOTER SOCIAL LINKS (injecté sur toutes les pages)
  ══════════════════════════════════════════════════════════════ */
  (function(){
    document.querySelectorAll('.foot-inner').forEach(fi=>{
      if(fi.querySelector('.foot-social'))return;
      const s=document.createElement('div');
      s.className='foot-social';
      s.innerHTML=`
        <a href="https://www.instagram.com/allstore.tm" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@allstore247.co" target="_blank" rel="noopener" aria-label="TikTok">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
          </svg>
        </a>
`;
      fi.appendChild(s);
    });
  })();

  /* ══════════════════════════════════════════════════════════════
     COUNTER ANIMATION — .stats-band et .foot-stats-band
  ══════════════════════════════════════════════════════════════ */
  (function(){
    const targets=[
      {sel:'.sn',extract:el=>{
        const txt=el.textContent;
        const m=txt.match(/[\d]+/);
        return m?parseInt(m[0]):null;
      },render:(el,v)=>{
        el.innerHTML=el.innerHTML.replace(/[\d]+/,v);
      }},
    ];
    const io2=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(!e.isIntersecting)return;
        io2.unobserve(e.target);
        const el=e.target;
        const target=parseInt(el.dataset.countTo||el.textContent.match(/[\d]+/)?.[0])||0;
        if(!target)return;
        const dur=1800,start=performance.now();
        const orig=el.innerHTML;
        (function step(now){
          const p=Math.min((now-start)/dur,1);
          const ease=1-Math.pow(1-p,3);
          const val=Math.round(ease*target);
          el.innerHTML=orig.replace(/[\d]+/,val);
          if(p<1)requestAnimationFrame(step);
        })(start);
      });
    },{threshold:.4});
    document.querySelectorAll('.sn').forEach(el=>io2.observe(el));
  })();

})();

// Newsletter signup
window.submitNewsletter = function() {
  var input = document.getElementById('nl-email');
  var msg = document.getElementById('nl-msg');
  if (!input || !msg) return;
  var email = input.value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Veuillez entrer un email valide';
    msg.style.color = '#e74c3c';
    return;
  }
  msg.textContent = 'Inscription...';
  msg.style.color = 'rgba(255,255,255,.6)';
  fetch('/api/register-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, source: 'signup' })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.ok) {
      msg.textContent = 'Merci ! Vous recevrez nos offres exclusives.';
      msg.style.color = '#4caf50';
      input.value = '';
    } else {
      msg.textContent = data.error || 'Erreur, reessayez';
      msg.style.color = '#e74c3c';
    }
  })
  .catch(function() {
    msg.textContent = 'Erreur de connexion';
    msg.style.color = '#e74c3c';
  });
};

/* ══════════════════════════════════════════════════════════════
   PREFETCH — precharge les pages pour navigation instantanee
══════════════════════════════════════════════════════════════ */
(function(){
  if(!('connection' in navigator) || !navigator.connection.saveData){
    // Pages principales a precharger
    var pages = [
      'index.html','boutique.html','assistant.html','suivi.html',
      'apropos.html','contact.html','panier.html','produit-detail.html',
      'comment.html','faq.html','livraison.html','checkout.html'
    ];
    var current = location.pathname.split('/').pop() || 'index.html';

    // Prefetch apres chargement complet de la page (basse priorite)
    window.addEventListener('load', function(){
      setTimeout(function(){
        pages.forEach(function(p){
          if(p === current) return;
          var link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = p;
          link.as = 'document';
          document.head.appendChild(link);
        });
      }, 2000); // attendre 2s pour ne pas ralentir le chargement initial
    });

    // Prefetch au hover sur les liens (haute priorite)
    var prefetched = {};
    document.addEventListener('mouseover', function(e){
      var a = e.target.closest('a[href]');
      if(!a) return;
      var href = a.getAttribute('href');
      if(!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
      if(prefetched[href]) return;
      prefetched[href] = true;
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = 'document';
      document.head.appendChild(link);
    }, {passive: true});
  }
})();
