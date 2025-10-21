import { Document } from 'mongodb';

export type GreetingInput = {
  message: string;
};

export type GreetingAction = {
  action: 'add' | 'update' | 'delete';
  greeting: GreetingDocument;
};

export interface Greeting extends Document, GreetingInput {}

export interface GreetingDocument extends Document, Greeting {
  _id: string;
}
