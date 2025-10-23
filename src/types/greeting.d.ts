import { Document } from 'mongodb';

export interface Greeting extends Document {
  message: string;
}

export interface GreetingDocument extends Document, Greeting {
  _id: string;
}
