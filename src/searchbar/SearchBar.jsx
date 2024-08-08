import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { img1,img2,img3 } from '../assets/images';
import { useNavigate } from 'react-router-dom';
const SearchBar = ({ isSearchBarVisible, toggleSearchbar }) => {
  
    let items = [
    { id: 1, name: 'Product-1', price: 658, rating: 4, description: 'Description for Product 1', img: img1 },
    { id: 2, name: 'Product-2', price: 758, rating: 5, description: 'Description for Product 2', img: img2 },
    { id: 3, name: 'Product-3', price: 858, rating: 3, description: 'Description for Product 3', img: img3 },
   

  ];

  const handleOnSearch = (string, results) => {

  };

  const handleOnHover = (result) => {
   
  };
  const navigate = useNavigate()
  const handleOnSelect = (item) => {
   
    toggleSearchbar();
    navigate(`/product/${item.name}`)

  };

  const handleOnFocus = () => {

  };

  const formatResult = (item) => {
    return (
      <>
     <div className='flex flex-row gap-x-4'>
      <img src={item.img} alt={item.name} style={{ width: '50px'}}/>
      <div>
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>Rs. {item.price}</span>
      </div>
     </div>
      </>
    );
  };
  if(!isSearchBarVisible){
    return null;
  }
 
  return (
    <div className='md:top-24 top-0 w-[80%] md:w-[50%]' style={{ position: 'relative', zIndex: 49,marginInline:'auto',marginBlock:'10px',borderRadius:'0px' }}>
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
