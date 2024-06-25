import {Carousel} from './Carousel';

const slides = [
  '../../../images/image-product-1.jpg',
  '../../../images/image-product-2.jpg',
  '../../../images/image-product-3.jpg',
  '../../../images/image-product-4.jpg',
];


export const Slider = () => {
  return (
    // <div className='relative h-72 overflow-hidden'>
    <div className='relative md:w-full md:max-w-[500px]'>
      {/* <img className='absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2' src="./images/image-product-1.jpg" alt="" /> */}
      <Carousel>
        {
          slides.map( s => (
            <img className='' key={s} src={ s } />
          ))
        }
      </Carousel>
    </div>
  )
}
