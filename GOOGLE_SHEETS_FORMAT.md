# Formato de Datos para Google Sheets

## Hoja 1: Empresas (gid=0)

**Estructura esperada:**

| A (nombre) | B (vigencia) |
|------------|--------------|
| 1 - Coca Cola | X |
| 2 - Pepsi Co | X |
| 3 - Nestlé |  |
| 4 - Unilever | X |

**Campos:**
- **A (nombre)**: Nombre de la empresa con ID
- **B (vigencia)**: Colocar "X" para empresas activas, dejar vacío para inactivas

**Formatos soportados para nombres:**
- `1 - Empresa A` (recomendado)
- `1 Empresa A`
- `Empresa A (1)`

**Campo Vigencia:**
- `X` = Empresa activa (visible en formulario de pagos)
- `vacío` = Empresa inactiva (oculta del formulario)

## Hoja 2: Ventas (gid=1)

**Estructura esperada:**

| A (empresaId) | B (nombreCliente) | C (apellidoCliente) | D (importe) | E (metodoPago) | F (fechaPago) | G (empresaNombre) |
|---------------|-------------------|---------------------|-------------|----------------|---------------|-------------------|
| 1 | Juan | Pérez | 1500.50 | tarjeta | 2025-11-04 | Coca Cola |
| 2 | María | González | 2300.00 | efectivo | 2025-11-03 | Pepsi Co |
| 1 | Carlos | Martínez | 800.75 | tarjeta | 2025-11-02 | Coca Cola |

## Configuración de Google Sheets

1. **URL del spreadsheet**: https://docs.google.com/spreadsheets/d/1ThgfHPMCgOAaobuhsyhFboRitIEWFvCDnw-oRR_VlD0/edit

2. **Permisos**: Debe estar configurado como "Cualquiera con el enlace puede ver"

3. **URLs de acceso CSV**:
   - Empresas: `https://docs.google.com/spreadsheets/d/1ThgfHPMCgOAaobuhsyhFboRitIEWFvCDnw-oRR_VlD0/export?format=csv&gid=0`
   - Ventas: `https://docs.google.com/spreadsheets/d/1ThgfHPMCgOAaobuhsyhFboRitIEWFvCDnw-oRR_VlD0/export?format=csv&gid=1`

## Cómo la aplicación procesa los datos

### Empresas
- **Input**: `"1 - Coca Cola"` con vigencia `"X"`
- **Procesado**: 
  - `id: 1`
  - `nombre: "Coca Cola"`
  - `nombreCompleto: "1 - Coca Cola"`
  - `vigencia: "X"`
  - `activa: true`

### Control de Vigencia
- Solo empresas con `vigencia: "X"` aparecen en el formulario de pagos
- Empresas sin vigencia o con otros valores están ocultas
- Los cambios en Google Sheets se reflejan al recargar la página

### Ventas
- Los datos se leen directamente como están en la hoja
- El `empresaId` debe coincidir con el ID extraído del nombre de empresa
- La aplicación automáticamente agrupa y calcula totales

## Verificación de datos

La aplicación incluye logs de depuración. Para verificar que los datos se cargan correctamente:

1. Abrir DevTools (F12)
2. Ir a la pestaña Console
3. Los logs mostrarán cómo se procesan las empresas

**Ejemplo de log esperado:**
```
Empresas cargadas: [
  { id: 1, nombre: "Coca Cola", nombreCompleto: "1 - Coca Cola" },
  { id: 2, nombre: "Pepsi Co", nombreCompleto: "2 - Pepsi Co" }
]
```