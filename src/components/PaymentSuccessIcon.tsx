import { CheckCircle } from 'lucide-react';

interface PaymentSuccessIconProps {
  size?: number;
  className?: string;
}

export default function PaymentSuccessIcon({ size = 200, className = "" }: PaymentSuccessIconProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Círculo de fondo con gradiente */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
        }}
      >
        {/* Ícono de check principal */}
        <CheckCircle 
          size={size * 0.4} 
          className="text-white drop-shadow-lg" 
          strokeWidth={3}
        />
      </div>
      
      {/* Efectos decorativos animados */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full animate-pulse shadow-lg flex items-center justify-center">
        <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </div>
      
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce shadow-lg flex items-center justify-center">
        <div className="w-2 h-2 bg-green-800 rounded-full"></div>
      </div>
      
      <div className="absolute top-1/4 -right-6 w-4 h-4 bg-blue-300 rounded-full animate-ping"></div>
      
      {/* Anillo exterior con rotación */}
      <div 
        className="absolute -inset-4 border-4 border-dashed border-gray-300 rounded-full animate-spin opacity-20"
        style={{ animationDuration: '20s' }}
      ></div>
      
      {/* Anillo interior con rotación contraria */}
      <div 
        className="absolute -inset-2 border-2 border-dotted border-blue-200 rounded-full animate-spin opacity-30"
        style={{ animationDuration: '15s', animationDirection: 'reverse' }}
      ></div>
    </div>
  );
}