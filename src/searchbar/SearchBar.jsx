import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const SearchBar = ({ isSearchBarVisible, toggleSearchbar }) => {
  const items = [
    { id: 0, name: 'Cobol' },
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Basic' },
    { id: 3, name: 'PHP' },
    { id: 4, name: 'Java' }
  ];

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    );
  };
  if(!isSearchBarVisible){
    return null;
  }
 
  return (
    <div style={{ width: '50%', position: 'relative', zIndex: 1001,marginInline:'auto',marginBlock:'10px',borderRadius:'0px' }}>
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        styling={{ zIndex: 1001 }} // Ensure suggestions appear above other elements
      />
    </div>
  );
};

export default SearchBar;
