import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const pago = await request.json();
    console.log('Recibido pago para agregar a Google Sheets:', pago);
    
    // IMPLEMENTACIÓN TEMPORAL - Usar Google Apps Script Web App
    // Reemplaza esta URL con la URL de tu Google Apps Script Web App
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL || 'PENDING_CONFIGURATION';
    
    if (GOOGLE_APPS_SCRIPT_URL === 'PENDING_CONFIGURATION') {
      // Simular éxito mientras se configura
      console.log('⚠️  Configuración pendiente de Google Apps Script');
      console.log('📝 Datos del pago que se agregarían:', pago);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Pago registrado localmente (pendiente configuración Google Apps Script)',
        data: pago,
        note: 'Para escribir realmente en Google Sheets, configura Google Apps Script'
      });
    }
    
    // Intentar escribir a Google Sheets usando Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pago),
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Pago agregado exitosamente a Google Sheets:', result);
      return NextResponse.json({ 
        success: true, 
        message: 'Pago registrado en Google Sheets',
        data: result 
      });
    } else {
      const errorText = await response.text();
      console.error('❌ Error al agregar pago a Google Sheets:', errorText);
      return NextResponse.json(
        { error: 'Error writing to Google Sheets: ' + errorText },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error in POST /api/google-sheets/add-pago:', error);
    return NextResponse.json(
      { error: 'Error adding pago to Google Sheets: ' + error },
      { status: 500 }
    );
  }
}