// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`,
         { name, email, password });
      alert("Signup successful. Please login!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: `
          linear-gradient(90deg, #18c8e6 0%, #4286f4 60%, #686de0 100%),
          repeating-linear-gradient(
            45deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.05) 1px,
            transparent 1px,
            transparent 20px
          )
        `
      }}
    >
      <div className="p-10 rounded-2xl shadow-2xl w-full max-w-md bg-[#232642]/80 backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#202335]/80 border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#202335]/80 border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#202335]/80 border-none rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#374785] text-white py-2 rounded-md hover:bg-[#2c336c] transition-colors duration-300 font-semibold"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
