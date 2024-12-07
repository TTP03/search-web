import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/songs/search?q=${query}`);
      setResults(response.data);
    } catch (err) {
      setError('Error fetching search results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Song Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs..."
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p>{error}</p>}

      <div>
        {results.length > 0 ? (
          <ul>
            {results.map((song, index) => (
              <li key={index}>
                <strong>{song._source.song}</strong> by {song._source.artists}
                <p>{song._source.lyrics}</p>
                <a href={song._source.link} target="_blank" rel="noopener noreferrer">Listen</a>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
