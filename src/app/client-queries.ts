import { GreetingDocument, GreetingInput } from '@/types/greeting';

export async function getGreeting(): Promise<GreetingDocument> {
  const hourNow = new Date().getHours();
  const timeOfDay = hourNow < 12 ? 'morning' : hourNow < 18 ? 'afternoon' : 'evening';
  const response = await fetch('/api/greeting', {
    headers: {
      // send timeOfDay in header to retrieve time-specific greeting
      'X-Time-Of-Day': timeOfDay,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function getGreetings(): Promise<GreetingDocument[]> {
  const response = await fetch('/api/greetings');
  return response.json();
}

export async function addGreeting(greeting: GreetingInput): Promise<void> {
  await fetch('/api/greetings/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...greeting }),
  });
}

export async function updateGreeting(
  id: string,
  greeting: GreetingInput
): Promise<void> {
  await fetch('/api/greetings/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: id, ...greeting }),
  });
}

export async function deleteGreeting(id: string): Promise<void> {
  await fetch(`/api/greetings/delete/${id}`);
}
