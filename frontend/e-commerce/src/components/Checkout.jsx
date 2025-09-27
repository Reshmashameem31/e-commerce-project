import React from 'react'
import { useState,useContext } from 'react'
import { CartContext } from '../CartContext'
import { useNavigate } from 'react-router-dom'
import CART from '../assets/cart.jpg'
import axios from 'axios'
const Checkout = () => {
  const navigate=useNavigate()
  const backToHome=()=>{
    navigate('/')
  }
  const{cart,removeFromCart}=useContext(CartContext)
  const[formData,setFormData]=useState({
    name:'',
    address:'',
    card:"",
    cvv:''
  })
  const[orderPlaced,setOrderPlaced]=useState(false)
  const[orderTotal,setOrderTotal]=useState(0)
  const[orderItems,setOrderItems]=useState([])
  const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0)

const placeOrder = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      
       return(navigate('/userauthentication'))
     
    }

    const res = await axios.post(
      'http://localhost:5000/order',
      { items: cart },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setOrderItems(res.data.items);
    setOrderTotal(res.data.totalNumber);
    setOrderPlaced(true);

    cart.forEach(item => removeFromCart(item));
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Something went wrong. Try again!");
  }
};

 if(cart.length===0&&!orderPlaced){
  return <div className='p-32 mt-9 font-serif text-center  text-xl md:text-4xl text-fuchsia-500 font-bold'>
    Your cart is empty
  </div>
 }
  return (
  <div className="font-serif min-h-screen flex items-center  mt-10 px-4 bg-cover bg-center justify-center  "
    style={{ backgroundImage: `url(${CART})` }}
 >
     <div className="absolute inset-0 bg-pink-100 bg-opacity-30"></div>
  {!orderPlaced && (
    <div className="bg-white shadow-lg rounded-2xl z-10 p-6 mt-14 md:mt-0 w-[300px] md:w-full max-w-md">
      <h1 className=" text-xl md:text-2xl text-purple-600 font-bold text-center mb-4">
        Shipping Information
      </h1>
      <form onSubmit={placeOrder} className="flex flex-col gap-3">
        <input
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full p-2 md:p-3 border border-purple-600 outline-none rounded-md focus:ring-2 focus:ring-purple-400"
        />
        <input
          placeholder="Address"
          required
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          className="w-full p-2 md:p-3 border border-purple-600 outline-none rounded-md focus:ring-2 focus:ring-purple-400"
        />

        <h1 className=" text-xl md:text-2xl text-purple-600 font-bold text-center mt-4">
          Payment Information
        </h1>
        <input
          required
          placeholder="Card Number"
          value={formData.card}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, card: e.target.value }))
          }
          className="w-full p-2 md:p-3 border border-purple-600 outline-none rounded-md focus:ring-2 focus:ring-purple-400"
        />
        <input
          required
          placeholder="CVV"
          value={formData.cvv}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, cvv: e.target.value }))
          }
          className="w-full p-2 md:p-3 border border-purple-600 outline-none rounded-md focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 transition text-white rounded-md mt-2 p-2 md:p-3 font-semibold shadow-md"
        >
          Place Order
        </button>
      </form>
    </div>
  )}

  {orderPlaced && (
    <div className="md:w-full w-[350px] z-10  md:max-w-2xl bg-white shadow-lg rounded-2xl p-6">
      <p className="text-green-600 p-8 md:p-0 text-xl md:text-3xl font-bold text-center md:mb-6">
        🎉 Your Order is Placed!
      </p>

      <div className="flex flex-col gap-6">
        {orderItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row  items-center gap-4 border-b pb-4"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-40 h-40  rounded-md shadow"
            />
            <div className="text-center md:text-left">
              <p className="font-semibold text-lg text-purple-500">{item.name}</p>
              <p className="text-pink-600">Price: ₹{item.price}</p>
              <p className="text-rose-600">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-center mt-6 text-pink-600">
        Total: ₹{orderTotal}
      </h2>
      <button onClick={backToHome} className='bg-pink-500 md:px-5 mx-auto block   px-3  md:py-3 py-2 mt-4 md:mt-2 rounded-full hover:bg-pink-700 text-white'>Back to Shop</button>
       <button 
  onClick={() => navigate('/orderhistory')}
  className='bg-purple-500 md:px-5 mx-auto block px-3 md:py-3 py-2 mt-2 rounded-full hover:bg-purple-700 text-white'
>
  View Order History
</button>

    </div>
  )}
</div>

  )
}

export default Checkout