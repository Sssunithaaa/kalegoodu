import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';

import '../App.css';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../services/index/products';
import {ClipLoader} from "react-spinners"
import Testimonials from './Testimonials/Testimonials';


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
    <div className="overflow-y-hidden m-0 p-0 w-full max-w-full">
      {/* <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div> */}
      <div className=" md:max-w-full w-full max-w-full md:mx-auto md:px-4 pt-[20px] md:pt-[0]">
        <div className="flex flex-col md:flex-row lg:items-start mx-auto md:py-20 items-center md:justify-center md:px-14 md:gap-16">
          {!isLoading ? (
            <>
              <Slider images={images} />
              <DetailsSection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
            </>
          ) : (
             <div className="flex justify-center items-center">
            <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
          </div>
          )}
        </div>
        <div className='my-2'>
             <Testimonials comments={product?.comments || []} /> {/* Pass the comments to the Reviews component */}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
