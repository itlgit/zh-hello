import { GreetingDocument } from '@/types/greeting';

export async function getGreeting(): Promise<GreetingDocument> {
  const response = await fetch('/api/greeting');
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch greeting');
}

export async function getGreetings(): Promise<GreetingDocument[]> {
  const response = await fetch('/api/greetings');
  return response.json();
}

export async function addGreeting(message: string): Promise<void> {
  await fetch('/api/greetings/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
}

export async function updateGreeting(
  id: string,
  message: string
): Promise<void> {
  await fetch('/api/greetings/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: id, message }),
  });
}

export async function deleteGreeting(id: string): Promise<void> {
  await fetch(`/api/greetings/delete/${id}`);
}
