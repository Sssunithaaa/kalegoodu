import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#140201");
  const [currentMode, setCurrentMode] = useState("Dark");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  // Store the navbar heights in the context
  const [navbarHeight, setNavbarHeight] = useState(130); // Default for desktop
  const [navbarHeightMobile, setNavbarHeightMobile] = useState(160); // Default for mobile

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("large");
      } else {
        setScreenSize("mobile");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });
  const heroRef = useRef(null)
  const categoriesRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const aboutUsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const marqueeRef = useRef(null)

  const scrollToSection = (sectionRef) => {
    const sectionElement = sectionRef.current;
    const sectionHeight = sectionElement.offsetHeight;
    const windowHeight = window.innerHeight;

    if (sectionHeight < windowHeight) {
      const offset = (windowHeight - sectionHeight) / 2;
      window.scrollTo({
        top: sectionElement.offsetTop - offset,
        behavior: "smooth",
      });
    } else {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        heroRef,
        categoriesRef,
        newArrivalsRef,
        bestSellersRef,
        aboutUsRef,
        testimonialsRef,
        marqueeRef,
        scrollToSection,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        navbarHeight, // Provide navbar height in context
        navbarHeightMobile, // Provide mobile navbar height in context
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
