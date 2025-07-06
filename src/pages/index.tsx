import Head from 'next/head'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import WhyUs from '@/components/whyUs'
import About from '@/components/About'

type ProductType = {
  _id: string
  slug: string
  title: string
  description: string
  image: string
  affiliateUrl: string
}

type Props = {
  products: ProductType[]
}

export default function Homepage({ products }: Props) {
  const [newproducts, setProducts] = useState(products)
const [isAdmin, setIsAdmin] = useState(false)
const router = useRouter()

useEffect(() => {
  setIsAdmin(localStorage.getItem('isAdmin') === 'true')
}, [])

const handleDelete = async (id: string) => {
  const confirmDelete = confirm('Are you sure you want to delete this product?')
  if (!confirmDelete) return
  toast.success('Product deleted successfully')
  const res = await fetch(`/api/products/${id}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    setProducts(prev => prev.filter(p => p._id !== id))
    toast.success('Product deleted successfully')
    router.reload()

  } else {
    toast.error('Failed to delete product')
  }
}
  return (
    <>
      <Head>
        <title>Top Ingeneous Digital World. Tools</title>
        <meta name="description" content="Discover high-converting affiliate tools handpicked from WarriorPlus at Ingeneous Digital World!" />
      </Head>


      <main className="max-w-6xl mx-auto px-4 py-14">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 mt-12 favicon">
            🔥 Featured Ingeneous Digital World Tools
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover handpicked affiliate tools designed to boost your conversion and make your campaigns perform like never before.
          </p>
        </section>
<About></About>
        {/* Add Product CTA */}
        <div className="flex justify-end mb-8">
          <a
            href="/admin"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow hover:shadow-md"
          >
            + Add Product
          </a>
        </div>

       {/* Product Grid */}
       <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-12">
  {products.map((product) => (
    <div key={product._id} className="relative max-w-md mx-auto group">
      {/* Entire Card Clickable */}
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white border border-gray-200 rounded-2xl transition-transform duration-300 hover:scale-[1.015] hover:shadow-lg h-full"
      >
        <div className="p-6 flex flex-col justify-between h-full">
          {/* Image */}
          <div className="overflow-hidden rounded-xl mb-4 mt-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Fancy Visit Link (inside clickable card for visual only) */}
            <div className="relative inline-flex items-center group text-sm font-medium text-blue-600">
              <span className="mr-1 group-hover:underline group-hover:decoration-2">Visit</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full" />
            </div>
          </div>
        </div>
      </a>

      {/* Admin Delete Button - positioned outside <a> so it doesn't redirect */}
      {isAdmin && (
        <button
          onClick={() => handleDelete(product._id)}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
        >
          <FiTrash2 className="text-base" />
          Delete
        </button>
      )}
    </div>
  ))}
</div>


<WhyUs></WhyUs>
      </main>
    </>
  )
}
export async function getServerSideProps() {
  await dbConnect()

  const productsFromDb = await Product.find({ status: 'approved' }).lean()

  const formattedProducts = productsFromDb.map((p: any) => ({
    _id: p._id.toString(),
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.image,
    affiliateUrl: p.affiliateUrl,
  }))

  return {
    props: {
      products: formattedProducts, // ✅ Must match key in Homepage props
    },
  }
}
