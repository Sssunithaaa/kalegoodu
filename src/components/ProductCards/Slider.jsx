import { Carousel } from './Carousel';


export const Slider = ({ images }) => {
  return (
    <div className="relative md:w-auto md:h-full md:max-w-[500px]">
      <Carousel>
        {images.map((image, index) => (
          <img
            className="object-cover"
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};
