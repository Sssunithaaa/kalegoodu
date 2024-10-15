import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';
import '../App.css';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct } from '../services/index/products';
import { ClipLoader } from "react-spinners";
import Testimonials from './Testimonials/Testimonials';
import VideoPlayer from './Video';

function ProductPage() {
  const [cartCounter, setCartCounter] = useState(1);
  const { id } = useParams();
  
  const { data: product, isLoading } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getSingleProduct(id),
  });

  const images = product?.images?.map((image) => image.image);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <div className="lg:max-w-[100%] w-[100%] md:max-w-[100%] md:mx-auto md:px-4 pt-[10px] lg:pt-0 md:pt-[0]">
        <div className="flex flex-col md:flex-row md:items-start md:px-0 md:gap-6 md:py-10 lg:py-10 items-center md:justify-center">
          {!isLoading ? (
            <div className="flex flex-col md:flex-row  md:relative w-full gap-x-2">
              {/* Slider Section */}
              <div className="md:w-[50%] md:sticky  justify-center">
                {/* Sticky position for images */}
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
              <ClipLoader color="#36d7b7" loading={isLoading} size={50} />
            </div>
          )}
        </div>

        <div className="mt-4">
          <Testimonials comments={product?.comments || []} home={false} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
