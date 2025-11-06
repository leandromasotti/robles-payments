import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
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
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      url_value: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...',
      key_value: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...'
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
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}