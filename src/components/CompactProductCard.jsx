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
  className=" mx-2 shadow-lg my-2 max-w-[270px] inline-block hover:transition-transform relative"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
   // Adjusted width and max width for larger cards
>
      <CardHeader
  onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
  className="p-0 mx-[2px]  rounded-none relative overflow-hidden"
  floated={false}
  color="blue-gray"
>
  <motion.div className="w-full h-full relative">
    <img
      src={
        import.meta.env.VITE_CLOUD_URL +
        (isHovered && product?.images[1]?.image ? product?.images[1]?.image : product?.images[0]?.image)
      }
      alt={product?.name}
      className="h-full w-full min-h-[220px] max-h-[220px] min-w-[240px] max-w-[280px] object-cover object-center" // Ensures focus on the center of the image
      loading="lazy"
      style={{ borderRadius: "0" }}
    />
    <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
  </motion.div>
</CardHeader>

<CardBody
  onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
  className="hover:cursor-pointer pb-1 p-[10px] px-[20px]"
>
   <p className="w-full max-w-[200px] text-name sm:text-name-medium md:text-name-large text-[#1D1D1D] font-medium not-italic leading-[1.3125] tracking-normal normal-case truncate">
  {product?.name}
</p>

  

  {/* Fixed height for price container to align cards with and without discounts */}
 <div className="flex items-center">
          {hasDiscount ? (
            <div className="flex flex-col text-[15px]">
              <Typography color="red">
                <del>Rs. {product?.price}</del>
              </Typography>
              <p className="text-[#023020] opacity-90 font-semibold py-1 text-md">
                Rs. {product?.discounted_price}
              </p>
            </div>
          ) : (
            <p className="text-[#023020] opacity-90 md:text-[17px] md:font-semibold py-1">Rs. {product?.price}</p>
          )}
        </div>
</CardBody>


   
    </Card>
  );
}
