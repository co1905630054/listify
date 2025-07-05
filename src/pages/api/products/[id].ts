// (READ ONE + UPDATE + DELETE)
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()
  const { id } = req.query

  switch (req.method) {
    case 'GET':
      const product = await Product.findById(id)
      if (!product) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json(product)

    case 'PUT':
      const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
      return res.status(200).json({ message: 'Updated', product: updated })

    case 'DELETE':
      await Product.findByIdAndDelete(id)
      return res.status(200).json({ message: 'Deleted successfully' })

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
