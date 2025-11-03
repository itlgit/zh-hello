import { NextRequest, NextResponse } from 'next/server';
import * as GreetingUtil from '@/lib/greeting';
import { GreetingDocument } from '@/types/greeting';

// Type for Next.js App Router params
type RouteParams = {
  params: {
    action?: string[];
  };
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ action?: string[] | undefined }> }
) {
  const params = await context.params;
  const action = params.action?.[0];
  const id = params.action?.[1];

  if (action === 'delete' && id) {
    await GreetingUtil.deleteGreeting(id);
    return NextResponse.json({ success: true });
  }
  const greetings = await GreetingUtil.getGreetings();
  return NextResponse.json(greetings);
}

/**
 * Greetings CRUD
 * @param request
 * @param context
 * @returns
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action?: string[] | undefined }> }
) {
  // only single action supported
  const greeting = (await request.json()) as GreetingDocument;
  const params = await context.params;
  const action = params.action?.[0];

  if (!action) {
    return NextResponse.json(
      { success: false, message: 'Action is required' },
      { status: 400 }
    );
  }

  try {
    if (action === 'update') {
      await GreetingUtil.updateGreeting(
        greeting._id,
        Object.fromEntries(
          Object.entries(greeting).filter(([key]) => key !== '_id')
        ) as GreetingDocument
      );
    } else if (action === 'add') {
      await GreetingUtil.addGreeting(greeting);
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid action' },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
