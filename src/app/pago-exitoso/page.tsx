'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft, Building2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import PaymentSuccessIcon from '@/components/PaymentSuccessIcon';
import Footer from '@/components/Footer';

export default function PagoExitoso() {
  const router = useRouter();

  const volverAlInicio = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <div className="container mx-auto px-4 py-4 sm:py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Columna de texto */}
              <div className="bg-gradient-to-br from-green-600 to-blue-700 text-white p-6 sm:p-8 flex flex-col justify-center text-center">
                <div className="mb-4 sm:mb-6">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-200 mb-3 sm:mb-4" />
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    ¡Pago realizado con éxito!
                  </h1>
                </div>
                
                <div className="mb-6 sm:mb-8">
                  <p className="text-base sm:text-lg mb-4 leading-relaxed">
                    Esta plataforma de pagos fue desarrollada con fines educativos especialmente para la Expo Contable 
                    por estudiantes de la carrera Analista de Sistemas de Información del 
                    Instituto Superior Profesorado Francisco de Paula Robles.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={volverAlInicio}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-base sm:text-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Volver al Inicio
                  </button>
                </div>
              </div>
              
              {/* Columna de imagen - se oculta en móvil */}
              <div className="hidden lg:block bg-white p-8 flex items-center justify-center">
                <div className="text-center">
                  {/* Ícono animado personalizado */}
                  <div className="mb-6">
                    <PaymentSuccessIcon size={192} className="mx-auto" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Transacción Completada
                    </h3>
                    <p className="text-gray-600">
                      Su pago ha sido procesado correctamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Información adicional - simplificada para móvil */}
          <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Pago Confirmado</h4>
                <p className="text-xs sm:text-sm text-gray-600">Su transacción ha sido registrada</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Registro Actualizado</h4>
                <p className="text-xs sm:text-sm text-gray-600">Los datos se guardaron correctamente</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Estadísticas Actualizadas</h4>
                <p className="text-xs sm:text-sm text-gray-600">Puede revisar las ventas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}