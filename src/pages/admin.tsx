import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
      <div className="max-w-sm mx-auto py-20 px-4">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter Admin Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    )
  }

  if (loading) return <p className="text-center mt-10">Loading Form...</p>

  return (
    <div></div>  
  )  
}
