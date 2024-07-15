import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';

export const DetailsSection = ({ product, cartCounter, setCartCounter }) => {
  console.log(cartCounter)
  return (
    <div className='flex flex-col justify-start p-6 gap-3 md:w-full md:max-w-[600px]'>
      <DetailedProduct product={product} />
      <CTASection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
    </div>
  );
};
