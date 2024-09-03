import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';

import { VideoPlayer } from '../Video';
export const DetailsSection = ({ product, cartCounter, setCartCounter }) => {
  return (
 <div className='flex flex-col justify-start items-start w-full md:py-0 gap-3 md:w-full md:max-w-[700px]'>
      <DetailedProduct product={product} />
      <CTASection product={product} cartCounter={cartCounter} setCartCounter={setCartCounter} />
      {/* <div className='flex mx-auto'>
        {product?.video_link && <VideoPlayer url={product?.video_link}/>}
      </div> */}
      
    </div>
  );
};

