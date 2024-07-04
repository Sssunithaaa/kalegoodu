import React from 'react'
import Navbar from '../Navbar'
import CTA from '../CTA'
const MainLayout = ({children}) => {
  return (
    <div>
        <Navbar />
        {children}
        <CTA />
    </div>
  )
}

export default MainLayout