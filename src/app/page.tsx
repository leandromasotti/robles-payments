import Navigation from '@/components/Navigation';
import FormularioPago from '@/components/FormularioPago';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="py-6 sm:py-12 flex-grow px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              Sistema de Pagos Banco Robles
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Registre los pagos de forma rápida y segura
            </p>
          </div>
          
          <div className="flex justify-center">
            <FormularioPago />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
