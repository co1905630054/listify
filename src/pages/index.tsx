import Head from 'next/head'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'

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
        <title>Top Listify Tools</title>
        <meta name="description" content="Discover high-converting affiliate tools handpicked from WarriorPlus at Listify Digital World!" />
      </Head>


      <main className="max-w-6xl mx-auto px-4 py-14">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 mt-10">
            🔥 Featured Listify Digital World Tools
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover handpicked affiliate tools designed to boost your conversion and make your campaigns perform like never before.
          </p>
        </section>

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
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {products.map((product) => (
    <div
      key={product._id}
      className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all bg-white"
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
          {product.title}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-3">
          {product.description}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-blue-600 underline"
        >
          Visit →
        </a>
        </div>
        {isAdmin && (
           <button
           onClick={() => handleDelete(product._id)}
           className="mt-3 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 transition duration-200"
         >
           <FiTrash2 className="text-base" />
           Delete
           </button>
        )}
    </div>
  ))}
</div>

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
