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

export default function CompactProductCard({ product }) {
  const { addToCart, setIsCartVisible, setLoading } = useContext(CartContext);
  const quantity = 1;

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
  className="my-1 mx-auto shadow-lg w-[270px] hover:transition-transform relative"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
   // Adjusted width and max width for larger cards
>
      <CardHeader
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="p-0 mx-[2px] h-[240px] rounded-none relative"
        floated={false}
        color="blue-gray"
         // Fixed height for uniformity
      >
        <motion.div className="relative">
          <img
            src={baseUrl + (isHovered && product?.images[1]?.image ? product?.images[1]?.image : product?.images[0]?.image)}
            alt={product?.name}
            className="h-[100%] w-full object-cover" // Ensures image covers the container without stretching
            loading="lazy"
            style={{ borderRadius: "0" }}
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />

          {hasDiscount && (
            <div className="absolute bottom-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </motion.div>
      </CardHeader>

      <CardBody
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="hover:cursor-pointer pb-1 p-[10px] px-[20px]"
      >
        <div className="mb-[2px] flex h-10 items-center justify-between">
          <Typography className="font-medium my-1 text-[12px] md:text-[14px]">
            {product?.name}
          </Typography>
        </div>

        <div className="h-8 flex items-center">
          {hasDiscount ? (
            <div className="flex flex-col text-[12px]">
              <Typography color="red">
                <del>Rs. {product?.price}</del>
              </Typography>
              <p className="text-black py-0.5 text-sm">
                Rs. {product?.discounted_price}
              </p>
            </div>
          ) : (
            <p className="text-gray-900 py-0.5 text-sm">Rs. {product?.price}</p>
          )}
        </div>
      </CardBody>

   
    </Card>
  );
}
