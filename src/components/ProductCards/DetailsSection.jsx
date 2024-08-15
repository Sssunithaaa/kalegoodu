import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';
import Reviews from './Reviews'; // Import the Reviews component

export const DetailsSection = ({ product, cartCounter, setCartCounter }) => {
  return (
    
    <div className='flex flex-col justify-start py-6 gap-3 md:w-full md:max-w-[700px]'>
      <DetailedProduct product={product} />
      <CTASection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
      
    </div>
 
    
  );
};
