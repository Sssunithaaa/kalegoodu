import React, { useEffect, useState } from 'react';
import { ChevronDown,ChevronUp } from 'lucide-react';

import { Box, TextField, InputAdornment } from '@mui/material';

import styled from 'styled-components';
import { Transition } from '@headlessui/react';
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
// const ToggleButton = styled.button`
//   width: 100%;
//   height: 45px;
//   background-color: #4a5568;
//   color: white;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   margin-bottom: 10px;
//   &:hover {
//     background-color: #2d3748;
//   }
// `;

const Sidebar = ({priceRange,setPriceRange ,setSprice, setEprice,availability,setAvailability, handlePriceChange, location }) => {
  const [showPriceFilter, setShowPriceFilter] = useState(false);
    const [showAvailabilityFilter, setShowAvailabilityFilter] = useState(false);

const handleAvailabilityChange = (e) => {
  setAvailability({
    ...availability,
    [e.target.name]: e.target.checked,
  });
};

const handlePriceInputChange = (e, index) => {
  const value = parseInt(e.target.value, 10) || null;
  setPriceRange((prev) => {
    const newRange = [...prev];
    newRange[index] = value;
    return newRange;
  });

};

  const submitPriceInputChange = () => {
    setSprice(priceRange[0]);
    setEprice(priceRange[1]);
    // handlePriceChange(priceRange[0], priceRange[1]);
  };

  useEffect(() => {
    setSprice(0);
    setEprice(null);
  }, [location]);

  return (
    <div className="flex flex-col z-40 p-3 w-60">
      <span style={{fontFamily: "Poppins,sans-serif"}} className="text-sm md:text-md mb-2 font-medium">FILTERS</span>
      <div className='border-b-2 border-gray-300 h-1'/>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowPriceFilter(!showPriceFilter)}>
        <h3 className="text-lg text-[#1D1D1D] font-semibold my-2">Price</h3>
        {showPriceFilter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      <div className='border-b-2 border-gray-300 h-1'/>
            <Transition
        show={showPriceFilter}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mb-4">
          <Box display="flex" flexDirection="column" mt={2}>
  <TextField
    type="text"
    placeholder="From"
    size='small'
    value={priceRange[0] || ''}
    onChange={(e) => handlePriceInputChange(e, 0)}
    variant="outlined"
    // InputProps={{
    //   startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    // }}
    inputProps={{
      inputMode: "numeric",
      pattern: "\\d*",
      min: 0,
      max: priceRange[1] || 1000,
      style: { appearance: "textfield" } // Removes the number input spinner
    }}
    className="mb-2"
    fullWidth
  />
  <TextField
    type="text"
    placeholder="To"
    value={priceRange[1] || ''}
    size='small'
    onChange={(e) => handlePriceInputChange(e, 1)}
    variant="outlined"
    // InputProps={{
    //   startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    // }}
    inputProps={{
      inputMode: "numeric",
      pattern: "\\d*",
      min: priceRange[0] || 0,
      max: 10000,
      style: { appearance: "textfield" } // Removes the number input spinner
    }}
    sx={{ ":-ms-input-placeholder":{fontWeight:500} }}
    fullWidth
  />
</Box>

          <Button onClick={submitPriceInputChange}>Apply</Button> 
        </div>
      </Transition>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowAvailabilityFilter(!showAvailabilityFilter)}>
  <h3 className="text-lg text-[#1D1D1D] font-semibold my-2">Availability</h3>
  {showAvailabilityFilter ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
</div>
<div className='border-b-2 border-gray-300 h-1' />

<Transition
  show={showAvailabilityFilter}
  enter="transition-opacity duration-200"
  enterFrom="opacity-0"
  enterTo="opacity-100"
  leave="transition-opacity duration-200"
  leaveFrom="opacity-100"
  leaveTo="opacity-0"
>
  <div className="flex flex-col gap-2 mt-2">
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="inStock"
        checked={availability.inStock}
        onChange={handleAvailabilityChange}
        className="w-4 h-4"
      />
      <span>In Stock</span>
    </label>
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="outOfStock"
        checked={availability.outOfStock}
        onChange={handleAvailabilityChange}
        className="w-4 h-4"
      />
      <span>Out of Stock</span>
    </label>
  </div>
</Transition>

    </div>
  );
};

export default Sidebar;
