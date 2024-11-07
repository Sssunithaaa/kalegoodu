import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Sidebar from './SideBar';
import ProductCard from './ProductCard';
import { FormControl, Select, MenuItem } from '@mui/material';
import { IoFilter } from 'react-icons/io5';
import { BiSort } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getAllProducts } from '../services/index/products';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import {Skeleton} from '@mui/material';
import { SectionWrapper } from '../hoc';

const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('dateNewToOld');
  const [sPrice, setSprice] = useState(0);
  const [ePrice, setEprice] = useState(null);
  const [price, setPrice] = useState(false);
  const [keyword, setKeyword] = useState(null);
  const [sort, setSort] = useState(false);

  const baseUrl = import.meta.env.VITE_APP_URL;
  const { id, name } = useParams();
  const location = useLocation()
  useEffect(() => {
    if (name) {
      setSelectedCategory(name.replaceAll("-", " "));
    } else {
      setSelectedCategory("All Products")
    }
  }, [name,location]);

  const categoryMode = Boolean(id);

  // Fetching products from API
  const { data: productss,isLoading, isFetching } = useQuery({
    queryKey: ['productsByCategory', id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/products_by_category/${id}`);
      return response.data.products;
    },
    enabled: categoryMode
  });
  
  const { data, isLoading: pLoading, isFetching: pFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts
  });

  // Update products when data is fetched
  useEffect(() => {
    setProducts(categoryMode ? productss : data);
  }, [productss, data, categoryMode]);

  // Derived state for sorting
  const sortedProducts = useMemo(() => {
    let sorted = products ? [...products] : [];
    switch (sortOption) {
      case 'dateNewToOld':
        sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        break;
      case 'dateOldToNew':
        sorted.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        break;
      case 'priceLowToHigh':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'alphabeticallyAZ':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alphabeticallyZA':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setSort(false)
    return sorted;
  }, [sortOption, products]);

  // Derived state for filtering
  const filteredProducts = useMemo(() => {
    if (sPrice !== null && ePrice !== null) {
      return sortedProducts.filter(
        (product) => product.price >= sPrice && product.price <= ePrice
      );
    }
    return sortedProducts;
  }, [sPrice, ePrice, sortedProducts]);

  // Handle price filter reset
  useEffect(() => {
    if (!price) {
      setProducts(categoryMode ? productss : data);
    }
  }, [price, data, productss, categoryMode]);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

const SkeletonCard = styled.div`
  flex: 1;
  padding: 10px;
 

`;



  const searchKeywordOnSubmitHandler = (event) => {
    event.preventDefault();

    if (!keyword || keyword.trim() === "") {
      setProducts(categoryMode ? productss : data);
    } else {
      const regex = new RegExp(keyword.split('').join('.*'), 'i');
      const filteredProducts = products?.filter((product) =>
        regex.test(product.name)
      );
      setProducts(filteredProducts);
    }

    setTimeout(() => {
      if(window.innerWidth <= 768){
        toggleSidebar()
      }
    }, 1000);
  };
  
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
              showSidebar ? 'translate-x-0' : '-translate-x-full'
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
                  Filter<span>
                    <IoFilter />
                  </span>
                </h1>
                <h1
                  onClick={() => setSort(!sort)}
                  className="text-lg flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold ml-[3%]"
                >
                  Sort by<span>
                    <BiSort />
                  </span>
                </h1>
                {sort && (
                  <div className="flex justify-center items-center mx-auto ml-2">
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
                  </div>
                )}
              </div>
              {price && sPrice !== null && ePrice !== null && (
                <div className="flex md:w-[20%] lg:w-[15%] w-[40%] my-2 md:ml-[2%] ml-[5%] bg-dark-grayish-blue text-white text-sm px-2 py-2 rounded">
                  Rs. {sPrice} - Rs. {ePrice} <span className="ml-auto hover:cursor-pointer" onClick={() => {setPrice(false);setEprice(null)}}>&times;</span>
                </div>
              )}
            </div>
            
 <div className="flex w-full  md:px-2">
    <div className={`inline-grid gap-x-3 gap-y-1 mx-auto md:gap-3 
      ${filteredProducts?.length === 1 ? "grid-cols-1" : ""} 
      ${filteredProducts?.length === 2 ? "md:grid-cols-4 grid-cols-2" : "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"} 
      w-full`}>
    {isLoading  ? 
      Array.from({ length: filteredProducts.length }).map((_, index) => (
              <div key={index} className="px-2 mt-2">
  <Skeleton
    variant="rectangular"
    height={150}
    sx={{
      height: { xs: 100, sm: 150, md: 250 }, // Adjusts height based on screen size
      width: '100%', // Ensures it spans the full width
    }}
  />
  <Skeleton variant="text" width="100%" />
  <Skeleton variant="text" width="40%" />
  <Skeleton variant="text" width="50%" />
</div>

            ))
      : filteredProducts?.map((product, index) => (
  <div key={product.id}>
    <ProductCard 
      productMode={true} 
      index={index} 
      len={filteredProducts?.length} 
      height="48" 
      product={product} 
    />
  </div>
))}

    
  </div>
</div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Products,"");
