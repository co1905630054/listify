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

      <main className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 mt-10">Add a New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            name="affiliateUrl"
            type="url"
            placeholder="Affiliate URL"
            value={formData.affiliateUrl}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="space-y-2">
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
      </main>
    </>
  )
}
