import React, { useState, useEffect,useRef, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
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

const Products = () => {
  const {showSidebar,setShowSidebar} = useStateContext();
  
  const [showOverlay,setShowOverlay] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("created_at-desc");
  const [sPrice, setSprice] = useState(0);
  const [ePrice, setEprice] = useState(null);
  const [price, setPrice] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState(false);
  

  const baseUrl = import.meta.env.VITE_APP_URL;


  const { id, name } = useParams();
  const categoryMode = Boolean(id);
  const location = useLocation();
  
  // Set the selected category on location/name change
  useEffect(() => {
    if (name) {
      setSelectedCategory(name.replaceAll("-", " "));
      
    } else {
      setSelectedCategory("All Products");
    }
  }, [name, location]);






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
  const endpoint = categoryMode
    ? `${baseUrl}/api/products_by_category/${id}/?page=${pageParam}`
    : `${baseUrl}/api/list_products?page=${pageParam}`;

  const params = new URLSearchParams();
  if (keyword) params.append("search", keyword);
  if (sPrice) params.append("min_price", sPrice);
  if (ePrice) params.append("max_price", ePrice);
  if (sortOption) {
    const [field, order] = sortOption.split("-");
    params.append("sort_by", field);
    params.append("sort_order", order);
  }

  const url = `${endpoint}${params.toString() ? "&" + params.toString() : ""}`;
  const { data } = await axios.get(url);
  return data;
};

 const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products_page",id,categoryMode,keyword,sPrice,ePrice,sortOption],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage,allPages) => {
    
    
  return lastPage?.next ? allPages.length + 1 : undefined;
}

  });


 const observerRef = useRef(null);

  const lastProductRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }

      });
         

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage,isLoading]
  );

if (isError) {
  console.error("Error fetching products");
}
const products = data?.pages
  .flatMap((page) => page.results) // Flatten the pages
  .filter((product) => product.visible) || []; 
const loadMoreHandler = () => {
  if (hasNextPage) fetchNextPage();
};





 useEffect(() => {
  
  // Reset sort and filter options when location changes
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
  return (
    <div className="w-screen mb-10">
      <div className="flex flex-col lg:mx-[20px] px-1 lg:px-0 relative">
        <div className="py-1 px-3">
          <h1 className="text-3xl font-semibold">{selectedCategory}</h1>
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
              setSprice={setSprice}
              setEprice={setEprice}
              setKeyword={setKeyword}
              setPrice={setPrice}
              
              handlePriceChange={handlePriceChange}
              toggleSidebar={toggleSidebar}
              location={location}
              searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
            />
          </div>
          <div className="flex-1 p-2">
            <div className="flex flex-col justify-start">
              <div className="flex flex-row max-w-[450px] justify-start items-center gap-x-2">
                <h1
                  onClick={toggleSidebar}
                  className="lg:hidden text-lg flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold ml-[3%]"
                >
                  Filter<span><IoFilter /></span>
                </h1>
                <h1
                  onClick={() => setSort(!sort)}
                  className="text-lg flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold ml-[3%]"
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
        setPrice(false); // Hide the box
        setSprice(0);   // Reset start price
        setEprice(null); // Reset end price
      }}
    >
      &times;
    </span>
  </div>
)}

            </div>

            <div className="flex w-full md:px-2">
              <div
                className={`inline-grid gap-x-3 gap-y-1 mx-auto md:gap-3 
                  ${products?.length === 1 ? "grid-cols-1" : ""} 
                  ${products?.length === 2 ? "md:grid-cols-4 grid-cols-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"} 
                  w-full`}
              >
                {isLoading ? (
                 <FullPageLoader/>
                ) : isError ? (
                  <p>Error fetching products.</p>
                ) : products?.map((product,index) => (
   <div
            key={product.id}
            ref={index === products?.length - 1 ? lastProductRef : null}
          >
            <ProductCard productMode={true} product={product} />
          </div>
  ))
}
              </div>
            </div>
            {hasNextPage && (
    <Button
      onClick={loadMoreHandler}
      disabled={isFetchingNextPage}
      className="my-3 px-4"
    >
      {isLoading ? "Loading..." : "Load More"}
    </Button>
  )}
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
