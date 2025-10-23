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

function handleEditGreeting(greeting: GreetingDocument, onEdit?: (g: GreetingDocument) => void) {
  const newGreeting = prompt('Edit greeting:', greeting.message);
  if (newGreeting && newGreeting !== greeting.message) {
    GreetingUtil.updateGreeting(greeting._id, newGreeting).then(() => onEdit?.({ ...greeting, message: newGreeting }));
  }
}

export default function ManagePage() {
  const [greetings, setGreetings] = React.useState<GreetingDocument[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    refreshGreetings((data) => {
      setGreetings(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Manage Greetings</h1>
      <div>
        {isLoading && <p>Loading greetings...</p>}
        <ul>
          {greetings.map((greet) => (
            <li
              // combine _id and message to ensure refresh after editing
              key={greet._id + greet.message}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <input type="text" defaultValue={greet.message} readOnly />
              <button
                style={{ marginLeft: '8px' }}
                onClick={() =>
                  handleEditGreeting(greet, (edited) =>
                    // update greeting list after edit without refresh
                    setGreetings((prev) =>
                      prev.map((g) =>
                        g._id === greet._id ? { ...g, message: edited.message } : g
                      )
                    )
                  )
                }
              >
                Edit
              </button>
              <button
                style={{ marginLeft: '8px' }}
                onClick={() =>
                  handleDeleteGreeting(greet, () =>
                    // filter out deleted greeting without full refresh
                    setGreetings((prev) =>
                      prev.filter((g) => g._id !== greet._id)
                    )
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
