import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import Button from "./Button";
import { useStateContext } from "../context/ContextProvider";
import { zoomIn, zoomOut } from "../utils/motion";
import styled from "styled-components";
const Button = styled.button`
  width: auto;
 
  // background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  background-color: #023020;
  color: white;
  font-weight: semibold;
  padding: 5px;
  border: none;
  cursor: pointer;
  display:flex;
  margin-inline:auto;
  justify-content:center;
  align-items:center;
  border-radius: 5px;

  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
export default function ProductCard({ product, productMode, index, len }) {
  const { addToCart, setIsCartVisible, setLoading } = useContext(CartContext);
  
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_URL;
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;
  const displayValue = product?.name?.replaceAll(" ", "-");

  const handleCartClick = () => {
    addToCart({ ...product }, 1);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCartVisible(true);
    }, 1000);
  };

  return (
    // <Card
    //   className={`w-full h-auto my-1 py-1 mx-auto shadow-lg hover:transition-transform  ${
    //     productMode ? "" : "max-w-[18rem]"
    //   } md:max-w-[26rem] lg:max-w-[19rem]`}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    <Card className="relative my-2 w-full  z-10 bg-gray-50 flex rounded-none flex-col grow-0 shrink-0 self-start">
      <CardHeader
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="p-0 m-1 md:m-3 mx-[2px] rounded-none relative"
        floated={false}
        color="blue-gray"
      >
        <motion.div variants={zoomOut(0.2, 1)} className="w-full h-full relative">
  {/* Image Change on Hover */}
  <img
    src={import.meta.env.VITE_CLOUD_URL+ (product?.images?.[0]?.image)}
    alt={product?.name}
    className={`w-full h-full ${productMode ? "min-h-44  max-h-44" : "min-h-60 max-h-60"} sm:min-h-60 md:min-h-56 lg:min-h-[250px] lg:max-h-[250px] object-cover`}
    loading="lazy"
    style={{ borderRadius: "0" }}
  />
  <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

  {hasDiscount && (
    <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 bg-red-500 text-white text-sm px-2 py-1 rounded">
      {discountPercentage}% OFF
    </div>
  )}
</motion.div>

      </CardHeader>

      <CardBody
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className=" pb-2 p-[10px] px-[20px]"
      >
        <div className="flex items-center justify-between">
         {/* <Typography className="name truncate w-full">
  {product?.name}
</Typography> */}
<p className="w-full max-w-[200px] text-name sm:text-name-medium md:text-name-large text-[#1D1D1D] font-medium not-italic leading-[1.3125] tracking-normal normal-case truncate">
  {product?.name}
</p>


        </div>

        <div className="flex items-center">
          {hasDiscount ? (
            <div className="flex flex-col text-[15px]">
              <Typography color="red">
                <del>Rs. {product?.price}</del>
              </Typography>
              <p className="text-[#1D1D1D] py-1 md:text-[17px]">
                Rs. {product?.discounted_price}
              </p>
            </div>
          ) : (
            <p className=" text-[#1D1D1D] md:text-[17px] py-1">Rs. {product?.price}</p>
          )}
        </div>
      </CardBody>

      {/* Show button based on screen size */}
      {/* {productMode && isHovered && (
        // <CardFooter className={` relative justify-center items-center px-2 py-2`}>
        <CardFooter className="absolute right-0 bottom-[1rem] left-0 hidden opacity-0 group-hover:z-50 group-hover:flex group-hover:opacity-100 group-hover:justify-start">
  {product?.quantity === 0 ? (
    <div className="w-full text-center bg-gray-300 text-gray-800 py-2 rounded">
      Out of Stock
    </div>
  ) : (
    <Button onClick={handleCartClick} className="w-full uppercase text-black">
      Add to cart
    </Button>
  )}
</CardFooter>

      )} */}
    </Card>
  );
}
