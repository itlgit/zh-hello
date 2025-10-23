import { Greeting, GreetingDocument, GreetingInput } from '@/types/greeting';
import { connectToDatabase } from './connection';
import { ObjectId } from 'mongodb';

export async function getGreeting(filter?: {
  timeOfDay?: string;
}): Promise<Greeting> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection('greetings');
  // if filter is provided, get all documents matching it or 'all' (or not-exists--legacy data)
  let query = {};
  if (filter?.timeOfDay) {
    query = {
      $or: [
        { timeOfDay: filter.timeOfDay },
        { timeOfDay: 'all' },
        { timeOfDay: { $exists: false } },
      ],
    };
  }
  const greetings = await greetingsCollection
    .find<GreetingDocument>(query)
    .toArray();
  // select random index
  const randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}

export async function getGreetings(): Promise<GreetingDocument[]> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection('greetings');
  return greetingsCollection.find<GreetingDocument>({}).toArray();
}

export async function addGreeting(
  greeting: GreetingInput
): Promise<GreetingDocument> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection('greetings');
  const result = await greetingsCollection.insertOne(greeting);
  return {
    _id: result.insertedId.toString(),
    ...greeting,
  };
}

export async function updateGreeting(
  id: string,
  greeting: GreetingDocument
): Promise<void> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection('greetings');
  await greetingsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { message: greeting.message, timeOfDay: greeting.timeOfDay } }
  );
}

export async function deleteGreeting(id: string): Promise<void> {
  const db = await connectToDatabase();
  const greetingsCollection = db.collection('greetings');
  await greetingsCollection.deleteOne({ _id: new ObjectId(id) });
}
