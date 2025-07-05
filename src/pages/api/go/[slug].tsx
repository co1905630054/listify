import type { NextApiRequest, NextApiResponse } from 'next'
import products from '@/data/products.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  const product = (products as any[]).find((p) => p.slug === slug)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  // Optional: Add logging here (to DB, analytics, etc.)

  res.redirect(302, product.affiliateUrl)
}
