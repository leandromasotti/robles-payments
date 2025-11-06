import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? 'Configurado ✅' : 'Faltante ❌',
  key: supabaseAnonKey ? 'Configurado ✅' : 'Faltante ❌'
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la base de datos
export interface VentaSupabase {
  id?: number;
  created_at?: string;
  nombre_empresa: string;
  nombre_cliente: string;
  importe: number;
}

export interface VentaInsert {
  nombre_empresa: string;
  nombre_cliente: string;
  importe: number;
}