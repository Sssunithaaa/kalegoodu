import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';

export const DetailsSection = ({ product, cartCounter, setCartCounter }) => {
  return (
 <div className='flex flex-col justify-start items-start w-full md:py-0 gap-3 md:w-full md:max-w-[700px]'>
      <DetailedProduct product={product} />
      <CTASection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
    </div>
  );
};

