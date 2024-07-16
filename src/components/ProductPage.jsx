import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DetailsSection, Slider } from './ProductCards';

import '../App.css';
import { img17, img18, img19, img20 } from '../assets/images'
const thumbnails = [
  img17, img18, img19, img20
];
function ProductPage() {
  const [cartCounter, setCartCounter] = useState(1);
  const [product, setProduct] = useState(null);
  const { slug } = useParams();

  const productt = {
  "brand": "Kalegoodu",
  "name": "Flower pot",
  "description": "Enhance your home with this exquisite flower pot, showcasing a blend of modern elegance and timeless beauty that complements any decor.",
  "price": 125.00,
  "discount": 50,
  "originalPrice": 250.00,
 
}
 useEffect(()=> {
  window.scrollTo(0,0)
 },[])

  useEffect(() => {
    // Fetch product data based on the slug
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <div className="overflow-y-hidden">
      {/* <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div> */}
      <div className="font-kumbhsans md:max-w-[80%] md:mx-auto md:px-4 pt-[80px] md:pt-[0]">
        <div className="flex flex-col md:flex-row lg:items-start md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
          {!product ? (
            <>
              <Slider images={thumbnails} />
              <DetailsSection product={productt} cartCounter={cartCounter} setCartCounter={setCartCounter} />
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
