import React from 'react';
import { ClipLoader } from 'react-spinners';

const FullPageLoader = () => {
  return (
    <div style={styles.loaderContainer}>
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1000,
  },
};

export default FullPageLoader;
