import React from 'react'
import Title from './Title'

const ContactUs = () => {
  return (
    <div className='flex flex-col'>
        <div>
            <Title>CONTACT US!</Title>
        </div>
        <div className='flex mx-auto my-2 text-gray-800'>
            <ul style={{listStyle:'disc'}}>
                <li>Call/Whatsapp: 9740987598</li>
                <li>Email: kalegoodu@gmail.com</li>
                <li>Registered address: </li>
            </ul>
        </div>
    </div>
  )
}

export default ContactUs