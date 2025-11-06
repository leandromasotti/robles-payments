# Configuración de Google Apps Script para Escribir en Google Sheets

## 🎯 Problema Actual
La aplicación puede **leer** datos de Google Sheets, pero **no puede escribir** datos directamente por limitaciones de seguridad de Google Sheets.

## ✅ Solución: Google Apps Script Web App

### Paso 1: Crear Google Apps Script

1. **Ir a Google Apps Script**
   - Visita: https://script.google.com
   - Haz clic en "Nuevo proyecto"

2. **Pegar el código**
   - Borra el código predeterminado
   - Copia y pega el código del archivo `google-apps-script.js`

3. **Guardar el proyecto**
   - Nombra el proyecto: "Robles Payment Writer"
   - Guarda (Ctrl+S)

### Paso 2: Configurar Permisos

1. **Autorizar el script**
   - Haz clic en "Ejecutar" (▶️)
   - Autoriza los permisos cuando se solicite
   - Acepta el acceso a Google Sheets

### Paso 3: Desplegar como Web App

1. **Crear despliegue**
   - Haz clic en "Desplegar" → "Nueva implementación"
   - Tipo: "Aplicación web"

2. **Configurar acceso**
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquier persona"
   - Haz clic en "Implementar"

3. **Copiar URL**
   - Copia la "URL de la aplicación web"
   - Ejemplo: `https://script.google.com/macros/s/ABC123.../exec`

### Paso 4: Configurar en Next.js

1. **Crear archivo .env.local**
   ```bash
   # En la raíz del proyecto
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
   ```

2. **Reemplazar TU_SCRIPT_ID** con tu ID real

### Paso 5: Probar la Configuración

1. **Reiniciar servidor Next.js**
   ```bash
   npm run dev
   ```

2. **Hacer un pago de prueba**
   - Ir a http://localhost:3000
   - Completar el formulario
   - Verificar en Google Sheets si se agregó la fila

## 🔍 Verificación

### En Google Sheets
Deberías ver nuevas filas en la hoja "Ventas" con esta estructura:
```
| A: empresaId | B: nombreCliente | C: apellidoCliente | D: importe | E: metodoPago | F: fechaPago | G: empresaNombre |
```

### En Console del Navegador
```
✅ Pago agregado exitosamente a Google Sheets: {...}
```

## 🚨 Solución de Problemas

### Error: "Script function not found"
- Verifica que el código esté guardado en Google Apps Script
- Asegúrate de que las funciones `doPost` y `doGet` existan

### Error: "Unauthorized"
- Ejecuta el script manualmente una vez para autorizar permisos
- Verifica que "Quién tiene acceso" esté en "Cualquier persona"

### Error: "Spreadsheet not found"
- Verifica que el SPREADSHEET_ID sea correcto
- Asegúrate de que tengas acceso de edición al spreadsheet

### Los datos no aparecen
- Verifica que la URL del Web App sea correcta
- Revisa los logs en Google Apps Script: "Executions"
- Confirma que la hoja de ventas sea la segunda hoja (índice 1)

## 🔄 Flujo Completo

1. **Usuario completa formulario** → Next.js
2. **Next.js envía datos** → Google Apps Script Web App
3. **Apps Script escribe datos** → Google Sheets
4. **Confirmación** → Usuario

## ⚡ Alternativa Rápida: Configurar Google Form

Si Google Apps Script es complejo, puedes usar Google Forms:

1. **Crear Google Form**
   - Conectado a tu Google Sheet
   - Campos: empresaId, nombreCliente, apellidoCliente, importe, metodoPago, fechaPago, empresaNombre

2. **Obtener IDs de entrada**
   - Inspeccionar formulario para obtener `entry.XXXXX` IDs

3. **Usar en la aplicación**
   - Enviar datos via POST al formulario
   - Más simple pero menos control

---

**Una vez configurado, los pagos se escribirán automáticamente en Google Sheets** ✅