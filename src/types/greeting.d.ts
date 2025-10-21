import { Document } from 'mongodb';

export interface Greeting extends Document {
  greeting: string;
}

export interface GreetingDocument extends Document, Greeting {
  _id: string;
}
