import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import upload from '@/lib/multer'
import dbConnect from '@/lib/dbConnect'
import Product from '@/models/Product'
import cloudinary from '@/lib/cloudinary'


function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
}

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err)
    res.status(500).json({ message: 'Something broke!' })
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
})

handler.use(upload.single('file'))


handler.get(async (req, res) => {
  await dbConnect()
  const products = await Product.find({ status: 'approved' })
  return res.status(200).json(products)
})

handler.post(async (req: any, res) => {
  await dbConnect();

  try {
    const { title, description, affiliateUrl } = req.body;
    const file = req.file;

    if (!title || !description || !affiliateUrl || !file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const slug = slugify(title);

    const exists = await Product.findOne({ slug });
    if (exists) {
      return res.status(400).json({ message: 'Product with this title already exists' });
    }

    // ✅ Convert memory buffer to base64 for Cloudinary upload
    const buffer = file.buffer;
    const base64 = buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER,
    });

    const product = await Product.create({
      title,
      description,
      affiliateUrl,
      image: uploadResult.secure_url,
      slug,
      status: 'approved',
    });

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});


export const config = {
  api: {
    bodyParser: false // Required for multer
  }
}

export default handler
