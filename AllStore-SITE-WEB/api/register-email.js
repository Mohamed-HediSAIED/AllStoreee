module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, source } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Email invalide' });

    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    // Upsert — if email already exists, do nothing
    const { error } = await supabase
      .from('clients')
      .upsert(
        { email: email.toLowerCase().trim(), source: source || 'signup' },
        { onConflict: 'email', ignoreDuplicates: true }
      );

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
