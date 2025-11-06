'use client';

import { useState, useEffect } from 'react';
import { Empresa } from '@/types';
import { Building2, CheckCircle, XCircle, Info } from 'lucide-react';

export default function EstadoEmpresas() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const [configStatus, setConfigStatus] = useState<{
    googleAppsScriptConfigured: boolean;
    canWriteToSheets: boolean;
    instructions: string;
  } | null>(null);

  useEffect(() => {
    fetchTodasLasEmpresas();
    fetchConfigStatus();
  }, []);

  const fetchTodasLasEmpresas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/empresas');
      const data = await response.json();
      setEmpresas(data);
    } catch (error) {
      console.error('Error fetching todas las empresas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConfigStatus = async () => {
    try {
      const response = await fetch('/api/config/status');
      const data = await response.json();
      setConfigStatus(data);
    } catch (error) {
      console.error('Error fetching config status:', error);
    }
  };

  const empresasActivas = empresas.filter(e => e.activa);
  const empresasInactivas = empresas.filter(e => !e.activa);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          Estado de Empresas
        </h2>
        <p className="text-gray-600 mt-2">Gestión de vigencia desde Google Sheets</p>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Empresas Activas</p>
              <p className="text-2xl font-bold text-green-800">{empresasActivas.length}</p>
              <p className="text-sm text-green-600">Visibles en formulario de pagos</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 font-medium">Empresas Inactivas</p>
              <p className="text-2xl font-bold text-red-800">{empresasInactivas.length}</p>
              <p className="text-sm text-red-600">Ocultas del formulario</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Estado de Configuración */}
      {configStatus && (
        <div className={`border rounded-lg p-4 mb-6 ${
          configStatus.canWriteToSheets 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {configStatus.canWriteToSheets ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Info className="w-5 h-5 text-yellow-500" />
            )}
            <h3 className={`font-medium ${
              configStatus.canWriteToSheets ? 'text-green-800' : 'text-yellow-800'
            }`}>
              Estado de Escritura en Google Sheets
            </h3>
          </div>
          <p className={`text-sm ${
            configStatus.canWriteToSheets ? 'text-green-700' : 'text-yellow-700'
          }`}>
            {configStatus.canWriteToSheets 
              ? '✅ Los pagos se escriben automáticamente en Google Sheets'
              : '⚠️ Los pagos NO se escriben en Google Sheets. Configuración pendiente.'
            }
          </p>
          {!configStatus.canWriteToSheets && (
            <p className="text-yellow-600 text-xs mt-1">
              Ver archivo GOOGLE_APPS_SCRIPT_SETUP.md para instrucciones de configuración.
            </p>
          )}
        </div>
      )}

      {/* Instrucciones */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Cómo activar/desactivar empresas:</h3>
            <p className="text-blue-700 text-sm mb-2">
              En Google Sheets, columna B (Vigencia): coloca <strong>&quot;X&quot;</strong> para activar, deja vacío para desactivar.
            </p>
            <p className="text-blue-600 text-xs">
              Los cambios se reflejan automáticamente al recargar la página de pagos.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Empresas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-800">Todas las Empresas</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {empresas.map((empresa) => (
            <div key={empresa.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  empresa.activa ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800">{empresa.nombre}</p>
                  <p className="text-sm text-gray-500">ID: {empresa.id}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Vigencia</p>
                  <p className="font-mono text-sm">
                    {empresa.vigencia || <span className="text-gray-400">vacío</span>}
                  </p>
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  empresa.activa 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {empresa.activa ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Activa
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" />
                      Inactiva
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {empresas.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay empresas</h3>
          <p className="text-gray-500">No se pudieron cargar las empresas desde Google Sheets.</p>
        </div>
      )}
    </div>
  );
}