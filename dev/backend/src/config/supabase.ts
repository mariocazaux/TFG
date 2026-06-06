import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Faltan SUPABASE_URL o SUPABASE_KEY en el entorno. La autenticación fallará.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
