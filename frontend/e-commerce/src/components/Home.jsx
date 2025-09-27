import React from 'react'
import IMAGE from '../assets/image.jpg'
import R1 from '../assets/r1.jpg'
import R2 from '../assets/r2.jpg'
import BOWLER from '../assets/bowler.jpg'
import G1 from '../assets/g1.jpg'
import H2 from '../assets/h2.jpg'
import R3 from '../assets/r3.jpg'
import W1 from '../assets/w1.jpg'
import N1 from '../assets/n1.jpg'
import HEELS1 from '../assets/heels1.jpg'
import E1 from '../assets/e1.jpg'
import B1 from '../assets/b1.jpg'
import C1 from '../assets/c1.jpg'
import CR from '../assets/cr-1.jpg'
import PUMPS from '../assets/pumps.jpg'
import BACKPACK from '../assets/backpack.jpg'

import { useNavigate } from 'react-router-dom'
const Home = () => {
 
  const navigate = useNavigate()
  const CategoryClick = () => {
    navigate('/productlisting')
  }
  const products = [
    {
      img: R1,
      name: 'Diamond Ring',
      price:  10000
    },
    {
      img: BOWLER,
      name: 'Bowler Bag',
      price: 500
    },
    {
      img: G1,
      name: 'Sunglass',
      price: 300
    },
    {
      img: H2,
      name: 'Hand Bag',
      price:600
    },
    {
      img: R2,
      name: 'Metal Ring',
      price: 2000
    }





  ]
  const category = [
    {
      img: B1,
      name: "Silver Bracelet",
    },
    {
      img: W1,
      name: "Metal Watch",
    },
    {
      img: N1,
      name: "Necklace",
    },
    {
      img: HEELS1,
      name: "Heels",
    },
    {
      img: E1,
      name: "Earrings",
    },
  ]
  const newarrival=[
    {
      img:R3,
      name:"White Gold"
    },
     {
      img:PUMPS,
      name:"Pumps"
    },
     {
      img:BACKPACK,
      name:"Backpack"
    },
     {
      img:CR,
      name:"Couple Ring"
    },
     {
      img:C1,
      name:"CrossBody Bag"
    }
  ]
  return (
   <div className='font-serif opacity-0 animate-fadeIn'>
    {/*Banner */}
      <div className='relative '>
        <img src={IMAGE} className=' h-[24rem] w-full md:h-[36rem]' />
        <h1 className=' text-2xl left-1/4 top-1/3  md:text-5xl font-semibold text-gray-600 absolute  md:top-1/3 md:left-[350px] '>Elevate Your Style with Our Accessories</h1>
        <h3 className='absolute top-[35%] left-1/4 md:top-[40%] md:left-1/3 text-pink-600 mt-20 md:mt-16 font-semibold text-lg md:text-3xl '>Handbags, Watches, Scarves & More</h3>
        <button className='absolute top-[40%] text-white bg-pink-500 md:px-4 px-3 py-2 md:py-3 rounded-full left-1/3 md:left-1/2 mt-32 hover:bg-pink-600'>Shop Now</button>
      </div>
      {/*Featured Products Section*/}
      <div className='mt-8 p-4'>
        <h2 className=' text-2xl md:text-3xl text-sky-800 font-bold text-center'>Featured Products</h2>
        <div className='flex flex-col md:flex-row items-center md:flex-wrap gap-4 justify-between mt-6 '>
          {
            products.map(function (item, id) {

              return (
                <div className='border border-gray-400 rounded-lg p-2 hover:shadow-lg transition-shadow duration-300' key={id}>
                  <img src={item.img} className=' mt-1 w-52 h-52 md:w-64 md:h-64 ' />
                  <h2 className= ' text-lg md:text-xl md:mt-2 text-purple-500 font-semibold text-center'>{item.name}</h2>
                  <h4 className=' text-sm md:text-lg md:mt-2 text-rose-500 text-center'>{item.price}</h4>
                  <button onClick={CategoryClick} className='bg-pink-500 text-white hover:bg-pink-600 rounded-full mt-2 md:mt-3 md:px-4 py-2 px-3 md:py-3 block mx-auto'>Shop Now</button>
                </div>
              )
            })
          }
        </div>
          </div>
        {/*Category Section */}
        <div className='mt-8 p-4'>
          <h2 className=' text-2xl md:text-3xl text-sky-800 font-bold text-center'>Shop by Category</h2>
          <p className='text-fuchsia-500 text-bold text-lg md:text-2xl mt-4 text-center'>Explore a wide variety of styles and accessories that fit every occasion.
            Find your perfect match from rings, bags, watches, and more.  </p>

          <div className='flex flex-col md:flex-row items-center md:flex-wrap gap-4  mt-6 md:mt-8 md:justify-between'>
            {
              category.map(function (item, id) {
                return (
                  <div key={id} className='border border-gray-400 mt-1 rounded-lg p-2 hover:shadow-xl  transition-shadow duration-300 '>
                    <img src={item.img} className=' w-52 h-52 md:w-64 md:h-64' />
                    <h2 className= ' text-lg md:text-xl md:mt-2 text-purple-500 font-semibold text-center'>{item.name}</h2>
                    <button className='  bg-pink-500 text-white hover:bg-pink-600 rounded-full mt-2 md:mt-3 py-2 px-3 md:px-4 md:py-3 block mx-auto' onClick={CategoryClick}>Shop Now</button>
                  </div>
                )

              })
            }
          </div>

        

      </div>
       {/*New arrivals */}
         <div className='mt-8 p-4 '>
          <h2 className= ' text-2xl md:text-3xl text-sky-800 font-bold text-center'>New Arrivals</h2>
          <p className='text-fuchsia-500 text-bold text-lg md:text-2xl mt-4 text-center'>Discover trendy bags, chic heels, and sparkling accessories that define your style
             </p>

          <div className='flex  flex-col items-center md:flex-row md:flex-wrap gap-4 mt-6 md:mt-8 md:justify-between'>
            {
              newarrival.map(function (item, id) {
                return (
                  <div key={id} className='border mt-4 border-gray-400 rounded-lg p-2 hover:shadow-xl  transition-shadow duration-300 scale-105'>
                    <img src={item.img} className=' w-52 h-52 md:w-64 md:h-64' />
                    <h2 className= 'text-lg md:text-xl md:mt-2 text-purple-500 font-semibold text-center'>{item.name}</h2>
                    <button className='bg-pink-500 hover:bg-pink-600  text-white rounded-full mt-2 md:mt-3 md:px-4 md:py-3 px-3 py-2 block mx-auto' onClick={CategoryClick}>Shop Now</button>
                  </div>
                )

              })
            }
          </div>

        

      </div>
   </div>
  )
}

export default Home
