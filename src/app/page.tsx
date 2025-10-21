'use client';
import React from 'react';
import { getGreeting } from '@/app/client-queries';

export default function Home() {
  const [name, setName] = React.useState('');
  const [fullGreeting, setFullGreeting] = React.useState('');
  const ref = React.useRef<HTMLInputElement>(null);

  function handleSubmit() {
    if (name) {
      getGreeting().then((greet) => {
        setFullGreeting(`${greet.message}, ${name}!`);
      });
    } else {
      ref.current?.focus();
    }
  }

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Hello There! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            What&apos; your name?
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={ref}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg"
          >
            Say Hello! ✨
          </button>
        </div>

        {fullGreeting && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              {fullGreeting}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
