import React from 'react';

const Title = ({ children }) => {
  return (
    <h2 className="heading text-2xl md:text-lg mb-2 text-center font-bold uppercase text-heading">
      {children}
    </h2>
  );
}

export default Title;
