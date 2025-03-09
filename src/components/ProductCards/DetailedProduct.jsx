import Title from "../Title";

export const DetailedProduct = ({ product }) => {
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;
  
  return (
    <div className=" justify-center w-[100%]  items-start md:mx-2 px-4 md:px-2 gap-x-4 flex flex-col">
      {/* <h1 style={{ fontSize: "var(--font-size-heading-1)", fontFamily: "Poppins, sans-serif" }} className="font-bold text-3xl mb-2 md:text-3xl md:mb-10 uppercase bg-gradient-to-r text-[#1D1D1D] not-italic leading-[1.3125] tracking-normal whitespace-normal bg-clip-text">
        {product?.name}
      </h1> */}
      <Title font="text-[#023020]">{product?.name}</Title>

      <div className="body flex items-center justify-between my-3 md:flex-col md:items-start">
  {hasDiscount ? (
    <div className="flex items-center gap-x-3">
      
        <span className="font-bold">
          Rs. {product?.discounted_price}
        </span>
        <span className="bg-pale-orange text-green-700 font-bold text-md px-2 rounded-md">
          {discountPercentage}% OFF
        </span>
    
      <span className="text-grayish-blue ml-2 md:ml-0 text-md font-bold">
        <del>Rs. {product?.price}</del>
      </span>
    </div>
  ) : (
    <span className="font-bold">Rs. {product?.price}</span>
  )}
</div>


      <div className="body lg:w-full mb-5 space-y-4 ">
       <div dangerouslySetInnerHTML={{ __html: product?.short_description }} />
      </div>
    </div>
  );
};
