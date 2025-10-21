import { NextRequest, NextResponse } from 'next/server';
import { getGreeting } from '@/lib/greeting';

export async function GET(_request: NextRequest) {
  return NextResponse.json(await getGreeting());
}
