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
        setFullGreeting(`${greet.greeting}, ${name}!`);
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
        <p>What's your name?</p>
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

      {fullGreeting && (
        <div>
          <h2>{fullGreeting}</h2>
        </div>
      )}
    </div>
  );
}
