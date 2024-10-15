import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../style'
import { staggerContainer } from '../utils/motion'
const SectionWrapper = (Component,idName) =>function HOC() {
  return (
    <motion.section variants={staggerContainer()} initial="hidden" whileInView="show" viewport={{once:true,amount:0.25}} className={`my-0 p-0 relative z-0`}>
    
      <Component/>
    </motion.section>
  )
}

export default SectionWrapper