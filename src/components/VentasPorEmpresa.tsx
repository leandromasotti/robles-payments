'use client';

import { useState, useEffect } from 'react';
import { VentaSupabase, type VentasPorEmpresa } from '@/types';
import { Building2, DollarSign, Calendar, CreditCard, TrendingUp, Download } from 'lucide-react';

export default function VentasPorEmpresa() {
  const [ventasPorEmpresa, setVentasPorEmpresa] = useState<VentasPorEmpresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmpresa, setSelectedEmpresa] = useState<string>('');
  const [estadisticas, setEstadisticas] = useState<{
    totalVentas: number;
    totalTransacciones: number;
    ventasPorEmpresa: Array<{empresa: string; totalVentas: number; cantidadVentas: number}>;
  }>({
    totalVentas: 0,
    totalTransacciones: 0,
    ventasPorEmpresa: []
  });

  useEffect(() => {
    fetchVentasData();
  }, []);

  const fetchVentasData = async () => {
    try {
      setLoading(true);
      const [ventasResponse, estadisticasResponse] = await Promise.all([
        fetch('/api/pagos'),
        fetch('/api/ventas/estadisticas')
      ]);

      const ventas: VentaSupabase[] = await ventasResponse.json();
      const stats = await estadisticasResponse.json();

      setEstadisticas(stats);

      // Agrupar ventas por empresa usando los datos de Supabase
      const ventasAgrupadas = stats.ventasPorEmpresa.map((empresaStats: {empresa: string; totalVentas: number; cantidadVentas: number}) => {
        const ventasEmpresa = ventas.filter(venta => venta.nombre_empresa === empresaStats.empresa);
        
        return {
          empresa: empresaStats.empresa,
          totalVentas: empresaStats.totalVentas,
          cantidadVentas: empresaStats.cantidadVentas,
          ventas: ventasEmpresa.sort((a, b) => 
            new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
          )
        };
      })
      .filter((item: {cantidadVentas: number}) => item.cantidadVentas > 0)
      .sort((a: VentasPorEmpresa, b: VentasPorEmpresa) => a.empresa.localeCompare(b.empresa)); // Ordenar alfabéticamente

      setVentasPorEmpresa(ventasAgrupadas);
    } catch (error) {
      console.error('Error fetching ventas data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para exportar a CSV
  const exportToCSV = () => {
    const ventasFiltradas = ventasPorEmpresa
      .filter(item => !selectedEmpresa || item.empresa === selectedEmpresa)
      .flatMap(empresaData => empresaData.ventas);

    // Crear encabezados CSV
    const headers = ['Fecha', 'Empresa', 'Cliente', 'Importe'];
    
    // Crear filas CSV
    const rows = ventasFiltradas.map(venta => [
      new Date(venta.created_at || '').toLocaleDateString(),
      venta.nombre_empresa,
      venta.nombre_cliente,
      venta.importe.toString()
    ]);

    // Combinar encabezados y filas
    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // Nombre del archivo basado en el filtro
    const fileName = selectedEmpresa 
      ? `ventas_${selectedEmpresa.replace(/\s+/g, '_')}_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`
      : `todas_las_ventas_${new Date().toLocaleDateString().replace(/\//g, '-')}.csv`;
    
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalGeneral = estadisticas.totalVentas;
  const totalTransacciones = estadisticas.totalTransacciones;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          Ventas por Empresa
        </h1>
        <p className="text-gray-600 mt-2">Dashboard de ventas y transacciones</p>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Ventas</p>
              <p className="text-2xl font-bold">${totalGeneral.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Transacciones</p>
              <p className="text-2xl font-bold">{totalTransacciones}</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Empresas Activas</p>
              <p className="text-2xl font-bold">{ventasPorEmpresa.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filtro por Empresa y Exportar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por empresa:
          </label>
          <select
            value={selectedEmpresa}
            onChange={(e) => setSelectedEmpresa(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las empresas</option>
            {ventasPorEmpresa
              .sort((a, b) => a.empresa.localeCompare(b.empresa))
              .map((item) => (
              <option key={item.empresa} value={item.empresa}>
                {item.empresa}
              </option>
            ))}
          </select>
        </div>
        
        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors font-medium"
          title={selectedEmpresa ? `Exportar ventas de ${selectedEmpresa}` : 'Exportar todas las ventas'}
        >
          <Download className="w-4 h-4" />
          Exportar CSV
        </button>
      </div>

      {/* Lista de Ventas por Empresa */}
      <div className="space-y-6">
        {ventasPorEmpresa
          .filter(item => !selectedEmpresa || item.empresa === selectedEmpresa)
          .map((empresaData) => (
            <div key={empresaData.empresa} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    {empresaData.empresa}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${empresaData.totalVentas.toLocaleString()}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {empresaData.cantidadVentas} transacciones
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {empresaData.ventas.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cliente
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Importe
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {empresaData.ventas.map((venta) => (
                          <tr key={venta.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <User className="w-4 h-4 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-900">
                                  {venta.nombre_cliente}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-green-600">
                                ${Number(venta.importe).toLocaleString()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(venta.created_at || '').toLocaleDateString()}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No hay ventas registradas para esta empresa</p>
                )}
              </div>
            </div>
          ))}
      </div>

      {ventasPorEmpresa.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos de ventas</h3>
          <p className="text-gray-500">No se encontraron ventas registradas en el sistema.</p>
        </div>
      )}
    </div>
  );
}

function User({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}