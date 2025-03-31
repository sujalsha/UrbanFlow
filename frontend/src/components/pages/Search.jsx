// src/components/pages/Search.jsx
import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import '../../assets/styles/colors.css';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="search-container">
      <Sidebar />
      <main>
        <h1>Find Your Route</h1>
        <form onSubmit={handleSearch}>
          <input 
            type="text"
            placeholder="Enter your destination"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </main>
    </div>
  );
};

export default Search;
