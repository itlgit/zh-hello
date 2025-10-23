import { GreetingDocument } from '@/types/greeting';

export async function getGreeting(): Promise<GreetingDocument> {
  const response = await fetch('/api/greeting');
  return response.json();
}

export async function getGreetings(): Promise<GreetingDocument[]> {
  const response = await fetch('/api/greetings');
  return response.json();
}

export async function addGreeting(greeting: string): Promise<void> {
  await fetch('/api/greetings/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ greeting }),
  });
}

export async function updateGreeting(
  id: string,
  greeting: string
): Promise<void> {
  await fetch('/api/greetings/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: id, greeting }),
  });
}

export async function deleteGreeting(id: string): Promise<void> {
  await fetch(`/api/greetings/delete/${id}`);
}
