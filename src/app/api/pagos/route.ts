import { NextRequest, NextResponse } from 'next/server';
import { SupabaseService } from '@/lib/supabaseService';

export async function GET() {
  try {
    const ventas = await SupabaseService.getVentas();
    return NextResponse.json(ventas);
  } catch (error) {
    console.error('Error in GET /api/pagos:', error);
    return NextResponse.json(
      { error: 'Error fetching ventas from Supabase' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📥 API: Recibido pago para agregar a Supabase:', body);
    
    // Validar datos requeridos
    if (!body.empresaNombre || !body.nombreCliente || !body.importe) {
      console.error('❌ API: Datos faltantes en el cuerpo de la petición');
      return NextResponse.json(
        { error: 'Datos faltantes: empresaNombre, nombreCliente, importe son requeridos' },
        { status: 400 }
      );
    }
    
    // Transformar el formato de pago al formato de Supabase
    const ventaData = {
      nombre_empresa: body.empresaNombre,
      nombre_cliente: body.nombreCliente, // Ya viene el nombre completo
      importe: parseFloat(body.importe)
    };
    
    console.log('🔄 API: Transformando datos para Supabase:', ventaData);
    
    const nuevaVenta = await SupabaseService.addVenta(ventaData);
    
    if (nuevaVenta) {
      console.log('✅ API: Venta registrada exitosamente:', nuevaVenta);
      return NextResponse.json({ 
        success: true,
        message: 'Venta registrada exitosamente en Supabase',
        data: nuevaVenta 
      });
    } else {
      console.error('❌ API: SupabaseService.addVenta retornó null');
      return NextResponse.json(
        { error: 'Error al registrar venta en Supabase - revisar logs de Supabase' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('🚨 API: Error crítico in POST /api/pagos:', error);
    return NextResponse.json(
      { error: 'Error creating venta: ' + error },
      { status: 500 }
    );
  }
}