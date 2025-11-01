import axios from "axios"
import React, { useState, useEffect } from "react"
import { Trash2 } from "lucide-react" // ikon için (lucide-react yüklü olmalı)

const Admin = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin")
        setUsers(res.data)
      } catch (error) {
        console.error("Veri alınamadı:", error)
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (email) => {
    if (!window.confirm(`${email} adresli kullanıcıyı silmek istiyor musun?`)) return

    try {
      await axios.delete(`http://localhost:5000/admin/${email}`)
      setUsers(users.filter((u) => u.email !== email))
    } catch (error) {
      console.error("Silme hatası:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-8 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
        Admin Panel
      </h1>

      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-400">Hiç kullanıcı bulunamadı.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white/10 hover:bg-white/20 transition-all rounded-xl p-4 shadow-md"
              >
                <div>
                  <p className="font-semibold text-lg text-blue-300">{user.username}</p>
                  <p className="text-sm text-gray-300">📧 {user.email}</p>
                  <p className="text-sm text-gray-400">🔒 {user.password}</p>
                </div>
                <button
                  onClick={() => handleDelete(user.email)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                  Sil
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Admin
