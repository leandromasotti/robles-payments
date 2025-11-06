'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Empresa, Pago } from '@/types';
import { Building2, User, DollarSign } from 'lucide-react';

interface FormularioPagoProps {
  onPagoCreated?: () => void;
}

export default function FormularioPago({ onPagoCreated }: FormularioPagoProps) {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    empresaId: '',
    nombreCompleto: '',
    importe: ''
  });

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await fetch('/api/empresas/activas'); // Solo empresas activas
      const data = await response.json();
      console.log('Empresas activas cargadas:', data); // Debug
      setEmpresas(data);
    } catch (error) {
      console.error('Error fetching empresas activas:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const empresaSeleccionada = empresas.find(emp => emp.id.toString() === formData.empresaId);
      
      const pagoData: Omit<Pago, 'id'> = {
        empresaId: parseInt(formData.empresaId),
        nombreCliente: formData.nombreCompleto,
        apellidoCliente: '', // Ya no se usa por separado
        importe: parseFloat(formData.importe),
        metodoPago: 'tarjeta', // Valor por defecto
        fechaPago: new Date().toISOString().split('T')[0], // Fecha actual
        empresaNombre: empresaSeleccionada?.nombre || ''
      };

      console.log('📤 Frontend: Enviando pago a Supabase:', pagoData);

      const response = await fetch('/api/pagos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pagoData),
      });

      const result = await response.json();
      console.log('📥 Frontend: Respuesta de API:', { status: response.status, result });

      if (response.ok) {
        console.log('✅ Frontend: Pago registrado exitosamente');
        // Reset form
        setFormData({
          empresaId: '',
          nombreCompleto: '',
          importe: ''
        });
        
        // Redirigir a la página de éxito
        router.push('/pago-exitoso');
        
        onPagoCreated?.();
      } else {
        console.error('❌ Frontend: Error en la respuesta de API:', result);
        alert(`❌ Error: ${result.error || 'Error al registrar el pago'}`);
      }
    } catch (error) {
      console.error('🚨 Frontend: Error crítico:', error);
      alert('Error al registrar el pago. Revisa la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          Registrar Pago
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Ingrese los datos del pago</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Nombre completo del cliente
          </label>
          <input
            type="text"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            required
            maxLength={50}
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nombre y apellido completo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="inline w-4 h-4 mr-1" />
            Empresa a pagar
          </label>
          <select
            name="empresaId"
            value={formData.empresaId}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Seleccione una empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.nombre} {/* Muestra solo el nombre limpio */}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Importe
          </label>
          <input
            type="number"
            name="importe"
            value={formData.importe}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
            inputMode="decimal"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-semibold"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Registrando...
            </div>
          ) : (
            'Confirmar Pago'
          )}
        </button>
      </form>
    </div>
  );
}