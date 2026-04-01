module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { password } = req.body;
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    const { data, error } = await supabase
      .from('clients')
      .select('id, email, source, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    res.status(200).json({ ok: true, total: data.length, clients: data });
  } catch (err) {
    console.error('List clients error:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
