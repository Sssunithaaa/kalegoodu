import { CartProducts } from "./CartProducts";

export const CartCard = ({showCart, cartCounter, setCartCounter}) => {
  return (
    <>
        {
            showCart && (
                <div className='absolute p-2 w-full z-50 rounded-xl md:max-w-md left-0 right-0 mx-auto'>
                    <div className='flex flex-col w-full bg-white border-black rounded-xl shadow-2xl'>

                        {/* Cart span */}
                        <div className='p-5 border-b border-grayish-blue'>
                            <span className='font-bold text-sm'>Cart</span>
                        </div>

                        {/* Products in the Cart */}
                        <div className='p-5'>
                            {
                                (cartCounter === 0) 
                                    // Display if your cart is empty
                                    ? (<div className="flex h-36 justify-center items-center">
                                            <span className="font-bold text-dark-grayish-blue text-lg">Your cart is empty.</span>
                                       </div>
                                    )
                                    // Display if your cart has some products
                                    : (<CartProducts cartCounter={cartCounter} setCartCounter={setCartCounter}/>)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    </>
  )
}
