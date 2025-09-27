import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CART from '../assets/cart.jpg'
const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/order')
        setOrders(res.data)
      } catch (err) {
        console.log("Error fetching orders", err)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="p-10 bg-cover bg-center font-serif"    style={{ backgroundImage: `url(${CART})` }}>
       
      <h1 className=" text-center text-xl md:text-3xl mt-6 z-10 text-purple-500 font-bold mb-4">Order History</h1>
      {orders.map(order => (
        <div key={order._id} className="mb-6 bg-pink-100 z-10 p-4 border rounded-lg">
          <p className="font-semibold text-green-400 text-lg md:text-xl ">Order ID: {order._id}</p>
          <p className='text-base md:text-lg text-red-500 font-semibold'>Total: ₹{order.totalNumber}</p>
          <p className='text-sm md:text-base text-rose-400'>Date: {new Date(order.createdAt).toLocaleString()}</p>
          <div className="mt-2">
            {order.items.map(item => (
              <div key={item.productId} className="flex justify-between">
                <p className='text-fuchsia-500 text-sm'>{item.name} x {item.quantity}</p>
                <p className='text-red-500 text-sm'>₹{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory
