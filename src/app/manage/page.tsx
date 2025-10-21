'use client';
import React from 'react';
import * as GreetingUtil from '@/app/client-queries';
import { GreetingDocument } from '@/types/greeting';
import Link from 'next/link';

function refreshGreetings(onRefresh: (greetings: GreetingDocument[]) => void) {
  GreetingUtil.getGreetings().then(onRefresh);
}
function handleAddGreeting(onAdd?: () => void) {
  const newGreeting = prompt('Enter new greeting:');
  if (typeof newGreeting === 'string') {
    GreetingUtil.addGreeting(newGreeting).then(onAdd);
  }
}

function handleDeleteGreeting(id: string, onDelete?: () => void) {
  if (confirm('Are you sure you want to delete this greeting?')) {
    GreetingUtil.deleteGreeting(id).then(onDelete);
  }
}

function handleEditGreeting(greeting: GreetingDocument, onEdit?: () => void) {
  const newGreeting = prompt('Edit greeting:', greeting.greeting);
  if (newGreeting && newGreeting !== greeting.greeting) {
    GreetingUtil.updateGreeting(greeting._id, newGreeting).then(onEdit);
  }
}

export default function ManagePage() {
  const [greetings, setGreetings] = React.useState<GreetingDocument[]>([]);
  React.useEffect(() => {
    refreshGreetings(setGreetings);
  }, []);

  return (
    <div>
      <h1>Manage Greetings</h1>
      <div>
        <ul>
          {greetings.map((greet) => (
            <li
              // combine _id and greeting to ensure refresh after editing
              key={greet._id + greet.greeting}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input type="text" defaultValue={greet.greeting} readOnly />
              <button
                style={{ marginLeft: '8px' }}
                onClick={() =>
                  handleEditGreeting(greet, () =>
                    refreshGreetings(setGreetings)
                  )
                }
              >
                Edit
              </button>
              <button
                style={{ marginLeft: '8px' }}
                onClick={() =>
                  handleDeleteGreeting(greet._id, () =>
                    refreshGreetings(setGreetings)
                  )
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => handleAddGreeting(() => refreshGreetings(setGreetings))}
      >
        Add Greeting
      </button>
    </div>
  );
}
