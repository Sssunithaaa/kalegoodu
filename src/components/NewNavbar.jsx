import { useState } from "react";
import { Menu, ShoppingCart, ChevronDown, X, Search } from "lucide-react";
import { Transition } from "@headlessui/react";
import { logo } from "../assets/images";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { name: "Home", sub: [] },
    { name: "Shop", sub: ["All Products", "Best Sellers"] },
    { name: "Categories", sub: ["Men", "Women", "Kids"] },
    { name: "Contact", sub: [] },
  ];

  return (
    <header className="bg-white shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-1 md:px-6">
        {/* Menu Button (Mobile) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-6 text-lg font-medium">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <button className="flex items-center space-x-1 hover:text-gray-700">
                <span>{item.name}</span>
                {item.sub.length > 0 && <ChevronDown size={18} />}
              </button>
              {/* Dropdown for Submenus */}
              {item.sub.length > 0 && (
                <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.sub.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logo */}
        <div className='hover:cursor-pointer' onClick={() => navigate("/")}>
            <img src={logo} alt="" srcset="" className='w-24' />
          </div>

        {/* Cart Button */}
        <button>
          <ShoppingCart size={24} />
        </button>
      </div>

      {/* Search Bar (Only Mobile) */}
      <div className="px-2 py-2 md:hidden">
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      className="w-full border-[2px] border-gray-300 py-2 pl-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
    />
    <button className="absolute px-3 inset-y-0 right-2 flex items-center">
      <Search size={20} className="text-[#9ACB32]" />
    </button>
  </div>
</div>


      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 z-[10001] bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === index ? null : index)
                }
                className="flex items-center justify-between w-full px-4 py-2 text-left text-lg hover:bg-gray-100 rounded-md"
              >
                {item.name}
                {item.sub.length > 0 && <ChevronDown size={20} />}
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
                  {item.sub.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href="#"
                      className="block py-1 text-gray-800 hover:text-black"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              </Transition>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
