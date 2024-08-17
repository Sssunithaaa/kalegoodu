import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  
  IconButton,
} from "@material-tailwind/react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {VideoPlayer} from "./Video";
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 0px;
  border: none;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;

export default function ProductCard({ product, index }) {
  const { addToCart, setIsCartVisible } = useContext(CartContext);
  const quantity = 1;

  const handleCartClick = () => {
    addToCart({ ...product, quantity });
    setIsCartVisible(true);
  };

  const baseUrl = import.meta.env.VITE_APP_URL;
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;
  const navigate = useNavigate();
  const displayValue = product?.name.replaceAll(" ", "-");

 return (
    <Card className="w-full max-w-[10rem] md:max-w-[14rem] lg:max-w-[18rem] shadow-lg">
      <CardHeader
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="p-0 mx-2 rounded-none relative"
        floated={false}
        color="blue-gray"
      >
        <img
          src={baseUrl + product?.images[0]?.image}
          alt={product?.name}
          className="w-full h-48 md:h-64 object-cover p-0"
        />
        <div className="absolute inset-0 h-64 w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

        {hasDiscount && (
          <div className="absolute bottom-0 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </CardHeader>

      <CardBody
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="hover:cursor-pointer pb-2 p-[10px] px-[20px]"
      >
        <div className="mb-[2px] flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium text-[15px] md:text-[20px] md:text-md">
            {product?.name}
          </Typography>
        </div>

        <div className="">
          {hasDiscount ? (
            <div className="flex flex-col text-[15px]">
              <Typography color="red">
                <del>Rs. {product?.price}</del>
              </Typography>
              <p className="text-black py-1 text-md">Rs. {product?.discounted_price}</p>
            </div>
          ) : (
            <p className="text-gray-900 py-1 text-md">Rs. {product?.price}</p>
          )}
        </div>
      </CardBody>

     <CardFooter className="py-0  px-0 p-0 mb-2 w-full flex justify-center">
        <Button className="h-[30px] w-[100%] mx-2 md:h-[45px]" onClick={handleCartClick}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}