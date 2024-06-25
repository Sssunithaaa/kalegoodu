import { useState } from 'react';
import { CartCard } from './CartCard';
import { Navigation } from './Navigation';
import { RightNav } from './RightNav';

export const Navbar = ({ cartCounter, setCartCounter }) => {
    
    const [showCart, setShowCart] = useState(false);

    const toggleShowCart = () => {
        setShowCart(!showCart);
    }

    return (
        <div>
            {/* Navbar */}
            <div className='flex justify-between p-5 md:p-8 md:px-0 md:mb-1 md:border-b'>

                {/* Navigation and Logo */}
                <Navigation />

                {/* Cart and Avatar */}
                <RightNav toggleShowCart={toggleShowCart} cartCounter={cartCounter}/>
            </div>

            {/* Cart Card */}
            <CartCard showCart={showCart} cartCounter={cartCounter} setCartCounter={setCartCounter} />
        </div>
    )
}
