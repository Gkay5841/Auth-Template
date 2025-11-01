import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeBox = () => setShowBox(false);

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username: Username,
        password: Password,
      });

      console.log("Giriş başarılı", res.data);
      alert("Giriş başarılı ✅");
      navigate('/admin')
    } catch (error) {
      console.error("Giriş yapılamadı:", error);
      setErrorMessage("Kullanıcı adı veya şifre hatalı!");
      setShowBox(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-[90%] max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 transition-all hover:scale-[1.01]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Welcome Back
        </h1>

        <form onSubmit={loginSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-1">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Your username"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </div>
      </div>

      {/* 🔹 Hata Kutusu (Aynı modern pop-up tarzında) */}
      {showBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-10 w-[90%] max-w-lg text-center">
            <h2 className="text-4xl font-bold mb-4 text-red-600">Login Error</h2>
            {errorMessage && (
              <p className="text-lg mb-6 text-gray-800">{errorMessage}</p>
            )}
            <button
              onClick={closeBox}
              className="bg-red-600 text-white px-6 py-3 rounded-xl text-xl font-semibold hover:bg-red-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
