import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';
import '../App.css';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct, getProductsByCategory } from '../services/index/products'; // Make sure to import the new function
import { ClipLoader } from "react-spinners";
import Testimonials from './Testimonials/Testimonials';
import CompactProductCard from './CompactProductCard';
import ReactPlayer from 'react-player';

function ProductPage() {
  const [cartCounter, setCartCounter] = useState(1);
  const { id } = useParams();
  
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getSingleProduct(id),
  });
  
  // Fetch similar products based on the product's category
  const { data: similarProducts, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ["similarProducts", product?.categories?.[0]?.category_id],
    queryFn: () => getProductsByCategory(product?.categories?.[0]?.category_id), // Use the API to fetch products
    enabled: !!product, // Only run this query if the product data is available
  });

  const images = product?.images?.map((image) => image.image);
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const productId = parseInt(id, 10);

  return (
    <div className="">
      <div className="lg:max-w-[100%] w-[100%] md:max-w-[100%] md:mx-auto md:px-4 pt-[10px] lg:pt-0 md:pt-[0]">
        <div className="flex flex-col md:flex-row md:items-start md:px-0 md:gap-6 md:py-10 lg:py-10 items-center md:justify-center">
          {!isLoadingProduct ? (
            <div className="flex flex-col md:flex-row md:relative w-full gap-x-2">
              {/* Slider Section */}
              <div className="md:w-[50%] md:sticky justify-center">
                <div className="md:sticky md:top-0">
                  <Slider images={images} videoUrl={product?.video_link} />
                </div>
              </div>

              {/* Details Section */}
              <div className="md:w-[50%] md:mt-0 mt-4">
                <DetailsSection
                  product={product}
                  cartCounter={cartCounter}
                  setCartCounter={setCartCounter}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <ClipLoader color="#36d7b7" loading={isLoadingProduct} size={50} />
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        <div className="mt-4">
          <Testimonials comments={product?.comments || []} home={false} />
        </div>
        

        {/* Similar Products Section */}
       {/* Similar Products Section */}
<div className="my-4 px-5 w-full">
  <h2 className="text-2xl font-semibold text-center mb-2">You may also like</h2>
  {isLoadingSimilar ? (
    <div className="flex justify-center items-center">
      <ClipLoader color="#36d7b7" loading={isLoadingSimilar} size={50} />
    </div>
  ) : (
    // <div
    //   className={`md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-x-auto gap-x-4 md:justify-start md:items-start`}
    // >
    <div className='example overflow-x-auto mx-auto whitespace-nowrap overflow-y-hidden w-full h-full'>
      {similarProducts
  ?.filter((product) => product.product_id !== productId)
  .slice(0, 5)
  .map((product) => (
    <CompactProductCard 
      product={product} 
      key={product.product_id}
    />
  ))}


    </div>
  )}
</div>



      </div>
    </div>
  );
}

export default ProductPage;
