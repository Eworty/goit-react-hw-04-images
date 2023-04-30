import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Searchbar.css';

import { FaSearch } from 'react-icons/fa';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return;
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <FaSearch size="24" />
        </button>

        <input
          onChange={handleChange}
          value={search}
          name="search"
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
