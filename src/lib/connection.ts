import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
let client: MongoClient;

export async function connectToDatabase() {
  if (!client) {
    client = await new MongoClient(uri).connect();
  }
  return client.db('hellodb');
}
