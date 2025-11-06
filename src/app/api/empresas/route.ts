import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/googleSheets';

export async function GET() {
  try {
    const empresas = await GoogleSheetsService.getEmpresas();
    return NextResponse.json(empresas);
  } catch (error) {
    console.error('Error in GET /api/empresas:', error);
    return NextResponse.json(
      { error: 'Error fetching empresas' },
      { status: 500 }
    );
  }
}