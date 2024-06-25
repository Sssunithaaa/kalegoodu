// src/components/HalfPageDiv.jsx
import React, { useState } from 'react';
import '../styles/HalfPageDiv.css'
const HalfPageDiv = ({ children, buttonLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    if (isOpen && !e.target.closest('.half-page-div')) {
      setIsOpen(false);
    }
  };

  return (
    <div className="half-page-container" onClick={handleClickOutside}>
      <button onClick={toggleDiv}>{buttonLabel}</button>
      {isOpen && (
        <div className="half-page-div">
          {children}
        </div>
      )}
    </div>
  );
};

export default HalfPageDiv;
