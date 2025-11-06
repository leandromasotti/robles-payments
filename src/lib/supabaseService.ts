import { supabase } from './supabase';
import { VentaSupabase, VentaInsert } from './supabase';

export class SupabaseService {
  
  // Obtener todas las ventas
  static async getVentas(): Promise<VentaSupabase[]> {
    try {
      console.log('🔍 Supabase: Fetching ventas from table "Ventas"...');
      
      const { data, error } = await supabase
        .from('Ventas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase Error fetching ventas:', {
          error: error,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return [];
      }

      console.log('✅ Supabase: Ventas fetched successfully:', data?.length || 0, 'records');
      return data || [];
    } catch (error) {
      console.error('🚨 Critical error in getVentas:', error);
      return [];
    }
  }

  // Agregar una nueva venta
  static async addVenta(venta: VentaInsert): Promise<VentaSupabase | null> {
    try {
      console.log('💾 Supabase: Starting to add venta...', venta);
      console.log('🔗 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      const { data, error } = await supabase
        .from('Ventas')
        .insert([venta])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase Error inserting venta:', {
          error: error,
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          stack: error.stack
        });
        console.error('💡 Check if table "Ventas" exists and has proper structure');
        return null;
      }

      console.log('✅ Venta agregada exitosamente a Supabase:', data);
      return data;
    } catch (error) {
      console.error('🚨 Critical error in addVenta:', error);
      return null;
    }
  }

  // Obtener ventas por empresa
  static async getVentasPorEmpresa(nombreEmpresa: string): Promise<VentaSupabase[]> {
    try {
      const { data, error } = await supabase
        .from('Ventas')
        .select('*')
        .eq('nombre_empresa', nombreEmpresa)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ventas por empresa from Supabase:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getVentasPorEmpresa:', error);
      return [];
    }
  }

  // Obtener estadísticas de ventas
  static async getEstadisticasVentas() {
    try {
      const { data, error } = await supabase
        .from('Ventas')
        .select('nombre_empresa, importe');

      if (error) {
        console.error('Error fetching estadísticas from Supabase:', error);
        return {
          totalVentas: 0,
          totalTransacciones: 0,
          ventasPorEmpresa: []
        };
      }

      const ventasPorEmpresa = data?.reduce((acc: Record<string, {totalVentas: number, cantidadVentas: number}>, venta) => {
        const empresa = venta.nombre_empresa;
        if (!acc[empresa]) {
          acc[empresa] = {
            totalVentas: 0,
            cantidadVentas: 0
          };
        }
        acc[empresa].totalVentas += Number(venta.importe);
        acc[empresa].cantidadVentas += 1;
        return acc;
      }, {});

      const totalVentas = data?.reduce((sum, venta) => sum + Number(venta.importe), 0) || 0;
      const totalTransacciones = data?.length || 0;

      return {
        totalVentas,
        totalTransacciones,
        ventasPorEmpresa: Object.entries(ventasPorEmpresa || {}).map(([empresa, stats]: [string, {totalVentas: number, cantidadVentas: number}]) => ({
          empresa,
          totalVentas: stats.totalVentas,
          cantidadVentas: stats.cantidadVentas
        }))
      };
    } catch (error) {
      console.error('Error in getEstadisticasVentas:', error);
      return {
        totalVentas: 0,
        totalTransacciones: 0,
        ventasPorEmpresa: []
      };
    }
  }
}