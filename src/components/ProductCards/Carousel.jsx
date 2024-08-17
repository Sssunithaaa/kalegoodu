import { useState, useEffect } from "react";


export function Carousel({ images, children: slides, autoSlide = false, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  const baseUrl = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden relative max-w-[350px] lg:w-[500px] lg:max-w-[500px] md:max-h-[500px] w-full mx-auto md:h-auto md:rounded-2xl">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prev}
            className="bg-white rounded-full p-3 md:hidden"
          >
            <img className="h-[10px] w-[10px]" src="./images/icon-previous.svg" alt="Previous" />
          </button>
          <button
            onClick={next}
            className="bg-white rounded-full p-3 md:hidden"
          >
            <img className="h-[10px] w-[10px]" src="./images/icon-next.svg" alt="Next" />
          </button>
        </div>
      </div>
      <div className="hidden md:flex md:mx-auto md:w-[300px] lg:w-[500px] md:gap-y-8 md:gap-x-2 lg:gap-4 mt-8 h-auto">
        {images?.map((t, i) => (
          <div
            key={i}
            onClick={() => setCurr(i)}
            className={`hover:cursor-pointer focus:opacity-20 rounded-xl ${images.length === 1 ? 'mx-auto w-[200px]' : 'w-[200px]'}`}
          >
            <div className={`rounded-xl ${curr === i && "border-2 border-orange"}`}>
              <img 
                className={`rounded-xl ${curr === i && "opacity-40"} ${images?.length === 1 ? "w-[200px]" : "w-full"} h-auto  object-contain`} 
                src={baseUrl + t} 
                alt={`Image ${i + 1}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
