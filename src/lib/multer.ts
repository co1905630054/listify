// // lib/multer.ts
// import multer from 'multer'
// import { join } from 'path'
// import { mkdirSync } from 'fs'

// const uploadDir = join(process.cwd(), '/uploads')
// mkdirSync(uploadDir, { recursive: true })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir)
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`)
//   }
// })

// const upload = multer({ storage })

// export default upload
// lib/multer.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // ✅ Fix: use memory, not disk

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // optional: 5MB limit
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed') as any, false);
    }
    return cb(null, true); // ✅ Let multer handle the typing
  },
});

export default upload;
