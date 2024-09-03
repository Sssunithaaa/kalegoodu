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
  height: 40px;
  background-image: radial-gradient(at 19.8% 35.0%, hsla(64.4, 83.2%, 74.3%, 1) 0%, hsla(64.4, 83.2%, 74.3%, 0) 100%),
    radial-gradient(at 79.6% 29.8%, hsla(140.5, 43.2%, 82.7%, 1) 0%, hsla(140.5, 43.2%, 82.7%, 0) 100%),
    radial-gradient(at 80.7% 71.0%, hsla(113.6, 77.2%, 62.2%, 1) 0%, hsla(113.6, 77.2%, 62.2%, 0) 100%);
  margin-top: 0px;
  border: none;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #9e7f6b; /* Slightly darker color */
  }

  @media (max-width: 1024px) {
    height: 35px;
  }
`;

export default function ProductCard({ product, productMode, index, len }) {
  const { addToCart, setIsCartVisible, setLoading } = useContext(CartContext);
  const quantity = 1;

  const handleCartClick = () => {
    addToCart({ ...product, quantity });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCartVisible(true);
    }, 1000);
  };

  const baseUrl = import.meta.env.VITE_APP_URL;
  const hasDiscount = product?.discounted_price > 0;
  const discountPercentage = hasDiscount
    ? Math.round(((product?.price - product?.discounted_price) / product?.price) * 100)
    : 0;
  const navigate = useNavigate();
  const displayValue = product?.name.replaceAll(" ", "-");

  return (
    <Card
      className={`w-full h-auto my-1 py-1 mx-auto shadow-lg ${
        productMode ? 'max-w-[11rem]' : 'max-w-[20rem]'
      } md:max-w-[26rem] lg:max-w-[19rem]`}
    >
      <CardHeader
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="p-0 mx-[2px] rounded-none relative"
        floated={false}
        color="blue-gray"
      >
        <div className="w-full h-full relative">
          <img
            src={baseUrl + product?.images[0]?.image}
            alt={product?.name}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ borderRadius: '0' }}
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
          {hasDiscount && (
            <div className="absolute bottom-0 left-0 bg-red-500 text-white text-sm px-2 py-1 rounded">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
      </CardHeader>

      <CardBody
        onClick={() => navigate(`/Products/${product?.product_id}/${displayValue}`)}
        className="hover:cursor-pointer pb-2 p-[10px] px-[20px]"
      >
        <div className="mb-[2px] flex h-12 items-center justify-between">
          <p color="blue-gray" className="font-medium my-2 text-[15px] md:text-[16px]">
            {product?.name}
          </p>
        </div>

        <div className="h-10 flex items-center">
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

      <CardFooter className="py-0 bottom-0 px-0 p-0 mb-2 w-full flex justify-center">
        <Button className="h-[30px] w-[100%] mx-2 md:h-[45px]" onClick={handleCartClick}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
