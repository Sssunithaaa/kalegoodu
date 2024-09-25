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

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length-1 : curr - 1));
const next = () => setCurr((curr) => (curr === slides.length-1 ? 0 : curr + 1));
 console.log(curr)
 console.log(slides.length)
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
      <div className="overflow-hidden relative max-w-[350px]  lg:w-full lg:max-w-full md:max-w-[400px] mx-auto md:h-auto md:rounded-2xl">
        <div
          className="flex transition-transform  w-full ease-out duration-500"
          style={{ transform: `translateX(-${curr}%)` }} // Correct slide translation
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
            <div className="flex-shrink-0 w-full h-full"> {/* Full height container */}
              <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                <ReactPlayer
                  url={videoUrl}
                  playing={isPlaying} // Control play state
                  controls
                  width="100%" // Full width
                  height="100%" // Full height
                  className="absolute top-0 left-0" // Positioning for full coverage
                />
              </div>
            </div>
          )}

        </div>

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="bg-white rounded-full p-3 md:hidden"
          >
            <img
              className="h-[10px] w-[10px]"
              src="./images/icon-previous.svg"
              alt="Previous"
            />
          </button>
          <button onClick={next} className="bg-white rounded-full p-3 md:hidden">
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
