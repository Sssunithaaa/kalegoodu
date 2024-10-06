import { Carousel } from "./Carousel";

export const Slider = ({ images, videoUrl }) => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  return (
    <div className="relative w-full md:w-full md:px-4 md:h-full md:max-w-[400px] lg:max-w-full mx-auto">
      <Carousel images={images} videoUrl={videoUrl} autoSlide={false}>
        {/* Pass images as children */}
        {images?.map((image, index) => (
          <img
            className="object-cover w-full h-full"
            key={index}
            src={baseUrl + image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};
