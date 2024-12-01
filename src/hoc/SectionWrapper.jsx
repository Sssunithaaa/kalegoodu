import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';

const SectionWrapper = (Component, idName) => {
  return function HOC(props) {
    return (
      <motion.section
        id={idName}
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="my-0 p-0 relative z-0"
      >
        {/* Forward all received props to the wrapped component */}
        <Component {...props} />
      </motion.section>
    );
  };
};

export default SectionWrapper;
