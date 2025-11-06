import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar variables de entorno primero
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        status: 'configuration_error',
        error: 'Variables de entorno de Supabase no configuradas',
        details: {
          SUPABASE_URL: supabaseUrl ? '✅ Configurada' : '❌ Faltante',
          SUPABASE_KEY: supabaseAnonKey ? '✅ Configurada' : '❌ Faltante',
          instructions: [
            '1. Crea un proyecto en https://supabase.com',
            '2. Ve a Settings > API en tu dashboard',
            '3. Copia Project URL y Anon Key',
            '4. Actualiza el archivo .env.local con tus credenciales reales',
            '5. Reinicia el servidor con: npm run dev'
          ]
        },
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Solo importar supabase si las variables están configuradas
    const { supabase } = await import('@/lib/supabase');
    
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Connection check
    const { error: authError } = await supabase.auth.getSession();
    console.log('Auth test:', { hasError: !!authError, error: authError?.message });
    
    // Test 2: Table structure check
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    console.log('Tables query:', { hasError: !!tablesError, error: tablesError?.message });
    
    // Test 3: Try to query Ventas table (with different case variations)
    const tests = ['Ventas', 'ventas', 'VENTAS'];
    const tableResults = [];
    
    for (const tableName of tests) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        tableResults.push({
          tableName,
          exists: !error,
          error: error?.message,
          recordCount: data?.length || 0
        });
      } catch (err) {
        tableResults.push({
          tableName,
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }
    
    // Test 4: Check environment variables
    const envCheck = {
      SUPABASE_URL: !!supabaseUrl,
      SUPABASE_KEY: !!supabaseAnonKey,
      url_value: supabaseUrl?.substring(0, 20) + '...',
      key_value: supabaseAnonKey?.substring(0, 20) + '...'
    };
    
    return NextResponse.json({
      status: 'test_completed',
      timestamp: new Date().toISOString(),
      environment: envCheck,
      connection: {
        authError: authError?.message || null
      },
      tables: {
        queryError: tablesError?.message || null,
        availableTables: tables?.map(t => t.table_name) || []
      },
      ventasTableTests: tableResults
    });
    
  } catch (error) {
    console.error('🚨 Critical error in Supabase test:', error);
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      hint: 'Verifica que las variables de entorno estén configuradas en .env.local'
    }, { status: 500 });
  }
}
