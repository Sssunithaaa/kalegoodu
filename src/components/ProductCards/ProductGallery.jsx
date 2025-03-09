import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from '.';
import { useQuery } from '@tanstack/react-query';
import { getSingleProduct, getProductsByCategory } from '../../services/index/products'; // Make sure to import the new function
import { ClipLoader } from "react-spinners";
import Testimonials from '../Testimonials/Testimonials';
import CompactProductCard from '../CompactProductCard';
import ReactPlayer from 'react-player';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Title from '../Title';

function ProductGallery() {
  const [cartCounter, setCartCounter] = useState(1);
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getSingleProduct(id),
  });
  const [showThumbnails, setShowThumbnails] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowThumbnails(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Fetch similar products based on the product's category
  const { data: similarProducts, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ["similarProducts", product?.categories?.[0]?.category_id],
    queryFn: () => getProductsByCategory(product?.categories?.[0]?.category_id), // Use the API to fetch products
    enabled: !!product, // Only run this query if the product data is available
  });

const images = [
   ...(product?.images?.map((img) => ({
    original: `${import.meta.env.VITE_CLOUD_URL}${img?.image}`,
    thumbnail: `${import.meta.env.VITE_CLOUD_URL}${img?.image}`,
    alt: `${product?.name} Image`,
  })) || []),
  ...(product?.video_link
    ? [
        {
          original: product.video_link, // Placeholder, not used for video
          thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg", // Use a thumbnail for the video
          embedUrl: product.video_link,
           renderItem: () => (
            <div className={`video-wrapper h-[70vh] md:h-[500px] justify-center flex`}>
              <ReactPlayer url={product.video_link} controls width="100%" height="100%" />
            </div>
          ),
        },
      ]
    : []), // Only add this object if a video link exists

 
];


 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const productId = parseInt(id, 10);
  console.log(isPlaying)
  return (
    <div className="">
      <div className="lg:max-w-[100%] w-[100%] md:max-w-[100%] md:mx-auto md:px-4 pt-[10px] lg:pt-0 md:pt-[0]">
        <div className="flex flex-col md:flex-row md:items-start md:px-0 md:gap-6 md:py-10 lg:py-10 items-center md:justify-center">
          {!isLoadingProduct ? (
            <div className="flex flex-col md:flex-row md:relative w-full gap-x-2 md:gap-x-1">
              {/* Slider Section */}
              <div className="md:w-[50%] md:sticky justify-center mx-4 md:mx-1">
                <div className="md:sticky md:top-0">
<ImageGallery
  items={images}
  lazyLoad={true}
  showThumbnails={showThumbnails}
  showFullscreenButton={true}
  showPlayButton={false}
  renderItem={(item) => (
    <img
      src={item.original}
      alt={item.originalAlt}
      style={{
        height: "500px", // Minimum 200px, scales with viewport up to 700px
        width: "100%",
        objectFit: "cover",
      }}
    />
  )}
/>


                </div>
              </div>

              {/* Details Section */}
              <div className="md:w-[50%] md:mt-0 mt-4">
                <DetailsSection
                  product={product}
                  images={images}
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
  <Title className=" mb-2">You may also like</Title>
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

export default ProductGallery;
