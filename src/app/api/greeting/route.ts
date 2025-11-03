import { NextResponse } from 'next/server';
import { getGreeting } from '@/lib/greeting';

export async function GET() {
  const greeting = await getGreeting();
  if (greeting)
    return NextResponse.json(greeting);
  else
    // return error response
    return new NextResponse('No greeting found', { status: 500 });
}
