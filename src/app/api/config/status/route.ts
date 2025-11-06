import { NextResponse } from 'next/server';

export async function GET() {
  const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  
  const status = {
    googleAppsScriptConfigured: googleAppsScriptUrl && googleAppsScriptUrl !== 'PENDING_CONFIGURATION',
    googleAppsScriptUrl: googleAppsScriptUrl || 'Not configured',
    canWriteToSheets: googleAppsScriptUrl && googleAppsScriptUrl !== 'PENDING_CONFIGURATION',
    instructions: 'See GOOGLE_APPS_SCRIPT_SETUP.md for configuration steps'
  };
  
  return NextResponse.json(status);
}