import React from 'react';

const Title = ({ children }) => {
  return (
    <h2 className="text-2xl md:text-2xl mb-2 text-center font-semibold text-gray-900 tracking-wide">
      {children}
    </h2>
  );
}

export default Title;
