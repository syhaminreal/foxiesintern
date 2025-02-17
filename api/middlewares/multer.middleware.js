import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Define the upload directory
const uploadDir = path.resolve('public/temp');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to the resolved absolute path
  },
  filename: function (req, file, cb) {
    // Ensure unique filenames to prevent overwriting
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Optional: Allow only specific file types
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    
    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Only images (jpeg, jpg, png, gif) and PDFs are allowed!'));
    }
  }
});



// import path from 'path';
// import fs from 'fs';
// import multer from "multer"

// // Use an absolute path to avoid confusion
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {


//     //location for the uploadingthe files
//     cb(null, "./public/temp"){
//       filename: function (req, file, cb) {

//       cb(null, file.originalname)
//     } },




//   //    // Resolving the absolute path
//   //   if (!fs.existsSync(uploadDir)) {
//   //     fs.mkdirSync(uploadDir); // Create the directory if it doesn't exist
//   //   }
//   //   cb(null, uploadDir); // Save files to the resolved path
//   // },
 
// //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //     cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
// //   }
// // });

// export const upload = multer({ 
//   storage,
// });