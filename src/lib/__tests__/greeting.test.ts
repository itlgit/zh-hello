import { describe, expect, it } from '@jest/globals';
import type { Greeting } from '@/types/greeting';

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
        collection: (name: string) => {
          return {
            find: <T>() => {
              return {
                toArray: async (): Promise<T[]> =>
                  greetingsArray as unknown as T[],
              };
            },
          };
        },
      };
    },
  };
});

// Import the module being tested AFTER the mock
import { getGreeting } from '../greeting';

describe('getGreeting', () => {
  it('should return a greeting object with message property', async () => {
    const greeting = await getGreeting();
    expect(greetingsArray).toContainEqual(greeting);
  });
});
