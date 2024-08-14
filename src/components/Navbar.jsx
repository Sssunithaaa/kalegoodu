import React, { useState, useEffect, useContext } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { img1, img2, logo } from '../assets/images';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useStateContext } from '../context/ContextProvider';
import SearchBar from '../searchbar/SearchBar';
import styled from 'styled-components';
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 10px;
  border: none;
  padding-block: 25px;
  display:flex;

  justify-content:center;
  align-items:center;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
const navButtons = [
   { name: "Shop all", href: "/products" },
  { name: "Kitchen decor", href: "/categories/Kitchen-decor/5" },
 
  { name: "Living room decor", href: "/categories/Living-room/6" },
  { name: "Office decor", href: "/categories/Office-decor/7" },
  { name: "Gifting combos", href: "/categories/Gifting-combos/8" },
  {name: "Workshop",href:"/workshop"},
  { name: "Contact us", href: "/contact-us" },
  // { name: "About us", href: "/about-us" }
];

const baseUrl = import.meta.env.VITE_APP_URL
const SideBar = ({ isCartVisible, toggleCart }) => {
  const { cartItems, removeFromCart,increaseQuantity,decreaseQuantity ,cartItemCount,cartTotal} = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 right-0 overflow-y-auto sm:w-[400px] w-full md:max-w-[450px] bg-white h-full shadow-md transition-transform transform z-[10000001] ${
        isCartVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 overflow-y-auto">
        <button className="text-2xl mb-4" onClick={toggleCart}>
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b py-4">
                <img 
  src={item?.images?.[0]?.image ? baseUrl + item.images[0].image : img1} 
  alt={item?.name || "Product Image"} 
  className="w-24 h-24 object-cover" 
/>

                  <div className="ml-4 flex-1">
                    <h2 className="text-md text-left font-bold">{item.name}</h2>
                    <div className="flex items-center">
                      <span className="text-gray-500">Quantity</span>
                      <div className="flex items-center ml-2 border px-2 py-1">
                        <button className="text-md" onClick={()=>decreaseQuantity(item.product_id)}>{"<"}</button>
                        <span className="mx-2 text-left">{item.quantity}</span>
                        <button className="text-md" onClick={()=>increaseQuantity(item.product_id)}>{">"}</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-md font-semibold">Rs. {item.discounted_price !== 0 ? item.discounted_price : item.price}</p>
                    <button onClick={() => removeFromCart(item.product_id)} className="text-red-500 hover:text-red-700">&times;</button>
                  </div>
                </div>
              ))}
              <div className="border-t py-4 flex justify-between items-center">
                <span className="text-md font-bold">TOTAL:</span>
                <span className="text-md font-bold">Rs. {cartTotal}</span>
              </div>
              <Button onClick={() => {
                toggleCart();
                navigate("/Checkout");
              }} className='font-medium'>
                Proceed to checkout
              </Button>
            </>
          ) : (
            <>
              <p className="mt-4">Your Shopping Cart is Empty</p>
              <Button onClick={()=> {toggleCart();navigate("/products")}}>
                Start Shopping
              </Button>
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
  const { cartItemCount, isCartVisible, toggleCart } = useContext(CartContext);

  const [display, setDisplay] = useState("static");

  const toggleSearchbar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleMenuToggle = () => {
    setIsMenuVisible(true);
    setDisplay("fixed");
  };

  const handleMenuToggleOff = () => {
    setIsMenuVisible(false);
    setDisplay("static");
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
   <div className="">
      <div className={`${display} md:static mt-0 w-full m-0 bg-white z-[10001]`}>
        <div className="flex justify-between items-center my-0 mx-auto w-full px-4 z-50">
          <div className='flex justify-between sm:py-3 xs:py-6 py-4 md:py-4 md:pt-0 w-screen md:w-auto'>
            <div className='flex flex-row items-center gap-x-4'>
             <div className='lg:hidden mt-1'>
            <button className="text-2xl">
              {isMenuVisible ? 
                <RiCloseLargeLine size={20} onClick={handleMenuToggleOff} /> : 
                <HiMenuAlt3 size={20} onClick={handleMenuToggle} />
              }
            </button>
          </div>
           <div className='hover:cursor-pointer' onClick={() => navigate("/")}>
            <Title>KALEGOODU</Title>
          </div>
            </div>
              <div className='flex md:hidden flex-row gap-x-5 justify-center items-center'>
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
        </div>
          </div>
          {isMenuVisible && (
            <div id="mega-menu-full-image" className={`items-center justify-between z-40 py-0 w-full block md:flex md:w-auto md:order-1`}>
              <ul className="flex flex-col mt-4 uppercase text-[15px] font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
                {navButtons.map((item, index) =>
                 
                    <li id="nav" onClick={() => navigate(item.href)} key={index} className='md:flex md:mx-auto py-3 px-3 hover:cursor-pointer transition-all duration-500'>
                      <div className="block py-2 px-3 text-gray-900 md:p-0" aria-current="page">
                        <span className='hover:text-black hover:font-semibold'>{item.name}</span>
                      </div>
            <div className="absolute left-0 right-0 bottom-0 h-[4px] bg-orange scale-x-0 transform transition-transform duration-300 origin-bottom-left hover:scale-x-100"></div>
          </li>
      
)}
<li className=' block py-3'>
<button onClick={toggleSearchbar}>
<CiSearch size={20} />
</button>
</li>
<li className=' block py-3'>
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
    className="fixed inset-0 z-40 bg-black opacity-50"
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
