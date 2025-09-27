import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CART from '../assets/cart.jpg';

const UserAuthentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/checkout";

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const url = isLogin
      ? "https://e-commerce-backend-o3g3.onrender.com/user/login"
      : "https://e-commerce-backend-o3g3.onrender.com/user/register";

    const body = isLogin ? { email } : { username, email };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }

    if (!res.ok) {
      alert(typeof data === "string" ? data : data.message);
      return;
    }

   
    if (!isLogin) {
     
      alert("Signed up! Please login to continue.");
      navigate("/userauthentication"); 
    } else {
     
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));
      alert("Logged in!");
      navigate(from, { replace: true }); 
    }

  } catch (err) {
    console.error(err);
    alert("Error connecting to server");
  }
};


  return (
    <div 
      className="font-serif min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${CART})` }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 w-4xl md:w-full md:max-w-md">
        <h2 className="text-3xl font-bold text-fuchsia-500 text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col">
              <label className="text-lg text-pink-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="p-2 border border-rose-500 rounded-md outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="text-lg text-pink-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border border-rose-500 rounded-md outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <button 
            type="submit" 
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-md p-2 mt-2 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-700">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserAuthentication;
