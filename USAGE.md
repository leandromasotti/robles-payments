# Instrucciones de Uso - Sistema de Pagos Banco Robles

## 🚀 Inicio Rápido

El proyecto está **completamente funcional** y ejecutándose en:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## 📋 Características Implementadas

### ✅ Funcionalidades Completadas:

1. **Formulario de Registro de Pagos**
   - Campos validados (nombre, apellido, empresa, importe, método de pago, fecha)
   - Conexión a Google Sheets para obtener lista de empresas
   - Guardado de pagos en Supabase

2. **Dashboard de Ventas por Empresa**
   - Vista de resumen con totales generales
   - Agrupación de ventas por empresa
   - Filtrado por empresa específica
   - Tabla detallada de transacciones desde Supabase

3. **Navegación**
   - Barra de navegación funcional
   - Rutas: `/` (registro), `/ventas` (dashboard), `/empresas` (gestión)

4. **Gestión de Empresas**
   - Control de vigencia desde Google Sheets
   - Solo empresas activas (vigencia = "X") visibles en formularios
   - Panel de administración para ver estado de todas las empresas

5. **Arquitectura Híbrida**
   - **Empresas**: Lectura desde Google Sheets
   - **Ventas**: Escritura y lectura desde Supabase
   - **Dashboard**: Combinación de ambas fuentes

6. **API REST**
   - `GET /api/empresas` - Lista completa de empresas (Google Sheets)
   - `GET /api/empresas/activas` - Solo empresas activas (Google Sheets)
   - `GET /api/pagos` - Lista de ventas (Supabase)
   - `POST /api/pagos` - Crear nueva venta (Supabase)
   - `GET /api/ventas/estadisticas` - Estadísticas de ventas (Supabase)

6. **Integración con Google Sheets**
   - Lectura de empresas y control de vigencia
   - Estructura CSV para acceso público
   - Fallback con datos de ejemplo

7. **Base de Datos Supabase**
   - Tabla Ventas para almacenar transacciones
   - API REST automática
   - Estadísticas y agregaciones en tiempo real

## 🎯 Cómo Usar la Aplicación

### Registro de Pagos (Página Principal)
1. Abrir http://localhost:3000
2. Completar el formulario:
   - Nombre y apellido del cliente
   - Seleccionar empresa (cargada desde Google Sheets)
   - Ingresar importe
   - Seleccionar método de pago
   - Confirmar fecha
3. Hacer clic en "Confirmar Pago"

### Ver Ventas por Empresa
1. Navegar a http://localhost:3000/ventas
2. Ver resumen general en las tarjetas superiores
3. Filtrar por empresa específica
4. Revisar tabla detallada de transacciones

### Gestionar Estado de Empresas
1. Navegar a http://localhost:3000/empresas
2. Ver empresas activas e inactivas
3. Para activar/desactivar: editar columna B (Vigencia) en Google Sheets
4. Colocar "X" para activar, dejar vacío para desactivar

## 📊 Estructura de Datos

### Google Sheets (Solo Lectura - Empresas)

### Hoja 1: Empresas
```
| A: nombre      | B: vigencia |
|----------------|-------------|
| 1 - Empresa A  | X           |
| 2 - Empresa B  | X           |
| 3 - Empresa C  |             |
```

### Supabase (Lectura/Escritura - Ventas)

### Tabla Ventas
```
| id | created_at | nombre_empresa | nombre_cliente | importe |
|----|------------|----------------|----------------|---------|
| 1  | 2025-11-06 | Empresa A      | Juan Pérez     | 1500.00 |
| 2  | 2025-11-06 | Empresa B      | María García   | 2300.00 |
```

## 🔧 Comandos Útiles

```bash
# Iniciar desarrollo
npm run dev

# Compilar proyecto
npm run build

# Ejecutar en producción
npm start

# Verificar linting
npm run lint
```

## 🎨 Tecnologías Utilizadas

- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **Google Sheets** como base de datos

## 📱 Diseño Responsive

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📊 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🔄 Estado Actual

✅ **Proyecto Completamente Funcional**
- Servidor ejecutándose en http://localhost:3000
- Todos los componentes implementados
- APIs funcionando correctamente
- Navegación completa
- Integración con Google Sheets configurada

## � Solución de Problemas

### Error: "Failed to parse URL"
Si ves este error al registrar pagos:
```
Error adding pago: TypeError: Failed to parse URL from /api/google-sheets/add-pago
```

**Solución:** El error está resuelto. La aplicación ahora maneja correctamente las URLs.

### Pagos no se escriben en Google Sheets
**Estado actual:** Los pagos se registran localmente hasta configurar Google Apps Script.

**Para activar escritura real:**
1. Seguir instrucciones en `GOOGLE_APPS_SCRIPT_SETUP.md`
2. Configurar variable de entorno `GOOGLE_APPS_SCRIPT_URL`
3. Reiniciar servidor: `npm run dev`

---

**¡La aplicación está lista para usar!** 🎉