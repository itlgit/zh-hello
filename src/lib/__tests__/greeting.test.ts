import { describe, expect, it } from '@jest/globals';
import type { Greeting, GreetingInput } from '@/types/greeting';

const greetingsArray: Greeting[] = [
  { message: 'Hello' },
  { message: 'Hi' },
  { message: 'Greetings' },
];

// Mock must be at the top level, before any imports of the mocked module
jest.mock('../connection', () => {
  return {
    connectToDatabase: async () => {
      return {
        collection: () => {
          return {
            find: <T>() => {
              return {
                toArray: async (): Promise<T[]> =>
                  greetingsArray as unknown as T[],
              };
            },
            insertOne: async (doc: GreetingInput) => {
              return {
                insertedId: 'mocked_id_123',
              };
            },
            updateOne: async (
              filter: { _id: any },
              update: { $set: GreetingInput }
            ) => {
              // Mock update operation (no-op)
            },
            deleteOne: async (filter: { _id: any }) => {
              // Mock delete operation (no-op)
            },
          };
        },
      };
    },
  };
});

// Import the module being tested AFTER the mock
import * as GreetingUtil from '../greeting';

describe('getGreeting', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  it('getGreeting() should return a greeting object with message property', async () => {
    const greeting = await GreetingUtil.getGreeting();
    expect(greetingsArray).toContainEqual(greeting);
  });

  it('getGreetings() should return all greetings', async () => {
    const greetings = await GreetingUtil.getGreetings();
    expect(greetingsArray).toEqual(greetings);
  });

  it('addGreeting() should add a new greeting', async () => {
    const newGreetingText = 'Salutations';
    const newGreeting = await GreetingUtil.addGreeting(newGreetingText);
    expect(newGreeting._id).toBe('mocked_id_123');
    expect(newGreeting.message).toBe(newGreetingText);
  });
});
