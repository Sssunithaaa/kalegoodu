export const DetailedProduct = ({ product }) => {
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;

  // Split the short description into paragraphs
  const paragraphs = product?.short_description.split('\r\n').filter(Boolean);

  return (
    <div className="px-4 flex flex-col mx-4 justify-center items-start w-full">
      
      <h1 className="font-bold text-3xl mb-2 md:text-3xl md:mb-10 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        {product?.name}
      </h1>
      {/* Render each paragraph with line spacing */}
       <div className="flex items-center justify-between my-2 md:flex-col md:items-start">
        {hasDiscount ? (
          <>
            <div className="flex gap-4 items-center">
              <span className="font-bold text-xxl">Rs. {product?.discounted_price}</span>
              <span className="bg-pale-orange text-green-700 font-bold text-sm px-2 rounded-md">
                {discountPercentage}%
              </span>
            </div>
            <span className="text-grayish-blue text-sm font-bold">
              <del>Rs. {product?.price}</del>
            </span>
          </>
        ) : (
          <span className="font-bold text-xxl">Rs. {product?.price}</span>
        )}
      </div>
      <h2 className="my-2 text-lg md:text-xl">Description</h2>
      <div className="text-dark-grayish-blue mb-5 text-sm leading-[22px] md:text-base space-y-4">
        
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
     
    </div>
  );
};
