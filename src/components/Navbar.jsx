import React, { useState, useEffect, useContext } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { img1, img2, logo } from '../assets/images';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useStateContext } from '../context/ContextProvider';
import SearchBar from '../searchbar/SearchBar';
import styled from 'styled-components';
import axios from 'axios';
import { Menu, ShoppingCart,Trash, ChevronDown, X, Search, SearchCheckIcon, SearchIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import { motion } from 'framer-motion';
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
//background-color: #023020;
//color: white;
margin-top: 10px;
  border: none;
  padding-block: 25px;
  display:flex;

  justify-content:center;
  align-items:center;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #023020; /* Slightly darker color */
    opacity: 0.8;
  }
`;
// const navButtons = [
//    { name: "Shop all",category_id:"shop-all", href: "/Products" },
//   { name: "Kitchen decor",category_id:5 ,href: "/Categories/5/Kitchen-Decor" },
 
//   { name: "Living room decor", href: "/Categories/6/Living-Room-Decor" },
//   { name: "Office decor", href: "/Categories/7/Office-Decor" },
//   { name: "Gifting combos", href: "/Categories/8/Gifting-Combos" },
//   {name: "Workshops",href:"/Workshops"},
//   { name: "Contact us", href: "/Contact-us" },
//   {name: "About us",href: "/About-Us"}
//   // { name: "About us", href: "/about-us" }
// ];
const navButtons = 
  [
    {
        name: "Shop All",
        category_id: "shop-all"
    },
    {
        category_id: 5,
        name: "Kitchen And Dining Decor",
        visible: true,
        header: true,
        home_page: true
    },
    {
        category_id: 6,
        name: "Living Room Decor",
        visible: true,
        header: true,
        home_page: true
    },
    {
        category_id: 7,
        name: "Office Decor",
        visible: true,
        header: true,
        home_page: true
    },
    {
        category_id: 8,
        name: "Gifting Combos",
        visible: true,
        header: true,
        home_page: true
    },
    {
        name: "Workshops",
        category_id: "workshop"
    },
    {
        name: "Contact Us",
        category_id: "contact-us"
    },
    {
        name: "About Us",
        category_id: "about-us"
    }

]


const SideBar = ({ isCartVisible, toggleCart }) => {
  const { cartItems, removeFromCart,increaseQuantity,decreaseQuantity ,cartItemCount,cartTotal} = useContext(CartContext);

  const navigate = useNavigate();
   const [errorMessage, setErrorMessage] = useState("");

const handleIncreaseQuantity = (productId, currentQuantity, availableStock) => {
  if (currentQuantity < availableStock) {
    increaseQuantity(productId);
    setErrorMessage(""); // Clear any previous error
  } else {
    setErrorMessage("Requested quantity is not available");
  }
};


  return (
    <div
      className={`fixed top-0 right-0 overflow-y-auto sm:w-[400px] w-full lg:max-w-[450px] bg-white h-full shadow-lg transition-transform transform z-[10000001] ${
        isCartVisible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
     {errorMessage && (
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
        <span>{errorMessage}</span>
        <button onClick={() => setErrorMessage("")} className="ml-4 text-red-500">
          <IoClose />
        </button>
      </div>
    )}
      <div className="p-4 overflow-y-auto">
        <button className=" mb-2 font-bold text-[28px]" onClick={toggleCart}>
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-[24px] font-medium">Shopping Cart</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              {cartItems.map(item => (
               <div key={item.id} className="flex items-center justify-between border-b py-4">
      {/* Product Image */}
      <img
        src={item?.images?.[0]?.image ? import.meta.env.VITE_CLOUD_URL + item?.images?.[0]?.image : img1}
        alt={item?.name || "Product Image"}
        className="w-20 h-20 object-cover rounded-md"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-[15px] md:text-[16px] font-medium truncate w-40 ml-3 text-left">{item.name}</h2>
        
        {/* Discount Badge */}
        {/* <div className="text-xs bg-gray-200 px-2 py-1 w-fit rounded-md flex items-center mt-1">
          <span className="text-gray-700">🏷 FLAT 10% OFF</span>
          <span className="ml-2 text-gray-500">{item.couponCode || "GLYYPF7"}</span>
        </div> */}

        {/* Quantity Selector */}
        {item.availableQuantity > 0 ? (
          <div className="flex ml-3 items-center mt-2">
            <div className="flex items-center">
              <button
                onClick={() => decreaseQuantity(item.product_id)}
                className="px-2 border rounded-l-lg bg-green-200 text-gray-700"
              >
                -
              </button>
              <span className="px-3 border">{item.cartQuantity}</span>
              <button
                onClick={() => handleIncreaseQuantity(item.product_id, item.cartQuantity, item.availableQuantity)}
                className="px-2 border rounded-r-lg bg-green-200 text-gray-700"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <span className="text-red-500">Out of stock</span>
        )}
      </div>

      {/* Price & Delete */}
      <div className="text-right">
        {item.discounted_price !== 0 && (
          <p className="text-gray-500 text-sm line-through">₹{item.price}</p>
        )}
        <p className="text-lg font-medium">₹{item.discounted_price || item.price}</p>
      </div>

      {/* Remove Button */}
      <button onClick={() => removeFromCart(item.product_id)} className="text-gray-500 hover:text-red-500 ml-4">
        <FaTrash size={18} />
      </button>
    </div>
              ))}
              <div className="border-t py-4 flex justify-between items-center">
                <span className=" text-[15px] md:text-[16px] font-bold">TOTAL:</span>
                <span className=" text-[15px] md:text-[16px] font-bold">Rs. {cartTotal}</span>
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
  
  const { screenSize} = useStateContext();
  const [isMenuVisible, setIsMenuVisible] = useState(screenSize === "large");
  const [navButton,setNavButton] = useState("");
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const { cartItemCount, isCartVisible, toggleCart } = useContext(CartContext);
  const [nav,setNav] = useState(navButtons)
  const [display, setDisplay] = useState("static");
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === "/" || location.pathname === "/Customer-details"){
      setNavButton("")
    }
  },[location.pathname])
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

 const { data } = useQuery({
  queryKey: ["header"],
  queryFn: async () => {
    const res = await axios.get(`${import.meta.env.VITE_APP_URL}/api/navbar/categories/`);
    const categories = res.data.categories;
     return [
      { name: "Shop All", category_id: "shop-all" },
      ...categories,
      { name: "Workshops", category_id: "workshop" },
      { name: "Contact Us", category_id: "contact-us" },
      { name: "About Us", category_id: "about-us" }
      
    ]
  }
});
useEffect(() => {
  if (data) {
    setNav(data);
  }
}, [data]);


  return (
   <div className="navbar border-b-2">
      <div className={`${display} lg:static  w-full  bg-white z-[100001]`}>
        <div className="flex lg:flex-row flex-col  justify-between items-center mx-auto w-full  z-50">
          <div className='flex justify-between px-4 lg:py-0 sm:py-2 xs:py-6  w-screen lg:w-auto'>
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
            <SearchIcon size={20} />
          </button>
          </div>
          <div className="relative">
            <button className="text-2xl relative" onClick={toggleCart}>
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
          </div>
          {/* {isMenuVisible && (
            <div id="mega-menu-full-image" className={`items-start justify-between z-40 py-0 w-full block lg:flex lg:w-auto`}>
              <ul className="flex flex-col md:text-[18px]  font-medium lg:flex-row lg:mt-0 lg:space-x-8 rtl:space-x-reverse">
             {nav?.map((item, index) => {
  const formattedName = item.name.replace(/\s+/g, "-"); // Convert spaces to hyphens for consistency

  return (
    <li 
      id="nav"
      key={index}
      onClick={() => {
        if (formattedName === "About-Us") {
          navigate("/About-Us");
        } else if (formattedName === "Contact-Us" || formattedName === "Workshops") {
          navigate(`/${formattedName}`);
        } else if (formattedName === "Shop-All") {
          navigate("/Products");
        } else {
          navigate(`/Categories/${item.category_id}/${formattedName}`);
        }
        setNavButton(item.name);
        handleMenuToggleOff(true);
      }}
      className="lg:flex lg:mx-auto py-2 md:py-3 px-2 hover:cursor-pointer transition-all duration-500"
    >
      <div className="lg:flex lg:mx-auto block pb-1 px-3 md:px-1 lg:px-1 text-gray-900 lg:p-0" aria-current="page">
        <span className={`${navButton === item.name ? "font-semibold" : ""} hover:text-black text-center hover:font-semibold`}>
          {item.name}
        </span>
      </div>
    </li>
  );
})}


         </ul>
       </div>

     )} */}
       <div className="items-start justify-between z-40 hidden py-0 w-full lg:flex lg:w-auto">
     <ul className="flex flex-col md:text-[18px] font-medium lg:flex-row lg:mt-0 lg:space-x-8 rtl:space-x-reverse">
  {nav?.map((item, index) => {
    const formattedName = item.name.replace(/\s+/g, "-");
    const hasSubmenu = item.subcategories && item.subcategories.length > 0;

    return (
      <li
  key={index}
  className="relative lg:flex lg:mx-auto py-2 md:py-3 px-2 hover:cursor-pointer transition-all duration-300"
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
>

        {/* Main Navigation Item */}
        <div
          onClick={() => {
            if (formattedName === "About-Us") {
              navigate("/About-Us");
            } else if (["Contact-Us", "Workshops"].includes(formattedName)) {
              navigate(`/${formattedName}`);
            } else if (formattedName === "Shop-All") {
              navigate("/Products");
            } else {
              navigate(`/Categories/${item.category_id}/${formattedName}`);
            }
            setNavButton(item.name);
          }}
          className="lg:flex lg:mx-auto block pb-1 px-3 md:px-1 lg:px-1 text-gray-900 lg:p-0 items-center space-x-2 relative"
        >
          <span
            className={`${
              navButton === item.name ? "font-semibold text-[#023020]" : ""
            } menu hover:text-[#1D1D1D] text-center`}
          >
            {item.name}
          </span>
        </div>

        {/* Dropdown Menu */}
        {hasSubmenu && hoveredIndex === index && (
          <motion.ul
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="absolute left-0 mt-[40px] bg-gray-50 overflow-hidden border border-gray-200 shadow-lg"
            style={{ width: "150px" }} // ✅ Makes submenu same width as nav button
          >
            {item.subcategories.map((subItem, subIndex) => {
              const slug = `${subItem.name.toLowerCase().replace(/\s+/g, "-")}-${subItem.subcategory_id}`;
              return (
                <li
                  key={subIndex}
                  onClick={() => navigate(`/Categories/${slug}`)}
                  className="px-4 py-2 text-black hover:bg-gray-100 hover:text-[#1D1D1D] cursor-pointer transition"
                >
                  {subItem.name}
                </li>
              );
            })}
          </motion.ul>
        )}
      </li>
    );
  })}
</ul>

    </div>
      <div
        className={`fixed inset-y-0 left-0 w-64 z-[10001] bg-white shadow-lg transform ${
          isMenuVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          {/* <span className="text-lg font-semibold">Menu</span> */}
          <button onClick={handleMenuToggleOff}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          {nav.map((item, index) =>{
            const formattedName = item.name.replace(/\s+/g, "-");
            
            return (
            <div key={index}>
              <button
                onClick={() =>{
                  if (formattedName === "About-Us") {
              navigate("/About-Us");
            } else if (["Contact-Us", "Workshops"].includes(formattedName)) {
              navigate(`/${formattedName}`);
            } else if (formattedName === "Shop-All") {
              navigate("/Products");
            } else {
              navigate(`/Categories/${item.category_id}/${formattedName}`);
            }
            setNavButton(item.name);
            setIsMenuVisible(false);
            setDisplay("static");

                }

                }
                className="flex items-center justify-between w-full px-2 py-2 text-left text-lg hover:bg-gray-100 rounded-md"
              >
                {item.name}
               <span  onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
              }
                >
 {item?.subcategories?.length > 0 && (
    <span
      onClick={(event) => {
        event.stopPropagation(); // Prevents navigation when clicking the chevron
        setOpenDropdown(openDropdown === index ? null : index);
      }}
    >
      <ChevronDown size={20} />
    </span>
  )}               </span>
              </button>

              <Transition
                show={openDropdown === index}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="pl-4">
                  {item?.subcategories?.map((subItem, subIndex) => {
  // Create slug by converting the name to lowercase and replacing spaces with hyphens
  const slug = `${subItem.name.toLowerCase().replace(/\s+/g, "-")}-${subItem.subcategory_id}`;

  return (
    <li
      key={subIndex}
      onClick={() => {navigate(`/Categories/${slug}`);setIsMenuVisible(false); setDisplay("static");}}
       className="block py-1 text-[#1D1D1D] hover:text-black"
    >
      {subItem.name}
    </li>
  );
})}

                </div>
              </Transition>
            </div>
          )})}
        </nav>
      </div>
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
