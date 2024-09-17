import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'


const BackButton = () => {
    const navigate = useNavigate();
    const handleBack = ()=> {
        navigate(-1)
    }
  return (
    <div className=''><button className='bg-black text-white opacity-90 px-4 py-2 rounded-md text-lg' onClick={handleBack}>Back</button></div>
  )
}

export default BackButton