'use client';
import React from 'react';
import { getGreeting } from '@/app/client-queries';
import Link from 'next/link';

export default function Home() {
  const [name, setName] = React.useState('');
  const [fullGreeting, setFullGreeting] = React.useState('');
  const ref = React.useRef<HTMLInputElement>(null);

  function handleSubmit() {
    if (name) {
      getGreeting()
        .then((greet) => {
          setFullGreeting(`${greet.message}, ${name}!`);
        })
        .catch((error) => {
          console.error('Error fetching greeting:', error);
          setFullGreeting(`NO GREETING, ${name}!`);
        });
    } else {
      ref.current?.focus();
    }
  }

  React.useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div>
      <div>
        <h1>Hello There! 👋</h1>
        <p>What&apos; your name?</p>
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={ref}
          />
        </div>

        <button onClick={handleSubmit}>Say Hello! ✨</button>
      </div>

      <div>
        {fullGreeting && <h2>{fullGreeting}</h2>}
        <Link href="/manage">Manage Greetings</Link>
        <Link href="/search">Search Greetings</Link>
      </div>
    </div>
  );
}
