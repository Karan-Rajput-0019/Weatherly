import React, { useState } from 'react';
import weatherService from '../services/weatherService';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = async e => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const { data } = await weatherService.searchCities(value);
      setResults(data.data || []);
    } catch {
      setResults([]);
    }
  };

  const choose = city => {
    onSelect(city);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search city..."
        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
      />
      {results.length > 0 && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 shadow rounded-lg z-10 max-h-64 overflow-y-auto">
          {results.map((c, i) => (
            <button
              key={`${c.name}-${i}`}
              onClick={() => choose(c)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              {c.name}, {c.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
