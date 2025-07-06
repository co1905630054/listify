import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import toast from 'react-hot-toast'

export default function AddProductPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    affiliateUrl: '',
    image: null as File | null
  })
  const [imagePreview, setImagePreview] = useState('')
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null)

  // ✅ Admin Access Check
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin === 'true') {
      setIsAllowed(true)
    } else {
      setIsAllowed(false)
      router.replace('/') // ⛔ Redirect if not admin
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formDataToSend = new FormData()
    formDataToSend.append('title', formData.title)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('affiliateUrl', formData.affiliateUrl)
    if (formData.image) formDataToSend.append('file', formData.image)

    setUploading(true)
    
    const res = await fetch('/api/products', {
      method: 'POST',
      body: formDataToSend
    })

    const data = await res.json()
    setUploading(false)

    if (res.ok) {
      toast.success('Product added successfully!')
      router.push('/')
    } else {
      toast.error(data.message || 'Failed to add product')
    }
  }

  if (isAllowed === null) {
    return <h1 className="text-center mt-10">Checking access...</h1>
  }

  if (!isAllowed) {
    return <h1 className="text-center mt-10 text-red-500">You are not authorized to view this page.</h1>
  }

  return (
    <>
      <Head>
        <title>Add Product</title>
      </Head>
  
      <main className="flex justify-center items-start min-h-screen pt-20 px-4 relative z-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 p-6 space-y-6 scale-95 hover:scale-100 transition-transform duration-300">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Add a New Product
          </h1>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
  
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              rows={4}
              required
            />
  
            <input
              name="affiliateUrl"
              type="url"
              placeholder="Affiliate URL"
              value={formData.affiliateUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
  
            <div className="space-y-2">
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 p-2.5 rounded-md text-black"
                required
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded shadow"
                />
              )}
            </div>
  
            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-black py-2.5 rounded-md font-semibold transition disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
          </form>
        </div>
      </main>
    </>
  )
  
  
}
