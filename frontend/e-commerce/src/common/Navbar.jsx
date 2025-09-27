import React, { useContext, useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import LOGO from '../assets/logo.png'
const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  
  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out!");
    navigate("/userauthentication");
  };

  return (
    <div className='p-1 bg-pink-300 text-purple-500 flex w-full fixed top-0 left-0 justify-between items-center font-serif z-50'>
           <div className='flex items-center  gap-0'>
  <img src={LOGO} alt="Styliza Logo" className='w-14' />
  <p className=' font-semibold '>Styliza</p>
</div>

     
    


      <Link to='/' className='font-semibold hover:text-purple-600'>Home</Link>
      <Link to='/productlisting' className='hover:text-purple-600 font-semibold'>Products</Link>
      <Link to='/shoppingcart' className='hover:text-purple-600 font-semibold relative'>
        <FaShoppingCart className='md:w-52' />
        {cart.length > 0 && (
          <span className='absolute  -top-3 -right-3 md:-top-4 md:right-20 bg-rose-100 rounded-full px-1 md:px-2 md:py-0.5 text-pink-600 text-xs font-bold shadow'>
            {cart.length}
          </span>
        )}
      </Link>

      {token ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/userauthentication")}
          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-pink-600"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
