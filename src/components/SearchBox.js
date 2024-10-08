import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBox() {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    // Add search logic here
    console.log(searchTerm)
  };

  return (
    <div className="Search-box">
      <input type="search" id="search-input" placeholder="Search URL..." />
      {/* <button id="search-button" onClick={handleSearch}>Search</button> */}
      <FontAwesomeIcon icon={faSearch} size="2x"className='Search-icon' onClick={handleSearch}/>
    </div>
  );
}

export default SearchBox;