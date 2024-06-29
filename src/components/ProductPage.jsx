import { useState } from "react";
import { DetailsSection, Slider } from "./ProductCards";
import Navbar from './Navbar';

function ProductPage() {
  const [cartCounter, setCartCounter] = useState(0);

  return (
    <div>
      <div className="fixed md:static mt-0 z-[100001] navbar w-full m-0">
        <Navbar />
      </div>
      <div className="font-kumbhsans md:max-w-[80%] md:mx-auto md:px-4 pt-[80px] md:pt-[0]">
        <div className="flex flex-col md:flex-row lg:items-start md:px-0 md:gap-6 md:py-20 items-center md:justify-center lg:px-14 lg:gap-16">
          <Slider />
          <DetailsSection cartCounter={cartCounter} setCartCounter={setCartCounter} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
