import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SearchBox() {
  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value;
    // Add search logic here
    console.log(searchTerm)
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="Search-box">
      <input 
        type="search" 
        id="search-input" 
        placeholder="Search URL..." 
        onKeyPress={handleKeyPress} 
      />
      <FontAwesomeIcon icon={faSearch} size="2x" className='Search-icon' onClick={handleSearch}/>
    </div>
  );
}

export default SearchBox;