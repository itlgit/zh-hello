import { Greeting } from '@/types/greeting';

export async function getGreeting(): Promise<Greeting> {
  const response = await fetch('/api/greeting');
  if (response.ok) {
    return response.json();
  }
  throw new Error('Failed to fetch greeting');
}
