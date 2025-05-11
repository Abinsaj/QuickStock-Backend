import multer from 'multer'

const storage = multer.memoryStorage(); 
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
      "image/bmp",
      "image/svg+xml",
      "image/tiff"]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."));
    }
  },
});