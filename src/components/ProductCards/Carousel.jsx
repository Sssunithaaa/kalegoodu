import { useState, useEffect } from "react";
import ReactPlayer from "react-player";

export function Carousel({
  images = [],
  videoUrl,
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const baseUrl = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  useEffect(() => {
    if (curr === slides.length && videoUrl) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [curr, slides.length]);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden relative max-w-[350px] lg:w-full lg:max-w-full md:max-w-[400px] mx-auto md:h-auto md:rounded-2xl">
        <div
    className={`flex transition-transform w-full ease-out duration-500 ${
        curr === slides.length ? "transition-none" : ""
    }`}
    style={{ transform: `translateX(-${curr}%)` }}
>

          {slides.map((slide, index) => (
            <div
              key={index}
              className="mx-auto w-full"
              style={{ display: curr === index ? "block" : "none" }}
            >
              {slide}
            </div>
          ))}

          {videoUrl != null && curr === slides.length && (
            <div className="flex-shrink-0 w-full h-full">
              <div className="relative hover:cursor-pointer w-full h-0 pb-[56.25%]">
    <ReactPlayer
        url={videoUrl}
        playing={isPlaying}
        controls
        width="100%"
        height="100%"
        className="absolute top-0 left-0"
        style={{ pointerEvents: "auto",zIndex:10 }} // Ensuring that pointer events are allowed
    />
</div>

            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          {/* Previous button */}
          <button
            onClick={prev}
            className="bg-white rounded-full p-3 md:hidden"
            style={{ visibility: curr === 0 ? "hidden" : "visible" }} // Hide on first slide
          >
            <img
              className="h-[10px] w-[10px]"
              src="./images/icon-previous.svg"
              alt="Previous"
            />
          </button>

          {/* Next button */}
          <button
            onClick={next}
            className="bg-white rounded-full p-3 md:hidden"
            style={{ visibility: curr === slides.length-1 ? "hidden" : "visible" }} // Hide on last slide
          >
            <img
              className="h-[10px] w-[10px]"
              src="./images/icon-next.svg"
              alt="Next"
            />
          </button>
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="hidden md:flex md:mx-auto md:w-[350px] md:max-w-[350px] lg:max-w-[400px] lg:w-[500px] md:gap-y-8 md:gap-x-2 lg:gap-4 mt-8 h-auto">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setCurr(index)}
            className={`hover:cursor-pointer focus:opacity-20 rounded-xl ${
              images.length === 1 ? "mx-auto w-[200px]" : "sm:w-[180px] md:w-[200px] lg:w-[180px]"
            }`}
          >
            <img
              className={`rounded-xl ${curr === index && "opacity-40"} ${
                images?.length === 1 ? "w-[200px]" : "w-full"
              } h-auto object-contain`}
              src={baseUrl + image}
              alt={`Image ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}

        {/* Video thumbnail */}
        {videoUrl && (
          <div
            onClick={() => setCurr(slides.length)} // Set to video slide
            className={`hover:cursor-pointer focus:opacity-20 rounded-xl ${
              curr === slides.length ? "border-2 border-orange" : ""
            }`}
          >
            <div className="w-full h-auto bg-gray-200 flex items-center justify-center">
              <span className="text-sm">Video</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
