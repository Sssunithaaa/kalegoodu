import { ParallaxBanner } from "react-scroll-parallax";
import { img11 } from "../assets/images";
import "./styles.css"; // Assuming you create this CSS file

export const AdvancedBannerTop = ({img}) => {
  const background = {
    image: img11,
    translateY: [0, 50],
    opacity: [1, 0.3],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    className: "small-image"
  };

  const headline = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="inset center">
        <h1 className="headline white">Hello World!</h1>
      </div>
    )
  };

  const foreground = {
    image: img11,
    translateY: [0, 15],
    scale: [1, 1.1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    className: "small-image"
  };

  const gradientOverlay = {
    opacity: [0, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="gradient inset" />
  };

  return (
    <ParallaxBanner
      layers={[headline, foreground, gradientOverlay]}
      className="full"
    />
  );
};
