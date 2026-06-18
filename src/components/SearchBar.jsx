import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    onSearch(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <label htmlFor="city-search">
        Search for a city
      </label>
      <div className="search-form-group">
        <input
          id="city-search"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Tokyo, Paris, New York..."
        />
        <button type="submit">
          Search
        </button>
      </div>
    </form>
  );
}