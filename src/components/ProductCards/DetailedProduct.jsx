export const DetailedProduct = ({ product }) => {
 
  return (
    <div>
      {/* <h2 className="uppercase text-orange mb-3 font-bold tracking-[0.13em] text-xs md:text-base">{product?.product_id}</h2> */}
      <h1 className="font-bold text-3xl mb-4 md:text-3xl md:mb-10">{product?.name}</h1>
      <p className='text-dark-grayish-blue mb-5 text-sm leading-[22px] md:text-base'>
        {product?.short_description}
      </p>
      <div className='flex items-center justify-between md:flex-col md:items-start mt-2'>
        <div className='flex gap-4 items-center'>
          <span className='font-bold text-2xl'>₹ {product?.price}</span>
          <span className='bg-pale-orange text-orange font-bold text-sm px-2 rounded-md'>{product?.discounted_price}%</span>
        </div>
        <span className='text-grayish-blue text-sm font-bold'><del>₹ {product?.price}</del></span>
      </div>
    </div>
  );
};
