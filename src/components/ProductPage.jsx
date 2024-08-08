import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';

import '../App.css';
import { img17, img18, img19, img20 } from '../assets/images'
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../services/index/products';

const thumbnails = [
  img17, img18, img19, img20
];
function ProductPage() {
  const [cartCounter, setCartCounter] = useState(1);

  const { id } = useParams();
  
  const { data: product, isLoading, error } = useQuery({
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
      <div className="font-kumbhsans md:max-w-[80%] md:mx-auto md:px-4 pt-[50px] md:pt-[0]">
        <div className="flex flex-col md:flex-row lg:items-start md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
          {true ? (
            <>
              <Slider images={images} />
              <DetailsSection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
