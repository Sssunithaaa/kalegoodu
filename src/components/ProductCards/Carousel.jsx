import { useState, useEffect } from "react";
import { img17, img18, img19, img20 } from "../../assets/images";

const thumbnails = [img17, img18, img19, img20];

export function Carousel({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden relative max-w-[300px] md:max-w-[400px] md:max-h-[500px] w-full ml-10 md:h-auto md:rounded-2xl">
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
            <img className="h-[10px] w-[10px]" src="./images/icon-previous.svg" alt="" />
          </button>
          <button
            onClick={next}
            className="bg-white rounded-full p-3 md:hidden"
          >
            <img className="h-[10px] w-[10px]" src="./images/icon-next.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="hidden md:flex w-full gap-8 mt-8 h-20">
        {thumbnails.map((t, i) => (
          <div
            key={i}
            onClick={() => setCurr(i)}
            className="hover:cursor-pointer focus:opacity-20 rounded-xl"
          >
            <div className={`rounded-xl ${curr === i && "border-2 border-orange"}`}>
              <img className={`rounded-xl ${curr === i && "opacity-40"}`} src={t} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}