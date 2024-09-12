import React, { createContext, useContext, useState, useRef ,useEffect} from "react";

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

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
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

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

   const categoriesRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const aboutUsRef = useRef(null);
  const testimonialsRef = useRef(null);

const scrollToSection = (sectionRef) => {
  const sectionElement = sectionRef.current;
  const sectionHeight = sectionElement.offsetHeight;
  const windowHeight = window.innerHeight;


  console.log(sectionElement)
   console.log(sectionHeight)
    console.log(windowHeight)
  if (sectionHeight < windowHeight) {
    const offset = (windowHeight - sectionHeight) / 2;
    console.log(offset)
    window.scrollTo({
      top: sectionElement.offsetTop - offset,
      behavior: 'smooth',
    });
    document.documentElement.scrollTop = sectionElement.offsetTop - offset; // For most browsers
      document.body.scrollTop = sectionElement.offsetTop - offset;
  } else {
    // If the section is taller or equal to the window's height, just scroll to its top
    sectionElement.scrollIntoView({ behavior: 'smooth' });
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
        categoriesRef,
        newArrivalsRef,
        bestSellersRef,
        aboutUsRef,
        testimonialsRef,
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
