import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';
import ProductCard from './ProductCard';
import Navbar from './Navbar';
import { img1, img2, img3, img4,img11 } from '../assets/images'; // Example images
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { IoFilter } from 'react-icons/io5';
import { BiSort } from 'react-icons/bi';
const toTitleCase = (str) => {
  return str
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()); // Capitalize first letter of each word
};


const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('dateNewToOld');

  const location = useLocation();
  const categoryQuery = new URLSearchParams(location.search).get('category');
  
  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(toTitleCase(categoryQuery));
    }
  }, [categoryQuery]);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
    useEffect(() => {
    const fetchProducts = async () => {
      let fetchedProducts = [
        { id: 1, name: 'Home Product 1', category: 'Home Decor', date: new Date(2023, 5, 10), price: 100, img: img1 },
        { id: 2, name: 'Office Product 2', category: 'Office Decor', date: new Date(2023, 6, 15), price: 200, img: img2 },
        { id: 3, name: 'Kitchen Product 3', category: 'Kitchen Decor', date: new Date(2023, 4, 20), price: 50, img: img3 },
        { id: 4, name: 'Hat Product 4', category: 'Hats', date: new Date(2023, 3, 5), price: 70, img: img4 },
      ];

      if (selectedCategory !== 'All') {
        fetchedProducts = fetchedProducts.filter(product => product.category === selectedCategory);
      }

      switch (sortOption) {
        case 'dateNewToOld':
          fetchedProducts.sort((a, b) => b.date - a.date);
          break;
        case 'dateOldToNew':
          fetchedProducts.sort((a, b) => a.date - b.date);
          break;
        case 'priceLowToHigh':
          fetchedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'priceHighToLow':
          fetchedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'alphabeticallyAZ':
          fetchedProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'alphabeticallyZA':
          fetchedProducts.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }

      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, [selectedCategory, sortOption]);
  const [sort,setSort] = useState(false)
  return (
    <div className='w-screen'>
      <div
        className='w-full h-[500px] text-center'
        style={{
          backgroundImage: `url(${img11})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='flex h-full font-semibold text-pink-700 text-[27px] w-full justify-center items-center'>SHOP NOW</div>
      </div>
      <div className="flex flex-col md:mx-[40px] relative">
        <div className='h-[120px] p-10'>
          <h1 className='text-[30px] font-semibold'>{selectedCategory} Products</h1>
        </div>
        <div className='flex lg:flex-row flex-col'>
          <div className={`fixed inset-0 bg-gray-800 bg-opacity-40 z-30 ${showSidebar ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
          <div className={`fixed bg-white inset-y-0 left-0 z-40 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-64`}>
            <Sidebar onCategorySelect={setSelectedCategory} />
          </div>
          <div className="flex-1 p-4">
            <div className="flex flex-row max-w-[450px] justify-start items-center gap-x-2">
               <h1 onClick={toggleSidebar} className="lg:hidden text-2xl flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold mb-4 ml-[5%]">Filter<span><IoFilter/></span></h1>
              <h1 onClick={()=>setSort(!sort)} className="text-2xl flex flex-row hover:cursor-pointer items-center justify-center gap-x-3 font-bold mb-4 ml-[5%]">Sort by<span><BiSort/></span></h1>
             {
              sort &&  <div className="flex justify-center items-center mx-auto mb-4">
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
             }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Products;

