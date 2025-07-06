import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaLock } from 'react-icons/fa'
type Product = {
  _id: string
  title: string
  description: string
  affiliateUrl: string
  image: string
  status: string
}

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('admin-auth')
    if (stored === 'true') setLoggedIn(true)
  }, [])



  const handleLogin = () => {
    if (password === ADMIN_PASS) {
      setLoggedIn(true)
      router.push('/add') 
      localStorage.setItem('admin-auth', 'true')
      localStorage.setItem('isAdmin', 'true')
      handleLogout()
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-auth')
    setLoggedIn(false)
  }
  useEffect(() => {
    const stored = localStorage.getItem('admin-auth')
    if (stored === 'true') setLoggedIn(true)
  
    // Clear access after 1 hour (3600000 ms)
    const timeout = setTimeout(() => {
      localStorage.removeItem('isAdmin')
      localStorage.removeItem('admin-auth')
      setLoggedIn(false)
    }, 3600000)
  
    // Clear timeout if component unmounts
    return () => clearTimeout(timeout)
  }, [])
  

  if (!loggedIn) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 border border-gray-200">
            <div className="flex flex-col items-center">
              <FaLock className="text-4xl text-blue-600 mb-2" />
              <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
              <p className="text-sm text-gray-500 text-center mt-1">
                Enter the admin password to continue
              </p>
            </div>
    
            <input
              type="password"
              placeholder="Admin Password"
              className="w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      )
    }
  if (loading) return <p className="text-center mt-10">Loading Form...</p>

  return (
    <div></div>  
  )  
}
