import React, { useState } from 'react';


import { Box, TextField, InputAdornment } from '@mui/material';

import styled from 'styled-components';
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
const Sidebar = ({setSprice,setEprice,setKeyword,toggleSidebar,searchKeywordOnSubmitHandler,setPrice}) => {
  

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
    setPrice(true)
     if(window.innerWidth <= 768){
        toggleSidebar()
      }
  }


  return (
    <div className="flex flex-col z-40 p-4 w-64">
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
              <Button onClick={searchKeywordOnSubmitHandler} >Search</Button>

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
    <Button onClick={submitPriceInputChange}>Apply</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
