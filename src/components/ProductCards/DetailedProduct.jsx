export const DetailedProduct = ({ product }) => {
  return (
    <div>
      <h2 className="uppercase text-orange mb-3 font-bold tracking-[0.13em] text-xs md:text-base">{product.brand}</h2>
      <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-10">{product.name}</h1>
      <p className='text-dark-grayish-blue mb-5 text-sm leading-[22px] md:text-base'>
        {product.description}
      </p>
      <div className='flex items-center justify-between md:flex-col md:items-start mt-2'>
        <div className='flex gap-4 items-center'>
          <span className='font-bold text-2xl'>${product.price}</span>
          <span className='bg-pale-orange text-orange font-bold text-sm px-2 rounded-md'>{product.discount}%</span>
        </div>
        <span className='text-grayish-blue text-sm font-bold'><del>${product.originalPrice}</del></span>
      </div>
    </div>
  );
};
