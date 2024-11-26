import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "./SideBar";
import ProductCard from "./ProductCard";
import { FormControl, Select, MenuItem } from "@mui/material";
import { IoFilter } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination"; // Material-UI Pagination
import { SectionWrapper } from "../hoc";

const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortOption, setSortOption] = useState("dateNewToOld");
  const [sPrice, setSprice] = useState(0);
  const [ePrice, setEprice] = useState(null);
  const [price, setPrice] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setItemsPerPage] = useState(2);

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

  // Fetch products using `useQuery`
  const fetchProducts = async (page) => {
    const endpoint = categoryMode
      ? `${baseUrl}/api/products_by_category/${id}?page=${page}&limit=${itemsPerPage}`
      : `${baseUrl}/api/list_products?page=${page}`;

    const { data } = await axios.get(endpoint);
    console.log(data)
    return data;
  };
  
  const { data, isLoading, error } = useQuery({
    queryKey : ["products", currentPage],
    queryFn : () => fetchProducts(currentPage),
    
});

const products = data?.results || [];
const totalCount = data?.count || 0;
const totalPages = Math.ceil(totalCount/itemsPerPage);
useEffect(()=>{
   setItemsPerPage(data?.results?.length)
},[products])
console.log(totalPages)
  console.log(currentPage)
  // Memoized sorting function
  const sortedProducts = useMemo(() => {
    if (!products) return [];

    const sorted = [...products];
    switch (sortOption) {
      case "dateNewToOld":
        return sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      case "dateOldToNew":
        return sorted.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
      case "priceLowToHigh":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return sorted.sort((a, b) => b.price - a.price);
      case "alphabeticallyAZ":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "alphabeticallyZA":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  }, [sortOption, products]);

  // Memoized filtering function
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(
      (product) =>
        (sPrice === null || product.price >= sPrice) &&
        (ePrice === null || product.price <= ePrice) &&
        (!keyword || new RegExp(keyword.split("").join(".*"), "i").test(product.name))
    );
  }, [sortedProducts, sPrice, ePrice, keyword]);

  const toggleSidebar = () => setShowSidebar((prev) => !prev);

  const searchKeywordOnSubmitHandler = useCallback((event) => {
    event.preventDefault();
    setKeyword((prevKeyword) => (prevKeyword ? prevKeyword.trim() : null));

    if (window.innerWidth <= 768) {
      setTimeout(toggleSidebar, 1000);
    }
  }, []);

  

  return (
    <div className="w-screen mb-10">
      <div className="flex flex-col lg:mx-[20px] px-1 lg:px-0 relative">
        <div className="py-1 px-3">
          <h1 className="text-3xl font-semibold">{selectedCategory}</h1>
        </div>
        <div className="flex lg:flex-row flex-col">
          {showSidebar && (
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
              toggleSidebar={toggleSidebar}
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
                  <FormControl sx={{ m: 1, minWidth: 120, maxHeight: 70 }}>
                    <Select
                      labelId="sort-select-label"
                      id="sort-select"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      autoWidth
                    >
                      <MenuItem value="dateNewToOld">Date, new to old</MenuItem>
                      <MenuItem value="dateOldToNew">Date, old to new</MenuItem>
                      <MenuItem value="priceLowToHigh">Price, low to high</MenuItem>
                      <MenuItem value="priceHighToLow">Price, high to low</MenuItem>
                      <MenuItem value="alphabeticallyAZ">Alphabetically, A-Z</MenuItem>
                      <MenuItem value="alphabeticallyZA">Alphabetically, Z-A</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
              {price && sPrice !== null && ePrice !== null && (
                <div className="flex md:w-[20%] lg:w-[15%] w-[40%] my-2 md:ml-[2%] ml-[5%] bg-dark-grayish-blue text-white text-sm px-2 py-2 rounded">
                  Rs. {sPrice} - Rs. {ePrice}{" "}
                  <span
                    className="ml-auto hover:cursor-pointer"
                    onClick={() => {
                      setPrice(false);
                      setEprice(null);
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
                  ${filteredProducts?.length === 1 ? "grid-cols-1" : ""} 
                  ${filteredProducts?.length === 2 ? "md:grid-cols-4 grid-cols-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"} 
                  w-full`}
              >
                {isLoading ? (
                 <div className="w-full h-full flex items-center justify-center">
                   <ClipLoader size={50} color="#123abc" />
                 </div>
                ) : error ? (
                  <p>Error fetching products.</p>
                ) : (
                  filteredProducts.map((product) => (
                   <div key={product?.product_id}>
                     <ProductCard
                      
                      productMode={true}
                      product={product}
                    />
                   </div>
                  ))
                )}
              </div>
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              variant="outlined"
              shape="rounded"
              className="mt-5 flex justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Products);
