import React from 'react'

const Tiles = ({slides}) => {
  return (
    <div>
        <div className="overflow-hidden relative max-w-[300px] md:max-w-[400px] md:max-h-[500px] w-full mx-auto md:h-auto md:rounded-2xl">
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
    </div>
  )
}

export default Tiles