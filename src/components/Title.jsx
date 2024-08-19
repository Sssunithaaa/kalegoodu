import React from 'react';

const Title = ({ children ,font}) => {
  return (
    <h2 className={`heading ${font} text-xl md:text-2xl text-center font-bold  text-heading`}>
      {children}
    </h2>
  );
}

export default Title;
