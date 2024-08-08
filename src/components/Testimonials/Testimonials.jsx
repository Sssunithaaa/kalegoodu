import React from 'react';
import Masonry from 'react-masonry-css';
import Testimonial from './Testimonial';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const testimonialsData = [
  {
    text: "Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.",
    name: "Leslie Alexander",
    username: "lesliealexander",
    avatar: "https://via.placeholder.com/150",
  },
  {
    text: "Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.",
    name: "Brenna Goyette",
    username: "brennagoyette",
    avatar: "https://via.placeholder.com/150",
    logo: "https://via.placeholder.com/50"
  },
  {
    text: "Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.",
    name: "Leonard Krasner",
    username: "leonardkrasner",
    avatar: "https://via.placeholder.com/150",
  },
  {
    text: "Quia dolorem qui et. Atque quo aliquid sit eos officia. Dolores similique laboriosam quaerat cupiditate.",
    name: "Michael Foster",
    username: "michaelfoster",
    avatar: "https://via.placeholder.com/150",
  },
  {
    text: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
    name: "Lindsay Walton",
    username: "lindsaywalton",
    avatar: "https://via.placeholder.com/150",
  },
  {
    text: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
    name: "Tom Cook",
    username: "tomcook",
    avatar: "https://via.placeholder.com/150",
  },
   {
    text: "Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.",
    name: "Lindsay Walton",
    username: "lindsaywalton",
    avatar: "https://via.placeholder.com/150",
  },
  {
    text: "Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.",
    name: "Tom Cook",
    username: "tomcook",
    avatar: "https://via.placeholder.com/150",
  },
];

const Testimonials = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1
  };
  const baseUrl = import.meta.env.VITE_APP_URL
 const {data,isLoading} = useQuery({
  queryKey: ["comments"],
  queryFn: async () => {
    const response = await axios.get(`${baseUrl}/api/comments/`);
    
    return response.data?.comments
  }
 })


  return (
    // <div>
     <div className="bg-gradient-to-r from-[#ECF487] via-green-50 to-[#C0E6CD] bg-opacity-5 py-12"> 
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black mb-2">Testimonials</h2>
        <p className="text-xl text-center text-grsay-600 mb-2">We have worked with thousands of amazing people</p>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {data?.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Testimonials;
