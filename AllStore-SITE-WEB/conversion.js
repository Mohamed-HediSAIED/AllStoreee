/* ══════════════════════════════════════════════════════════════
   ALLSTORE — CONVERSION OPTIMIZATION JS
   Bandeau promo, réassurance, urgence, avis, cross-sell, popup
══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── BANDEAU PROMO ──────────────────────────────────────── */
  (function(){
    // Tout en localStorage pour persister après fermeture du navigateur
    if(localStorage.getItem('als_promo_closed'))return;

    // Vérifier si le countdown est expiré
    var stored=localStorage.getItem('als_promo_end');
    if(stored && Date.now() > parseInt(stored)) {
      // Offre expirée — ne plus afficher
      localStorage.setItem('als_promo_closed','1');
      return;
    }

    var bar=document.createElement('div');
    bar.className='promo-bar';
    bar.id='promo-bar';
    bar.innerHTML=
      '<span class="promo-gold">-10% PREMI\u00c8RE COMMANDE</span> \u2014 Code : <strong>ALLSTORE10</strong>'+
      '<span class="promo-countdown" id="promo-cd"></span>'+
      '<button class="promo-close" id="promo-close-btn" aria-label="Fermer">&times;</button>';
    document.body.insertBefore(bar,document.body.firstChild);
    document.body.classList.add('has-promo');

    document.getElementById('promo-close-btn').addEventListener('click',function(){
      bar.remove();
      document.body.classList.remove('has-promo');
      localStorage.setItem('als_promo_closed','1');
      recalcBars();
    });

    // Countdown (24h from FIRST EVER visit — persiste après fermeture)
    var end;
    if(stored) {
      end=parseInt(stored);
    } else {
      end=Date.now()+24*60*60*1000;
      localStorage.setItem('als_promo_end',String(end));
    }

    function tick(){
      var d=Math.max(0,end-Date.now());
      if(d===0) {
        // Expiré — retirer le bandeau
        bar.remove();
        document.body.classList.remove('has-promo');
        localStorage.setItem('als_promo_closed','1');
        recalcBars();
        return;
      }
      var h=Math.floor(d/3600000);
      var m=Math.floor((d%3600000)/60000);
      var s=Math.floor((d%60000)/1000);
      var el=document.getElementById('promo-cd');
      if(el)el.innerHTML='<span>'+String(h).padStart(2,'0')+'h</span><span>'+String(m).padStart(2,'0')+'m</span><span>'+String(s).padStart(2,'0')+'s</span>';
      setTimeout(tick,1000);
    }
    tick();
  })();

  /* ── BARRE DE RÉASSURANCE ───────────────────────────────── */
  (function(){
    var bar=document.createElement('div');
    bar.className='trust-bar';
    bar.id='trust-bar';
    bar.innerHTML=
      '<div class="trust-item"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Qualit\u00e9 v\u00e9rifi\u00e9e</div>'+
      '<div class="trust-item"><svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-3"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Livraison 7\u201315 jours</div>'+
      '<div class="trust-item"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Paiement s\u00e9curis\u00e9</div>'+
      '<div class="trust-item"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>Support 24/7</div>';
    // Insert into body (fixed positioning handles placement)
    document.body.appendChild(bar);
  })();

  /* ── FIXED BARS LAYOUT: compute heights & sync with header ── */
  var _spacer=null;
  function recalcBars(){
    var promo=document.getElementById('promo-bar');
    var header=document.querySelector('header');
    if(!header)return;

    var promoH=promo?promo.offsetHeight:0;
    var headerH=header.offsetHeight;

    // Set CSS variables for positioning
    document.documentElement.style.setProperty('--promo-h',promoH+'px');
    document.documentElement.style.setProperty('--bars-total-h',(promoH+headerH)+'px');

    // Create spacer to push content below fixed bars
    // Skip on fullscreen hero pages (homepage) — hero is 100vh and sits behind bars
    var hasFullHero=!!document.querySelector('.ap-hero-full');
    if(!hasFullHero){
      if(!_spacer){
        _spacer=document.createElement('div');
        _spacer.className='fixed-bars-spacer';
        // Find first flow content after header
        var sib=header.nextElementSibling;
        while(sib&&(sib.id==='promo-bar'||sib.id==='lux-transition'||sib.classList.contains('fixed-bars-spacer'))){
          sib=sib.nextElementSibling;
        }
        if(sib)sib.parentNode.insertBefore(_spacer,sib);
      }
      if(_spacer)_spacer.style.height=(promoH+headerH)+'px';
    }
  }

  // Sync promo bar visibility with header scroll hide/show
  (function(){
    var header=document.querySelector('header');
    if(!header)return;
    var lastUp=false;
    var observer=new MutationObserver(function(){
      var isUp=header.classList.contains('up');
      if(isUp===lastUp)return;
      lastUp=isUp;
      var promo=document.getElementById('promo-bar');
      if(promo)promo.classList.toggle('promo-hidden',isUp);
    });
    observer.observe(header,{attributes:true,attributeFilter:['class']});
  })();

  // Initial calc + recalc on resize
  window.addEventListener('load',recalcBars);
  window.addEventListener('resize',recalcBars);
  // Run immediately too
  setTimeout(recalcBars,50);
  setTimeout(recalcBars,300);

  /* ── Nombre stable par jour + produit (pas de random au refresh) ── */
  function stableNum(seed, min, max) {
    var day = new Date().toISOString().slice(0,10); // YYYY-MM-DD
    var str = day + '_' + seed;
    var hash = 0;
    for (var i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; }
    return min + (Math.abs(hash) % (max - min + 1));
  }

  /* ── SOCIAL PROOF (page produit) ────────────────────────── */
  (function(){
    var badges=document.querySelector('.pdp-badges');
    if(!badges)return;
    var productId = document.querySelector('.pdp-brand')?.textContent || 'product';
    var proof=document.createElement('div');
    proof.className='pdp-social-proof';
    var bought = stableNum(productId + '_buyers', 18, 45);
    proof.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> <strong>'+bought+' acheteurs</strong> ce mois-ci';
    badges.parentNode.insertBefore(proof,badges);
  })();

  /* ── GARANTIE (page produit, sous bouton) ───────────────── */
  (function(){
    var actions=document.querySelector('.pdp-actions');
    if(!actions)return;
    var g=document.createElement('div');
    g.className='pdp-guarantee';
    g.innerHTML=`
      <div class="pdp-guarantee-item"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Qualité vérifiée par nos experts</div>
      <div class="pdp-guarantee-item"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Livraison offerte en Europe</div>
      <div class="pdp-guarantee-item"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>Paiement 100% sécurisé</div>
    `;
    actions.parentNode.insertBefore(g,actions.nextSibling);
  })();

  /* ── AVIS CLIENTS (page produit) ────────────────────────── */
  (function(){
    var details=document.querySelector('.pdp-details');
    if(!details)return;
    var starSVG='<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
    var fiveStars=starSVG.repeat(5);
    var reviews=[
      {name:'Sarah M.',initials:'SM',date:'Il y a 3 jours',stars:5,text:'Qualité incroyable, impossible de faire la différence. Reçu en moins d'une semaine, emballage soigné. Je recommande à 100% !'},
      {name:'Karim B.',initials:'KB',date:'Il y a 1 semaine',stars:5,text:'Ma 3ème commande chez AllStore. Toujours au top. Le modèle est identique à l\'original, finitions parfaites.'},
      {name:'Emma L.',initials:'EL',date:'Il y a 2 semaines',stars:4,text:'Très satisfaite de mon achat. La qualité est vraiment premium. Seul bémol : les délais un peu longs, mais ça vaut le coup d\'attendre.'},
    ];
    var section=document.createElement('div');
    section.className='pdp-reviews';
    section.innerHTML=`
      <div class="pdp-reviews-header">
        <span class="pdp-reviews-title">Avis clients</span>
        <div class="pdp-reviews-summary">
          <div class="pdp-reviews-stars">`+fiveStars+`</div>
          4.8/5 — 47 avis
        </div>
      </div>
    `+reviews.map(function(r){
      return '<div class="pdp-review-card"><div class="pdp-review-top"><div class="pdp-review-avatar">'+r.initials+'</div><div class="pdp-review-meta"><span class="pdp-review-name">'+r.name+'</span><span class="pdp-review-date">'+r.date+'</span></div><span class="pdp-review-badge">Achat vérifié</span></div><div class="pdp-review-stars">'+starSVG.repeat(r.stars)+'</div><p class="pdp-review-text">'+r.text+'</p></div>';
    }).join('');
    details.parentNode.insertBefore(section,details.nextSibling);
  })();

  /* ── CROSS-SELL (page produit) ──────────────────────────── */
  (function(){
    var pdp=document.querySelector('.pdp');
    if(!pdp)return;
    var products=[
      {brand:'Adidas',name:'Samba OG',price:'95 €',img:'adidas_samba.png',href:'index.html'},
      {brand:'Louis Vuitton',name:'Bracelet cuir',price:'85 €',img:'bracelet_lv.png',href:'index.html'},
      {brand:'Prada',name:'Lunettes SPR',price:'120 €',img:'lunette_prada.jpg',href:'index.html'},
      {brand:'Dyson',name:'Airwrap',price:'180 €',img:'lisseur_dyson.png',href:'index.html'},
    ];
    var section=document.createElement('div');
    section.className='cross-sell';
    section.innerHTML='<h2 class="cross-sell-title">Vous aimerez aussi</h2><div class="cross-sell-grid">'+products.map(function(p){
      return '<a href="'+p.href+'" class="cross-sell-card"><div class="cross-sell-img"><img src="'+p.img+'" alt="'+p.name+'"></div><div class="cross-sell-body"><span class="cross-sell-brand">'+p.brand+'</span><div class="cross-sell-name">'+p.name+'</div><div class="cross-sell-price">'+p.price+'</div></div></a>';
    }).join('')+'</div>';
    pdp.parentNode.insertBefore(section,pdp.nextSibling);
  })();

  /* ── PANIER: Récapitulatif + barre progression ──────────── */
  (function(){
    var checkoutBtn=document.getElementById('checkout-btn');
    if(!checkoutBtn)return;

    // Étapes de commande
    var steps=document.createElement('div');
    steps.className='checkout-steps';
    steps.innerHTML=`
      <div class="checkout-step active"><span class="checkout-step-num">1</span>Panier</div>
      <div class="checkout-step-line"></div>
      <div class="checkout-step"><span class="checkout-step-num">2</span>Infos</div>
      <div class="checkout-step-line"></div>
      <div class="checkout-step"><span class="checkout-step-num">3</span>Paiement</div>
      <div class="checkout-step-line"></div>
      <div class="checkout-step"><span class="checkout-step-num">4</span>Confirmation</div>
    `;
    var panierWrap=document.querySelector('.panier-wrap');
    if(panierWrap)panierWrap.insertBefore(steps,panierWrap.firstChild);

    // Barre de progression livraison gratuite
    var FREE_THRESHOLD=150;
    function updateCartSummary(){
      var cart=[];
      try{cart=JSON.parse(localStorage.getItem('als_cart'))||[];}catch{}
      // Remove old summary
      var old=document.getElementById('cart-summary-block');
      if(old)old.remove();
      if(!cart.length){checkoutBtn.style.display='none';return;}
      checkoutBtn.style.display='block';

      var total=0;
      cart.forEach(function(item){
        var p=item.price?parseInt(item.price.replace(/[^\d]/g,'')):0;
        total+=p;
      });
      var remaining=Math.max(0,FREE_THRESHOLD-total);
      var pct=Math.min(100,Math.round(total/FREE_THRESHOLD*100));

      var summary=document.createElement('div');
      summary.id='cart-summary-block';
      summary.className='cart-summary';
      summary.innerHTML='<div class="cart-progress-text" style="color:#27ae60;font-weight:700">Livraison offerte</div>'
      +'<div class="cart-summary-row"><span>Sous-total</span><span>'+total+' €</span></div>'
      +'<div class="cart-summary-row"><span>Livraison</span><span>Offerte</span></div>'
      +'<div class="cart-summary-row total"><span>Total</span><span>'+total+' €</span></div>';

      checkoutBtn.parentNode.insertBefore(summary,checkoutBtn);
    }
    updateCartSummary();

    // Patch removeFromCart to update summary
    var origRemove=window.removeFromCart;
    window.removeFromCart=function(id){
      origRemove(id);
      updateCartSummary();
    };
    var origAdd=window.addToCart;
    window.addToCart=function(id,brand,name,img,price){
      origAdd(id,brand,name,img,price);
      updateCartSummary();
    };
  })();

  /* ── POPUP BIENVENUE ────────────────────────────────────── */
  (function(){
    if(localStorage.getItem('als_welcome_shown'))return;
    // Show after 5 seconds
    setTimeout(function(){
      if(localStorage.getItem('als_welcome_shown'))return;
      var overlay=document.createElement('div');
      overlay.className='welcome-popup-overlay';
      overlay.innerHTML=`
        <div class="welcome-popup">
          <button class="welcome-popup-close" onclick="closeWelcome()" aria-label="Fermer">&times;</button>
          <div class="welcome-popup-eyebrow">Bienvenue chez AllStore</div>
          <div class="welcome-popup-title">-10% sur votre 1ère commande</div>
          <p class="welcome-popup-desc">Profitez de notre offre de bienvenue exclusive. Utilisez ce code lors de votre commande.</p>
          <div class="welcome-popup-code" onclick="navigator.clipboard&&navigator.clipboard.writeText('ALLSTORE10');this.querySelector('small').textContent='Copié !'">
            ALLSTORE10
            <small>Cliquer pour copier</small>
          </div>
          <a href="index.html" class="welcome-popup-btn">Découvrir la sélection</a>
        </div>
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          overlay.classList.add('show');
        });
      });
      overlay.addEventListener('click',function(e){
        if(e.target===overlay)closeWelcome();
      });
      window.closeWelcome=function(){
        overlay.classList.remove('show');
        localStorage.setItem('als_welcome_shown','1');
        setTimeout(function(){overlay.remove()},350);
      };
    },5000);
  })();

  /* ── MOYENS DE PAIEMENT (footer) ────────────────────────── */
  (function(){
    var footers=document.querySelectorAll('.foot-legal,.foot-copy');
    var last=footers[footers.length-1];
    if(!last)return;
    // Check if already injected
    if(document.querySelector('.payment-methods'))return;
    var pm=document.createElement('div');
    pm.className='payment-methods';
    pm.innerHTML='<span>Visa</span><span>Mastercard</span><span>Apple Pay</span>';
    last.parentNode.insertBefore(pm,last);
  })();

})();
