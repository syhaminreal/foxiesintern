import path from 'path';
import fs from 'fs';

// Use an absolute path to avoid confusion
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.resolve('store');  // Resolving the absolute path
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
    }
    cb(null, uploadDir); // Save files to the resolved path
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
  }
});

export const upload = multer({ 
  storage,
});
