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
const Button = styled.button`
  width: 100%;
  height: 45px;
background-image: radial-gradient(at 19.76895305229651% 35.01358402821006%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 79.6476490172856% 29.76095796117111%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 80.73001484309323% 71.025398036287%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 74.71274406155253% 92.17335404339366%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 41.223261123520594% 30.917984618376227%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 37.9520129096355% 60.069337551017334%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 67.69235280932718% 23.91998376199933%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 93.68255347726229% 18.89111181278711%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 13.215737665881534% 45.21500942396648%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%), radial-gradient(at 61.18443079724643% 88.41983116607912%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 1) 0%, hsla(64.40366972477065, 83.20610687022904%, 74.31372549019608%, 0) 100%), radial-gradient(at 10.575958325731749% 96.72193910560092%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 1) 0%, hsla(140.5263157894737, 43.18181818181818%, 82.74509803921568%, 0) 100%), radial-gradient(at 75.42341628599371% 53.31130723888271%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 1) 0%, hsla(113.55704697986577, 77.20207253886008%, 62.15686274509804%, 0) 100%);
  margin-top: 10px;
  border: none;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }
`;
export default function ProductCard({ product }) {
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
  const navigate = useNavigate()
     const displayValue = product?.name.replaceAll( " ","-");

  return (
    <Card className="w-full max-w-[22rem] shadow-lg">
      <CardHeader onClick={() => navigate(`/products/${product?.product_id}/${displayValue}`)}  className="p-0" floated={false} color="blue-gray">
        <img
          src={baseUrl + product?.images[0]?.image}
          alt={product?.name}
          className="w-full h-72 object-cover p-0"
        />
        <div className="absolute inset-0 h-72 w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
      </CardHeader>

      <CardBody onClick={() => navigate(`/products/${product?.product_id}/${displayValue}`)} className="hover:cursor-pointer pb-2 p-[10px] px-[26px]">
        <div className="mb-[2px] h-16 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium ">
            {product?.name}
          </Typography>
          <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {product?.rating ? 5 : 5}
          </Typography>
        </div>

        <div className="my-[2px]">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-black py-1 text-md">Rs. {product?.discounted_price}</p>
              <Typography color="red" className="text-sm">
                <del>Rs. {product?.price}</del>
              </Typography>
              <Typography className="text-green-700 font-bold text-sm">
                {discountPercentage}% off
              </Typography>
            </div>
          ) : (
            <p className="text-gray-900 py-1 text-md">Rs. {product?.price}</p>
          )}
        </div>
      </CardBody>

      <CardFooter className="py-0 mb-3 pb-[2px]">
        <Button onClick={handleCartClick} >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
