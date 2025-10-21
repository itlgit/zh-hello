export async function getGreeting(): Promise<string> {
  const response = await fetch('/api/greeting');
  const data = await response.json();
  return data.greeting;
}
