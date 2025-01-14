// import React, { useState, useEffect, useCallback } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import Sidebar from "./SideBar";
// import ProductCard from "./ProductCard";
// import { FormControl, Select, MenuItem } from "@mui/material";
// import { IoFilter } from "react-icons/io5";
// import { BiSort } from "react-icons/bi";
// import axios from "axios";
// import { SectionWrapper } from "../hoc";
// import FullPageLoader from "./FullPageLoader";
// import { useStateContext } from "../context/ContextProvider";
// import { useInfiniteQuery } from "@tanstack/react-query";

// const Products = () => {
//   const {showSidebar,setShowSidebar} = useStateContext();
  
//   const [showOverlay,setShowOverlay] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("All Products");
//   const [sortOption, setSortOption] = useState(null);
//   const [sPrice, setSprice] = useState(0);
//   const [ePrice, setEprice] = useState(null);
//   const [price, setPrice] = useState(false);
//   const [keyword, setKeyword] = useState(null);
//   const [sort, setSort] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
  




//   const baseUrl = import.meta.env.VITE_APP_URL;
//   const { id, name } = useParams();
//   const categoryMode = Boolean(id);
//   const location = useLocation();

//   // Set the selected category on location/name change
//   useEffect(() => {
//     if (name) {
//       setSelectedCategory(name.replaceAll("-", " "));
      
//     } else {
//       setSelectedCategory("All Products");
//     }
//   }, [name, location]);



// const fetchProducts = async ({ pageParam = 1 }) => {
//   const endpoint = categoryMode
//     ? `${baseUrl}/api/products_by_category/${id}/?page=${pageParam}`
//     : `${baseUrl}/api/list_products?page=${pageParam}`;

//   const params = new URLSearchParams();
//   if (keyword) params.append("search", keyword);
//   if (sPrice) params.append("min_price", sPrice);
//   if (ePrice) params.append("max_price", ePrice);
//   if (sortOption) {
//     const [field, order] = sortOption.split("-");
//     params.append("sort_by", field);
//     params.append("sort_order", order);
//   }

//   const url = `${endpoint}${params.toString() ? "&" + params.toString() : ""}`;
//   const { data } = await axios.get(url);
//   return data;
// };




//   const toggleSidebar = () =>{ setShowSidebar((prev) => !prev)

//     setShowOverlay(true);
//   };

//   const searchKeywordOnSubmitHandler = useCallback((event) => {
//     event.preventDefault();
//     setKeyword((prevKeyword) => (prevKeyword ? prevKeyword.trim() : null));

//     if (window.innerWidth <= 768) {
//       setTimeout(toggleSidebar, 1000);
//     }
//   }, []);

// const handlePriceChange = (start, end) => {
//   setSprice(start || 0);
//   setEprice(end || null);
  
//   setCurrentPage(1); // Reset to first page
// };
// const handleSortChange = (event) => {
//   setSortOption(event.target.value);
//   setCurrentPage(1); // Reset to first page
// };



//   useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth > 1024) {
//       setShowSidebar(false); // Ensure sidebar is closed
//       setShowOverlay(false); // Remove the overlay
//     }
//   };

//   window.addEventListener("resize", handleResize);
//   return () => window.removeEventListener("resize", handleResize); // Cleanup listener
// }, []);

// const {
//   data,
//   isLoading,
//   isError,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// } = useInfiniteQuery({
//   queryKey: ["products", categoryMode, id, keyword, sPrice, ePrice, sortOption],
//   queryFn: fetchProducts,
//   getNextPageParam: (lastPage, pages) => {
//     return lastPage.next ? pages.length + 1 : undefined; // Use 'next' from API response
//   },
// });

// const products = data?.pages
//   .flatMap((page) => page.results) // Flatten the pages
//   .filter((product) => product.visible) || []; // Filter products based on 'visible' field

// const loadMoreHandler = () => {
//   if (hasNextPage) fetchNextPage();
// };




 

//   return (
//      <div className="w-screen mb-10">
//     <div className="flex flex-col lg:mx-[20px] px-1 lg:px-0 relative">
//       <div className="py-1 px-3">
//         <h1 className="text-3xl font-semibold">{selectedCategory}</h1>
//       </div>
//       <div className="flex lg:flex-row flex-col">
//         {showSidebar && showOverlay && (
//           <div
//             className="fixed inset-0 bg-gray-800 bg-opacity-40 z-40"
//             onClick={toggleSidebar}
//           ></div>
//         )}
//         <div
//           className={`fixed bg-white inset-y-0 left-0 z-40 transform ${
//             showSidebar ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}
//         >
//           <Sidebar
//             onCategorySelect={setSelectedCategory}
//             setSprice={setSprice}
//             setEprice={setEprice}
//             setKeyword={setKeyword}
//             setPrice={setPrice}
//             handlePriceChange={handlePriceChange}
//             toggleSidebar={toggleSidebar}
//             searchKeywordOnSubmitHandler={searchKeywordOnSubmitHandler}
//           />
//         </div>
//         <div className="flex-1 p-2">
//           <div className="flex flex-col justify-start">
//             <div className="flex flex-row max-w-[450px] justify-start items-center gap-x-2">
//               <h1
//                 onClick={toggleSidebar}
//                 className="lg:hidden text-lg flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold ml-[3%]"
//               >
//                 Filter<span><IoFilter /></span>
//               </h1>
//               <h1
//                 onClick={() => setSort(!sort)}
//                 className="text-lg flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold ml-[3%]"
//               >
//                 Sort by<span><BiSort /></span>
//               </h1>
//               {sort && (
//                 <FormControl>
//                   <Select
//                     value={sortOption}
//                     onChange={handleSortChange}
//                     autoWidth
//                     inputProps={{
//                       style: { fontFamily: "Amiri serif", fontSize: "14px" },
//                     }}
//                   >
//                     {/* Sort Options */}
//                     <MenuItem value="created_at-desc">Date, new to old</MenuItem>
//                     <MenuItem value="created_at-asc">Date, old to new</MenuItem>
//                     <MenuItem value="price-asc">Price, low to high</MenuItem>
//                     <MenuItem value="price-desc">Price, high to low</MenuItem>
//                     <MenuItem value="name-asc">Alphabetically, A-Z</MenuItem>
//                     <MenuItem value="name-desc">Alphabetically, Z-A</MenuItem>
//                   </Select>
//                 </FormControl>
//               )}
//             </div>
//           </div>
//           <div className="flex w-full md:px-2">
//             <div
//               className={`inline-grid gap-x-3 gap-y-1 mx-auto md:gap-3 
//                 ${products.length === 1 ? "grid-cols-1" : ""} 
//                 ${products.length === 2 ? "md:grid-cols-4 grid-cols-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"} 
//                 w-full`}
//             >
//               {isLoading || isFetchingNextPage ? (
//                 <FullPageLoader />
//               ) : isError ? (
//                 <p>Error fetching products.</p>
//               ) : (
//                 products.map((product) => (
//                   <ProductCard key={product.product_id} product={product} />
//                 ))
//               )}
//             </div>
//           </div>
//           {hasNextPage && (
//             <button onClick={loadMoreHandler} disabled={isFetchingNextPage}>
//               {isFetchingNextPage ? "Loading..." : "Load More"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default SectionWrapper(Products);
