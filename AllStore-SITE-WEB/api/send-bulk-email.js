module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password, subject, htmlBody } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    if (!subject || !htmlBody) {
      return res.status(400).json({ error: 'Sujet et contenu requis' });
    }

    const { createClient } = require('@supabase/supabase-js');
    const { Resend } = require('resend');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get all client emails
    const { data, error } = await supabase
      .from('clients')
      .select('email');

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (!data || data.length === 0) {
      return res.status(200).json({ ok: true, sent: 0, message: 'Aucun client inscrit' });
    }

    // Send in batches of 50 (Resend limit safety)
    const emails = data.map(c => c.email);
    let sent = 0;

    for (let i = 0; i < emails.length; i += 50) {
      const batch = emails.slice(i, i + 50);
      const messages = batch.map(email => ({
        from: 'AllStore <onboarding@resend.dev>',
        to: email,
        subject: subject,
        html: htmlBody,
      }));

      try {
        await resend.batch.send(messages);
        sent += batch.length;
      } catch (batchErr) {
        console.error('Batch send error:', batchErr.message);
      }
    }

    res.status(200).json({ ok: true, sent: sent, total: emails.length });
  } catch (err) {
    console.error('Bulk email error:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
