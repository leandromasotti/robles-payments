import { Empresa, Pago, limpiarNombreEmpresa } from '@/types';

const SPREADSHEET_ID = '1ThgfHPMCgOAaobuhsyhFboRitIEWFvCDnw-oRR_VlD0';

// URLs para acceso CSV público de Google Sheets
const EMPRESAS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=0`;
const VENTAS_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1`;

export class GoogleSheetsService {
  private static parseCSV(csvText: string): string[][] {
    const lines = csvText.split('\n');
    return lines.map(line => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    }).filter(row => row.some(cell => cell.length > 0));
  }

  static async getEmpresas(): Promise<Empresa[]> {
    try {
      const response = await fetch(EMPRESAS_CSV_URL);
      const csvText = await response.text();
      console.log('CSV de empresas recibido:', csvText); // Debug
      const rows = this.parseCSV(csvText);
      
      // Asume que la primera fila son los headers
      const dataRows = rows.slice(1);
      
      return dataRows.map((row) => {
        const id = parseInt(row[0] || '0'); 
        const nombre = (row[1] || '').trim();
        const vigencia = (row[2] || '').toUpperCase().trim(); // Segunda columna para vigencia
       console.log('Procesando empresa:', { id, nombre, vigencia });
        return {
          id,
          nombre,
          vigencia,
          activa: vigencia === 'X' // Solo activa si tiene 'X'
        };
      })
      .filter(empresa => empresa.nombre.length > 0)
      .sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar alfabéticamente
    } catch (error) {
      console.error('Error fetching empresas:', error);
      // Fallback con datos de ejemplo
      return [
        { id: 1, nombre: 'Coca Cola', nombreCompleto: '1 - Coca Cola', vigencia: 'X', activa: true },
        { id: 2, nombre: 'Amazon', nombreCompleto: '2 - Amazon', vigencia: 'X', activa: true },
        { id: 3, nombre: 'Arcor', nombreCompleto: '3 - Arcor', vigencia: '', activa: false }
      ];
    }
  }

  // Método específico para obtener solo empresas activas (con vigencia X)
  static async getEmpresasActivas(): Promise<Empresa[]> {
    const todasLasEmpresas = await this.getEmpresas();
    return todasLasEmpresas.filter(empresa => empresa.activa);
  }

  static async getPagos(): Promise<Pago[]> {
    try {
      const response = await fetch(VENTAS_CSV_URL);
      const csvText = await response.text();
      const rows = this.parseCSV(csvText);
      
      // Asume que la primera fila son los headers
      const dataRows = rows.slice(1);
      
      return dataRows.map((row, index) => ({
        id: index + 1,
        empresaId: parseInt(row[0] || '0'),
        nombreCliente: row[1] || '',
        apellidoCliente: row[2] || '',
        importe: parseFloat(row[3] || '0'),
        metodoPago: row[4] || '',
        fechaPago: row[5] || '',
        empresaNombre: row[6] || ''
      })).filter(pago => pago.nombreCliente.length > 0);
    } catch (error) {
      console.error('Error fetching pagos:', error);
      return [];
    }
  }

  static async addPago(pago: Omit<Pago, 'id'>): Promise<boolean> {
    // Este método ya no se usa directamente desde las APIs
    // La lógica se movió a /api/pagos para evitar problemas de fetch server-to-server
    console.log('Pago para agregar (método deprecado):', pago);
    return true;
  }
}