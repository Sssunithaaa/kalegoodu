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
    <Typography className="font-medium text-wrap h-12 my-1 text-[14px] md:text-[16px]">
      {product?.name}
    </Typography>
  

  {/* Fixed height for price container to align cards with and without discounts */}
  <div className="h-10 flex items-center">
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
      <div className="text-gray-900 py-0.5 text-[12px] flex flex-col">
        <p className="text-black py-0.5 text-sm">
          Rs. {product?.price}
        </p>
        {/* Placeholder element to match the height of the discounted price */}
        <p className="invisible py-0.5 text-sm">Rs. 0</p>
      </div>
    )}
  </div>
</CardBody>


   
    </Card>
  );
}
