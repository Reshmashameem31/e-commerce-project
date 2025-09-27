import React from 'react'
import { FaFacebook,FaInstagram,FaTwitter,FaPhone,FaEnvelope } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate=useNavigate()
  
    const CategoryClick=()=>{
      if(window.location.pathname==='/productlisting'){
        window.scrollTo({top:0,behavior:'smooth'})
      }
    }
    const CartClick=()=>{
      if(window.location.pathname==='/shoppingcart'){
        window.scrollTo({top:0,behavior:'smooth'})
      }
    }
  const HomeClick=()=>{
    if(window.location.pathname==='/'){
      window.scrollTo({top:10,behavior:'smooth'})
    }
    else{
      navigate('/')
    }
  }
    const links=[{
      name:"Silver Bracelet"
    },
  {
    name:"Metal Watch"
  },
  {
    name:'Neckalce'
  },
  {
    name:"Heels"
  },
  {
    name:"Earrings"
  }
  ]
  


  return (
     <div className=' bg-pink-300'>
    <div className='flex-col flex md:flex-row justify-between font-serif p-8 mt-4'>
      {/*Brand */}
      <div>
        <h1 className='text-purple-500 text-xl md:text-3xl p-2 text-center font-semibold'>Styliza</h1>
        <p className='text-center  text-pink-500  mt-2 text-md md:text-lg'>Elevate your style with our trendy accessories.</p>
         <div className='flex gap-4 mt-2 text-purple-500 justify-center items-center text-xl md:text-3xl'>
          <p><FaFacebook/></p>
             <p><FaInstagram/></p>
                <p><FaTwitter/></p>
         </div>
      </div>
     {/*Links */}
          <div>
        <h1 className='text-purple-500 text-xl mt-2 md:text-3xl p-2 text-center font-semibold'>Links</h1>
        
         <div className='flex flex-col text-pink-500 gap-2 p-2   justify-center items-center '>
           <Link to='/' className=' font-semibold hover:underline ' onClick={HomeClick}>Home</Link>
          <Link to='/productlisting' className='  font-semibold hover:underline ' onClick={CategoryClick}>Products</Link>
              <Link  to='/shoppingcart'className='font-semibold hover:underline' onClick={CartClick}>Cart</Link>
         </div>
      </div>
      {/*Categories */}
       <div>
        <h1 className='text-purple-500 text-xl md:text-3xl p-2 text-center font-semibold'>Categories</h1>
        
       
          {
            links.map((items,id)=>{
              return(
         
                <div className='flex flex-col gap-2 p-2 text-pink-500 justify-center items-center 'key={id}>
                <Link to='/productlisting' className='font-semibold hover:underline' onClick={CategoryClick}>{items.name}</Link>
                     </div>)
            })
          }
           

      </div>
      {/*Contact */}
      <div>
        <h1 className='text-purple-500  text-xl md:text-3xl p-2 text-center font-semibold'>Contact Us</h1>
        
         <div className='flex flex-col gap-2 p-2 text-pink-500 justify-center items-center '>
         
           <p className='flex gap-2 items-center font-semibold hover:underline' ><FaPhone/>+91 9645274690</p>
                <p className=' gap-2 items-center  flex font-semibold hover:underline' ><FaEnvelope/>styliza@gmail.com</p>
                   <p className='gap-2 items-center  flex font-semibold hover:underline' ><MdLocationOn/>33/2,South Street,Chennai</p>
   
            
         </div>
    </div>
   
    </div>
     {/*Reserved */}
    <div className='flex flex-row p-2 text-sm md:p-4 justify-center text-pink-500 gap-6'>
        <p className='hover:underline'>&copy;Styliza. All rights reserved.</p>
  
    <div className='flex  gap-1'>
      <p className='hover:underline'>Privacy Policy  |</p>
      <p className='hover:underline'>Terms of Use</p>

    </div>
    </div>
    </div>
  )

}

export default Footer