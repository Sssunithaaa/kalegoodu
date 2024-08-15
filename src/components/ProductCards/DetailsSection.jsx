import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';

export const DetailsSection = ({ product, cartCounter, setCartCounter }) => {
  return (
    <div className="flex flex-col justify-center py-4 w-full max-w-full md:py-0 gap-3 md:w-full md:max-w-full">
      <DetailedProduct product={product} />
      <CTASection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
    </div>
  );
};

