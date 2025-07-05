
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
