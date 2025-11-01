import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Signup = () => {
  const navigate = useNavigate()

  const [Email, setEmail] = useState("")
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showBox, setShowBox] = useState(false)

  const closeBox = () => setShowBox(false)

  const signSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        email: Email,
        username: Username,
        password: Password
      })

      console.log("Kayıt başarılı", res.data)
      navigate("/login")

    } catch (error) {
      setErrorMessage("Don't create user, please try again.")
      setShowBox(true)
      console.error("Kayıt hatası:", error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="w-[90%] max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 transition-all hover:scale-[1.01]">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          Create Account
        </h1>

        <form onSubmit={signSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-1">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Your username"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-300 mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="px-4 py-3 rounded-xl bg-white/5 border border-white/20 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white py-3 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-cyan-500/30"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log in
          </a>
        </div>
      </div>

      {/* 🔹 Hata Kutusu (Modern Pop-up Stilinde) */}
      {showBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-10 w-[90%] max-w-lg text-center">
            <h2 className="text-4xl font-bold mb-4 text-red-600">Error 404</h2>
            {errorMessage && <p className="text-lg mb-6 text-gray-800">{errorMessage}</p>}
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
  )
}

export default Signup
