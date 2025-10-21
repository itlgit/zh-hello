export async function getGreeting() {
  const response = await fetch('/api/greeting');
  const data = await response.json();
  return data.message;
}
