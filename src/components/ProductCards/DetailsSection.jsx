import { CTASection } from './CTASection';
import { DetailedProduct } from './DetailedProduct';

export const DetailsSection = (props) => {

  return (
    <div className='flex flex-col p-6 gap-3 md:w-full md:max-w-[600px]'>
      
        <DetailedProduct />
        <CTASection props={props}/>
    </div>
  )
}
