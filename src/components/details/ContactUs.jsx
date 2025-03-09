import React from 'react';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import Title from '../Title';
import { SectionWrapper } from '../../hoc';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { useNavigate } from 'react-router-dom';
const ContactUs = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full items-center p-4">
      <div className="mb-2">
        <Title>CONTACT US!</Title>
      </div>

      {/* Three boxes side by side */}
      <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-y-5 md:gap-x-8 w-full mx-auto justify-center">
        {/* Phone/WhatsApp Section */}
        <motion.div variants={fadeIn("up","",0.2,1)} className="flex flex-col  md:max-w-[250px] w-full items-center bg-[#f5f3ed] p-6 rounded-lg shadow-lg">
          <FaWhatsapp className="text-4xl text-green-600 mb-4" />
          <span className="text-lg">Call/Whatsapp</span>
          <a href="tel:9740987598" className="text-blue-600 underline mt-1">9740987598</a>
        </motion.div>

        {/* Email Section */}
        <motion.div variants={fadeIn("up","",0.4,1)} className="flex flex-col  md:max-w-[250px] w-full items-center bg-[#f5f3ed] p-6 rounded-lg shadow-lg">
          <FaEnvelope className="text-4xl text-red-600 mb-4" />
          <span className="text-lg">Email</span>
          <a href="mailto:kalegoodu@gmail.com" className="text-red-600 underline mt-1">kalegoodu@gmail.com</a>
        </motion.div>

        {/* Address Section */}
        <motion.div variants={fadeIn("up","",0.6,1)} className="flex flex-col  md:max-w-[250px] w-full items-center bg-[#f5f3ed] p-6 rounded-lg shadow-lg">
          <FaMapMarkerAlt className="text-4xl text-blue-600 mb-4" />
          <span className="text-lg">Registered Address</span>
          <span className="text-gray-600 mt-1">Your Address Here</span>
        </motion.div>

         <motion.div variants={fadeIn("up", "", 0.6, 1)} className="flex flex-col md:max-w-[250px] w-full items-center bg-[#f5f3ed] p-6 rounded-lg shadow-lg">
  <FaInstagram className="text-4xl text-pink-600 mb-4" />
  <span className="text-lg">Instagram</span>
  <span
    onClick={() => window.open("https://www.instagram.com/kalegoodu?igsh=MXc2N2RvajdvNmh5NQ==", "_blank")}
    className="text-gray-600 mt-1 cursor-pointer"
  >
    Click here
  </span>
</motion.div>


      </div>
    </div>
  );
};

export default SectionWrapper(ContactUs,"");
