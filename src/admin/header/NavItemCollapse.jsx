import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const NavItemCollapse = ({
  title,
  children,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) {
      setIsChecked(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="d-collapse bg-base-200 min-h-0 rounded-none py-2">
      {/* Checkbox controls the collapse */}
      <input
        type="checkbox"
        className="hidden"  
        checked={isChecked}
        onChange={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      />
      <div
        className={`d-collapse-title font-medium min-h-0 py-0 flex flex-row justify-between items-center gap-x-2 text-lg ${
          name === activeNavName ? "font-bold text-primary" : "font-semibold text-[#343131]"
        }`}
        onClick={() => {
          setActiveNavName(name);
          setIsChecked(!isChecked);
        }}
      >
        <div className="flex items-center gap-x-2">
          {icon}
          {title}
          <IoIosArrowDown/>
        </div>
        {/* Down arrow icon (for toggle) */}
        {/* <svg
          className={`transition-transform w-5 h-5 duration-200 transform ${
            isChecked ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
         
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg> */}
      </div>
      {isChecked && (
        <div className="d-collapse-content">
          <div className="mt-2 flex flex-col gap-y-2">{children}</div>
        </div>
      )}
    </div>
  );
};

export default NavItemCollapse;
