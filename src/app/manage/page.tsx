'use client';
import React from 'react';
import * as GreetingUtil from '@/app/client-queries';
import { GreetingDocument, GreetingInput } from '@/types/greeting';
import EditGreetingDialog from './edit-greeting-dialog';

function refreshGreetings(onRefresh: (greetings: GreetingDocument[]) => void) {
  GreetingUtil.getGreetings().then(onRefresh);
}

function handleDeleteGreeting(
  greeting: GreetingDocument,
  onDelete?: () => void
) {
  if (confirm(`Are you sure you want to delete '${greeting.greeting}?'`)) {
    GreetingUtil.deleteGreeting(greeting._id).then(onDelete);
  }
}

export default function ManagePage() {
  const [greetings, setGreetings] = React.useState<GreetingDocument[]>([]);
  const [currentGreeting, setCurrentGreeting] =
    React.useState<GreetingDocument | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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
                onClick={() => {
                  setCurrentGreeting(greet);
                  setIsDialogOpen(true);
                }}
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
        onClick={() => {
          setCurrentGreeting(null);
          setIsDialogOpen(true);
        }}
      >
        Add Greeting
      </button>

      {isDialogOpen && (
        <EditGreetingDialog
          onClose={() => setIsDialogOpen(false)}
          onAdd={async (greeting) => {
            await GreetingUtil.addGreeting(greeting);
            refreshGreetings(setGreetings);
            setIsDialogOpen(false);
          }}
          onUpdate={async (greeting) => {
            await GreetingUtil.updateGreeting(greeting._id, greeting);
            // update greeting list after edit without refresh
            setGreetings((prev) =>
              prev.map((g) =>
                g._id === greeting._id ? { ...g, greeting: greeting.greeting } : g
              )
            );
            setIsDialogOpen(false);
          }}
          greeting={currentGreeting || undefined}
        />
      )}
    </div>
  );
}
