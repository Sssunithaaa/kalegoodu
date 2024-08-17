import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';

import '../App.css';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../services/index/products';
import {ClipLoader} from "react-spinners"
import Testimonials from './Testimonials/Testimonials';
import ReactPlayer from 'react-player';
import { VideoPlayer } from './Video';


function ProductPage() {
  const [cartCounter, setCartCounter] = useState(1);

  const { id } = useParams();
  
  const { data: product, isLoading } = useQuery({
  queryKey: ["products", id],
  queryFn: () => getSingleProduct(id), // Pass a function reference
});
  const images = product?.images?.map((image)=>image.image)
  
  
  
 useEffect(()=> {
  window.scrollTo(0,0)
 },[])

 

  return (
    <div className="overflow-y-hidden">
      {/* <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div> */}
      <div className=" lg:max-w-[80%] md:max-w-[100%] md:mx-auto md:px-4 pt-[20px] md:pt-[0]">
        <div className="flex flex-col md:flex-row md:items-start md:px-0 md:gap-6 md:py-20 items-center md:justify-center">
          {!isLoading ? (
            <div className='flex flex-col md:flex-row gap-x-4 '>
              <div className='md:w-[50%]'>
                <Slider images={images} />
              </div>
              {/* <VideoPlayer  url={`https://www.youtube.com/watch?v=snYu2JUqSWs`}/> */}
              <div className='md:w-[50%] md:mt-0 mt-4'>
                <DetailsSection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
              </div>
            </div>
          ) : (
             <div className="flex justify-center items-center">
            <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
          </div>
          )}
        </div>
        <div className='mt-4'>
             <Testimonials comments={product?.comments || []} /> {/* Pass the comments to the Reviews component */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
