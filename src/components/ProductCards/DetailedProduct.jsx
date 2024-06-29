
export const DetailedProduct = () => {
  return (
    <div>
        {/* Subtitle */}
        <h2 className="uppercase text-orange mb-3 font-bold tracking-[0.13em] text-xs 
        md:text-base">Kalegoodu</h2>
        {/* Product Name */}
        <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-10">Flower pot</h1>
        {/* Product Description */}
        <p className='text-dark-grayish-blue mb-5 text-sm leading-[22px] md:text-base'>
            Enhance your home with this exquisite flower pot, showcasing a blend of modern elegance and timeless beauty that complements any decor.
        </p>
        {/* Product Price */}
        <div className='flex items-center justify-between md:flex-col md:items-start mt-2'>
          <div className='flex gap-4 items-center'>
              {/* Price */}
              <span className='font-bold text-2xl'>$125.00</span>
              {/* Discount */}
              <span className='bg-pale-orange text-orange font-bold text-sm px-2 rounded-md'>50%</span>
          </div>
          {/* Previous price */}
          <span className='text-grayish-blue text-sm font-bold'><del>$250.00</del></span>
        </div>
    </div>
  )
}
