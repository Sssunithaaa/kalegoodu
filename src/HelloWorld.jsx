import React, { useEffect,useState } from 'react'
import { motion } from 'framer-motion'
const HelloWorld = () => {
    const [mousePosition, setMousePosition] = useState(
        {
            x:0,
            y:0
        }
    )
    useEffect(()=> {
        const mousemove = e => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            })
        }
        window.addEventListener("mousemove",mousemove)
        return () => {
            window.removeEventListener("mousemove",mousemove)
        }
    },[])
    const variants = {
        default: {
            x: mousePosition.x -16,
            y: mousePosition.y - 16 
        }
    }
  return (
    <div className='bg-pink-500 w-full h-screen flex justify-center items-center text-6xl font-semibold'>
        
        <motion.h1>Hello World</motion.h1>
        <motion.div variants={variants} animate="default"  className='bg-[#111] h-[32px] w-[32px] rounded-full fixed top-0 left-0 '>

        </motion.div>
         {isDropdownVisible && (
    <div
    id="mega-menu-full-image-dropdown"
    className={`lg:absolute mt-4 z-[100001] bg-white border-gray-200 shadow-sm border-y transition-max-height duration-1000 ease-in-out ${
      isDropdownVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}
  >
    <div className="grid max-w-screen-xl grid-cols-2 gap-x-5 px-6 py-3 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 lg:px-10 lg:py-5 lg:gap-x-10">
      <ul className="mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Online Stores
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Segmentation
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Marketing CRM
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Online Stores
          </a>
        </li>
      </ul>
      <ul className="mb-4 space-y-4 md:mb-0">
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Our Blog
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
            License
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
            Resources
          </a>
        </li>
      </ul>
    </div>
  </div>
  )}
    </div>

  )
}

export default HelloWorld