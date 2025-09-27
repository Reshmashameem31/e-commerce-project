import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState,useContext,useEffect } from 'react'
import { CartContext } from '../CartContext'
const ProductListing = () => {
  const{addToCart}=useContext(CartContext)
  const navigate=useNavigate()
  const ProductClick=(product)=>{
    navigate('/productdetail',{state:product})
    
  }
  const[products,setProducts]=useState([])
  useEffect(() => {
  axios.get('http://localhost:5000/products')
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));
}, []);

  const[searchInput,setSearchInput]=useState('')
  
  const[selectedCategory,setSelectedCategory]=useState('All Categories')
  
 {/* const products = [
    {
      img: R1,
      name: 'Diamond Ring',
    desc:  'Elegant diamond ring perfect for occasions.',

      price: 10000,
      category:"Rings"
       
    },
    {
      img: BOWLER,
      name: 'Bowler Bag',
      price: 500,
      desc: 'Stylish bowler bag for everyday use.' ,
      category:'Bags'
    },
    {
      img: G1,
      name: 'Sunglass',
      price: 300,
      desc: 'Trendy sunglasses with UV protection.' ,
      category:"Sunglasses"
    },
    {
      img: H2,
      name: 'Hand Bag',
      price: 600,
       desc: 'Chic handbag for casual and formal outings.',
       category:'Bags'
      
    },
    {
      img: R2,
      name: 'Metal Ring',
      price: 2000,
      desc: 'Durable metal ring with a sleek design.',
      category:"Rings"
    },
     {
      img: R3,
      name: 'White Gold',
      price: 9000,
      desc: 'Classic white gold ring for a luxurious look.',
      category:"Rings"
    },
     {
      img: W1,
      name: 'Metal Watch',
      price: 1000,
       desc: 'Stylish metal watch to elevate your style.',
       category:'Watches'
    },
     {
      img: N1,
      name: 'Necklace',
      price: 5000,
      desc: 'Elegant necklace perfect for any outfit.' ,
      category:"Necklace"

    },
     {
      img:HEELS1,
      name: 'Heels',
      price: 800,
     desc: 'Elegant necklace perfect for any outfit.' ,
     category:'Heels'
    },
     {
      img: E1,
      name: 'Earrings',
      price: 900,
     desc: 'Beautiful earrings to complement your look.',
     category:'Earrings'
    },
     {
      img: CHOKER,
      name: 'Choker',
      price: 8000,
      desc: 'Trendy choker necklace for a modern touch.',
      category:'Necklace'

    },
     {
      img: B1,
      name: 'Silver Bracelet',
      price: 2000,
      desc: 'Elegant silver bracelet for daily wear.',
      category:'Bracelet'
    },
     {
      img: C1,
      name: 'Crossbody Bag',
      price: 500,
       desc: 'Convenient crossbody bag for hands-free style.',
       category:'Bags'
    },
     {
      img: CR,
      name: 'Couple Ring',
      price: 3000,
   desc: 'Matching couple rings to celebrate love.',
   category:'Rings'
    },
     {
      img: PUMPS,
      name: 'Pumps',
      price: 1000,
       desc: 'Classic pumps for work or parties.' ,
       category:"Heels"
    },
     {
      img: BACKPACK,
      name: 'Backpack',
      price: 700,
       desc: 'Classic pumps for work or parties.' ,
       category:'Bags'
    },
     {
      img: WRAP,
      name: 'Wrap Sunglass',
      price: 400,
       desc: 'Sleek wrap-around sunglasses for sunny days.',
       category:'Sunglasses'
    },
     {
      img: BAGUETTE,
      name: 'Baguette Bag',
      price:800,
       desc: 'Fashionable baguette bag for trendy looks.',
       category:'Bags'
    },
     {
      img: TWIRLING,
      name: 'Twirling Ring',
      price: 4000,
       desc: 'Unique twirling ring with elegant design.',
       category:'Rings'

    },
     {
      img: SMARTWATCH,
      name: 'Smart Wacth',
      price: 3000,
       desc: 'Modern smartwatch with multiple features.' ,
       category:'Watches'
    }
]*/}
 const filteredTerms = products.filter((item) => {
  const matchesSearch = item.name
    .toLowerCase()
    .includes(searchInput.toLowerCase()); 
  const matchesCategory =
    selectedCategory === 'All Categories' || item.category === selectedCategory;

  return matchesSearch && matchesCategory;
});




  return (
    <div className='p-20 font-serif opacity-0 animate-fadeIn'>
     <h1 className=' text-2xl md:text-5xl font-bold text-fuchsia-500 text-center '>Our Products</h1>
     <p className='text-center text-md md:text-2xl text-pink-700 font-semibold p-2  md:p-4 mt-3'>Discover timeless pieces and everyday essentials.  
Shop our curated categories designed to elevate your look.  
</p>
   {/*Search  */}
    <div className='flex-col items-center flex md:flex-row gap-1  md:gap-2 mt-2'>
      <input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} placeholder='Search...' className=' w-56 md:w-full px-4 py-2 md:p-4 rounded-full border border-purple-700  outline-none hover:border-purple-900   '/>
    
   
    {/*Filter */}
    <select className='p-3 mt-2 md:mt-0 text-white outline-none bg-purple-500 rounded-full' value={selectedCategory}
    onChange={(e)=>setSelectedCategory(e.target.value)}
    >
      <option >All Categories</option>
      <option>Rings</option>
      <option>Bags</option>
      <option>Sunglasses</option>
      <option>Bracelet</option>
      <option>Necklace</option>
      <option>Watches</option>
       <option>Heels</option>
         <option>Earrings</option>
    </select>
     </div>
     {/*All Products */}
     <div className='grid md:grid-cols-5 gap-1 md:gap-2 grid-cols-1   mt-6'>
    {
      filteredTerms.map((item,id)=>{
        return(
          
     <div className='border border-gray-400  rounded-lg p-3 md:p-2 m-6  hover:shadow-lg transition-shadow duration-300 cursor-pointer' 
     onClick={()=>ProductClick(item)}
     key={id}>
      <img src={item.img} className='w-full  h-52 md:w-64 md:h-64'/>
     <h4 className='text-center text-base md:text-lg text-purple-500 p-2'>{item.name}</h4>
     <p className='text-center text-base text-rose-500'>{item.desc}</p>
     <p className='text-center text-base text-pink-700 p-2'
    >{item.price}</p>
       <button onClick={(e)=>{
    e.stopPropagation(); 
    addToCart(item);
  }} className='bg-pink-500 hover:bg-pink-600 text-white rounded-full mt-2 md:mt-3 p-2  md:px-4 md:py-3 block mx-auto'>Add to Cart</button>
      </div>
     
       
        )
      })
    }
</div>
     
    </div>
  )
}

export default ProductListing