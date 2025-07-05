import mongoose from 'mongoose'
import slugify from 'slugify'

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  affiliateUrl: String,
  image: String,
  slug: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
})



ProductSchema.pre('save', function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  next()
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
