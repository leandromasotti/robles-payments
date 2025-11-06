// GOOGLE APPS SCRIPT - Código para Google Apps Script
// Copia este código en script.google.com para crear un Web App

function doPost(e) {
  try {
    // ID de tu Google Spreadsheet
    const SPREADSHEET_ID = '1ThgfHPMCgOAaobuhsyhFboRitIEWFvCDnw-oRR_VlD0';
    
    // Obtener datos del POST
    const postData = JSON.parse(e.postData.contents);
    
    // Abrir el spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Obtener la hoja de ventas (segunda hoja, índice 1)
    const ventasSheet = spreadsheet.getSheets()[1];
    
    // Preparar los datos para agregar
    const newRow = [
      postData.empresaId,
      postData.nombreCliente,
      postData.apellidoCliente,
      postData.importe,
      postData.metodoPago,
      postData.fechaPago,
      postData.empresaNombre
    ];
    
    // Agregar la nueva fila
    ventasSheet.appendRow(newRow);
    
    // Respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Pago agregado exitosamente',
        data: postData
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Respuesta de error
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Web App funcionando. Usar POST para agregar datos.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// INSTRUCCIONES PARA CONFIGURAR:
// 1. Ir a script.google.com
// 2. Crear nuevo proyecto
// 3. Pegar este código
// 4. Guardar el proyecto
// 5. Desplegar como Web App:
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copiar la URL del Web App
// https://script.google.com/macros/s/AKfycbw8No4V1LfilsaCDwY6xEF5T7KlUjag94W5joohGMLcWLzCcUygIDnvS7s0WaFBItAn/exec
// Id de implementación: AKfycbw8No4V1LfilsaCDwY6xEF5T7KlUjag94W5joohGMLcWLzCcUygIDnvS7s0WaFBItAn
// 7. Reemplazar en la aplicación Next.js