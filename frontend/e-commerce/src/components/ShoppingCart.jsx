import React, { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
import CART from '../assets/cart.jpg'
const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkOut = () => {
    navigate("/checkout");
  };
  
    const backToHome=()=>{
      navigate('/')
    }
  return (
    <div className="p-32 mt-9  min-h-screen font-serif opacity-0 animate-fadeIn bg-cover bg-center"
    style={{ backgroundImage: `url(${CART})` }}
    >
      {cart.length === 0 ? (
        <div className="text-center">
          <h1 className="text-4xl  text-fuchsia-500 font-bold">Your cart is empty</h1>
            <button onClick={backToHome} className='bg-pink-500 md:px-5 mx-auto block    px-3  md:py-3 py-2 mt-4 md:mt-6 rounded-full hover:bg-pink-700 text-white'>Back to Shop</button>
        </div>
      ) : (
        <div>
          <h1 className=" text-2xl md:text-4xl text-center font-bold text-fuchsia-500">Shopping Cart</h1>

          <div className="mt-6 flex flex-col items-center gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="border border-pink-600 rounded-md w-[300px] md:w-full md:max-w-xl p-4 flex flex-col md:flex-row items-center gap-6"
              >
                <img src={item.img|| "/images/placeholder.jpg"} alt={item.name} className="w-32 h-32" />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl mt-2 font-semibold text-purple-500">{item.name}</h2>
                  <p className="text-rose-500 text-lg mt-2">₹{item.price}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-pink-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="bg-pink-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item)}
                    className="mt-4 md:mt-2 bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total and checkout */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-pink-500">
                Total: <span className="text-red-700 font-normal">₹{total}</span>
              </h2>
              <button
                onClick={checkOut}
                className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
