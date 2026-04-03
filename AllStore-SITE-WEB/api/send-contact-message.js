module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Champs requis manquants' });
    }

    if (!process.env.RESEND_API_KEY || !process.env.OWNER_EMAIL) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'AllStore Contact <noreply@allstore-tm.fr>',
      replyTo: email,
      to: process.env.OWNER_EMAIL,
      subject: `Message de ${name} — Contact AllStore`,
      html: `
        <h2 style="color:#0a1923;font-family:sans-serif">Nouveau message — Formulaire de contact</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap;color:#333">${message}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0">
        <p style="font-size:12px;color:#999">Envoyé depuis allstore-tm.fr/contact.html</p>
      `
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
};
