// lib/multer.ts
import multer from 'multer'
import { join } from 'path'
import { mkdirSync } from 'fs'

const uploadDir = join(process.cwd(), '/uploads')
mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

export default upload
