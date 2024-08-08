import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './SideBar';
import ProductCard from './ProductCard';
import { img11 } from '../assets/images'; // Example images
import { FormControl, Select, MenuItem } from '@mui/material';
import { IoFilter } from 'react-icons/io5';
import { BiSort } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('dateNewToOld');
  const [sPrice, setSprice] = useState(null);
  const [ePrice, setEprice] = useState(null);
  const [sort, setSort] = useState(false);

  const baseUrl = import.meta.env.VITE_APP_URL;

  const { id } = useParams();

  // Fetching products from API
  const { data: productss } = useQuery({
    queryKey: ['productsByCategory', id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/products_by_category/${id}`);
      return response.data.products;
    },
  });

  // Update products when data is fetched
  useEffect(() => {
    if (productss) {
      setProducts(productss);
    }
  }, [productss]);

  // Derived state for sorting
  const sortedProducts = useMemo(() => {
    let sorted = [...products];
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
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="w-screen">
      <div
        className="w-full h-[500px] text-center"
        style={{
          backgroundImage: `url(${img11})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex h-full font-semibold text-pink-700 text-[27px] w-full justify-center items-center">
          SHOP NOW
        </div>
      </div>
      <div className="flex flex-col md:mx-[40px] relative">
        <div className="h-[120px] p-10">
          <h1 className="text-[30px] font-semibold">{selectedCategory} Products</h1>
        </div>
        <div className="flex lg:flex-row flex-col">
          <div
            className={`fixed inset-0 bg-gray-800 bg-opacity-40 z-30 ${
              showSidebar ? 'block' : 'hidden'
            }`}
            onClick={toggleSidebar}
          ></div>
          <div
            className={`fixed bg-white inset-y-0 left-0 z-40 transform ${
              showSidebar ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}
          >
            <Sidebar onCategorySelect={setSelectedCategory} setSprice={setSprice} setEprice={setEprice} />
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-row max-w-[450px] justify-start items-center gap-x-2">
              <h1
                onClick={toggleSidebar}
                className="lg:hidden text-2xl flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold mb-4 ml-[5%]"
              >
                Filter<span>
                  <IoFilter />
                </span>
              </h1>
              <h1
                onClick={() => setSort(!sort)}
                className="text-2xl flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold mb-4 ml-[5%]"
              >
                Sort by<span>
                  <BiSort />
                </span>
              </h1>
              {sort && (
                <div className="flex justify-center items-center mx-auto mb-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts?.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
