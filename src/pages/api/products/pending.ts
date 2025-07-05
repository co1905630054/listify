import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const pendingProducts = await Product.find({ status: 'pending' }).sort({ createdAt: -1 })

  res.status(200).json({ products: pendingProducts })
}
