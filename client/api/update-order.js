
import { createClient } from '@supabase/supabase-js';

// This is a Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { order_id, payment_status } = req.body;

  if (!order_id || !payment_status) {
    return res.status(400).json({ error: 'Missing required body parameters: order_id and payment_status.' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status })
      .eq('order_id', order_id);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'Order updated successfully.' });
  } catch (error) {
    console.error('Full error response:', error.message);
    res.status(500).json({ error: 'Failed to update order.' });
  }
}
