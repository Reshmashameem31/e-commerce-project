import axios from "axios"
import { createContext ,useState,useEffect} from "react"

 export const CartContext=createContext()
 export  const CartProvider=({children})=>{
  const[cart,setCart]=useState([])
  //Get cartitems when page loads
  useEffect(()=>{
    fetchCart()
  },[])
      const fetchCart=async ()=>{
        try{
             const res= await axios.get("https://e-commerce-backend-o3g3.onrender.com/cart")
        setCart(res.data)
        }
        catch(err){
        console.log(err)
        }
       
      }

  //adding products to cart 
  const addToCart= async (product)=>{
   try{
         const existing=cart.find((item)=>item.productId===product._id)
     if(existing){
     await increaseQuantity(existing)
     }
     else{
      const res= await axios.post('https://e-commerce-backend-o3g3.onrender.com/cart',
        {
          productId:product._id,
          name:product.name,
          price:product.price,
          img:product.img,
          quantity:1
        }
      )
      setCart((prev)=>[...prev,res.data])
     }
   }
   catch(err){
    console.log("Error",err)
   }
  
  }

    //increasing quantity
    const increaseQuantity=async (cartItem)=>{
      try{
           const res= await axios.put(`https://e-commerce-backend-o3g3.onrender.com/cart/${cartItem._id}`,{
      quantity:cartItem.quantity+1
     })
     setCart(prev=>prev.map(item=>item._id==res.data._id?res.data:item))
      }
      catch(err){
        console.log("Error",err)
      }
    
    }
    //decreasing quantity
   const decreaseQuantity=async (cartItem)=>{
    try{
          const res= await axios.put(`https://e-commerce-backend-o3g3.onrender.com/cart/${cartItem._id}`,{
      quantity:cartItem.quantity-1
    })
    setCart(prev=>prev.map(item=>item._id==res.data._id?res.data:item))
    }
    catch(err){
       console.log("Error",err)
    }
   }
    //removing product
    const removeFromCart=async (cartItem)=>{
      try{
            await axios.delete(`https://e-commerce-backend-o3g3.onrender.com/cart/${cartItem._id}`)
        setCart(prev=>prev.filter(item=>item._id!==cartItem._id))
      }
       catch(err){
        console.log("Error",err)
       }
    }
 return(
  <CartContext.Provider value={{cart,addToCart,increaseQuantity,decreaseQuantity,removeFromCart}}>
    {children}
  </CartContext.Provider>
 )


 }

 

  
