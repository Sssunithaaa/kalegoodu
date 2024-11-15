import React, { useState } from "react";
import HeroSlider, { Slide, Nav, Overlay } from "hero-slider";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "./Wrapper";
import { useStateContext } from "../../context/ContextProvider";
import 'hero-slider/dist/index.css';
import { img24 } from "../../assets/images";

const Hero = () => {
  const { screenSize, navbarHeight, navbarHeightMobile } = useStateContext();
  const baseUrl = import.meta.env.VITE_APP_URL;

  const sliderHeight =
    screenSize === "large"
      ? `${100 - (navbarHeight / window.innerHeight) * 100}vh`
      : `${100 - (navbarHeightMobile / window.innerHeight) * 100}vh`;

  // Query configuration
  const { 
    data: banner, 
    isInitialLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/banner_images/`);
      if (!response.ok) throw new Error("Failed to fetch banner images.");
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // Cache for 30 minutes
    retry: 2, // Retry twice on failure
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 3000), // Exponential backoff
    refetchOnWindowFocus: false, // No automatic refetch on focus
  });

  return (
    <div style={{ height: sliderHeight }}>
      <HeroSlider
        autoplay
        height={sliderHeight}
        width="100vw"
        className="hero-slider"
        controller={{
          initialSlide: 1,
          slidingDuration: 300,
          slidingDelay: 10,
        }}
        animations
      >
        <Overlay>
          <Wrapper>
            <h2 className="text-3xl uppercase">Transform your space</h2>
            <h3 className="text-xl">Discover the best home decor ideas.</h3>
          </Wrapper>
        </Overlay>

        {/* Display loading placeholder if still loading */}
        {isInitialLoading ? (
          <Slide
            label="Loading"
            background={{
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundImageSrc: img24,
            }}
          />
        ) : isError ? (
          // Display error fallback
          <Slide
            label="Error"
            background={{
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundImageSrc: img1, // Show fallback image on error
            }}
          >
            <Wrapper>
              <h3 className="text-xl text-red-500">
                Failed to load banners: {error.message}
              </h3>
              <button onClick={refetch} className="mt-2 text-blue-500">
                Retry
              </button>
            </Wrapper>
          </Slide>
        ) : (
          // Dynamically create slides based on fetched images
          banner?.banner_images?.map((img, index) => (
            <Slide
              key={index}
              label={`Image ${index + 1}`}
              background={{
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImageSrc: `https://res.cloudinary.com/dgkgxokru/${img.image}`,
              }}
            />
          ))
        )}
        <Nav />
      </HeroSlider>
    </div>
  );
};

export default Hero;
