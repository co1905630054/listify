// 👇 At the top
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import upload from '@/lib/multer'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import cloudinary from '@/lib/cloudinary'
import fs from 'fs'


// 👇 Slugify utility
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

// 👇 Initialize nextConnect handler and middleware
const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err)
    res.status(500).json({ message: 'Something broke!' })
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
})

// 👇 Add multer middleware
handler.use(upload.single('file'))

// 👇 GET Products
handler.get(async (req, res) => {
  await dbConnect()
  const products = await Product.find({ status: 'approved' })
  return res.status(200).json(products)
})

// 👇 POST Product
handler.post(async (req: any, res) => {
  await dbConnect()

  try {
    const { title, description, affiliateUrl } = req.body
    const imagePath = req.file?.path

    if (!title || !description || !affiliateUrl || !imagePath) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const slug = slugify(title)

    // Duplicate check
    const exists = await Product.findOne({ slug })
    if (exists) {
      return res.status(400).json({ message: 'Product with this title already exists' })
    }
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'Image required' });
    
    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER
    })

    // Remove local file
    fs.unlinkSync(imagePath)

    // Save to DB
    const product = await Product.create({
      title,
      description,
      affiliateUrl,
      image: uploadResult.secure_url,
      slug,
      status: 'approved'
    })

    res.status(201).json({ message: 'Product added successfully', product })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error', error: err })
  }
})

export const config = {
  api: {
    bodyParser: false // Required for multer
  }
}

export default handler
