'use client';
import React from 'react';
import * as GreetingUtil from '@/app/client-queries';
import { GreetingDocument } from '@/types/greeting';

function refreshGreetings(onRefresh: (greetings: GreetingDocument[]) => void) {
  GreetingUtil.getGreetings().then(onRefresh);
}
function handleAddGreeting(onAdd?: () => void) {
  const newGreeting = prompt('Enter new greeting:');
  if (newGreeting) {
    GreetingUtil.addGreeting(newGreeting).then(onAdd);
  }
}

function handleDeleteGreeting(greeting: GreetingDocument, onDelete?: () => void) {
  if (confirm(`Are you sure you want to delete '${greeting.greeting}?'`)) {
    GreetingUtil.deleteGreeting(greeting._id).then(onDelete);
  }
}

function handleEditGreeting(greeting: GreetingDocument, onEdit?: () => void) {
  const newGreeting = prompt('Edit greeting:', greeting.message);
  if (newGreeting && newGreeting !== greeting.message) {
    GreetingUtil.updateGreeting(greeting._id, newGreeting).then(onEdit);
  }
}

export default function ManagePage() {
  const [greetings, setGreetings] = React.useState<GreetingDocument[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    refreshGreetings(setGreetings);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <h1>Manage Greetings</h1>
      <div>
        {isLoading && <p>Loading greetings...</p>}
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
                  handleDeleteGreeting(greet, () =>
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
