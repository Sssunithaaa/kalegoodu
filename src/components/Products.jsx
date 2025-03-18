import React, { useState, useEffect,useRef,useMemo, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import ProductCard from "./ProductCard";
import { FormControl, Select, MenuItem } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import axios from "axios";
import { SectionWrapper } from "../hoc";
import { useInfiniteQuery } from "@tanstack/react-query";
import FullPageLoader from "./FullPageLoader";
import { useStateContext } from "../context/ContextProvider";
import Button from "./Button";
import { ClipLoader } from "react-spinners";
import ProductCarousel from "./ProductCarousel";

const Products = () => {
  const {showSidebar,setShowSidebar} = useStateContext();
  const [showOverlay,setShowOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("created_at-desc");
  const [priceRange,setPriceRange] = useState([null,null])
  const [sPrice, setSprice] = useState(0);
  const [ePrice, setEprice] = useState(null);
  const [price, setPrice] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_URL;
  const { id, name ,slug} = useParams();
  const categoryMode = Boolean(id);
  const subCategoryMode = Boolean(slug);
  const subcategoryId = subCategoryMode ? slug.split("-").pop() : null;
  const [subcategories,setSubCategories] = useState([]);
  const location = useLocation();
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  // const [priceRange, setPriceRange] = useState([null, null]);
  const [availability, setAvailability] = useState({ inStock: false, outOfStock: false });

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  
 

  useEffect(() => {
    setSelectedSubcategory(null)
    if (name) {
      setSelectedCategory(name.replaceAll("-", " "));
    } else if (subCategoryMode) {
      setSelectedCategory(slug.replace(/-\d+$/, "").replace(/-/g, " "));
    } else {
      setSelectedCategory("All Products");
    }
  }, [name, slug, location]);

  const toggleSidebar = () =>{ setShowSidebar((prev) => !prev)
    setShowOverlay(true);
  };

  const searchKeywordOnSubmitHandler = useCallback((event) => {
    event.preventDefault();
    setKeyword((prevKeyword) => (prevKeyword ? prevKeyword.trim() : null));

    if (window.innerWidth <= 768) {
      setTimeout(toggleSidebar, 1000);
    }
  }, []);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 1024) {
      setShowSidebar(false); // Ensure sidebar is closed
      setShowOverlay(false); // Remove the overlay
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize); // Cleanup listener
}, []);


const fetchProducts = async ({ pageParam = 1 }) => {
  try {
    let fetchedSubcategories = [];
    if (categoryMode) {
      if (selectedSubcategory) {
        fetchedSubcategories = [selectedSubcategory];
      } else {
        const { data: categoryData } = await axios.get(
          `${baseUrl}/api/subcategories_by_category/${id}/`
        );
        fetchedSubcategories = categoryData?.subcategories || [];
      }
    } else if (subCategoryMode) {
      fetchedSubcategories = [{ subcategory_id: subcategoryId, name: selectedCategory }];
    }

    if (!selectedSubcategory) {
      setSubCategories(fetchedSubcategories); // Update state with fetched subcategories
    }

    // Prepare availability filters
    const availabilityFilters = {};
    if (availability.inStock) availabilityFilters.in_stock = true;
    if (availability.outOfStock) {availabilityFilters.out_stock = true;availabilityFilters.out_stock=false}

    if (!categoryMode && !subCategoryMode) {
      const { data } = await axios.get(`${baseUrl}/api/list_products`, {
        params: {
          page: pageParam,
          search: keyword || undefined,
          min_price: sPrice || undefined,
          max_price: ePrice || undefined,
          sort_by: sortOption ? sortOption.split("-")[0] : undefined,
          sort_order: sortOption ? sortOption.split("-")[1] : undefined,
          ...availabilityFilters, // Add availability filters here
        },
      });

      console.log(`${baseUrl}/api/list_products`, {
        params: {
          page: pageParam,
          search: keyword || undefined,
          min_price: sPrice || undefined,
          max_price: ePrice || undefined,
          sort_by: sortOption ? sortOption.split("-")[0] : undefined,
          sort_order: sortOption ? sortOption.split("-")[1] : undefined,
          ...availabilityFilters, // Add availability filters here
        },
      })

      return {
        products: data.results || [],
        nextPage: data.next ? pageParam + 1 : null, // Ensure pagination works correctly
      };
    }

    if (fetchedSubcategories.length === 0) {
      console.warn("No valid subcategories available.");
      return { products: [], nextPage: null };
    }

    const productRequests = fetchedSubcategories.map(async (sub) => {
      const { data } = await axios.get(
        `${baseUrl}/api/products_by_subcategory/${sub.subcategory_id}/`,
        {
          params: {
            page: pageParam,
            search: keyword || undefined,
            min_price: sPrice || undefined,
            max_price: ePrice || undefined,
            sort_by: sortOption ? sortOption.split("-")[0] : undefined,
            sort_order: sortOption ? sortOption.split("-")[1] : undefined,
            ...availabilityFilters, // Add availability filters here
          },
        }
      );
      
      console.log(`${baseUrl}/api/products_by_subcategory/${sub.subcategory_id}/`,
        {
          params: {
            page: pageParam,
            search: keyword || undefined,
            min_price: sPrice || undefined,
            max_price: ePrice || undefined,
            sort_by: sortOption ? sortOption.split("-")[0] : undefined,
            sort_order: sortOption ? sortOption.split("-")[1] : undefined,
            ...availabilityFilters, // Add availability filters here
          },
        })
      return {
        products: data.results || [],
        nextPage: data.next ? pageParam + 1 : null,
      };
    });

    // Await all product requests
    const responses = await Promise.all(productRequests);

    // Extract products properly
    const products = responses.flatMap((res) => res.products);

    // Determine nextPage correctly (if ANY of the subcategories have a next page)
    const hasMorePages = responses.some((res) => res.nextPage !== null);
    const nextPage = hasMorePages ? pageParam + 1 : null;

    return {
      products,
      nextPage,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};


const {
  data,
  isLoading,
  isError,
  refetch,
  fetchNextPage,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ["products_page", id, categoryMode, keyword, sPrice, ePrice, sortOption, selectedSubcategory, availability.inStock, availability.outOfStock], // Add availability here
  queryFn: fetchProducts,
  getNextPageParam: (lastPage, allPages) => lastPage.nextPage ? lastPage.nextPage : null,
  refetchOnWindowFocus: true,
  
});


//    useEffect(() => {
//   const timeout = setTimeout(() => refetch(), 500); // Debounce
//   return () => clearTimeout(timeout);
// }, [location]);

  


  const fetchMore = useCallback(() => {
  if (!isFetchingNextPage && hasNextPage) {
    fetchNextPage();
  }
}, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  useEffect(()=>{
    refetch();
  },[location])

 const observerRef = useRef(null);
  const lastProductRef = useCallback(
  (node) => {
    if (!node || isFetchingNextPage) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchMore(); // Call wrapped function instead of `fetchNextPage`
        }
      },
      { threshold: 1.0 } // Ensures it only triggers once when fully visible
    );

    observerRef.current.observe(node);
  },
  [fetchMore, isFetchingNextPage]
);

if (isError) {
  console.log("Error fetching products");
}
const products = useMemo(() => [
  ...new Map(
    (data?.pages?.flatMap((page) => page.products) || []).map((p) => [
      p.product_id, p
    ])
  ).values()
], [data]);


const categorizedProducts = selectedSubcategory
  ? { 
      [selectedSubcategory.name]: products
    }
  : subcategories.reduce((acc, subcategory) => {
      const subcategoryName = subcategory?.name || "Uncategorized"; 
      if (!acc[subcategoryName]) acc[subcategoryName] = [];

      // Find products belonging to this subcategory
      const subcategoryProducts = products.filter(product => 
        product.subcategories?.some(sub => sub.subcategory_id === subcategory.subcategory_id)
      );

      acc[subcategoryName].push(...subcategoryProducts);
      return acc;
    }, {});










const loadMoreHandler = () => {
  if (hasNextPage) fetchNextPage();
};


 useEffect(() => {
  setSortOption(null); // Reset sorting
  setSprice(0);        // Reset price start
  setEprice(null);     // Reset price end
  setKeyword(null);    // Reset search keyword
  setPrice(false);     // Reset price toggle
  setSort(false);      // Reset sort dropdown visibility
  
  
}, [name,location]);
const handlePriceChange = (start, end) => {
  setSprice(start || 0);
  setEprice(end || null);
  
};
const handleSortChange = (event) => {
  setSortOption(event.target.value);
};


  const carouselRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="w-screen mb-10">
      <div className="flex flex-col lg:mx-[20px] px-1 lg:px-0 relative">
        <div className="py-1 px-3">
          <h1 className="heading tracking-wide">{selectedCategory}</h1>
        </div>
        <div className="flex lg:flex-row flex-col">
          {showSidebar && showOverlay && (
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-40 z-40"
              onClick={toggleSidebar}
            ></div>
          )}
          <div
            className={`fixed bg-white inset-y-0 left-0 z-40 transform ${
              showSidebar ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}
          >
            <Sidebar
              onCategorySelect={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setSprice={setSprice}
              setEprice={setEprice}
              setKeyword={setKeyword}
              setPrice={setPrice}
              availability={availability}
              setAvailability={setAvailability} 
              handlePriceChange={handlePriceChange}
              toggleSidebar={toggleSidebar}
              location={location}
              searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
            />
          </div>
          <div className="flex-1 overflow-x-auto w-full p-2">
            <div className="flex flex-col justify-start">
              <div className="flex flex-row max-w-[450px] justify-start items-center gap-x-2">
                <h1
                  onClick={toggleSidebar}
                  className="lg:hidden subHeading text-[#023020] opacity-90 flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 ml-[3%]"
                >
                  Filter<span><IoFilter /></span>
                </h1>
                <h1
                  onClick={() => setSort(!sort)}
                  className="subHeading text-[#023020] opacity-90 flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 ml-[3%]"
                >
                  Sort by<span><BiSort /></span>
                </h1>
                {sort && (
            <FormControl>
<Select
  labelId="sort-select-label"
  id="sort-select"
  value={sortOption || "created_at-desc"} // Default to "new to old"
  onChange={handleSortChange}
  autoWidth
  sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }}
>
    {/* Date Sorting */}
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="created_at-desc">
      Date, new to old
    </MenuItem>
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="created_at-asc">
      Date, old to new
    </MenuItem>
    {/* Price Sorting */}
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="price-asc">
      Price, low to high
    </MenuItem>
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="price-desc">
      Price, high to low
    </MenuItem>
    {/* Name Sorting */}
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="name-asc">
      Alphabetically, A-Z
    </MenuItem>
    <MenuItem sx={{ fontFamily: 'Amiri serif', fontSize: '14px', color: '#333' }} value="name-desc">
      Alphabetically, Z-A
    </MenuItem>
  </Select>
</FormControl>

                )}
              </div>
              {sPrice !== null && ePrice !== null && (
  <div className="flex md:w-[20%] lg:w-[15%] w-[40%] my-2 md:ml-[1%] ml-[1%] bg-dark-grayish-blue text-white text-sm px-2 py-2 rounded">
    Rs. {sPrice} - Rs. {ePrice}{" "}
    <span
      className="ml-auto text-[18px] hover:cursor-pointer"
      onClick={() => {
        setPriceRange([null,null])
        setSprice(0);   // Reset start price
        setEprice(null); // Reset end price
      }}
    >
      &times;
    </span>
  </div>
)}

            </div>
     <div>
      
       {categoryMode && subcategories?.length > 0 && (
        <div className="flex overflow-x-auto space-x-4 p-3 scrollbar-hide">
          {subcategories?.map((subcategory) => (
            <button
              key={subcategory.subcategory_id}
              onClick={() => {handleSubcategoryClick(subcategory);navigate(`/Categories/${subcategory.name.replace(/ /g, "-")}-${subcategory.subcategory_id}`)}}
              className={`flex flex-col items-center justify-center cursor-pointer 
                transition-all transform hover:scale-110 `}
            >
              <img
                src={import.meta.env.VITE_CLOUD_URL + "/" + subcategory?.images?.[0]?.image || "placeholder.jpg"}
                alt={subcategory.name}
                className={`w-16 h-16 md:w-24 md:h-24 rounded-full object-cover ${
                  selectedSubcategory?.subcategory_id === subcategory.subcategory_id
                    ? "border-2 border-green-500"
                    : ""
                }`}
              />
              <span className="text-sm md:text-lg font-medium mt-1">{subcategory.name}</span>
            </button>
          ))}
        </div>
      )}
     </div>
            <div className={`flex w-full md:px-2 ${categoryMode || subCategoryMode ? "mt-2" : "mt-0" }`}>
  <div
  className={subCategoryMode || (!subCategoryMode && !categoryMode) ? `inline-grid gap-x-3 gap-y-1 mx-auto md:gap-3 
    ${products?.length === 1 ? "grid-cols-1" : ""} 
    ${products?.length === 2 ? "md:grid-cols-4 grid-cols-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"} 
    w-full` : `w-full`}
>
  {(isLoading || isFetching) && !isFetchingNextPage ? ( // Full page loader only on first load
    <FullPageLoader />
  ) : isError ? (
    <p>Error fetching products.</p>
  ) : subCategoryMode || (!subCategoryMode && !categoryMode) ? (
    products?.map((product, index) => (
      <div
        key={product.product_id}
        ref={index === products?.length - 1 ? lastProductRef : null}
      >
        <ProductCard productMode={true} product={product} />
      </div>
    ))
  ) : (
    Object.entries(categorizedProducts)?.map(([categoryName, categoryProducts]) => (
      // <div key={categoryName} className="mb-4 w-full">
      //   <h2 className="text-xl font-semibold mb-1 uppercase ml-[3%] md:ml-[1%]">{categoryName}</h2>
      //  <div className="flex overflow-x-auto md:overflow-x-scroll space-x-3 scrollbar-hide w-full">
      //     {categoryProducts?.map((product, index) => (
      //       <div
      //         key={product?.product_id}
      //         ref={index === categoryProducts.length - 1 ? lastProductRef : null}
      //         className="flex-shrink-0 w-[200px] md:w-[250px] lg:w-[300px] snap-start"
      //       >
      //         <ProductCard productMode={true} product={product} />
      //       </div>
      //     ))}
      //   </div>
      // </div>
       <ProductCarousel
    key={categoryName}
    categoryName={categoryName}
    categoryProducts={categoryProducts}
    lastProductRef={carouselRef}
    hasNextPage={hasNextPage}
    fetchMore={fetchMore}
    isFetchingNextPage={isFetchingNextPage}
  />
    ))
  )}

  {/* Show small loader while fetching more products */}

</div>

</div>

            {hasNextPage && !isFetchingNextPage && !categoryMode ?  (
    <Button
      onClick={loadMoreHandler}
      disabled={isFetchingNextPage}
      className="my-3 px-4"
    >
      {isLoading ? "" : "Load More"}
    </Button>
  ) : isFetchingNextPage && <div className="flex justify-center items-center mx-auto mt-4">
      <ClipLoader size={30} color="green"/>
    </div>}
            {/* <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              className="mt-5 flex justify-center"
            /> */}
          </div>
           
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Products);
