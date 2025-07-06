import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Image from 'next/image'

export default function Navbar() {
  

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">

        {/* Logo and Site Name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/2.png" alt="Logo" width={36} height={36} className="rounded" />
          <span className="text-xl sm:text-2xl font-extrabold text-blue-600 tracking-wide">
          Ingeneous<span className="text-gray-900"> Digital World</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-base font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
            Add Product
          </Link>
      
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-gray-700 focus:outline-none transition-transform"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <div className={`md:hidden bg-white px-6 pt-4 pb-6 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 transition">Home</Link>
        <Link href="/admin" className="block py-2 text-gray-700 hover:text-blue-600 transition">Add Product</Link>
        <Link href="/admin" className="block py-2 text-gray-700 hover:text-blue-600 transition">Admin</Link>
      </div>
    </header>
  )
}
