import { connectToDatabase } from "./connection";

export async function getGreeting() {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  const greetings = await greetingsCollection.find().toArray();
  // select random index
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex].greeting;
}
