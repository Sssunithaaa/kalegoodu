import React, { createContext, useContext, useState, useEffect } from "react";

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
    // Function to update screenSize based on viewport width
    const updateScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setScreenSize("large"); // Large devices (width >= 1024px)
      } else {
        setScreenSize("mobile"); // Mobile devices (width < 1024px)
      }
    };

    // Initial call to set screenSize
    updateScreenSize();

    // Event listener to update screenSize on window resize
    window.addEventListener("resize", updateScreenSize);

    // Clean-up function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []); // Empty dependency array ensures this effect runs only once

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

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
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
