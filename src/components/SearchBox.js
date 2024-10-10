import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: 'https://similarweb-data1.p.rapidapi.com/v3/top-apps/',
    params: {
      store: 'apple',
      mode: 'top-free',
      device: 'iphone'
    },
    headers: {
      'x-rapidapi-key': '57ff46dc1emshe1ad379bcfc2d9fp1173d3jsn7af5b4f54fa1',
      'x-rapidapi-host': 'similarweb-data1.p.rapidapi.com'
    }
  };

 const handleSearch = async (e) => {
   e.preventDefault();
   try {
    const response = await axios.request(options);
    console.log('API Response Data:', response.data);
    setData(response.data);
    } catch (error) {
    console.error('API Request Failed:', error);
    setError(error.message);
   //     // You can also display a friendly error message to the user here
     }
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} size="2x" className='Search-icon' onClick={handleSearch}/>
      {data && <div>Data: {JSON.stringify(data)}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

export default SearchBox;