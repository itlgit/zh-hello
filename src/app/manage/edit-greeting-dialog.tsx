import React from 'react';
import { GreetingDocument, GreetingInput } from '@/types/greeting';

type Props = {
  onClose: () => void;
  onAdd: (greeting: GreetingInput) => void;
  onUpdate: (greeting: GreetingDocument) => void;
  greeting?: GreetingDocument;
};

export default function EditGreetingDialog({
  onClose,
  onAdd,
  onUpdate,
  greeting,
}: Props) {
  const action = greeting ? 'Edit' : 'Add';
  const [greetText, setGreetText] = React.useState(
    greeting ? greeting.message : ''
  );
  const [timeOfDay, setTimeOfDay] = React.useState<
    'morning' | 'afternoon' | 'evening' | 'all'
  >(greeting && greeting.timeOfDay ? greeting.timeOfDay : 'all');
  const ref = React.useRef<HTMLInputElement>(null);

  function handleSubmit() {
    action === 'Edit'
      ? onUpdate({
          _id: greeting!._id,
          message: greetText,
          timeOfDay,
        })
      : onAdd({ message: greetText, timeOfDay });
  }

  React.useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{action} Greeting</h2>
        <input
          type="text"
          value={greetText}
          placeholder="Greeting text"
          onChange={(e) => setGreetText(e.target.value)}
          ref={ref}
        />
        <p>
          <input
            type="radio"
            name="timeOfDay"
            value="morning"
            defaultChecked={timeOfDay === 'morning'}
            onChange={(e) => setTimeOfDay(e.target.value as 'morning')}
          />{' '}
          Morning
          <input
            type="radio"
            name="timeOfDay"
            value="afternoon"
            defaultChecked={timeOfDay === 'afternoon'}
            onChange={(e) => setTimeOfDay(e.target.value as 'afternoon')}
          />{' '}
          Afternoon
          <input
            type="radio"
            name="timeOfDay"
            value="evening"
            defaultChecked={timeOfDay === 'evening'}
            onChange={(e) => setTimeOfDay(e.target.value as 'evening')}
          />{' '}
          Evening
          <input
            type="radio"
            name="timeOfDay"
            value="all"
            defaultChecked={timeOfDay === 'all'}
            onChange={(e) => setTimeOfDay(e.target.value as 'all')}
          />{' '}
          All Day
        </p>
        <button
          onClick={handleSubmit}
        >
          {action === 'Edit' ? 'Save' : 'Add'}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
