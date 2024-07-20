import React, { useState, useEffect } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { img1, img2, logo } from '../assets/images';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import { useStateContext } from '../context/ContextProvider';
import SearchBar from '../searchbar/SearchBar';
const navButtons = [
  { name: "Kitchen decor", href: "/kitchen-decor" },
  { name: "Shop all", href: "/products" },
  { name: "Living room decor", href: "/living-room" },
  { name: "Office decor", href: "/office-decor" },
   { name: "Gifting combos", href: "/gifting-combos" },
  { name: "Contact us", href: "/contact-us" },
  { name: "About us", href: "/about-us" }
];

// const SearchBar = ({ isSearchBarVisible, toggleSearchbar }) => {
//   if (!isSearchBarVisible) {
//     return null; // Return null when the search bar should not be visible
//   }

//   return (
//     <div className="fixed top-10 right-10 w-64 h-10 flex items-center gap-x-2 p-2 shadow-md z-30 bg-white">
//       <input
//         type="text"
//         className="flex-grow p-2 w-full bg-white border border-gray-300 rounded"
//         placeholder="Search..."
//       />
//       <IoClose onClick={toggleSearchbar} size={25} className="cursor-pointer text-gray-900" />
//     </div>
//   );
// };

const SideBar = ({  isCartVisible,toggleCart }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 right-0 sm:w-[400px] w-full md:max-w-[450px] bg-white h-full shadow-md transition-transform transform z-30 ${
        isCartVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <button className="text-2xl mb-4" onClick={toggleCart}>
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b py-4">
                  <img src={item.img} alt={item.name} className="w-24 h-24 object-cover" />
                  <div className="ml-4 flex-1">
                    <h2 className="text-md text-left font-bold">{item.name}</h2>
                    <div className="flex items-center">
                      <span className="text-gray-500">Quantity</span>
                      <div className="flex items-center ml-2 border px-2 py-1">
                        <button className="text-md">{"<"}</button>
                        <span className="mx-2 text-left">{item.quantity}</span>
                        <button className="text-md">{">"}</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-md font-semibold">€{item.price}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                </div>
              ))}
              <div className="border-t py-4 flex justify-between items-center">
                <span className="text-md font-bold">TOTAL:</span>
                <span className="text-md font-bold">€1858</span>
              </div>
              <button onClick={() => navigate("/checkout")} className="w-full bg-[#967b67] text-[18px] text-white py-3 rounded-md font-semibold">
                Proceed to checkout
              </button>
            </>
          ) : (
            <>
              <p className="mt-4">Your Shopping Cart is Empty</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                Start Shopping
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MegaMenu = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { screenSize } = useStateContext();
  const [isMenuVisible, setIsMenuVisible] = useState(screenSize === "large");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const { cartItemCount,isCartVisible,toggleCart } = useContext(CartContext);

  const [display,setDisplay] = useState("static")

  const toggleSearchbar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleMenuToggle = () => {
    setIsMenuVisible(true);
    setDisplay("fixed")

  };

  const handleMenuToggleOff = () => {
    setIsMenuVisible(false);
    setDisplay("static")
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuVisible(true);
      } else {
        setIsMenuVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the state based on the current window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate();
  return (
   <div className=''>
<div className={`${display} border-b-2 md:static mt-0  w-full m-0 bg-white z-[10001]`}>
  <div className="flex flex-row flex-wrap justify-between items-center my-0 mx-auto w-full px-4 z-50">
        <div className='flex justify-between sm:py-3 xs:py-6 py-4 lg:py-4 lg:pt-0 md:py-3 w-screen lg:w-auto'>
          <Title>KALEGOODU</Title>
          <div className='flex lg:hidden flex-row gap-x-5 justify-center items-center'>
            <button className="text-2xl" onClick={toggleSearchbar}>
              <CiSearch size={20} />
            </button>
            <div className="relative">
              <button className="text-2xl relative" onClick={toggleCart}>
                <HiOutlineShoppingBag size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            <button className="text-2xl">
              {isMenuVisible ? <RiCloseLargeLine size={20} onClick={handleMenuToggleOff} /> : <HiMenuAlt3 size={20} onClick={handleMenuToggle} />}
            </button>
          </div>
        </div>
        {isMenuVisible && (
          <div id="mega-menu-full-image" className={`items-center justify-between z-40 py-0 w-full block md:flex md:w-auto md:order-1`}>
            <ul className="flex flex-col mt-4 uppercase text-[15px] font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
              {navButtons.map((item, index) =>
        !item.hasDropdown ? (
          <li id="nav" onClick={()=> navigate(item.href)} key={index} className='relative py-3 px-3 hover:cursor-pointer transition-all duration-500'>
            <div href={item.href} className="block py-2 px-3 text-gray-900   md:p-0" aria-current="page"><span className='hover:text-orange hover:font-medium'>{item.name}</span></div>
            <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-orange scale-x-0 transform transition-transform duration-300 origin-bottom-left hover:scale-x-100"></div>
          </li>
        ) : (
          <li
            key={index}
            className='relative py-3 px-3 transition-all duration-500'
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
  <button
    id="mega-menu-full-cta-image-button"
    data-collapse-toggle="mega-menu-full-image-dropdown"
    className={`flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 hover:text-orange md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 uppercase dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700`}
  >
    {item.name}
    <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
    </svg>
  </button>
  {isDropdownVisible && (
    <div
    id="mega-menu-full-image-dropdown"
    className={`lg:absolute mt-4 z-[100001] bg-white border-gray-200 shadow-sm border-y transition-max-height duration-1000 ease-in-out ${
      isDropdownVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}
  >
    <div className="grid max-w-screen-xl grid-cols-2 gap-x-5 px-6 py-3 mx-auto text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 lg:px-10 lg:py-5 lg:gap-x-10">
      <ul className="mb-4 space-y-4 md:mb-0 md:block" aria-labelledby="mega-menu-full-image-button">
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Online Stores
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Segmentation
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Marketing CRM
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Online Stores
          </a>
        </li>
      </ul>
      <ul className="mb-4 space-y-4 md:mb-0">
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Our Blog
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-orange">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
            License
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
            Resources
          </a>
        </li>
      </ul>
    </div>
  </div>
  )}
</li>
)
)}
<li className='hidden lg:block py-3'>
<button onClick={toggleSearchbar}>
<CiSearch size={20} />
</button>
</li>
<li className='hidden lg:block py-3'>
<div className="relative">
<button className="text-2xl relative" onClick={toggleCart}>
<HiOutlineShoppingBag size={24} />
{cartItemCount > 0 && (
<span className="absolute top-[-4px] right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
{cartItemCount}
</span>
)}
</button>

 </div>
           </li>
         </ul>
       </div>
     )}
      </div>
  </div>
       <SearchBar isSearchBarVisible={isSearchBarVisible} toggleSearchbar={toggleSearchbar} />
<SideBar isCartVisible={isCartVisible} toggleCart={toggleCart} />
{(isCartVisible || isSearchBarVisible || (isMenuVisible && screenSize !== "large")) && (
  <div
    className="fixed inset-0 z-20 bg-black opacity-50"
    onClick={() => {
      if (isCartVisible) {
        toggleCart();
      } else if (isSearchBarVisible) {
        toggleSearchbar();
      } else if (isMenuVisible && screenSize !== "large") {
        handleMenuToggleOff();
      }
    }}
  />
)}


     
    </div>
  );
};

export default MegaMenu;
