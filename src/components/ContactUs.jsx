import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Title from './Title';
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
const ContactUs = () => {
  return (
    <div className="flex flex-col w-full items-center p-4">
      <div className="mb-2">
        <Title>CONTACT US!</Title>
      </div>

      {/* Three boxes side by side */}
      <div className="flex flex-col w-full md:flex-row items-center gap-y-3 md:gap-x-8 justify-center">
        {/* Phone/WhatsApp Section */}
        <motion.div variants={fadeIn("up","",0.2,1)} className="flex flex-col  md:w-[20%] w-full items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <FaWhatsapp className="text-4xl text-green-600 mb-4" />
          <span className="text-lg">Call/Whatsapp</span>
          <a href="tel:9740987598" className="text-blue-600 underline mt-1">9740987598</a>
        </motion.div>

        {/* Email Section */}
        <motion.div variants={fadeIn("up","",0.4,1)} className="flex flex-col  md:w-[20%] w-full items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <FaEnvelope className="text-4xl text-red-600 mb-4" />
          <span className="text-lg">Email</span>
          <a href="mailto:kalegoodu@gmail.com" className="text-red-600 underline mt-1">kalegoodu@gmail.com</a>
        </motion.div>

        {/* Address Section */}
        <motion.div variants={fadeIn("up","",0.6,1)} className="flex flex-col  md:w-[20%] w-full items-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <FaMapMarkerAlt className="text-4xl text-blue-600 mb-4" />
          <span className="text-lg">Registered Address</span>
          <span className="text-gray-600 mt-1">Your Address Here</span>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(ContactUs,"");
