import { Greeting, GreetingDocument } from "@/types/greeting";
import { connectToDatabase } from "./connection";

export async function getGreeting(): Promise<Greeting> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  const greetings = await greetingsCollection.find<GreetingDocument>({}).toArray();
  // select random index
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}
