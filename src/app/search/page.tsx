'use client';
import React from 'react';
import { Greeting } from '@/types/greeting';
import { getGreetings } from '../client-queries';

async function search(term: string, signal: AbortSignal): Promise<Greeting[]> {
  if (!term || term.length < 2) {
    return Promise.resolve([]);
  }
  if (signal.aborted) {
    console.log('* aborted');
    // throw new DOMException('Aborted', 'AbortError');
    return Promise.resolve([]);
  }
  signal.addEventListener('abort', () => {
    console.log('** aborted');
    throw new DOMException('Aborted', 'AbortError');
  });
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
  console.log(`> results for '${term}'`);
  const results = (await getGreetings()).filter(
    (r) => r.message.toLowerCase().indexOf(term.toLowerCase()) > -1
  );
  return results;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [searchResults, setSearchResults] = React.useState<Greeting[]>([]);
  const [isSearching, setIsSearching] = React.useState<Boolean>(false);
  const [controller, setController] = React.useState<AbortController | null>(
    null
  );
  const [lastUpdate, setLastUpdate] = React.useState<number>(0);

  async function onChange(newSearch: string) {
    setSearchTerm(newSearch);

    const now = performance.now();
    setLastUpdate(now);
    if (now - lastUpdate < 500) {
      console.log('.. queueing');
      return new Promise((resolve) =>
        setTimeout(() => resolve(performSearch(newSearch)), 500)
      );
    }
    performSearch(newSearch);
  }

  async function performSearch(newSearch: string) {
    if (controller !== null) {
      controller.abort();
    }
    const currentController = new AbortController();
    setController(currentController);
    try {
      setIsSearching(true);
      setSearchResults(await search(newSearch, currentController.signal));
      setIsSearching(false);
      setController(null);
    } catch {
      setSearchResults([]);
    }
  }

  return (
    <>
      <h2>Search</h2>
      <input
        name="search"
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Term"
      />
      <div>
        {searchResults.length > 0 && (
          <>
            <span>Results</span>
            <ul>
              {searchResults.map((r) => (
                <li key={r._id}>{r.message}</li>
              ))}
            </ul>
          </>
        )}
        {isSearching && <div>Searching...</div>}
      </div>
    </>
  );
}
