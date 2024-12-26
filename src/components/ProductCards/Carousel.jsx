import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {  video } from "../../assets/images";
import { useRef } from "react";
import { useStateContext } from "../../context/ContextProvider";
export function Carousel({
  images = [],
  videoUrl,
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) {
  const [curr, setCurr] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const {screenSize} = useStateContext()
  // Handle play event
  const handlePlay = () => {
    setIsPlaying(true);
    if(screenSize !== "large")
      setPointer(false)
   
  };

  // Handle pause event
  const handlePause = () => {
    setIsPlaying(false);
    
   
  };
const productPageRef = useRef(null)
    const scrollToSection = (ref) => {
      
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
 const prev = () =>   {setPointer(false); setCurr((curr) => (curr === 0 ? slides.length-1 : curr - 1)); };
const next = () => setCurr((curr) => (curr === slides.length ? 0 : curr + 1));


  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]);

  // useEffect(() => {
  //   if (curr === slides.length && videoUrl) {
  //     setIsPlaying(true);
  //   } else {
  //     setIsPlaying(false);
  //   }
  // }, [curr, slides.length]);
  const [pointer,setPointer] = useState(false)
    useEffect(()=>{
      if(curr === slides?.length)
        setPointer(true);
    },[curr])
   
  return (
    <div ref={productPageRef} className="flex flex-col">
      <div
        style={{
          pointerEvents: pointer ? "none" : "auto", // Only disable pointer events on video slide
        }}
        className="overflow-hidden relative max-w-[380px] z-[1001] hover:cursor-pointer lg:w-full lg:max-w-full md:max-w-[400px] mx-auto md:h-auto md:rounded-2xl"
      >
        <div
          className={`flex transition-transform hover:cursor-pointer w-full ease-out duration-500 ${
            curr === slides.length ? "transition-none" : ""
          }`}
          style={{
            transform: `translateX(-${curr}%)`,
            pointerEvents: curr === slides.length ? "none" : "auto", // Only disable pointer events on video slide
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="mx-auto w-full"
              style={{
                display: curr === index ? "block" : "none",
                visibility: curr === index ? "visible" : "hidden", // hide inactive slides without removing them
              }}
            >
              {slide}
            </div>
          ))}

         {videoUrl != null && curr === slides.length && (
  <div className="flex-shrink-0 z-[100001] w-full flex justify-center">
    <div
      className="relative w-[340px] md:w-full h-[240px] sm:h-[200px] md:h-[400px] flex justify-center items-center"
      style={{ maxHeight: "100vh" }} // Ensure it doesn't exceed the viewport height
      onClick={() => setPointer(true)}
    >
      <ReactPlayer
        url={videoUrl}
        controls
        width="100%"
        height="100%"
        className="hover:cursor-pointer mx-2"
        style={{ pointerEvents: "auto", zIndex: 100 }}
        onPause={handlePause}
        onPlay={handlePlay}
      />
    </div>
  </div>
)}

        </div>

        {/* Navigation buttons */}
        {
          slides.length !== 1 && <div className="absolute inset-0 flex items-center justify-between p-4">
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
        }
      </div>

      {/* Thumbnail navigation */}
      <div className="hidden md:flex md:mx-auto md:w-[380px] md:max-w-[350px] lg:max-w-[400px] lg:w-[500px] md:gap-y-8 md:gap-x-2 lg:gap-4 mt-8 h-auto">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => {
              setCurr(index);
              scrollToSection(productPageRef);
            }}
            className={`hover:cursor-pointer focus:opacity-20 rounded-xl h-28 w-28`}
          >
            <img
              className={`rounded-xl ${curr === index && "opacity-40"} ${
                images?.length === 1 ? "w-[200px]" : "w-24 h-24"
              } object-contain`}
              src={import.meta.env.VITE_CLOUD_URL + image}
              alt={`Image ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}

        {/* Video thumbnail */}
        {videoUrl && (
          <div
            onClick={() => {
              setCurr(slides.length);
              scrollToSection(productPageRef);
              setPointer(true); // Set to video slide
            }} // Set to video slide
            className={`hover:cursor-pointer rounded-xl `}
          >
            <div
              className={`relative bg-gray-200 rounded-xl flex items-center justify-center ${
                curr === slides.length ? "border-2 border-orange" : ""
              } ${images.length === 1 ? "w-[200px]" : "w-24 h-24"}`}
            >
              {/* Static video preview */}
              <img
                src={video} // Replace with a suitable placeholder or dynamically fetched thumbnail
                alt="Video Thumbnail"
                className="rounded-xl object-cover h-28"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
