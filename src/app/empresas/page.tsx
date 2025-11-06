import Navigation from '@/components/Navigation';
import EstadoEmpresas from '@/components/EstadoEmpresas';
import Footer from '@/components/Footer';

export default function GestionEmpresasPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="py-12 flex-grow">
        <EstadoEmpresas />
      </main>
      <Footer />
    </div>
  );
}