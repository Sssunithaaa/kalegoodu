import React, { useState } from 'react';


import { Box, TextField, InputAdornment } from '@mui/material';
import { Button } from '@material-tailwind/react';
const Sidebar = ({setSprice,setEprice,setKeyword,searchKeywordOnSubmitHandler}) => {
  

  const [priceRange, setPriceRange] = useState([0, 100]);

 

 

  const handlePriceInputChange = (e, index) => {
    const value = parseInt(e.target.value, 10);
    setPriceRange((prev) => {
      const newRange = [...prev];
      newRange[index] = value;
      
      return newRange;
    });
  };
  const submitPriceInputChange = ()=> {
    setSprice(priceRange[0]);
    setEprice(priceRange[1])
  }

  return (
    <div className="flex flex-col z-[20] p-4 w-64">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Filter</h3>
        <div className="mb-4">
          
          <div className="relative mt-1">
            <input
              type="text"
              id="search"
              onChange={(e)=>setKeyword(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-6 w-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 105.293 14.293l4.388 4.387a1 1 0 001.415-1.415l-4.388-4.387A8 8 0 0010 2zm-6 8a6 6 0 1112 0 6 6 0 01-12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
              <Button onClick={searchKeywordOnSubmitHandler} className='my-2 text-md py-2 flex mx-auto'>Apply</Button>

        </div>

        

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Price Range:</h3>
         
           <Box display="flex" flexDirection="column" mt={2}>
      <TextField
        type="number"
        label="From"
        value={priceRange[0]}
        onChange={(e) => handlePriceInputChange(e, 0)}
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        inputProps={{
          min: 0,
          max: priceRange[1],
        }}
        className="mb-2"
        fullWidth
      />
      <TextField
        type="number"
        label="To"
        value={priceRange[1]}
        onChange={(e) => handlePriceInputChange(e, 1)}
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
        inputProps={{
          min: priceRange[0],
          max: 100,
        }}
        fullWidth
      />
    </Box>
    <Button onClick={submitPriceInputChange} className='my-4 text-md py-2 flex mx-auto'>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
