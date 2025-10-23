import { NextRequest, NextResponse } from 'next/server';
import { getGreeting } from '@/lib/greeting';

export async function GET(request: NextRequest) {
  const timeOfDay = request.headers.get('X-Time-Of-Day');
  const filter = timeOfDay ? { timeOfDay } : undefined;
  return NextResponse.json(await getGreeting(filter));
}
