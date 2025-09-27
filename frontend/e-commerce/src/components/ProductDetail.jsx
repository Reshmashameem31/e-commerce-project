import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../CartContext'
const ProductDetail = () => {
  const {addToCart}=useContext(CartContext)
  const location=useLocation()
  const product=location.state
  return (
    <div className='flex flex-col md:flex-row gap-6 p-16  font-serif  justify-center opacity-0 animate-fadeIn'>
      <Link to='/productlisting' className='text-purple-600 mt-4 text-md md:text-lg font-semibold  hover:underline'> ← Go Back</Link>
      <img src={product.img} className=' w-52 h-52 md:w-96 md:h-96 border border-pink-600   rounded-full'/>
      <div className='flex flex-col gap-4 text-center items-center justify-center'>
         <h1 className='text-2xl md:text-4xl p-2 text-purple-500'>{product.name}</h1>
         <p className='text-rose-500 p-2 text-lg md:text-2xl '>{product.desc}</p>
         <p className='text-pink-700 p-2 text-base md:text-xl'>{product.price}</p>
          <button onClick={()=>addToCart(product)} className='bg-pink-500 hover:bg-pink-600 text-white rounded-full mt-3 p-2 md:px-4 md:py-3 block mx-auto'>Add to Cart</button>
         </div>
    </div>
  )
}

export default ProductDetail