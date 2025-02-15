import { Carousel } from "./Carousel";

export const Slider = ({ images, videoUrl }) => {
  const baseUrl = import.meta.env.VITE_APP_URL;

  return (
    <div className="relative w-full justify-center px-4 md:w-full md:px-4 md:h-full md:max-w-[400px] lg:max-w-full mx-auto">
      <Carousel images={images} videoUrl={videoUrl} autoSlide={false}>
        {/* Pass images as children */}
        {images?.map((image, index) => (
          <img
            className=" w-auto h-[500px]"
            key={index}
            src={import.meta.env.VITE_CLOUD_URL+ image}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </Carousel>
    </div>
  );
};
