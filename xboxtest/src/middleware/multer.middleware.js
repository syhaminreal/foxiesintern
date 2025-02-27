// import multer from "multer"
// import path from "path";
// import fs from "fs";

// //dummy code 
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "/public/temp")
//     },
//     filename: function(req, file, cb) {
//           cb(null, file.originalname)
//     }
// })

//  export const upload = multer({
//      storage,
//     })

import multer from "multer";
import path from "path";
import fs from "fs";

// Define the upload directory inside "public"
const uploadDir = path.join(process.cwd(), "backend", "public", "temp");

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Save files inside "public/temp"
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

// Initialize Multer
export const upload = multer({ storage });
