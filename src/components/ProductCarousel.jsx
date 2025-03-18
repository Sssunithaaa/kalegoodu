import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ categoryName, categoryProducts, lastProductRef, hasNextPage, fetchMore, isFetchingNextPage }) => {
  const carouselRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!lastProductRef?.current || !hasNextPage || window.innerWidth > 768) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );

    observerRef.current.observe(lastProductRef.current);

    return () => observerRef.current?.disconnect();
  }, [lastProductRef, hasNextPage, isFetchingNextPage, fetchMore]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div key={categoryName} className="relative mb-4 w-full">
      <h2 className="text-xl font-semibold mb-1 uppercase ml-[3%] md:ml-[1%]">
        {categoryName}
      </h2>

      {/* Scroll Arrows */}
      <button
        onClick={scrollLeft}
        className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto md:overflow-x-scroll space-x-3 scrollbar-hide w-full scroll-smooth"
      >
        {categoryProducts?.map((product, index) => (
          <div
            key={product?.product_id}
            ref={index === categoryProducts.length - 1 ? lastProductRef : null}
            className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] snap-start"
          >
            <ProductCard productMode={true} product={product} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductCarousel;
