import { NextResponse } from 'next/server';
import { GoogleSheetsService } from '@/lib/googleSheets';

export async function GET() {
  try {
    const empresasActivas = await GoogleSheetsService.getEmpresasActivas();
    return NextResponse.json(empresasActivas);
  } catch (error) {
    console.error('Error in GET /api/empresas/activas:', error);
    return NextResponse.json(
      { error: 'Error fetching empresas activas' },
      { status: 500 }
    );
  }
}