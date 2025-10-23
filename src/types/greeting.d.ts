import { Document } from 'mongodb';

export type GreetingInput = {
  message: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'all';
};

export interface Greeting extends Document, GreetingInput {}

export interface GreetingDocument extends Document, Greeting {
  _id: string;
}
