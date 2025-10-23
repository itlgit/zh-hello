import { NextRequest, NextResponse } from 'next/server';
import { getGreeting } from '@/lib/greeting';

export async function GET(request: NextRequest) {
  const timeOfDay = request.headers.get('X-Time-Of-Day');
  const filter = timeOfDay ? { timeOfDay } : undefined;
  const greeting = await getGreeting(filter);
  if (greeting) {
    return NextResponse.json(greeting);
  } else {
    return new NextResponse('No greeting found', { status: 500 });
  }
}
