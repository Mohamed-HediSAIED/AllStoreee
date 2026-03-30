const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Prix serveur (en centimes EUR) — source de vérité côté serveur
// IMPORTANT : ne jamais faire confiance aux prix envoyés par le client
const PRODUCT_PRICES = {
  'prada_cup': 10500, // 105.00 €
  'alo': 7500, // 75.00 €
  'b30': 10500, // 105.00 €
  'burberry_hoodie': 6500, // 65.00 €
  'im_beckett': 12500, // 125.00 €
  'si_pull': 6500, // 65.00 €
  'lp_casquette': 4500, // 45.00 €
  'airpods_max': 18500, // 185.00 €
  // Ajouter ici les futurs produits : 'product_id': prix_en_centimes
};

const FREE_SHIPPING_THRESHOLD = 0; // livraison toujours offerte
const SHIPPING_COST = 0;
const SERVICE_FEE_RATE = 0.03; // 3%
const SERVICE_FEE_FIXED = 30; // +0.30€ en centimes

// Codes promo (serveur = source de vérité)
const PROMO_CODES = {
  'ALLSTORE10': 0.10, // -10%
};

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { items, shipping, promoCode } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Panier vide' });
    }

    if (!shipping || !shipping.email || !shipping.prenom || !shipping.nom) {
      return res.status(400).json({ error: 'Informations de livraison manquantes' });
    }

    // Calculer le total côté serveur
    let subtotal = 0;
    for (const item of items) {
      // Extraire l'ID de base (sans le suffixe couleur)
      const baseId = item.id ? item.id.replace(/_(?:noir|blanc|bleu|rouge|vert|gris|rose|violet|orange|jaune|lavande|bordeaux|marron|turquoise|anthracite|marine).*$/, '') : '';
      const serverPrice = PRODUCT_PRICES[baseId];

      if (!serverPrice) {
        return res.status(400).json({ error: 'Produit inconnu : ' + (item.id || 'N/A') });
      }

      subtotal += serverPrice;
    }

    const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    // Appliquer le code promo si valide
    let discountAmount = 0;
    if (promoCode && PROMO_CODES[promoCode.toUpperCase()]) {
      discountAmount = Math.round(subtotal * PROMO_CODES[promoCode.toUpperCase()]);
    }
    const afterDiscount = subtotal - discountAmount;
    const serviceFee = Math.round(afterDiscount * SERVICE_FEE_RATE) + SERVICE_FEE_FIXED;
    const total = afterDiscount + shippingCost + serviceFee;

    // Créer le PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_email: shipping.email,
        customer_name: shipping.prenom + ' ' + shipping.nom,
        customer_phone: shipping.telephone || '',
        shipping_address: [shipping.adresse, shipping.code_postal, shipping.ville, shipping.pays].join(', '),
        items: JSON.stringify(items.map(i => i.id + ' (' + i.name + ')')),
      },
      receipt_email: shipping.email,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message, err.stack);
    res.status(500).json({ error: err.message || 'Erreur de paiement. Réessayez.' });
  }
};
