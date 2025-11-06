# 🔧 Solución del Error de Supabase

## ❌ Error Identificado
```
new row violates row-level security policy for table "Ventas"
```

## 🔍 Diagnóstico
- ✅ Conexión a Supabase: Funciona
- ✅ Credenciales: Configuradas correctamente  
- ✅ Tabla "Ventas": Existe
- ❌ Row Level Security: Bloqueando inserciones

## 🛠️ Solución

### Opción 1: Deshabilitar RLS (Más Simple)
```sql
-- En el SQL Editor de Supabase
ALTER TABLE "Ventas" DISABLE ROW LEVEL SECURITY;
```

### Opción 2: Configurar Políticas RLS (Más Seguro)
```sql
-- Habilitar RLS
ALTER TABLE "Ventas" ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT para usuarios anónimos
CREATE POLICY "Allow anonymous insert" ON "Ventas"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permitir SELECT para usuarios anónimos  
CREATE POLICY "Allow anonymous select" ON "Ventas"
  FOR SELECT
  TO anon
  USING (true);
```

### Opción 3: Recrear Tabla Sin RLS
```sql
-- Eliminar tabla actual
DROP TABLE IF EXISTS "Ventas";

-- Crear nueva tabla sin RLS
CREATE TABLE "Ventas" (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  nombre_empresa TEXT NOT NULL,
  nombre_cliente TEXT NOT NULL,
  importe DECIMAL(10,2) NOT NULL
);

-- Asegurar que RLS esté deshabilitado
ALTER TABLE "Ventas" DISABLE ROW LEVEL SECURITY;
```

## 📋 Pasos para Aplicar la Solución

1. **Ir a Supabase Dashboard**: https://supabase.com/dashboard
2. **Seleccionar tu proyecto**: oymqyoynzovvlxwbtaci
3. **Ir a SQL Editor**
4. **Ejecutar una de las opciones de arriba**
5. **Probar el registro de pagos nuevamente**

## 🧪 Verificación
Después de aplicar la solución, verifica que funcione:
- Ir a http://localhost:3000
- Llenar el formulario de pago
- Los logs deberían mostrar: `✅ Venta agregada exitosamente a Supabase`

## 🔄 Logs Mejorados
Ya agregamos logs detallados que muestran:
- 📤 Datos enviados desde el frontend
- 🔄 Transformación de datos en la API
- 💾 Proceso de inserción en Supabase
- ✅/❌ Resultado de la operación

¡El problema está identificado y la solución es aplicar una de las opciones SQL en Supabase!