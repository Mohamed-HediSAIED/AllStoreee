/* ══════════════════════════════════════════════════════════════
   ALLSTORE — CHECKOUT JS
   Gère le flow : récap → livraison → paiement (Stripe + Apple Pay)
══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── Config ── */
  // REMPLACER PAR VOTRE CLÉ PUBLIQUE STRIPE (pk_live_XXX en production)
  var STRIPE_PK = 'pk_live_51TFdBiJgVqdU6Uy67dSgbedXGt2IlffAUaTr82aqBl9SB7TCfl3egEgyLjlv3LUKWSKz19ePO3CpTet4DoaNAUoK00Ref6kC9I';
  var FREE_SHIPPING_THRESHOLD = 0; // livraison toujours offerte
  var SHIPPING_COST = 0;
  var SERVICE_FEE_RATE = 0.03; // 3%
  var SERVICE_FEE_FIXED = 0.30; // +0.30€

  /* ── Promo codes ── */
  var PROMO_CODES = {
    'ALLSTORE10': { discount: 0.10, label: '-10%' },
  };

  /* ── State ── */
  var currentStep = 1;
  var cart = [];
  var subtotal = 0;
  var shipping = 0;
  var serviceFee = 0;
  var discount = 0;
  var appliedPromo = null;
  var total = 0;
  var selectedPayment = 'stripe';
  var shippingInfo = {};
  var stripe, cardElement;
  var paymentRequest = null;
  var prButtonMounted = false;

  /* ── Read cart ── */
  function getCart() {
    try { return JSON.parse(localStorage.getItem('als_cart')) || []; }
    catch(e) { return []; }
  }

  function parsePrice(priceStr) {
    if (!priceStr) return 0;
    var n = parseFloat(String(priceStr).replace(/[^\d.,]/g, '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
  }

  /* ── Init ── */
  function init() {
    cart = getCart();
    if (!cart.length) {
      document.getElementById('ck-steps').style.display = 'none';
      document.getElementById('ck-step-1').style.display = 'none';
      document.getElementById('ck-empty').style.display = 'block';
      return;
    }

    calculateTotals();
    renderItems();
    renderTotals();
    initStripe();
    initApplePay();
  }

  function calculateTotals() {
    subtotal = 0;
    cart.forEach(function(item) {
      subtotal += parsePrice(item.price);
    });
    shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    discount = appliedPromo ? Math.round(subtotal * appliedPromo.discount * 100) / 100 : 0;
    var afterDiscount = subtotal - discount;
    serviceFee = Math.round((afterDiscount * SERVICE_FEE_RATE + SERVICE_FEE_FIXED) * 100) / 100;
    total = afterDiscount + shipping + serviceFee;
  }

  /* ── Render items ── */
  function renderItems() {
    var el = document.getElementById('ck-items');
    el.innerHTML = cart.map(function(item) {
      return '<div class="ck-item">' +
        '<div class="ck-item-img"><img src="' + (item.img || '') + '" alt="' + (item.name || '') + '"></div>' +
        '<div class="ck-item-info"><span class="ck-item-brand">' + (item.brand || '') + '</span><span class="ck-item-name">' + (item.name || '') + '</span></div>' +
        '<span class="ck-item-price">' + parsePrice(item.price).toFixed(0) + ' &euro;</span>' +
      '</div>';
    }).join('');
  }

  function renderTotals() {
    var html = '<div class="ck-total-row"><span>Sous-total</span><span>' + subtotal.toFixed(2) + ' &euro;</span></div>';
    if (discount > 0) {
      html += '<div class="ck-total-row" style="color:#27ae60"><span>Réduction (' + appliedPromo.label + ')</span><span>-' + discount.toFixed(2) + ' &euro;</span></div>';
    }
    html += '<div class="ck-total-row"><span>Livraison</span><span>' + (shipping > 0 ? shipping.toFixed(2) + ' &euro;' : 'Offerte') + '</span></div>' +
      '<div class="ck-total-row"><span>Frais de service</span><span>' + serviceFee.toFixed(2) + ' &euro;</span></div>' +
      '<div class="ck-total-row total"><span>Total</span><span>' + total.toFixed(2) + ' &euro;</span></div>';
    document.getElementById('ck-totals').innerHTML = html;
    var mini = document.getElementById('ck-totals-mini');
    if (mini) mini.innerHTML = html;
    var stripeTotal = document.getElementById('stripe-total');
    if (stripeTotal) stripeTotal.textContent = total.toFixed(2) + ' €';
  }

  /* ── Promo code ── */
  window.applyPromo = function() {
    var input = document.getElementById('ck-promo-input');
    var msg = document.getElementById('ck-promo-msg');
    var code = input.value.trim().toUpperCase();

    if (!code) {
      msg.textContent = 'Entrez un code promo.';
      msg.className = 'ck-promo-msg error';
      return;
    }

    var promo = PROMO_CODES[code];
    if (!promo) {
      msg.textContent = 'Code invalide.';
      msg.className = 'ck-promo-msg error';
      return;
    }

    // Check if first order (localStorage)
    if (localStorage.getItem('als_has_ordered')) {
      msg.textContent = 'Ce code est réservé à la première commande.';
      msg.className = 'ck-promo-msg error';
      return;
    }

    appliedPromo = { discount: promo.discount, label: promo.label, _code: code };
    calculateTotals();
    renderTotals();
    updatePaymentRequestTotal();

    // Replace input with applied badge
    var row = document.getElementById('ck-promo-row');
    row.innerHTML = '<div class="ck-promo-applied"><span>' + code + ' appliqué — ' + promo.label + '</span><button class="ck-promo-remove" onclick="removePromo()" title="Retirer">&times;</button></div>';
    msg.textContent = '';
    msg.className = 'ck-promo-msg';
  };

  window.removePromo = function() {
    appliedPromo = null;
    calculateTotals();
    renderTotals();
    updatePaymentRequestTotal();

    var row = document.getElementById('ck-promo-row');
    row.innerHTML = '<input class="ck-input ck-promo-input" id="ck-promo-input" type="text" placeholder="Code promo" autocomplete="off" spellcheck="false"><button class="ck-promo-btn" type="button" onclick="applyPromo()">Appliquer</button>';
    var msg = document.getElementById('ck-promo-msg');
    msg.textContent = '';
    msg.className = 'ck-promo-msg';
  };

  /* ── Step navigation ── */
  window.goToStep = function(step) {
    if (step === 1 || step === 2 || step === 3) {
      currentStep = step;
      updateStepUI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  function updateStepUI() {
    document.querySelectorAll('.ck-section').forEach(function(s) { s.classList.remove('active'); });
    var section = document.getElementById('ck-step-' + currentStep);
    if (section) section.classList.add('active');

    document.querySelectorAll('.ck-step').forEach(function(s) {
      var stepNum = parseInt(s.dataset.step);
      s.classList.remove('active', 'done');
      if (stepNum === currentStep) s.classList.add('active');
      else if (stepNum < currentStep) s.classList.add('done');
    });

    hideError();

  }

  /* ── Shipping validation ── */
  window.validateShippingAndContinue = function() {
    var fields = [
      { id: 'ck-prenom', key: 'prenom' },
      { id: 'ck-nom', key: 'nom' },
      { id: 'ck-email', key: 'email', type: 'email' },
      { id: 'ck-tel', key: 'telephone' },
      { id: 'ck-adresse', key: 'adresse' },
      { id: 'ck-ville', key: 'ville' },
      { id: 'ck-cp', key: 'code_postal' },
      { id: 'ck-pays', key: 'pays' },
    ];

    var valid = true;
    shippingInfo = {};

    fields.forEach(function(f) {
      var input = document.getElementById(f.id);
      var val = input.value.trim();
      input.classList.remove('error');

      if (!val) {
        input.classList.add('error');
        valid = false;
      } else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('error');
        valid = false;
      }

      shippingInfo[f.key] = val;
    });

    if (!valid) {
      showError('Veuillez remplir tous les champs correctement.');
      return;
    }

    goToStep(3);
  };

  /* ── Payment selection ── */
  window.selectPayment = function(method) {
    selectedPayment = method;
    document.querySelectorAll('.ck-pay-option').forEach(function(o) { o.classList.remove('selected'); });
    document.getElementById('pay-opt-' + method).classList.add('selected');

    document.getElementById('stripe-container').classList.toggle('active', method === 'stripe');
    document.getElementById('applepay-container').classList.toggle('active', method === 'applepay');
  };

  /* ── Stripe ── */
  function initStripe() {
    if (typeof Stripe === 'undefined') return;
    try {
      stripe = Stripe(STRIPE_PK);
      var elements = stripe.elements({
        fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap' }]
      });
      cardElement = elements.create('card', {
        style: {
          base: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '15px',
            color: '#0a1923',
            '::placeholder': { color: '#8a9aa8' },
          },
          invalid: { color: '#e74c3c' },
        },
        hidePostalCode: true,
      });
      cardElement.mount('#stripe-card-element');
      cardElement.on('change', function(event) {
        document.getElementById('stripe-error').textContent = event.error ? event.error.message : '';
      });
    } catch(e) {
      console.warn('Stripe init error:', e);
    }
  }

  /* ── Apple Pay / Google Pay (via Stripe Payment Request) ── */
  function initApplePay() {
    if (!stripe) return;
    try {
      paymentRequest = stripe.paymentRequest({
        country: 'FR',
        currency: 'eur',
        total: {
          label: 'AllStore',
          amount: Math.round(total * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      paymentRequest.canMakePayment().then(function(result) {
        if (result) {
          // Show the Apple Pay / Google Pay option
          var opt = document.getElementById('pay-opt-applepay');
          if (opt) opt.style.display = '';

          // Update label based on wallet type
          if (result.applePay) {
            document.getElementById('applepay-title').textContent = 'Apple Pay';
            document.getElementById('applepay-desc').textContent = 'Paiement express sécurisé';
          } else {
            document.getElementById('applepay-title').textContent = 'Google Pay';
            document.getElementById('applepay-desc').textContent = 'Paiement express sécurisé';
          }

          // Mount the Payment Request Button
          var prButton = stripe.elements().create('paymentRequestButton', {
            paymentRequest: paymentRequest,
            style: {
              paymentRequestButton: {
                type: 'default',
                theme: 'dark',
                height: '50px',
              },
            },
          });
          prButton.mount('#payment-request-button');
          prButtonMounted = true;
        }
      });

      // Handle payment
      paymentRequest.on('paymentmethod', function(ev) {
        // Create payment intent on server
        fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.map(function(i) { return { id: i.id, brand: i.brand, name: i.name, price: i.price }; }),
            shipping: shippingInfo,
            promoCode: appliedPromo ? appliedPromo._code : null,
          }),
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.error) {
            ev.complete('fail');
            showError(data.error);
            return;
          }
          // Confirm the payment with the payment method from Apple Pay / Google Pay
          stripe.confirmCardPayment(data.clientSecret, {
            payment_method: ev.paymentMethod.id,
          }, { handleActions: false })
          .then(function(confirmResult) {
            if (confirmResult.error) {
              ev.complete('fail');
              showError(confirmResult.error.message);
            } else {
              ev.complete('success');
              if (confirmResult.paymentIntent.status === 'requires_action') {
                stripe.confirmCardPayment(data.clientSecret).then(function(result) {
                  if (result.error) {
                    showError(result.error.message);
                  } else {
                    handlePaymentSuccess('applepay', result.paymentIntent.id);
                  }
                });
              } else {
                handlePaymentSuccess('applepay', confirmResult.paymentIntent.id);
              }
            }
          });
        })
        .catch(function(err) {
          ev.complete('fail');
          showError('Erreur de connexion au serveur.');
          console.error(err);
        });
      });
    } catch(e) {
      console.warn('Apple Pay init error:', e);
    }
  }

  // Update payment request amount when total changes
  function updatePaymentRequestTotal() {
    if (paymentRequest) {
      paymentRequest.update({
        total: {
          label: 'AllStore',
          amount: Math.round(total * 100),
        },
      });
    }
  }

  window.payWithStripe = function() {
    if (!stripe || !cardElement) {
      showError('Stripe non initialisé. Rafraîchissez la page.');
      return;
    }

    var btn = document.getElementById('stripe-pay-btn');
    btn.classList.add('loading');
    btn.disabled = true;
    hideError();

    // Call backend to create payment intent
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(function(i) { return { id: i.id, brand: i.brand, name: i.name, price: i.price }; }),
        shipping: shippingInfo,
        promoCode: appliedPromo ? appliedPromo._code : null,
      }),
    })
    .then(function(r) {
      if (!r.ok) throw new Error('Erreur serveur');
      return r.json();
    })
    .then(function(data) {
      if (data.error) throw new Error(data.error);
      return stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingInfo.prenom + ' ' + shippingInfo.nom,
            email: shippingInfo.email,
            phone: shippingInfo.telephone,
          },
        },
      });
    })
    .then(function(result) {
      if (result.error) {
        showError(result.error.message);
        btn.classList.remove('loading');
        btn.disabled = false;
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        handlePaymentSuccess('stripe', result.paymentIntent.id);
      }
    })
    .catch(function(err) {
      showError(err.message || 'Une erreur est survenue. Réessayez.');
      btn.classList.remove('loading');
      btn.disabled = false;
    });
  };

  /* ── Post-payment ── */
  function handlePaymentSuccess(method, paymentId) {
    // Save order to session
    var order = {
      id: 'ALS-' + Date.now().toString(36).toUpperCase(),
      items: cart,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      shippingInfo: shippingInfo,
      paymentMethod: method,
      paymentId: paymentId,
      date: new Date().toISOString(),
    };
    sessionStorage.setItem('als_order', JSON.stringify(order));

    // Clear cart + mark as ordered (for promo code restriction)
    localStorage.removeItem('als_cart');
    localStorage.setItem('als_has_ordered', '1');

    // Send notification (fire and forget)
    try {
      fetch('/api/send-order-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: order }),
      }).catch(function() {});
    } catch(e) {}

    // Redirect to confirmation
    window.location.href = 'confirmation.html';
  }

  /* ── Error handling ── */
  function showError(msg) {
    var el = document.getElementById('ck-error');
    el.textContent = msg;
    el.classList.add('show');
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideError() {
    var el = document.getElementById('ck-error');
    el.classList.remove('show');
    el.textContent = '';
  }

  /* ── Start ── */
  init();

})();
