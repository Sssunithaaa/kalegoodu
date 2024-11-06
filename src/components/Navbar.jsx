import React, { useState, useEffect, useContext } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { img1, img2, logo } from '../assets/images';

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
   { name: "Shop all", href: "/Products" },
  { name: "Kitchen decor", href: "/Categories/5/Kitchen-Decor" },
 
  { name: "Living room decor", href: "/Categories/6/Living-Room-Decor" },
  { name: "Office decor", href: "/Categories/7/Office-Decor" },
  { name: "Gifting combos", href: "/Categories/8/Gifting-Combos" },
  {name: "Workshops",href:"/Workshops"},
  { name: "Contact us", href: "/Contact-us" },
  {name: "About us",href: "/about-us"}
  // { name: "About us", href: "/about-us" }
];


const SideBar = ({ isCartVisible, toggleCart }) => {
  const { cartItems, removeFromCart,increaseQuantity,decreaseQuantity ,cartItemCount,cartTotal} = useContext(CartContext);
  const navigate = useNavigate();
console.log(cartItems)
  return (
    <div
      className={`fixed top-0 right-0 overflow-y-auto sm:w-[400px] w-full lg:max-w-[450px] bg-white h-full shadow-lg transition-transform transform z-[10000001] ${
        isCartVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 overflow-y-auto">
        <button className=" mb-2 font-bold text-[28px]" onClick={toggleCart}>
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-[24px] font-medium">Shopping Cart</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b py-4">
                <img 
  src={item?.images?.[0]?.image ? "https://res.cloudinary.com/dgkgxokru/" + item?.images?.[0]?.image : img1} 
  alt={item?.name || "Product Image"} 
  className="w-24 h-24 object-cover" 
/>

                  <div className="ml-4 flex-1">
                    <h2 className="text-[16px] text-left font-medium">{item.name}</h2>
                    <div className="flex items-center">
                      <span className="text-gray-500">Quantity</span>
                      <div className="flex items-center ml-2 border px-2 py-1">
                        <button className="text-[16px]" onClick={()=>decreaseQuantity(item.product_id)}>{"<"}</button>
                        <span className="mx-2 text-left">{item.quantity}</span>
                        <button className="text-[16px]" onClick={()=>increaseQuantity(item.product_id)}>{">"}</button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[16px] font-medium">Rs. {item.discounted_price !== 0 ? item.discounted_price : item.price}</p>
                    <button onClick={() => removeFromCart(item.product_id)} className="text-red-500 text-[26px] hover:text-red-700">&times;</button>
                  </div>
                </div>
              ))}
              <div className="border-t py-4 flex justify-between items-center">
                <span className="text-[16px] font-bold">TOTAL:</span>
                <span className="text-[16px] font-bold">Rs. {cartTotal}</span>
              </div>
               <div className='flex flex-row gap-x-2'>
                <Button onClick={() => {
                toggleCart();
                navigate("/Checkout");
              }} className='font-medium'>
                View cart
              </Button>
              <Button onClick={() => {
                toggleCart();
                navigate("/Customer-details");
              }} className='font-medium'>
                Proceed to checkout
              </Button>
               </div>

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
  
  const { screenSize ,aboutUsRef,scrollToSection} = useStateContext();
  const [isMenuVisible, setIsMenuVisible] = useState(screenSize === "large");

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const { cartItemCount, isCartVisible, toggleCart } = useContext(CartContext);

  const [display, setDisplay] = useState("static");

  const toggleSearchbar = () => {
  
    setIsSearchBarVisible(!isSearchBarVisible);
    if(!isSearchBarVisible){
      setDisplay("static")
    }

  };

  const handleMenuToggle = () => {
    setIsMenuVisible(true);
    setDisplay("fixed");
  };

  const handleMenuToggleOff = (redirect) => {
   
    
    if(redirect && window.innerWidth <=820){
       setIsMenuVisible(false)
    }
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
   <div className="navbar">
      <div className={`${display} lg:static  w-full  bg-white z-[100001]`}>
        <div className="flex lg:flex-row flex-col  justify-between items-center mx-auto w-full  z-50">
          <div className='flex justify-between px-4 py-1 lg:py-0 sm:py-3 xs:py-6  w-screen lg:w-auto'>
            <div className='flex flex-row items-center justify-between  gap-x-4'>
             <div className='lg:hidden mt-1'>
            <button className="text-2xl">
              {isMenuVisible ? 
                <RiCloseLargeLine size={20} onClick={handleMenuToggleOff} /> : 
                <HiMenuAlt3 size={20} onClick={handleMenuToggle} />
              }
            </button>
          </div>
           
            </div>
            <div className='hover:cursor-pointer navbar-logo' onClick={() => navigate("/")}>
            <img src={logo} alt="" srcset="" className='w-28' />
          </div>
              <div className='flex lg:hidden flex-row space-x-3 justify-center items-center'>
          <div>
            <button className="text-2xl" onClick={toggleSearchbar}>
            <CiSearch size={20} />
          </button>
          </div>
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
            <div id="mega-menu-full-image" className={`items-start justify-between z-40 py-0 w-full block lg:flex lg:w-auto`}>
              <ul className="flex flex-col md:text-[18px]  font-medium lg:flex-row lg:mt-0 lg:space-x-8 rtl:space-x-reverse">
              {navButtons.map((item, index) =>
  <li 
    id="nav" 
    // onClick={() => item.href === "/about-us" ? {scrollToSection(aboutUsRef); handleMenuToggleOff(true);} : navigate("/</ul>")} 
    onClick={()=>{navigate(`${item.href}`);handleMenuToggleOff(true)}}
    key={index} 
    className='lg:flex lg:mx-auto py-3 px-3 hover:cursor-pointer transition-all duration-500'
  >
    <div className="lg:flex lg:mx-auto block pb-2  px-3 text-gray-900 lg:p-0" aria-current="page">
      <span className='hover:text-black text-center hover:font-semibold'>{item.name}</span>
    </div>
  </li>
)}


         </ul>
       </div>

     )}
     <div className='flex flex-row gap-x-1 lg:gap-x-5'>
      <li className='hidden lg:block py-3 mt-2'>
<button onClick={toggleSearchbar}>
<CiSearch size={20} />
</button>
</li>
<li className='hidden lg:block py-3 mr-3 mt-2'>
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
     </div>
      </div>
  </div>
       <SearchBar isSearchBarVisible={isSearchBarVisible} toggleSearchbar={toggleSearchbar} />
<SideBar isCartVisible={isCartVisible} toggleCart={toggleCart} />
{(isCartVisible || isSearchBarVisible || (isMenuVisible && screenSize !== "large")) && (
  <div
    className="fixed inset-0 z-[10001] bg-black opacity-50"
    onClick={() => {
      if (isCartVisible) {
        toggleCart();
      } else if (isSearchBarVisible) {
        toggleSearchbar();
      } else if (isMenuVisible && screenSize !== "large") {
        handleMenuToggleOff(true);
      }
    }}
  />
)}


     
    </div>

  );
};

export default MegaMenu;
