export interface Empresa {
  id: number;
  nombre: string;
  nombreCompleto?: string; // Nombre original con ID incluido
  vigencia?: string; // Campo para activar/desactivar empresa
  activa?: boolean; // Campo calculado basado en vigencia
}

export interface Pago {
  id?: number;
  empresaId: number;
  nombreCliente: string; // Ahora contiene el nombre completo
  apellidoCliente: string; // Mantenido por compatibilidad pero no se usa
  importe: number;
  metodoPago: string;
  fechaPago: string;
  empresaNombre?: string;
}

// Nueva interfaz para las ventas en Supabase
export interface VentaSupabase {
  id?: number;
  created_at?: string;
  nombre_empresa: string;
  nombre_cliente: string;
  importe: number;
}

export interface VentasPorEmpresa {
  empresa: string;
  totalVentas: number;
  cantidadVentas: number;
  ventas: VentaSupabase[];
}

// Utilidad para limpiar nombres de empresa
export const limpiarNombreEmpresa = (nombreCompleto: string): { id: number; nombre: string } => {
  // Formatos soportados: "1 - Empresa A", "1 Empresa A", "Empresa A (1)"
  const patterns = [
    /^(\d+)\s*-\s*(.+)$/,        // "1 - Empresa A"
    /^(\d+)\s+(.+)$/,            // "1 Empresa A" 
    /^(.+)\s*\((\d+)\)$/,        // "Empresa A (1)"
  ];
  
  for (const pattern of patterns) {
    const match = nombreCompleto.match(pattern);
    if (match) {
      if (pattern === patterns[2]) {
        // Formato "Empresa A (1)"
        return {
          id: parseInt(match[2]),
          nombre: match[1].trim()
        };
      } else {
        // Formatos "1 - Empresa A" o "1 Empresa A"
        return {
          id: parseInt(match[1]),
          nombre: match[2].trim()
        };
      }
    }
  }
  
  // Si no coincide con ningún patrón, asumir que es solo nombre
  return {
    id: 1,
    nombre: nombreCompleto.trim()
  };
};