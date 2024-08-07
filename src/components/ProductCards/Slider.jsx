import { Carousel } from './Carousel';


export const Slider = ({ images }) => {
  const baseUrl = import.meta.env.VITE_APP_URL
  return (
    <div className="relative md:w-auto md:h-full md:max-w-[500px]">
      <Carousel images={images}>
        {images && images?.map((image, index) => (
          <img
            className="object-cover"
            key={index}
            src={baseUrl + image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};
