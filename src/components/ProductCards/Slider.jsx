import { Carousel } from "./Carousel";

export const Slider = ({ images, videoUrl }) => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  return (
    <div className="relative w-full md:w-auto md:h-full md:max-w-[400px] lg:max-w-[500px]">
      <Carousel images={images} videoUrl={videoUrl} autoSlide={false}>
        {/* Pass images as children */}
        {images.map((image, index) => (
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
