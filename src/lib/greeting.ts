import { Greeting, GreetingDocument } from "@/types/greeting";
import { connectToDatabase } from "./connection";
import { ObjectId } from "mongodb";

export async function getGreeting(): Promise<Greeting> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  const greetings = await greetingsCollection.find<GreetingDocument>({}).toArray();
  // select random index
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}

export async function getGreetings(): Promise<GreetingDocument[]> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  return greetingsCollection.find<GreetingDocument>({}).toArray();
}

export async function addGreeting(greetingText: string): Promise<GreetingDocument> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  const result = await greetingsCollection.insertOne({ message: greetingText });
  return { _id: result.insertedId.toString(), message: greetingText };
}

export async function updateGreeting(id: string, greetingText: string): Promise<void> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  await greetingsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { message: greetingText } });
}

export async function deleteGreeting(id: string): Promise<void> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection("greetings");
  await greetingsCollection.deleteOne({ _id: new ObjectId(id) });
}
