import React, { useEffect, useState } from "react";
import HeroSlider, { Slide, Nav, Overlay } from "hero-slider";
import { useQuery } from "@tanstack/react-query";
import Wrapper from "./Wrapper";
import { useStateContext } from "../../context/ContextProvider";
import 'hero-slider/dist/index.css';

const Hero = () => {
  const { screenSize, navbarHeight, navbarHeightMobile } = useStateContext(); // Access navbar heights from context
  const [images, setImages] = useState([]);
  const baseUrl = import.meta.env.VITE_APP_URL;

  const { data: banner } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/api/banner_images/`);
      return response.json();
    },
  });

  // useEffect(() => {
  //   if (banner?.banner_images) {
  //     const bannerImages = banner.banner_images.map((image) => ({
  //       image: baseUrl + image.image,
  //     }));
  //     setImages([...bannerImages]);
  //   }
  // }, [banner, baseUrl]);

  // Dynamically adjust height based on screen size and navbar height
 const sliderHeight =
  screenSize === "large"
    ? `${100 - (navbarHeight / window.innerHeight) * 100}vh`
    : `${100 - (navbarHeightMobile / window.innerHeight) * 100}vh`;

   console.log(banner?.test_products)
  return (
    <div style={{ height: sliderHeight }}>
      <HeroSlider
        autoplay
        height={sliderHeight} // Set dynamic height
        width="100vw"
        className="hero-slider"
       controller={{
        initialSlide: 1,
        slidingDuration: 300,
        slidingDelay: 10,
        
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
        animations
      >
        <Overlay>
          <Wrapper>
            <h2 className="text-3xl uppercase">Transform your space</h2>
            <h3 className="text-xl">Discover the best home decor ideas.</h3>
          </Wrapper>
        </Overlay>

        {/* Dynamically create slides based on the fetched images */}
        {banner?.banner_images?.map((img, index) => (
          <Slide
            key={index}
            
            label={`Image ${index + 1}`}
            background={{
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundImageSrc: "https://res.cloudinary.com/dgkgxokru/"+img.image,
            }}
          />
        ))}
        <Nav />
      </HeroSlider>
    </div>
  );
};

export default Hero;
