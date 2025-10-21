import { Greeting } from '@/types/greeting';

export async function getGreeting(): Promise<Greeting> {
  const response = await fetch('/api/greeting');
  return response.json();
}
