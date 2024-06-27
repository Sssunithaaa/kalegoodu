import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./AdvancedBannerTop";
import "./styles.css";

export default function ParallaxSection() {
  return (
    <ParallaxProvider>
      <AdvancedBannerTop />
      
    </ParallaxProvider>
  );
}
