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
import Button from "./Button";
import { useStateContext } from "../context/ContextProvider";
import { zoomIn, zoomOut } from "../utils/motion";

// const Button = styled.button`
//   width: 100%;
//   height: 45px;
//   color: black;
//   border: none;
//   cursor: pointer;
//   transition: opacity 0.3s ease, background-color 0.3s ease;
//   border-radius: 5px;
// background-color: #378b29;
// background-image: linear-gradient(315deg, #378b29 0%, #74d680 74%);
//   &:hover {
//     background-color: rgba(0,245,0,1); /* Darker yellow */
//   }

//   opacity: 0; /* Hidden initially */
//   visibility: hidden; /* Ensures it's not interactive initially */

//   @media (max-width: 1024px) {
//     height: 40px;
//   }
// `;
export default function ProductCard({ product, productMode, index, len }) {
  const { addToCart, setIsCartVisible, setLoading } = useContext(CartContext);
  const quantity = 1;

  const { screenSize } = useStateContext();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_URL;
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;
  const displayValue = product?.name.replaceAll(" ", "-");

  const handleCartClick = () => {
    addToCart({ ...product, quantity });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCartVisible(true);
    }, 1000);
  };

  return (
    <Card
      className={`w-full h-auto my-1 py-1 mx-auto shadow-lg hover:transition-transform relative ${
        productMode ? "" : "max-w-[18rem]"
      } md:max-w-[26rem] lg:max-w-[19rem]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="p-0 mx-[2px] rounded-none relative"
        floated={false}
        color="blue-gray"
      >
        <motion.div variants={zoomOut(0.2,1)} className="w-full h-full relative">
          {/* Image Change on Hover */}
          <img
            src={baseUrl + (isHovered && product?.images[1]?.image ? product?.images[1]?.image : product?.images[0]?.image)}
            alt={product?.name}
            className={`w-full h-full ${productMode ? "min-h-40" : "min-h-60 max-h-[250px]"}  sm:min-h-60 md:min-h-64 md:max-h-64 lg:min-h-60 lg:max-h-[270px] object-cover`}
            loading="lazy"
            style={{ borderRadius: "0" }}
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
          {hasDiscount && (
            <div className="absolute bottom-0 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </motion.div>
      </CardHeader>

      <CardBody
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="hover:cursor-pointer pb-2 p-[10px] px-[20px]"
      >
        <div className="mb-[2px] flex h-12 items-center justify-between">
          <Typography className="font-medium my-2 text-[15px] md:text-[16px]">
            {product?.name}
          </Typography>
        </div>

        <div className="h-10 flex items-center">
          {hasDiscount ? (
            <div className="flex flex-col text-[15px]">
              <Typography color="red">
                <del>Rs. {product?.price}</del>
              </Typography>
              <p className="text-black py-1 text-md">
                Rs. {product?.discounted_price}
              </p>
            </div>
          ) : (
            <p className="text-gray-900 py-1 text-md">Rs. {product?.price}</p>
          )}
        </div>
      </CardBody>

      {/* Show button based on screen size */}
      {productMode && (isHovered || screenSize !== "large") && (
        <CardFooter className={`relative flex  justify-center items-center px-2 py-2`}>
          <Button
            onClick={handleCartClick}
            className="w-full text-black"
          >
            Add to cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
