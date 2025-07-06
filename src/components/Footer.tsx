// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        
        {/* Left Side: Logo */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link href="/" className="text-blue-600 font-bold text-lg">
            List<span className="text-gray-900">ify</span>Tools
          </Link>
        </div>

        {/* Center: Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/admin" className="hover:text-blue-600 transition-colors">Add Product</Link>
          <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
        </div>

        {/* Right Side: Copyright */}
        <div className="text-center md:text-right">
          &copy; {new Date().getFullYear()} Ingeneous Digital World. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
