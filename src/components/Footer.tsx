'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-3">
            <p className="text-sm leading-relaxed">
              © 2025 Banco Robles - Sistema de Pagos desarrollado con fines educativos
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Estudiantes de Analista de Sistemas - Instituto Superior Profesorado Francisco de Paula Robles
            </p>
          </div>
          
          <div className="border-t border-gray-600 pt-3">
            <p className="text-xs text-gray-500">
              Proyecto académico para la Expo Contable
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}