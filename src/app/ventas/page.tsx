import Navigation from '@/components/Navigation';
import VentasPorEmpresa from '@/components/VentasPorEmpresa';
import Footer from '@/components/Footer';

export default function VentasPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="py-12 flex-grow">
        <VentasPorEmpresa />
      </main>
      <Footer />
    </div>
  );
}