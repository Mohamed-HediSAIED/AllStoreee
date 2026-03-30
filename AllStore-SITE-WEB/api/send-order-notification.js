module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { order } = req.body;
    if (!order) return res.status(400).json({ error: 'Missing order data' });

    const items = (order.items || []).map(i => `${i.brand} ${i.name} — ${i.price}`).join('\n  ');
    const s = order.shippingInfo || {};

    // Option 1 : Resend (email)
    if (process.env.RESEND_API_KEY && process.env.OWNER_EMAIL) {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'AllStore <onboarding@resend.dev>',
        to: process.env.OWNER_EMAIL,
        subject: `Nouvelle commande ${order.id} — ${(order.total || 0).toFixed(2)} EUR`,
        html: `
          <h2 style="color:#0a1923">Nouvelle commande AllStore</h2>
          <p><strong>N° :</strong> ${order.id}</p>
          <p><strong>Client :</strong> ${s.prenom || ''} ${s.nom || ''}</p>
          <p><strong>Email :</strong> ${s.email || ''}</p>
          <p><strong>Tél :</strong> ${s.telephone || ''}</p>
          <p><strong>Adresse :</strong> ${s.adresse || ''}, ${s.code_postal || ''} ${s.ville || ''}, ${s.pays || ''}</p>
          <hr>
          <p><strong>Articles :</strong></p>
          <ul>${(order.items || []).map(i => `<li>${i.brand} ${i.name} — ${i.price}</li>`).join('')}</ul>
          <p><strong>Sous-total :</strong> ${(order.subtotal || 0).toFixed(2)} EUR</p>
          <p><strong>Livraison :</strong> ${(order.shipping || 0) > 0 ? (order.shipping).toFixed(2) + ' EUR' : 'Offerte'}</p>
          <p style="font-size:18px"><strong>Total : ${(order.total || 0).toFixed(2)} EUR</strong></p>
          <p><strong>Paiement :</strong> ${order.paymentMethod} (${order.paymentId})</p>
        `,
      });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Notification error:', err.message);
    // Ne pas bloquer — la commande est déjà payée
    res.status(200).json({ ok: true, warning: 'Notification failed' });
  }
};
