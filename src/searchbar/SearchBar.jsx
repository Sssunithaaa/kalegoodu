import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/index/products';
const SearchBar = ({ isSearchBarVisible, toggleSearchbar }) => {
   const baseUrl = import.meta.env.VITE_APP_URL
   const {data=[],isLoading,isFetching}=useQuery({
    queryKey:["products"],
    queryFn: getAllProducts
   }) 

  const handleOnSearch = (string, results) => {

  };

  const handleOnHover = (result) => {
   
  };
  const navigate = useNavigate()
  const handleOnSelect = (item) => {
   
    toggleSearchbar();
    const url = item?.name.replaceAll(" ","-")
    navigate(`/Products/${item.product_id}/${url}`)

  };

  const handleOnFocus = () => {

  };

  const formatResult = (item) => {
    return (
      <>
     <div className='flex flex-row z-[1000] h-[100%] gap-x-4'>
      <img src={"https://res.cloudinary.com/dgkgxokru/"+item?.images?.[0]?.image} alt={item.name} style={{ width: '50px',height:'50px'}}/>
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
    <div className=' top-0 w-[80%] z-[1000001] md:w-[50%]' style={{ position: 'relative',marginInline:'auto',marginBlock:'10px',borderRadius:'0px' }}>
   <ReactSearchAutocomplete
        items={data}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        maxResults={5} // Limit the number of suggestions displayed
        styling={{
          zIndex: 1001,
          // Optional: Limit height for scrollable suggestions
          overflowY: 'auto', // Enable scroll for suggestions
        }}
      />
    </div>
  );
};

export default SearchBar;
