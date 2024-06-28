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
    </div>

  )
}

export default HelloWorld