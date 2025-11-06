import { NextResponse } from 'next/server';
import { SupabaseService } from '@/lib/supabaseService';

export async function GET() {
  try {
    const estadisticas = await SupabaseService.getEstadisticasVentas();
    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error('Error in GET /api/ventas/estadisticas:', error);
    return NextResponse.json(
      { error: 'Error fetching estadísticas from Supabase' },
      { status: 500 }
    );
  }
}