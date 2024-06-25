import React from 'react'

export const RightNav = ({toggleShowCart, cartCounter}) => {
  return (
    <div className='flex gap-5 relative'>
        {/* Cart */}
        <button onClick={ toggleShowCart } className='w-6 my-auto relative flex items-center'>
            {/* Amount of Products in Cart */}
            {
                cartCounter !== 0
                    && (
                        <span className='absolute -top-[5px] -right-1 text-[10px] font-bold text-white bg-orange px-[6px] rounded-full'>{cartCounter}</span>
                    )
            }
            {/* Cart Image */}
            <div>
                <img className='w-full' src="./images/icon-cart.svg" alt="" />
            </div>
        </button>
        {/* Avatar */}
        <div className='w-6 md:w-12'>
            <img className='' src="./images/image-avatar.png" alt="" />
        </div>

    </div>
  )
}
